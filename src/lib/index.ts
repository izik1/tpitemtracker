// place files you want to import through the `$lib` alias in this folder.

import { writable, type Writable } from "svelte/store";
import type { CheckName } from "./logic/check-name";
import { checkStatus, type Group } from "./chests";
import type { LogicStore } from "./logic/index";
import { Set as ReactiveSet } from "svelte/reactivity";


export const openedChecks: ReactiveSet<CheckName> = new ReactiveSet();

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
    if (!openedChecks.delete(c)) {
        openedChecks.add(c);
    }
};

export const availableChecks = (
    checks: CheckName[],
    completableChecks: Readonly<Set<CheckName>>,
) => checks.reduce((total, it) => total + +(checkStatus(completableChecks, it) === "available"), 0);

