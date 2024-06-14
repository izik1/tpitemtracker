import { settings as defaultSettings } from "./settings";
import { baseItems } from "./items";
import { ZoneId } from "./logic/zone-id";
import { Logic } from "./logic/index";
import { CheckName } from "./logic/check-name";

export class Store {
    settings = defaultSettings;
    items = baseItems;
    openedChecks: Set<CheckName> = new Set();
    #lazyLogic: Logic | null = null;

    get logic() {
        if (this.#lazyLogic === null) {
            this.#lazyLogic = new Logic(this.settings.randomizer.logic);
        }

        return this.#lazyLogic;
    }

    set logic(value: Logic) {
        this.#lazyLogic = value;
    }
}

const store = new Store();

export default store;
