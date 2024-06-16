import { ZoneId } from "./zone-id";
import * as fns from "./logic-functions";
import { CheckName } from "./check-name";
import store from "../store";

export class ZoneNeighbor {
    #name;
    #accessable;

    constructor(name: ZoneId, accessable: () => boolean) {
        this.#name = name;
        this.#accessable = accessable;
    }

    get name() {
        return this.#name;
    }

    get accessable() {
        return this.#accessable();
    }
}

// This is literally copied from zsrtp/Randomizer-Web-Generator with minimal differences.
// After all, what better place to get the logic from than the logic itself.

export interface Zone {
    name: ZoneId;
    neighbors: ZoneNeighbor[];
    checks: CheckName[];
}

const ordonZoneDataGlitchless: Zone[] = [
    {
        name: "Ordon Province",
        neighbors: [
            new ZoneNeighbor("Ordon Ranch Grotto", () => fns.canCompletePrologue() && store.items.Crystal),
            new ZoneNeighbor("South Faron Woods", () => (store.items.Sword > 0 && store.items.Slingshot) || store.settings.randomizer.skip.prologue),
        ],
        checks: [
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
    },
    {
        name: "Ordon Ranch Grotto",
        neighbors: [
            new ZoneNeighbor("Ordon Province", fns.always),
        ],
        checks: [
            "Ordon Ranch Grotto Lantern Chest"
        ]
    },
];

const faronZoneDataGlitchless: Zone[] = [
    {
        name: "South Faron Woods",
        neighbors: [
            new ZoneNeighbor("Ordon Province", fns.always),
            new ZoneNeighbor("Faron Field", fns.canClearForest),
            new ZoneNeighbor("South Faron Woods Cave", fns.always),
            new ZoneNeighbor("Faron Mist Area", () => fns.canSmash() && store.items.Dominion >= 2 && store.items.Crystal && fns.canClearForest()),
        ],
        checks: [
            "Coro Bottle",
            "Faron Woods Owl Statue Sky Character",
        ]
    },
    {
        name: "South Faron Woods Cave",
        neighbors: [
            new ZoneNeighbor("South Faron Woods", () => fns.canBurnWebs() || store.items.Crystal || store.settings.randomizer.skip.prologue),
            new ZoneNeighbor("Faron Mist Area", () => fns.canBurnWebs() || store.items.Crystal || store.settings.randomizer.skip.prologue),
        ],
        checks: [
            "South Faron Cave Chest"
        ]
    },
    {
        name: "Faron Mist Area",
        neighbors: [
            new ZoneNeighbor("South Faron Woods Cave", fns.always),
            new ZoneNeighbor("Faron Mist Cave", () => store.items.Lantern),
            new ZoneNeighbor("North Faron Woods", () => fns.canCompletePrologue() && (store.items.Lantern || store.items.Crystal)),
        ],
        checks: [
            "Faron Mist Stump Chest",
            "Faron Mist North Chest",
            "Faron Mist South Chest",
            "Faron Woods Owl Statue Chest",
            "Faron Mist Poe",
        ]
    },
    {
        name: "Faron Mist Cave",
        neighbors: [
            new ZoneNeighbor("Faron Mist Area", fns.always),
        ],
        checks: [
            "Faron Mist Cave Open Chest",
            "Faron Mist Cave Lantern Chest",
        ]
    },
    {
        name: "North Faron Woods",
        neighbors: [
            new ZoneNeighbor("Faron Mist Area", fns.always),
            new ZoneNeighbor("Forest Temple Entrance", fns.always),
            new ZoneNeighbor("Lost Woods", () => store.items.Crystal),
        ],
        checks: [
            "North Faron Woods Deku Baba Chest",
            "Faron Woods Golden Wolf",
        ],
    },
    {
        name: "Faron Field",
        neighbors: [
            new ZoneNeighbor("South Faron Woods", fns.always),
            // fixme: missing zone.
            new ZoneNeighbor("Outside Castle Town South", fns.never),
            // fixme: missing zone.
            new ZoneNeighbor("Kakariko Gorge", fns.always),
            // fixme: missing zone.
            new ZoneNeighbor("Lake Hylia Bridge", fns.never),
            new ZoneNeighbor("Faron Field Corner Grotto", () => store.items.Crystal),
        ],
        checks: [
            "Faron Field Bridge Chest",
            "Faron Field Tree Heart Piece",
            "Faron Field Male Beetle",
            "Faron Field Female Beetle",
            "Faron Field Poe",
        ]
    },
    {
        name: "Faron Field Corner Grotto",
        neighbors: [
            new ZoneNeighbor("Faron Field", fns.always),
        ],
        checks: [
            "Faron Field Corner Grotto Right Chest",
            "Faron Field Corner Grotto Left Chest",
            "Faron Field Corner Grotto Rear Chest",
        ]
    },
    {
        name: "Lost Woods",
        neighbors: [
            new ZoneNeighbor("North Faron Woods", fns.always),
            new ZoneNeighbor(
                "Sacred Grove Master Sword",
                // ToT entrance settings for alt.
                () => (fns.canDefeatSkullKid() && store.items.Crystal),
            )
        ],
        checks: [
            "Lost Woods Lantern Chest",
            "Lost Woods Boulder Poe",
            "Lost Woods Waterfall Poe",
        ]
    },
    {
        name: "Sacred Grove Baba Serpent Grotto",
        neighbors: [new ZoneNeighbor("Lost Woods", fns.always)],
        checks: [
            "Sacred Grove Baba Serpent Grotto Chest",
        ],
    },
    {
        name: "Sacred Grove Master Sword",
        neighbors: [
            new ZoneNeighbor("Lost Woods", fns.always),
            new ZoneNeighbor(
                "Sacred Grove Temple of Time",
                // ToT entrance settings.
                () => (fns.canDefeatShadowBeast() && store.items.Sword >= 3),
            ),
            new ZoneNeighbor(
                "Sacred Grove Baba Serpent Grotto",
                () => fns.canSmash() && store.items.Crystal
            )
        ],
        checks: [
            "Sacred Grove Spinner Chest",
            "Sacred Grove Male Snail",
            "Sacred Grove Master Sword Poe",
        ]
    },
    {
        name: "Sacred Grove Temple of Time",
        neighbors: [
            new ZoneNeighbor("Sacred Grove Master Sword", fns.always),
            // ToT entrance settings.
            new ZoneNeighbor("Temple of Time Entrance", () => store.items.Sword >= 3)
        ],
        checks: [
            "Sacred Grove Past Owl Statue Chest",
            "Sacred Grove Female Snail",
            "Sacred Grove Temple of Time Owl Statue Poe",
        ],
    }
];

const eldinZoneDataGlitchless: Zone[] = [
    {
        name: "Hidden Village",
        // todo: missing zone
        neighbors: [new ZoneNeighbor("Lanayru Field", fns.never)],
        checks: [
            "Cats Hide and Seek Minigame",
            "Ilia Charm",
            "Hidden Village Poe",
            "Skybook From Impaz",
        ],
    },
    {
        name: "Eldin Field Bomskit Grotto",
        neighbors: [new ZoneNeighbor("Eldin Field", fns.always)],
        checks: [
            "Eldin Field Bomskit Grotto Left Chest",
            "Eldin Field Bomskit Grotto Lantern Chest",
        ],
    },
    {
        name: "Eldin Field Stalfos Grotto",
        neighbors: [new ZoneNeighbor("Eldin Field", fns.always)],
        checks: [
            "Eldin Field Stalfos Grotto Right Small Chest",
            "Eldin Field Stalfos Grotto Left Small Chest",
            "Eldin Field Stalfos Grotto Stalfos Chest",
        ],
    },
    {
        name: "Eldin Field Water Bomb Fish Grotto",
        neighbors: [new ZoneNeighbor("Eldin Field", fns.always)],
        checks: ["Eldin Field Water Bomb Fish Grotto Chest"],
    },
    {
        name: "Eldin Field",
        neighbors: [
            new ZoneNeighbor("Kakariko Gorge", fns.canSmash),
            new ZoneNeighbor("Kakariko Village", fns.always),
            new ZoneNeighbor("Goron Stockcave", () => store.items.Clawshot > 0),
            // fixme: missing zone.
            new ZoneNeighbor("Castle Town", fns.never),
            // fixme: missing zone.
            new ZoneNeighbor("Lanayru Field", fns.never),
            new ZoneNeighbor("Eldin Field Water Bomb Fish Grotto", () => store.items.Crystal),
            new ZoneNeighbor("Eldin Field Bomskit Grotto", () => store.items.Crystal),
            new ZoneNeighbor(
                "Eldin Field Stalfos Grotto",
                // the smash requirement feels redundant, but, shrug.
                () => store.items.Crystal
                    && store.items.Spinner
                    && (fns.canSmash() || store.settings.randomizer.skip.lanayruTwilight || store.items.Crystal)
                    && (store.items.GateKeys || store.settings.randomizer.smallKeys === "keysy")
            ),
        ],
        checks: [
            "Eldin Field Bomb Rock Chest",
            "Bridge of Eldin Owl Statue Chest",
            "Goron Springwater Rush",
            "Bridge of Eldin Owl Statue Sky Character",
            "Eldin Field Male Grasshopper",
            "Eldin Field Female Grasshopper",
            "Bridge of Eldin Male Phasmid",
            "Bridge of Eldin Female Phasmid",
        ],
    },
    {
        name: "Eldin Long Cave",
        neighbors: [new ZoneNeighbor("Kakariko Gorge", fns.always)],
        checks: [
            "Eldin Lantern Cave First Chest",
            "Eldin Lantern Cave Lantern Chest",
            "Eldin Lantern Cave Second Chest",
            "Eldin Lantern Cave Poe",
        ],
    },
    {
        name: "Goron Stockcave",
        neighbors: [new ZoneNeighbor("Eldin Field", fns.always)],
        checks: [
            "Eldin Stockcave Upper Chest",
            "Eldin Stockcave Lantern Chest",
            "Eldin Stockcave Lowest Chest",
        ],
    },
    {
        name: "Kakariko Gorge",
        neighbors: [
            new ZoneNeighbor("Eldin Field", fns.canSmash),
            new ZoneNeighbor("Faron Field", fns.always),
            new ZoneNeighbor("Kakariko Village", fns.always),
            new ZoneNeighbor("Eldin Long Cave", fns.canSmash),
        ],
        checks: [
            "Kakariko Gorge Owl Statue Chest",
            "Kakariko Gorge Double Clawshot Chest",
            "Kakariko Gorge Spire Heart Piece",
            "Kakariko Gorge Owl Statue Sky Character",
            "Kakariko Gorge Male Pill Bug",
            "Kakariko Gorge Female Pill Bug",
            "Kakariko Gorge Poe",
        ],
    },
    {
        name: "Death Mountain Interiors",
        neighbors: [
            new ZoneNeighbor("Death Mountain Volcano", fns.always),
            new ZoneNeighbor(
                "Goron Mines Entrance",
                () => store.items.IronBoots || store.settings.randomizer.goronMinesLogic !== "closed"
            ),
        ],
        checks: [],
    },
    {
        name: "Death Mountain Trail",
        neighbors: [
            new ZoneNeighbor("Kakariko Village", fns.always),
            new ZoneNeighbor("Death Mountain Volcano", () => store.items.IronBoots || store.items.Crystal),
        ],
        checks: [
            "Death Mountain Alcove Chest",
            "Death Mountain Trail Poe",
        ],
    },
    {
        name: "Death Mountain Volcano",
        neighbors: [
            new ZoneNeighbor("Death Mountain Trail", fns.always),
            new ZoneNeighbor(
                "Death Mountain Interiors",
                () => store.items.IronBoots && (fns.canDefeatGoron() || store.settings.randomizer.goronMinesLogic === "open")
            )
        ],
        checks: [],
    },
    {
        name: "Kakariko Village",
        neighbors: [
            new ZoneNeighbor("Kakariko Gorge", fns.always),
            new ZoneNeighbor("Eldin Field", fns.always),
            new ZoneNeighbor("Death Mountain Trail", fns.always),
            new ZoneNeighbor(
                "Lake Hylia",
                fns.never,
                // () => fns.canUseWaterBombs()
                //     && (store.items.IronBoots || store.items.ZoraArmor)
                //     && (store.items.GateKeys || store.settings.randomizer.smallKeys === "keysy"),
            ),
        ],
        checks: [
            "Kakariko Graveyard Lantern Chest",
            "Gift From Ralis",
            "Rutelas Blessing",
            "Kakariko Graveyard Male Ant",
            "Kakariko Graveyard Grave Poe",
            "Kakariko Graveyard Open Poe",
            "Kakariko Graveyard Golden Wolf",
        ],
    },

];

const forestTempleZoneDataGlitchless: Zone[] = [
    {
        name: "Forest Temple Entrance",
        neighbors: [
            new ZoneNeighbor("North Faron Woods", fns.always),
            new ZoneNeighbor("Forest Temple Lobby", () => fns.canDefeatWalltula() && fns.canDefeatBokoblin() && fns.canBreakMonkeyCage()),
        ],
        checks: [
            "Forest Temple Entrance Vines Chest",
        ],
    },
    {
        name: "Forest Temple Lobby",
        neighbors: [
            new ZoneNeighbor("Forest Temple Entrance", fns.always),
            new ZoneNeighbor("Forest Temple East Wing", fns.always),
            // todo: key related settings?
            // https://github.com/zsrtp/Randomizer-Web-Generator/blob/b5ad864ba738a7daa3ccfe8f3076d2a906d6474d/Generator/World/Rooms/Dungeons/Forest%20Temple/Forest%20Temple%20Lobby.jsonc#L12C6-L12C17
            new ZoneNeighbor("Forest Temple West Wing", () => fns.canBurnWebs() && (fns.canDefeatBokoblin() || store.items.Clawshot >= 1)),
            // see above wrt key settings
            new ZoneNeighbor("Ook", () => store.items.Lantern && fns.canDefeatWalltula() && fns.canDefeatBokoblin() && fns.canBreakMonkeyCage()),
        ],
        checks: [
            "Forest Temple Central Chest Behind Stairs",
            "Forest Temple Central North Chest",
            "Forest Temple Central Chest Hanging From Web",
        ]
    },
    {
        name: "Forest Temple East Wing",
        neighbors: [
            new ZoneNeighbor("Forest Temple Lobby", fns.always),
            new ZoneNeighbor("Forest Temple North Wing", fns.always),
        ],
        checks: [
            "Forest Temple Second Monkey Under Bridge Chest",
            "Forest Temple Big Key Chest",
            "Forest Temple East Water Cave Chest"
        ],
    },
    {
        name: "Forest Temple West Wing",
        neighbors: [
            new ZoneNeighbor("Forest Temple Lobby", fns.always),
            new ZoneNeighbor("Ook", () => store.items.Boomerang),
        ],
        checks: [
            "Forest Temple West Deku Like Chest",
            "Forest Temple Totem Pole Chest",
            "Forest Temple West Tile Worm Room Vines Chest",
            "Forest Temple West Tile Worm Chest Behind Stairs",
            "Forest Temple Big Baba Key"
        ]
    },
    {
        name: "Ook",
        neighbors: [
            new ZoneNeighbor("Forest Temple West Wing", () => fns.canDefeatOok() && store.items.Boomerang),
        ],
        checks: ["Forest Temple Gale Boomerang"]
    },
    {
        name: "Forest Temple North Wing",
        neighbors: [
            new ZoneNeighbor("Forest Temple East Wing", fns.always),
            new ZoneNeighbor("Forest Temple Boss Room", () => store.items.Boomerang && (fns.canFreeAllMonkeys() || store.items.Clawshot >= 1)),
        ],
        checks: [
            "Forest Temple Windless Bridge Chest",
            "Forest Temple North Deku Like Chest",
            "Forest Temple East Tile Worm Chest",
        ]
    },
    {
        name: "Forest Temple Boss Room",
        neighbors: [
            new ZoneNeighbor("South Faron Woods", () => fns.canDefeatDiababa()),
        ],
        checks: [
            "Forest Temple Diababa Heart Container",
            "Forest Temple Dungeon Reward"
        ]
    }
];

const goronMinesZoneDataGlitchless: Zone[] = [
    {
        name: "Goron Mines Entrance",
        neighbors: [
            new ZoneNeighbor("Death Mountain Interiors", fns.always),
            new ZoneNeighbor("Goron Mines Magnet Room", () => store.items.IronBoots && fns.canBreakWoodenDoor()),
        ],
        checks: [
            "Goron Mines Entrance Chest",
        ]
    },
    {
        name: "Goron Mines Magnet Room",
        neighbors: [
            new ZoneNeighbor("Goron Mines Entrance", fns.always),
            // key related setting, we assume we have the key.
            new ZoneNeighbor("Goron Mines Lower West Wing", fns.always),
            // key related setting, we assume we have the key.
            new ZoneNeighbor("Goron Mines Crystal Switch Room", () => store.items.IronBoots),
        ],
        checks: [
            "Goron Mines Main Magnet Room Bottom Chest",
            "Goron Mines Main Magnet Room Top Chest",
        ]
    },
    {
        name: "Goron Mines Lower West Wing",
        neighbors: [new ZoneNeighbor("Goron Mines Magnet Room", fns.always)],
        checks: [
            "Goron Mines Magnet Maze Chest",
            "Goron Mines Gor Amato Chest",
            "Goron Mines Gor Amato Small Chest",
            "Goron Mines Gor Amato Key Shard",
        ],
    },
    {
        name: "Goron Mines Crystal Switch Room",
        neighbors: [
            new ZoneNeighbor("Goron Mines Magnet Room", fns.always),
            new ZoneNeighbor(
                "Goron Mines North Wing",
                // key related setting, we assume we have the key.
                () => (store.items.IronBoots && store.items.Sword > 0) || store.items.Bow > 0,
            )
        ],
        checks: [
            "Goron Mines Crystal Switch Room Underwater Chest",
            "Goron Mines Crystal Switch Room Small Chest",
            "Goron Mines After Crystal Switch Room Magnet Wall Chest"
        ]
    },
    {
        name: "Goron Mines North Wing",
        neighbors: [
            new ZoneNeighbor("Goron Mines Crystal Switch Room", fns.always),
            // key related setting, we assume we have the key.
            new ZoneNeighbor("Goron Mines Upper East Wing", fns.always),
            // key related setting, we assume we have the key.
            new ZoneNeighbor("Goron Mines Boss Room", () => store.items.Bow > 0 && store.items.IronBoots && fns.canDefeatBulbin())
        ],
        checks: [
            "Goron Mines Outside Beamos Chest",
            "Goron Mines Outside Underwater Chest",
            "Goron Mines Outside Clawshot Chest",
        ]
    },
    {
        name: "Goron Mines Upper East Wing",
        neighbors: [
            new ZoneNeighbor("Goron Mines Upper East Wing", fns.always),
            new ZoneNeighbor("Goron Mines Magnet Room", () => store.items.IronBoots && fns.canDefeatDangoro() && store.items.Bow > 0),
        ],
        checks: [
            "Goron Mines Gor Ebizo Chest",
            "Goron Mines Chest Before Dangoro",
            "Goron Mines Gor Ebizo Key Shard",
            "Goron Mines Dangoro Chest",
            "Goron Mines Beamos Room Chest",
            "Goron Mines Gor Liggs Chest",
            "Goron Mines Gor Liggs Key Shard"
        ]
    },
    {
        name: "Goron Mines Boss Room",
        neighbors: [
            new ZoneNeighbor("Kakariko Village", fns.canDefeatFyrus),
        ],
        checks: [
            "Goron Mines Fyrus Heart Container",
            "Goron Mines Dungeon Reward",
        ]
    },
];

export const zoneDataGlitchless: Zone[] = [
    // overworld
    ...ordonZoneDataGlitchless,
    ...faronZoneDataGlitchless,
    ...eldinZoneDataGlitchless,

    // dungeon time
    ...forestTempleZoneDataGlitchless,
    ...goronMinesZoneDataGlitchless,
];

export type Zones = { [x in ZoneId]: Zone; };

/**
 * 
 * @param {Zone[]} zoneData 
 * @returns {Object.<ZoneId, Zone>}
 */
function makeZones(zoneData: Zone[]): Zones {
    let output: Partial<Zones> = {};

    for (const zone of zoneData) {
        output[zone.name] = zone;
    }

    return output as unknown as Zones;
}

export const zonesGlitchless = makeZones(zoneDataGlitchless);

export function recalculateReachableZones(searchZones: Zones, start: ZoneId = "Ordon Province") {
    // An implementation of DFS
    let stack: ZoneId[] = [];
    stack.push(start);

    if (store.settings.randomizer.openMap && store.items.Crystal) {
        if (store.settings.randomizer.skip.faronTwilight) {
            stack.push("South Faron Woods");
            stack.push("North Faron Woods");
        }

        if (store.settings.randomizer.skip.eldinTwilight) {
            // todo:
        }
    }

    // things actually depend on being able to reach a zone, and we need to figure it out while we're calculating zones.
    store.logic.reachableZones = new Set();

    while (stack.length > 0) {
        const zone = stack.pop();
        // we want to check now instead of when iterating the neighbors because the first item could be the goal,
        // and if so I'd rataher not duplicate the check.

        if (typeof (zone) === 'undefined') {
            break;
        }

        if (store.logic.reachableZones.has(zone)) {
            continue;
        }

        store.logic.reachableZones.add(zone);

        for (const neighbor of searchZones[zone].neighbors) {
            if (neighbor.accessable) {
                stack.push(neighbor.name);
            }
        }
    }
}
