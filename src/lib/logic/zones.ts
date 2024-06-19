import { type EldinZoneId, type FaronZoneId, type ForestTempleZoneId, type GoronMinesZoneId, type OrdonaZoneId, type ZoneId } from "./zone-id";
import * as fns from "./logic-functions";
import { type CheckName } from "./check-name";
import type { baseItems } from "$lib/items";
import type { RandomizerSettings } from "$lib/settings";
import { reachableZones, type LogicStore } from "./index";


export class ZoneNeighbor {
    #name;
    readonly accessable;

    constructor(name: ZoneId, accessable: (store: LogicStore) => boolean) {
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
        // fixme: missing zone.
        new ZoneNeighbor("Outside Castle Town South", fns.never),
        // fixme: missing zone.
        new ZoneNeighbor("Kakariko Gorge", fns.always),
        // fixme: missing zone.
        new ZoneNeighbor("Lake Hylia Bridge", fns.never),
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
        new ZoneNeighbor("Temple of Time Entrance", store => store.items.Sword >= 3)
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
    "Hidden Village": [new ZoneNeighbor("Lanayru Field", fns.never)],
    "Eldin Field Bomskit Grotto": [new ZoneNeighbor("Eldin Field", fns.always)],
    "Eldin Field Stalfos Grotto": [new ZoneNeighbor("Eldin Field", fns.always)],
    "Eldin Field Water Bomb Fish Grotto": [new ZoneNeighbor("Eldin Field", fns.always)],
    "Eldin Field": [
        new ZoneNeighbor("Kakariko Gorge", fns.canSmash),
        new ZoneNeighbor("Kakariko Village", fns.always),
        new ZoneNeighbor("Goron Stockcave", store => store.items.Clawshot > 0),
        new ZoneNeighbor("Castle Town", fns.never),
        new ZoneNeighbor("Lanayru Field", fns.never),
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
            fns.never,
            // store => fns.canUseWaterBombs()
            //     && (store.items.IronBoots || store.items.ZoraArmor)
            //     && (store.items.GateKeys || store.settings.smallKeys === "keysy"),
        ),
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

    // dungeon time
    ...zoneNeighborsForestTempleGlitchless,
    ...zoneNeighborsGoronMinesGlitchless,
};

export function calculateReachableZones(searchZones: Record<ZoneId, ZoneNeighbor[]>, settings: RandomizerSettings, items: typeof baseItems, start: ZoneId = "Ordon Province") {
    // An implementation of DFS
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

    while (stack.length > 0) {
        const zone = stack.pop();
        // we want to check now instead of when iterating the neighbors because the first item could be the goal,
        // and if so I'd rataher not duplicate the check.

        if (typeof (zone) === 'undefined') {
            break;
        }

        if (fakeStore.reachableZones.has(zone)) {
            continue;
        }

        fakeStore.reachableZones.add(zone);

        for (const neighbor of searchZones[zone]) {
            if (neighbor.accessable(fakeStore)) {
                stack.push(neighbor.name);
            }
        }
    };


    return fakeStore.reachableZones;
}
