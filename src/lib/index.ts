// place files you want to import through the `$lib` alias in this folder.

import { writable, type Writable } from "svelte/store";
import type { CheckName } from "./logic/check-name";
import { checkStatus, type Group } from "./chests";
import type { LogicStore } from "./logic";

export const openedChecks: Writable<Set<CheckName>> = writable(new Set());


export type Image = {
    sources: {
        avif: string;
        webp: string;
        png: string;
    };
    img: {
        src: string;
        w: number;
        h: number;
    };
};

export const itemImages = import.meta.glob<Image>('$lib/assets/Items/*.webp', {
    query: { enhanced: true },
    import: 'default',
    eager: true
});

export const toggleCheck = (c: CheckName) => {
    openedChecks.update((value) => {
        if (!value.delete(c)) {
            value.add(c);
        }

        return value;
    });
};

export const availableChecks = (
    checks: CheckName[],
    completableChecks: Readonly<Set<CheckName>>,
    opened: Readonly<Set<CheckName>>,
) => checks.reduce((total, it) => total + +(checkStatus(completableChecks, opened, it) === "available"), 0);

