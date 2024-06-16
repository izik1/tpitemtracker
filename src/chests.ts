import { type CheckName } from "./logic/check-name";
import { zonesGlitchless } from "./logic/index";
import store from "./store";

export type CheckStatus = "opened" | "available" | "unavailable" | "possible";

export function checkStatus(check: CheckName): CheckStatus {
    if (store.openedChecks.has(check)) {
        return "opened";
    }

    if (store.logic.checkCompletable(check)) {
        return "available";
    }

    return "unavailable";
}


export function groupStatus(group: Group): CheckStatus | "possible" {
    let unopened = 0;
    let completable = 0;
    for (const check of group.checks) {
        if (!store.openedChecks.has(check)) {
            unopened += 1;

            if (store.logic.checkCompletable(check)) {
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

interface Group {
    readonly name: string;
    readonly x: any;
    readonly y: any,
    readonly checks: CheckName[];
}

// note: for some reason I cannot fathom, *all* `x`,`y`s are offset by an amount from the percentage.
// this is caused by there (formerly) being a negative margin.
// until I get around re-calculating all the percentages, this is what we're living with.
// note: we use `zonesGlitchless` for the check lists, but it's _probably_ the same checklists in glitchled logic.
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
            ...zonesGlitchless["Forest Temple Entrance"].checks,
            ...zonesGlitchless["Forest Temple Lobby"].checks,
            ...zonesGlitchless["Forest Temple East Wing"].checks,
            ...zonesGlitchless["Forest Temple West Wing"].checks,
            ...zonesGlitchless["Ook"].checks,
            ...zonesGlitchless["Forest Temple North Wing"].checks,
            ...zonesGlitchless["Forest Temple Boss Room"].checks,
        ]
    },
    {
        name: "Eldin Long Cave",
        x: "calc(65.91% - 12px)",
        y: "calc(57.31% - 12px)",
        checks: [
            ...zonesGlitchless["Eldin Long Cave"].checks
        ]
    },
    {
        name: "Kakariko Village",
        x: "calc(80.41% - 12px)",
        y: "calc(53.36% - 12px)",
        checks: [
            ...zonesGlitchless["Kakariko Village"].checks,
        ]
    },
    {
        name: "Goron Mines",
        x: "calc(85.91% - 12px)",
        y: "calc(38.16% - 12px)",
        checks: [
            ...zonesGlitchless["Goron Mines Entrance"].checks,
            ...zonesGlitchless["Goron Mines Magnet Room"].checks,
            ...zonesGlitchless["Goron Mines Lower West Wing"].checks,
            ...zonesGlitchless["Goron Mines Crystal Switch Room"].checks,
            ...zonesGlitchless["Goron Mines North Wing"].checks,
            ...zonesGlitchless["Goron Mines Upper East Wing"].checks,
            ...zonesGlitchless["Goron Mines Boss Room"].checks,
        ]
    },
    // this one is positioned correctly without the `calc`
    {
        name: "Goron Stockcave",
        x: "79.7%",
        y: "26.8%",
        checks: [
            ...zonesGlitchless["Goron Stockcave"].checks,
        ]
    },
    {
        name: "Hidden Village",
        x: "calc(72% - 12px)",
        y: "calc(23.8% - 12px)",
        checks: [
            ...zonesGlitchless["Hidden Village"].checks,
        ]
    }
];

interface OverworldCheck {
    readonly name: CheckName,
    readonly x: any,
    readonly y: any,
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
        x: "calc(calc(45.41% - 8px)",
        y: "calc(calc(70.8% - 8px)",
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
    }
];

// define grouped chests
//     {
//         name: "Lakebed Temple",
//         x: "40.33%",
//         y: "47.76%",
//     },
//     {
//         name: "Arbiter's Grounds",
//         x: "15.2%",
//         y: "41.44%",
//     },
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
//     /*
//     {
//         name: "Cave of Ordeals",
//         x: "16.08%",
//         y: "59.64%",
//     },
//     */
//     {
//         name: "Lake Hylia Lantern Cave",
//         x: "40.75%",
//         y: "55.68%",
//     },
//     {
//         name: "Lanayru Spring",
//         x: "42.5%",
//         y: "52.08%",
//     },
//     {
//         name: "Hyrule Castle Town",
//         x: "53.75%",
//         y: "41.2%",
//     },
//     {
//         name: "Bublin Camp",
//         x: "14.98%",
//         y: "44.96%",
//     },
// ];

/* overworld */

// //Overworld Chests
// var overworldChests = [
//     {
//         name: "Small Chest Under Waterfall",
//         x: "55.93%",
//         y: "10.56%",
//         isAvailable: function () {
//             if (canAccessZoraDomain() && items.Crystal) {
//                 return "available";
//             }
//             return "unavailable";
//         },
//     },
//     {
//         name: "Ashei's Sketch",
//         x: "51.00%",
//         y: "11.06%",
//         isAvailable: function () {
//             if (canAccessZoraDomain()) {
//                 return "available";
//             }
//             return "unavailable";
//         },
//     },
//     {
//         name: "Small Chest Near Mother and Child Isles",
//         x: "56.73%",
//         y: "11.44%",
//         isAvailable: function () {
//             if (canAccessZoraDomain()) {
//                 return "available";
//             }
//             return "unavailable";
//         }
//     },
//     {
//         name: "Underwater Chest",
//         x: "39.85%",
//         y: "54.06%",
//         isAvailable: function () {
//             if (canAccessLakeHylia() && items.IronBoots) {
//                 return "available";
//             }
//             return "unavailable";
//         },
//     },
//     {
//         name: "Grotto - Helmasaur Chest",
//         x: "45.25%",
//         y: "38.48%",
//         isAvailable: function () {
//             if (canAccessLanayruField() && items.Crystal && items.Clawshot) {
//                 return "available";
//             }
//             return "unavailable";
//         },
//     },
//     {
//         name: "Grotto - Water Toadpoli Chest",
//         x: "38.95%",
//         y: "55.26%",
//         isAvailable: function () {
//             if (canAccessLakeHylia() && items.Crystal && (items.Boss3 || EarlyCits)) {
//                 return "available";
//             }
//             return "unavailable";
//         },
//     },
//     {
//         name: "Auru's Memo",
//         x: "35.95%",
//         y: "55.26%",
//         isAvailable: function () {
//             if (canAccessLakeHylia()) {
//                 return "available";
//             }
//             return "unavailable";
//         },
//     },
//     {
//         name: "Outside Lanayru Spring - Left Statue Small Chest",
//         x: "42.05%",
//         y: "50.76%",
//         isAvailable: function () {
//             if (canAccessLakeHylia()) {
//                 return "available";
//             }
//             return "unavailable";
//         },
//     },
//     {
//         name: "Outside Lanayru Spring - Right Statue Chest",
//         x: "43.15%",
//         y: "50.76%",
//         isAvailable: function () {
//             if (canAccessLakeHylia()) {
//                 return "available";
//             }
//             return "unavailable";
//         }
//     },
//     {
//         name: "Flight-By-Fowl (5)",
//         x: "43.5%",
//         y: "48.0%",
//         isAvailable: function () {
//             if (canAccessLakeHylia()) {
//                 return "available";
//             }
//             return "unavailable";
//         }
//     },
//     {
//         name: "Grotto - Shell Blade Chest",
//         x: "38.41%",
//         y: "45.92%",
//         isAvailable: function () {
//             if (canAccessLakeHylia() && items.Crystal && items.IronBoots && (items.Boss3 || EarlyCits) && (items.Sword || items.MSword || items.WBombs)) {
//                 return "available";
//             }
//             return "unavailable";
//         },
//     },
//     {
//         name: "Underwater Right Chest",
//         x: "55.5%",
//         y: "08.48%",
//         isAvailable: function () {
//             if (canAccessZoraDomain() && items.Lantern && items.IronBoots) {
//                 return "available";
//             }
//             return "unavailable";
//         },
//     },
//     {
//         name: "Underwater Left Chest",
//         x: "54.5%",
//         y: "08.48%",
//         isAvailable: function () {
//             if (canAccessZoraDomain() && items.Boomerang && items.IronBoots && items.Lantern) {
//                 return "available";
//             }
//             return "unavailable";
//         },
//     },
//     {
//         name: "Grotto - Skultulla Chest",
//         x: "54.0%",
//         y: "22.8%",
//         isAvailable: function () {
//             if (canAccessLanayruField() && items.Crystal && items.Lantern) {
//                 return "available";
//             }
//             return "unavailable";
//         },
//     },
//     {
//         name: "Behind Gate Underwater Chest",
//         x: "53.83%",
//         y: "29.84%",
//         isAvailable: function () {
//             if (canAccessLanayruField() && items.IronBoots) {
//                 return "available";
//             }
//             return "unavailable";
//         },
//     },
//     {
//         name: "Bridge Vines Chest",
//         x: "41.58%",
//         y: "45.84%",
//         isAvailable: function () {
//             if (canAccessLanayruField() && items.Clawshot) {
//                 return "available";
//             }
//             return "unavailable";
//         },
//     },
//     {
//         name: "Grotto - Bubble Chest",
//         x: "46.33%",
//         y: "56.24%",
//         isAvailable: function () {
//             if (canAccessLanayruField() && items.Crystal && items.Clawshot && items.Lantern && shootPew()) {
//                 return "available";
//             }
//             return "unavailable";
//         },
//     },
//     {
//         name: "Oustide Grotto Chest",
//         x: "44.83%",
//         y: "56.24%",
//         isAvailable: function () {
//             if (canAccessLanayruField() && items.Clawshot && shootPew()) {
//                 return "available";
//             }
//             return "unavailable";
//         },
//     },
//     {
//         name: "Castle Pillar Chest",
//         x: "52.83%",
//         y: "44.16%",
//         isAvailable: function () {
//             if (canAccessCastleTown() && items.Clawshot && items.Crystal) {
//                 return "available";
//             }
//             return "unavailable";
//         },
//     },
//     {
//         name: "Grotto - Tetike Chest",
//         x: "55.8%",
//         y: "46.12%",
//         isAvailable: function () {
//             if (canAccessCastleTown() && items.Crystal) {
//                 return "available";
//             }
//             return "unavailable";
//         },
//     },
//     {
//         name: "Grotto - Skulltula Chest",
//         x: "33.58%",
//         y: "60.32%",
//         isAvailable: function () {
//             if (canAccessDesert() && items.Crystal) {
//                 return "available";
//             }
//             return "unavailable";
//         },
//     },
//     {
//         name: "Peahat Chest",
//         x: "29.08%",
//         y: "60.24%",
//         isAvailable: function () {
//             if (canAccessDesert() && items.Clawshot) {
//                 return "available";
//             }
//             return "unavailable";
//         },
//     },
//     {
//         name: "East Canyon Chest",
//         x: "29.33%",
//         y: "56.88%",
//         isAvailable: function () {
//             if (canAccessDesert()) {
//                 return "available";
//             }
//             return "unavailable";
//         },
//     },
//     {
//         name: "Lone Small Chest",
//         x: "22.50%",
//         y: "57.68%",
//         isAvailable: function () {
//             if (canAccessDesert()) {
//                 return "available";
//             }
//             return "unavailable";
//         },
//     },
//     {
//         name: "West Canyon Chest",
//         x: "14.08%",
//         y: "57.64%",
//         isAvailable: function () {
//             if (canAccessDesert() && items.Clawshot) {
//                 return "available";
//             }
//             return "unavailable";
//         },
//     },
//     {
//         name: "Grotto - Poe and Boulder Chest",
//         x: "21.66%",
//         y: "50.64%",
//         isAvailable: function () {
//             if (canAccessDesert() && items.Crystal && canSmash() && items.Lantern) {
//                 return "available";
//             }
//             return "unavailable";
//         },
//     },
//     {
//         name: "North Small Chest Behind Gate",
//         x: "17%",
//         y: "49.28%",
//         isAvailable: function () {
//             if (canAccessDesert()) {
//                 return "available";
//             }
//             return "unavailable";
//         },
//     },
//     {
//         name: "Northwest Small Chest Behind Gate",
//         x: "12.8%",
//         y: "50.0%",
//         isAvailable: function () {
//             if (canAccessDesert()) {
//                 return "available";
//             }
//             return "unavailable";
//         },
//     },
//     {
//         name: "South Chest Behind Gate",
//         x: "26.5%",
//         y: "61.28%",
//         isAvailable: function () {
//             if (canAccessDesert()) {
//                 return "available";
//             }
//             return "unavailable";
//         },
//     },
//     {
//         name: "Top-Left Small Chest by Campfire",
//         x: "15%",
//         y: "51.36%",
//         isAvailable: function () {
//             if (canAccessDesert()) {
//                 return "available";
//             }
//             return "unavailable";
//         },
//     },
//     {
//         name: "Right Small Chest by Campfire",
//         x: "16%",
//         y: "51.36%",
//         isAvailable: function () {
//             if (canAccessDesert()) {
//                 return "available";
//             }
//             return "unavailable";
//         },
//     },
//     {
//         name: "Bottom-Left Small Chest by Campfire",
//         x: "15%",
//         y: "52.36%",
//         isAvailable: function () {
//             if (canAccessDesert()) {
//                 return "available";
//             }
//             return "unavailable";
//         },
//     },
//     {
//         name: "Small Chest With Boxes",
//         x: "16.33%",
//         y: "47.76%",
//         isAvailable: function () {
//             if (canAccessDesert()) {
//                 return "available";
//             }
//             return "unavailable";
//         },
//     },
//     {
//         name: "Spinner Wall Heart Piece Chest",
//         x: "41.41%",
//         y: "38.08%",
//         isAvailable: function () {
//             if (canAccessLanayruField() && items.Spinner) {
//                 return "available";
//             }
//             return "unavailable";
//         },
//     },
//     {
//         name: "Fountain Chest",
//         x: "54.01%",
//         y: "45.68%",
//         isAvailable: function () {
//             if (canAccessCastleTown() && items.Spinner && items.Clawshot) {
//                 return "available";
//             }
//             return "unavailable";
//         },
//     },
//     {
//         name: "Wooden Statue",
//         x: "54.01%",
//         y: "47.68%",
//         isAvailable: function () {
//             if (canAccessCastleTown() && items.MedicineScent) {
//                 return "available";
//             }
//             return "unavailable";
//         },
//     },
//     {
//         name: "Frozen Lantern Chest",
//         x: "38.26%",
//         y: "11.48%",
//         isAvailable: function () {
//             if (items.Chainball && items.Lantern && canAccessSnowpeakSummit()) {
//                 return "available";
//             }
//             return "unavailable";
//         },
//     },

//     {
//         name: "Grotto - Freezard Chest",
//         x: "42.5%",
//         y: "9.12%",
//         isAvailable: function () {
//             if (items.Crystal && items.Chainball && canAccessSnowpeakSummit()) {
//                 return "available";
//             }
//             return "unavailable";
//         },
//     },
//     {
//         name: "Frozen Block Cave Chest",
//         x: "52.85%",
//         y: "26.04%",
//         isAvailable: function () {
//             if (canAccessLanayruField() && items.Chainball) {
//                 return "available";
//             }
//             return "unavailable";
//         },
//     },
//     {
//         name: "Castle Ruins Owl Statue Chest",
//         x: "45.38%",
//         y: "43.84%",
//         isAvailable: function () {
//             if (canAccessLanayruField() && items.Dominion > 1) {
//                 return "available";
//             }
//             return "unavailable";
//         },
//     },
//     {
//         name: "Castle Ruins Skybook Letter",
//         x: "46.38%",
//         y: "43.84%",
//         isAvailable: function () {
//             if (canAccessLanayruField() && items.Dominion > 1) {
//                 return "available";
//             }
//             return "unavailable";
//         },
//     },
//     {
//         name: "Hylia Bridge Owl Statue Chest",
//         x: "41.45%",
//         y: "43.44%",
//         isAvailable: function () {
//             if (canAccessLanayruField() && items.Dominion > 1 && items.Clawshot) {
//                 return "available";
//             }
//             return "unavailable";
//         },
//     },
//     {
//         name: "Hylia Bridge Skybook Letter",
//         x: "42.45%",
//         y: "43.44%",
//         isAvailable: function () {
//             if (canAccessLanayruField() && items.Dominion > 1 && items.Clawshot) {
//                 return "available";
//             }
//             return "unavailable";
//         },
//     },
//     {
//         name: "Gerudo Desert Owl Statue Chest",
//         x: "20.58%",
//         y: "59.6%",
//         isAvailable: function () {
//             if (items.Dominion > 1 && canAccessDesert()) {
//                 return "available";
//             }
//             return "unavailable";
//         },
//     },
//     {
//         name: "Gerudo Desert Skybook Letter",
//         x: "20.58%",
//         y: "61.1%",
//         isAvailable: function () {
//             if (items.Dominion > 1 && canAccessDesert()) {
//                 return "available";
//             }
//             return "unavailable";
//         },
//     },
//     {
//         name: "Lake Chasm Chest",
//         x: "51.50%",
//         y: "46.88%",
//         isAvailable: function () {
//             if (canAccessCastleTown() && items.Clawshot > 1) {
//                 return "available";
//             }
//             return "unavailable";
//         },
//     },
//     {
//         name: "Fishing Hole Heart Piece",
//         x: "64.5%",
//         y: "9%",
//         isAvailable: function () {
//             if (canAccessZoraDomain()) {
//                 return "available";
//             }
//             return "unavailable";
//         },
//     },
//     {
//         name: "Fishing Hole Bottle",
//         x: "65.8%",
//         y: "9.5%",
//         isAvailable: function () {
//             if (canAccessZoraDomain() && items.Rod) {
//                 return "available";
//             }
//             return "unavailable";
//         },
//     },
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
//         name: "Back Slice",
//         x: "48.38%",
//         y: "40.84%",
//         isAvailable: function () {
//             if (canAccessZoraDomain() && canAccessLanayruField() && items.Crystal) {
//                 return "available";
//             }
//             return "unavailable";
//         },
//     },
//     {
//         name: "Helm Splitter",
//         x: "52.83%",
//         y: "46.16%",
//         isAvailable: function () {
//             if (canAccessGrove() && items.Crystal) {
//                 return "available";
//             }
//             return "unavailable";
//         },
//     },
//     {
//         name: "Mortal Draw",
//         x: "14.13%",
//         y: "47.36%",
//         isAvailable: function () {
//             if (items.Crystal && canAccessDesert() && canAccessLakeHylia()) {
//                 return "available";
//             }
//             return "unavailable";
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
//     {
//         name: "Snowboard Racing",
//         x: "36.25%",
//         y: "11.68%",
//         isAvailable: function () {
//             if (items.Boss5 && canAccessSnowpeakSummit()) {

//                 return "available";
//             }
//             return "unavailable";
//         },
//     },
//     {
//         name: "Iza Bomb Bag",
//         x: "65.8%",
//         y: "12%",
//         isAvailable: function () {
//             if (canAccessZoraDomain() && (items.Sword || items.MSword || items.Crystal) && items.Bow) {
//                 return "available";
//             }
//             return "unavailable";

//         },
//     },
//     {
//         name: "Giant Bomb Bag",
//         x: "66.8%",
//         y: "12%",
//         isAvailable: function () {
//             if (canAccessZoraDomain() && (items.Sword || items.MSword || items.Crystal) && items.Bow) {
//                 return "available";
//             }
//             return "unavailable";
//         },
//     },
//     {
//         name: "Plumm Fruit Game Heart Piece",
//         x: "65.8%",
//         y: "14.5%",
//         isAvailable: function () {
//             if (canAccessLakeHylia() && items.Crystal) {
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
//         //14
//         name: "South Castle Town Field Poe",
//         x: "53.66%",
//         y: "45.84%",
//         isAvailable: function () {
//             if (canAccessCastleTown() && setMDHFlag() && items.Crystal) {
//                 return "available";
//             }
//             return "poeunavailable";
//         },
//     },
//     {
//         //15
//         name: "Castle Ruins Poe",
//         x: "45.16%",
//         y: "43.36%",
//         isAvailable: function () {
//             if (canAccessLanayruField() && setMDHFlag() && items.Crystal) {
//                 return "available";
//             }
//             return "poeunavailable";
//         },
//     },
//     {
//         //23
//         name: "CoO - F17 Poe",
//         x: "14.25%",
//         y: "60.4%",
//         isAvailable: function () {
//             if (canAccessDesert() && items.Clawshot && items.Crystal)
//                 return "available";
//             return "poeunavailable";
//         },
//     },
//     {
//         //24
//         name: "CoO - F33 Poe",
//         x: "15.25%",
//         y: "60.4%",
//         isAvailable: function () {
//             if (canAccessDesert() && items.Clawshot && items.Crystal && items.Spinner && items.Chainball && items.Dominion > 1)
//                 return "available";
//             return "poeunavailable";
//         },
//     },
//     {
//         //25
//         name: "CoO - F44 Poe",
//         x: "14.25%",
//         y: "61.4%",
//         isAvailable: function () {
//             if (canAccessDesert() && items.Clawshot > 1 && items.Crystal && items.Spinner && items.Chainball && items.Dominion > 1)
//                 return "available";
//             return "poeunavailable";
//         },
//     },
//     {
//         //27
//         name: "Poe By Entrance",
//         x: "33.75%",
//         y: "60.40%",
//         isAvailable: function () {
//             if (canAccessDesert() && setMDHFlag() && items.Crystal)
//                 return "available";
//             return "poeunavailable";
//         },
//     },
//     {
//         //28
//         name: "Poe Above CoO",
//         x: "14.17%",
//         y: "59.4%",
//         isAvailable: function () {
//             if (canAccessDesert() && items.Clawshot && setMDHFlag() && items.Crystal)
//                 return "available";
//             return "poeunavailable";
//         },
//     },
//     {
//         //29
//         name: "Poe Above Grotto",
//         x: "20.83%",
//         y: "50.88%",
//         isAvailable: function () {
//             if (canAccessDesert() && items.Clawshot && setMDHFlag() && items.Crystal)
//                 return "available";
//             return "poeunavailable";
//         },
//     },
//     {
//         //30
//         name: "Poe in Grotto #1",
//         x: "21.83%",
//         y: "50.88%",
//         isAvailable: function () {
//             if (canAccessDesert() && items.Clawshot && setMDHFlag() && items.Crystal)
//                 return "available";
//             return "poeunavailable";
//         },
//     },
//     {
//         //31
//         name: "Poe in Grotto #2",
//         x: "20.83%",
//         y: "51.88%",
//         isAvailable: function () {
//             if (canAccessDesert() && items.Clawshot && setMDHFlag() && items.Crystal)
//                 return "available";
//             return "poeunavailable";
//         },
//     },
//     {
//         //32
//         name: "Poe next to Bublin Camp",
//         x: "13.33%",
//         y: "47.2%",
//         isAvailable: function () {
//             if (canAccessDesert() && setMDHFlag() && items.Crystal)
//                 return "available";
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
//         //34
//         name: "Poe before AG",
//         x: "15%",
//         y: "43.6%",
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
//         //39
//         name: "Bridge Poe",
//         x: "54.25%",
//         y: "26.88%",
//         isAvailable: function () {
//             if (canAccessLanayruField() && setMDHFlag() && items.Crystal)
//                 return "available";
//             return "poeunavailable";
//         },
//     },
//     {
//         //40
//         name: "Grotto Poe #1",
//         x: "49.66%",
//         y: "26.8%",
//         isAvailable: function () {
//             if (canAccessLanayruField() && items.Crystal)
//                 return "available";
//             return "poeunavailable";
//         },
//     },
//     {
//         //41
//         name: "Grotto Poe #2",
//         x: "50.66%",
//         y: "26.8%",
//         isAvailable: function () {
//             if (canAccessLanayruField() && items.Crystal)
//                 return "available";
//             return "poeunavailable";
//         },
//     },
//     {
//         //42
//         name: "Poe on Rock Ledge",
//         x: "44.42%",
//         y: "56%",
//         isAvailable: function () {
//             if (canAccessLanayruField() && items.Clawshot && shootPew() && setMDHFlag() && items.Crystal)
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
//         //44
//         name: "Watchtower Poe",
//         x: "80.83%",
//         y: "50.88%",
//         isAvailable: function () {
//             if (canAccessKakVillage() && setMDHFlag() && items.Crystal)
//                 return "available";
//             return "poeunavailable";
//         },
//     },
//     {
//         //45
//         name: "Poe by the Dock",
//         x: "46.58%",
//         y: "50.64%",
//         isAvailable: function () {
//             if (canAccessLakeHylia() && setMDHFlag() && items.Crystal)
//                 return "available";
//             return "poeunavailable";
//         },
//     },
//     {
//         //46
//         name: "Alcove Poe",
//         x: "40.08%",
//         y: "54.72%",
//         isAvailable: function () {
//             if (canAccessLakeHylia() && setMDHFlag() && items.Crystal)
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
//     {
//         //48
//         name: "Isle of Riches Poe",
//         x: "39.08%",
//         y: "49.12%",
//         isAvailable: function () {
//             if (canAccessLakeHylia() && setMDHFlag() && items.Crystal)
//                 return "available";
//             return "poeunavailable";
//         },
//     },
//     {
//         //49
//         name: "Flight by Fowl Ledge Poe",
//         x: "36.42%",
//         y: "46.72%",
//         isAvailable: function () {
//             if (canAccessLakeHylia() && setMDHFlag() && items.Crystal)
//                 return "available";
//             return "poeunavailable";
//         },
//     },
//     {
//         //50
//         name: "LLC Poe #1",
//         x: "38.5%",
//         y: "54.8%",
//         isAvailable: function () {
//             if (canAccessLakeHylia() && canSmash() && setMDHFlag() && items.Crystal)
//                 return "available";
//             return "poeunavailable";
//         },
//     },
//     {
//         //51
//         name: "LLC Poe #2",
//         x: "39.5%",
//         y: "55.8%",
//         isAvailable: function () {
//             if (canAccessLakeHylia() && canSmash() && setMDHFlag() && items.Crystal)
//                 return "available";
//             return "poeunavailable";
//         },
//     },
//     {
//         //52
//         name: "LLC Poe #3",
//         x: "38.5%",
//         y: "55.8%",
//         isAvailable: function () {
//             if (canAccessLakeHylia() && canSmash() && setMDHFlag() && items.Crystal)
//                 return "available";
//             return "poeunavailable";
//         },
//     },
//     {
//         //53
//         name: "Poe in Blizzard",
//         x: "44.67%",
//         y: "9.36%",
//         isAvailable: function () {
//             if (canAccessSnowpeakSummit() && items.Crystal)
//                 return "available";
//             return "poeunavailable";
//         },
//     },
//     {
//         //54
//         name: "Poe under Tree",
//         x: "41.5%",
//         y: "8.08%",
//         isAvailable: function () {
//             if (canAccessSnowpeakSummit() && items.Crystal)
//                 return "available";
//             return "poeunavailable";
//         },
//     },
//     {
//         //55
//         name: "Poe above Grotto",
//         x: "41.75%",
//         y: "9.46%",
//         isAvailable: function () {
//             if (canAccessSnowpeakSummit() && items.Crystal)
//                 return "available";
//             return "poeunavailable";
//         },
//     },
//     {
//         //56
//         name: "Poe in Cave",
//         x: "38.08%",
//         y: "11.44%",
//         isAvailable: function () {
//             if (canAccessSnowpeakSummit() && items.Crystal && items.Chainball)
//                 return "available";
//             return "poeunavailable";
//         },
//     },
//     {
//         //57
//         name: "Poe next to Snowpeak Ruins",
//         x: "21.75%",
//         y: "31.52%",
//         isAvailable: function () {
//             if (canAccessSnowpeakSummit() && items.Crystal)
//                 return "available";
//             return "poeunavailable";
//         },
//     },
//     {
//         //58
//         name: "Upper Zora River Poe",
//         x: "64%",
//         y: "14.16%",
//         isAvailable: function () {
//             if (canAccessZoraDomain() && setMDHFlag() && items.Crystal)
//                 return "available";
//             return "poeunavailable";
//         },
//     },
//     {
//         //59
//         name: "Poe Behind Waterfall",
//         x: "54.5%",
//         y: "9.52%",
//         isAvailable: function () {
//             if (canAccessZoraDomain() && setMDHFlag() && items.Crystal)
//                 return "available";
//             return "poeunavailable";
//         },
//     },
//     {
//         //60
//         name: "Poe By Mother and Child Rocks",
//         x: "55.25%",
//         y: "11.36%",
//         isAvailable: function () {
//             if (canAccessZoraDomain() && setMDHFlag() && items.Crystal)
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
//     {
//         //11
//         name: "Male Mantis",
//         x: "41.17%",
//         y: "46.24%",
//         isAvailable: function () {
//             if (canAccessLanayruField() && (items.Clawshot || items.Boomerang))
//                 return "available";
//             return "bugunavailable";
//         },
//     },
//     {
//         //12
//         name: "Female Mantis",
//         x: "42.75%",
//         y: "54.16%",
//         isAvailable: function () {
//             if (canAccessLanayruField() && (items.Clawshot || items.Boomerang))
//                 return "available";
//             return "bugunavailable";
//         },
//     },
//     {
//         //13
//         name: "Male Dragonfly",
//         x: "55.5%",
//         y: "11.44%",
//         isAvailable: function () {
//             if (canAccessZoraDomain())
//                 return "available";
//             return "bugunavailable";
//         },
//     },
//     {
//         //14
//         name: "Female Dragonfly",
//         x: "65.58%",
//         y: "13.20%",
//         isAvailable: function () {
//             if (canAccessZoraDomain())
//                 return "available";
//             return "bugunavailable";
//         },
//     },
//     {
//         //15
//         name: "Male Butterfly",
//         x: "46.58%",
//         y: "42.24%",
//         isAvailable: function () {
//             if (canAccessLanayruField())
//                 return "available";
//             return "bugunavailable";
//         },
//     },
//     {
//         //16
//         name: "Female Butterfly",
//         x: "45.5%",
//         y: "38.48%",
//         isAvailable: function () {
//             if (canAccessLanayruField() && (items.Clawshot || items.Boomerang))
//                 return "available";
//             return "bugunavailable";
//         },
//     },
//     {
//         //17
//         name: "Male Stag Beetle",
//         x: "50.58%",
//         y: "28.00%",
//         isAvailable: function () {
//             if (canAccessLanayruField())
//                 return "available";
//             return "bugunavailable";
//         },
//     },
//     {
//         //18
//         name: "Female Stag Beetle",
//         x: "53.25%",
//         y: "24.48%",
//         isAvailable: function () {
//             if (canAccessLanayruField() && (items.Clawshot || items.Boomerang))
//                 return "available";
//             return "bugunavailable";
//         },
//     },
//     {
//         //19
//         name: "Female LadyBug",
//         x: "52.5%",
//         y: "45.2%",
//         isAvailable: function () {
//             if (canAccessCastleTown())
//                 return "available";
//             return "bugunavailable";
//         },
//     },
//     {
//         //20
//         name: "Male Ladybug",
//         x: "55.08%",
//         y: "46.16%",
//         isAvailable: function () {
//             if (canAccessCastleTown())
//                 return "available";
//             return "bugunavailable";
//         },
//     },
//     {
//         //21
//         name: "Male Dayfly",
//         x: "22.75%",
//         y: "60.16%",
//         isAvailable: function () {
//             if (canAccessDesert())
//                 return "available";
//             return "bugunavailable";
//         },
//     },
//     {
//         //22
//         name: "Female Dayfly",
//         x: "18.16%",
//         y: "59.2%",
//         isAvailable: function () {
//             if (canAccessDesert())
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
