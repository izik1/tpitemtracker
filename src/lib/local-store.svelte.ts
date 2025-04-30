import { browser } from "$app/environment";
import { SvelteSet } from "svelte/reactivity";

export interface LocalStore<T> {
    value: T;
}

const localStore = <T,>(key: string, initValue: T, parse: (x: string) => T = JSON.parse, stringify: (x: T) => string = JSON.stringify): LocalStore<T> => {
    let value = $state(initValue);

    if (!browser) {
        return {
            get value() {
                return value;
            },
        };
    }

    // hack: this is needed to prevent hydration errors, is there a better way to do it?
    $effect(() => {
        const storedValueStr = localStorage.getItem(key);

        if (storedValueStr != null) {
            value = parse(storedValueStr);
        }
    });

    $effect(() => {
        if (value === null || typeof (value) === "undefined") {
            localStorage.removeItem(key);
        } else {
            localStorage.setItem(key, stringify(value));
        }
    });

    window.addEventListener("storage", (ev) => {
        if (ev.newValue === null) {
            return;
        }

        if (ev.key !== key) {
            return;
        }

        // we know this key was changed, due to the lack of `$state.is` the best we can do is guess that when this item changed it actually changed.

        // fixme: this is _really_ bad performance wise due to sometimes changing the value to the same value when multiple windows are open,
        // what'll happen is that Window A changes the value for real, Window B changes to that,
        // and then sets the storage to the same thing, and A sees it and goes "well, I'm gonna stop that here",
        // but B doesn't need to change it in the first place.

        if (ev.oldValue === ev.newValue) {
            // unfortunate case of "we know it changed in place, so let's break the cycle"
        }

        value = parse(ev.newValue);
    });

    return {
        get value() {
            return value;
        },
        set value(x) {
            value = x;
        }
    };
};

export const setStore = <T>(key: string, initValue: SvelteSet<T>): LocalStore<SvelteSet<T>> => {
    const parse = (v: string): SvelteSet<T> => new SvelteSet(JSON.parse(v));
    const stringify = (v: SvelteSet<T>) => JSON.stringify([...v]);

    let value = $state(initValue);

    if (!browser) {
        return {
            get value() {
                return value;
            },
        };
    }

    // hack: this is needed to prevent hydration errors, is there a better way to do it?
    $effect(() => {
        const storedValueStr = localStorage.getItem(key);

        if (storedValueStr != null) {
            value = parse(storedValueStr);
        }
    });

    $effect(() => {
        localStorage.setItem(key, stringify(value));
    });

    window.addEventListener("storage", (ev) => {
        if (ev.newValue === null) {
            return;
        }

        if (ev.key !== key) {
            return;
        }

        // we know this key was changed, due to the lack of `$state.is` the best we can do is guess that when this item changed it actually changed.

        // fixme: this is _really_ bad performance wise due to sometimes changing the value to the same value when multiple windows are open,
        // what'll happen is that Window A changes the value for real, Window B changes to that,
        // and then sets the storage to the same thing, and A sees it and goes "well, I'm gonna stop that here",
        // but B doesn't need to change it in the first place.

        if (ev.oldValue === ev.newValue) {
            // unfortunate case of "we know it changed in place, so let's break the cycle"
        }

        value = parse(ev.newValue);
    });

    return {
        get value() {
            return value;
        },
    };
};

export default localStore;
