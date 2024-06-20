import { type EldinZoneId, type FaronZoneId, type ForestTempleZoneId, type GoronMinesZoneId, type LanayruZoneId, type OrdonaZoneId, type ZoneId } from "./zone-id";
import * as fns from "./logic-functions";
import { type CheckName } from "./check-name";
import type { baseItems } from "$lib/items";
import type { RandomizerSettings } from "$lib/settings";
import { type LogicStore } from "./index";


export class ZoneNeighbor {
    #name;
    readonly accessable;

    constructor(name: ZoneId, accessable: (store: LogicStore) => boolean | null) {
        this.#name = name;
        this.accessable = accessable;
    }

    get name() {
        return this.#name;
    }
}

// This is literally copied from zsrtp/Randomizer-Web-Generator with minimal differences.
// After all, what better place to get the logic from than the logic itself.

const zoneDataOrdona: Record<OrdonaZoneId, CheckName[]> = {
    "Ordon Province": [
        "Uli Cradle Delivery",
        "Ordon Cat Rescue",
        "Sera Shop Slingshot",
        "Wooden Sword Chest",
        "Links Basement Chest",
        "Ordon Shield",
        "Ordon Sword",
        "Wrestling With Bo",
        "Herding Goats Reward",
        "Ordon Spring Golden Wolf"
    ],
    "Ordon Ranch Grotto": [
        "Ordon Ranch Grotto Lantern Chest",
    ],
};

const zoneNeighborsOrdonaGlitchless: Record<OrdonaZoneId, ZoneNeighbor[]> = {
    "Ordon Province": [
        new ZoneNeighbor("Ordon Ranch Grotto", store => fns.canCompletePrologue(store) && store.items.Crystal),
        new ZoneNeighbor("South Faron Woods", ({ settings, items }) => (items.Sword > 0 && items.Slingshot) || settings.skip.prologue),
    ],
    "Ordon Ranch Grotto": [
        new ZoneNeighbor("Ordon Province", fns.always),
    ],
};

const zoneDataFaron: Record<FaronZoneId, CheckName[]> = {
    "South Faron Woods": [
        "Coro Bottle",
        "Faron Woods Owl Statue Sky Character",
    ],

    "South Faron Woods Cave": [
        "South Faron Cave Chest"
    ],

    "Faron Mist Area": [
        "Faron Mist Stump Chest",
        "Faron Mist North Chest",
        "Faron Mist South Chest",
        "Faron Woods Owl Statue Chest",
        "Faron Mist Poe",
    ],

    "Faron Mist Cave": [
        "Faron Mist Cave Open Chest",
        "Faron Mist Cave Lantern Chest",
    ],

    "North Faron Woods": [
        "North Faron Woods Deku Baba Chest",
        "Faron Woods Golden Wolf",
    ],

    "Faron Field": [
        "Faron Field Bridge Chest",
        "Faron Field Tree Heart Piece",
        "Faron Field Male Beetle",
        "Faron Field Female Beetle",
        "Faron Field Poe",
    ],

    "Faron Field Corner Grotto": [
        "Faron Field Corner Grotto Right Chest",
        "Faron Field Corner Grotto Left Chest",
        "Faron Field Corner Grotto Rear Chest",
    ],

    "Lost Woods": [
        "Lost Woods Lantern Chest",
        "Lost Woods Boulder Poe",
        "Lost Woods Waterfall Poe",
    ],

    "Sacred Grove Baba Serpent Grotto": [
        "Sacred Grove Baba Serpent Grotto Chest",
    ],

    "Sacred Grove Master Sword": [
        "Sacred Grove Spinner Chest",
        "Sacred Grove Male Snail",
        "Sacred Grove Master Sword Poe",
    ],

    "Sacred Grove Temple of Time": [
        "Sacred Grove Past Owl Statue Chest",
        "Sacred Grove Female Snail",
        "Sacred Grove Temple of Time Owl Statue Poe",
    ],
};

const zoneNeighborsFaronGlitchless: Record<FaronZoneId, ZoneNeighbor[]> = {
    "South Faron Woods": [
        new ZoneNeighbor("Ordon Province", fns.always),
        new ZoneNeighbor("Faron Field", fns.canClearForest),
        new ZoneNeighbor("South Faron Woods Cave", fns.always),
        new ZoneNeighbor("Faron Mist Area", store => fns.canSmash(store) && store.items.Dominion >= 2 && store.items.Crystal && fns.canClearForest(store)),
    ],
    "South Faron Woods Cave": [
        new ZoneNeighbor("South Faron Woods", store => fns.canBurnWebs(store) || store.items.Crystal || store.settings.skip.prologue),
        new ZoneNeighbor("Faron Mist Area", store => fns.canBurnWebs(store) || store.items.Crystal || store.settings.skip.prologue),
    ],
    "Faron Mist Area": [
        new ZoneNeighbor("South Faron Woods Cave", fns.always),
        new ZoneNeighbor("Faron Mist Cave", store => store.items.Lantern),
        new ZoneNeighbor("North Faron Woods", store => fns.canCompletePrologue(store) && (store.items.Lantern || store.items.Crystal)),
    ],
    "Faron Mist Cave": [
        new ZoneNeighbor("Faron Mist Area", fns.always),
    ],
    "North Faron Woods": [
        new ZoneNeighbor("Faron Mist Area", fns.always),
        new ZoneNeighbor("Forest Temple Entrance", fns.always),
        new ZoneNeighbor("Lost Woods", store => store.items.Crystal),
    ],
    "Faron Field": [
        new ZoneNeighbor("South Faron Woods", fns.always),
        new ZoneNeighbor("Outside Castle Town South", (store) => {
            if (!fns.hasBottle(store)) {
                return false;
            }

            if (fns.canSmash(store)) {
                return true;
            }

            return ((store.items.GateKeys || store.settings.smallKeys === "keysy") && (store.items.Crystal || store.settings.skip.lanayruTwilight));
        }),
        new ZoneNeighbor("Kakariko Gorge", fns.always),
        new ZoneNeighbor("Lake Hylia Bridge", (store) => {
            if (fns.canSmash(store)) {
                return true;
            }

            return ((store.items.GateKeys || store.settings.smallKeys === "keysy") && (store.items.Crystal || store.settings.skip.lanayruTwilight));
        }),
        new ZoneNeighbor("Faron Field Corner Grotto", store => store.items.Crystal),
    ],
    "Faron Field Corner Grotto": [
        new ZoneNeighbor("Faron Field", fns.always),
    ],
    "Lost Woods": [
        new ZoneNeighbor("North Faron Woods", fns.always),
        new ZoneNeighbor(
            "Sacred Grove Master Sword",
            // ToT entrance settings for alt.
            store => (fns.canDefeatSkullKid(store) && store.items.Crystal),
        )
    ],
    "Sacred Grove Baba Serpent Grotto": [new ZoneNeighbor("Lost Woods", fns.always)],
    "Sacred Grove Master Sword": [
        new ZoneNeighbor("Lost Woods", fns.always),
        new ZoneNeighbor(
            "Sacred Grove Temple of Time",
            // ToT entrance settings.
            store => (fns.canDefeatShadowBeast(store) && store.items.Sword >= 3),
        ),
        new ZoneNeighbor(
            "Sacred Grove Baba Serpent Grotto",
            store => fns.canSmash(store) && store.items.Crystal
        )
    ],
    "Sacred Grove Temple of Time": [
        new ZoneNeighbor("Sacred Grove Master Sword", fns.always),
        // ToT entrance settings.
        // new ZoneNeighbor("Temple of Time Entrance", store => store.items.Sword >= 3)
        new ZoneNeighbor("Temple of Time Entrance", fns.never)
    ],
};

const zoneDataEldin: Record<EldinZoneId, CheckName[]> = {
    "Hidden Village": [
        "Cats Hide and Seek Minigame",
        "Ilia Charm",
        "Hidden Village Poe",
        "Skybook From Impaz",
    ],
    "Eldin Field Bomskit Grotto": [
        "Eldin Field Bomskit Grotto Left Chest",
        "Eldin Field Bomskit Grotto Lantern Chest",
    ],
    "Eldin Field Stalfos Grotto": [
        "Eldin Field Stalfos Grotto Right Small Chest",
        "Eldin Field Stalfos Grotto Left Small Chest",
        "Eldin Field Stalfos Grotto Stalfos Chest",
    ],
    "Eldin Field Water Bomb Fish Grotto": ["Eldin Field Water Bomb Fish Grotto Chest"],
    "Eldin Field": [
        "Eldin Field Bomb Rock Chest",
        "Bridge of Eldin Owl Statue Chest",
        "Goron Springwater Rush",
        "Bridge of Eldin Owl Statue Sky Character",
        "Eldin Field Male Grasshopper",
        "Eldin Field Female Grasshopper",
        "Bridge of Eldin Male Phasmid",
        "Bridge of Eldin Female Phasmid",
    ],
    "Eldin Long Cave": [
        "Eldin Lantern Cave First Chest",
        "Eldin Lantern Cave Lantern Chest",
        "Eldin Lantern Cave Second Chest",
        "Eldin Lantern Cave Poe",
    ],
    "Goron Stockcave": [
        "Eldin Stockcave Upper Chest",
        "Eldin Stockcave Lantern Chest",
        "Eldin Stockcave Lowest Chest",
    ],
    "Kakariko Gorge": [
        "Kakariko Gorge Owl Statue Chest",
        "Kakariko Gorge Double Clawshot Chest",
        "Kakariko Gorge Spire Heart Piece",
        "Kakariko Gorge Owl Statue Sky Character",
        "Kakariko Gorge Male Pill Bug",
        "Kakariko Gorge Female Pill Bug",
        "Kakariko Gorge Poe",
    ],
    "Death Mountain Interiors": [],
    "Death Mountain Trail": [
        "Death Mountain Alcove Chest",
        "Death Mountain Trail Poe",
    ],
    "Death Mountain Volcano": [],
    "Kakariko Village": [
        "Kakariko Graveyard Lantern Chest",
        "Gift From Ralis",
        "Rutelas Blessing",
        "Kakariko Graveyard Male Ant",
        "Kakariko Graveyard Grave Poe",
        "Kakariko Graveyard Open Poe",
        "Kakariko Graveyard Golden Wolf",
    ],
};

const zoneNeighborsEldinGlitchless: Record<EldinZoneId, ZoneNeighbor[]> = {
    "Hidden Village": [new ZoneNeighbor("Lanayru Field", fns.always)],
    "Eldin Field Bomskit Grotto": [new ZoneNeighbor("Eldin Field", fns.always)],
    "Eldin Field Stalfos Grotto": [new ZoneNeighbor("Eldin Field", fns.always)],
    "Eldin Field Water Bomb Fish Grotto": [new ZoneNeighbor("Eldin Field", fns.always)],
    "Eldin Field": [
        new ZoneNeighbor("Kakariko Gorge", fns.canSmash),
        new ZoneNeighbor("Kakariko Village", fns.always),
        new ZoneNeighbor("Goron Stockcave", store => store.items.Clawshot > 0),
        new ZoneNeighbor("Castle Town", (store) => {
            if (fns.canSmash(store)) {
                return true;
            }

            return ((store.items.GateKeys || store.settings.smallKeys === "keysy") && (store.items.Crystal || store.settings.skip.lanayruTwilight));
        }),
        new ZoneNeighbor("Lanayru Field", fns.canSmash),
        new ZoneNeighbor("Eldin Field Water Bomb Fish Grotto", store => store.items.Crystal),
        new ZoneNeighbor("Eldin Field Bomskit Grotto", store => store.items.Crystal),
        new ZoneNeighbor(
            "Eldin Field Stalfos Grotto",
            // the smash requirement feels redundant, but, shrug.
            store => store.items.Crystal
                && store.items.Spinner
                && (fns.canSmash(store) || store.settings.skip.lanayruTwilight || store.items.Crystal)
                && (store.items.GateKeys || store.settings.smallKeys === "keysy")
        ),
    ],
    "Eldin Long Cave": [new ZoneNeighbor("Kakariko Gorge", fns.always)],
    "Goron Stockcave": [new ZoneNeighbor("Eldin Field", fns.always)],
    "Kakariko Gorge": [
        new ZoneNeighbor("Eldin Field", fns.canSmash),
        new ZoneNeighbor("Faron Field", fns.always),
        new ZoneNeighbor("Kakariko Village", fns.always),
        new ZoneNeighbor("Eldin Long Cave", fns.canSmash),
    ],
    "Death Mountain Interiors": [
        new ZoneNeighbor("Death Mountain Volcano", fns.always),
        new ZoneNeighbor(
            "Goron Mines Entrance",
            store => store.items.IronBoots || store.settings.goronMinesLogic !== "closed"
        ),
    ],
    "Death Mountain Trail": [
        new ZoneNeighbor("Kakariko Village", fns.always),
        new ZoneNeighbor("Death Mountain Volcano", store => store.items.IronBoots || store.items.Crystal),
    ],
    "Death Mountain Volcano": [
        new ZoneNeighbor("Death Mountain Trail", fns.always),
        new ZoneNeighbor(
            "Death Mountain Interiors",
            store => store.items.IronBoots && (fns.canDefeatGoron(store) || store.settings.goronMinesLogic === "open")
        )
    ],
    "Kakariko Village": [
        new ZoneNeighbor("Kakariko Gorge", fns.always),
        new ZoneNeighbor("Eldin Field", fns.always),
        new ZoneNeighbor("Death Mountain Trail", fns.always),
        new ZoneNeighbor(
            "Lake Hylia",
            (store) => fns.canUseWaterBombs(store)
                && (store.items.IronBoots || store.items.ZoraArmor)
                && (store.items.GateKeys || store.settings.smallKeys === "keysy"),
        ),
    ],
};


const zoneDataLanayru: Record<LanayruZoneId, CheckName[]> = {
    "Castle Town": [
        "Doctors Office Balcony Chest",
        "STAR Prize 1",
        "STAR Prize 2",
        "Charlo Donation Blessing",
        "Telma Invoice",
        // these are technically supposed to be by bug name,
        // but fitting 24 bugs individually on an item tracker is kinda absurd, it's an extra 4 rows on its own.
        // and they're almost interchangable otherwise.
        "Agitha Bug #1 Reward",
        "Agitha Bug #2 Reward",
        "Agitha Bug #3 Reward",
        "Agitha Bug #4 Reward",
        "Agitha Bug #5 Reward",
        "Agitha Bug #6 Reward",
        "Agitha Bug #7 Reward",
        "Agitha Bug #8 Reward",
        "Agitha Bug #9 Reward",
        "Agitha Bug #10 Reward",
        "Agitha Bug #11 Reward",
        "Agitha Bug #12 Reward",
        "Agitha Bug #13 Reward",
        "Agitha Bug #14 Reward",
        "Agitha Bug #15 Reward",
        "Agitha Bug #16 Reward",
        "Agitha Bug #17 Reward",
        "Agitha Bug #18 Reward",
        "Agitha Bug #19 Reward",
        "Agitha Bug #20 Reward",
        "Agitha Bug #21 Reward",
        "Agitha Bug #22 Reward",
        "Agitha Bug #23 Reward",
        "Agitha Bug #24 Reward",
        "East Castle Town Bridge Poe",
        "Jovani House Poe",
        "North Castle Town Golden Wolf",
        "Castle Town Malo Mart Magic Armor",
        "Jovani 20 Poe Soul Reward",
        "Jovani 60 Poe Soul Reward",
    ],
    "Lake Hylia Bridge Bubble Grotto": [
        "Lake Hylia Bridge Bubble Grotto Chest",
    ],
    "Lake Hylia Bridge": [
        "Lake Hylia Bridge Vines Chest",
        "Lake Hylia Bridge Cliff Chest",
        "Lake Hylia Bridge Owl Statue Chest",
        "Lake Hylia Bridge Owl Statue Sky Character",
        "Lake Hylia Bridge Male Mantis",
        "Lake Hylia Bridge Female Mantis",
        "Lake Hylia Bridge Cliff Poe",
    ],
    "Lanayru Field Poe Grotto": [
        "Lanayru Field Poe Grotto Left Poe",
        "Lanayru Field Poe Grotto Right Poe",
    ],
    "Lanayru Field Skulltula Grotto": [
        "Lanayru Field Skulltula Grotto Chest",
    ],
    "Lanayru Field": [
        "Lanayru Field Behind Gate Underwater Chest",
        "Lanayru Field Spinner Track Chest",
        "Lanayru Field Male Stag Beetle",
        "Lanayru Field Female Stag Beetle",
        "Lanayru Field Bridge Poe",
    ],
    "Lanayru Ice Puzzle Cave": [
        "Lanayru Ice Block Puzzle Cave Chest",
    ],
    "Outside Castle Town South": [
        "Outside South Castle Town Tightrope Chest",
        "Outside South Castle Town Fountain Chest",
        "Outside South Castle Town Double Clawshot Chasm Chest",
        "Wooden Statue",
        "Outside South Castle Town Male Ladybug",
        "Outside South Castle Town Female Ladybug",
        "Outside South Castle Town Poe",
        "Outside South Castle Town Golden Wolf",
    ],
    "Outside Castle Town West": [
        "Hyrule Field Amphitheater Owl Statue Chest",
        "Hyrule Field Amphitheater Owl Statue Sky Character",
        "West Hyrule Field Male Butterfly",
        "West Hyrule Field Female Butterfly",
        "Hyrule Field Amphitheater Poe",
        "West Hyrule Field Golden Wolf",
    ],
    "Outside South Castle Town Tektite Grotto": [
        "Outside South Castle Town Tektite Grotto Chest",
    ],
    "West Hyrule Field Helmasaur Grotto": [
        "West Hyrule Field Helmasaur Grotto Chest",
    ],
    "Lake Hylia Long Cave": [
        "Lake Lantern Cave First Chest",
        "Lake Lantern Cave Second Chest",
        "Lake Lantern Cave Third Chest",
        "Lake Lantern Cave Fourth Chest",
        "Lake Lantern Cave Fifth Chest",
        "Lake Lantern Cave Sixth Chest",
        "Lake Lantern Cave Seventh Chest",
        "Lake Lantern Cave Eighth Chest",
        "Lake Lantern Cave Ninth Chest",
        "Lake Lantern Cave Tenth Chest",
        "Lake Lantern Cave Eleventh Chest",
        "Lake Lantern Cave Twelfth Chest",
        "Lake Lantern Cave Thirteenth Chest",
        "Lake Lantern Cave Fourteenth Chest",
        "Lake Lantern Cave End Lantern Chest",
        "Lake Lantern Cave First Poe",
        "Lake Lantern Cave Second Poe",
        "Lake Lantern Cave Final Poe",
    ],
    "Lake Hylia Shell Blade Grotto": ["Lake Hylia Shell Blade Grotto Chest"],
    "Lake Hylia Water Toadpoli Grotto": ["Lake Hylia Water Toadpoli Grotto Chest"],
    "Lake Hylia": [
        "Lake Hylia Underwater Chest",
        "Outside Lanayru Spring Left Statue Chest",
        "Outside Lanayru Spring Right Statue Chest",
        "Lanayru Spring Underwater Left Chest",
        "Lanayru Spring Underwater Right Chest",
        "Lanayru Spring Back Room Left Chest",
        "Lanayru Spring Back Room Right Chest",
        "Lanayru Spring Back Room Lantern Chest",
        "Flight By Fowl Top Platform Reward",
        "Flight By Fowl Second Platform Chest",
        "Flight By Fowl Third Platform Chest",
        "Flight By Fowl Fourth Platform Chest",
        "Flight By Fowl Fifth Platform Chest",
        "Lanayru Spring East Double Clawshot Chest",
        "Lanayru Spring West Double Clawshot Chest",
        "Iza Helping Hand",
        "Iza Raging Rapids Minigame",
        "Auru Gift To Fyer",
        "Flight By Fowl Ledge Poe",
        "Isle of Riches Poe",
        "Lake Hylia Alcove Poe",
        "Lake Hylia Dock Poe",
        "Lake Hylia Tower Poe"
    ],
    "Zoras Domain": [
        "Zoras Domain Chest By Mother and Child Isles",
        "Zoras Domain Chest Behind Waterfall",
        "Zoras Domain Light All Torches Chest",
        "Zoras Domain Extinguish All Torches Chest",
        "Fishing Hole Heart Piece",
        "Fishing Hole Bottle",
        "Zoras Domain Underwater Goron",
        "Plumm Fruit Balloon Minigame",
        "Zoras Domain Male Dragonfly",
        "Upper Zoras River Female Dragonfly",
        "Upper Zoras River Poe",
        "Zoras Domain Mother and Child Isle Poe",
        "Zoras Domain Waterfall Poe",
    ]
};

const zoneNeighborsLanayruGlitchless: Record<LanayruZoneId, ZoneNeighbor[]> = {
    "Castle Town": [
        new ZoneNeighbor("Outside Castle Town West", fns.always),
        new ZoneNeighbor("Eldin Field", fns.always),
        new ZoneNeighbor("Outside Castle Town South", fns.always),
        new ZoneNeighbor("Hyrule Castle Entrance", fns.never),
    ],
    "Lake Hylia Bridge Bubble Grotto": [new ZoneNeighbor("Lake Hylia Bridge", fns.always)],
    "Lake Hylia Bridge": [
        new ZoneNeighbor("Faron Field", (store) => store.items.GateKeys || store.settings.smallKeys === "keysy"),
        new ZoneNeighbor("Lake Hylia", fns.always),
        new ZoneNeighbor("Lanayru Field", fns.canSmash),
        new ZoneNeighbor("Outside Castle Town West", fns.always),
        new ZoneNeighbor("Lake Hylia Bridge Bubble Grotto", (store) => store.items.Crystal && fns.canLaunchBombs(store) && store.items.Clawshot > 0),
    ],
    "Lanayru Field Poe Grotto": [
        new ZoneNeighbor("Lanayru Field", fns.always),
    ],
    "Lanayru Field Skulltula Grotto": [
        new ZoneNeighbor("Lanayru Field", fns.always),
    ],
    "Lanayru Field": [
        new ZoneNeighbor("Eldin Field", fns.canSmash),
        new ZoneNeighbor("Zoras Domain", fns.canSmash),
        new ZoneNeighbor("Outside Castle Town West", fns.always),
        new ZoneNeighbor("Lanayru Ice Puzzle Cave", fns.canSmash),
        new ZoneNeighbor("Lake Hylia Bridge", fns.canSmash),
        new ZoneNeighbor("Hidden Village", (store) => store.items.Wooden_Statue),
        new ZoneNeighbor("Lanayru Field Skulltula Grotto", (store) => store.items.Crystal),
        new ZoneNeighbor("Lanayru Field Poe Grotto", (store) => store.items.Crystal),
    ],
    "Lanayru Ice Puzzle Cave": [
        new ZoneNeighbor("Lanayru Field", fns.always),
    ],
    "Outside Castle Town South": [
        new ZoneNeighbor("Castle Town", fns.always),
        new ZoneNeighbor("Faron Field", fns.always),
        new ZoneNeighbor("Outside South Castle Town Tektite Grotto", (store) => store.items.Crystal),
        new ZoneNeighbor("Lake Hylia", fns.always),
    ],
    "Outside Castle Town West": [
        new ZoneNeighbor("Lake Hylia Bridge", fns.always),
        new ZoneNeighbor("Lanayru Field", fns.always),
        new ZoneNeighbor("Castle Town", fns.always),
        new ZoneNeighbor("West Hyrule Field Helmasaur Grotto", (store) => store.items.Crystal && store.items.Clawshot > 0),
    ],
    "Outside South Castle Town Tektite Grotto": [
        new ZoneNeighbor("Outside Castle Town South", fns.always),
    ],
    "West Hyrule Field Helmasaur Grotto": [
        new ZoneNeighbor("Outside Castle Town West", fns.always)
    ],
    "Lake Hylia Long Cave": [
        new ZoneNeighbor("Lake Hylia", fns.always),
    ],
    "Lake Hylia Shell Blade Grotto": [
        new ZoneNeighbor("Lake Hylia", fns.always),
    ],
    "Lake Hylia Water Toadpoli Grotto": [
        new ZoneNeighbor("Lake Hylia", fns.always),
    ],
    "Lake Hylia": [
        new ZoneNeighbor("Gerudo Desert", fns.never),
        new ZoneNeighbor("Lake Hylia Long Cave", fns.canSmash),
        new ZoneNeighbor("Lake Hylia Water Toadpoli Grotto", (store) => store.items.Crystal),
        new ZoneNeighbor("Lake Hylia Shell Blade Grotto", (store) => store.items.Crystal),
        new ZoneNeighbor("Lakebed Temple Entrance", fns.never),
        new ZoneNeighbor("City in The Sky Entrance", fns.never),
        new ZoneNeighbor("Lake Hylia Bridge", fns.always),
        new ZoneNeighbor("Zoras Domain", (store) => store.items.Crystal),
    ],
    "Zoras Domain": [
        new ZoneNeighbor("Lanayru Field", fns.always),
        new ZoneNeighbor("Snowpeak Climb", fns.never),
    ],
};

const zoneDataForestTemple: Record<ForestTempleZoneId, CheckName[]> = {
    "Forest Temple Entrance": [
        "Forest Temple Entrance Vines Chest",
    ],

    "Forest Temple Lobby": [
        "Forest Temple Central Chest Behind Stairs",
        "Forest Temple Central North Chest",
        "Forest Temple Central Chest Hanging From Web",
    ],
    "Forest Temple East Wing": [
        "Forest Temple Second Monkey Under Bridge Chest",
        "Forest Temple Big Key Chest",
        "Forest Temple East Water Cave Chest"
    ],
    "Forest Temple West Wing": [
        "Forest Temple West Deku Like Chest",
        "Forest Temple Totem Pole Chest",
        "Forest Temple West Tile Worm Room Vines Chest",
        "Forest Temple West Tile Worm Chest Behind Stairs",
        "Forest Temple Big Baba Key"
    ],
    "Ook": ["Forest Temple Gale Boomerang"],
    "Forest Temple North Wing": [
        "Forest Temple Windless Bridge Chest",
        "Forest Temple North Deku Like Chest",
        "Forest Temple East Tile Worm Chest",
    ],
    "Forest Temple Boss Room": [
        "Forest Temple Diababa Heart Container",
        "Forest Temple Dungeon Reward"
    ]
};

const zoneNeighborsForestTempleGlitchless: Record<ForestTempleZoneId, ZoneNeighbor[]> = {
    "Forest Temple Entrance": [
        new ZoneNeighbor("North Faron Woods", fns.always),
        new ZoneNeighbor("Forest Temple Lobby", store => fns.canDefeatWalltula(store) && fns.canDefeatBokoblin(store) && fns.canBreakMonkeyCage(store)),
    ],
    "Forest Temple Lobby": [
        new ZoneNeighbor("Forest Temple Entrance", fns.always),
        new ZoneNeighbor("Forest Temple East Wing", fns.always),
        // todo: key related settings?
        // https://github.com/zsrtp/Randomizer-Web-Generator/blob/b5ad864ba738a7daa3ccfe8f3076d2a906d6474d/Generator/World/Rooms/Dungeons/Forest%20Temple/Forest%20Temple%20Lobby.jsonc#L12C6-L12C17
        new ZoneNeighbor("Forest Temple West Wing", store => fns.canBurnWebs(store) && (fns.canDefeatBokoblin(store) || store.items.Clawshot >= 1)),
        // see above wrt key settings
        new ZoneNeighbor("Ook", store => store.items.Lantern && fns.canDefeatWalltula(store) && fns.canDefeatBokoblin(store) && fns.canBreakMonkeyCage(store)),
    ],
    "Forest Temple East Wing": [
        new ZoneNeighbor("Forest Temple Lobby", fns.always),
        new ZoneNeighbor("Forest Temple North Wing", fns.always),
    ],
    "Forest Temple West Wing": [
        new ZoneNeighbor("Forest Temple Lobby", fns.always),
        new ZoneNeighbor("Ook", store => store.items.Boomerang),
    ],
    "Ook": [
        new ZoneNeighbor("Forest Temple West Wing", store => fns.canDefeatOok(store) && store.items.Boomerang),
    ],
    "Forest Temple North Wing": [
        new ZoneNeighbor("Forest Temple East Wing", fns.always),
        new ZoneNeighbor("Forest Temple Boss Room", store => store.items.Boomerang && (fns.canFreeAllMonkeys(store) || store.items.Clawshot >= 1)),
    ],
    "Forest Temple Boss Room": [
        new ZoneNeighbor("South Faron Woods", store => fns.canDefeatDiababa(store)),
    ],
};

const zoneDataGoronMines: Record<GoronMinesZoneId, CheckName[]> = {
    "Goron Mines Entrance": [
        "Goron Mines Entrance Chest",
    ],
    "Goron Mines Magnet Room": [
        "Goron Mines Main Magnet Room Bottom Chest",
        "Goron Mines Main Magnet Room Top Chest",
    ],
    "Goron Mines Lower West Wing": [
        "Goron Mines Magnet Maze Chest",
        "Goron Mines Gor Amato Chest",
        "Goron Mines Gor Amato Small Chest",
        "Goron Mines Gor Amato Key Shard",
    ],
    "Goron Mines Crystal Switch Room": [
        "Goron Mines Crystal Switch Room Underwater Chest",
        "Goron Mines Crystal Switch Room Small Chest",
        "Goron Mines After Crystal Switch Room Magnet Wall Chest"
    ],
    "Goron Mines North Wing": [
        "Goron Mines Outside Beamos Chest",
        "Goron Mines Outside Underwater Chest",
        "Goron Mines Outside Clawshot Chest",
    ],
    "Goron Mines Upper East Wing": [
        "Goron Mines Gor Ebizo Chest",
        "Goron Mines Chest Before Dangoro",
        "Goron Mines Gor Ebizo Key Shard",
        "Goron Mines Dangoro Chest",
        "Goron Mines Beamos Room Chest",
        "Goron Mines Gor Liggs Chest",
        "Goron Mines Gor Liggs Key Shard"
    ],
    "Goron Mines Boss Room": [
        "Goron Mines Fyrus Heart Container",
        "Goron Mines Dungeon Reward",
    ],
};

const zoneNeighborsGoronMinesGlitchless: Record<GoronMinesZoneId, ZoneNeighbor[]> = {
    "Goron Mines Entrance": [
        new ZoneNeighbor("Death Mountain Interiors", fns.always),
        new ZoneNeighbor("Goron Mines Magnet Room", store => store.items.IronBoots && fns.canBreakWoodenDoor(store)),
    ],
    "Goron Mines Magnet Room": [
        new ZoneNeighbor("Goron Mines Entrance", fns.always),
        // key related setting, we assume we have the key.
        new ZoneNeighbor("Goron Mines Lower West Wing", fns.always),
        // key related setting, we assume we have the key.
        new ZoneNeighbor("Goron Mines Crystal Switch Room", store => store.items.IronBoots),
    ],
    "Goron Mines Lower West Wing": [new ZoneNeighbor("Goron Mines Magnet Room", fns.always)],
    "Goron Mines Crystal Switch Room": [
        new ZoneNeighbor("Goron Mines Magnet Room", fns.always),
        new ZoneNeighbor(
            "Goron Mines North Wing",
            // key related setting, we assume we have the key.
            store => (store.items.IronBoots && store.items.Sword > 0) || store.items.Bow > 0,
        )
    ],
    "Goron Mines North Wing": [
        new ZoneNeighbor("Goron Mines Crystal Switch Room", fns.always),
        // key related setting, we assume we have the key.
        new ZoneNeighbor("Goron Mines Upper East Wing", fns.always),
        // key related setting, we assume we have the key.
        new ZoneNeighbor("Goron Mines Boss Room", store => store.items.Bow > 0 && store.items.IronBoots && fns.canDefeatBulbin(store))
    ],
    "Goron Mines Upper East Wing": [
        new ZoneNeighbor("Goron Mines Upper East Wing", fns.always),
        new ZoneNeighbor("Goron Mines Magnet Room", store => store.items.IronBoots && fns.canDefeatDangoro(store) && store.items.Bow > 0),
    ],
    "Goron Mines Boss Room": [
        new ZoneNeighbor("Kakariko Village", fns.canDefeatFyrus),
    ],
};

export const zoneData: { [Property in ZoneId]: CheckName[] } = {
    // overworld
    ...zoneDataOrdona,
    ...zoneDataFaron,
    ...zoneDataEldin,
    ...zoneDataLanayru,

    // dungeon time
    ...zoneDataForestTemple,
    ...zoneDataGoronMines,
};

export type ZoneNeighbors = Record<ZoneId, ZoneNeighbor[]>;

export const zoneNeighborsGlitchless: Record<ZoneId, ZoneNeighbor[]> = {
    // overworld
    ...zoneNeighborsOrdonaGlitchless,
    ...zoneNeighborsFaronGlitchless,
    ...zoneNeighborsEldinGlitchless,
    ...zoneNeighborsLanayruGlitchless,

    // dungeon time
    ...zoneNeighborsForestTempleGlitchless,
    ...zoneNeighborsGoronMinesGlitchless,
};

export function calculateReachableZones(searchZones: Record<ZoneId, ZoneNeighbor[]>, settings: RandomizerSettings, items: typeof baseItems, start: ZoneId = "Ordon Province") {
    // An implementation of DFS, modified to support interdependencies of zones.
    const stack: ZoneId[] = [];
    stack.push(start);

    if (settings.openMap && items.Crystal) {
        if (settings.skip.faronTwilight) {
            stack.push("South Faron Woods");
            stack.push("North Faron Woods");
        }

        if (settings.skip.eldinTwilight) {
            stack.push("Kakariko Gorge");
            stack.push("Kakariko Village");
            stack.push("Death Mountain Volcano");
        }
    }

    const fakeStore: LogicStore = {
        settings,
        items,
        reachableZones: new Set()
    };

    let retry: Map<ZoneId, ZoneNeighbor[]> = new Map();

    while (true) {
        while (stack.length > 0) {
            const zone = stack.pop();
            // we want to check now instead of when iterating the neighbors because the first item could be the goal,
            // and if so I'd rataher not duplicate the check.

            if (typeof (zone) === 'undefined') {
                break;
            }

            retry.delete(zone);

            if (fakeStore.reachableZones.has(zone)) {
                continue;
            }

            fakeStore.reachableZones.add(zone);

            for (const neighbor of searchZones[zone]) {
                let accessable = neighbor.accessable(fakeStore);
                if (accessable === null) {
                    let entry = retry.get(neighbor.name);
                    if (entry === undefined) {
                        entry = [];
                        retry.set(neighbor.name, entry);
                    }

                    entry.push(neighbor);
                }

                if (accessable) {
                    stack.push(neighbor.name);
                }
            }
        };

        let cont = false;
        for (const [zone, entry] of retry) {
            for (const neighbor of entry) {
                if (neighbor.accessable(fakeStore)) {
                    cont = true;
                    stack.push(zone);
                    // make sure we only do each zone once.
                    break;
                }
            }
        }

        if (!cont) {
            break;
        }
    }

    return fakeStore.reachableZones;
}
