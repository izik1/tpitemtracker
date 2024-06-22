import { type CheckName } from "./logic/check-name";
import { zoneData } from "./logic/zone/checks";

export type CheckStatus = "opened" | "available" | "unavailable" | "possible";


export function checkStatus(completableChecks: Readonly<Set<CheckName>>, openedChecks: Set<CheckName>, check: CheckName): CheckStatus {
    if (openedChecks.has(check)) {
        return "opened";
    }

    if (completableChecks.has(check)) {
        return "available";
    }

    return "unavailable";
}


export function groupStatus(completableChecks: Readonly<Set<CheckName>>, openedChecks: Set<CheckName>, group: Group): CheckStatus | "possible" {
    let unopened = 0;
    let completable = 0;
    for (const check of group.checks) {
        if (!openedChecks.has(check)) {
            unopened += 1;

            if (completableChecks.has(check)) {
                completable += 1;
            }
        }

    }

    if (unopened === 0) {
        return "opened";
    }

    if (unopened === completable) {
        return "available";
    }

    if (completable === 0) {
        return "unavailable";
    }

    // partially completable.
    return "possible";
}

export interface Group {
    readonly name: string;
    readonly x: string;
    readonly y: string,
    readonly checks: CheckName[];
}

// note: for some reason I cannot fathom, *all* `x`,`y`s are offset by an amount from the percentage.
// this is caused by there (formerly) being a negative margin.
// until I get around re-calculating all the percentages, this is what we're living with.
export const groups: Group[] = [
    {
        name: "Ordon Village",
        x: "calc(55.5% - 12px)",
        y: "calc(85.84% - 12px)",
        checks: [
            "Ordon Cat Rescue",
            "Links Basement Chest",
            "Sera Shop Slingshot",
            "Ordon Shield",
            "Ordon Sword",
            "Uli Cradle Delivery",
            "Wooden Sword Chest",
            "Wrestling With Bo",
        ],
    },
    {
        name: "Forest Temple",
        x: "calc(47.58% - 12px)",
        y: "calc(66.2% - 12px)",
        checks: [
            ...zoneData["Forest Temple Entrance"],
            ...zoneData["Forest Temple Lobby"],
            ...zoneData["Forest Temple East Wing"],
            ...zoneData["Forest Temple West Wing"],
            ...zoneData["Ook"],
            ...zoneData["Forest Temple North Wing"],
            ...zoneData["Forest Temple Boss Room"],
        ]
    },
    {
        name: "Eldin Long Cave",
        x: "calc(65.91% - 12px)",
        y: "calc(57.31% - 12px)",
        checks: [
            ...zoneData["Eldin Long Cave"],
        ]
    },
    {
        name: "Kakariko Village",
        x: "calc(80.41% - 12px)",
        y: "calc(53.36% - 12px)",
        checks: [
            ...zoneData["Kakariko Village"],
        ]
    },
    {
        name: "Goron Mines",
        x: "calc(85.91% - 12px)",
        y: "calc(38.16% - 12px)",
        checks: [
            ...zoneData["Goron Mines Entrance"],
            ...zoneData["Goron Mines Magnet Room"],
            ...zoneData["Goron Mines Lower West Wing"],
            ...zoneData["Goron Mines Crystal Switch Room"],
            ...zoneData["Goron Mines North Wing"],
            ...zoneData["Goron Mines Upper East Wing"],
            ...zoneData["Goron Mines Boss Room"],
        ]
    },
    // this one is positioned correctly without the `calc`
    {
        name: "Goron Stockcave",
        x: "79.7%",
        y: "26.8%",
        checks: [
            ...zoneData["Goron Stockcave"],
        ]
    },
    {
        name: "Hidden Village",
        x: "calc(72% - 12px)",
        y: "calc(23.8% - 12px)",
        checks: [
            ...zoneData["Hidden Village"],
        ]
    },
    {
        name: "Castle Town",
        x: "calc(53.75% - 12px)",
        y: "calc(41.2% - 12px)",
        checks: zoneData["Castle Town"],
    },
    {
        name: "Lanayru Spring",
        x: "calc(42.5% - 12px)",
        y: "calc(52.08% - 12px)",
        checks: [
            "Lanayru Spring Underwater Left Chest",
            "Lanayru Spring Underwater Right Chest",
            "Lanayru Spring Back Room Left Chest",
            "Lanayru Spring Back Room Right Chest",
            "Lanayru Spring Back Room Lantern Chest",
            "Lanayru Spring East Double Clawshot Chest",
            "Lanayru Spring West Double Clawshot Chest",
        ]
    },
    {
        name: "Flight By Fowl",
        x: "calc(43.5% - 12px)",
        y: "calc(48.0% - 12px)",
        checks: [
            "Flight By Fowl Top Platform Reward",
            "Flight By Fowl Second Platform Chest",
            "Flight By Fowl Third Platform Chest",
            "Flight By Fowl Fourth Platform Chest",
            "Flight By Fowl Fifth Platform Chest",
        ]
    },
    {
        name: "Lake Hylia Long Cave",
        x: "calc(40.75% - 12px)",
        y: "calc(55.68% - 12px)",
        checks: zoneData["Lake Hylia Long Cave"]
    },
    {
        name: "Lakebed Temple",
        x: "calc(40.33% - 12px)",
        y: "calc(47.76% - 12px)",
        checks: [
            ...zoneData["Lakebed Temple Entrance"],
            ...zoneData["Lakebed Temple Central Room"],
            ...zoneData["Lakebed Temple East Wing First Floor"],
            ...zoneData["Lakebed Temple East Wing Second Floor"],
            ...zoneData["Lakebed Temple West Wing"],
            ...zoneData["Lakebed Temple Boss Room"],
        ]
    },
    {
        name: "Bublin Camp",
        x: "calc(14.98% - 12px)",
        y: "calc(44.96% - 12px)",
        checks: zoneData["Bulblin Camp"],
    },
    {
        name: "Arbiter's Grounds",
        x: "calc(15.2% - 12px)",
        y: "calc(41.44% - 12px)",
        checks: [
            ...zoneData["Arbiters Grounds Entrance"],
            ...zoneData["Arbiters Grounds Lobby"],
            ...zoneData["Arbiters Grounds East Wing"],
            ...zoneData["Arbiters Grounds West Wing"],
            ...zoneData["Arbiters Grounds After Poe Gate"],
            ...zoneData["Arbiters Grounds Boss Room"],
        ]
    },
];

export interface OverworldCheck {
    readonly name: CheckName,
    readonly x: string,
    readonly y: string,
}

// important note: These are tabbed *in order*.
export const overworld: OverworldCheck[] = [
    {
        name: "Herding Goats Reward",
        x: "calc(56.33% - 8px)",
        y: "calc(90.16% - 8px)",
    },
    {
        name: "Ordon Spring Golden Wolf",
        x: "calc(54.5% - 8px)",
        y: "calc(81.24% - 8px)",
    },
    {
        name: "Ordon Ranch Grotto Lantern Chest",
        x: "calc(54.33% - 8px)",
        y: "calc(90.16% - 8px)",
    },
    {
        name: "Coro Bottle",
        x: "calc(55.7% - 8px)",
        y: "calc(71.8% - 8px)",
    },
    {
        name: "Faron Woods Owl Statue Sky Character",
        x: "calc(55.01% - 8px)",
        y: "calc(69.6% - 8px)",
    },
    {
        name: "South Faron Cave Chest",
        x: "calc(53.7% - 8px)",
        y: "calc(71.8% - 8px)",
    },
    {
        name: "Faron Mist Cave Open Chest",
        x: "calc(54.33% - 8px)",
        y: "calc(68.08% - 8px)",
    },
    {
        name: "Faron Mist Cave Lantern Chest",
        x: "calc(53.33% - 8px)",
        y: "calc(68.08% - 8px)",
    },
    {
        name: "Faron Mist Poe",
        x: "calc(51.41% - 8px)",
        y: "calc(69.76% - 8px)",
    },
    {
        name: "Faron Mist Stump Chest",
        x: "calc(51.01% - 8px)",
        y: "calc(70.2% - 8px)",
    },
    {
        name: "Faron Mist North Chest",
        x: "calc(52.10% - 8px)",
        y: "calc(70.2% - 8px)",

    },
    {
        name: "Faron Mist South Chest",
        x: "calc(51.91% - 8px)",
        y: "calc(69.2% - 8px)",
    },
    {
        name: "Faron Woods Owl Statue Chest",
        x: "calc(54.01% - 8px)",
        y: "calc(69.6% - 8px)",
    },
    {
        name: "North Faron Woods Deku Baba Chest",
        x: "calc(48.66% - 8px)",
        y: "calc(69.6% - 8px)",
    },
    {
        name: "Faron Woods Golden Wolf",
        x: "calc(48.16% - 8px)",
        y: "calc(68.6% - 8px)",
    },
    {
        name: "Faron Field Corner Grotto Right Chest",
        x: "calc(58.11% - 8px)",
        y: "calc(64.16% - 8px)",
    },
    {
        name: "Faron Field Corner Grotto Left Chest",
        x: "calc(57.01% - 8px)",
        y: "calc(64.16% - 8px)",
    },
    {
        name: "Faron Field Corner Grotto Rear Chest",
        x: "calc(57.01% - 8px)",
        y: "calc(65.16% - 8px)",
    },
    {
        name: "Faron Field Bridge Chest",
        x: "calc(54.91% - 8px)",
        y: "calc(58.8% - 8px)",
    },
    {
        name: "Faron Field Tree Heart Piece",
        x: "calc(56% - 8px)",
        y: "calc(60.88% - 8px)",
    },
    {
        name: "Faron Field Poe",
        x: "calc(54.58% - 8px)",
        y: "calc(59.04% - 8px)",
    },
    {
        name: "Faron Field Male Beetle",
        x: "calc(53.58% - 8px)",
        y: "calc(62.16% - 8px)",
    },
    {
        name: "Faron Field Female Beetle",
        x: "calc(57.33% - 8px)",
        y: "calc(58.72% - 8px)",
    },
    {
        name: "Kakariko Gorge Double Clawshot Chest",
        x: "calc(61.75% - 8px)",
        y: "calc(52.16% - 8px)",
    },
    {
        name: "Kakariko Gorge Female Pill Bug",
        x: "calc(65% - 8px)",
        y: "calc(53.60% - 8px)",
    },
    {
        name: "Kakariko Gorge Male Pill Bug",
        x: "calc(68.16% - 8px)",
        y: "calc(54.56% - 8px)",
    },
    {
        name: "Kakariko Gorge Owl Statue Chest",
        x: "calc(66% - 8px)",
        y: "calc(48.8% - 8px)",
    },
    {
        name: "Kakariko Gorge Owl Statue Sky Character",
        x: "calc(67% - 8px)",
        y: "calc(48.8% - 8px)",
    },
    {
        name: "Kakariko Gorge Poe",
        x: "calc(65.25% - 8px)",
        y: "calc(53.52% - 8px)",
    },
    {
        name: "Kakariko Gorge Spire Heart Piece",
        x: "calc(62.85% - 8px)",
        y: "calc(52.40% - 8px)",
    },
    {
        name: "Death Mountain Alcove Chest",
        x: "calc(85.83% - 8px)",
        y: "calc(41.28% - 8px)",
    },
    {
        name: "Death Mountain Trail Poe",
        x: "calc(85.91% - 8px)",
        y: "calc(44% - 8px)",
    },
    {
        name: "Eldin Field Bomb Rock Chest",
        x: "calc(71.91% - 8px)",
        y: "calc(43.52% - 8px)",
    },
    {
        name: "Eldin Field Bomskit Grotto Left Chest",
        x: "calc(69.66% - 8px)",
        y: "calc(39.36% - 8px)",
    },
    {
        name: "Eldin Field Bomskit Grotto Lantern Chest",
        x: "calc(70.86% - 8px)",
        y: "calc(39.36% - 8px)",
    },
    {
        name: "Eldin Field Water Bomb Fish Grotto Chest",
        x: "calc(77.41% - 8px)",
        y: "calc(34.88% - 8px)",
    },
    {
        name: "Bridge of Eldin Owl Statue Chest",
        x: "calc(77.75% - 8px)",
        y: "calc(32.64% - 8px)",
    },
    {
        name: "Goron Springwater Rush",
        x: "calc(60.25% - 8px)",
        y: "calc(40.4% - 8px)",
    },
    {
        name: "Bridge of Eldin Owl Statue Sky Character",
        x: "calc(77.75% - 8px)",
        y: "calc(28.64% - 8px)",
    },
    {
        name: "Eldin Field Male Grasshopper",
        x: "calc(74.58% - 8px)",
        y: "calc(40.80% - 8px)",
    },
    {
        name: "Eldin Field Female Grasshopper",
        x: "calc(66.67% - 8px)",
        y: "calc(34.56% - 8px)",
    },
    {
        name: "Bridge of Eldin Male Phasmid",
        x: "calc(78.58% - 8px)",
        y: "calc(33.12% - 8px)",
    },
    {
        name: "Bridge of Eldin Female Phasmid",
        x: "calc(80.00% - 8px)",
        y: "calc(26.64% - 8px)",
    },
    {
        name: "Eldin Field Stalfos Grotto Left Small Chest",
        x: "calc(74.16% - 8px)",
        y: "calc(19.6% - 8px)",
    },
    {
        name: "Eldin Field Stalfos Grotto Right Small Chest",
        x: "calc(75.16% - 8px)",
        y: "calc(19.6% - 8px)",
    },
    {
        name: "Eldin Field Stalfos Grotto Stalfos Chest",
        x: "calc(74.66% - 8px)",
        y: "calc(18.6% - 8px)",
    },
    {
        name: "Lost Woods Lantern Chest",
        x: "calc(45.41% - 8px)",
        y: "calc(70.8% - 8px)",
    },
    {
        name: "Lost Woods Boulder Poe",
        x: "calc(43.78% - 8px)",
        y: "calc(68.88% - 8px)",
    },
    {
        name: "Lost Woods Waterfall Poe",
        x: "calc(47% - 8px)",
        y: "calc(71.4% - 8px)",
    },
    {
        name: "Sacred Grove Spinner Chest",
        x: "calc(42.91% - 8px)",
        y: "calc(70.8% - 8px)",
    },
    {
        name: "Sacred Grove Baba Serpent Grotto Chest",
        x: "calc(42.16% - 8px)",
        y: "calc(68.88% - 8px)",
    },
    {
        name: "Sacred Grove Male Snail",
        x: "calc(44.08% - 8px)",
        y: "calc(69.6% - 8px)",
    },
    {
        name: "Sacred Grove Master Sword Poe",
        x: "calc(44.20% - 8px)",
        y: "calc(65.68% - 8px)",
    },
    {
        name: "Sacred Grove Past Owl Statue Chest",
        x: "calc(45.08% - 8px)",
        y: "calc(68.88% - 8px)",
    },
    {
        name: "Sacred Grove Female Snail",
        x: "calc(42.41% - 8px)",
        y: "calc(69.9% - 8px)",
    },
    {
        name: "Sacred Grove Temple of Time Owl Statue Poe",
        x: "calc(43.78% - 8px)",
        y: "calc(68.88% - 8px)",
    },
    {
        name: "Lanayru Field Poe Grotto Left Poe",
        x: "calc(49.66% - 8px)",
        y: "calc(26.8% - 8px)",
    },
    {
        name: "Lanayru Field Poe Grotto Right Poe",
        x: "calc(50.66% - 8px)",
        y: "calc(26.8% - 8px)",
    },
    {
        name: "Lanayru Field Skulltula Grotto Chest",
        x: "calc(54.0% - 8px)",
        y: "calc(22.8% - 8px)",
    },
    {
        name: "Lanayru Field Behind Gate Underwater Chest",
        x: "calc(53.83% - 8px)",
        y: "calc(29.84% - 8px)",
    },
    {
        name: "Lanayru Field Spinner Track Chest",
        x: "calc(41.41% - 8px)",
        y: "calc(38.08% - 8px)",
    },
    {
        name: "Lanayru Field Male Stag Beetle",
        x: "calc(50.58% - 8px)",
        y: "calc(28.00% - 8px)",
    },
    {
        name: "Lanayru Field Female Stag Beetle",
        x: "calc(53.25% - 8px)",
        y: "calc(24.48% - 8px)",
    },
    {
        name: "Lanayru Field Bridge Poe",
        x: "calc(54.25% - 8px)",
        y: "calc(26.88% - 8px)",
    },
    {
        name: "Lanayru Ice Block Puzzle Cave Chest",
        x: "calc(52.85% - 8px)",
        y: "calc(26.04% - 8px)",
    },
    {
        name: "Hyrule Field Amphitheater Owl Statue Chest",
        x: "calc(45.38% - 8px)",
        y: "calc(43.84% - 8px)",
    },
    {
        name: "Hyrule Field Amphitheater Owl Statue Sky Character",
        x: "calc(46.38% - 8px)",
        y: "calc(43.84% - 8px)",
    },
    {
        name: "West Hyrule Field Male Butterfly",
        x: "calc(46.58% - 8px)",
        y: "calc(42.24% - 8px)",
    },
    {
        name: "West Hyrule Field Female Butterfly",
        x: "calc(45.5% - 8px)",
        y: "calc(38.48% - 8px)",
    },
    {
        name: "Hyrule Field Amphitheater Poe",
        x: "calc(45.16% - 8px)",
        y: "calc(43.36% - 8px)",
    },
    {
        name: "West Hyrule Field Helmasaur Grotto Chest",
        x: "calc(45.25% - 8px)",
        y: "calc(38.48% - 8px)",
    },
    {
        name: "West Hyrule Field Golden Wolf",
        x: "calc(48.38% - 8px)",
        y: "calc(40.84% - 8px)",
    },
    {
        name: "Outside South Castle Town Tightrope Chest",
        x: "calc(52.83% - 8px)",
        y: "calc(44.16% - 8px)",
    },
    {
        name: "Outside South Castle Town Fountain Chest",
        x: "calc(54.01% - 8px)",
        y: "calc(45.68% - 8px)",
    },
    {
        name: "Outside South Castle Town Double Clawshot Chasm Chest",
        x: "calc(51.50% - 8px)",
        y: "calc(46.88% - 8px)",
    },
    {
        name: "Wooden Statue",
        x: "calc(54.01% - 8px)",
        y: "calc(47.68% - 8px)",
    },
    {
        name: "Outside South Castle Town Male Ladybug",
        x: "calc(55.08% - 8px)",
        y: "calc(46.16% - 8px)",
    },
    {
        name: "Outside South Castle Town Female Ladybug",
        x: "calc(52.5% - 8px)",
        y: "calc(45.2% - 8px)",
    },
    {
        name: "Outside South Castle Town Poe",
        x: "calc(53.66% - 8px)",
        y: "calc(45.84% - 8px)",
    },
    {
        name: "Outside South Castle Town Golden Wolf",
        x: "calc(52.83% - 8px)",
        y: "calc(46.16% - 8px)",
    },
    {
        name: "Outside South Castle Town Tektite Grotto Chest",
        x: "calc(55.8% - 8px)",
        y: "calc(46.12% - 8px)",
    },
    {
        name: "Lake Hylia Bridge Vines Chest",
        x: "calc(41.58% - 8px)",
        y: "calc(45.84% - 8px)",
    },
    {
        name: "Lake Hylia Bridge Owl Statue Chest",
        x: "calc(41.45% - 8px)",
        y: "calc(43.44% - 8px)",
    },
    {
        name: "Lake Hylia Bridge Owl Statue Sky Character",
        x: "calc(42.45% - 8px)",
        y: "calc(43.44% - 8px)",
    },
    {
        name: "Lake Hylia Bridge Male Mantis",
        x: "calc(41.17% - 8px)",
        y: "calc(46.24% - 8px)",
    },
    {
        name: "Lake Hylia Bridge Female Mantis",
        x: "calc(42.75% - 8px)",
        y: "calc(54.16% - 8px)",
    },
    {
        name: "Lake Hylia Bridge Cliff Poe",
        x: "calc(44.42% - 8px)",
        y: "calc(56% - 8px)",
    },
    {
        name: "Lake Hylia Bridge Bubble Grotto Chest",
        x: "calc(46.33% - 8px)",
        y: "calc(56.24% - 8px)",
    },
    {
        name: "Lake Hylia Bridge Cliff Chest",
        x: "calc(44.83% - 8px)",
        y: "calc(56.24% - 8px)",
    },
    {
        name: "Lake Hylia Underwater Chest",
        x: "calc(39.85% - 8px)",
        y: "calc(54.06% - 8px)",
    },
    {
        name: "Outside Lanayru Spring Left Statue Chest",
        x: "calc(42.05% - 8px)",
        y: "calc(50.76% - 8px)",
    },
    {
        name: "Outside Lanayru Spring Right Statue Chest",
        x: "calc(43.15% - 8px)",
        y: "calc(50.76% - 8px)",
    },
    {
        name: "Iza Helping Hand",
        x: "calc(65.8% - 8px)",
        y: "calc(12% - 8px)",
    },
    {
        name: "Iza Raging Rapids Minigame",
        x: "calc(66.8% - 8px)",
        y: "calc(12% - 8px)",
    },
    {
        name: "Auru Gift To Fyer",
        x: "calc(35.95% - 8px)",
        y: "calc(55.26% - 8px)",
    },
    {
        name: "Flight By Fowl Ledge Poe",
        x: "calc(36.42% - 8px)",
        y: "calc(46.72% - 8px)",
    },
    {
        name: "Isle of Riches Poe",
        x: "calc(39.08% - 8px)",
        y: "calc(49.12% - 8px)",
    },
    {
        name: "Lake Hylia Alcove Poe",
        x: "calc(40.08% - 8px)",
        y: "calc(54.72% - 8px)",
    },
    {
        name: "Lake Hylia Dock Poe",
        x: "calc(46.58% - 8px)",
        y: "calc(50.64% - 8px)",
    },
    {
        name: "Lake Hylia Tower Poe",
        x: "calc(34.08% - 8px)",
        y: "calc(53.12% - 8px)",
    },
    {
        name: "Lake Hylia Shell Blade Grotto Chest",
        x: "calc(38.41% - 8px)",
        y: "calc(45.92% - 8px)",
    },
    {
        name: "Lake Hylia Water Toadpoli Grotto Chest",
        x: "calc(38.95% - 8px)",
        y: "calc(55.26% - 8px)",
    },
    {
        name: "Zoras Domain Chest By Mother and Child Isles",
        x: "calc(56.73% - 8px)",
        y: "calc(11.44% - 8px)",
    },
    {
        name: "Zoras Domain Chest Behind Waterfall",
        x: "calc(55.93% - 8px)",
        y: "calc(10.56% - 8px)",
    },
    {
        name: "Zoras Domain Light All Torches Chest",
        x: "calc(55.5% - 8px)",
        y: "calc(08.48% - 8px)",
    },
    {
        name: "Zoras Domain Extinguish All Torches Chest",
        x: "calc(54.5% - 8px)",
        y: "calc(08.48% - 8px)",
    },
    {
        name: "Fishing Hole Heart Piece",
        x: "calc(64.5% - 8px)",
        y: "calc(9% - 8px)",
    },
    {
        name: "Fishing Hole Bottle",
        x: "calc(65.8% - 8px)",
        y: "calc(9.5% - 8px)",
    },
    // missing from old tracker, have to position.
    // {
    //     name: "Zoras Domain Underwater Goron",
    // },
    {
        name: "Plumm Fruit Balloon Minigame",
        x: "calc(65.8% - 8px)",
        y: "calc(14.5% - 8px)",
    },
    {
        name: "Zoras Domain Male Dragonfly",
        x: "calc(55.5% - 8px)",
        y: "calc(11.44% - 8px)",
    },
    {
        name: "Upper Zoras River Female Dragonfly",
        x: "calc(65.58% - 8px)",
        y: "calc(13.20% - 8px)",
    },
    {
        name: "Upper Zoras River Poe",
        x: "calc(64% - 8px)",
        y: "calc(14.16% - 8px)",
    },
    {
        name: "Zoras Domain Mother and Child Isle Poe",
        x: "calc(55.25% - 8px)",
        y: "calc(11.36% - 8px)",
    },
    {
        name: "Zoras Domain Waterfall Poe",
        x: "calc(54.5% - 8px)",
        y: "calc(9.52% - 8px)",
    },
    {
        name: "Gerudo Desert Skulltula Grotto Chest",
        x: "calc(33.58% - 8px)",
        y: "calc(60.32% - 8px)",
    },
    {
        name: "Cave of Ordeals Floor 17 Poe",
        x: "calc(14.25% - 8px)",
        y: "calc(60.4% - 8px)",
    },
    {
        name: "Cave of Ordeals Floor 33 Poe",
        x: "calc(15.25% - 8px)",
        y: "calc(60.4% - 8px)",
    },
    {
        name: "Cave of Ordeals Floor 44 Poe",
        x: "calc(14.25% - 8px)",
        y: "calc(61.4% - 8px)",
    },
    {
        name: "Cave of Ordeals Great Fairy Reward",
        x: "calc(14.25% - 8px)",
        y: "calc(60.4% - 8px)",
    },
    {
        name: "Gerudo Desert Campfire East Chest",
        x: "calc(16% - 8px)",
        y: "calc(51.36% - 8px)",
    },
    {
        name: "Gerudo Desert Campfire North Chest",
        x: "calc(15% - 8px)",
        y: "calc(51.36% - 8px)",
    },
    {
        name: "Gerudo Desert Campfire West Chest",
        x: "calc(15% - 8px)",
        y: "calc(52.36% - 8px)",
    },
    {
        name: "Gerudo Desert East Canyon Chest",
        x: "calc(29.33% - 8px)",
        y: "calc(56.88% - 8px)",
    },
    {
        name: "Gerudo Desert East Poe",
        x: "calc(33.75% - 8px)",
        y: "calc(60.40% - 8px)",
    },
    {
        name: "Gerudo Desert Female Dayfly",
        x: "calc(18.16% - 8px)",
        y: "calc(59.2% - 8px)",
    },
    {
        name: "Gerudo Desert Golden Wolf",
        x: "calc(14.13% - 8px)",
        y: "calc(47.36% - 8px)",
    },
    {
        name: "Gerudo Desert Lone Small Chest",
        x: "calc(22.50% - 8px)",
        y: "calc(57.68% - 8px)",
    },
    {
        name: "Gerudo Desert Male Dayfly",
        x: "calc(22.75% - 8px)",
        y: "calc(60.16% - 8px)",
    },
    {
        name: "Gerudo Desert North Peahat Poe",
        x: "calc(20.83% - 8px)",
        y: "calc(50.88% - 8px)",
    },
    {
        name: "Gerudo Desert North Small Chest Before Bulblin Camp",
        x: "calc(16.33% - 8px)",
        y: "calc(47.76% - 8px)",
    },
    {
        name: "Gerudo Desert Northeast Chest Behind Gates",
        x: "calc(17% - 8px)",
        y: "calc(49.28% - 8px)",
    },
    {
        name: "Gerudo Desert Northwest Chest Behind Gates",
        x: "calc(12.8% - 8px)",
        y: "calc(50.0% - 8px)",

    },
    {
        name: "Gerudo Desert Owl Statue Chest",
        x: "calc(20.58% - 8px)",
        y: "calc(59.6% - 8px)",
    },
    {
        name: "Gerudo Desert Owl Statue Sky Character",
        x: "calc(20.58% - 8px)",
        y: "calc(61.1% - 8px)",
    },
    {
        name: "Gerudo Desert Peahat Ledge Chest",
        x: "calc(29.08% - 8px)",
        y: "calc(60.24% - 8px)",
    },
    {
        name: "Gerudo Desert Poe Above Cave of Ordeals",
        x: "calc(14.17% - 8px)",
        y: "calc(59.4% - 8px)",
    },
    {
        name: "Gerudo Desert Rock Grotto First Poe",
        x: "calc(21.83% - 8px)",
        y: "calc(50.88% - 8px)",
    },
    {
        name: "Gerudo Desert Rock Grotto Lantern Chest",
        x: "calc(21.66% - 8px)",
        y: "calc(50.64% - 8px)",
    },
    {
        name: "Gerudo Desert Rock Grotto Second Poe",
        x: "calc(20.83% - 8px)",
        y: "calc(51.88% - 8px)",
    },
    {
        name: "Gerudo Desert South Chest Behind Wooden Gates",
        x: "calc(26.5% - 8px)",
        y: "calc(61.28% - 8px)",
    },
    {
        name: "Gerudo Desert West Canyon Chest",
        x: "calc(14.08% - 8px)",
        y: "calc(57.64% - 8px)",
    },
    {
        name: "Outside Arbiters Grounds Lantern Chest",
        x: "calc(15% - 8px)",
        y: "calc(43.6% - 8px)",
    },
    {
        name: "Outside Arbiters Grounds Poe",
        x: "calc(15% - 8px)",
        y: "calc(43.6% - 8px)",
    },
    {
        name: "Outside Bulblin Camp Poe",
        x: "calc(13.33% - 8px)",
        y: "calc(47.2% - 8px)",
    },
    {
        name: "Ashei Sketch",
        x: "calc(51.00% - 8px)",
        y: "calc(11.06% - 8px)",
    },
    {
        name: "Snowpeak Blizzard Poe",
        x: "calc(44.67% - 8px)",
        y: "calc(9.36% - 8px)",
    },
    {
        name: "Snowpeak Above Freezard Grotto Poe",
        x: "calc(41.75% - 8px)",
        y: "calc(9.46% - 8px)",
    },
    {
        name: "Snowpeak Poe Among Trees",
        x: "calc(41.5% - 8px)",
        y: "calc(8.08% - 8px)",
    },
    {
        name: "Snowpeak Cave Ice Lantern Chest",
        x: "calc(38.26% - 8px)",
        y: "calc(11.48% - 8px)",
    },
    {
        name: "Snowpeak Freezard Grotto Chest",
        x: "calc(42.5% - 8px)",
        y: "calc(9.12% - 8px)",
    },
    {
        name: "Snowpeak Cave Ice Poe",
        x: "calc(38.08% - 8px)",
        y: "calc(11.44% - 8px)",
    },
    {
        name: "Snowboard Racing Prize",
        x: "calc(36.25% - 8px)",
        y: "calc(11.68% - 8px)",
    },
    {
        name: "Snowpeak Icy Summit Poe",
        x: "calc(21.75% - 8px)",
        y: "calc(31.52% - 8px)",
    },
];

// define grouped chests
//     {
//         name: "Snowpeak Ruins",
//         x: "21.31%",
//         y: "28.64%",
//     },
//     {
//         name: "Temple of Time",
//         x: "43.83%",
//         y: "63.36%",
//     },
//     {
//         name: "City In The Sky",
//         x: "38.0%",
//         y: "50.56%",
//     },
//     {
//         name: "Palace of Twilight",
//         x: "15.0%",
//         y: "37.44%",
//     },
//     {
//         name: "Hyrule Castle",
//         x: "53.78%",
//         y: "36.56%",
//     },
// ];

/* overworld */

// //Overworld Chests
//     {
//         name: "Shield Attack",
//         x: "54.5%",
//         y: "81.24%",
//         isAvailable: function () {
//             if (canAccessDeathMountain() && items.Crystal) {
//                 return "available";
//             }
//             return "unavailable"
//         },
//     },
//     {
//         name: "Great Spin",
//         x: "53.85%",
//         y: "38.8%",
//         isAvailable: function () {
//             if (items.Crystal && canAccessHiddenVillage()) {
//                 return "available";
//             }
//             return "unavailable";
//         },
//     },
//     //poes
//     {
//         //12
//         name: "Jovani Poe",
//         x: "54.75%",
//         y: "42.2%",
//         isAvailable: function () {
//             if (canAccessCastleTown() && setMDHFlag() || items.Crystal) {
//                 return "available";
//             }
//             return "poeunavailable";
//         },
//     },
//     {
//         //13
//         name: "East Castle Town Bridge Poe",
//         x: "58.25%",
//         y: "40.56%",
//         isAvailable: function () {
//             if (canAccessCastleTown() && setMDHFlag() && items.Crystal) {
//                 return "available";
//             }
//             return "poeunavailable";
//         },
//     },
//     {
//         //33
//         name: "Bublin Camp Poe",
//         x: "15%",
//         y: "45.2%",
//         isAvailable: function () {
//             if (canAccessDesert() && setMDHFlag() && items.Crystal && canDoDamage())
//                 return "available";
//             return "poeunavailable";
//         },
//     },
//     {
//         //35
//         name: "Graveyard Open Poe",
//         x: "84.16%",
//         y: "54.4%",
//         isAvailable: function () {
//             if (canAccessKakVillage() && setMDHFlag() && items.Crystal)
//                 return "available";
//             return "poeunavailable";
//         },
//     },
//     {
//         //36
//         name: "Graveyard Grave Poe",
//         x: "84.16%",
//         y: "55.4%",
//         isAvailable: function () {
//             if (canAccessKakVillage() && setMDHFlag() && items.Crystal)
//                 return "available";
//             return "poeunavailable";
//         },
//     },
//     {
//         //38
//         name: "Eldin Longcave Poe",
//         x: "65.83%",
//         y: "57.2%",
//         isAvailable: function () {
//             if (canAccessKakGorge() && items.Crystal)
//                 return "available";
//             return "poeunavailable";
//         },
//     },
//     {
//         //43
//         name: "Bomb Shop Poe",
//         x: "81.83%",
//         y: "51.76%",
//         isAvailable: function () {
//             if (canAccessKakVillage() && setMDHFlag() && items.Crystal)
//                 return "available";
//             return "poeunavailable";
//         },
//     },
//     {
//         //47
//         name: "Poe near Tower",
//         x: "34.08%",
//         y: "53.12%",
//         isAvailable: function () {
//             if (canAccessLakeHylia() && setMDHFlag() && items.Crystal)
//                 return "available";
//             return "poeunavailable";
//         },
//     },
//     // bugs
//     {
//         //5
//         name: "Male Ant",
//         x: "84.58%",
//         y: "53.92%",
//         isAvailable: function () {
//             if (canAccessKakVillage())
//                 return "available";
//             return "bugunavailable";
//         },
//     },
//     {
//         //6
//         name: "Female Ant",
//         x: "80.75%",
//         y: "52.48%",
//         isAvailable: function () {
//             if (canAccessKakVillage())
//                 return "available";
//             return "bugunavailable";
//         },
//     },
// ]
/*
//Shops
var randomizedShops = 
[
    // Ordon
    {
        name: "Milk - 10 Rupees",
        x: "55.5%",
        y: "85.76%",
        isAvailable: function () {
            if ((canDoDamage() || SkipIntro) || (items.Bottle || NoBottleReq))
                return "available";
            return "bugunavailable";
        },
    },
    {
        name: "Bee Larva - 10 Rupees",
        x: "56.5%",
        y: "85.76%",
        isAvailable: function () {
            if ((canDoDamage() || SkipIntro) || (items.Bottle || NoBottleReq))
                return "available";
            return "bugunavailable";
        },
    },
    {
        name: "Lantern Oil - 20 Rupees",
        x: "55.5%",
        y: "86.76%",
        isAvailable: function () {
            if ((canDoDamage() || SkipIntro) && (items.Lantern || (items.Bottle || NoBottleReq)))
                return "available";
            return "bugunavailable";
        },
    },

    //Malo Mark - Kak
    {
        name: "Red Potion - 30 Rupees",
        x: "80.25%",
        y: "54.28%",
        isAvailable: function () {
            if (canAccessKakVillage() && (items.Bottle || NoBottleReq))
                return "available";
            return "bugunavailable";
        },
    },
    {
        name: "Wooden Shield - 50 Rupees",
        x: "81.25%",
        y: "54.28%",
        isAvailable: function () {
            if (canAccessKakVillage())
                return "available";
            return "bugunavailable";
        },
    },

    //Death Mountain
    {
        name: "Lantern Oil - 20 Rupees",
        x: "85.33%",
        y: "37.60%",
        isAvailable: function () {
            if (canAccessDeathMountain() && (items.Lantern || (items.Bottle || NoBottleReq)))
                return "available";
            return "bugunavailable";
        },
    },
    {
        name: "Wooden Shield - 50 Rupees",
        x: "86.33%",
        y: "37.60%",
        isAvailable: function () {
            if (canAccessDeathMountain())
                return "available";
            return "bugunavailable";
        },
    },
    {
        name: "Milk - 20 Rupees",
        x: "85.33%",
        y: "38.60%",
        isAvailable: function () {
            if (canAccessDeathMountain() && (items.Bottle || NoBottleReq))
                return "available";
            return "bugunavailable";
        },
    },

    //Goron at Kak Night
    {
        name: "Lantern Oil - 20 Rupees",
        x: "80.25%",
        y: "51.68%",
        isAvailable: function () {
            if (canAccessKakVillage() && (items.Lantern || (items.Bottle || NoBottleReq)))
                return "available";
            return "bugunavailable";
        },
    },
    {
        name: "Red Potion - 30 Rupees",
        x: "81.25%",
        y: "51.68%",
        isAvailable: function () {
            if (canAccessKakVillage() && (items.Bottle || NoBottleReq))
                return "available";
            return "bugunavailable";
        },
    },
    {
        name: "Blue Potion - 100 Rupees",
        x: "80.25%",
        y: "52.68%",
        isAvailable: function () {
            if (canAccessKakVillage() && (items.Bottle || NoBottleReq))
                return "available";
            return "bugunavailable";
        },
    },

    //Malo Mart -Castle Town
    {
        name: "Blue Potion - 50 Rupees",
        x: "55.33%",
        y: "40.88%",
        isAvailable: function () {
            if (canAccessCastleTown() && (items.Bottle || NoBottleReq))
                return "available";
            return "bugunavailable";
        },
    },
    {
        name: "Red Potion - 15 Rupees",
        x: "56.33%",
        y: "40.88%",
        isAvailable: function () {
            if (canAccessCastleTown() && (items.Bottle || NoBottleReq))
                return "available";
            return "bugunavailable";
        },
    },
    {
        name: "Magic Armor - 598 Rupees",
        x: "55.33%",
        y: "41.88%",
        isAvailable: function () {
            if (canAccessCastleTown())
                return "available";
            return "bugunavailable";
        },
    },

    // Goron Castle Town Shop
    {
        name: "Hylian Shield - 210 Rupees",
        x: "51.66%",
        y: "40.48%",
        isAvailable: function () {
            if (canAccessCastleTown())
                return "available";
            return "bugunavailable";
        },
    },
    {
        name: "Red Potion - 40 Rupees",
        x: "52.66%",
        y: "40.48%",
        isAvailable: function () {
            if (canAccessCastleTown() && (items.Bottle || NoBottleReq))
                return "available";
            return "bugunavailable";
        },
    },
    {
        name: "Lantern Oil - 30 Rupees",
        x: "51.66%",
        y: "41.48%",
        isAvailable: function () {
            if (canAccessCastleTown() && (items.Lantern || (items.Bottle || NoBottleReq)))
                return "available";
            return "bugunavailable";
        },
    },
    {
        name: "Arrows - 40 Rupees",
        x: "52.66%",
        y: "41.48%",
        isAvailable: function () {
            if (canAccessCastleTown() && items.Bow)
                return "available";
            return "bugunavailable";
        },
    },

    //Goron Hot Springwater
    {
        name: "Hot Springwater - 20 Rupees",
        x: "54.33%",
        y: "42.48%",
        isAvailable: function () {
            if (canAccessCastleTown() && (items.Bottle || NoBottleReq))
                return "available";
            return "bugunavailable";
        },
    },

    //CiTS Shop
    {
        name: "Red Potion - 30 Rupees",
        x: "38.42%",
        y: "50.00%",
        isAvailable: function () {
            if (canAccessCiTS() && (items.Bottle || NoBottleReq))
                return "available";
            return "bugunavailable";
        },
    },
    {
        name: "Blue Potion - 100 Rupees",
        x: "37.42%",
        y: "51.00%",
        isAvailable: function () {
            if (canAccessCiTS() && (items.Bottle || NoBottleReq))
                return "available";
            return "bugunavailable";
        },
    },
    {
        name: "Lantern Oil - 20 Rupees",
        x: "38.42%",
        y: "51.00%",
        isAvailable: function () {
            if (canAccessCiTS() && (items.Lantern || (items.Bottle || NoBottleReq)))
                return "available";
            return "bugunavailable";
        },
    }
]
*/
