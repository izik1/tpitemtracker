
import type { LogicStore } from './index';
import type { CheckName } from './check-name';
import * as fns from './logic-functions';

export type CheckKind = "standard" | "poe" | "bug";

export class Check {
    readonly #name;
    readonly accessable;
    readonly #kind;

    constructor(name: CheckName, accessable: (store: LogicStore) => boolean, kind: CheckKind = "standard") {
        this.#name = name;
        this.accessable = accessable;
        this.#kind = kind;
    }

    get name() {
        return this.#name;
    }

    get kind() {
        return this.#kind;
    }
}


const ordonCheckDataGlitchless: Check[] = [
    new Check(
        "Ordon Cat Rescue",
        (store) => store.items.Rod > 0
    ),
    new Check(
        "Ordon Shield",
        (store) => {
            // this is a surprisingly complicated question, so let's split it up.
            // you need to be able to be a wolf to do the check, in vanilla you're always wolf when you reach this point. 
            const canBeWolf = store.items.Crystal || (!store.settings.skip.faronTwilight && fns.canCompletePrologue(store));
            // fixme: support bonksDoDamage and damage amplification settings:
            // if OHKO you need two bottles and lanterns to be able guaranteed put fairies in them,
            // as well as access to lakebed temple (or CoO, or the end of forest temple, but logic only considers the first one).
            const canSurvive = true;

            return canBeWolf && canSurvive;
        }
    ),
    new Check(
        "Ordon Spring Golden Wolf",
        store => store.items.Crystal && store.reachableZones.has("Death Mountain Trail"),
    ),
    new Check(
        "Herding Goats Reward",
        (store) => fns.canCompletePrologue(store)
    ),
    new Check(
        "Uli Cradle Delivery",
        fns.always
    ),
    new Check(
        "Links Basement Chest",
        (store) => store.items.Lantern,
    ),
    new Check(
        "Ordon Sword",
        (store) => fns.canCompletePrologue(store) || store.settings.skip.faronTwilight
    ),
    new Check(
        "Sera Shop Slingshot",
        // extra check that isn't possible in vanilla lol
        fns.always,
    ),
    new Check(
        "Wooden Sword Chest",
        fns.always,
    ),
    new Check(
        "Wrestling With Bo",
        fns.always,
    ),
    new Check(
        "Ordon Ranch Grotto Lantern Chest",
        (store) => store.items.Lantern
    ),
];

const faronCheckDataGlitchless: Check[] = [
    new Check(
        "Coro Bottle",
        (store) => fns.canCompletePrologue(store),
    ),
    new Check(
        "Faron Field Bridge Chest",
        (store) => store.items.Clawshot > 0,
    ),
    new Check("Faron Field Corner Grotto Left Chest", fns.always),
    new Check("Faron Field Corner Grotto Rear Chest", fns.always),
    new Check("Faron Field Corner Grotto Right Chest", fns.always),
    new Check(
        "Faron Field Female Beetle",
        (store) => store.items.Boomerang || store.items.Clawshot > 0,
        "bug",
    ),
    new Check("Faron Field Male Beetle", fns.always, "bug"),
    new Check(
        "Faron Field Poe",
        (store) => store.items.Crystal && fns.canCompleteMDH(store) === true,
        "poe"
    ),
    new Check(
        "Faron Field Tree Heart Piece",
        (store) => store.items.Boomerang || store.items.Clawshot > 0,
    ),
    new Check(
        "Faron Woods Owl Statue Sky Character",
        (store) => fns.canSmash(store) && store.items.Dominion >= 2 && fns.canClearForest(store)
    ),
    new Check(
        "South Faron Cave Chest",
        fns.always,
    ),
    new Check(
        "Faron Mist Cave Open Chest",
        fns.always,
    ),
    new Check(
        "Faron Mist Cave Lantern Chest",
        (store) => store.items.Lantern
    ),
    new Check(
        "Faron Mist Poe",
        (store) => store.items.Crystal && fns.canCompletePrologue(store),
        "poe",
    ),
    new Check(
        "Faron Mist Stump Chest",
        (store) => store.items.Lantern && fns.canCompletePrologue(store),
    ),
    new Check(
        "Faron Mist North Chest",
        (store) => store.items.Lantern && fns.canCompletePrologue(store),
    ),
    new Check(
        "Faron Mist South Chest",
        (store) => store.items.Lantern && fns.canCompletePrologue(store),
    ),
    new Check(
        "Faron Woods Owl Statue Chest",
        (store) => fns.canSmash(store) && store.items.Dominion >= 2 && store.items.Crystal && fns.canClearForest(store)
    ),
    // grove entrance settings.
    new Check(
        "Lost Woods Boulder Poe",
        (store) => store.items.Crystal && (fns.canDefeatSkullKid(store)),
        "poe",
    ),
    new Check(
        "Lost Woods Lantern Chest",
        (store) => store.items.Lantern,
    ),
    new Check(
        "Lost Woods Waterfall Poe",
        (store) => store.items.Crystal,
        "poe",
    ),
    new Check(
        "North Faron Woods Deku Baba Chest",
        fns.always,
    ),
    new Check(
        "Faron Woods Golden Wolf",
        fns.always,
    ),
    new Check(
        "Sacred Grove Baba Serpent Grotto Chest",
        (store) => fns.canDefeatBabaSerpent(store) && fns.canKnockDownHangingBaba(store),
    ),
    new Check(
        "Sacred Grove Female Snail",
        (store) => store.items.Clawshot > 0 || store.items.Boomerang,
        "bug",
    ),
    new Check(
        "Sacred Grove Male Snail",
        (store) => store.items.Clawshot > 0 || store.items.Boomerang,
        "bug",
    ),
    new Check(
        "Sacred Grove Master Sword Poe",
        (store) => store.items.Crystal,
        "poe",
    ),
    new Check(
        "Sacred Grove Past Owl Statue Chest",
        (store) => store.items.Rod >= 1,
    ),
    new Check(
        "Sacred Grove Spinner Chest",
        (store) => store.items.Spinner,
    ),
    new Check(
        "Sacred Grove Temple of Time Owl Statue Poe",
        (store) => store.items.Crystal && store.items.Rod >= 1,
        "poe",
    )
];

const eldinCheckDataGlitchless: Check[] = [
    new Check("Barnes Bomb Bag", fns.always),
    new Check(
        "Bridge of Eldin Female Phasmid",
        (store) => store.items.Clawshot > 0 || store.items.Boomerang,
        "bug",
    ),
    new Check(
        "Bridge of Eldin Male Phasmid",
        (store) => store.items.Clawshot > 0 || store.items.Boomerang,
        "bug",
    ),
    new Check("Bridge of Eldin Owl Statue Chest", (store) => store.items.Dominion >= 2),
    new Check("Bridge of Eldin Owl Statue Sky Character", (store) => store.items.Dominion >= 2),
    new Check(
        "Cats Hide and Seek Minigame",
        // is the dominion rod req needed?
        (store) => store.items.Crystal
            && store.items.Clawshot > 0
            && store.items.Ilias_Charm
            && store.items.Bow > 0
            && store.items.Dominion > 0,
    ),
    new Check(
        "Death Mountain Alcove Chest",
        // fixme: `barrenDungeons` setting (currently assumed false, which means the goron mines check is always an option).
        (store) => (fns.canCompleteGoronMines(store)) || (store.items.Clawshot > 0 && (store.items.IronBoots || store.items.Crystal)),
    ),
    new Check("Death Mountain Trail Poe", (store) => store.items.Crystal && fns.canCompleteGoronMines(store) === true, "poe"),
    new Check("Eldin Field Bomb Rock Chest", fns.canSmash),
    new Check("Eldin Field Bomskit Grotto Lantern Chest", (store) => store.items.Lantern && fns.canDefeatBomskit(store)),
    new Check("Eldin Field Bomskit Grotto Left Chest", fns.canDefeatBomskit),
    new Check("Eldin Field Female Grasshopper", fns.always, "bug"),
    new Check("Eldin Field Male Grasshopper", fns.always, "bug"),
    new Check("Eldin Field Stalfos Grotto Left Small Chest", fns.always),
    new Check("Eldin Field Stalfos Grotto Right Small Chest", fns.always),
    new Check("Eldin Field Stalfos Grotto Stalfos Chest", fns.canDefeatStalfos),
    new Check("Eldin Field Water Bomb Fish Grotto Chest", fns.always),
    new Check("Eldin Lantern Cave First Chest", fns.canBurnWebs),
    new Check("Eldin Lantern Cave Lantern Chest", (store) => store.items.Lantern),
    new Check("Eldin Lantern Cave Poe", (store) => store.items.Crystal && fns.canBurnWebs(store), "poe"),
    new Check("Eldin Lantern Cave Second Chest", fns.canBurnWebs),
    new Check("Eldin Spring Underwater Chest", (store) => store.items.IronBoots && fns.canSmash(store)),
    new Check("Eldin Stockcave Lantern Chest", (store) => store.items.Lantern && store.items.IronBoots),
    new Check("Eldin Stockcave Lowest Chest", (store) => store.items.IronBoots),
    new Check("Eldin Stockcave Upper Chest", (store) => store.items.IronBoots),
    new Check(
        "Gift From Ralis",
        (store) => store.items.Sketch
            && (store.items.GateKeys || store.settings.smallKeys === "keysy")
    ),
    new Check(
        "Goron Springwater Rush",
        // there's a Gate Keys || Keysy check in the generator's logic, but I'm pretty sure it isn't required, I'm not even sure if crystal is required..
        (store) => store.items.Crystal || store.settings.skip.lanayruTwilight || fns.canSmash(store)
    ),
    new Check(
        "Hidden Village Poe",
        (store) => store.items.Crystal
            && store.items.Clawshot > 0
            && store.items.Ilias_Charm
            && store.items.Bow > 0
            && store.items.Dominion >= 1,
        "poe",
    ),
    new Check("Ilia Charm", (store) => store.items.Bow > 0),
    new Check("Ilia Memory Reward", (store) => store.items.Ilias_Charm),
    new Check("Kakariko Gorge Double Clawshot Chest", (store) => store.items.Clawshot >= 2),
    new Check("Kakariko Gorge Female Pill Bug", fns.always, "bug"),
    new Check("Kakariko Gorge Male Pill Bug", fns.always, "bug"),
    new Check("Kakariko Gorge Owl Statue Chest", (store) => store.items.Dominion >= 2),
    new Check("Kakariko Gorge Owl Statue Sky Character", (store) => store.items.Dominion >= 2),
    new Check("Kakariko Gorge Poe", (store) => store.items.Crystal && fns.canCompleteMDH(store) === true, "poe"),
    new Check("Kakariko Gorge Spire Heart Piece", (store) => store.items.Clawshot > 0 || store.items.Boomerang),
    new Check("Kakariko Graveyard Golden Wolf",
        fns.never,
        // todo: snowpeak.
        // (store) => store.items.Crystal
        //     && store.logic.reachableZones.has("Snowpeak Climb")
        //     && (store.items.Rod >= 2 || store.settings.skip.snowpeakEntrance)
    ),
    new Check("Kakariko Graveyard Grave Poe", (store) => store.items.Crystal, "poe"),
    new Check("Kakariko Graveyard Lantern Chest", (store) => store.items.Lantern),
    new Check("Kakariko Graveyard Male Ant", fns.always, "bug"),
    new Check("Kakariko Graveyard Open Poe", (store) => store.items.Crystal),
    new Check("Kakariko Inn Chest", fns.always),
    new Check(
        "Kakariko Village Bomb Rock Spire Heart Piece",
        (store) => store.items.Boomerang && fns.canLaunchBombs(store)
    ),
    new Check("Kakariko Village Bomb Shop Poe", (store) => store.items.Crystal, "poe"),
    new Check("Kakariko Village Female Ant", fns.always),
    new Check("Kakariko Village Malo Mart Hawkeye", (store) => store.items.Bow > 0 && fns.canCompleteGoronMines(store) === true),
    new Check("Kakariko Village Malo Mart Hylian Shield", fns.always),
    // new Check("Kakariko Village Malo Mart Red Potion", ),
    // new Check("Kakariko Village Malo Mart Wooden Shield",),
    new Check("Kakariko Village Watchtower Poe", (store) => store.items.Crystal, "poe"),
    new Check("Kakariko Watchtower Alcove Chest", fns.canSmash),
    new Check("Kakariko Watchtower Chest", fns.always),
    new Check("Renados Letter", (store) => fns.canCompleteTempleofTime(store) === true),
    new Check("Rutelas Blessing", (store) => store.items.GateKeys || store.settings.smallKeys === "keysy"),
    new Check("Skybook From Impaz", (store) => store.items.Bow > 0 && store.items.Dominion > 0),
    new Check("Talo Sharpshooting", (store) => store.items.Bow > 0 && fns.canCompleteGoronMines(store) === true),
];

const forestTempleCheckDataGlitchless: Check[] = [
    new Check("Forest Temple Big Baba Key", (store) => fns.canDefeatBigBaba(store) && fns.canDefeatWalltula(store) === true),
    new Check("Forest Temple Big Key Chest", (store) => store.items.Boomerang),
    new Check("Forest Temple Central Chest Behind Stairs", (store) => store.items.Boomerang),
    new Check("Forest Temple Central Chest Hanging From Web", (store) => fns.canCutHangingWeb(store)),
    new Check("Forest Temple Central North Chest", (store) => store.items.Lantern),
    new Check("Forest Temple Diababa Heart Container", fns.canDefeatDiababa),
    new Check("Forest Temple Dungeon Reward", fns.canDefeatDiababa),
    new Check(
        "Forest Temple East Tile Worm Chest",
        // todo: key setting:
        // https://github.com/zsrtp/Randomizer-Web-Generator/blob/b5ad864ba738a7daa3ccfe8f3076d2a906d6474d/Generator/World/Checks/Dungeons/Forest%20Temple/Forest%20Temple%20East%20Tile%20Worm%20Chest.jsonc#L2
        (store) => fns.canDefeatTileWorm(store) && fns.canDefeatSkulltula(store) && fns.canDefeatWalltula(store) === true,
    ),
    new Check("Forest Temple East Water Cave Chest", fns.always),
    new Check("Forest Temple Entrance Vines Chest", fns.always),
    new Check("Forest Temple Gale Boomerang", (store) => fns.canDefeatOok(store)),
    new Check("Forest Temple North Deku Like Chest", (store) => store.items.Boomerang),
    // todo: key setting:
    // https://github.com/zsrtp/Randomizer-Web-Generator/blob/b5ad864ba738a7daa3ccfe8f3076d2a906d6474d/Generator/World/Checks/Dungeons/Forest%20Temple/Forest%20Temple%20Second%20Monkey%20Under%20Bridge%20Chest.jsonc#L2
    new Check("Forest Temple Second Monkey Under Bridge Chest", fns.always),
    new Check("Forest Temple Totem Pole Chest", fns.always),
    new Check("Forest Temple West Deku Like Chest", (store) => fns.canDefeatWalltula(store) === true),
    new Check("Forest Temple West Tile Worm Chest Behind Stairs", (store) => store.items.Boomerang),
    new Check("Forest Temple West Tile Worm Room Vines Chest", fns.always),
    new Check("Forest Temple Windless Bridge Chest", fns.always),
];

export const goronMinesCheckDataGlitchless: Check[] = [
    new Check("Goron Mines After Crystal Switch Room Magnet Wall Chest", (store) => store.items.IronBoots),
    new Check("Goron Mines Beamos Room Chest", (store) => store.items.IronBoots && fns.canDefeatDangoro(store) && store.items.Bow > 0),
    new Check("Goron Mines Chest Before Dangoro", (store) => store.items.IronBoots),
    new Check("Goron Mines Crystal Switch Room Small Chest", (store) => store.items.IronBoots),
    new Check("Goron Mines Crystal Switch Room Underwater Chest", (store) => store.items.IronBoots),
    new Check("Goron Mines Dangoro Chest", (store) => store.items.IronBoots && fns.canDefeatDangoro(store)),
    new Check("Goron Mines Dungeon Reward", fns.canDefeatFyrus),
    new Check("Goron Mines Entrance Chest", (store) => fns.canPressMinesSwitch(store) && fns.canBreakWoodenDoor(store)),
    new Check("Goron Mines Fyrus Heart Container", fns.canDefeatFyrus),
    new Check("Goron Mines Gor Amato Chest", (store) => store.items.IronBoots),
    new Check("Goron Mines Gor Amato Key Shard", (store) => store.items.IronBoots),
    new Check("Goron Mines Gor Amato Small Chest", (store) => store.items.IronBoots),
    new Check("Goron Mines Gor Ebizo Chest", fns.always),
    new Check("Goron Mines Gor Ebizo Key Shard", fns.always),
    new Check("Goron Mines Gor Liggs Chest", (store) => store.items.IronBoots && fns.canDefeatDangoro(store) && store.items.Bow > 0),
    new Check("Goron Mines Gor Liggs Key Shard", (store) => store.items.IronBoots && fns.canDefeatDangoro(store) && store.items.Bow > 0),
    new Check("Goron Mines Magnet Maze Chest", (store) => store.items.IronBoots),
    new Check("Goron Mines Main Magnet Room Bottom Chest", fns.always),
    // Key setting ignored.
    new Check("Goron Mines Main Magnet Room Top Chest", (store) => store.items.Bow > 0 && store.items.IronBoots && fns.canDefeatDangoro(store)),
    new Check("Goron Mines Outside Beamos Chest", fns.always),
    new Check("Goron Mines Outside Clawshot Chest", (store) => store.items.Clawshot > 0 && (store.items.Bow > 0 || store.items.Slingshot)),
    new Check("Goron Mines Outside Underwater Chest", (store) => (store.items.Sword > 0 || fns.canUseWaterBombs(store)) && store.items.IronBoots),
];

export const checkDataGlitchless: Check[] = [
    // overworld
    ...ordonCheckDataGlitchless,
    ...faronCheckDataGlitchless,
    ...eldinCheckDataGlitchless,

    // dungeons
    ...forestTempleCheckDataGlitchless,
    ...goronMinesCheckDataGlitchless
];

export type CheckIds = { [x: string]: number; };

function makeCheckIds(checkData: Check[]): CheckIds {
    const output: CheckIds = {};

    for (const [i, check] of checkData.entries()) {
        output[check.name] = i;
    }

    return output;
}

export const checkIdsGlitchless = makeCheckIds(checkDataGlitchless);
