import { type EldinZoneId, type FaronZoneId, type ForestTempleZoneId, type GoronMinesZoneId, type LanayruZoneId, type OrdonaZoneId, type ZoneId } from "./id";
import * as fns from "../logic-functions";
import { type LogicStore } from "../index";
import type { RandomizerSettings } from "$lib/settings";
import type { baseItems } from "$lib/items";

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

const zoneNeighborsOrdonaGlitchless: Record<OrdonaZoneId, ZoneNeighbor[]> = {
    "Ordon Province": [
        new ZoneNeighbor("Ordon Ranch Grotto", store => fns.canCompletePrologue(store) && store.items.Crystal),
        new ZoneNeighbor("South Faron Woods", ({ settings, items }) => (items.Sword > 0 && items.Slingshot) || settings.skip.prologue),
    ],
    "Ordon Ranch Grotto": [
        new ZoneNeighbor("Ordon Province", fns.always),
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
