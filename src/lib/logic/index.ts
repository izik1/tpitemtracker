import { type ZoneId } from "./zone/id";
import { type LogicValue, type RandomizerSettings } from "../settings";
import { zoneNeighborsGlitchless, type ZoneNeighbors, } from "./zone/zones";
import { checkIdsGlitchless, checkDataGlitchless, type CheckIds, Check } from "./checks";
import { baseItems } from '$lib/items';
import { zoneData } from './zone/checks';

export { checkIdsGlitchless, checkDataGlitchless } from "./checks";
export { zoneNeighborsGlitchless as zonesGlitchless, type ZoneNeighbors } from "./zone/zones";

export type LogicStore = { settings: Readonly<RandomizerSettings>, reachableZones: Readonly<Set<ZoneId>>, items: Readonly<typeof baseItems>; };

function makeChecksToZones(checkIds: CheckIds): { [x: number]: ZoneId; } {
    const output: { [x: number]: ZoneId; } = {};

    for (const [zone, checks] of Object.entries(zoneData)) {
        for (const check of checks) {
            output[checkIds[check]] = zone as ZoneId;
        }
    }

    return output;
};

export class Logic {
    readonly #checksToZones: ReturnType<typeof makeChecksToZones>;
    readonly #checkIds: CheckIds;
    readonly #checkData: Check[];
    readonly #zones: ZoneNeighbors;
    readonly kind: LogicValue;
    constructor(logic: LogicValue) {
        this.kind = logic;
        switch (logic) {
            case "glitchless":
                this.#checkIds = checkIdsGlitchless;
                this.#checkData = checkDataGlitchless;
                this.#checksToZones = makeChecksToZones(checkIdsGlitchless);
                this.#zones = zoneNeighborsGlitchless;

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
}

export const logic: { [Property in LogicValue]: Logic; } = {
    glitchless: new Logic("glitchless")
};

export const makeCompletableChecks = ($store: LogicStore) => {
    function* filterMap(iter: IterableIterator<[number, Check]>) {
        for (const [i, check] of iter) {
            if ($store.reachableZones.has(checksToZones[i]) && check.accessable($store)) {
                yield check.name;
            }
        }
    }

    const { checksToZones, checkData } = logic[$store.settings.logic];

    return new Set(filterMap(checkData.entries()));
};
