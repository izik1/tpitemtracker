// https://stackoverflow.com/a/68785061

import { browser } from '$app/environment';
import type { Writable } from 'svelte/store';
import { writable, get } from 'svelte/store';
import { Set } from "svelte/reactivity";


const storage = <T>(key: string, initValue: T): Writable<T> => {
    const store = writable(initValue);
    if (!browser) return store;

    const storedValueStr = localStorage.getItem(key);
    if (storedValueStr != null) store.set(JSON.parse(storedValueStr));

    store.subscribe((val) => {
        if ([null, undefined].includes(val)) {
            localStorage.removeItem(key);
        } else {
            localStorage.setItem(key, JSON.stringify(val));
        }
    });

    window.addEventListener('storage', () => {
        const storedValueStr = localStorage.getItem(key);
        if (storedValueStr == null) return;

        const localValue: T = JSON.parse(storedValueStr);
        if (localValue !== get(store)) store.set(localValue);
    });

    return store;
};

export const setStorage = <T>(key: string, initValue: Set<T>): Writable<Set<T>> => {
    const parse = (v: string): Set<T> => new Set(JSON.parse(v));
    const stringify = (v: Set<T>) => JSON.stringify([...v]);

    const store = writable(initValue);
    if (!browser) return store;

    const storedValueStr = localStorage.getItem(key);
    if (storedValueStr != null) store.set(parse(storedValueStr));

    store.subscribe((val) => {
        if ([null, undefined].includes(val)) {
            localStorage.removeItem(key);
        } else {
            localStorage.setItem(key, stringify(val));
        }
    });

    window.addEventListener('storage', () => {
        const storedValueStr = localStorage.getItem(key);
        if (storedValueStr == null) return;

        const localValue: Set<T> = parse(storedValueStr);
        if (localValue !== get(store)) store.set(localValue);
    });

    return store;
};

export default storage;
