export type LogicValue = "glitchless" | "glitched";
type FaronWoodsLogic = "open" | "closed";
// there are more types, but these are the only ones we care about, 
// and only for the unique overworld keys. (otherwise we just assume the key is accessable, we don't track that.
type KeyLogic = "keysy" | "vanilla";
type GoronMinesEntranceLogic = "closed" | "no-wrestling" | "open";

export const settings = {
    taloMap: false,
    itemBoxes: true,
    randomizer: {
        logic: "glitchless" as LogicValue,
        skip: {
            prologue: false,
            faronTwilight: false,
            eldinTwilight: false,
            lanayruTwilight: false,
            mdh: false,
        },
        faronWoodsLogic: "closed" as FaronWoodsLogic,
        openMap: false,
        smallKeys: "vanilla" as KeyLogic,
        goronMinesLogic: "closed" as GoronMinesEntranceLogic,
    }
};
