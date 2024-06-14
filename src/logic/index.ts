import { type ZoneId } from "./zone-id";
import { type LogicValue } from "../settings";
import { zonesGlitchless, zoneDataGlitchless, type Zone, recalculateReachableZones, Zones, } from "./zones";
import { checkIdsGlitchless, checkDataGlitchless, type CheckIds, Check } from "./checks";
import store from "../store";
import { CheckName } from "./check-name";

export { checkIdsGlitchless, checkDataGlitchless } from "./checks";
export { zonesGlitchless, type Zones } from "./zones";


function makeChecksToZones(zoneData: Zone[], checkIds: CheckIds): { [x: number]: ZoneId; } {
    let output: { [x: number]: ZoneId; } = {};
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
    zonesDirty: boolean;
    reachableZones: Set<ZoneId> = new Set();
    constructor(logic: LogicValue) {
        this.zonesDirty = true;
        switch (logic) {
            case "glitchless":
                this.#checkIds = checkIdsGlitchless;
                this.#checkData = checkDataGlitchless;
                this.#checksToZones = makeChecksToZones(zoneDataGlitchless, checkIdsGlitchless);
                this.#zones = zonesGlitchless;

                break;
            case "glitched":
                throw "Unimplemented glitched logic";
        }
    }

    public checkCompletable(check: CheckName | number) {
        if (this.zonesDirty) {
            recalculateReachableZones(this.#zones);
            this.zonesDirty = false;
        }

        if (typeof (check) === "string") {
            check = this.#checkIds[check];
        }

        // fixme: reuse this instead of calculating it for every check.
        return this.reachableZones.has(this.#checksToZones[check]) && this.#checkData[check].accessable;
    }
}
