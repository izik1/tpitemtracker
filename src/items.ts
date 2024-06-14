//set up how we want the item grid to be displayed by default
export var defaultItemGrid: ItemId[][] = [
    [
        "Rod",
        "Slingshot",
        "Lantern",
        "Boomerang",
        "IronBoots",
        "Bow"
    ],
    [
        "Bombs",
        "Hawkeye",
        "Clawshot",
        "Spinner",
        "Chainball",
        "Dominion"
    ],
    [
        "Bottle",
        "Renardos_Letter",
        "Invoice",
        "Wooden_Statue",
        "Ilias_Charm",
        "Horse_Call"
    ],
    [
        "Memo",
        "Sketch",
        "Crystal",
        "Sword",
        "Shield",
        "Wallet"
    ],
    [
        "Skybook",
        "Skills",
        "Bugs",
        "Soul",
        "ZoraArmor",
        "MagicArmor"
    ],
    [
        "WBombs",
        "YouthScent",
        "IliaScent",
        "PoeScent",
        "ReekfishScent",
        "MedicineScent"
    ],
    [
        "Vessel",
        "Boss1",
        "Boss2",
        "Boss3",
        "Boss4",
        "Boss5"
    ],
    [
        "Boss6",
        "Boss7",
        "Boss8",
        "Shadow",
        "Shard"
    ]
];

/**
 * @typedef {Object} Items
 * @property {number} Bow,
* @property {boolean} Chainball,
* @property {boolean} Slingshot,
* @property {boolean} Boomerang,
* @property {number} Bombs,
* @property {boolean} WBombs,
* @property {number} Rod,
* @property {boolean} Lantern,
* @property {boolean} Hawkeye,
* @property {boolean} Spinner,
* @property {boolean} Memo,
* @property {boolean} Sketch,
* @property {number} Skybook,
* @property {number} Dominion,
* @property {boolean} Renardos_Letter,
* @property {boolean} Invoice,
* @property {boolean} Wooden_Statue,
* @property {boolean} Ilias_Charm,
* @property {boolean} Horse_Call,
* @property {number} Bugs,
* @property {number} Bottle,
* @property {number} Wallet,
* @property {number} Sword,
* @property {number} Skills,
* @property {number} Shield,
* @property {number} Soul,
* @property {number} Vessel,
* @property {boolean} YouthScent,
* @property {boolean} IliaScent,
* @property {boolean} PoeScent,
* @property {boolean} ReekfishScent,
* @property {boolean} MedicineScent,
* @property {number} Shadow,
* @property {number} Shard,
* @property {boolean} Crystal,
* @property {boolean} ZoraArmor,
* @property {boolean} MagicArmor,
* @property {boolean} IronBoots,
* @property {boolean} Boss1,
* @property {boolean} Boss2,
* @property {boolean} Boss3,
* @property {boolean} Boss4,
* @property {boolean} Boss5,
* @property {boolean} Boss6,
* @property {boolean} Boss7,
* @property {boolean} Boss8,
* @property {boolean} blank,
 */


export type ItemId = keyof typeof baseItems;
// fixme: Replace with something that actually checks if its numeric
export type NumericItemId = keyof typeof itemsMin;

//for our progressive items, we want to set their minimum value
export const itemsMin = {
    Bow: 0,
    Bombs: 0,
    Clawshot: 0,
    Rod: 0,
    Bugs: 0,
    Bottle: 0,
    Sword: 0,
    Skills: 0,
    Shield: 0,
    Soul: 0,
    Wallet: 1,
    Shadow: 0,
    Shard: 0,
    Dominion: 0,
    Skybook: 0,
    Vessel: 0
};

// set default parameters for the items
export const baseItems = {
    Chainball: false,
    Slingshot: false,
    Boomerang: false,
    WBombs: false,
    Lantern: false,
    Hawkeye: false,
    Spinner: false,
    Memo: false,
    Sketch: false,
    Renardos_Letter: false,
    Invoice: false,
    Wooden_Statue: false,
    Ilias_Charm: false,
    Horse_Call: false,
    YouthScent: false,
    IliaScent: false,
    PoeScent: false,
    ReekfishScent: false,
    MedicineScent: false,
    Crystal: false,
    ZoraArmor: false,
    MagicArmor: false,
    IronBoots: false,

    Boss1: false,
    Boss2: false,
    Boss3: false,
    Boss4: false,
    Boss5: false,
    Boss6: false,
    Boss7: false,
    Boss8: false,

    blank: null,
    ...itemsMin,
};


//set how many of each item there is a maximum for
export const itemsMax: typeof itemsMin = {
    Bow: 3,
    Bombs: 4,
    Clawshot: 2,
    Rod: 2,
    Bugs: 24,
    Bottle: 4,
    Sword: 4,
    Skills: 7,
    Shield: 2,
    Soul: 60,
    Wallet: 3,
    Shadow: 4,
    Shard: 4,
    Dominion: 2,
    Skybook: 7,
    Vessel: 3
};

// idk whether or not to put them as progressive as the images allow or leave them number based.
// "Shard",
// "Shadow",
export type ProgressiveItemId = "Bow" | "Clawshot" | "Wallet" | "Rod" | "Sword" | "Shield" | "Dominion" | "Vessel";

type foo = "Foo";

function isNumber(value: any) {
    return typeof(value) === "number"
}

function isFoo(maybeFoo: string) {
    return new Set(["foo"]).has(maybeFoo);
}

export function isProgressiveItemId(itemId: ItemId) {
    return ["Bow", "Clawshot", "Wallet", "Rod", "Sword", "Shield", "Dominion", "Vessel"].includes(itemId);
}

export function isNumericItemId(itemId: ItemId): itemId is NumericItemId {
    return itemId in itemsMin;
}
