type LogicValue = "glitchless" | "glitched"
type FaronWoodsLogic = "open" | "closed"

export let settings = {
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
        faronWoodsLogic: "open" as FaronWoodsLogic,
    }
}
