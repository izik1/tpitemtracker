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

//sets the images of the dungeon rewards to their appropriate values
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
showprizes = true;
var mouseOverItem = false;
var mouseLastOverR;
var mouseLastOverC;
var mouseLastOverCor;
var opened = 0;

var itemGrid = [];
var itemLayout = [];

var editmode = false;
var selected = {};

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
    obtainedItems: items,
}

// fixme: remove this
var hackNoSaveWhileLoading = false

// loads everything.
function loadStorage() {
    hackNoSaveWhileLoading = true
    cookieobj = getCookie();

    Object.keys(cookieDefault).forEach(function (key) {
        if (cookieobj[key] === undefined) {
            cookieobj[key] = cookieDefault[key];
        }
    });

    rewards = JSON.parse(JSON.stringify(cookieobj.rewards));
    initGridRow(JSON.parse(localStorage.getItem('itemLayout')) ?? defaultItemGrid);
    items = JSON.parse(JSON.stringify(cookieobj.obtainedItems));

    deserializeChecks(JSON.parse(localStorage.getItem('openedChecks')));

    updateGridItemAll();

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

    cookieobj = {};

    cookieobj.iZoom = document.getElementsByName('itemdivsize')[0].value;
    cookieobj.mZoom = document.getElementsByName('mapdivsize')[0].value;

    cookieobj.mPos = document.getElementsByName('mapposition')[1].checked ? 1 : 0;

    cookieobj.prize = document.getElementsByName('showprizes')[0].checked ? 1 : 0;

    cookieobj.rewards = JSON.parse(JSON.stringify(rewards));
    localStorage.setItem('itemLayout', JSON.stringify(itemLayout));
    cookieobj.obtainedItems = JSON.parse(JSON.stringify(items));
    setCookie(cookieobj);
    saveChecks()
}

function saveChecks() {
    localStorage.setItem('openedChecks', JSON.stringify(serializeChecks()));
}

function serializeChecks() {
    return [...openedChecks];
}

function deserializeChecks(serializedChecks) {
    openedChecks = new Set(serializedChecks)
}

// Event of clicking a chest on the map
function toggleChest(sender, c) {
    if (!openedChecks.delete(c)) {
        openedChecks.add(c);
    }

    sender.ariaPressed = openedChecks.has(c);

    sender.dataset.status = checkStatus(c);

    updateItemCounter();
    saveChecks()
}


// Event of clicking a dungeon box on the map
/** @param {MouseEvent} ev  */
function clickDungeon(ev) {
    document.querySelector('.dungeon.active')?.classList.remove('active');

    ev.currentTarget.classList.add('active');
    document.getElementById('dungeon' + dungeonSelect).classList.remove('active');
    document.getElementById('dungeon' + dungeonSelect).classList.add('active');

    document.getElementById('submaparea').innerHTML = groups[dungeonSelect].name;
    document.getElementById('submaparea').className = 'DC' + groupStatus(groups[dungeonSelect]);
    var DClist = document.getElementById('submaplist');
    DClist.innerHTML = '';

    for (const check of groups[dungeonSelect].checks) {
        var s = document.createElement('li');
        s.innerHTML = check;

        s.className = 'DC' + checkStatus(check);

        s.onclick = new Function(`toggleDungeonChest(this,"${check}")`);
        s.style.cursor = "pointer";

        DClist.appendChild(s);

    }
}

function toggleDungeonChest(sender, c) {
    if (!openedChecks.delete(c)) {
        openedChecks.add(c);
    }

    sender.className = 'DC' + checkStatus(c);

    updateMap();
    updateItemCounter();
    saveChecks()
}

function setOrder(H, save = true) {
    if (H) {
        document.getElementById('layoutdiv').classList.remove('flexcontainer');
    } else {
        document.getElementById('layoutdiv').classList.add('flexcontainer');
    }

    if (save) {
        saveStorage();
    }
}

function showPrizes(checked, save = true) {
    showprizes = checked;
    updateGridItemAll();

    if (save) {
        saveStorage();
    }
}

//Set the values for the skips if their boxes are checked
function setFaronEscape(sender) {
    faronescape = sender.checked;
    if (!faronescape) {
        FaronEscape = false;
        updateMap();
    }
    else {
        FaronEscape = true;
        updateMap();
    }
}

function setTwilightSkip(sender) {
    TwilightSkip = sender.checked;
    updateMap();
}

function setRemoveBoxes(sender) {
    removeboxes = sender.checked;
    if (!removeboxes) {
        RemoveBoxes = false;
        updateGridItemAll();
    }
    else {
        RemoveBoxes = true;
        updateGridItemAll();
    }
}

function setSkipMdh(sender) {
    skipmdh = sender.checked;
    if (!skipmdh) {
        SkipMDH = false;
        updateMap();
    }
    else {
        SkipMDH = true;
        updateMap();
    }
}

function setSkipIntro(sender) {
    skipintro = sender.checked;
    if (!skipintro) {
        SkipIntro = false;
        updateMap();
    }
    else {
        SkipIntro = true;
        updateMap();
    }
}

function setEarlyDesert(sender) {
    earlydesert = sender.checked;
    if (!earlydesert) {
        EarlyDesert = false;
        updateMap();
    }
    else {
        EarlyDesert = true;
        updateMap();
    }
}

function setEarlyCits(sender) {
    earlycits = sender.checked;
    if (!earlycits) {
        EarlyCits = false;
        updateMap();
    }
    else {
        EarlyCits = true;
        updateMap();
    }
}

function setOpenGates(sender) {
    opengates = sender.checked;
    if (!opengates) {
        OpenGates = false;
        updateMap();
    }
    else {
        OpenGates = true;
        updateMap();
    }
}

function setMinesPatch(sender) {
    minespatch = sender.checked;
    if (!minespatch) {
        MinesPatch = false;
        updateMap();
    }
    else {
        MinesPatch = true;
        updateMap();
    }
}

function setNoBottleReq(sender) {
    nobottlereq = sender.checked;
    if (!nobottlereq) {
        NoBottleReq = false;
        updateMap();
    }
    else {
        NoBottleReq = true;
        updateMap();
    }
}

function setEarlyHyruleCastle(sender) {
    earlyhyrulecastle = sender.checked;
    if (!earlyhyrulecastle) {
        EarlyHyruleCastle = false;
        updateMap();
    }
    else {
        EarlyHyruleCastle = true;
        updateMap();
    }
}

function setEscortSkip(sender) {
    escortskip = sender.checked;
    if (!escortskip) {
        EscortSkip = false;
        updateMap();
    }
    else {
        EscortSkip = true;
        updateMap();
    }
}

function setEarlyToT(sender) {
    earlytot = sender.checked;
    if (!earlytot) {
        EarlyToT = false;
        updateMap();
    }
    else {
        EarlyToT = true;
        updateMap();
    }
}

function setEarlyPoT(sender) {
    earlypot = sender.checked;
    if (!earlypot) {
        EarlyPoT = false;
        updateMap();
    }
    else {
        EarlyPoT = true;
        updateMap();
    }
}

//sets the icons for the Talo Map
function setTaloMap(sender) {
    talomap = sender.checked;
    if (!talomap) {
        TaloMap = false;
        document.getElementById("mapdiv").style.removeProperty("background-image");
        document.body.style.backgroundImage = "url('images/Backgrounds/none.png')";
        updateMap();
        updateGridItemAll();
    }
    else {
        TaloMap = true;
        document.getElementById("mapdiv").style.backgroundImage = "url('images/taloItems/map.png')";
        document.body.style.backgroundImage = "url('images/taloItems/paper.jpg')";
        updateMap();
        updateGridItemAll();
    }
}

//set glitched logic options
function setGlitchedLogicOff() {
    glitchedLogic = false;
    updateMap();
}

function setGlitchedLogicOn() {
    glitchedLogic = true;
    updateMap();
}

function setTracker() {
    /** @type {CheckKind} */
    let visible = document.querySelector("input[name='checktracker']:checked").value;

    const collection = document.getElementById('mapoverlay').getElementsByClassName("chest")

    for (element of collection) {
        if (element.classList.contains(visible)) {
            element.style.display = '';
        } else {
            element.style.display = "none";
        }
    }
}

// Options for when a person clicks on the different check options
function setMapTracker(force) {
    setTracker()
}

function setPoeTracker() {
    setTracker()
}

function setBugTracker() {
    setTracker()

}

//Set map zoom
function setZoom(target, value, save = true) {
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
function setDistance(target, sender) {
    document.getElementById(target).style.width = (sender.value / 40 * 20) + "%";
    document.getElementById(target).style.width = (sender.value / 40 * 20) + "%";

    document.getElementById(target + 'size').innerHTML = (sender.value) + '%';
    saveStorage();
}

//set unused item opacity
function setOpacity(target, sender) {
    x = document.getElementsByClassName(target);
    for (var i = 0; i < x.length; i++) {
        x[i].style.backgroundColor = "rgba(0,0,0, " + sender.value / 100 + ")";
    }

    document.getElementById(target + 'size').innerHTML = (sender.value) + '%';
    saveStorage();
}


//function for setting the custom background images
function setBackground() {
    var none = document.getElementById("none").selected;
    var castle = document.getElementById("castle").selected;
    var meadow = document.getElementById("meadow").selected;
    var bridge = document.getElementById("bridge").selected;

    if (none == true) {
        document.body.style.backgroundImage = "url('images/Backgrounds/none.png')";
    }
    else if (castle == true) {
        document.body.style.backgroundImage = "url('images/Backgrounds/castle.jpg')";
    }
    else if (meadow == true) {
        document.body.style.backgroundImage = "url('images/Backgrounds/meadow.jpg')";
    }
    else if (bridge == true) {
        document.body.style.backgroundImage = "url('images/Backgrounds/bridge.jpg')";
    }
}

//backend for the settings button
function showSettings(sender) {
    if (editmode) {
        var r, c;
        var startdraw = false;

        editmode = false;
        updateGridItemAll();
        showTracker('mapdiv', document.getElementsByName('showmap')[0]);
        document.getElementById('itemconfig').style.display = 'none';
        document.getElementById('rowButtons').style.display = 'none';
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
function showTracker(target, sender) {
    if (sender.checked) {
        document.getElementById(target).style.display = '';
    }
    else {
        document.getElementById(target).style.display = 'none';
    }
}

//sets the parameters for edit mode
function EditMode() {
    var r, c;

    editmode = true;
    updateGridItemAll();
    showTracker('mapdiv', { checked: false });
    document.getElementById('settings').style.display = 'none';
    document.getElementById('itemconfig').style.display = '';
    document.getElementById('rowButtons').style.display = 'flex';

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
    document.body.style.backgroundImage = "url('images/Backgrounds/none.png')";
    saveStorage();
}


function ResetTracker() {
    openedChecks.clear()
    items = Object.assign({}, baseItems);
    document.getElementById('maptracker').checked = true;
    setMapTracker();

    updateGridItemAll();
    updateMap();
    document.getElementById('checkCounter').innerHTML = "Checks: " + (dungeonChest + c) + " available, " + totalChecks + " Remaining";
    saveStorage();
}

// creates an extra row when in edit mode
function addItemRow() {
    var sender = document.getElementById('itemdiv')
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
    itemGrid[r]['addbutton'].onclick = new Function("addItem(" + r + ")");
    itemGrid[r]['row'].appendChild(itemGrid[r]['addbutton']);

    itemGrid[r]['removebutton'] = document.createElement('button');
    itemGrid[r]['removebutton'].innerHTML = '-';
    itemGrid[r]['removebutton'].style.backgroundColor = 'red';
    itemGrid[r]['removebutton'].style.color = 'white';
    itemGrid[r]['removebutton'].onclick = new Function("removeItem(" + r + ")");
    itemGrid[r]['row'].appendChild(itemGrid[r]['removebutton']);

    saveStorage();
}

// removes an item row when in edit mode
function removeItemRow() {
    var sender = document.getElementById('itemdiv')
    var r = itemLayout.length - 1;

    sender.removeChild(itemGrid[r]['tablerow'])
    itemGrid.splice(r, 1);
    itemLayout.splice(r, 1);

    saveStorage();
}

//adds an item to the item tracker 
function addItem(r) {
    var i = itemLayout[r].length

    itemGrid[r][i] = [];
    itemLayout[r][i] = 'blank';

    itemGrid[r][i]['item'] = document.createElement('td');
    itemGrid[r][i]['item'].className = 'griditem';
    itemGrid[r]['row'].appendChild(itemGrid[r][i]['item']);

    var tdt = document.createElement('table');
    tdt.className = 'lonk';
    itemGrid[r][i]['item'].appendChild(tdt);
    var tdtr1 = document.createElement('tr');
    tdt.appendChild(tdtr1);
    itemGrid[r][i][0] = document.createElement('th');
    itemGrid[r][i][0].className = 'corner';
    itemGrid[r][i][0].onmouseover = new Function("setMOver(" + r + "," + i + ",0)")
    itemGrid[r][i][0].onmouseout = new Function("setMOff()")
    itemGrid[r][i][0].onclick = new Function("gridItemClick(" + r + "," + i + ",0)");
    tdtr1.appendChild(itemGrid[r][i][0]);
    itemGrid[r][i][1] = document.createElement('th');
    itemGrid[r][i][1].className = 'corner';
    itemGrid[r][i][1].onmouseover = new Function("setMOver(" + r + "," + i + ",1)")
    itemGrid[r][i][1].onmouseout = new Function("setMOff()")
    itemGrid[r][i][1].onclick = new Function("gridItemClick(" + r + "," + i + ",1)");
    tdtr1.appendChild(itemGrid[r][i][1]);
    var tdtr2 = document.createElement('tr');
    tdt.appendChild(tdtr2);
    itemGrid[r][i][2] = document.createElement('th');
    itemGrid[r][i][2].className = 'corner';
    itemGrid[r][i][2].onmouseover = new Function("setMOver(" + r + "," + i + ",2)")
    itemGrid[r][i][2].onmouseout = new Function("setMOff()")
    itemGrid[r][i][2].onclick = new Function("gridItemClick(" + r + "," + i + ",2)");
    tdtr2.appendChild(itemGrid[r][i][2]);
    itemGrid[r][i][3] = document.createElement('th');
    itemGrid[r][i][3].className = 'corner';
    itemGrid[r][i][3].onmouseover = new Function("setMOver(" + r + "," + i + ",3)")
    itemGrid[r][i][3].onmouseout = new Function("setMOff()")
    itemGrid[r][i][3].onclick = new Function("gridItemClick(" + r + "," + i + ",3)");
    tdtr2.appendChild(itemGrid[r][i][3]);

    updateGridItem(r, i);
    saveStorage();
}
function removeItem(r) {
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
function updateGridItem(row, index) {
    var item = itemLayout[row][index];
    var itemImageURLHeader = 'url(images/Items/';
    var itemCountImageHeader = 'url(images/ItemCounts/';

    //if Talo's Map is enabled, set the URL header appropriately
    if (TaloMap) {
        itemImageURLHeader = 'url(images/taloItems/';
        itemCountImageHeader = 'url(images/taloItems/ItemCounts/';
    }

    if (editmode) {
        if (!item || item == 'blank') {
            itemGrid[row][index]['item'].style.backgroundImage = 'url(images/blank.png)';
        }
        else if ((typeof items[item]) == 'boolean') {
            itemGrid[row][index]['item'].style.backgroundImage = itemImageURLHeader + item + '.png)';
        }
        else {
            itemGrid[row][index]['item'].style.backgroundImage = itemCountImageHeader + itemsMax[item] + 'max.png),' + itemImageURLHeader + item + '.png)';
        }
        itemGrid[row][index]['item'].style.border = '1px solid white';
        itemGrid[row][index]['item'].className = 'griditem true'

        return;
    }

    itemGrid[row][index]['item'].style.border = '0px';

    if (!item || item == 'blank') {
        itemGrid[row][index]['item'].style.backgroundImage = '';
        return;
    }

    if (RemoveBoxes) {
        if ((typeof items[item]) == 'boolean') {
            itemGrid[row][index]['item'].style.backgroundImage = itemImageURLHeader + item + '.png)';
        }
        else if (progressiveItems.includes(item)) {
            itemGrid[row][index]['item'].style.backgroundImage = itemImageURLHeader + item + items[item] + '.png';
        }
        else {
            if (items[item] == itemsMax[item]) {
                itemGrid[row][index]['item'].style.backgroundImage = itemCountImageHeader + items[item] + 'max.png),' + itemImageURLHeader + item + '.png)';
            }
            else {
                itemGrid[row][index]['item'].style.backgroundImage = itemCountImageHeader + items[item] + '.png),' + itemImageURLHeader + item + '.png)';
            }
        }
    }
    else {
        if ((typeof items[item]) == 'boolean') {
            itemGrid[row][index]['item'].style.backgroundImage = itemImageURLHeader + item + '.png), url(images/ItemBox.png)';
        }
        else if (progressiveItems.includes(item)) {
            itemGrid[row][index]['item'].style.backgroundImage = itemImageURLHeader + item + items[item] + '.png), url(images/ItemBox.png)';
        }
        else {
            if (items[item] == itemsMax[item]) {
                itemGrid[row][index]['item'].style.backgroundImage = itemCountImageHeader + items[item] + 'max.png),' + itemImageURLHeader + item + '.png), url(images/ItemBox.png)';
            }
            else {
                itemGrid[row][index]['item'].style.backgroundImage = itemCountImageHeader + items[item] + '.png),' + itemImageURLHeader + item + '.png), url(images/ItemBox.png)';
            }
        }
    }


    itemGrid[row][index]['item'].className = 'griditem ' + !!items[item];

    if (rewards[item] !== undefined) {
        if (showprizes) {
            itemGrid[row][index][3].style.backgroundImage = 'url(images/' + dungeonImg[rewards[item]] + '.png)';
        } else {
            itemGrid[row][index][3].style.backgroundImage = '';
        }
    }
}


function updateGridItemAll() {
    var r, c;
    for (r = 0; r < itemLayout.length; r++) {
        for (c = 0; c < itemLayout[r].length; c++) {
            updateGridItem(r, c);
        }

        if (editmode) {
            itemGrid[r]['addbutton'].style.display = ''
            itemGrid[r]['removebutton'].style.display = ''
        }
        else {
            itemGrid[r]['addbutton'].style.display = 'none'
            itemGrid[r]['removebutton'].style.display = 'none'
        }
    }
}


function setGridItem(item, row, index) {
    while (!itemLayout[row]) {
        addItemRow();
    }
    while (!itemLayout[row][index]) {
        addItem(row);
    }

    itemLayout[row][index] = item;
    updateGridItem(row, index);
}


function initGridRow(itemsets) {
    while (itemLayout.length > 0) {
        removeItemRow();
    }

    var r, c;
    for (r = 0; r < itemsets.length; r++) {
        for (c = 0; c < itemsets[r].length; c++) {
            setGridItem(itemsets[r][c], r, c);
        }
    }
}

function setMOver(row, col, corner) {
    //keep track of what item you moused over.
    mouseLastOverCor = corner;
    mouseLastOverR = row;
    mouseLastOverC = col;
    mouseOverItem = true;

}

function setMOff() {
    mouseOverItem = false;
}
function gridItemClick(row, col, corner) {
    if (editmode) {
        if (selected.item) {
            document.getElementById(selected.item).style.border = '1px solid white';
            var old = itemLayout[row][col];

            if (old == selected.item) {
                selected = {};
                return;
            }

            itemLayout[row][col] = selected.item;
            updateGridItem(row, col);
            selected = {};
            document.getElementById(old).style.opacity = 1;
        } else if (selected.row !== undefined) {
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
            if (corner == 3) {
                rewards[item]++;
                if (rewards[item] >= 9) {
                    rewards[item] = 0;
                }
            }
            else {
                items[item] = !items[item];
            }
        }
        else if ((typeof items[item]) == 'boolean') {
            items[item] = !items[item];
        } else {
            items[item]++;
            if (items[item] > itemsMax[item]) {
                items[item] = itemsMin[item];
            }
        }

    }
    updateMap();
    updateGridItem(row, col);
    updateItemCounter();
    saveStorage();
}


function gridItemRClick(row, col, corner) {
    if (editmode) {
        //Do Nothing
    } else {
        var item = itemLayout[row][col];

        if (rewards[item] !== undefined && showprizes) {
            if (corner == 3) {
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
                items[item] = !items[item];
            }
        }
        else if ((typeof items[item]) == 'boolean') {
            items[item] = !items[item];
        }
        else {
            if (items[item] == itemsMin[item]) {
                items[item] = itemsMax[item]
            } else {
                items[item]--;
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
        if (!openedChecks.has(check.name)) {
            document.getElementById(`overworld${i}`).dataset.status = checkStatus(check.name);
        }
    }

    for (const [i, group] of groups.entries()) {
        let elem = document.getElementById('dungeon' + i);

        elem.dataset.status = groupStatus(group);

        const availableChecks = group.checks.reduce((total, it) => total + (checkStatus(it) === "available"), 0)

        var child = elem.firstChild;
        while (child) {
            if (child.className == 'chestCount') {
                if (availableChecks === 0) {
                    child.innerHTML = '';
                } else {
                    child.innerHTML = availableChecks;
                }
                break;
            }
            child = child.nextSibling;
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

function itemConfigClick(sender) {
    var item = sender.id;

    if (selected.item) {
        document.getElementById(selected.item).style.border = '0px';
        sender.style.border = '3px solid yellow';
        selected = { item: item };
    } else if (selected.row !== undefined) {
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
    var mapdiv = document.getElementById('mapoverlay');

    for (const [i, check] of overworld.entries()) {
        let s = document.createElement('button');
        s.id = `overworld${i}`;
        s.onclick = _ev => toggleChest(s, check.name)
        s.style.left = check.x;
        s.style.top = check.y;

        s.ariaPressed = openedChecks.has(check.name);

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

        const availableChecks = group.checks.reduce((total, it) => total + (checkStatus(it) === "available"), 0)

        var itemCount = document.createElement('span');
        itemCount.className = 'chestCount';
        if (availableChecks === 0) {
            itemCount.innerHTML = '';
        } else {
            itemCount.innerHTML = availableChecks;
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
    const opened = openedChecks.size;
    const available = checkDataGlitchless.reduce((total, it) => total + (checkStatus(it.name) === "available"), 0)

    document.getElementById('checkCounter').innerHTML = `Checks: ${available} Available, ${(total - opened)} Remaining, ${total} Total`;
}

function populateItemconfig() {
    var grid = document.getElementById('itemconfig');

    var i = 0;

    var row;

    const itemImageURLHeader = 'url(images/Items/';
    const itemCountImageHeader = 'url(images/ItemCounts/';

    for (var key in items) {
        if (i % 10 == 0) {
            row = document.createElement('tr');
            grid.appendChild(row);
        }
        i++;

        var rowitem = document.createElement('td');
        rowitem.className = 'corner';
        rowitem.id = key;
        rowitem.style.backgroundSize = '100% 100%';
        rowitem.onclick = new Function('itemConfigClick(this)');
        if ((typeof items[key]) == 'boolean') {
            rowitem.style.backgroundImage = itemImageURLHeader + key + '.png)';
        } else {
            rowitem.style.backgroundImage = itemCountImageHeader + itemsMax[key] + 'max.png),' + itemImageURLHeader + key + '.png)';
        }
        row.appendChild(rowitem);
    }
}

//runs on site load
function init() {
    loadStorage();
    populateMapdiv();
    populateItemconfig();
    saveStorage();
    setMapTracker(true);
}

function preloader() {
    for (item in items) {
        if ((typeof items[item]) == 'boolean') {
            var img = new Image();
            if (TaloMap) {
                img.src = 'images/taloItems/' + item + '.png';
            }
            else {
                img.src = 'images/Items/' + item + '.png';
            }

        } else {
            for (i = itemsMin[item]; i < itemsMax[item]; i++) {
                var img = new Image();
                if (TaloMap) {
                    img.src = 'images/taloItems/' + item + '.png';
                }
                else {
                    img.src = 'images/Items/' + item + '.png';
                }
            }
        }
    }

    for (dungReward in dungeonImg) {
        var img = new Image();
        img.src = 'images/' + dungeonImg[dungReward] + '.png';
    }
}
function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function () {
            if (oldonload) {
                oldonload();
            }
            func();
        }
    }
}
addLoadEvent(preloader);
// Created by Lunar Soap, TreZc0_, TestRunner
