import type { ZoneId } from "./zone/id";
import type { LogicValue, RandomizerSettings } from "../settings";
import { zoneNeighborsGlitchless, type ZoneNeighbors, } from "./zone/zones";
import { checkIds, type Accessable, checkAccessibilityGlitchless, checkNames } from "./checks";
import { baseItems } from '$lib/items';
import zoneChecks from './zone/checks';

export { checkIds, checkKinds, checkNames } from "./checks";
export { zoneNeighborsGlitchless as zonesGlitchless, type ZoneNeighbors } from "./zone/zones";

export type LogicStore = { settings: Readonly<RandomizerSettings>, reachableZones: Readonly<Set<ZoneId>>, items: Readonly<typeof baseItems>; };

function makeChecksToZones(): { [x: number]: ZoneId; } {
    const output: { [x: number]: ZoneId; } = {};

    for (const [zone, checks] of Object.entries(zoneChecks)) {
        for (const check of checks) {
            output[checkIds[check]] = zone as ZoneId;
        }
    }

    return output;
};

const checksToZones = makeChecksToZones();

export class Logic {
    readonly #zones: ZoneNeighbors;
    readonly #checkAccessibility: Accessable[];
    readonly kind: LogicValue;
    constructor(logic: LogicValue) {
        this.kind = logic;
        switch (logic) {
            case "glitchless":
                this.#checkAccessibility = checkAccessibilityGlitchless;
                this.#zones = zoneNeighborsGlitchless;

                break;
            // case "glitched":
            //     throw "Unimplemented glitched logic";
        }
    }

    get zones() {
        return this.#zones;
    }

    get checkAccessibility() {
        return this.#checkAccessibility;
    }
}

export const logic: { [Property in LogicValue]: Logic; } = {
    glitchless: new Logic("glitchless")
};

export const makeCompletableChecks = ($store: LogicStore) => {
    const checkAccessibility = logic[$store.settings.logic].checkAccessibility;

    function* filterMap(iter: IterableIterator<[number, Accessable]>) {
        for (const [i, check] of iter) {
            if ($store.reachableZones.has(checksToZones[i]) && check($store)) {
                yield checkNames[i];
            }
        }
    }

    return new Set(filterMap(checkAccessibility.entries()));
};
