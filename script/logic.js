function hasDamagingIronBoots() {
    return (canDoNicheStuff() && items.IronBoots)
}

// Logic functions, these help make item requirements simpler and allow us not to clutter the individual item checks
function hasDamagingItem(checkNiche) {
    return items.Sword > 0
        || items.Chainball
        || items.Bow > 0
        || items.Bombs > 0
        || (items.IronBoots && (!checkNiche || canDoNicheStuff()))
        || items.Crystal
        || items.Spinner;
}

function canDefeatArealfos() {
    return items.Clawshot > 0 && (
        items.Sword > 0
        || items.Chainball
        || items.Crystal
        || hasDamagingIronBoots()
    );
}

function canDefeatArmos() {
    return hasDamagingItem(true)
        || items.Clawshot > 0
        || canUseBacksliceAsSword()
}

function canDefeatBabaSerpent() {
    return hasDamagingItem(true)
        || canUseBacksliceAsSword()
}

function canDefeatbabyGohma() {
    // todo: stub
    return false;
}

function canDefeatBari() {
    return false;
}

function canDefeatBeamos() {
    return false;
}

function canDefeatBigBaba() {
    return false;
}

function canDefeatChu() {
    return false;
}

function canDefeatBokoblin() {
    return false;
}

function canDefeatBokoblinRed() {
    return false;
}

function canDefeatBombfish() {
    return false;
}

function canDefeatBombling() {
    return false;
}

function canDefeatBomskit() {
    return false;
}

function canDefeatBubble() {
    return false;
}

function canDefeatBulbin() {
    return false;
}

function canDefeatChilfos() {
    return false;
}

function canDefeatChuWorm() {
    return false;
}

function canDefeatDarknut() {
    return false;
}

function canDefeatDekuBaba() {
    return false;
}

function canDefeatDekuLike() {
    return false;
}

function canDefeatDodongo() {
    return false;
}

function canDefeatDinalfos() {
    return false;
}

function canDefeatFireBubble() {
    return false;
}

function canDefeatFireKeese() {
    return false;
}

function canDefeatFireToadpoli() {
    return false;
}

function canDefeatFreezard() {
    return false;
}

function canDefeatGoron() {
    return false;
}

function canDefeatGhoulRat() {
    return false;
}

function canDefeatGuay() {
    return false;
}

function canDefeatHelmasaur() {
    return false
}

function canDefeatHelmasaurus() {
    return false;
}

function canDefeatIceBubble() {
    return false;
}

function canDefeatIceKeese() {
    return false;
}

function canDefeatKargarok() {
    return false;
}

function canDefeatKeese() {
    return false;
}

function canDefeatLeever() {
    return false;
}

function canDefeatLizalfos() {
    return false;
}

function canDefeatMiniFreezard() {
    return false;
}

function canDefeatMoldorm() {
    return false;
}

function canDefeatPoisonMite() {
    return false;
}

function canDefeatPuppet() {
    return false;
}

function canDefeatRat() {
    return false;
}

function canDefeatRedeadKnight() {
    return false;
}

function canDefeatShadowBeast() {
    return false;
}

function canDefeatShadowBublin() {
    return false;
}

function canDefeatShadowDekuBaba() {
    return false;
}

function canDefeatShadowInsect() {
    return false;
}

function canDefeatShadowKargarok() {
    return false;
}

function canDefeatShadowKeese() {
    return false;
}

function canDefeatShadowVermin() {
    return false;
}

function canDefeatShellBlade() {
    return false;
}

function canDefeatSkullfish() {
    return false;
}

function canDefeatSkulltula() {
    return false;
}

function canDefeatStalhound() {
    return false;
}

function canDefeatStalchild() {
    return false;
}

function canDefeatTaktite() {
    return false;
}

function canDefeatTileWorm() {
    return false;
}

function canDefeatToado() {
    return false;
}

function canDefeatWaterToadpoli() {
    return false;
}

function canDefeatTorchSlug() {
    return false;
}

function canDefeatWalltula() {
    return false;
}

function canDefeatWhiteWolfos() {
    return false;
}

function canDefeatYoungGohma() {
    return false;
}

function canDefeatZantHead() {
    return false;
}

function canDefeatOok() {
    return false;
}

function canDefeatDangoro() {
    return false;
}

function canDefeatCarrierKargarok() {
    return false;
}

function canDefeatTwilitBloat() {
    return false;
}

function canDefeatDekuToad() {
    return false;
}

function canDefeatSkullKid() {
    return false;
}

function canDefeatKingBulblinBridge() {
    return false;
}

function canDefeatKingBulbinDesert() {
    return false;
}

function canDefeatKingBulblinCastle() {
    return false;
}

function canDefeatDeathSword() {
    return false;
}

function canDefeatDarkhammer() {
    return false;
}

function canDefeaatPhantomZant() {
    return false;
}

function canDefeatDiababa() {
    return false;
}

function canDefeatFyrus() {
    return false;
}

function canDefeatMorpheel() {
    return false;
}

function canDefeatStallord() {
    return false;
}

function canDefeatBlizzeta() {
    return false;
}

function canDefeatArmogohma() {
    return false;
}

function canDefeatArgorok() {
    return false;
}

function canDefeatZant() {
    return false;
}

function canDefeatGanondorf() {
    return false;
}

function canSmash() {
    return items.Chainball || hasBombs();
}

function canBurnWebs() {
    return canSmash() || items.Lantern;
}

function hasRangedItem() {
    return false;
}

function hasShield() {
    return false;
}

function canUseBottledFairy() {
    return false;
}


function canUseBottledFairies() {
    return false;
}

function canUseOilBottle() {
    return false;
}

function canLaunchBombs() {
    return false;
}

function canCutHangingWeb() {
    return false;
}

function canKnockDownHCPainting() {
    return false;
}

function canBreakMonkeyCage() {
    return false;
}

function canPressMinesSwitch() {
    return false;
}

function canFreeAllMonkeys() {
    return false;
}

function canKnockDownHangingBaba() {
    return false;
}

function canBreakWoodenDoor() {
    return false;
}

function hasBombs() {
    // the actual rando logic a lot more complicated:
    // https://github.com/zsrtp/Randomizer-Web-Generator/blob/b5ad864ba738a7daa3ccfe8f3076d2a906d6474d/Generator/Logic/LogicFunctions.cs#L1554
    return items.Bombs >= 1;
}

function canUseWaterBombs() {
    // the actual rando logic a lot more complicated:
    // https://github.com/zsrtp/Randomizer-Web-Generator/blob/b5ad864ba738a7daa3ccfe8f3076d2a906d6474d/Generator/Logic/LogicFunctions.cs#L1577
    return items.WBombs;
}

function canGetArrows(logicZones) {
    // todo: 
    // return canClearForest() || zoneReachable(zones.faron.sacredGrove.lostWoods, logicZones);
}

function canClearForest() {
    return (canCompleteForestTemple() || FaronEscape) && canCompletePrologue()
}

// todo: put this in the right spot
function canCompletePrologue() {
    // fixme: check for north faron gate key (or keysy)
    return (items.Sword >= 1 && items.Slingshot) || SkipIntro;
}

function canCompleteMDH() {
    return canCompleteLakebedTemple() || SkipMDH;
}

function canCompleteEldinTwilight() {
    return false;
}

function canCompleteForestTemple() {
    return false;
}

function canCompleteGoronMines() {
    return false;
}

function canCompleteLakebedTemple() {
    return false;
}

function canCompleteArbitersGrounds() {
    return false;
}

function canCompleteSnowpeakRuins() {
    return false;
}

function canCompleteTempleofTime() {
    return false;
}

function canCompleteCityInTheSky() {
    return false;
}

function canCompletePalaceofTwilight() {
    return false;
}

function canCompleteAllDungeons() {
    return false;
}

function hasBug() {
    return false;
}

function canDoDifficultCombat() {
    // https://github.com/zsrtp/Randomizer-Web-Generator/blob/b5ad864ba738a7daa3ccfe8f3076d2a906d6474d/Generator/Logic/LogicFunctions.cs#L1777
    return false;
}

function canDoNicheStuff() {
    // https://github.com/zsrtp/Randomizer-Web-Generator/blob/b5ad864ba738a7daa3ccfe8f3076d2a906d6474d/Generator/Logic/LogicFunctions.cs#L1786
    return glitchedLogic;
}

function canUseBacksliceAsSword() {
    return canDoNicheStuff() && items.Skills >= 3
}

function canGetBugWithLantern() {
    return false;
}

function hasSwordOrBS() {
    return false;
}

function hasBottle() {
    return false;
}

function hasBottles() {
    return false;
}

function hasHeavyMod() {
    return false;
}

function hasCutsceneItem() {
    return false;
}

function zDoLJA() {
    return false;
}

function canDoJSLJA() {
    return false;
}

function canDoMapGlitch() {
    return false;
}

function canDoStorage() {
    return false;
}

function hasOneHandedItem() {
    return false;
}

function canDoMoonBoots() {
    return false;
}

function canDoJSMoonBoots() {
    return false;
}

function canDoBSMoonBoots() {
    return false;
}

function canDoEBMoonBoots() {
    return false;
}

function canDoFlyGlitch() {
    return false;
}

function canDoAirRefill() {
    return false;
}


function canDoHiddenVillageGlitched() {
    return false;
}

function canDoFTWindlessBridgeRoom() {
    return false;
}

function canCompleteEldinTwilightGlitched() {
    return false;
}

function canSkipKeyToDekuToad() {
    return false;
}


const zones = {
    eldin: {
        hiddenVillage: "Hidden Village",
        hyruleField: {
            bomskitGrotto: "Eldin Field Bomskit Grotto",
            stalfosGrotto: "Eldin Field Stalfos Grotto",
            waterBombFishGrotto: "Eldin Field Water Bomb Fish Grotto",
            eldinField: "Eldin Field",
            eldinLongCave: "Eldin Long Cave",
            goronStockcave: "Goron Stockcave",
            kakarikoGorge: "Kakariko Gorge",
        },
        deathMountainInteriors: "Death MOuntain interiors",
        deathMountainTrail: "Death Mountain Trail",

    },
    faron: {
        woods: {
            south: "South Faron Woods",
            southCave: "South Faron Woods Cave",
            mist: "Faron Mist Area",
            mistCave: "Faron Mist Cave",
            north: "North Faron Woods"
        },
        hyruleField: {},
        sacredGrove: {}
    },
    lanayru: {
        hyruleField: {
            lanayruField: "Lanayru Field"
        }
    },
    ordona: {
        ordonProvince: "Ordon Province",
        ordonRanchGrotto: "Ordon Ranch Grotto"
    }
};


const checks = {
    ordona: {
        province: {
            catRescue: "Ordon Cat Rescue",
            shield: "Ordon Shield",
            springGoldenWolf: "Ordon Spring Golden Wolf",
            herdingGoatsReward: "Herding Goats Reward",
            linksBasementChest: "Links Basement Chest",
            sword: "Ordon Sword",
            seraShopSlingshot: "Sera Shop Slingshot",
            uliCradleDelivery: "Uli Cradle Delivery",
            woodenSwordChest: "Wooden Sword Chest",
            wrestlingWithBo: "Wrestling With Bo"
        },
        ranchGrottoLanternChest: "Ordon Ranch Grotto Lantern Chest",
    },
    faron: {
        owlStatueSkyCharacter: "Faron Woods Owl Statue Sky Character",
        south: {
            coroBottle: "Coro Bottle",
            caveChest: "South Faron Cave Chest",
        },
        mist: {
            stumpChest: "Faron Mist Stump Chest",
            northChest: "Faron Mist North Chest",
            southChest: "Faron Mist South Chest",
            owlStatueChest: "Faron Woods Owl Statue Chest",
            poe: "Faron Mist Poe",
            caveOpenChest: "Faron Mist Cave Open Chest",
            caveLanternChest: "Faron Mist Cave Lantern Chest",
        },
        north: {
            dekuBabaChest: "North Faron Woods Deku Baba Chest",
            goldenWolf: "Faron Woods Golden Wolf",
        }
    }
}


// This is literally copied from zsrtp/Randomizer-Web-Generator with minimal differences.
// After all, what better place to get the logic from than the logic itself.
/**
 * @typedef {object} ZoneNeighbor
 * @property {string} name
 * @property {() => boolean} accessable
 */
/**
 * @typedef {object} Zone
 * @property {string} name
 * @property {ZoneNeighbor[]} neighbors
 * @property {string[]} checks
 */
/**
 * @type {Zone[]}
 */
const zoneDataGlitchless = [
    {
        name: zones.ordona.ordonProvince,
        neighbors: [
            {
                name: zones.ordona.ordonRanchGrotto,
                accessable: () => canCompletePrologue() && items.Crystal
            },
            {
                name: zones.faron.woods.south,
                accessable: () => (items.Sword > 0 && items.Slingshot) || SkipIntro
            }
        ],
        checks: Object.values(checks.ordona.province),
    },
    {
        name: zones.ordona.ordonRanchGrotto,
        neighbors: [
            {
                name: zones.ordona.ordonProvince,
                accessable: () => true
            }
        ],
        checks: [
            checks.ordona.ranchGrottoLanternChest
        ]
    },
    {
        name: zones.faron.woods.south,
        neighbors: [
            {
                name: zones.ordona.ordonProvince,
                accessable: () => true,
            },
            // {
            //     name: zones.faron.hyruleField
            // },
            {
                name: zones.faron.woods.southCave,
                accessable: () => true,
            },
            {
                name: zones.faron.woods.mist,
                accessable: () => canSmash() && items.Dominion >= 2 && items.Crystal && canClearForest()
            }
        ],
        checks: [
            checks.faron.south.coroBottle,
            checks.faron.owlStatueSkyCharacter,
        ]
    },
    {
        name: zones.faron.woods.southCave,
        neighbors: [
            {
                name: zones.faron.woods.south,
                accessable: () => canBurnWebs() || items.Crystal || SkipIntro
            },
            {
                name: zones.faron.woods.mist,
                accessable: () => canBurnWebs() || items.Crystal || SkipIntro
            }
        ],
        checks: [
            checks.faron.south.caveChest,
        ]
    },
    {
        name: zones.faron.woods.mist,
        neighbors: [
            {
                name: zones.faron.woods.southCave,
                accessable: () => true,
            },
            {
                name: zones.faron.woods.mistCave,
                accessable: () => items.Lantern,
            },
            {
                name: zones.faron.woods.north,
                accessable: () => canCompletePrologue() && (items.Lantern || items.Crystal),
            }
        ],
        checks: [
            checks.faron.mist.stumpChest,
            checks.faron.mist.northChest,
            checks.faron.mist.southChest,
            checks.faron.mist.owlStatueChest,
            checks.faron.mist.poe
        ]
    },
    {
        name: zones.faron.woods.mistCave,
        neighbors: [
            {
                name: zones.faron.woods.mist,
                accessable: () => true,
            }
        ],
        checks: [
            checks.faron.mist.caveOpenChest,
            checks.faron.mist.caveLanternChest,
        ]
    },
    {
        name: zones.faron.woods.north,
        neighbors: [
            {
                name: zones.faron.woods.mist,
                accessable: () => true,
            },
            // {
            //     name: zones.forestTemple.entrance,
            //     accessable: () => true,
            // }
            // {
            //     name: zones.faron.sacredGrove.lostWoods,
            //     accessable: () => items.Crystal,
            // }
        ],
        checks: [
            checks.faron.north.dekuBabaChest,
            checks.faron.north.goldenWolf,
        ]
    }
];

/**
 * 
 * @param {Zone[]} zone 
 * @returns {Object.<string, Zone>}
 */
function makeZones(zoneData) {
    let output = {}

    for (const zone of zoneData) {
        output[zone.name] = zone;
    }

    return output;
}

const zonesGlitchless = makeZones(zoneDataGlitchless);

/**
 * @typedef {"standard" | "poe" | "bug"} CheckKind
 */

/**
 * 
 * @typedef {object} Check
 * @property {string} name
 * @property {CheckKind=} kind
 * @property {() => boolean} accessable
*/
/**
* @type {Check[]}
*/
const checkDataGlitchless = [
    {
        name: checks.ordona.province.catRescue,
        accessable: () => items.Rod > 0
    },
    {
        name: checks.ordona.province.shield,
        accessable: () => {
            // this is a surprisingly complicated question, so let's split it up.
            // you need to be able to be a wolf to do the check, in vanilla you're always wolf when you reach this point. 
            const canBeWolf = items.Crystal || (!TwilightSkip && canCompletePrologue());
            // fixme: support bonksDoDamage and damage amplification settings:
            // if OHKO you need two bottles and lanterns to be able guaranteed put fairies in them,
            // as well as access to lakebed temple (or CoO, or the end of forest temple, but logic only considers the first one).
            const canSurvive = true;

            return canBeWolf && canSurvive
        }
    },
    {
        name: checks.ordona.province.springGoldenWolf,
        accessable: () => items.Crystal && zoneReachable(zones.eldin.deathMountainTrail, zonesGlitchless),
    },
    {
        name: checks.ordona.province.herdingGoatsReward,
        accessable: () => canCompletePrologue()
    },
    {
        name: checks.ordona.province.uliCradleDelivery,
        accessable: () => true
    },
    {
        name: checks.ordona.province.linksBasementChest,
        accessable: () => items.Lantern,
    },
    {
        name: checks.ordona.province.sword,
        accessable: () => canCompletePrologue() || TwilightSkip
    },
    {
        name: checks.ordona.province.seraShopSlingshot,
        // extra check that isn't possible in vanilla lol
        accessable: () => true,
    },
    {
        name: checks.ordona.province.uliCradleDelivery,
        accessable: () => true,
    },
    {
        name: checks.ordona.province.woodenSwordChest,
        accessable: () => true,
    },
    {
        name: checks.ordona.province.wrestlingWithBo,
        accessable: () => true,
    },
    {
        name: checks.ordona.ranchGrottoLanternChest,
        accessable: () => items.Lantern
    },
    {
        name: checks.faron.south.coroBottle,
        accessable: () => canCompletePrologue(),
    },
    {
        name: checks.faron.owlStatueSkyCharacter,
        accessable: () => canSmash() && items.Dominion >= 2 && canClearForest()
    },
    {
        name: checks.faron.south.caveChest,
        accessable: () => true,
    },
    {
        name: checks.faron.mist.caveOpenChest,
        accessable: () => true,
    },
    {
        name: checks.faron.mist.caveLanternChest,
        accessable: () => items.Lantern
    },
    {
        name: checks.faron.mist.poe,
        accessable: () => items.Crystal && canCompletePrologue(),
        kind: "poe",
    },
    {
        name: checks.faron.mist.stumpChest,
        accessable: () => items.Lantern && canCompletePrologue(),
    },
    {
        name: checks.faron.mist.northChest,
        accessable: () => items.Lantern && canCompletePrologue(),
    },
    {
        name: checks.faron.mist.southChest,
        accessable: () => items.Lantern && canCompletePrologue(),
    },
    {
        name: checks.faron.mist.owlStatueChest,
        accessable: () => canSmash() && items.Dominion >= 2 && items.Crystal && canClearForest()
    },
    {
        name: checks.faron.north.dekuBabaChest,
        accessable: () => true,
    },
    {
        name: checks.faron.north.goldenWolf,
        accessable: () => true,
    }
]

/**  
 * @param {Check[]} checkData
 * @returns {Object.<string, number>}
*/
function makeCheckIds(checkData) {
    let output = {}

    for (const [i, check] of checkData.entries()) {
        output[check.name] = i;
    }

    return output;
}

const checkIdsGlitchless = makeCheckIds(checkDataGlitchless);

/**
 * 
 * @param {ZoneData[]} zoneData 
 * @param {Object.<string,number>} checkIds
 * @returns {Object.<number, string>}
 */
function makeChecksToZones(zoneData, checkIds) {
    let output = {};
    for (const zone of zoneData) {
        for (const check of zone.checks) {
            output[checkIds[check]] = zone.name;
        }
    }

    return output
};

const checksToZonesGlitchless = makeChecksToZones(zoneDataGlitchless, checkIdsGlitchless);


// todo: cache this.
/**
 * @param {string} goal
 * @param {Object.<string,ZoneData>} searchZones 
 * @param {string} start
 * @returns {boolean}
 */
function zoneReachable(goal, searchZones, start = zones.ordona.ordonProvince) {
    // An implementation of DFS
    /** @type{string[]} */
    let stack = [];
    stack.push(start);

    /** @type {Set<string>} */
    let discovered = new Set();

    while (stack.length > 0) {
        const item = stack.pop();
        // we want to check now instead of when iterating the neighbors because the first item could be the goal,
        // and if so I'd rataher not duplicate the check.
        if (item == goal) {
            return true;
        }

        if (discovered.has(item)) {
            continue;
        }

        discovered.add(item);

        for (const neighbor of searchZones[item].neighbors) {
            if (neighbor.accessable()) {
                stack.push(neighbor.name);
            }
        }
    }
    return false;
}

/** 
* @param {"glitchless"|"glitched"} logic
* @param {string|number} check
*/
function checkCompletable(logic, check) {
    switch (logic) {
        case "glitchless":
            if (typeof (check) === "string") {
                check = checkIdsGlitchless[check];
            }

            return zoneReachable(checksToZonesGlitchless[check], zonesGlitchless) && checkDataGlitchless[check].accessable()


        case "glitched":
            // todo:
            return false;
    }
}
