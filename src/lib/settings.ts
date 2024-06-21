import { writable } from 'svelte/store';

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
