
import store from '../store';
import { CheckName } from './check-name';
import * as fns from './logic-functions';
import { zonesGlitchless } from './zones';

export type CheckKind = "standard" | "poe" | "bug";

export class Check {
    readonly #name;
    readonly #accessable;
    readonly #kind;

    constructor(name: CheckName, accessable: () => boolean, kind: CheckKind = "standard") {
        this.#name = name;
        this.#accessable = accessable;
        this.#kind = kind;
    }

    get name() {
        return this.#name;
    }

    get accessable() {
        return this.#accessable();
    }

    get kind() {
        return this.#kind;
    }
}


const ordonCheckDataGlitchless: Check[] = [
    new Check(
        "Ordon Cat Rescue",
        () => store.items.Rod > 0
    ),
    new Check(
        "Ordon Shield",
        () => {
            // this is a surprisingly complicated question, so let's split it up.
            // you need to be able to be a wolf to do the check, in vanilla you're always wolf when you reach this point. 
            const canBeWolf = store.items.Crystal || (!store.settings.randomizer.skip.faronTwilight && fns.canCompletePrologue());
            // fixme: support bonksDoDamage and damage amplification settings:
            // if OHKO you need two bottles and lanterns to be able guaranteed put fairies in them,
            // as well as access to lakebed temple (or CoO, or the end of forest temple, but logic only considers the first one).
            const canSurvive = true;

            return canBeWolf && canSurvive;
        }
    ),
    new Check(
        "Ordon Spring Golden Wolf",
        () => store.items.Crystal && store.logic.reachableZones.has("Death Mountain Trail"),
    ),
    new Check(
        "Herding Goats Reward",
        () => fns.canCompletePrologue()
    ),
    new Check(
        "Uli Cradle Delivery",
        fns.always
    ),
    new Check(
        "Links Basement Chest",
        () => store.items.Lantern,
    ),
    new Check(
        "Ordon Sword",
        () => fns.canCompletePrologue() || store.settings.randomizer.skip.faronTwilight
    ),
    new Check(
        "Sera Shop Slingshot",
        // extra check that isn't possible in vanilla lol
        fns.always,
    ),
    new Check(
        "Uli Cradle Delivery",
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
        () => store.items.Lantern
    ),
];

const faronCheckDataGlitchless: Check[] = [
    new Check(
        "Coro Bottle",
        () => fns.canCompletePrologue(),
    ),
    new Check(
        "Faron Field Bridge Chest",
        () => store.items.Clawshot > 0,
    ),
    new Check("Faron Field Corner Grotto Left Chest", fns.always),
    new Check("Faron Field Corner Grotto Rear Chest", fns.always),
    new Check("Faron Field Corner Grotto Right Chest", fns.always),
    new Check(
        "Faron Field Female Beetle",
        () => store.items.Boomerang || store.items.Clawshot > 0,
        "bug",
    ),
    new Check("Faron Field Male Beetle", fns.always, "bug"),
    new Check(
        "Faron Field Poe",
        () => store.items.Crystal && fns.canCompleteMDH(),
        "poe"
    ),
    new Check(
        "Faron Field Tree Heart Piece",
        () => store.items.Boomerang || store.items.Clawshot > 0,
    ),
    new Check(
        "Faron Woods Owl Statue Sky Character",
        () => fns.canSmash() && store.items.Dominion >= 2 && fns.canClearForest()
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
        () => store.items.Lantern
    ),
    new Check(
        "Faron Mist Poe",
        () => store.items.Crystal && fns.canCompletePrologue(),
        "poe",
    ),
    new Check(
        "Faron Mist Stump Chest",
        () => store.items.Lantern && fns.canCompletePrologue(),
    ),
    new Check(
        "Faron Mist North Chest",
        () => store.items.Lantern && fns.canCompletePrologue(),
    ),
    new Check(
        "Faron Mist South Chest",
        () => store.items.Lantern && fns.canCompletePrologue(),
    ),
    new Check(
        "Faron Woods Owl Statue Chest",
        () => fns.canSmash() && store.items.Dominion >= 2 && store.items.Crystal && fns.canClearForest()
    ),
    // grove entrance settings.
    new Check(
        "Lost Woods Boulder Poe",
        () => store.items.Crystal && (fns.canDefeatSkullKid()),
        "poe",
    ),
    new Check(
        "Lost Woods Lantern Chest",
        () => store.items.Lantern,
    ),
    new Check(
        "Lost Woods Waterfall Poe",
        () => store.items.Crystal,
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
        () => fns.canDefeatBabaSerpent() && fns.canKnockDownHangingBaba(),
    ),
    new Check(
        "Sacred Grove Female Snail",
        () => store.items.Clawshot > 0 || store.items.Boomerang,
        "bug",
    ),
    new Check(
        "Sacred Grove Male Snail",
        () => store.items.Clawshot > 0 || store.items.Boomerang,
        "bug",
    ),
    new Check(
        "Sacred Grove Master Sword Poe",
        () => store.items.Crystal,
        "poe",
    ),
    new Check(
        "Sacred Grove Past Owl Statue Chest",
        () => store.items.Rod >= 1,
    ),
    new Check(
        "Sacred Grove Spinner Chest",
        () => store.items.Spinner,
    ),
    new Check(
        "Sacred Grove Temple of Time Owl Statue Poe",
        () => store.items.Crystal && store.items.Rod >= 1,
        "poe",
    )
];

const eldinCheckDataGlitchless: Check[] = [
    new Check("Barnes Bomb Bag", fns.always),
    new Check(
        "Bridge of Eldin Female Phasmid",
        () => store.items.Clawshot > 0 || store.items.Boomerang,
        "bug",
    ),
    new Check(
        "Bridge of Eldin Male Phasmid",
        () => store.items.Clawshot > 0 || store.items.Boomerang,
        "bug",
    ),
    new Check("Bridge of Eldin Owl Statue Chest", () => store.items.Dominion >= 2),
    new Check("Bridge of Eldin Owl Statue Sky Character", () => store.items.Dominion >= 2),
    new Check(
        "Cats Hide and Seek Minigame",
        // is the dominion rod req needed?
        () => store.items.Crystal
            && store.items.Clawshot > 0
            && store.items.Ilias_Charm
            && store.items.Bow > 0
            && store.items.Dominion > 0,
    ),
    new Check(
        "Death Mountain Alcove Chest",
        // fixme: `barrenDungeons` setting (currently assumed false, which means the goron mines check is always an option).
        () => (fns.canCompleteGoronMines()) || (store.items.Clawshot > 0 && (store.items.IronBoots || store.items.Crystal)),
    ),
    new Check("Death Mountain Trail Poe", () => store.items.Crystal && fns.canCompleteGoronMines(), "poe"),
    new Check("Eldin Field Bomb Rock Chest", fns.canSmash),
    new Check("Eldin Field Bomskit Grotto Lantern Chest", () => store.items.Lantern && fns.canDefeatBomskit()),
    new Check("Eldin Field Bomskit Grotto Left Chest", fns.canDefeatBomskit),
    new Check("Eldin Field Female Grasshopper", fns.always, "bug"),
    new Check("Eldin Field Male Grasshopper", fns.always, "bug"),
    new Check("Eldin Field Stalfos Grotto Left Small Chest", fns.always),
    new Check("Eldin Field Stalfos Grotto Right Small Chest", fns.always),
    new Check("Eldin Field Stalfos Grotto Stalfos Chest", fns.canDefeatStalfos),
    new Check("Eldin Field Water Bomb Fish Grotto Chest", fns.always),
    new Check("Eldin Lantern Cave First Chest", fns.canBurnWebs),
    new Check("Eldin Lantern Cave Lantern Chest", () => store.items.Lantern),
    new Check("Eldin Lantern Cave Poe", () => store.items.Crystal && fns.canBurnWebs(), "poe"),
    new Check("Eldin Lantern Cave Second Chest", fns.canBurnWebs),
    new Check("Eldin Spring Underwater Chest", () => store.items.IronBoots && fns.canSmash()),
    new Check("Eldin Stockcave Lantern Chest", () => store.items.Lantern && store.items.IronBoots),
    new Check("Eldin Stockcave Lowest Chest", () => store.items.IronBoots),
    new Check("Eldin Stockcave Upper Chest", () => store.items.IronBoots),
    new Check(
        "Gift From Ralis",
        () => store.items.Sketch
            && (store.items.GateKeys || store.settings.randomizer.smallKeys === "keysy")
    ),
    new Check(
        "Goron Springwater Rush",
        // there's a Gate Keys || Keysy check in the generator's logic, but I'm pretty sure it isn't required, I'm not even sure if crystal is required..
        () => store.items.Crystal || store.settings.randomizer.skip.lanayruTwilight || fns.canSmash()
    ),
    new Check(
        "Hidden Village Poe",
        () => store.items.Crystal
            && store.items.Clawshot > 0
            && store.items.Ilias_Charm
            && store.items.Bow > 0
            && store.items.Dominion >= 1,
        "poe",
    ),
    new Check("Ilia Charm", () => store.items.Bow > 0),
    new Check("Ilia Memory Reward", () => store.items.Ilias_Charm),
    new Check("Kakariko Gorge Double Clawshot Chest", () => store.items.Clawshot >= 2),
    new Check("Kakariko Gorge Female Pill Bug", fns.always, "bug"),
    new Check("Kakariko Gorge Male Pill Bug", fns.always, "bug"),
    new Check("Kakariko Gorge Owl Statue Chest", () => store.items.Dominion >= 2),
    new Check("Kakariko Gorge Owl Statue Sky Character", () => store.items.Dominion >= 2),
    new Check("Kakariko Gorge Poe", () => store.items.Crystal && fns.canCompleteMDH(), "poe"),
    new Check("Kakariko Gorge Spire Heart Piece", () => store.items.Clawshot > 0 || store.items.Boomerang),
    new Check("Kakariko Graveyard Golden Wolf",
        fns.never,
        // todo: snowpeak.
        // () => store.items.Crystal
        //     && store.logic.reachableZones.has("Snowpeak Climb")
        //     && (store.items.Rod >= 2 || store.settings.randomizer.skip.snowpeakEntrance)
    ),
    new Check("Kakariko Graveyard Grave Poe", () => store.items.Crystal, "poe"),
    new Check("Kakariko Graveyard Lantern Chest", () => store.items.Lantern),
    new Check("Kakariko Graveyard Male Ant", fns.always, "bug"),
    new Check("Kakariko Graveyard Open Poe", () => store.items.Crystal),
    new Check("Kakariko Inn Chest", fns.always),
    new Check(
        "Kakariko Village Bomb Rock Spire Heart Piece",
        () => store.items.Boomerang && fns.canLaunchBombs()
    ),
    new Check("Kakariko Village Bomb Shop Poe", () => store.items.Crystal, "poe"),
    new Check("Kakariko Village Female Ant", fns.always),
    new Check("Kakariko Village Malo Mart Hawkeye", () => store.items.Bow > 0 && fns.canCompleteGoronMines()),
    new Check("Kakariko Village Malo Mart Hylian Shield", fns.always),
    // new Check("Kakariko Village Malo Mart Red Potion", ),
    // new Check("Kakariko Village Malo Mart Wooden Shield",),
    new Check("Kakariko Village Watchtower Poe", () => store.items.Crystal, "poe"),
    new Check("Kakariko Watchtower Alcove Chest", fns.canSmash),
    new Check("Kakariko Watchtower Chest", fns.always),
    new Check("Renados Letter", fns.canCompleteTempleofTime),
    new Check("Rutelas Blessing", () => store.items.GateKeys || store.settings.randomizer.smallKeys === "keysy"),
    new Check("Skybook From Impaz", () => store.items.Bow > 0 && store.items.Dominion > 0),
    new Check("Talo Sharpshooting", () => store.items.Bow > 0 && fns.canCompleteGoronMines()),
];

const forestTempleCheckDataGlitchless: Check[] = [
    new Check("Forest Temple Big Baba Key", () => fns.canDefeatBigBaba() && fns.canDefeatWalltula()),
    new Check("Forest Temple Big Key Chest", () => store.items.Boomerang),
    new Check("Forest Temple Central Chest Behind Stairs", () => store.items.Boomerang),
    new Check("Forest Temple Central Chest Hanging From Web", () => fns.canCutHangingWeb()),
    new Check("Forest Temple Central North Chest", () => store.items.Lantern),
    new Check("Forest Temple Diababa Heart Container", fns.canDefeatDiababa),
    new Check("Forest Temple Dungeon Reward", fns.canDefeatDiababa),
    new Check(
        "Forest Temple East Tile Worm Chest",
        // todo: key setting:
        // https://github.com/zsrtp/Randomizer-Web-Generator/blob/b5ad864ba738a7daa3ccfe8f3076d2a906d6474d/Generator/World/Checks/Dungeons/Forest%20Temple/Forest%20Temple%20East%20Tile%20Worm%20Chest.jsonc#L2
        () => fns.canDefeatTileWorm() && fns.canDefeatSkulltula() && fns.canDefeatWalltula(),
    ),
    new Check("Forest Temple East Water Cave Chest", fns.always),
    new Check("Forest Temple Entrance Vines Chest", fns.always),
    new Check("Forest Temple Gale Boomerang", () => fns.canDefeatOok()),
    new Check("Forest Temple North Deku Like Chest", () => store.items.Boomerang),
    // todo: key setting:
    // https://github.com/zsrtp/Randomizer-Web-Generator/blob/b5ad864ba738a7daa3ccfe8f3076d2a906d6474d/Generator/World/Checks/Dungeons/Forest%20Temple/Forest%20Temple%20Second%20Monkey%20Under%20Bridge%20Chest.jsonc#L2
    new Check("Forest Temple Second Monkey Under Bridge Chest", fns.always),
    new Check("Forest Temple Totem Pole Chest", fns.always),
    new Check("Forest Temple West Deku Like Chest", () => fns.canDefeatWalltula()),
    new Check("Forest Temple West Tile Worm Chest Behind Stairs", () => store.items.Boomerang),
    new Check("Forest Temple West Tile Worm Room Vines Chest", fns.always),
    new Check("Forest Temple Windless Bridge Chest", fns.always),
];

export const checkDataGlitchless: Check[] = [
    ...ordonCheckDataGlitchless,
    ...faronCheckDataGlitchless,
    ...eldinCheckDataGlitchless,
    ...forestTempleCheckDataGlitchless,
];

export type CheckIds = { [x: string]: number; };

function makeCheckIds(checkData: Check[]): CheckIds {
    let output: CheckIds = {};

    for (const [i, check] of checkData.entries()) {
        output[check.name] = i;
    }

    return output;
}

export const checkIdsGlitchless = makeCheckIds(checkDataGlitchless);
