
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
        (store) => store.items.Crystal && fns.canCompleteMDH(store),
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
    new Check("Death Mountain Trail Poe", (store) => store.items.Crystal && fns.canCompleteGoronMines(store), "poe"),
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
    new Check("Kakariko Gorge Poe", (store) => store.items.Crystal && fns.canCompleteMDH(store), "poe"),
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
    new Check("Kakariko Graveyard Open Poe", (store) => store.items.Crystal, "poe"),
    new Check("Kakariko Inn Chest", fns.always),
    new Check(
        "Kakariko Village Bomb Rock Spire Heart Piece",
        (store) => store.items.Boomerang && fns.canLaunchBombs(store)
    ),
    new Check("Kakariko Village Bomb Shop Poe", (store) => store.items.Crystal, "poe"),
    new Check("Kakariko Village Female Ant", fns.always, "bug"),
    new Check("Kakariko Village Malo Mart Hawkeye", (store) => store.items.Bow > 0 && fns.canCompleteGoronMines(store)),
    new Check("Kakariko Village Malo Mart Hylian Shield", fns.always),
    // new Check("Kakariko Village Malo Mart Red Potion", ),
    // new Check("Kakariko Village Malo Mart Wooden Shield",),
    new Check("Kakariko Village Watchtower Poe", (store) => store.items.Crystal, "poe"),
    new Check("Kakariko Watchtower Alcove Chest", fns.canSmash),
    new Check("Kakariko Watchtower Chest", fns.always),
    new Check("Renados Letter", (store) => fns.canCompleteTempleofTime(store)),
    new Check("Rutelas Blessing", (store) => store.items.GateKeys || store.settings.smallKeys === "keysy"),
    new Check("Skybook From Impaz", (store) => store.items.Bow > 0 && store.items.Dominion > 0),
    new Check("Talo Sharpshooting", (store) => store.items.Bow > 0 && fns.canCompleteGoronMines(store)),
];

const lanayruCheckDataGlitchless: Check[] = [
    new Check("Agitha Bug #1 Reward", ({ items }) => items.Bugs >= 1),
    new Check("Agitha Bug #2 Reward", ({ items }) => items.Bugs >= 2),
    new Check("Agitha Bug #3 Reward", ({ items }) => items.Bugs >= 3),
    new Check("Agitha Bug #4 Reward", ({ items }) => items.Bugs >= 4),
    new Check("Agitha Bug #5 Reward", ({ items }) => items.Bugs >= 5),
    new Check("Agitha Bug #6 Reward", ({ items }) => items.Bugs >= 6),
    new Check("Agitha Bug #7 Reward", ({ items }) => items.Bugs >= 7),
    new Check("Agitha Bug #8 Reward", ({ items }) => items.Bugs >= 8),
    new Check("Agitha Bug #9 Reward", ({ items }) => items.Bugs >= 9),
    new Check("Agitha Bug #10 Reward", ({ items }) => items.Bugs >= 10),
    new Check("Agitha Bug #11 Reward", ({ items }) => items.Bugs >= 11),
    new Check("Agitha Bug #12 Reward", ({ items }) => items.Bugs >= 12),
    new Check("Agitha Bug #13 Reward", ({ items }) => items.Bugs >= 13),
    new Check("Agitha Bug #14 Reward", ({ items }) => items.Bugs >= 14),
    new Check("Agitha Bug #15 Reward", ({ items }) => items.Bugs >= 15),
    new Check("Agitha Bug #16 Reward", ({ items }) => items.Bugs >= 16),
    new Check("Agitha Bug #17 Reward", ({ items }) => items.Bugs >= 17),
    new Check("Agitha Bug #18 Reward", ({ items }) => items.Bugs >= 18),
    new Check("Agitha Bug #19 Reward", ({ items }) => items.Bugs >= 19),
    new Check("Agitha Bug #20 Reward", ({ items }) => items.Bugs >= 20),
    new Check("Agitha Bug #21 Reward", ({ items }) => items.Bugs >= 21),
    new Check("Agitha Bug #22 Reward", ({ items }) => items.Bugs >= 22),
    new Check("Agitha Bug #23 Reward", ({ items }) => items.Bugs >= 23),
    new Check("Agitha Bug #24 Reward", ({ items }) => items.Bugs >= 24),
    new Check("Auru Gift To Fyer", fns.always),
    new Check(
        "Castle Town Malo Mart Magic Armor",
        ({ settings, items }) => settings.increaseWalletCapacity
            || items.Wallet >= 2
        // we don't have to check for npcGifts here because we only want to show it as available once we *have the wallet*.
        // || (!settings.itemPool.npcGifts && items.Bugs >= 1)
    ),
    new Check("Charlo Donation Blessing", fns.always),
    new Check("Doctors Office Balcony Chest", ({ items }) => items.Invoice && items.Crystal),
    new Check("East Castle Town Bridge Poe", ({ items }) => items.Crystal, "poe"),
    new Check("Fishing Hole Bottle", ({ items }) => items.Rod >= 1),
    new Check("Fishing Hole Heart Piece", fns.always),
    new Check("Flight By Fowl Fifth Platform Chest", fns.always),
    new Check("Flight By Fowl Fourth Platform Chest", fns.always),
    new Check("Flight By Fowl Ledge Poe", ({ items }) => items.Crystal, "poe"),
    new Check("Flight By Fowl Second Platform Chest", fns.always),
    new Check("Flight By Fowl Third Platform Chest", fns.always),
    new Check("Flight By Fowl Top Platform Reward", fns.always),
    new Check("Hyrule Field Amphitheater Owl Statue Chest", ({ items }) => items.Dominion >= 2),
    new Check("Hyrule Field Amphitheater Owl Statue Sky Character", ({ items }) => items.Dominion >= 2),
    new Check("Hyrule Field Amphitheater Poe", ({ items }) => items.Crystal, "poe"),
    new Check("Isle of Riches Poe", ({ items }) => items.Crystal, "poe"),
    new Check(
        "Iza Helping Hand",
        // I think I might be writing this wrong, but maybe not.
        (store) => store.items.Bow > 0 && store.reachableZones.has("Zoras Domain") && fns.canDefeatShadowBeast(store),
    ),
    new Check(
        "Iza Raging Rapids Minigame",
        // I think I might be writing this wrong, but maybe not.
        (store) => store.items.Bow > 0 && store.reachableZones.has("Zoras Domain") && fns.canDefeatShadowBeast(store),
    ),
    new Check("Jovani 20 Poe Soul Reward", (store) => store.items.Soul >= 20 && store.items.Crystal && fns.canCompleteMDH(store)),
    new Check("Jovani 60 Poe Soul Reward", (store) => store.items.Soul >= 60 && store.items.Crystal && fns.canCompleteMDH(store)),
    new Check("Jovani House Poe", ({ items }) => items.Crystal, "poe"),
    new Check("Lake Hylia Alcove Poe", ({ items }) => items.Crystal, "poe"),
    new Check(
        "Lake Hylia Bridge Bubble Grotto Chest",
        (store) => fns.canDefeatBubble(store) && fns.canDefeatFireBubble(store) && fns.canDefeatIceBubble(store)
    ),
    new Check("Lake Hylia Bridge Cliff Chest", (store) => fns.canLaunchBombs(store) && store.items.Clawshot > 0),
    new Check(

        "Lake Hylia Bridge Cliff Poe",
        (store) => store.items.Crystal
            && fns.canLaunchBombs(store)
            && store.items.Clawshot > 0
            && fns.canCompleteMDH(store),
        "poe"
    ),
    new Check("Lake Hylia Bridge Female Mantis", ({ items }) => items.Clawshot > 0 || items.Boomerang, "bug"),
    new Check("Lake Hylia Bridge Male Mantis", ({ items }) => items.Clawshot > 0 || items.Boomerang, "bug"),
    new Check("Lake Hylia Bridge Owl Statue Chest", ({ items }) => items.Dominion >= 2 && items.Clawshot > 0),
    new Check("Lake Hylia Bridge Owl Statue Sky Character", ({ items }) => items.Dominion >= 2 && items.Clawshot > 0),
    new Check("Lake Hylia Bridge Vines Chest", ({ items }) => items.Clawshot > 0),
    new Check("Lake Hylia Dock Poe", ({ items }) => items.Crystal, "poe"),
    new Check("Lake Hylia Shell Blade Grotto Chest", (store) => fns.canDefeatShellBlade(store)),
    new Check("Lake Hylia Tower Poe", ({ items }) => items.Crystal, "poe"),
    new Check("Lake Hylia Underwater Chest", ({ items }) => items.IronBoots),
    new Check("Lake Hylia Water Toadpoli Grotto Chest", fns.canDefeatWaterToadpoli),
    new Check("Lake Lantern Cave First Chest", fns.always),
    new Check("Lake Lantern Cave Second Chest", fns.always),
    new Check("Lake Lantern Cave Third Chest", fns.always),
    new Check("Lake Lantern Cave Fourth Chest", fns.always),
    new Check("Lake Lantern Cave Fifth Chest", fns.always),
    new Check("Lake Lantern Cave Sixth Chest", ({ items }) => items.Lantern),
    new Check("Lake Lantern Cave Seventh Chest", fns.always),
    new Check("Lake Lantern Cave Eighth Chest", fns.always),
    new Check("Lake Lantern Cave Ninth Chest", fns.always),
    new Check("Lake Lantern Cave Tenth Chest", fns.always),
    new Check("Lake Lantern Cave Eleventh Chest", fns.always),
    new Check("Lake Lantern Cave Twelfth Chest", fns.always),
    new Check("Lake Lantern Cave Thirteenth Chest", fns.always),
    new Check("Lake Lantern Cave Fourteenth Chest", fns.always),
    new Check("Lake Lantern Cave End Lantern Chest", ({ items }) => items.Lantern),
    new Check("Lake Lantern Cave First Poe", ({ items }) => items.Crystal, "poe"),
    new Check("Lake Lantern Cave Second Poe", ({ items }) => items.Crystal, "poe"),
    new Check("Lake Lantern Cave Final Poe", ({ items }) => items.Crystal, "poe"),
    new Check("Lanayru Field Behind Gate Underwater Chest", ({ items }) => items.IronBoots),
    new Check("Lanayru Field Bridge Poe", (store) => store.items.Crystal && fns.canCompleteMDH(store), "poe"),
    new Check("Lanayru Field Female Stag Beetle", ({ items }) => items.Clawshot > 0 || items.Boomerang, "bug"),
    new Check("Lanayru Field Male Stag Beetle", ({ items }) => items.Clawshot > 0 || items.Boomerang, "bug"),
    new Check("Lanayru Field Poe Grotto Left Poe", ({ items }) => items.Crystal, "poe"),
    new Check("Lanayru Field Poe Grotto Right Poe", ({ items }) => items.Crystal, "poe"),
    new Check(
        "Lanayru Field Skulltula Grotto Chest",
        (store) => fns.canDefeatSkulltula(store) && store.items.Lantern && fns.canBreakWoodenDoor(store)
    ),
    new Check("Lanayru Field Spinner Track Chest", (store) => fns.canSmash(store) && store.items.Spinner),
    new Check("Lanayru Ice Block Puzzle Cave Chest", ({ items }) => items.Chainball),
    new Check("Lanayru Spring Back Room Lantern Chest", ({ items }) => items.Clawshot > 0 && items.Lantern),
    new Check("Lanayru Spring Back Room Left Chest", ({ items }) => items.Clawshot > 0),
    new Check("Lanayru Spring Back Room Right Chest", ({ items }) => items.Clawshot > 0),
    new Check("Lanayru Spring East Double Clawshot Chest", ({ items }) => items.Clawshot >= 2),
    new Check("Lanayru Spring Underwater Left Chest", ({ items }) => items.IronBoots),
    new Check("Lanayru Spring Underwater Right Chest", ({ items }) => items.IronBoots),
    new Check("Lanayru Spring West Double Clawshot Chest", ({ items }) => items.Clawshot >= 2),
    new Check(
        "North Castle Town Golden Wolf",
        (store) => store.items.Crystal && store.reachableZones.has("Hidden Village") && fns.canCompleteMDH(store)
    ),
    new Check("Outside Lanayru Spring Left Statue Chest", fns.always),
    new Check("Outside Lanayru Spring Right Statue Chest", fns.always),
    new Check("Outside South Castle Town Double Clawshot Chasm Chest", ({ items }) => items.Clawshot >= 2),
    new Check("Outside South Castle Town Female Ladybug", fns.always, "bug"),
    new Check("Outside South Castle Town Fountain Chest", ({ items }) => items.Spinner && items.Clawshot >= 1),
    new Check("Outside South Castle Town Golden Wolf", (store) => store.items.Crystal && store.reachableZones.has("North Faron Woods")),
    new Check("Outside South Castle Town Male Ladybug", fns.always, "bug"),
    new Check("Outside South Castle Town Poe", ({ items }) => items.Crystal, "poe"),
    new Check("Outside South Castle Town Tektite Grotto Chest", (store) => fns.canDefeatTaktite(store)),
    new Check("Outside South Castle Town Tightrope Chest", ({ items }) => items.Clawshot > 0 && items.Crystal),
    new Check("Plumm Fruit Balloon Minigame", ({ items }) => items.Crystal),
    new Check("STAR Prize 1", ({ items }) => items.Clawshot > 0),
    new Check("STAR Prize 2", ({ items }) => items.Clawshot >= 2),
    new Check("Telma Invoice", ({ items }) => items.Renardos_Letter),
    new Check("Upper Zoras River Female Dragonfly", fns.always, "bug"),
    new Check("Upper Zoras River Poe", ({ items }) => items.Crystal, "poe"),
    new Check("West Hyrule Field Female Butterfly", ({ items }) => items.Clawshot > 0 || items.Boomerang, "bug"),
    new Check("West Hyrule Field Golden Wolf", (store) => store.items.Crystal && store.reachableZones.has("Zoras Domain")),
    new Check("West Hyrule Field Helmasaur Grotto Chest", fns.canDefeatHelmasaur),
    new Check("West Hyrule Field Male Butterfly", fns.always, "bug"),
    new Check("Wooden Statue", ({ items }) => items.Invoice),
    new Check("Zoras Domain Chest Behind Waterfall", ({ items }) => items.Crystal),
    new Check("Zoras Domain Chest By Mother and Child Isles", fns.always),
    new Check("Zoras Domain Extinguish All Torches Chest", ({ items }) => items.Boomerang && items.IronBoots),
    new Check("Zoras Domain Light All Torches Chest", ({ items }) => items.Lantern && items.IronBoots),
    new Check("Zoras Domain Male Dragonfly", fns.always, "bug"),
    new Check("Zoras Domain Mother and Child Isle Poe", ({ items }) => items.Crystal, "poe"),
    new Check(
        "Zoras Domain Underwater Goron",
        (store) => fns.canUseWaterBombs(store) && store.items.IronBoots && store.items.ZoraArmor
    ),
    new Check("Zoras Domain Waterfall Poe", ({ items }) => items.Crystal, "poe"),
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

export const lakebedTempleCheckDataGlitchless: Check[] = [
    new Check(
        "Lakebed Temple Before Deku Toad Alcove Chest",
        // key settings ignored
        (store) => (
            fns.canDefeatDekuToad(store)
            && store.items.ZoraArmor
            && store.items.IronBoots
            && fns.canUseWaterBombs(store)
            && store.items.Clawshot > 0
        )
            || fns.canLaunchBombs(store)
            || (store.items.Clawshot > 0 && fns.canSmash(store))

    ),
    new Check(
        "Lakebed Temple Before Deku Toad Underwater Left Chest",
        (store) => store.items.ZoraArmor
            && store.items.IronBoots
            && (fns.canLaunchBombs(store) || (store.items.Clawshot > 0 && fns.canSmash(store)))
    ),
    new Check(
        "Lakebed Temple Before Deku Toad Underwater Right Chest",
        (store) => store.items.ZoraArmor
            && store.items.IronBoots
            && (fns.canLaunchBombs(store) || (store.items.Clawshot > 0 && fns.canSmash(store)))
    ),
    new Check(
        "Lakebed Temple Big Key Chest",
        (store) => store.items.Clawshot > 0
            && fns.canUseWaterBombs(store)
            && store.items.ZoraArmor && fns.canLaunchBombs(store)
            && store.items.IronBoots
    ),
    new Check("Lakebed Temple Central Room Chest", fns.always),
    new Check("Lakebed Temple Central Room Small Chest", fns.always),
    // key skip
    new Check("Lakebed Temple Central Room Spire Chest", (store) => store.items.IronBoots && fns.canLaunchBombs(store)),
    new Check("Lakebed Temple Chandelier Chest", ({ items }) => items.Clawshot > 0),
    // key skip
    new Check(
        "Lakebed Temple Deku Toad Chest",
        (store) => fns.canDefeatDekuToad(store)
            && store.items.ZoraArmor
            && store.items.IronBoots
            && fns.canUseWaterBombs(store)
            && (fns.canLaunchBombs(store) || (store.items.Clawshot > 0 && fns.canSmash(store)))
    ),
    new Check("Lakebed Temple Dungeon Reward", fns.canDefeatMorpheel),
    // key skip
    new Check("Lakebed Temple East Lower Waterwheel Bridge Chest", (store) => store.items.Clawshot > 0 && fns.canLaunchBombs(store)),
    new Check("Lakebed Temple East Lower Waterwheel Stalactite Chest", fns.canLaunchBombs),
    new Check(
        "Lakebed Temple East Second Floor Southeast Chest",
        (store) => fns.canLaunchBombs(store)
            || (store.items.Clawshot > 0 && fns.canSmash(store))
    ),
    new Check("Lakebed Temple East Second Floor Southwest Chest", fns.always),
    // key skip
    new Check(
        "Lakebed Temple East Water Supply Clawshot Chest",
        (store) => store.items.Clawshot > 0 && fns.canSmash(store) && store.items.IronBoots
    ),
    new Check(
        "Lakebed Temple East Water Supply Small Chest",
        (store) => (store.items.Clawshot > 0 || fns.canLaunchBombs(store))
            && fns.canSmash(store) && store.items.IronBoots

    ),
    new Check("Lakebed Temple Lobby Left Chest", ({ items }) => items.ZoraArmor),
    new Check("Lakebed Temple Lobby Rear Chest", ({ items }) => items.ZoraArmor),
    new Check("Lakebed Temple Morpheel Heart Container", fns.canDefeatMorpheel),
    new Check("Lakebed Temple Stalactite Room Chest", fns.canLaunchBombs),
    new Check("Lakebed Temple Underwater Maze Small Chest", (store) => store.items.ZoraArmor && store.items.Clawshot > 0 && fns.canLaunchBombs(store)),
    new Check("Lakebed Temple West Lower Small Chest", ({ items }) => items.Clawshot > 0),
    new Check("Lakebed Temple West Second Floor Central Small Chest", ({ items }) => items.Clawshot > 0),
    new Check("Lakebed Temple West Second Floor Northeast Chest", (store) => store.items.Clawshot > 0 && fns.canLaunchBombs(store)),
    new Check("Lakebed Temple West Second Floor Southeast Chest", (store) => store.items.Clawshot > 0 && fns.canLaunchBombs(store)),
    new Check(
        "Lakebed Temple West Second Floor Southwest Underwater Chest",
        (store) => store.items.Clawshot > 0 && store.items.IronBoots && fns.canLaunchBombs(store)
    ),
    new Check(
        "Lakebed Temple West Water Supply Chest",
        (store) => store.items.Clawshot > 0 && store.items.IronBoots && fns.canLaunchBombs(store)
    ),
    new Check(
        "Lakebed Temple West Water Supply Small Chest",
        (store) => store.items.Clawshot > 0 && store.items.IronBoots && fns.canLaunchBombs(store)
    ),
];

export const checkDataGlitchless: Check[] = [
    // overworld
    ...ordonCheckDataGlitchless,
    ...faronCheckDataGlitchless,
    ...eldinCheckDataGlitchless,
    ...lanayruCheckDataGlitchless,
    // dungeons
    ...forestTempleCheckDataGlitchless,
    ...goronMinesCheckDataGlitchless,
    ...lakebedTempleCheckDataGlitchless
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
