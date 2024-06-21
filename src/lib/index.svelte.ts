// place files you want to import through the `$lib` alias in this folder.

import type { CheckName } from "./logic/check-name";
import { checkStatus } from "./chests";
import { Set as ReactiveSet } from "svelte/reactivity";

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

export const toggleCheck = (set: ReactiveSet<CheckName>, c: CheckName) => {
    if (!set.delete(c)) {
        set.add(c);
    }
};

export const availableChecks = (
    checks: CheckName[],
    openedChecks: Set<CheckName>,
    completableChecks: Readonly<Set<CheckName>>
) => checks.reduce((total, it) => total + +(checkStatus(completableChecks, openedChecks, it) === "available"), 0);
