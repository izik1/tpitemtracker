import type { CheckName, EldinCheckName, FaronCheckName, ForestTempleCheckName, GerudoCheckName, GoronMinesCheckName, LakebedTempleCheckName, LanayruCheckName, OrdonaCheckName } from "../check-name";
import { type EldinZoneId, type FaronZoneId, type ForestTempleZoneId, type GerudoZoneId, type GoronMinesZoneId, type LakebedTempleZoneId, type LanayruZoneId, type OrdonaZoneId, type ZoneId } from "./id";

export type ZoneChecks<Z extends ZoneId = ZoneId, C extends CheckName = CheckName> = Record<Z, C[]>;

const zoneDataOrdona: ZoneChecks<OrdonaZoneId, OrdonaCheckName> = {
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

const zoneDataFaron: ZoneChecks<FaronZoneId, FaronCheckName> = {
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

const zoneDataEldin: ZoneChecks<EldinZoneId, EldinCheckName> = {
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

const zoneDataLanayru: ZoneChecks<LanayruZoneId, LanayruCheckName> = {
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

const zoneDataGerudo: ZoneChecks<GerudoZoneId, GerudoCheckName> = {
    "Gerudo Desert": [
        "Gerudo Desert Peahat Ledge Chest",
        "Gerudo Desert East Canyon Chest",
        "Gerudo Desert Lone Small Chest",
        "Gerudo Desert West Canyon Chest",
        "Gerudo Desert Northeast Chest Behind Gates",
        "Gerudo Desert South Chest Behind Wooden Gates",
        "Gerudo Desert Campfire North Chest",
        "Gerudo Desert Campfire East Chest",
        "Gerudo Desert Campfire West Chest",
        "Gerudo Desert Northwest Chest Behind Gates",
        "Gerudo Desert North Small Chest Before Bulblin Camp",
        "Gerudo Desert Owl Statue Chest",
        "Gerudo Desert Owl Statue Sky Character",
        "Gerudo Desert Male Dayfly",
        "Gerudo Desert Female Dayfly",
        "Gerudo Desert East Poe",
        "Gerudo Desert North Peahat Poe",
        "Gerudo Desert Poe Above Cave of Ordeals",
        "Outside Bulblin Camp Poe",
        "Gerudo Desert Golden Wolf",
    ],
    "Gerudo Desert Rock Grotto": [
        "Gerudo Desert Rock Grotto Lantern Chest",
        "Gerudo Desert Rock Grotto First Poe",
        "Gerudo Desert Rock Grotto Second Poe"
    ],
    "Gerudo Desert Skulltula Grotto": [
        "Gerudo Desert Skulltula Grotto Chest",
    ],
    "Bulblin Camp": [
        "Bulblin Camp First Chest Under Tower At Entrance",
        "Bulblin Camp Small Chest in Back of Camp",
        "Bulblin Camp Roasted Boar",
        "Bulblin Camp Poe",
        "Bulblin Guard Key",
    ],
    "Outside Arbiters Grounds": [
        "Outside Arbiters Grounds Lantern Chest",
        "Outside Arbiters Grounds Poe",
    ],
    "Mirror Chamber": [],
    "Cave of Ordeals Floors 01-11": ["Cave of Ordeals Floor 17 Poe"],
    "Cave of Ordeals Floors 12-21": [],
    "Cave of Ordeals Floors 22-31": [],
    "Cave of Ordeals Floors 32-41": ["Cave of Ordeals Floor 33 Poe"],
    "Cave of Ordeals Floors 42-50": [
        "Cave of Ordeals Floor 44 Poe",
        "Cave of Ordeals Great Fairy Reward",
    ],
};

const zoneDataForestTemple: ZoneChecks<ForestTempleZoneId, ForestTempleCheckName> = {
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

const zoneDataGoronMines: ZoneChecks<GoronMinesZoneId, GoronMinesCheckName> = {
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

const zoneDataLakebedTemple: ZoneChecks<LakebedTempleZoneId, LakebedTempleCheckName> = {
    "Lakebed Temple Entrance": [
        "Lakebed Temple Lobby Left Chest",
        "Lakebed Temple Lobby Rear Chest",
        "Lakebed Temple Stalactite Room Chest"
    ],
    "Lakebed Temple Central Room": [
        "Lakebed Temple Central Room Small Chest",
        "Lakebed Temple Central Room Chest",
        "Lakebed Temple Chandelier Chest",
        "Lakebed Temple Central Room Spire Chest"
    ],
    "Lakebed Temple East Wing First Floor": [
        "Lakebed Temple East Lower Waterwheel Stalactite Chest",
        "Lakebed Temple East Lower Waterwheel Bridge Chest",
        "Lakebed Temple Before Deku Toad Alcove Chest",
        "Lakebed Temple Before Deku Toad Underwater Left Chest",
        "Lakebed Temple Before Deku Toad Underwater Right Chest",
        "Lakebed Temple Deku Toad Chest"
    ],
    "Lakebed Temple East Wing Second Floor": [
        "Lakebed Temple East Second Floor Southwest Chest",
        "Lakebed Temple East Second Floor Southeast Chest",
        "Lakebed Temple East Water Supply Small Chest",
        "Lakebed Temple East Water Supply Clawshot Chest"
    ],
    "Lakebed Temple West Wing": [
        "Lakebed Temple West Lower Small Chest",
        "Lakebed Temple West Second Floor Central Small Chest",
        "Lakebed Temple Underwater Maze Small Chest",
        "Lakebed Temple Big Key Chest",
        "Lakebed Temple West Second Floor Southwest Underwater Chest",
        "Lakebed Temple West Second Floor Northeast Chest",
        "Lakebed Temple West Second Floor Southeast Chest",
        "Lakebed Temple West Water Supply Small Chest",
        "Lakebed Temple West Water Supply Chest",
    ],
    "Lakebed Temple Boss Room": [
        "Lakebed Temple Morpheel Heart Container",
        "Lakebed Temple Dungeon Reward"
    ]
};

export const zoneData: ZoneChecks = {
    // overworld
    ...zoneDataOrdona,
    ...zoneDataFaron,
    ...zoneDataEldin,
    ...zoneDataLanayru,
    ...zoneDataGerudo,

    // dungeon time
    ...zoneDataForestTemple,
    ...zoneDataGoronMines,
    ...zoneDataLakebedTemple,
};
