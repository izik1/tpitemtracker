import { writable } from 'svelte/store';
import localStore from './local-store.svelte';

export type LogicValue = "glitchless";
// export type LogicValue = "glitchless" | "glitched";


type FaronWoodsLogic = "open" | "closed";
// there are more types, but these are the only ones we care about, 
// and only for the unique overworld keys. (otherwise we just assume the key is accessable, we don't track that.
type KeyLogic = "keysy" | "vanilla";
type GoronMinesEntranceLogic = "closed" | "no-wrestling" | "open";

export const graphicalSettings = writable({
    taloMap: false,
    itemBoxes: true,
});

export interface RandomizerSettings {
    logic: LogicValue;
    skip: {
        prologue: boolean,
        faronTwilight: boolean,
        eldinTwilight: boolean,
        lanayruTwilight: boolean,
        mdh: boolean,
        lakebedEntrance: boolean,
        arbitersEntrance: boolean,
        snowpeakEntrance: boolean,
        cityEntrance: boolean,
    };
    itemPool: {
        npcGifts: boolean,
    };
    faronWoodsLogic: FaronWoodsLogic,
    openMap: boolean,
    smallKeys: KeyLogic,
    goronMinesLogic: GoronMinesEntranceLogic,
    increaseWalletCapacity: boolean,
}

export const defaultRandomizerSettings: RandomizerSettings = {
    logic: "glitchless" as LogicValue,
    skip: {
        prologue: false,
        faronTwilight: false,
        eldinTwilight: false,
        lanayruTwilight: false,
        mdh: false,
        lakebedEntrance: false,
        arbitersEntrance: false,
        snowpeakEntrance: false,
        cityEntrance: false,
    },
    itemPool: {
        npcGifts: false,
    },
    faronWoodsLogic: "closed" as FaronWoodsLogic,
    openMap: false,
    smallKeys: "vanilla" as KeyLogic,
    goronMinesLogic: "closed" as GoronMinesEntranceLogic,
    increaseWalletCapacity: false,
};

export const makeRandomizerSettings = () => {
    type JSONObject = {
        [x: string]: null | undefined | string | number | boolean | JSONObject;
    };

    // One of my greatest failings writing this was being unable to figure out how to make this even remotely type-safe.
    // Even "the output type is the same as the input type", or "the input type is an object-like-thing"
    const parseRecursive = (raw: JSONObject, defaultValue: any): any => {
        const output: Partial<any> = {};

        for (const [key, value] of Object.entries(defaultValue)) {
            if (!Object.hasOwn(raw, key)) {
                continue;
            }

            const rawTy = typeof (raw[key]);

            if (rawTy !== typeof (value)) {
                continue;
            }

            if (rawTy === "number" || rawTy === "string" || rawTy === "boolean") {
                output[key] = raw[key];
            }

            if (raw[key] !== null && typeof (raw[key]) === "object") {
                output[key] = parseRecursive(raw[key], value);
            } else {
                output[key] = raw[key];
            }
        }

        return { ...defaultValue, ...output };
    };

    let parse = (x: string) => {

        const raw: JSONObject = JSON.parse(x);

        return <RandomizerSettings> parseRecursive(raw, defaultRandomizerSettings);
    };

    return localStore("randomizerSettings", defaultRandomizerSettings, parse);
};
