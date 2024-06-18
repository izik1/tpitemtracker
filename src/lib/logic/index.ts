import { derived, type Readable } from 'svelte/store';

import { type ZoneId } from "./zone-id";
import { type LogicValue, randomizerSettings, type RandomizerSettings } from "../settings";
import { zonesGlitchless, zoneDataGlitchless, type Zone, recalculateReachableZones as calculateReachableZones, type Zones, } from "./zones";
import { checkIdsGlitchless, checkDataGlitchless, type CheckIds, Check } from "./checks";
import { type CheckName } from "./check-name";
import { baseItems, items } from '$lib/items';

export { checkIdsGlitchless, checkDataGlitchless } from "./checks";
export { zonesGlitchless, type Zones } from "./zones";


export type LogicStore = { settings: Readonly<RandomizerSettings>, reachableZones: Readonly<Set<ZoneId>>, items: Readonly<typeof baseItems>; };

function makeChecksToZones(zoneData: Zone[], checkIds: CheckIds): { [x: number]: ZoneId; } {
    const output: { [x: number]: ZoneId; } = {};
    for (const zone of zoneData) {
        for (const check of zone.checks) {
            output[checkIds[check]] = zone.name;
        }
    }

    return output;
};

export class Logic {
    readonly #checksToZones: ReturnType<typeof makeChecksToZones>;
    readonly #checkIds: CheckIds;
    readonly #checkData: Check[];
    readonly #zones: Zones;
    readonly kind: LogicValue;
    constructor(logic: LogicValue) {
        this.kind = logic;
        switch (logic) {
            case "glitchless":
                this.#checkIds = checkIdsGlitchless;
                this.#checkData = checkDataGlitchless;
                this.#checksToZones = makeChecksToZones(zoneDataGlitchless, checkIdsGlitchless);
                this.#zones = zonesGlitchless;

                break;
            // case "glitched":
            //     throw "Unimplemented glitched logic";
        }
    }

    get zones() {
        return this.#zones;
    }

    get checksToZones() {
        return this.#checksToZones;
    }
    get checkIds() {
        return this.#checkIds;
    }
    get checkData() {
        return this.#checkData;
    }

    // public checkCompletable(check: CheckName | number) {
    //     if (this.zonesDirty) {
    //         calculateReachableZones(this.#zones);
    //         this.zonesDirty = false;
    //     }

    //     if (typeof (check) === "string") {
    //         check = this.#checkIds[check];
    //     }

    //     // fixme: reuse this instead of calculating it for every check.
    //     return this.reachableZones.has(this.#checksToZones[check]) && this.#checkData[check].accessable;
    // }
}

export const logic: { [Property in LogicValue]: Logic; } = {
    glitchless: new Logic("glitchless")
};

export const reachableZones = derived([randomizerSettings, items], ([$rSettings, $items]) => {
    return calculateReachableZones(logic[$rSettings.logic].zones, $rSettings, $items);
});

export const logicStore: Readable<LogicStore> = derived(
    [randomizerSettings, reachableZones, items],
    ([$settings, $reachableZones, $items]) => ({ settings: $settings, reachableZones: $reachableZones, items: $items })
);

function checkCompletable(store: LogicStore, check: CheckName | number) {
    const { checkIds, checksToZones, checkData } = logic[store.settings.logic];

    if (typeof (check) === "string") {
        check = checkIds[check];
    }

    // fixme: reuse this instead of calculating it for every check.
    return store.reachableZones.has(checksToZones[check]) && checkData[check].accessable;

}

export const completableChecks = derived(logicStore, ($store) => {
    function* filterMap(iter: IterableIterator<[number, Check]>) {
        for (const [i, check] of iter) {
            if ($store.reachableZones.has(checksToZones[i]) && check.accessable($store)) {
                yield check.name;
            }
        }
    }

    const { checksToZones, checkData } = logic[$store.settings.logic];

    return new Set(filterMap(checkData.entries()));
});
