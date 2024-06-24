
import type { LogicStore } from './index';
import type { Regions as AnyRegions } from "./region";
import type { CheckName } from './check-name';
import * as fns from './logic-functions';

export type CheckKind = "standard" | "poe" | "bug";

export type Accessable = (store: LogicStore) => boolean;

interface Regions<V> extends AnyRegions<"checks", V> { }

const checkAccessibilityGlitchlessRegions: Regions<Accessable> = {
    ordon: {
        "Ordon Cat Rescue": (store) => store.items.Rod > 0,
        "Ordon Shield": (store) => {
            // this is a surprisingly complicated question, so let's split it up.
            // you need to be able to be a wolf to do the check, in vanilla you're always wolf when you reach this point. 
            const canBeWolf = store.items.Crystal || (!store.settings.skip.faronTwilight && fns.canCompletePrologue(store));
            // fixme: support bonksDoDamage and damage amplification settings:
            // if OHKO you need two bottles and lanterns to be able guaranteed put fairies in them,
            // as well as access to lakebed temple (or CoO, or the end of forest temple, but logic only considers the first one).
            const canSurvive = true;

            return canBeWolf && canSurvive;
        },
        "Ordon Spring Golden Wolf": store => store.items.Crystal && store.reachableZones.has("Death Mountain Trail"),
        "Herding Goats Reward": fns.canCompletePrologue,
        "Uli Cradle Delivery": fns.always,
        "Links Basement Chest": (store) => store.items.Lantern,
        "Ordon Sword": (store) => fns.canCompletePrologue(store) || store.settings.skip.faronTwilight,
        // check that isn't possible "always" in vanilla lol.
        "Sera Shop Slingshot": fns.always,
        "Wooden Sword Chest": fns.always,
        "Wrestling With Bo": fns.always,
        "Ordon Ranch Grotto Lantern Chest": (store) => store.items.Lantern
    },
    faron: {
        "Coro Bottle": (store) => fns.canCompletePrologue(store),
        "Faron Field Bridge Chest": (store) => store.items.Clawshot > 0,
        "Faron Field Corner Grotto Left Chest": fns.always,
        "Faron Field Corner Grotto Rear Chest": fns.always,
        "Faron Field Corner Grotto Right Chest": fns.always,
        "Faron Field Female Beetle": (store) => store.items.Boomerang || store.items.Clawshot > 0,
        "Faron Field Male Beetle": fns.always,
        "Faron Field Poe": (store) => store.items.Crystal && fns.canCompleteMDH(store),
        "Faron Field Tree Heart Piece": (store) => store.items.Boomerang || store.items.Clawshot > 0,
        "Faron Woods Owl Statue Sky Character": (store) => fns.canSmash(store) && store.items.Dominion >= 2 && fns.canClearForest(store),
        "South Faron Cave Chest": fns.always,
        "Faron Mist Cave Open Chest": fns.always,
        "Faron Mist Cave Lantern Chest": (store) => store.items.Lantern,
        "Faron Mist Poe": (store) => store.items.Crystal && fns.canCompletePrologue(store),
        "Faron Mist Stump Chest": (store) => store.items.Lantern && fns.canCompletePrologue(store),
        "Faron Mist North Chest": (store) => store.items.Lantern && fns.canCompletePrologue(store),
        "Faron Mist South Chest": (store) => store.items.Lantern && fns.canCompletePrologue(store),
        "Faron Woods Owl Statue Chest": (store) => fns.canSmash(store) && store.items.Dominion >= 2 && store.items.Crystal && fns.canClearForest(store),
        // grove entrance settings.
        "Lost Woods Boulder Poe": (store) => store.items.Crystal && (fns.canDefeatSkullKid(store)),
        "Lost Woods Lantern Chest": (store) => store.items.Lantern,
        "Lost Woods Waterfall Poe": (store) => store.items.Crystal,
        "North Faron Woods Deku Baba Chest": fns.always,
        "Faron Woods Golden Wolf": fns.always,
        "Sacred Grove Baba Serpent Grotto Chest": (store) => fns.canDefeatBabaSerpent(store) && fns.canKnockDownHangingBaba(store),
        "Sacred Grove Female Snail": (store) => store.items.Clawshot > 0 || store.items.Boomerang,
        "Sacred Grove Male Snail": (store) => store.items.Clawshot > 0 || store.items.Boomerang,
        "Sacred Grove Master Sword Poe": (store) => store.items.Crystal,
        "Sacred Grove Past Owl Statue Chest": (store) => store.items.Rod >= 1,
        "Sacred Grove Spinner Chest": (store) => store.items.Spinner,
        "Sacred Grove Temple of Time Owl Statue Poe": (store) => store.items.Crystal && store.items.Rod >= 1,
    },
    eldin: {
        "Barnes Bomb Bag": fns.always,
        "Bridge of Eldin Female Phasmid": (store) => store.items.Clawshot > 0 || store.items.Boomerang,
        "Bridge of Eldin Male Phasmid": (store) => store.items.Clawshot > 0 || store.items.Boomerang,
        "Bridge of Eldin Owl Statue Chest": (store) => store.items.Dominion >= 2,
        "Bridge of Eldin Owl Statue Sky Character": (store) => store.items.Dominion >= 2,

        // is the dominion rod req needed?
        "Cats Hide and Seek Minigame": (store) => store.items.Crystal
            && store.items.Clawshot > 0
            && store.items.Ilias_Charm
            && store.items.Bow > 0
            && store.items.Dominion > 0,

        // fixme: `barrenDungeons` setting (currently assumed false, which means the goron mines check is always an option).
        "Death Mountain Alcove Chest": (store) => (fns.canCompleteGoronMines(store)) || (store.items.Clawshot > 0 && (store.items.IronBoots || store.items.Crystal)),
        "Death Mountain Trail Poe": (store) => store.items.Crystal && fns.canCompleteGoronMines(store),
        "Eldin Field Bomb Rock Chest": fns.canSmash,
        "Eldin Field Bomskit Grotto Lantern Chest": (store) => store.items.Lantern && fns.canDefeatBomskit(store),
        "Eldin Field Bomskit Grotto Left Chest": fns.canDefeatBomskit,
        "Eldin Field Female Grasshopper": fns.always,
        "Eldin Field Male Grasshopper": fns.always,
        "Eldin Field Stalfos Grotto Left Small Chest": fns.always,
        "Eldin Field Stalfos Grotto Right Small Chest": fns.always,
        "Eldin Field Stalfos Grotto Stalfos Chest": fns.canDefeatStalfos,
        "Eldin Field Water Bomb Fish Grotto Chest": fns.always,
        "Eldin Lantern Cave First Chest": fns.canBurnWebs,
        "Eldin Lantern Cave Lantern Chest": (store) => store.items.Lantern,
        "Eldin Lantern Cave Poe": (store) => store.items.Crystal && fns.canBurnWebs(store),
        "Eldin Lantern Cave Second Chest": fns.canBurnWebs,
        "Eldin Spring Underwater Chest": (store) => store.items.IronBoots && fns.canSmash(store),
        "Eldin Stockcave Lantern Chest": (store) => store.items.Lantern && store.items.IronBoots,
        "Eldin Stockcave Lowest Chest": (store) => store.items.IronBoots,
        "Eldin Stockcave Upper Chest": (store) => store.items.IronBoots,

        "Gift From Ralis": (store) => store.items.Sketch
            && (store.items.GateKeys || store.settings.smallKeys === "keysy"),

        // there's a Gate Keys || Keysy check in the generator's logic, but I'm pretty sure it isn't required, I'm not even sure if crystal is required..
        "Goron Springwater Rush": (store) => store.items.Crystal
            || store.settings.skip.lanayruTwilight
            || fns.canSmash(store),

        "Hidden Village Poe": (store) => store.items.Crystal
            && store.items.Clawshot > 0
            && store.items.Ilias_Charm
            && store.items.Bow > 0
            && store.items.Dominion >= 1,

        "Ilia Charm": (store) => store.items.Bow > 0,
        "Ilia Memory Reward": (store) => store.items.Ilias_Charm,
        "Kakariko Gorge Double Clawshot Chest": (store) => store.items.Clawshot >= 2,
        "Kakariko Gorge Female Pill Bug": fns.always,
        "Kakariko Gorge Male Pill Bug": fns.always,
        "Kakariko Gorge Owl Statue Chest": (store) => store.items.Dominion >= 2,
        "Kakariko Gorge Owl Statue Sky Character": (store) => store.items.Dominion >= 2,
        "Kakariko Gorge Poe": (store) => store.items.Crystal && fns.canCompleteMDH(store),
        "Kakariko Gorge Spire Heart Piece": (store) => store.items.Clawshot > 0 || store.items.Boomerang,
        "Kakariko Graveyard Golden Wolf": fns.never,
        // todo: snowpeak.
        // (store) => store.items.Crystal
        //     && store.logic.reachableZones.has("Snowpeak Climb")
        //     && (store.items.Rod >= 2 || store.settings.skip.snowpeakEntrance)
        "Kakariko Graveyard Grave Poe": (store) => store.items.Crystal,
        "Kakariko Graveyard Lantern Chest": (store) => store.items.Lantern,
        "Kakariko Graveyard Male Ant": fns.always,
        "Kakariko Graveyard Open Poe": (store) => store.items.Crystal,
        "Kakariko Inn Chest": fns.always,

        "Kakariko Village Bomb Rock Spire Heart Piece":
            (store) => store.items.Boomerang && fns.canLaunchBombs(store),
        "Kakariko Village Bomb Shop Poe": (store) => store.items.Crystal,
        "Kakariko Village Female Ant": fns.always,
        "Kakariko Village Malo Mart Hawkeye": (store) => store.items.Bow > 0 && fns.canCompleteGoronMines(store),
        "Kakariko Village Malo Mart Hylian Shield": fns.always,
        // "Kakariko Village Malo Mart Red Potion": ),
        // "Kakariko Village Malo Mart Wooden Shield":),
        "Kakariko Village Watchtower Poe": (store) => store.items.Crystal,
        "Kakariko Watchtower Alcove Chest": fns.canSmash,
        "Kakariko Watchtower Chest": fns.always,
        "Renados Letter": (store) => fns.canCompleteTempleofTime(store),
        "Rutelas Blessing": (store) => store.items.GateKeys || store.settings.smallKeys === "keysy",
        "Skybook From Impaz": (store) => store.items.Bow > 0 && store.items.Dominion > 0,
        "Talo Sharpshooting": (store) => store.items.Bow > 0 && fns.canCompleteGoronMines(store),
    },
    lanayru: {
        "Agitha Bug #1 Reward": ({ items }) => items.Bugs >= 1,
        "Agitha Bug #2 Reward": ({ items }) => items.Bugs >= 2,
        "Agitha Bug #3 Reward": ({ items }) => items.Bugs >= 3,
        "Agitha Bug #4 Reward": ({ items }) => items.Bugs >= 4,
        "Agitha Bug #5 Reward": ({ items }) => items.Bugs >= 5,
        "Agitha Bug #6 Reward": ({ items }) => items.Bugs >= 6,
        "Agitha Bug #7 Reward": ({ items }) => items.Bugs >= 7,
        "Agitha Bug #8 Reward": ({ items }) => items.Bugs >= 8,
        "Agitha Bug #9 Reward": ({ items }) => items.Bugs >= 9,
        "Agitha Bug #10 Reward": ({ items }) => items.Bugs >= 10,
        "Agitha Bug #11 Reward": ({ items }) => items.Bugs >= 11,
        "Agitha Bug #12 Reward": ({ items }) => items.Bugs >= 12,
        "Agitha Bug #13 Reward": ({ items }) => items.Bugs >= 13,
        "Agitha Bug #14 Reward": ({ items }) => items.Bugs >= 14,
        "Agitha Bug #15 Reward": ({ items }) => items.Bugs >= 15,
        "Agitha Bug #16 Reward": ({ items }) => items.Bugs >= 16,
        "Agitha Bug #17 Reward": ({ items }) => items.Bugs >= 17,
        "Agitha Bug #18 Reward": ({ items }) => items.Bugs >= 18,
        "Agitha Bug #19 Reward": ({ items }) => items.Bugs >= 19,
        "Agitha Bug #20 Reward": ({ items }) => items.Bugs >= 20,
        "Agitha Bug #21 Reward": ({ items }) => items.Bugs >= 21,
        "Agitha Bug #22 Reward": ({ items }) => items.Bugs >= 22,
        "Agitha Bug #23 Reward": ({ items }) => items.Bugs >= 23,
        "Agitha Bug #24 Reward": ({ items }) => items.Bugs >= 24,
        "Auru Gift To Fyer": fns.always,

        // we don't have to check for npcGifts here because we only want to show it as available once we *have the wallet*.
        "Castle Town Malo Mart Magic Armor":
            ({ settings, items }) => settings.increaseWalletCapacity
                || items.Wallet >= 2,

        "Charlo Donation Blessing": fns.always,
        "Doctors Office Balcony Chest": ({ items }) => items.Invoice && items.Crystal,
        "East Castle Town Bridge Poe": ({ items }) => items.Crystal,
        "Fishing Hole Bottle": ({ items }) => items.Rod >= 1,
        "Fishing Hole Heart Piece": fns.always,
        "Flight By Fowl Fifth Platform Chest": fns.always,
        "Flight By Fowl Fourth Platform Chest": fns.always,
        "Flight By Fowl Ledge Poe": ({ items }) => items.Crystal,
        "Flight By Fowl Second Platform Chest": fns.always,
        "Flight By Fowl Third Platform Chest": fns.always,
        "Flight By Fowl Top Platform Reward": fns.always,
        "Hyrule Field Amphitheater Owl Statue Chest": ({ items }) => items.Dominion >= 2,
        "Hyrule Field Amphitheater Owl Statue Sky Character": ({ items }) => items.Dominion >= 2,
        "Hyrule Field Amphitheater Poe": ({ items }) => items.Crystal,
        "Isle of Riches Poe": ({ items }) => items.Crystal,

        // I think I might be writing this wrong, but maybe not.
        "Iza Helping Hand":
            (store) => store.items.Bow > 0 && store.reachableZones.has("Zoras Domain") && fns.canDefeatShadowBeast(store),
        // I think I might be writing this wrong, but maybe not.
        "Iza Raging Rapids Minigame":
            (store) => store.items.Bow > 0 && store.reachableZones.has("Zoras Domain") && fns.canDefeatShadowBeast(store),

        "Jovani 20 Poe Soul Reward": (store) => store.items.Soul >= 20 && store.items.Crystal && fns.canCompleteMDH(store),
        "Jovani 60 Poe Soul Reward": (store) => store.items.Soul >= 60 && store.items.Crystal && fns.canCompleteMDH(store),
        "Jovani House Poe": ({ items }) => items.Crystal,
        "Lake Hylia Alcove Poe": ({ items }) => items.Crystal,

        "Lake Hylia Bridge Bubble Grotto Chest": (store) => fns.canDefeatBubble(store)
            && fns.canDefeatFireBubble(store) && fns.canDefeatIceBubble(store),

        "Lake Hylia Bridge Cliff Chest": (store) => fns.canLaunchBombs(store) && store.items.Clawshot > 0,

        "Lake Hylia Bridge Cliff Poe":
            (store) => store.items.Crystal
                && fns.canLaunchBombs(store)
                && store.items.Clawshot > 0
                && fns.canCompleteMDH(store),

        "Lake Hylia Bridge Female Mantis": ({ items }) => items.Clawshot > 0 || items.Boomerang,
        "Lake Hylia Bridge Male Mantis": ({ items }) => items.Clawshot > 0 || items.Boomerang,
        "Lake Hylia Bridge Owl Statue Chest": ({ items }) => items.Dominion >= 2 && items.Clawshot > 0,
        "Lake Hylia Bridge Owl Statue Sky Character": ({ items }) => items.Dominion >= 2 && items.Clawshot > 0,
        "Lake Hylia Bridge Vines Chest": ({ items }) => items.Clawshot > 0,
        "Lake Hylia Dock Poe": ({ items }) => items.Crystal,
        "Lake Hylia Shell Blade Grotto Chest": (store) => fns.canDefeatShellBlade(store),
        "Lake Hylia Tower Poe": ({ items }) => items.Crystal,
        "Lake Hylia Underwater Chest": ({ items }) => items.IronBoots,
        "Lake Hylia Water Toadpoli Grotto Chest": fns.canDefeatWaterToadpoli,
        "Lake Lantern Cave First Chest": fns.always,
        "Lake Lantern Cave Second Chest": fns.always,
        "Lake Lantern Cave Third Chest": fns.always,
        "Lake Lantern Cave Fourth Chest": fns.always,
        "Lake Lantern Cave Fifth Chest": fns.always,
        "Lake Lantern Cave Sixth Chest": ({ items }) => items.Lantern,
        "Lake Lantern Cave Seventh Chest": fns.always,
        "Lake Lantern Cave Eighth Chest": fns.always,
        "Lake Lantern Cave Ninth Chest": fns.always,
        "Lake Lantern Cave Tenth Chest": fns.always,
        "Lake Lantern Cave Eleventh Chest": fns.always,
        "Lake Lantern Cave Twelfth Chest": fns.always,
        "Lake Lantern Cave Thirteenth Chest": fns.always,
        "Lake Lantern Cave Fourteenth Chest": fns.always,
        "Lake Lantern Cave End Lantern Chest": ({ items }) => items.Lantern,
        "Lake Lantern Cave First Poe": ({ items }) => items.Crystal,
        "Lake Lantern Cave Second Poe": ({ items }) => items.Crystal,
        "Lake Lantern Cave Final Poe": ({ items }) => items.Crystal,
        "Lanayru Field Behind Gate Underwater Chest": ({ items }) => items.IronBoots,
        "Lanayru Field Bridge Poe": (store) => store.items.Crystal && fns.canCompleteMDH(store),
        "Lanayru Field Female Stag Beetle": ({ items }) => items.Clawshot > 0 || items.Boomerang,
        "Lanayru Field Male Stag Beetle": ({ items }) => items.Clawshot > 0 || items.Boomerang,
        "Lanayru Field Poe Grotto Left Poe": ({ items }) => items.Crystal,
        "Lanayru Field Poe Grotto Right Poe": ({ items }) => items.Crystal,

        "Lanayru Field Skulltula Grotto Chest": (store) => fns.canDefeatSkulltula(store)
            && store.items.Lantern && fns.canBreakWoodenDoor(store),

        "Lanayru Field Spinner Track Chest": (store) => fns.canSmash(store) && store.items.Spinner,
        "Lanayru Ice Block Puzzle Cave Chest": ({ items }) => items.Chainball,
        "Lanayru Spring Back Room Lantern Chest": ({ items }) => items.Clawshot > 0 && items.Lantern,
        "Lanayru Spring Back Room Left Chest": ({ items }) => items.Clawshot > 0,
        "Lanayru Spring Back Room Right Chest": ({ items }) => items.Clawshot > 0,
        "Lanayru Spring East Double Clawshot Chest": ({ items }) => items.Clawshot >= 2,
        "Lanayru Spring Underwater Left Chest": ({ items }) => items.IronBoots,
        "Lanayru Spring Underwater Right Chest": ({ items }) => items.IronBoots,
        "Lanayru Spring West Double Clawshot Chest": ({ items }) => items.Clawshot >= 2,

        "North Castle Town Golden Wolf": (store) => store.items.Crystal
            && store.reachableZones.has("Hidden Village") && fns.canCompleteMDH(store),

        "Outside Lanayru Spring Left Statue Chest": fns.always,
        "Outside Lanayru Spring Right Statue Chest": fns.always,
        "Outside South Castle Town Double Clawshot Chasm Chest": ({ items }) => items.Clawshot >= 2,
        "Outside South Castle Town Female Ladybug": fns.always,
        "Outside South Castle Town Fountain Chest": ({ items }) => items.Spinner && items.Clawshot >= 1,
        "Outside South Castle Town Golden Wolf": (store) => store.items.Crystal && store.reachableZones.has("North Faron Woods"),
        "Outside South Castle Town Male Ladybug": fns.always,
        "Outside South Castle Town Poe": ({ items }) => items.Crystal,
        "Outside South Castle Town Tektite Grotto Chest": (store) => fns.canDefeatTektite(store),
        "Outside South Castle Town Tightrope Chest": ({ items }) => items.Clawshot > 0 && items.Crystal,
        "Plumm Fruit Balloon Minigame": ({ items }) => items.Crystal,
        "STAR Prize 1": ({ items }) => items.Clawshot > 0,
        "STAR Prize 2": ({ items }) => items.Clawshot >= 2,
        "Telma Invoice": ({ items }) => items.Renardos_Letter,
        "Upper Zoras River Female Dragonfly": fns.always,
        "Upper Zoras River Poe": ({ items }) => items.Crystal,
        "West Hyrule Field Female Butterfly": ({ items }) => items.Clawshot > 0 || items.Boomerang,
        "West Hyrule Field Golden Wolf": (store) => store.items.Crystal && store.reachableZones.has("Zoras Domain"),
        "West Hyrule Field Helmasaur Grotto Chest": fns.canDefeatHelmasaur,
        "West Hyrule Field Male Butterfly": fns.always,
        "Wooden Statue": ({ items }) => items.Invoice,
        "Zoras Domain Chest Behind Waterfall": ({ items }) => items.Crystal,
        "Zoras Domain Chest By Mother and Child Isles": fns.always,
        "Zoras Domain Extinguish All Torches Chest": ({ items }) => items.Boomerang && items.IronBoots,
        "Zoras Domain Light All Torches Chest": ({ items }) => items.Lantern && items.IronBoots,
        "Zoras Domain Male Dragonfly": fns.always,
        "Zoras Domain Mother and Child Isle Poe": ({ items }) => items.Crystal,

        "Zoras Domain Underwater Goron": (store) => fns.canUseWaterBombs(store)
            && store.items.IronBoots && store.items.ZoraArmor,

        "Zoras Domain Waterfall Poe": ({ items }) => items.Crystal,
    },
    gerudo: {
        "Bulblin Camp First Chest Under Tower At Entrance": fns.always,
        // fixme: CampKey
        "Bulblin Camp Poe": ({ items, settings }) => items.Crystal && (/* camp small key || */ settings.smallKeys === "keysy" || settings.skip.arbitersEntrance),
        "Bulblin Camp Roasted Boar": (store) => fns.hasDamagingItem(store, false),
        "Bulblin Camp Small Chest in Back of Camp": fns.always,
        "Bulblin Guard Key": fns.canDefeatBulblin,
        "Cave of Ordeals Floor 17 Poe": (store) => store.items.Spinner
            && store.items.Crystal
            && fns.canDefeatHelmasaur(store)
            && fns.canDefeatRat(store)
            && fns.canDefeatChu(store)
            && fns.canDefeatChuWorm(store)
            && fns.canDefeatBubble(store)
            && fns.canDefeatKeese(store)
            && fns.canDefeatStalhound(store),
        "Cave of Ordeals Floor 33 Poe": (store) => store.items.Crystal
            && store.items.Dominion >= 2
            && fns.canDefeatBeamos(store)
            && fns.canDefeatKeese(store)
            && fns.canDefeatDodongo(store)
            && fns.canDefeatBubble(store)
            && fns.canDefeatRedeadKnight(store),
        "Cave of Ordeals Floor 44 Poe": (store) => store.items.Crystal
            && store.items.Clawshot >= 2
            && (store.items.Bow > 0 || store.items.Chainball)
            && fns.canDefeatArmos(store)
            && fns.canDefeatBabaSerpent(store)
            && fns.canDefeatLizalfos(store)
            && fns.canDefeatDinalfos(store),
        "Cave of Ordeals Great Fairy Reward": (store) => store.items.Clawshot >= 2
            && fns.canDefeatArmos(store)
            && fns.canDefeatBokoblin(store)
            && fns.canDefeatBabaSerpent(store)
            && fns.canDefeatLizalfos(store)
            && fns.canDefeatBulblin(store)
            && fns.canDefeatDinalfos(store)
            && fns.canDefeatPoe(store)
            && fns.canDefeatRedeadKnight(store)
            && fns.canDefeatChu(store)
            && fns.canDefeatFreezard(store)
            && fns.canDefeatChilfos(store)
            && fns.canDefeatGhoulRat(store)
            && fns.canDefeatRat(store)
            && fns.canDefeatStalchild(store)
            && fns.canDefeatAeralfos(store)
            && fns.canDefeatDarknut(store),
        "Gerudo Desert Campfire East Chest": fns.canDefeatBulblin,
        "Gerudo Desert Campfire North Chest": fns.always,
        "Gerudo Desert Campfire West Chest": fns.canDefeatBulblin,
        "Gerudo Desert East Canyon Chest": fns.always,
        "Gerudo Desert East Poe": ({ items }) => items.Crystal,
        "Gerudo Desert Female Dayfly": fns.always,
        "Gerudo Desert Golden Wolf": (store) => store.items.Crystal && store.reachableZones.has("Lake Hylia"),
        "Gerudo Desert Lone Small Chest": fns.always,
        "Gerudo Desert Male Dayfly": fns.always,
        "Gerudo Desert North Peahat Poe": ({ items }) => items.Crystal && items.Clawshot > 0,
        "Gerudo Desert North Small Chest Before Bulblin Camp": fns.canDefeatBulblin,
        "Gerudo Desert Northeast Chest Behind Gates": fns.canDefeatBulblin,
        "Gerudo Desert Northwest Chest Behind Gates": fns.canDefeatBulblin,
        "Gerudo Desert Owl Statue Chest": ({ items }) => items.Dominion >= 2,
        "Gerudo Desert Owl Statue Sky Character": ({ items }) => items.Dominion >= 2,
        "Gerudo Desert Peahat Ledge Chest": ({ items }) => items.Clawshot > 0,
        "Gerudo Desert Poe Above Cave of Ordeals": (store) => store.items.Crystal
            && store.items.Clawshot > 0
            && fns.canDefeatShadowBeast(store),
        "Gerudo Desert Rock Grotto First Poe": (store) => store.items.Crystal && fns.canSmash(store),
        "Gerudo Desert Rock Grotto Lantern Chest": (store) => store.items.Lantern && fns.canSmash(store),
        "Gerudo Desert Rock Grotto Second Poe": (store) => store.items.Crystal && fns.canSmash(store),
        "Gerudo Desert Skulltula Grotto Chest": fns.canDefeatSkulltula,
        "Gerudo Desert South Chest Behind Wooden Gates": fns.canDefeatBulblin,
        "Gerudo Desert West Canyon Chest": ({ items }) => items.Clawshot > 0,
        "Outside Arbiters Grounds Lantern Chest": ({ items }) => items.Lantern,
        "Outside Arbiters Grounds Poe": ({ items }) => items.Crystal,
        "Outside Bulblin Camp Poe": ({ items }) => items.Crystal,
    },
    snowpeak: {
        "Ashei Sketch": fns.always,
        "Snowboard Racing Prize": fns.canCompleteSnowpeakRuins,
        "Snowpeak Above Freezard Grotto Poe": ({ settings, items }) => (items.Rod >= 2 || settings.skip.snowpeakEntrance) && items.Crystal,
        "Snowpeak Blizzard Poe": ({ settings, items }) => (items.Rod >= 2 || settings.skip.snowpeakEntrance) && items.Crystal,
        "Snowpeak Cave Ice Lantern Chest": ({ items }) => items.Lantern && items.Chainball,
        "Snowpeak Cave Ice Poe": ({ items }) => items.Crystal && items.Chainball,
        "Snowpeak Freezard Grotto Chest": (store) => store.items.Chainball && fns.canDefeatFreezard(store),
        "Snowpeak Icy Summit Poe": (store) => {
            // fixme: support bonksDoDamage and damage amplification settings:
            // if OHKO you need a bottle and the lantern to be able guaranteed put a fairy in it,
            // as well as access to lakebed temple (or CoO, or the end of forest temple, but logic only considers the first one).
            const canSurvive = true;
            return store.items.Crystal && fns.canDefeatShadowBeast(store) && canSurvive;

        },
        "Snowpeak Poe Among Trees": ({ settings, items }) => (items.Rod >= 2 || settings.skip.snowpeakEntrance) && items.Crystal,
    },

    forestTemple: {
        "Forest Temple Big Baba Key": (store) => fns.canDefeatBigBaba(store) && fns.canDefeatWalltula(store) === true,
        "Forest Temple Big Key Chest": (store) => store.items.Boomerang,
        "Forest Temple Central Chest Behind Stairs": (store) => store.items.Boomerang,
        "Forest Temple Central Chest Hanging From Web": (store) => fns.canCutHangingWeb(store),
        "Forest Temple Central North Chest": (store) => store.items.Lantern,
        "Forest Temple Diababa Heart Container": fns.canDefeatDiababa,
        "Forest Temple Dungeon Reward": fns.canDefeatDiababa,

        // todo: key setting:
        // https://github.com/zsrtp/Randomizer-Web-Generator/blob/b5ad864ba738a7daa3ccfe8f3076d2a906d6474d/Generator/World/Checks/Dungeons/Forest%20Temple/Forest%20Temple%20East%20Tile%20Worm%20Chest.jsonc#L2
        "Forest Temple East Tile Worm Chest":
            (store) => fns.canDefeatTileWorm(store) && fns.canDefeatSkulltula(store) && fns.canDefeatWalltula(store) === true,

        "Forest Temple East Water Cave Chest": fns.always,
        "Forest Temple Entrance Vines Chest": fns.always,
        "Forest Temple Gale Boomerang": (store) => fns.canDefeatOok(store),
        "Forest Temple North Deku Like Chest": (store) => store.items.Boomerang,

        // todo: key setting:
        // https://github.com/zsrtp/Randomizer-Web-Generator/blob/b5ad864ba738a7daa3ccfe8f3076d2a906d6474d/Generator/World/Checks/Dungeons/Forest%20Temple/Forest%20Temple%20Second%20Monkey%20Under%20Bridge%20Chest.jsonc#L2
        "Forest Temple Second Monkey Under Bridge Chest": fns.always,
        "Forest Temple Totem Pole Chest": fns.always,
        "Forest Temple West Deku Like Chest": (store) => fns.canDefeatWalltula(store) === true,
        "Forest Temple West Tile Worm Chest Behind Stairs": (store) => store.items.Boomerang,
        "Forest Temple West Tile Worm Room Vines Chest": fns.always,
        "Forest Temple Windless Bridge Chest": fns.always,
    },
    goronMines: {
        "Goron Mines After Crystal Switch Room Magnet Wall Chest": (store) => store.items.IronBoots,
        "Goron Mines Beamos Room Chest": (store) => store.items.IronBoots && fns.canDefeatDangoro(store) && store.items.Bow > 0,
        "Goron Mines Chest Before Dangoro": (store) => store.items.IronBoots,
        "Goron Mines Crystal Switch Room Small Chest": (store) => store.items.IronBoots,
        "Goron Mines Crystal Switch Room Underwater Chest": (store) => store.items.IronBoots,
        "Goron Mines Dangoro Chest": (store) => store.items.IronBoots && fns.canDefeatDangoro(store),
        "Goron Mines Dungeon Reward": fns.canDefeatFyrus,
        "Goron Mines Entrance Chest": (store) => fns.canPressMinesSwitch(store) && fns.canBreakWoodenDoor(store),
        "Goron Mines Fyrus Heart Container": fns.canDefeatFyrus,
        "Goron Mines Gor Amato Chest": (store) => store.items.IronBoots,
        "Goron Mines Gor Amato Key Shard": (store) => store.items.IronBoots,
        "Goron Mines Gor Amato Small Chest": (store) => store.items.IronBoots,
        "Goron Mines Gor Ebizo Chest": fns.always,
        "Goron Mines Gor Ebizo Key Shard": fns.always,
        "Goron Mines Gor Liggs Chest": (store) => store.items.IronBoots && fns.canDefeatDangoro(store) && store.items.Bow > 0,
        "Goron Mines Gor Liggs Key Shard": (store) => store.items.IronBoots && fns.canDefeatDangoro(store) && store.items.Bow > 0,
        "Goron Mines Magnet Maze Chest": (store) => store.items.IronBoots,
        "Goron Mines Main Magnet Room Bottom Chest": fns.always,
        // Key setting ignored.
        "Goron Mines Main Magnet Room Top Chest": (store) => store.items.Bow > 0 && store.items.IronBoots && fns.canDefeatDangoro(store),
        "Goron Mines Outside Beamos Chest": fns.always,
        "Goron Mines Outside Clawshot Chest": (store) => store.items.Clawshot > 0 && (store.items.Bow > 0 || store.items.Slingshot),
        "Goron Mines Outside Underwater Chest": (store) => (store.items.Sword > 0 || fns.canUseWaterBombs(store)) && store.items.IronBoots,
    },
    lakebedTemple: {
        // key settings ignored
        "Lakebed Temple Before Deku Toad Alcove Chest": (store) => (
            fns.canDefeatDekuToad(store)
            && store.items.ZoraArmor
            && store.items.IronBoots
            && fns.canUseWaterBombs(store)
            && store.items.Clawshot > 0
        )
            || fns.canLaunchBombs(store)
            || (store.items.Clawshot > 0 && fns.canSmash(store)),

        "Lakebed Temple Before Deku Toad Underwater Left Chest": (store) => store.items.ZoraArmor
            && store.items.IronBoots
            && (fns.canLaunchBombs(store) || (store.items.Clawshot > 0 && fns.canSmash(store))),

        "Lakebed Temple Before Deku Toad Underwater Right Chest": (store) => store.items.ZoraArmor
            && store.items.IronBoots
            && (fns.canLaunchBombs(store) || (store.items.Clawshot > 0 && fns.canSmash(store))),

        "Lakebed Temple Big Key Chest": (store) => store.items.Clawshot > 0
            && fns.canUseWaterBombs(store)
            && store.items.ZoraArmor && fns.canLaunchBombs(store)
            && store.items.IronBoots,
        "Lakebed Temple Central Room Chest": fns.always,
        // key skip
        "Lakebed Temple Central Room Small Chest": fns.always,
        "Lakebed Temple Central Room Spire Chest": (store) => store.items.IronBoots && fns.canLaunchBombs(store),
        // key skip
        "Lakebed Temple Chandelier Chest": ({ items }) => items.Clawshot > 0,

        "Lakebed Temple Deku Toad Chest": (store) => fns.canDefeatDekuToad(store)
            && store.items.ZoraArmor
            && store.items.IronBoots
            && fns.canUseWaterBombs(store)
            && (fns.canLaunchBombs(store) || (store.items.Clawshot > 0 && fns.canSmash(store))),
        "Lakebed Temple Dungeon Reward": fns.canDefeatMorpheel,
        // key skip
        "Lakebed Temple East Lower Waterwheel Bridge Chest": (store) => store.items.Clawshot > 0 && fns.canLaunchBombs(store),
        "Lakebed Temple East Lower Waterwheel Stalactite Chest": fns.canLaunchBombs,

        "Lakebed Temple East Second Floor Southeast Chest": (store) => fns.canLaunchBombs(store)
            || (store.items.Clawshot > 0 && fns.canSmash(store)),
        "Lakebed Temple East Second Floor Southwest Chest": fns.always,

        // key skip

        "Lakebed Temple East Water Supply Clawshot Chest": (store) => store.items.Clawshot > 0
            && fns.canSmash(store) && store.items.IronBoots,

        "Lakebed Temple East Water Supply Small Chest": (store) => (store.items.Clawshot > 0 || fns.canLaunchBombs(store))
            && fns.canSmash(store) && store.items.IronBoots,

        "Lakebed Temple Lobby Left Chest": ({ items }) => items.ZoraArmor,
        "Lakebed Temple Lobby Rear Chest": ({ items }) => items.ZoraArmor,
        "Lakebed Temple Morpheel Heart Container": fns.canDefeatMorpheel,
        "Lakebed Temple Stalactite Room Chest": fns.canLaunchBombs,
        "Lakebed Temple Underwater Maze Small Chest": (store) => store.items.ZoraArmor && store.items.Clawshot > 0 && fns.canLaunchBombs(store),
        "Lakebed Temple West Lower Small Chest": ({ items }) => items.Clawshot > 0,
        "Lakebed Temple West Second Floor Central Small Chest": ({ items }) => items.Clawshot > 0,
        "Lakebed Temple West Second Floor Northeast Chest": (store) => store.items.Clawshot > 0 && fns.canLaunchBombs(store),
        "Lakebed Temple West Second Floor Southeast Chest": (store) => store.items.Clawshot > 0 && fns.canLaunchBombs(store),

        "Lakebed Temple West Second Floor Southwest Underwater Chest": (store) => store.items.Clawshot > 0
            && store.items.IronBoots && fns.canLaunchBombs(store),

        "Lakebed Temple West Water Supply Chest": (store) => store.items.Clawshot > 0
            && store.items.IronBoots && fns.canLaunchBombs(store),

        "Lakebed Temple West Water Supply Small Chest": (store) => store.items.Clawshot > 0
            && store.items.IronBoots && fns.canLaunchBombs(store),
    },
    arbitersGrounds: {
        "Arbiters Grounds Big Key Chest": (store) => store.items.Clawshot > 0
            && store.items.Spinner
            && fns.canSmash(store),
        "Arbiters Grounds Death Sword Chest": (store) => fns.canDefeatDeathSword(store)
            && store.items.Clawshot > 0
            && fns.canDefeatBubble(store)
            && fns.canDefeatStalfos(store),
        "Arbiters Grounds East Lower Turnable Redead Chest": ({ items }) => items.Crystal,
        "Arbiters Grounds East Turning Room Poe": ({ items }) => items.Crystal && items.Clawshot > 0,
        "Arbiters Grounds East Upper Turnable Chest": fns.always,
        "Arbiters Grounds East Upper Turnable Redead Chest": fns.hasDamagingItem,
        "Arbiters Grounds Entrance Chest": fns.canBreakWoodenDoor,
        "Arbiters Grounds Ghoul Rat Room Chest": (store) => fns.canDefeatBubble(store)
            && fns.canDefeatStalchild(store)
            && fns.canDefeatRedeadKnight(store),
        "Arbiters Grounds Hidden Wall Poe": (store) => store.items.Crystal
            && fns.canDefeatRedeadKnight(store),
        "Arbiters Grounds North Turning Room Chest": ({ items }) => items.Clawshot > 0,
        "Arbiters Grounds Spinner Room First Small Chest": (store) => store.items.Clawshot > 0
            && store.items.Spinner
            && fns.canDefeatBubble(store)
            && fns.canDefeatStalfos(store),
        "Arbiters Grounds Spinner Room Lower Central Small Chest": (store) => store.items.Clawshot > 0
            && store.items.Spinner
            && fns.canDefeatBubble(store)
            && fns.canDefeatStalfos(store),
        "Arbiters Grounds Spinner Room Lower North Chest": (store) => store.items.Clawshot > 0
            && store.items.Spinner
            && fns.canDefeatBubble(store)
            && fns.canDefeatStalfos(store),
        "Arbiters Grounds Spinner Room Second Small Chest": (store) => store.items.Clawshot > 0
            && store.items.Spinner
            && fns.canDefeatBubble(store)
            && fns.canDefeatStalfos(store),
        "Arbiters Grounds Spinner Room Stalfos Alcove Chest": (store) => store.items.Clawshot > 0
            && store.items.Spinner
            && fns.canDefeatBubble(store)
            && fns.canDefeatStalfos(store),
        "Arbiters Grounds Stallord Heart Container": fns.canDefeatStallord,
        "Arbiters Grounds Torch Room East Chest": fns.always,
        "Arbiters Grounds Torch Room Poe": ({ items }) => items.Crystal,
        "Arbiters Grounds Torch Room West Chest": fns.always,
        "Arbiters Grounds West Chandelier Chest": ({ items }) => items.Crystal,
        "Arbiters Grounds West Poe": (store) => store.items.Crystal
            && fns.canSmash(store)
            && fns.canDefeatRedeadKnight(store)
            && fns.canDefeatStalchild(store)
            && fns.canDefeatBubble(store)
            && fns.canDefeatGhoulRat(store),
        "Arbiters Grounds West Small Chest Behind Block": fns.always,
        "Arbiters Grounds West Stalfos Northeast Chest": (store) => fns.canBreakWoodenDoor(store)
            && fns.canDefeatRedeadKnight(store)
            && fns.canDefeatStalchild(store)
            && fns.canDefeatBubble(store)
            && fns.canDefeatGhoulRat(store),
        "Arbiters Grounds West Stalfos West Chest": (store) => fns.canBreakWoodenDoor(store)
            && fns.canDefeatRedeadKnight(store)
            && fns.canDefeatStalchild(store)
            && fns.canDefeatBubble(store)
            && fns.canDefeatGhoulRat(store),
    },
    snowpeakRuins: {
        "Snowpeak Ruins Ball and Chain": fns.never,
        "Snowpeak Ruins Blizzeta Heart Container": fns.never,
        "Snowpeak Ruins Broken Floor Chest": fns.never,
        "Snowpeak Ruins Chapel Chest": fns.never,
        "Snowpeak Ruins Chest After Darkhammer": fns.never,
        "Snowpeak Ruins Courtyard Central Chest": fns.never,
        "Snowpeak Ruins Dungeon Reward": fns.never,
        "Snowpeak Ruins East Courtyard Buried Chest": fns.never,
        "Snowpeak Ruins East Courtyard Chest": fns.never,
        "Snowpeak Ruins Ice Room Poe": fns.never,
        "Snowpeak Ruins Lobby Armor Poe": fns.never,
        "Snowpeak Ruins Lobby Chandelier Chest": fns.never,
        "Snowpeak Ruins Lobby East Armor Chest": fns.never,
        "Snowpeak Ruins Lobby Poe": fns.never,
        "Snowpeak Ruins Lobby West Armor Chest": fns.never,
        "Snowpeak Ruins Mansion Map": fns.never,
        "Snowpeak Ruins Northeast Chandelier Chest": fns.never,
        "Snowpeak Ruins Ordon Pumpkin Chest": fns.never,
        "Snowpeak Ruins West Cannon Room Central Chest": fns.never,
        "Snowpeak Ruins West Cannon Room Corner Chest": fns.never,
        "Snowpeak Ruins West Courtyard Buried Chest": fns.never,
        "Snowpeak Ruins Wooden Beam Central Chest": fns.never,
        "Snowpeak Ruins Wooden Beam Chandelier Chest": fns.never,
        "Snowpeak Ruins Wooden Beam Northwest Chest": fns.never,
    },
    templeOfTime: {},
    cityInTheSky: {},
    palaceOfTwilight: {},
    hyruleCastle: {},
};

const checkKindsRegions: Regions<CheckKind> = {
    ordon: {
        "Ordon Cat Rescue": "standard",
        "Ordon Shield": "standard",
        "Ordon Spring Golden Wolf": "standard",
        "Herding Goats Reward": "standard",
        "Uli Cradle Delivery": "standard",
        "Links Basement Chest": "standard",
        "Ordon Sword": "standard",
        "Sera Shop Slingshot": "standard",
        "Wooden Sword Chest": "standard",
        "Wrestling With Bo": "standard",
        "Ordon Ranch Grotto Lantern Chest": "standard"
    },
    faron: {
        "Coro Bottle": "standard",
        "Faron Field Bridge Chest": "standard",
        "Faron Field Corner Grotto Left Chest": "standard",
        "Faron Field Corner Grotto Rear Chest": "standard",
        "Faron Field Corner Grotto Right Chest": "standard",
        "Faron Field Female Beetle": "bug",
        "Faron Field Male Beetle": "bug",
        "Faron Field Poe": "poe",
        "Faron Field Tree Heart Piece": "standard",
        "Faron Woods Owl Statue Sky Character": "standard",
        "South Faron Cave Chest": "standard",
        "Faron Mist Cave Open Chest": "standard",
        "Faron Mist Cave Lantern Chest": "standard",
        "Faron Mist Poe": "poe",
        "Faron Mist Stump Chest": "standard",
        "Faron Mist North Chest": "standard",
        "Faron Mist South Chest": "standard",
        "Faron Woods Owl Statue Chest": "standard",
        "Lost Woods Boulder Poe": "poe",
        "Lost Woods Lantern Chest": "standard",
        "Lost Woods Waterfall Poe": "poe",
        "North Faron Woods Deku Baba Chest": "standard",
        "Faron Woods Golden Wolf": "standard",
        "Sacred Grove Baba Serpent Grotto Chest": "standard",
        "Sacred Grove Female Snail": "bug",
        "Sacred Grove Male Snail": "bug",
        "Sacred Grove Master Sword Poe": "poe",
        "Sacred Grove Past Owl Statue Chest": "standard",
        "Sacred Grove Spinner Chest": "standard",
        "Sacred Grove Temple of Time Owl Statue Poe": "poe",
    },
    eldin: {
        "Barnes Bomb Bag": "standard",
        "Bridge of Eldin Female Phasmid": "bug",
        "Bridge of Eldin Male Phasmid": "bug",
        "Bridge of Eldin Owl Statue Chest": "standard",
        "Bridge of Eldin Owl Statue Sky Character": "standard",
        "Cats Hide and Seek Minigame": "standard",
        "Death Mountain Alcove Chest": "standard",
        "Death Mountain Trail Poe": "poe",
        "Eldin Field Bomb Rock Chest": "standard",
        "Eldin Field Bomskit Grotto Lantern Chest": "standard",
        "Eldin Field Bomskit Grotto Left Chest": "standard",
        "Eldin Field Female Grasshopper": "bug",
        "Eldin Field Male Grasshopper": "bug",
        "Eldin Field Stalfos Grotto Left Small Chest": "standard",
        "Eldin Field Stalfos Grotto Right Small Chest": "standard",
        "Eldin Field Stalfos Grotto Stalfos Chest": "standard",
        "Eldin Field Water Bomb Fish Grotto Chest": "standard",
        "Eldin Lantern Cave First Chest": "standard",
        "Eldin Lantern Cave Lantern Chest": "standard",
        "Eldin Lantern Cave Poe": "poe",
        "Eldin Lantern Cave Second Chest": "standard",
        "Eldin Spring Underwater Chest": "standard",
        "Eldin Stockcave Lantern Chest": "standard",
        "Eldin Stockcave Lowest Chest": "standard",
        "Eldin Stockcave Upper Chest": "standard",
        "Gift From Ralis": "standard",
        "Goron Springwater Rush": "standard",
        "Hidden Village Poe": "poe",
        "Ilia Charm": "standard",
        "Ilia Memory Reward": "standard",
        "Kakariko Gorge Double Clawshot Chest": "standard",
        "Kakariko Gorge Female Pill Bug": "bug",
        "Kakariko Gorge Male Pill Bug": "bug",
        "Kakariko Gorge Owl Statue Chest": "standard",
        "Kakariko Gorge Owl Statue Sky Character": "standard",
        "Kakariko Gorge Poe": "poe",
        "Kakariko Gorge Spire Heart Piece": "standard",
        "Kakariko Graveyard Golden Wolf": "standard",
        "Kakariko Graveyard Grave Poe": "poe",
        "Kakariko Graveyard Lantern Chest": "standard",
        "Kakariko Graveyard Male Ant": "bug",
        "Kakariko Graveyard Open Poe": "poe",
        "Kakariko Inn Chest": "standard",
        "Kakariko Village Bomb Rock Spire Heart Piece": "standard",
        "Kakariko Village Bomb Shop Poe": "poe",
        "Kakariko Village Female Ant": "bug",
        "Kakariko Village Malo Mart Hawkeye": "standard",
        "Kakariko Village Malo Mart Hylian Shield": "standard",
        // "Kakariko Village Malo Mart Red Potion": "standard",
        // "Kakariko Village Malo Mart Wooden Shield": "standard",
        "Kakariko Village Watchtower Poe": "poe",
        "Kakariko Watchtower Alcove Chest": "standard",
        "Kakariko Watchtower Chest": "standard",
        "Renados Letter": "standard",
        "Rutelas Blessing": "standard",
        "Skybook From Impaz": "standard",
        "Talo Sharpshooting": "standard",
    },
    lanayru: {
        "Agitha Bug #1 Reward": "standard",
        "Agitha Bug #2 Reward": "standard",
        "Agitha Bug #3 Reward": "standard",
        "Agitha Bug #4 Reward": "standard",
        "Agitha Bug #5 Reward": "standard",
        "Agitha Bug #6 Reward": "standard",
        "Agitha Bug #7 Reward": "standard",
        "Agitha Bug #8 Reward": "standard",
        "Agitha Bug #9 Reward": "standard",
        "Agitha Bug #10 Reward": "standard",
        "Agitha Bug #11 Reward": "standard",
        "Agitha Bug #12 Reward": "standard",
        "Agitha Bug #13 Reward": "standard",
        "Agitha Bug #14 Reward": "standard",
        "Agitha Bug #15 Reward": "standard",
        "Agitha Bug #16 Reward": "standard",
        "Agitha Bug #17 Reward": "standard",
        "Agitha Bug #18 Reward": "standard",
        "Agitha Bug #19 Reward": "standard",
        "Agitha Bug #20 Reward": "standard",
        "Agitha Bug #21 Reward": "standard",
        "Agitha Bug #22 Reward": "standard",
        "Agitha Bug #23 Reward": "standard",
        "Agitha Bug #24 Reward": "standard",
        "Auru Gift To Fyer": "standard",
        "Castle Town Malo Mart Magic Armor": "standard",
        "Charlo Donation Blessing": "standard",
        "Doctors Office Balcony Chest": "standard",
        "East Castle Town Bridge Poe": "poe",
        "Fishing Hole Bottle": "standard",
        "Fishing Hole Heart Piece": "standard",
        "Flight By Fowl Fifth Platform Chest": "standard",
        "Flight By Fowl Fourth Platform Chest": "standard",
        "Flight By Fowl Ledge Poe": "poe",
        "Flight By Fowl Second Platform Chest": "standard",
        "Flight By Fowl Third Platform Chest": "standard",
        "Flight By Fowl Top Platform Reward": "standard",
        "Hyrule Field Amphitheater Owl Statue Chest": "standard",
        "Hyrule Field Amphitheater Owl Statue Sky Character": "standard",
        "Hyrule Field Amphitheater Poe": "poe",
        "Isle of Riches Poe": "poe",
        "Iza Helping Hand": "standard",
        "Iza Raging Rapids Minigame": "standard",
        "Jovani 20 Poe Soul Reward": "standard",
        "Jovani 60 Poe Soul Reward": "standard",
        "Jovani House Poe": "poe",
        "Lake Hylia Alcove Poe": "poe",
        "Lake Hylia Bridge Bubble Grotto Chest": "standard",
        "Lake Hylia Bridge Cliff Chest": "standard",
        "Lake Hylia Bridge Cliff Poe": "poe",
        "Lake Hylia Bridge Female Mantis": "bug",
        "Lake Hylia Bridge Male Mantis": "bug",
        "Lake Hylia Bridge Owl Statue Chest": "standard",
        "Lake Hylia Bridge Owl Statue Sky Character": "standard",
        "Lake Hylia Bridge Vines Chest": "standard",
        "Lake Hylia Dock Poe": "poe",
        "Lake Hylia Shell Blade Grotto Chest": "standard",
        "Lake Hylia Tower Poe": "poe",
        "Lake Hylia Underwater Chest": "standard",
        "Lake Hylia Water Toadpoli Grotto Chest": "standard",
        "Lake Lantern Cave Eighth Chest": "standard",
        "Lake Lantern Cave Eleventh Chest": "standard",
        "Lake Lantern Cave End Lantern Chest": "standard",
        "Lake Lantern Cave Fifth Chest": "standard",
        "Lake Lantern Cave Final Poe": "poe",
        "Lake Lantern Cave First Chest": "standard",
        "Lake Lantern Cave First Poe": "poe",
        "Lake Lantern Cave Fourteenth Chest": "standard",
        "Lake Lantern Cave Fourth Chest": "standard",
        "Lake Lantern Cave Ninth Chest": "standard",
        "Lake Lantern Cave Second Chest": "standard",
        "Lake Lantern Cave Second Poe": "poe",
        "Lake Lantern Cave Seventh Chest": "standard",
        "Lake Lantern Cave Sixth Chest": "standard",
        "Lake Lantern Cave Tenth Chest": "standard",
        "Lake Lantern Cave Third Chest": "standard",
        "Lake Lantern Cave Thirteenth Chest": "standard",
        "Lake Lantern Cave Twelfth Chest": "standard",
        "Lanayru Field Behind Gate Underwater Chest": "standard",
        "Lanayru Field Bridge Poe": "poe",
        "Lanayru Field Female Stag Beetle": "bug",
        "Lanayru Field Male Stag Beetle": "bug",
        "Lanayru Field Poe Grotto Left Poe": "poe",
        "Lanayru Field Poe Grotto Right Poe": "poe",
        "Lanayru Field Skulltula Grotto Chest": "standard",
        "Lanayru Field Spinner Track Chest": "standard",
        "Lanayru Ice Block Puzzle Cave Chest": "standard",
        "Lanayru Spring Back Room Lantern Chest": "standard",
        "Lanayru Spring Back Room Left Chest": "standard",
        "Lanayru Spring Back Room Right Chest": "standard",
        "Lanayru Spring East Double Clawshot Chest": "standard",
        "Lanayru Spring Underwater Left Chest": "standard",
        "Lanayru Spring Underwater Right Chest": "standard",
        "Lanayru Spring West Double Clawshot Chest": "standard",
        "North Castle Town Golden Wolf": "standard",
        "Outside Lanayru Spring Left Statue Chest": "standard",
        "Outside Lanayru Spring Right Statue Chest": "standard",
        "Outside South Castle Town Double Clawshot Chasm Chest": "standard",
        "Outside South Castle Town Female Ladybug": "bug",
        "Outside South Castle Town Fountain Chest": "standard",
        "Outside South Castle Town Golden Wolf": "standard",
        "Outside South Castle Town Male Ladybug": "bug",
        "Outside South Castle Town Poe": "poe",
        "Outside South Castle Town Tektite Grotto Chest": "standard",
        "Outside South Castle Town Tightrope Chest": "standard",
        "Plumm Fruit Balloon Minigame": "standard",
        "STAR Prize 1": "standard",
        "STAR Prize 2": "standard",
        "Telma Invoice": "standard",
        "Upper Zoras River Female Dragonfly": "bug",
        "Upper Zoras River Poe": "poe",
        "West Hyrule Field Female Butterfly": "bug",
        "West Hyrule Field Golden Wolf": "standard",
        "West Hyrule Field Helmasaur Grotto Chest": "standard",
        "West Hyrule Field Male Butterfly": "bug",
        "Wooden Statue": "standard",
        "Zoras Domain Chest Behind Waterfall": "standard",
        "Zoras Domain Chest By Mother and Child Isles": "standard",
        "Zoras Domain Extinguish All Torches Chest": "standard",
        "Zoras Domain Light All Torches Chest": "standard",
        "Zoras Domain Male Dragonfly": "bug",
        "Zoras Domain Mother and Child Isle Poe": "poe",
        "Zoras Domain Underwater Goron": "standard",
        "Zoras Domain Waterfall Poe": "poe",
    },
    gerudo: {
        "Bulblin Camp First Chest Under Tower At Entrance": "standard",
        "Bulblin Camp Poe": "poe",
        "Bulblin Camp Roasted Boar": "standard",
        "Bulblin Camp Small Chest in Back of Camp": "standard",
        "Bulblin Guard Key": "standard",
        "Cave of Ordeals Floor 17 Poe": "poe",
        "Cave of Ordeals Floor 33 Poe": "poe",
        "Cave of Ordeals Floor 44 Poe": "poe",
        "Cave of Ordeals Great Fairy Reward": "standard",
        "Gerudo Desert Campfire East Chest": "standard",
        "Gerudo Desert Campfire North Chest": "standard",
        "Gerudo Desert Campfire West Chest": "standard",
        "Gerudo Desert East Canyon Chest": "standard",
        "Gerudo Desert East Poe": "poe",
        "Gerudo Desert Female Dayfly": "bug",
        "Gerudo Desert Golden Wolf": "standard",
        "Gerudo Desert Lone Small Chest": "standard",
        "Gerudo Desert Male Dayfly": "bug",
        "Gerudo Desert North Peahat Poe": "poe",
        "Gerudo Desert North Small Chest Before Bulblin Camp": "standard",
        "Gerudo Desert Northeast Chest Behind Gates": "standard",
        "Gerudo Desert Northwest Chest Behind Gates": "standard",
        "Gerudo Desert Owl Statue Chest": "standard",
        "Gerudo Desert Owl Statue Sky Character": "standard",
        "Gerudo Desert Peahat Ledge Chest": "standard",
        "Gerudo Desert Poe Above Cave of Ordeals": "poe",
        "Gerudo Desert Rock Grotto First Poe": "poe",
        "Gerudo Desert Rock Grotto Lantern Chest": "standard",
        "Gerudo Desert Rock Grotto Second Poe": "poe",
        "Gerudo Desert Skulltula Grotto Chest": "standard",
        "Gerudo Desert South Chest Behind Wooden Gates": "standard",
        "Gerudo Desert West Canyon Chest": "standard",
        "Outside Arbiters Grounds Lantern Chest": "standard",
        "Outside Arbiters Grounds Poe": "poe",
        "Outside Bulblin Camp Poe": "poe",
    },
    snowpeak: {
        "Ashei Sketch": "standard",
        "Snowboard Racing Prize": "standard",
        "Snowpeak Above Freezard Grotto Poe": "poe",
        "Snowpeak Blizzard Poe": "poe",
        "Snowpeak Cave Ice Lantern Chest": "standard",
        "Snowpeak Cave Ice Poe": "poe",
        "Snowpeak Freezard Grotto Chest": "standard",
        "Snowpeak Icy Summit Poe": "poe",
        "Snowpeak Poe Among Trees": "poe",
    },

    forestTemple: {
        "Forest Temple Big Baba Key": "standard",
        "Forest Temple Big Key Chest": "standard",
        "Forest Temple Central Chest Behind Stairs": "standard",
        "Forest Temple Central Chest Hanging From Web": "standard",
        "Forest Temple Central North Chest": "standard",
        "Forest Temple Diababa Heart Container": "standard",
        "Forest Temple Dungeon Reward": "standard",
        "Forest Temple East Tile Worm Chest": "standard",
        "Forest Temple East Water Cave Chest": "standard",
        "Forest Temple Entrance Vines Chest": "standard",
        "Forest Temple Gale Boomerang": "standard",
        "Forest Temple North Deku Like Chest": "standard",
        "Forest Temple Second Monkey Under Bridge Chest": "standard",
        "Forest Temple Totem Pole Chest": "standard",
        "Forest Temple West Deku Like Chest": "standard",
        "Forest Temple West Tile Worm Chest Behind Stairs": "standard",
        "Forest Temple West Tile Worm Room Vines Chest": "standard",
        "Forest Temple Windless Bridge Chest": "standard",
    },
    goronMines: {
        "Goron Mines After Crystal Switch Room Magnet Wall Chest": "standard",
        "Goron Mines Beamos Room Chest": "standard",
        "Goron Mines Chest Before Dangoro": "standard",
        "Goron Mines Crystal Switch Room Small Chest": "standard",
        "Goron Mines Crystal Switch Room Underwater Chest": "standard",
        "Goron Mines Dangoro Chest": "standard",
        "Goron Mines Dungeon Reward": "standard",
        "Goron Mines Entrance Chest": "standard",
        "Goron Mines Fyrus Heart Container": "standard",
        "Goron Mines Gor Amato Chest": "standard",
        "Goron Mines Gor Amato Key Shard": "standard",
        "Goron Mines Gor Amato Small Chest": "standard",
        "Goron Mines Gor Ebizo Chest": "standard",
        "Goron Mines Gor Ebizo Key Shard": "standard",
        "Goron Mines Gor Liggs Chest": "standard",
        "Goron Mines Gor Liggs Key Shard": "standard",
        "Goron Mines Magnet Maze Chest": "standard",
        "Goron Mines Main Magnet Room Bottom Chest": "standard",
        "Goron Mines Main Magnet Room Top Chest": "standard",
        "Goron Mines Outside Beamos Chest": "standard",
        "Goron Mines Outside Clawshot Chest": "standard",
        "Goron Mines Outside Underwater Chest": "standard",
    },
    lakebedTemple: {
        "Lakebed Temple Before Deku Toad Alcove Chest": "standard",
        "Lakebed Temple Before Deku Toad Underwater Left Chest": "standard",
        "Lakebed Temple Before Deku Toad Underwater Right Chest": "standard",
        "Lakebed Temple Big Key Chest": "standard",
        "Lakebed Temple Central Room Chest": "standard",
        "Lakebed Temple Central Room Small Chest": "standard",
        "Lakebed Temple Central Room Spire Chest": "standard",
        "Lakebed Temple Chandelier Chest": "standard",
        "Lakebed Temple Deku Toad Chest": "standard",
        "Lakebed Temple Dungeon Reward": "standard",
        "Lakebed Temple East Lower Waterwheel Bridge Chest": "standard",
        "Lakebed Temple East Lower Waterwheel Stalactite Chest": "standard",
        "Lakebed Temple East Second Floor Southeast Chest": "standard",
        "Lakebed Temple East Second Floor Southwest Chest": "standard",
        "Lakebed Temple East Water Supply Clawshot Chest": "standard",
        "Lakebed Temple East Water Supply Small Chest": "standard",
        "Lakebed Temple Lobby Left Chest": "standard",
        "Lakebed Temple Lobby Rear Chest": "standard",
        "Lakebed Temple Morpheel Heart Container": "standard",
        "Lakebed Temple Stalactite Room Chest": "standard",
        "Lakebed Temple Underwater Maze Small Chest": "standard",
        "Lakebed Temple West Lower Small Chest": "standard",
        "Lakebed Temple West Second Floor Central Small Chest": "standard",
        "Lakebed Temple West Second Floor Northeast Chest": "standard",
        "Lakebed Temple West Second Floor Southeast Chest": "standard",
        "Lakebed Temple West Second Floor Southwest Underwater Chest": "standard",
        "Lakebed Temple West Water Supply Chest": "standard",
        "Lakebed Temple West Water Supply Small Chest": "standard",
    },
    arbitersGrounds: {
        "Arbiters Grounds Big Key Chest": "standard",
        "Arbiters Grounds Death Sword Chest": "standard",
        "Arbiters Grounds East Lower Turnable Redead Chest": "standard",
        "Arbiters Grounds East Turning Room Poe": "poe",
        "Arbiters Grounds East Upper Turnable Chest": "standard",
        "Arbiters Grounds East Upper Turnable Redead Chest": "standard",
        "Arbiters Grounds Entrance Chest": "standard",
        "Arbiters Grounds Ghoul Rat Room Chest": "standard",
        "Arbiters Grounds Hidden Wall Poe": "poe",
        "Arbiters Grounds North Turning Room Chest": "standard",
        "Arbiters Grounds Spinner Room First Small Chest": "standard",
        "Arbiters Grounds Spinner Room Lower Central Small Chest": "standard",
        "Arbiters Grounds Spinner Room Lower North Chest": "standard",
        "Arbiters Grounds Spinner Room Second Small Chest": "standard",
        "Arbiters Grounds Spinner Room Stalfos Alcove Chest": "standard",
        "Arbiters Grounds Stallord Heart Container": "standard",
        "Arbiters Grounds Torch Room East Chest": "standard",
        "Arbiters Grounds Torch Room Poe": "poe",
        "Arbiters Grounds Torch Room West Chest": "standard",
        "Arbiters Grounds West Chandelier Chest": "standard",
        "Arbiters Grounds West Poe": "poe",
        "Arbiters Grounds West Small Chest Behind Block": "standard",
        "Arbiters Grounds West Stalfos Northeast Chest": "standard",
        "Arbiters Grounds West Stalfos West Chest": "standard",
    },
    snowpeakRuins: {
        "Snowpeak Ruins Ball and Chain": "standard",
        "Snowpeak Ruins Blizzeta Heart Container": "standard",
        "Snowpeak Ruins Broken Floor Chest": "standard",
        "Snowpeak Ruins Chapel Chest": "standard",
        "Snowpeak Ruins Chest After Darkhammer": "standard",
        "Snowpeak Ruins Courtyard Central Chest": "standard",
        "Snowpeak Ruins Dungeon Reward": "standard",
        "Snowpeak Ruins East Courtyard Buried Chest": "standard",
        "Snowpeak Ruins East Courtyard Chest": "standard",
        "Snowpeak Ruins Ice Room Poe": "poe",
        "Snowpeak Ruins Lobby Armor Poe": "poe",
        "Snowpeak Ruins Lobby Chandelier Chest": "standard",
        "Snowpeak Ruins Lobby East Armor Chest": "standard",
        "Snowpeak Ruins Lobby Poe": "poe",
        "Snowpeak Ruins Lobby West Armor Chest": "standard",
        "Snowpeak Ruins Mansion Map": "standard",
        "Snowpeak Ruins Northeast Chandelier Chest": "standard",
        "Snowpeak Ruins Ordon Pumpkin Chest": "standard",
        "Snowpeak Ruins West Cannon Room Central Chest": "standard",
        "Snowpeak Ruins West Cannon Room Corner Chest": "standard",
        "Snowpeak Ruins West Courtyard Buried Chest": "standard",
        "Snowpeak Ruins Wooden Beam Central Chest": "standard",
        "Snowpeak Ruins Wooden Beam Chandelier Chest": "standard",
        "Snowpeak Ruins Wooden Beam Northwest Chest": "standard",
    },
    templeOfTime: {},
    cityInTheSky: {},
    palaceOfTwilight: {},
    hyruleCastle: {},
};

export const checkKinds: Record<CheckName, CheckKind> = Object.assign({}, ...Object.values(checkKindsRegions));

export const checkNames: CheckName[] = Object.keys(checkKinds) as CheckName[];

function* swap<T1, T2>(v: IterableIterator<[T1, T2]>) {
    for (const [t1, t2] of v) {
        yield [t2, t1] as const;
    }
}

export const checkIds: Record<CheckName, number> = Object.fromEntries(swap(checkNames.entries())) as Record<CheckName, number>;

function makeCheckAccessibility(record: Record<CheckName, Accessable>) {
    return Object.entries(record)
        .sort(([a], [b]) => {
            const x = checkIds[a as CheckName];
            const y = checkIds[b as CheckName];

            // yay for being forced to write a compare function :/
            return (x === y) ? 0 : (x > y ? 1 : -1);
        })
        .map(([, v]) => v);
}

export const checkAccessibilityGlitchless = makeCheckAccessibility(Object.assign({}, ...Object.values(checkAccessibilityGlitchlessRegions)));
