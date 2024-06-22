import { browser } from "$app/environment";
import { Set } from "svelte/reactivity";

export interface LocalStore<T> {
    readonly value: T;
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
            value = JSON.parse(storedValueStr);
        }
    });

    $effect(() => {
        if ([null, undefined].includes(value)) {
            localStorage.removeItem(key);
        } else {
            localStorage.setItem(key, JSON.stringify(value));
        }
    });

    window.addEventListener("storage", () => {
        const storedValueStr = localStorage.getItem(key);
        if (storedValueStr === null) {
            return;
        }

        const localValue: T = JSON.parse(storedValueStr);
        if ($state.is(value, localValue)) {
            value = localValue;
        }
    });

    return {
        get value() {
            return value;
        },
    };
};

export const setStore = <T>(key: string, initValue: Set<T>): LocalStore<Set<T>> => {
    const parse = (v: string): Set<T> => new Set(JSON.parse(v));
    const stringify = (v: Set<T>) => JSON.stringify([...v]);

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
        if ([null, undefined].includes(value)) {
            localStorage.removeItem(key);
        } else {
            localStorage.setItem(key, stringify(value));
        }
    });

    window.addEventListener("storage", () => {
        const storedValueStr = localStorage.getItem(key);
        if (storedValueStr === null) {
            return;
        }

        const localValue: Set<T> = parse(storedValueStr);
        if ($state.is(value, localValue)) {
            value = localValue;
        }
    });

    return {
        get value() {
            return value;
        },
    };
};

export default localStore;
