"use strict";

import { checkDataGlitchless, checkIdsGlitchless, Logic } from "./logic/index";
import { defaultItemGrid, itemsMax, itemsMin, baseItems, ItemId, isProgressiveItemId, isNumericItemId, ProgressiveItemId, NumericItemId } from "./items";
import store from "./store";
import { overworld, groups, checkStatus, groupStatus, CheckStatus } from "./chests";

// @ts-expect-error ts doesn't understand the module transforms.
import Backgrounds from 'url:~/static/images/Backgrounds/*';

// // @ts-expect-error ts doesn't understand the module transforms.
// import BossRewards from 'url:~/static/images/BossRewards/*.webp';

// @ts-expect-error ts doesn't understand the module transforms.
import itemBoxImage from 'url:~/static/images/General/ItemBox.webp';

// @ts-expect-error ts doesn't understand the module transforms.
import ItemCounts from 'url:~/static/images/ItemCounts/*.webp';

// @ts-expect-error ts doesn't understand the module transforms.
import Items from 'url:~/static/images/Items/*.webp';
import { LogicValue } from "./settings";
import { CheckName } from "./logic/check-name";

//set the boss reward values for later testing
const defaultrewards = {
    Boss1: 0,
    Boss2: 0,
    Boss3: 0,
    Boss4: 0,
    Boss5: 0,
    Boss6: 0,
    Boss7: 0,
    Boss8: 0
};

function isReward(key: string): key is keyof typeof defaultrewards {
    return key in defaultrewards;
}

let rewards = defaultrewards;

//sets the z of the dungeon rewards to their appropriate values
// const dungeonImg = [
//     'Unknown',
//     'label1',
//     'label2',
//     'label3',
//     'label4',
//     'label5',
//     'label6',
//     'label7'
// ];

//set our default variables
let showprizes = true;

/**
 * The item grid can have blank spaces we can fill in, but it's part of the layout.
 */
type LayoutItem = ItemId | null;

let itemLayout: LayoutItem[][] = [];

let editmode = false;
let selected: Record<string, never> | { item: ItemId; } | { row: number, col: number; } = {};

// if we change an option, we want to update our cookies
function setCookie(obj: object) {
    localStorage.setItem("data", JSON.stringify(obj));
}

//upon loading the website we want to get our cookie values that were stored if any
function getCookie() {
    const item = localStorage.getItem("data");
    if (item === null) {
        return {};
    }

    return JSON.parse(item);
}


//we want to set our default cookie values so that we can just load from there if need be
const cookieDefault = {
    map: 1,
    iZoom: 100,
    mZoom: 90,
    mPos: 0,
    prize: 1,
    rewards: defaultrewards,
    items: defaultItemGrid,
    obtainedItems: store.items,
};

// fixme: remove this
let hackNoSaveWhileLoading = false;

// loads everything.
function loadStorage() {
    hackNoSaveWhileLoading = true;
    const cookieobj = getCookie();

    Object.keys(cookieDefault).forEach(function (key) {
        const typedKey = key as keyof typeof cookieDefault;

        if (cookieobj[typedKey] === undefined) {
            cookieobj[typedKey] = cookieDefault[typedKey];
        }
    });

    rewards = cookieobj.rewards;

    const storedItems = cookieobj.obtainedItems ?? {};

    store.items = { ...baseItems, ...storedItems };

    // I literally can't think of a less dumb way to do this right now.
    store.settings = JSON.parse(localStorage.getItem('settings') ?? "null") ?? store.settings;

    itemLayout = JSON.parse(localStorage.getItem('itemLayout') ?? "null") ?? defaultItemGrid;

    initGridRow(itemLayout);
    deserializeChecks(JSON.parse(localStorage.getItem('openedChecks') ?? "null"));

    // updateGridItemAll();

    setZoom('itemdiv', cookieobj.iZoom, false);
    setZoom('mapdiv', cookieobj.mZoom, false);
    document.getElementsByName('itemdivsize')[0].value = cookieobj.iZoom;
    document.getElementsByName('mapdivsize')[0].value = cookieobj.mZoom;

    setOrder(cookieobj.mPos);

    document.getElementsByName('mapposition')[cookieobj.mPos].checked = true;


    document.getElementsByName('showprizes')[0].checked = cookieobj.prize;
    showPrizes(cookieobj.prize, false);
    hackNoSaveWhileLoading = false;
}

// wow, mouthful, it's a hack.
function groupElemIdToIdx(elem: Element): number {
    return Number.parseInt(elem.id.split('dungeon')[1] ?? "-1");
}

// do a full save of everything.
function saveStorage() {
    if (hackNoSaveWhileLoading) {
        return;
    }

    setCookie({
        iZoom: (<HTMLInputElement> document.getElementsByName('itemdivsize')[0]).value,
        mZoom: (<HTMLInputElement> document.getElementsByName('mapdivsize')[0]).value,
        mPos: (<HTMLInputElement> document.getElementsByName('mapposition')[1]).checked ? 1 : 0,
        prize: (<HTMLInputElement> document.getElementsByName('showprizes')[0]).checked ? 1 : 0,
        rewards: rewards,
        obtainedItems: store.items,
    });

    localStorage.setItem('settings', JSON.stringify(store.settings));
    localStorage.setItem('itemLayout', JSON.stringify(itemLayout));
    saveChecks();
}

function saveChecks() {
    localStorage.setItem('openedChecks', JSON.stringify(serializeChecks()));
}

function serializeChecks() {
    return [...store.openedChecks];
}

function deserializeChecks(serializedChecks: Iterable<CheckName> | null | undefined) {
    store.openedChecks = new Set(serializedChecks);
}

function onCheckChanged(c: CheckName): CheckStatus {
    const oldStatus = checkStatus(c);

    if (!store.openedChecks.delete(c)) {
        store.openedChecks.add(c);
    }

    const status = checkStatus(c);

    if (status === 'available') {
        updateCheckCounter({ kind: "modify", items: 1 });
    } else if (status === "opened" && oldStatus === "available") {
        updateCheckCounter({ kind: "modify", items: -1 });
    } else {
        updateCheckCounter({ kind: "modify", items: 0 });
    }

    return status;
}

// Event of clicking a chest on the map
export function toggleChest(sender: HTMLButtonElement, c: CheckName) {
    const status = onCheckChanged(c);

    sender.ariaPressed = ("opened" === status).toString();
    sender.dataset.status = status;

    saveChecks();
}

// Event of clicking a dungeon box on the map
/** @param {MouseEvent} ev  */
export function clickDungeon(ev: MouseEvent) {
    document.querySelector('.dungeon.active')?.classList.remove('active');

    const elem = (ev.currentTarget! as HTMLElement);

    elem.classList.add('active');

    const dungeonSelect = groupElemIdToIdx(elem);

    document.getElementById('submaparea')!.textContent = groups[dungeonSelect].name;
    document.getElementById('submaparea')!.className = 'DC' + groupStatus(groups[dungeonSelect]);
    const submaplist = document.getElementById('submaplist')!;
    submaplist.replaceChildren();

    const frag = document.createDocumentFragment();

    for (const check of groups[dungeonSelect].checks) {
        const s = document.createElement('li');
        s.textContent = check;

        s.className = 'DC' + checkStatus(check);

        s.onclick = (ev) => toggleDungeonChest(ev.currentTarget! as HTMLElement, check);
        s.style.cursor = "pointer";

        frag.appendChild(s);
    }

    submaplist.append(frag);
}

export function toggleDungeonChest(sender: HTMLElement, c: CheckName) {
    const status = onCheckChanged(c);

    sender.className = 'DC' + status;

    updateMap();
    saveChecks();
}

export function setOrder(H: any, save = true) {
    const layoutdiv = document.getElementById('layoutdiv')!;
    if (H) {
        layoutdiv.classList.remove('flexcontainer');
    } else {
        layoutdiv.classList.add('flexcontainer');
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

export function setSkipOption(option: string, sender: { checked: boolean; }) {
    const skip = store.settings.randomizer.skip;
    if (!(option in skip)) {
        console.error("Invalid skip option", option);
        return;
    }

    // TS isn't inferring this correctly.
    skip[(option as keyof typeof skip)] = sender.checked;
    updateMap();
    saveStorage();
}

export function setKeysy(sender: { checked: boolean; }) {
    // for an item tracker we don't really care about anything other than keysy.
    const value = sender.checked ? "keysy" : "vanilla";
    store.settings.randomizer.smallKeys = value;

    updateMap();
    saveStorage();
}

export function setFaronEscape(sender: { checked: boolean; }) {
    // for an item tracker we don't really care about anything other than keysy.
    const value = sender.checked ? "open" : "closed";
    store.settings.randomizer.faronWoodsLogic = value;

    updateMap();
    saveStorage();

}

export function setLogic(sender: { value: LogicValue; }) {
    if (store.settings.randomizer.logic === sender.value) {
        return;
    }

    try {
        store.logic = new Logic(sender.value);
        store.settings.randomizer.logic = sender.value;
    } catch (e) {
        window.alert(`Logic setting: ${sender.value} is unsupported currently: ${e}`);
        return;
    }

    updateMap();
}

export function setTracker() {
    const visible = (document.querySelector("input[name='checktracker']:checked")! as HTMLInputElement).value;

    const collection = document.getElementById('mapoverlay')!.getElementsByClassName("chest");

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
    const elem = document.getElementById(target)!;
    elem.style.transformOrigin = '0 0';
    elem.style.transform = `scale(${value / 100})`;

    document.getElementById(target + 'size')!.textContent = (value) + '%';

    if (save === true) {
        saveStorage();
    }
}

//Set map distance from item tracker
function setDistance(target: string, sender: { value: number; }, save = true) {
    document.getElementById(target)!.style.width = (sender.value / 40 * 20) + "%";

    document.getElementById(target + 'size')!.textContent = (sender.value) + '%';


    if (save === true) {
        saveStorage();
    }
}


//function for setting the custom background images
function setBackground() {
    const sel = <HTMLSelectElement | null> document.getElementById('background-select');
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
export function showSettings(sender: HTMLElement) {
    if (editmode) {
        editmode = false;
        updateGridItemAll();
        showTracker(<HTMLInputElement> document.getElementsByName('showmap')[0]);
        document.getElementById('itemconfig')!.style.display = 'none';
        sender.textContent = '🔧';
        saveStorage();
    } else {
        const x = document.getElementById('settings')!;
        if (!x.style.display || x.style.display == 'none') {
            x.style.display = 'initial';
            sender.textContent = 'X';
        } else {
            x.style.display = 'none';
            sender.textContent = '🔧';
        }
    }
}

//displays the map tracker
function showTracker(sender: { checked: boolean; }) {
    if (sender.checked) {
        document.getElementById('mapdiv')!.style.display = '';
    }
    else {
        document.getElementById('mapdiv')!.style.display = 'none';
    }
}

//sets all of the item and map options to their defaults
export function resetLayout() {
    initGridRow(defaultItemGrid);
    updateGridItemAll();

    setZoom('itemdiv', cookieDefault.iZoom, false);
    document.getElementById('itemrange')!.value = 100;

    setZoom('mapdiv', cookieDefault.iZoom, false);
    document.getElementById('maprange')!.value = 100;

    setDistance('blankspace', { value: 1 });
    document.getElementById('trackerDistanceID')!.value = 1;

    document.body.style.backgroundImage = `url(${Backgrounds.none})`;
    saveStorage();
}


export function editMode() {
    editmode = true;

    updateGridItemAll();
    showTracker({ checked: false });
    document.getElementById('settings')!.style.display = 'none';
    document.getElementById('itemconfig')!.style.display = '';

    document.getElementById('settingsbutton')!.textContent = 'Exit Edit Mode';
}

function ResetTracker() {
    store.openedChecks.clear();
    store.items = Object.assign({}, baseItems);
    document.getElementById('maptracker')!.checked = true;
    setTracker();

    updateGridItemAll();
    updateMap();
    updateCheckCounter("full");
    saveStorage();
}


//adds an item to the item tracker 
function addItem(row: number) {
    const elem = document.getElementById('itemdiv')?.children[row];

    if (elem === null) {
        return;
    }

    const col = itemLayout[row].length;
    itemLayout[row].push(null);

    (elem as HTMLElement).appendChild(makeGridItem(row, col, null));

    saveStorage();
}

function removeItem(row: number) {
    const item = itemLayout[row].pop();

    // no elements in the item layout, all that's left are the create/delete buttons.
    if (typeof (item) === "undefined") {
        return;
    }

    document.getElementById('itemdiv')?.children[row].lastElementChild?.remove();

    saveStorage();
}

//sets the images, etc of an item 
function updateGridItem(row: number, col: number) {
    const item = itemLayout[row][col];

    const elem = document.getElementById('itemdiv')?.children[row]?.children[col + 1] ?? null;

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
    let r: number, c: number;

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


function makeGridItem(row: number, col: number, item: ItemId | null) {
    const elem = document.createElement('div');
    elem.className = 'trackerItem';
    elem.onclick = () => gridItemClick(row, col, false);
    elem.oncontextmenu = (ev) => {
        gridItemRClick(row, col, false);
        ev.preventDefault();
    };

    if (item !== null && isNumericItemId(item) && !isProgressiveItemId(item)) {
        const cornerItem = makeGridItemCorner(item);
        cornerItem.onclick = (ev) => {
            gridItemClick(row, col, true);
            ev.stopPropagation();
        };
        cornerItem.oncontextmenu = (ev) => {
            gridItemRClick(row, col, true);
            ev.stopPropagation();
            ev.preventDefault();
        };
        elem.appendChild(cornerItem);
    }


    elem.style.backgroundImage = makeItemImages(item);

    elem.classList.add(((item !== null) && !!store.items[item]).toString());

    return elem;
}

function makeGridItemCorner(item: Exclude<NumericItemId, ProgressiveItemId>): HTMLElement {
    // todo:
    // if (item in rewards) { }

    const value = store.items[item];
    const displayedValue = editmode ? itemsMax[item] : value;

    const elem = document.createElement('div');
    elem.className = 'trackerTextIcon';
    const textSpan = document.createElement('span');
    textSpan.textContent = displayedValue > 0 ? displayedValue.toString() : '';
    if (displayedValue === itemsMax[item]) {
        elem.style.color = "#00ff00";
    }

    elem.appendChild(textSpan);

    return elem;
}

function makeItemImages(item: ItemId | null): string {
    const makeStyle = (images: string[]) => images.map(elem => `url(${elem})`).join(',');

    // itemGrid[row][col]['item'].style.border = '0px';

    const imageStack: string[] = [];

    if (item !== null) {
        if (isProgressiveItemId(item)) {
            imageStack.push(Items[`${item}${store.items[item]}`]);
        } else {
            imageStack.push(Items[item]);
        }
    }

    if (store.settings.itemBoxes) {
        imageStack.push(itemBoxImage);
    }


    return makeStyle(imageStack);

    // z[row][col]['item'].className = 'griditem ' + !!store.items[item];
}

function initGridRow(itemsets: LayoutItem[][]) {
    console.debug("building item grid", itemsets);

    const grid = document.getElementById('itemdiv')!;

    for (const [i, row] of itemsets.entries()) {
        const rowElem = document.createElement('div');
        rowElem.style.display = "flex";
        rowElem.style.justifyContent = "center";
        rowElem.style.gap = "0.2em";


        const addButton = document.createElement('button');

        addButton.className = 'edit-mode add';
        addButton.textContent = '+';
        addButton.style.display = 'none';
        addButton.onclick = () => addItem(i);



        const removeButton = document.createElement('button');
        removeButton.className = 'edit-mode remove';
        removeButton.textContent = '-';
        removeButton.style.display = 'none';
        removeButton.onclick = () => removeItem(i);

        const buttonBox = document.createElement('div');
        buttonBox.style.alignSelf = 'center';
        buttonBox.appendChild(addButton);
        buttonBox.appendChild(removeButton);

        rowElem.appendChild(buttonBox);

        for (const [j, col] of row.entries()) {
            const colItem = makeGridItem(i, j, col);
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

function editModeItemClick(row: number, col: number) {
    if ("item" in selected) {
        document.getElementById(selected.item)!.style.border = '';
        const old = itemLayout[row][col];

        if (old == selected.item) {
            selected = {};
            return;
        }

        itemLayout[row][col] = selected.item as ItemId;
        updateGridItem(row, col);
        selected = {};
        saveStorage();
    } else if ("row" in selected) {
        const temp = itemLayout[row][col];
        itemLayout[row][col] = itemLayout[selected.row][selected.col];
        itemLayout[selected.row][selected.col] = temp;
        updateGridItem(row, col);
        updateGridItem(selected.row, selected.col);
        saveStorage();
        selected = {};
    } else {
        const elem = document.getElementById('itemdiv')?.children[row]?.children[col + 1] ?? null;

        if (!elem) {
            return;
        }

        (elem as HTMLElement).style.border = '3px solid yellow';
        selected = { row: row, col: col };
    }
}


function updateItem(row: number, col: number, corner: boolean, value: 1 | -1) {
    // cursed function, but it does evreything it needs to.
    const newValue = (min: number, max: number, old: number) => {
        const modRange = (max - min + 1);
        return (((old + value - min) % modRange) + modRange) % modRange + min;
    };

    const item = itemLayout[row][col];

    if (item === null) {
        return;
    }

    if (corner === true && isReward(item) && showprizes) {
        //this is where the code for the dungeon list happenes
        //corner 3 is bottom right

        rewards[item] = newValue(0, 8, rewards[item]);

        updateGridItem(row, col);
        saveStorage();
        return;
    }

    if (isNumericItemId(item)) {
        store.items[item] = newValue(itemsMin[item], itemsMax[item], store.items[item]);
    } else {
        store.items[item] = !store.items[item];
    }

    updateMap();
    updateGridItem(row, col);
    updateCheckCounter();
    saveStorage();
}

export function gridItemClick(row: number, col: number, corner: boolean) {
    if (editmode) {
        editModeItemClick(row, col);
        return;
    }

    updateItem(row, col, corner, 1);
}


function gridItemRClick(row: number, col: number, corner: boolean) {
    if (editmode) {
        return;
        //Do Nothing
    }

    updateItem(row, col, corner, -1);
}

function updateMap() {
    store.logic.zonesDirty = true;
    for (const [i, check] of overworld.entries()) {
        // nothing has changed if it's already open.
        if (!store.openedChecks.has(check.name)) {
            document.getElementById(`overworld${i}`)!.dataset.status = checkStatus(check.name);
        }
    }

    for (const [i, group] of groups.entries()) {
        const elem = document.getElementById('dungeon' + i)!;

        elem.dataset.status = groupStatus(group);

        const availableChecks = group.checks.reduce((total, it) => total + +(checkStatus(it) === "available"), 0);

        const child = elem.querySelector('.chestCount');

        if (child !== null) {
            child.textContent = availableChecks === 0 ? '' : availableChecks.toString();
        }
    }

    const activeDungeon = document.querySelector('.dungeon.active');
    if (activeDungeon === null) {
        return;
    }

    const dungeonSelect = groupElemIdToIdx(activeDungeon);

    document.getElementById('submaparea')!.className = 'DC' + groupStatus(groups[dungeonSelect]);
    const itemlist = document.getElementById('submaplist')!.children;
    for (const item in itemlist) {
        if (Object.hasOwn(itemlist, item)) {
            itemlist[item].className = 'DC' + checkStatus(groups[dungeonSelect].checks[item]);
        }
    }
}

function itemConfigClick(sender: HTMLElement) {
    const item = sender.id as ItemId;

    if ("item" in selected) {
        document.getElementById(selected.item)!.style.border = '0px';
        sender.style.border = '3px solid yellow';
        selected = { item: item };
    } else if ("row" in selected) {
        const old = itemLayout[selected.row][selected.col];

        if (old === item) {
            selected = {};
            return;
        }

        itemLayout[selected.row][selected.col] = item;
        updateGridItem(selected.row, selected.col);

        selected = {};
    } else {
        sender.style.border = '3px solid yellow';
        selected = { item: item };
    }
}

function populateMapdiv() {
    const frag = document.createDocumentFragment();

    let totalAvailable = 0;

    for (const [i, check] of overworld.entries()) {
        const s = document.createElement('button');
        s.id = `overworld${i}`;
        s.onclick = () => toggleChest(s, check.name);
        s.style.left = check.x;
        s.style.top = check.y;

        s.ariaPressed = store.openedChecks.has(check.name).toString();

        const checkData = checkDataGlitchless[checkIdsGlitchless[check.name]];

        const checkKind = (checkData?.kind ?? "standard");

        const status = checkStatus(check.name);

        s.dataset.status = status;

        totalAvailable += +(status === "available");

        s.classList.add('chest', checkKind);

        const itemCount = document.createElement('span');
        itemCount.role = 'tooltip';
        itemCount.id = `ow-tt${i}`;
        itemCount.textContent = check.name;

        s.setAttribute('aria-labelledby', itemCount.id);

        s.appendChild(itemCount);

        frag.appendChild(s);
    }

    for (const [i, group] of groups.entries()) {
        const groupElem = document.createElement('button');
        groupElem.id = `dungeon${i}`;
        groupElem.onclick = (ev) => clickDungeon(ev);
        groupElem.style.left = group.x;
        groupElem.style.top = group.y;
        groupElem.className = 'dungeon';
        groupElem.dataset.status = groupStatus(group);

        const availableChecks = group.checks.reduce((total, it) => total + +(checkStatus(it) === "available"), 0);

        totalAvailable += availableChecks;

        const itemCount = document.createElement('span');
        itemCount.className = 'chestCount';
        itemCount.textContent = availableChecks === 0 ? '' : availableChecks.toString();

        groupElem.appendChild(itemCount);

        const tooltip = document.createElement('span');
        tooltip.role = 'tooltip';
        tooltip.id = `dun-tt${i}`;
        tooltip.className = 'gray';
        tooltip.textContent = group.name;

        groupElem.setAttribute('aria-labelledby', tooltip.id);

        groupElem.appendChild(tooltip);

        frag.appendChild(groupElem);
    }

    const mapdiv = document.getElementById('mapoverlay')!;

    mapdiv.appendChild(frag);

    updateCheckCounter({ kind: "set", items: totalAvailable });
}


let availableItemCache = 0;
function updateCheckCounter(availableDamage: { kind: "modify", items: number; } | { kind: "set", items: number; } | "full" = "full") {

    if (availableDamage === "full") {
        availableItemCache = checkDataGlitchless.reduce((total, it) => total + +(checkStatus(it.name) === "available"), 0);
    } else {
        switch (availableDamage.kind) {
            case "modify":
                availableItemCache += availableDamage.items;
                break;
            case "set":
                availableItemCache = availableDamage.items;
                break;
        }
    }

    const available = availableItemCache;

    const total = checkDataGlitchless.length;
    const opened = store.openedChecks.size;
    // const available = checkDataGlitchless.reduce((total, it) => total + +(checkStatus(it.name) === "available"), 0)

    document.getElementById('checkCounter')!.textContent = `Checks: ${available} Available, ${(total - opened)} Remaining, ${total} Total`;
}

function populateItemconfig() {
    const makeStyle = (images: string[]) => {
        return images.map(elem => `url(${elem})`).join(',');
    };

    const grid = document.getElementById('itemconfig')!;

    let i = 0;

    let row: HTMLTableRowElement;

    for (const key of <ItemId[]> Object.keys(store.items)) {
        if (i % 10 == 0) {
            row = document.createElement('tr');
            grid.appendChild(row);
        }
        i++;

        const rowitem = document.createElement('td');
        rowitem.className = 'corner';
        rowitem.id = key;
        rowitem.style.backgroundSize = '100% 100%';
        rowitem.onclick = (ev) => itemConfigClick(ev.currentTarget as HTMLElement);

        if (!isNumericItemId(key)) {
            rowitem.style.backgroundImage = makeStyle([Items[key]]);
        } else if (isProgressiveItemId(key)) {
            rowitem.style.backgroundImage = makeStyle([Items[`${key}${store.items[key]}`]]);
        }
        else {
            rowitem.style.backgroundImage = makeStyle([ItemCounts[`${itemsMax[key]}max`], Items[key]]);
        }

        row.appendChild(rowitem);
    }
}

//runs on site load
export function init() {
    loadStorage();
    populateMapdiv();
    populateItemconfig();
    saveStorage();
    setTracker();
}

// Created by Lunar Soap, TreZc0_, TestRunner
