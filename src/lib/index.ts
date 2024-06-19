// place files you want to import through the `$lib` alias in this folder.

import type { CheckName } from "./logic/check-name";
import { checkStatus } from "./chests";
import { setStorage } from "./store";
import { Set as ReactiveSet } from "svelte/reactivity";

export const openedChecks = setStorage<CheckName>("openedChecks", new ReactiveSet());

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
    openedChecks.update((set) => {
        if (!set.delete(c)) {
            set.add(c);
        }

        return set;
    });

};

export const availableChecks = (
    checks: CheckName[],
    openedChecks: Set<CheckName>,
    completableChecks: Readonly<Set<CheckName>>
) => checks.reduce((total, it) => total + +(checkStatus(completableChecks, openedChecks, it) === "available"), 0);

