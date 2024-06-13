"use strict";

import { checkDataGlitchless, checkIdsGlitchless } from "./logic";
import { defaultItemGrid, itemsMax, itemsMin, baseItems, progressiveItems, ItemId } from "./items";
import store from "./store"
import { overworld, groups, checkStatus, groupStatus } from "./chests"

// @ts-expect-error
import Backgrounds from 'url:~/static/images/Backgrounds/*';

// @ts-expect-error
import BossRewards from 'url:~/static/images/BossRewards/*.webp';

// @ts-expect-error
import itemBoxImage from 'url:~/static/images/General/ItemBox.webp';

// @ts-expect-error
import ItemCounts from 'url:~/static/images/ItemCounts/*.webp';

// @ts-expect-error
import Items from 'url:~/static/images/Items/*.webp';

//set the boss reward values for later testing
var defaultrewards = {
    Boss1: 0,
    Boss2: 0,
    Boss3: 0,
    Boss4: 0,
    Boss5: 0,
    Boss6: 0,
    Boss7: 0,
    Boss8: 0
};
var rewards = defaultrewards;

//sets the z of the dungeon rewards to their appropriate values
var dungeonImg = [
    'Unknown',
    'label1',
    'label2',
    'label3',
    'label4',
    'label5',
    'label6',
    'label7'
];

//set our default variables
let showprizes = true;

let itemLayout: ItemId[][] = [];

let editmode = false;
let selected: {} | { item: string } | { row: number, col: number } = {};

var dungeonSelect = 0;
const totalChecks = checkDataGlitchless.length;

// if we change an option, we want to update our cookies
function setCookie(obj) {
    localStorage.setItem("data", JSON.stringify(obj));
}

//upon loading the website we want to get our cookie values that were stored if any
function getCookie() {
    let item = localStorage.getItem("data")
    if (item === null) {
        return {}
    }

    return JSON.parse(item);
}


//we want to set our default cookie values so that we can just load from there if need be
var cookieDefault = {
    map: 1,
    iZoom: 100,
    mZoom: 90,
    mPos: 0,
    prize: 1,
    rewards: defaultrewards,
    items: defaultItemGrid,
    obtainedItems: store.items,
}

// fixme: remove this
var hackNoSaveWhileLoading = false

// loads everything.
function loadStorage() {
    hackNoSaveWhileLoading = true
    let cookieobj = getCookie();

    Object.keys(cookieDefault).forEach(function (key) {
        if (cookieobj[key] === undefined) {
            cookieobj[key] = cookieDefault[key];
        }
    });

    rewards = cookieobj.rewards;
    store.items = cookieobj.obtainedItems;

    // I literally can't think of a less dumb way to do this right now.
    store.settings = JSON.parse(localStorage.getItem('settings') ?? "null") ?? store.settings

    itemLayout = JSON.parse(localStorage.getItem('itemLayout')) ?? defaultItemGrid

    initGridRow(itemLayout);
    deserializeChecks(JSON.parse(localStorage.getItem('openedChecks')));

    // updateGridItemAll();

    setZoom('itemdiv', cookieobj.iZoom, false);
    setZoom('mapdiv', cookieobj.mZoom, false);
    document.getElementsByName('itemdivsize')[0].value = cookieobj.iZoom;
    document.getElementsByName('mapdivsize')[0].value = cookieobj.mZoom;

    setOrder(cookieobj.mPos);

    document.getElementsByName('mapposition')[cookieobj.mPos].checked = true;


    document.getElementsByName('showprizes')[0].checked = cookieobj.prize;
    showPrizes(cookieobj.prize, false)
    hackNoSaveWhileLoading = false
}

// do a full save of everything.
function saveStorage() {
    if (hackNoSaveWhileLoading) {
        return
    }

    setCookie({
        iZoom: document.getElementsByName('itemdivsize')[0].value,
        mZoom: document.getElementsByName('mapdivsize')[0].value,
        mPos: document.getElementsByName('mapposition')[1].checked ? 1 : 0,
        prize: document.getElementsByName('showprizes')[0].checked ? 1 : 0,
        rewards: rewards,
        obtainedItems: store.items,
    });

    localStorage.setItem('settings', JSON.stringify(store.settings));
    localStorage.setItem('itemLayout', JSON.stringify(itemLayout));
    saveChecks()
}

function saveChecks() {
    localStorage.setItem('openedChecks', JSON.stringify(serializeChecks()));
}

function serializeChecks() {
    return [...store.openedChecks];
}

function deserializeChecks(serializedChecks: Iterable<unknown> | null | undefined) {
    store.openedChecks = new Set(serializedChecks)
}

// Event of clicking a chest on the map
export function toggleChest(sender: HTMLButtonElement, c: string) {
    if (!store.openedChecks.delete(c)) {
        store.openedChecks.add(c);
    }

    sender.ariaPressed = store.openedChecks.has(c).toString();

    sender.dataset.status = checkStatus(c);

    updateItemCounter();
    saveChecks()
}


// Event of clicking a dungeon box on the map
/** @param {MouseEvent} ev  */
export function clickDungeon(ev: MouseEvent) {
    document.querySelector('.dungeon.active')?.classList.remove('active');

    ev.currentTarget.classList.add('active');

    document.getElementById('submaparea')!.innerHTML = groups[dungeonSelect].name;
    document.getElementById('submaparea')!.className = 'DC' + groupStatus(groups[dungeonSelect]);
    var DClist = document.getElementById('submaplist');
    DClist.innerHTML = '';

    for (const check of groups[dungeonSelect].checks) {
        var s = document.createElement('li');
        s.innerHTML = check;

        s.className = 'DC' + checkStatus(check);

        s.onclick = (ev) => toggleDungeonChest(ev.currentTarget, check);
        s.style.cursor = "pointer";

        DClist.appendChild(s);

    }
}

export function toggleDungeonChest(sender: EventTarget | null, c: string) {
    if (!store.openedChecks.delete(c)) {
        store.openedChecks.add(c);
    }

    sender.className = 'DC' + checkStatus(c);

    updateMap();
    updateItemCounter();
    saveChecks()
}

export function setOrder(H: any, save = true) {
    if (H) {
        document.getElementById('layoutdiv').classList.remove('flexcontainer');
    } else {
        document.getElementById('layoutdiv').classList.add('flexcontainer');
    }

    if (save) {
        saveStorage();
    }
}

export function showPrizes(checked: boolean, save = true) {
    showprizes = checked;
    updateGridItemAll();

    if (save) {
        saveStorage();
    }
}

export function setSkipOption(option: string, sender: { checked: boolean }) {
    store.settings.randomizer.skip[option] = sender.checked;
    updateMap()
}

export function setLogic(sender: { value: string; }) {
    store.settings.randomizer.logic == sender.value;
    updateMap();
}

export function setTracker() {
    /** @type {CheckKind} */
    let visible = (document.querySelector("input[name='checktracker']:checked")! as HTMLInputElement).value;

    const collection = document.getElementById('mapoverlay')!.getElementsByClassName("chest")

    for (const element of collection as HTMLCollectionOf<HTMLElement>) {

        if (element.classList.contains(visible)) {
            element.style.display = '';
        } else {
            element.style.display = "none";
        }
    }
}

//Set map zoom
function setZoom(target: string, value: number, save = true) {
    document.getElementById(target).style.zoom = value / 100;
    document.getElementById(target).style.zoom = value / 100;

    document.getElementById(target).style.MozTransform = 'scale(' + (value / 100) + ')';
    document.getElementById(target).style.MozTransformOrigin = '0 0';

    document.getElementById(target + 'size').innerHTML = (value) + '%';

    if (save === true) {
        saveStorage();
    }
}

//Set map distance from item tracker
function setDistance(target: string, sender: { value: number; }) {
    document.getElementById(target).style.width = (sender.value / 40 * 20) + "%";
    document.getElementById(target).style.width = (sender.value / 40 * 20) + "%";

    document.getElementById(target + 'size').innerHTML = (sender.value) + '%';
    saveStorage();
}

//set unused item opacity
function setOpacity(target: string, sender: { value: number; }) {
    x = document.getElementsByClassName(target);
    for (var i = 0; i < x.length; i++) {
        x[i].style.backgroundColor = "rgba(0,0,0, " + sender.value / 100 + ")";
    }

    document.getElementById(target + 'size').innerHTML = (sender.value) + '%';
    saveStorage();
}


//function for setting the custom background images
function setBackground() {
    const sel = <HTMLSelectElement | null>document.getElementById('background-select');
    if (sel === null || sel.value === "") {
        return;
    }

    if (sel.value === "none") {
        document.body.style.backgroundImage = "";
        return;
    }

    document.body.style.backgroundImage = `url(${Backgrounds[sel.value]})`;
}

//backend for the settings button
export function showSettings(sender: EventTarget | null) {
    if (editmode) {
        editmode = false;
        updateGridItemAll();
        showTracker(<HTMLInputElement>document.getElementsByName('showmap')[0]);
        document.getElementById('itemconfig').style.display = 'none';
        sender.innerHTML = '🔧';
        saveStorage();
    } else {
        var x = document.getElementById('settings');
        if (!x.style.display || x.style.display == 'none') {
            x.style.display = 'initial';
            sender.innerHTML = 'X';
        } else {
            x.style.display = 'none';
            sender.innerHTML = '🔧';
        }
    }
}

//displays the map tracker
function showTracker(sender: { checked: boolean }) {
    if (sender.checked) {
        document.getElementById('mapdiv')!.style.display = '';
    }
    else {
        document.getElementById('mapdiv')!.style.display = 'none';
    }
}

//sets the parameters for edit mode
function EditMode() {
    var r: any, c: any;

    editmode = true;
    updateGridItemAll();
    showTracker({ checked: false });
    document.getElementById('settings').style.display = 'none';
    document.getElementById('itemconfig').style.display = '';

    document.getElementById('settingsbutton').innerHTML = 'Exit Edit Mode';
}

//sets all of the item and map options to their defaults
function ResetLayout() {
    initGridRow(defaultItemGrid);
    updateGridItemAll();

    document.getElementById('itemdiv').style.zoom = 100 / 100;
    document.getElementById('itemdiv').style.zoom = 100 / 100;
    document.getElementById('itemdiv').style.MozTransform = 'scale(' + (100 / 100) + ')';
    document.getElementById('itemdiv').style.MozTransformOrigin = '0 0';
    document.getElementById('itemdivsize').innerHTML = '100%';
    document.getElementById('itemrange').value = 100;

    document.getElementById('mapdiv').style.zoom = 100 / 100;
    document.getElementById('mapdiv').style.zoom = 100 / 100;
    document.getElementById('mapdiv').style.MozTransform = 'scale(' + (100 / 100) + ')';
    document.getElementById('mapdiv').style.MozTransformOrigin = '0 0';
    document.getElementById('mapdivsize').innerHTML = '100%';
    document.getElementById('maprange').value = 100;

    document.getElementById('blankspace').style.width = "1%";
    document.getElementById('blankspace').style.width = "1%";
    document.getElementById('trackerDistanceID').value = 1;
    document.getElementById('blankspacesize').innerHTML = "1%";

    x = document.getElementsByClassName("tracker");
    for (var i = 0; i < x.length; i++) {
        x[i].style.backgroundColor = "rgba(0,0,0,1)";
    }
    document.getElementById('trackerOpacityID').value = 100;
    document.getElementById('trackersize').innerHTML = "100%";
    document.body.style.backgroundImage = "url('static/images/Backgrounds/none.webp')";
    saveStorage();
}


export function editMode() {
    editmode = true;


    updateGridItemAll();
    showTracker({ checked: false });
    document.getElementById('settings').style.display = 'none';
    document.getElementById('itemconfig').style.display = '';

    document.getElementById('settingsbutton').innerHTML = 'Exit Edit Mode';
}

function ResetTracker() {
    store.openedChecks.clear()
    store.items = Object.assign({}, baseItems);
    document.getElementById('maptracker')!.checked = true;
    setTracker()

    updateGridItemAll();
    updateMap();
    document.getElementById('checkCounter')!.innerHTML = "Checks: " + (dungeonChest + c) + " available, " + totalChecks + " Remaining";
    saveStorage();
}

// creates an extra row when in edit mode
function addItemRow() {
    var sender = document.getElementById('itemdiv')!
    var r = itemLayout.length;

    itemGrid[r] = [];
    itemLayout[r] = [];

    itemGrid[r]['row'] = document.createElement('table');
    itemGrid[r]['row'].className = 'tracker';

    itemGrid[r]['tablerow'] = document.createElement('tr')
    itemGrid[r]['tablerow'].appendChild(itemGrid[r]['row']);
    sender.appendChild(itemGrid[r]['tablerow']);

    var tr = document.createElement('tr');
    itemGrid[r]['row'].appendChild(tr);

    itemGrid[r]['addbutton'] = document.createElement('button');
    itemGrid[r]['addbutton'].innerHTML = '+';
    itemGrid[r]['addbutton'].style.backgroundColor = 'green';
    itemGrid[r]['addbutton'].style.color = 'white';
    itemGrid[r]['addbutton'].onclick = () => addItem(r);;
    itemGrid[r]['row'].appendChild(itemGrid[r]['addbutton']);

    itemGrid[r]['removebutton'] = document.createElement('button');
    itemGrid[r]['removebutton'].innerHTML = '-';
    itemGrid[r]['removebutton'].style.backgroundColor = 'red';
    itemGrid[r]['removebutton'].style.color = 'white';
    itemGrid[r]['removebutton'].onclick = () => removeItem(r);
    itemGrid[r]['row'].appendChild(itemGrid[r]['removebutton']);

    saveStorage();
}

// removes an item row when in edit mode
function removeItemRow() {
    var sender = document.getElementById('itemdiv')!
    var r = itemLayout.length - 1;

    sender.removeChild(itemGrid[r]['tablerow'])
    itemGrid.splice(r, 1);
    itemLayout.splice(r, 1);

    saveStorage();
}

//adds an item to the item tracker 
function addItem(r: number) {
    var i = itemLayout[r].length

    itemGrid[r].push([]);
    itemLayout[r][i] = 'blank';

    itemGrid[r][i]['item'] = document.createElement('td');
    itemGrid[r][i]['item'].className = 'griditem';
    itemGrid[r]['row'].appendChild(itemGrid[r][i]['item']);

    var tdt = document.createElement('table');
    tdt.className = 'lonk';
    itemGrid[r][i]['item'].appendChild(tdt);

    for (let j = 0; j < 2; j++) {
        var tdtr1 = document.createElement('tr');
        tdt.appendChild(tdtr1);
        for (let k = 0; k < 2; k++) {
            const n = j * 2 + k;
            itemGrid[r][i][n] = document.createElement('th');
            itemGrid[r][i][n].className = 'corner';
            itemGrid[r][i][n].onclick = () => gridItemClick(r, i, n);
            itemGrid[r][i][n].oncontextmenu = (ev) => {
                if (!editmode) {
                    gridItemRClick(r, i, n);
                    ev.preventDefault()
                }
            };
            tdtr1.appendChild(itemGrid[r][i][n]);
        }

    }

    updateGridItem(r, i);
    saveStorage();
}
function removeItem(r: number) {
    var i = itemLayout[r].length - 1

    if (i < 0) {
        return
    }

    itemGrid[r]['row'].removeChild(itemGrid[r][i]['item'])
    itemGrid[r].splice(i, 1);
    itemLayout[r].splice(i, 1);
    saveStorage();
}

//sets the images, etc of an item 
function updateGridItem(row: number, col: number) {
    var item = itemLayout[row][col];

    let elem = document.getElementById('itemdiv')?.children[row]?.children[col + 1] ?? null;

    if (elem === null) {
        console.warn(`attempted to set non-existed grid item (${row},${col})`);
        return;
    }

    elem.replaceWith(makeGridItem(row, col, item));

    if (editmode) {
        elem.style.border = '1px solid white';

        return;
    }
}


function updateGridItemAll() {
    var r: number, c: number;

    if (editmode) {
        for (const elem of document.getElementsByClassName('edit-mode')) {
            elem.style.display = '';
        }
    } else {
        for (const elem of document.getElementsByClassName('edit-mode')) {
            elem.style.display = 'none';
        }

    }

    for (r = 0; r < itemLayout.length; r++) {
        for (c = 0; c < itemLayout[r].length; c++) {
            updateGridItem(r, c);
        }
    }
}


function setGridItem(item: string, row: number, col: number) {
    while (!itemLayout[row]) {
        addItemRow();
    }
    while (!itemLayout[row][col]) {
        addItem(row);
    }

    itemLayout[row][col] = item;
    updateGridItem(row, col);
}


function makeGridItem(row: number, col: number, item: ItemId) {
    let elem = document.createElement('div');
    elem.className = 'trackerItem';
    elem.onclick = (_ev) => gridItemClick(row, col, false);
    elem.oncontextmenu = (ev) => {
        gridItemRClick(row, col, false)
        ev.preventDefault();
    };

    let cornerItem = makeGridItemCorner(item);

    if (typeof (cornerItem) !== 'undefined') {
        cornerItem.onclick = (_ev) => gridItemClick(row, col, true);
        cornerItem.oncontextmenu = (_ev) => gridItemRClick(row, col, true);
        elem.appendChild(cornerItem);
    }


    elem.style.backgroundImage = makeItemImages(item);
    elem.classList.add((!!store.items[item]).toString())

    return elem;
}

function makeGridItemCorner(item: ItemId): HTMLElement | undefined {
    // todo:
    // if (item in rewards) { }

    let value = store.items[item];

    if (typeof (value) === "number" && !progressiveItems.includes(item)) {
        const displayedValue = editmode ? itemsMax[item] : value;

        let elem = document.createElement('div');
        elem.className = 'trackerTextIcon';
        let textSpan = document.createElement('span');
        textSpan.textContent = displayedValue > 0 ? displayedValue.toString() : '';
        if (displayedValue === itemsMax[item]) {
            elem.style.color = "#00ff00";
        }

        elem.appendChild(textSpan);

        return elem;
    }
}

function makeItemImages(item: ItemId): string {
    const makeStyle = (images: string[]) => images.map(elem => `url(${elem})`).join(',');

    if (item === 'blank') {
        return '';
    }

    // itemGrid[row][col]['item'].style.border = '0px';

    let imageStack: string[] = []


    if ((typeof store.items[item]) === 'boolean') {
        imageStack.push(Items[item])
    }
    else if (progressiveItems.includes(item)) {
        imageStack.push(Items[`${item}${store.items[item]}`]);
    }
    else {
        imageStack.push(Items[item])
    }

    if (store.settings.itemBoxes) {
        imageStack.push(itemBoxImage);
    }


    return makeStyle(imageStack);

    // itemGrid[row][col]['item'].className = 'griditem ' + !!store.items[item];
}

function initGridRow(itemsets: ItemId[][]) {
    console.log("building item grid", itemsets);

    let grid = document.getElementById('itemdiv')!;

    for (const [i, row] of itemsets.entries()) {
        let rowElem = document.createElement('div');
        rowElem.style.display = "flex";
        rowElem.style.justifyContent = "center";
        rowElem.style.gap = "0.2em";


        let addButton = document.createElement('button');

        addButton.className = 'edit-mode add';
        addButton.textContent = '+';
        addButton.style.display = 'none';
        addButton.onclick = () => addItem(i);



        let removeButton = document.createElement('button');
        removeButton.className = 'edit-mode remove';
        removeButton.textContent = '-';
        removeButton.style.display = 'none';
        removeButton.onclick = () => removeItem(i);

        let buttonBox = document.createElement('div');
        buttonBox.style.alignSelf = 'center';
        buttonBox.appendChild(addButton);
        buttonBox.appendChild(removeButton);

        rowElem.appendChild(buttonBox);

        for (const [j, col] of row.entries()) {
            let colItem = makeGridItem(i, j, col);
            rowElem.appendChild(colItem);
        }

        grid.appendChild(rowElem);
    }

    // while (itemLayout.length > 0) {
    //     removeItemRow();
    // }

    // var r: number, c: number;
    // for (r = 0; r < itemsets.length; r++) {
    //     for (c = 0; c < itemsets[r].length; c++) {
    //         setGridItem(itemsets[r][c], r, c);
    //     }
    // }
}

export function gridItemClick(row: number, col: number, corner: number | boolean) {
    if (editmode) {
        if ("item" in selected) {
            document.getElementById(selected.item)!.style.border = '1px solid white';
            var old = itemLayout[row][col];

            if (old == selected.item) {
                selected = {};
                return;
            }

            itemLayout[row][col] = selected.item;
            updateGridItem(row, col);
            selected = {};
            document.getElementById(old)!.style.opacity = "unset";
        } else if ("row" in selected) {
            itemGrid[selected.row][selected.col]['item'].style.border = '1px solid white';

            var temp = itemLayout[row][col];
            itemLayout[row][col] = itemLayout[selected.row][selected.col];
            itemLayout[selected.row][selected.col] = temp;
            updateGridItem(row, col);
            updateGridItem(selected.row, selected.col);
            selected = {};
        } else {
            itemGrid[row][col]['item'].style.border = '3px solid yellow';
            selected = { row: row, col: col };
        }
    } else {
        var item = itemLayout[row][col];

        if (rewards[item] !== undefined && showprizes) {
            if (corner === 3 || corner === true) {
                rewards[item]++;
                if (rewards[item] >= 9) {
                    rewards[item] = 0;
                }
            }
            else {
                store.items[item] = !store.items[item];
            }
        }
        else if ((typeof store.items[item]) === 'boolean') {
            store.items[item] = !store.items[item];
        } else {
            store.items[item]++;
            if (store.items[item] > itemsMax[item]) {
                store.items[item] = itemsMin[item];
            }
        }

    }
    updateMap();
    updateGridItem(row, col);
    updateItemCounter();
    saveStorage();
}


function gridItemRClick(row: number, col: number, corner: number | boolean) {
    if (editmode) {
        //Do Nothing
    } else {
        var item = itemLayout[row][col];

        if (rewards[item] !== undefined && showprizes) {
            if (corner === 3 || corner === true) {
                //this is where the code for the dungeon list happenes
                //corner 3 is bottom right
                if (rewards[item] <= 0) {
                    rewards[item] = 8;
                }
                else {
                    rewards[item] = rewards[item] - 1;

                }
            }
            else {
                store.items[item] = !store.items[item];
            }
        }
        else if ((typeof store.items[item]) == 'boolean') {
            store.items[item] = !store.items[item];
        }
        else {
            if (store.items[item] == itemsMin[item]) {
                store.items[item] = itemsMax[item]
            } else {
                store.items[item]--;
            }
        }

        updateMap();
        updateGridItem(row, col);
    }
    updateItemCounter();
    saveStorage();
}

function updateMap() {
    for (const [i, check] of overworld.entries()) {
        // nothing has changed if it's already open.
        if (!store.openedChecks.has(check.name)) {
            document.getElementById(`overworld${i}`)!.dataset.status = checkStatus(check.name);
        }
    }

    for (const [i, group] of groups.entries()) {
        let elem = document.getElementById('dungeon' + i)!;

        elem.dataset.status = groupStatus(group);

        const availableChecks = group.checks.reduce((total, it) => total + +(checkStatus(it) === "available"), 0)

        for (const child of elem.children) {
            if (child.className == 'chestCount') {
                if (availableChecks === 0) {
                    child.innerHTML = '';
                } else {
                    child.innerHTML = availableChecks.toString();
                }
                break;
            }
        }
    }

    document.getElementById('submaparea').className = 'DC' + groupStatus(groups[dungeonSelect]);
    var itemlist = document.getElementById('submaplist').children;
    for (var item in itemlist) {
        if (itemlist.hasOwnProperty(item)) {
            itemlist[item].className = 'DC' + checkStatus(groups[dungeonSelect].checks[item]);
        }
    }
}

function itemConfigClick(sender: EventTarget | null) {
    var item = sender.id;

    if ("item" in selected) {
        document.getElementById(selected.item).style.border = '0px';
        sender.style.border = '3px solid yellow';
        selected = { item: item };
    } else if ("row" in selected) {
        itemGrid[selected.row][selected.col]['item'].style.border = '1px solid white';
        var old = itemLayout[selected.row][selected.col];

        if (old == item) {
            selected = {};
            return;
        }

        itemLayout[selected.row][selected.col] = item;
        updateGridItem(selected.row, selected.col);

        document.getElementById(old).style.opacity = 1;

        selected = {};
    } else {
        sender.style.border = '3px solid yellow';
        selected = { item: item }
    }
}

function populateMapdiv() {
    var mapdiv = document.getElementById('mapoverlay')!;

    for (const [i, check] of overworld.entries()) {
        let s = document.createElement('button');
        s.id = `overworld${i}`;
        s.onclick = _ev => toggleChest(s, check.name)
        s.style.left = check.x;
        s.style.top = check.y;

        s.ariaPressed = store.openedChecks.has(check.name).toString();

        /** @type {Check} */
        const checkData = checkDataGlitchless[checkIdsGlitchless[check.name]]

        const checkKind = (checkData?.kind ?? "standard");

        s.dataset.status = checkStatus(check.name)

        s.classList.add('chest', checkKind)

        var itemCount = document.createElement('span');
        itemCount.role = 'tooltip';
        itemCount.id = `ow-tt${i}`;
        itemCount.textContent = check.name;

        s.setAttribute('aria-labelledby', itemCount.id)

        s.appendChild(itemCount);

        mapdiv.appendChild(s);
    }

    for (const [i, group] of groups.entries()) {
        let groupElem = document.createElement('button');
        groupElem.id = `dungeon${i}`;
        groupElem.onclick = (ev) => clickDungeon(ev);
        groupElem.style.left = group.x;
        groupElem.style.top = group.y;
        groupElem.className = 'dungeon'
        groupElem.dataset.status = groupStatus(group);

        const availableChecks = group.checks.reduce((total, it) => total + +(checkStatus(it) === "available"), 0)

        var itemCount = document.createElement('span');
        itemCount.className = 'chestCount';
        if (availableChecks === 0) {
            itemCount.innerHTML = '';
        } else {
            itemCount.innerHTML = availableChecks.toString();
        }

        groupElem.appendChild(itemCount);

        var tooltip = document.createElement('span');
        tooltip.role = 'tooltip';
        tooltip.id = `dun-tt${i}`;
        tooltip.className = 'gray';
        tooltip.textContent = group.name;

        groupElem.setAttribute('aria-labelledby', tooltip.id)

        groupElem.appendChild(tooltip);

        mapdiv.appendChild(groupElem);
    }

    updateItemCounter();
}

function updateItemCounter() {
    const total = checkDataGlitchless.length;
    const opened = store.openedChecks.size;
    const available = checkDataGlitchless.reduce((total, it) => total + +(checkStatus(it.name) === "available"), 0)

    document.getElementById('checkCounter')!.innerHTML = `Checks: ${available} Available, ${(total - opened)} Remaining, ${total} Total`;
}

function populateItemconfig() {
    const makeStyle = (images: string[]) => {
        return images.map(elem => `url(${elem})`).join(',')
    };

    var grid = document.getElementById('itemconfig')!;

    var i = 0;

    let row: HTMLTableRowElement;

    for (var key of <ItemId[]>Object.keys(store.items)) {
        if (key === 'blank') {
            continue;
        }

        console.log(key);

        if (i % 10 == 0) {
            row = document.createElement('tr');
            grid.appendChild(row);
        }
        i++;

        var rowitem = document.createElement('td');
        rowitem.className = 'corner';
        rowitem.id = key;
        rowitem.style.backgroundSize = '100% 100%';
        rowitem.onclick = (ev) => itemConfigClick(ev.currentTarget);
        if ((typeof store.items[key]) == 'boolean') {
            rowitem.style.backgroundImage = makeStyle([Items[key]]);
        } else if (progressiveItems.includes(key)) {
            rowitem.style.backgroundImage = makeStyle([Items[`${key}${store.items[key]}`]]);
        }
        else {
            rowitem.style.backgroundImage = makeStyle([ItemCounts[`${itemsMax[key]}max`], Items[key]]);
        }

        console.log(rowitem.style.backgroundImage);
        row.appendChild(rowitem);
    }
}

//runs on site load
export function init() {
    loadStorage();
    populateMapdiv();
    populateItemconfig();
    saveStorage();
    setTracker()
}

// function preloader() {
//     return;
//     for (item in store.items) {
//         if ((typeof store.items[item]) == 'boolean') {
//             var img = new Image();
//             img.src = 'static/images/Items/' + item + '.png';


//         } else {
//             for (i = itemsMin[item]; i < itemsMax[item]; i++) {
//                 var img = new Image();
//                 img.src = 'static/images/Items/' + item + '.png';

//             }
//         }
//     }

//     for (dungReward in dungeonImg) {
//         var img = new Image();
//         img.src = 'static/images/' + dungeonImg[dungReward] + '.png';
//     }
// }
// function addLoadEvent(func) {
//     var oldonload = window.onload;
//     if (typeof window.onload != 'function') {
//         window.onload = func;
//     } else {
//         window.onload = function () {
//             if (oldonload) {
//                 oldonload();
//             }
//             func();
//         }
//     }
// }
// addLoadEvent(preloader);

// Created by Lunar Soap, TreZc0_, TestRunner
