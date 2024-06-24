import type { ZoneId } from "./id";
import * as fns from "../logic-functions";
import type { LogicStore } from "../index";
import type { RandomizerSettings } from "$lib/settings";
import type { baseItems } from "$lib/items";
import type { Regions } from "../region";

export class ZoneNeighbor {
    #name;
    readonly accessable;

    constructor(name: ZoneId, accessable: (store: LogicStore) => boolean | null) {
        this.#name = name;
        this.accessable = accessable;
    }

    static always(name: ZoneId) {
        return new ZoneNeighbor(name, fns.always);
    }

    get name() {
        return this.#name;
    }
}

// This is literally copied from zsrtp/Randomizer-Web-Generator with minimal differences.
// After all, what better place to get the logic from than the logic itself.

const regionsGlitchless: Regions<"zones", ZoneNeighbor[]> = {
    ordon: {
        "Ordon Province": [
            new ZoneNeighbor("Ordon Ranch Grotto", store => fns.canCompletePrologue(store) && store.items.Crystal),
            new ZoneNeighbor("South Faron Woods", ({ settings, items }) => (items.Sword > 0 && items.Slingshot) || settings.skip.prologue),
        ],
        "Ordon Ranch Grotto": [
            ZoneNeighbor.always("Ordon Province"),
        ],
    },
    faron: {
        "South Faron Woods": [
            ZoneNeighbor.always("Ordon Province"),
            new ZoneNeighbor("Faron Field", fns.canClearForest),
            ZoneNeighbor.always("South Faron Woods Cave"),
            new ZoneNeighbor("Faron Mist Area", store => fns.canSmash(store) && store.items.Dominion >= 2 && store.items.Crystal && fns.canClearForest(store)),
        ],
        "South Faron Woods Cave": [
            new ZoneNeighbor("South Faron Woods", store => fns.canBurnWebs(store) || store.items.Crystal || store.settings.skip.prologue),
            new ZoneNeighbor("Faron Mist Area", store => fns.canBurnWebs(store) || store.items.Crystal || store.settings.skip.prologue),
        ],
        "Faron Mist Area": [
            ZoneNeighbor.always("South Faron Woods Cave"),
            new ZoneNeighbor("Faron Mist Cave", store => store.items.Lantern),
            new ZoneNeighbor("North Faron Woods", store => fns.canCompletePrologue(store) && (store.items.Lantern || store.items.Crystal)),
        ],
        "Faron Mist Cave": [
            ZoneNeighbor.always("Faron Mist Area"),
        ],
        "North Faron Woods": [
            ZoneNeighbor.always("Faron Mist Area"),
            ZoneNeighbor.always("Forest Temple Entrance"),
            new ZoneNeighbor("Lost Woods", store => store.items.Crystal),
        ],
        "Faron Field": [
            ZoneNeighbor.always("South Faron Woods"),
            new ZoneNeighbor("Outside Castle Town South", (store) => {
                if (!fns.hasBottle(store)) {
                    return false;
                }

                if (fns.canSmash(store)) {
                    return true;
                }

                return ((store.items.GateKeys || store.settings.smallKeys === "keysy") && (store.items.Crystal || store.settings.skip.lanayruTwilight));
            }),
            ZoneNeighbor.always("Kakariko Gorge"),
            new ZoneNeighbor("Lake Hylia Bridge", (store) => {
                if (fns.canSmash(store)) {
                    return true;
                }

                return ((store.items.GateKeys || store.settings.smallKeys === "keysy") && (store.items.Crystal || store.settings.skip.lanayruTwilight));
            }),
            new ZoneNeighbor("Faron Field Corner Grotto", store => store.items.Crystal),
        ],
        "Faron Field Corner Grotto": [
            ZoneNeighbor.always("Faron Field"),
        ],
        "Lost Woods": [
            ZoneNeighbor.always("North Faron Woods"),
            new ZoneNeighbor(
                "Sacred Grove Master Sword",
                // ToT entrance settings for alt.
                store => (fns.canDefeatSkullKid(store) && store.items.Crystal),
            )
        ],
        "Sacred Grove Baba Serpent Grotto": [ZoneNeighbor.always("Lost Woods")],
        "Sacred Grove Master Sword": [
            ZoneNeighbor.always("Lost Woods"),
            new ZoneNeighbor(
                "Sacred Grove Temple of Time",
                // ToT entrance settings.
                store => (fns.canDefeatShadowBeast(store) && store.items.Sword >= 3),
            ),
            new ZoneNeighbor(
                "Sacred Grove Baba Serpent Grotto",
                store => fns.canSmash(store) && store.items.Crystal
            )
        ],
        "Sacred Grove Temple of Time": [
            ZoneNeighbor.always("Sacred Grove Master Sword"),
            // ToT entrance settings.
            new ZoneNeighbor("Temple of Time Entrance", store => store.items.Sword >= 3)
        ],
    },
    eldin: {
        "Hidden Village": [ZoneNeighbor.always("Lanayru Field")],
        "Eldin Field Bomskit Grotto": [ZoneNeighbor.always("Eldin Field")],
        "Eldin Field Stalfos Grotto": [ZoneNeighbor.always("Eldin Field")],
        "Eldin Field Water Bomb Fish Grotto": [ZoneNeighbor.always("Eldin Field")],
        "Eldin Field": [
            new ZoneNeighbor("Kakariko Gorge", fns.canSmash),
            ZoneNeighbor.always("Kakariko Village"),
            new ZoneNeighbor("Goron Stockcave", store => store.items.Clawshot > 0),
            new ZoneNeighbor("Castle Town", (store) => {
                if (fns.canSmash(store)) {
                    return true;
                }

                return ((store.items.GateKeys || store.settings.smallKeys === "keysy") && (store.items.Crystal || store.settings.skip.lanayruTwilight));
            }),
            new ZoneNeighbor("Lanayru Field", fns.canSmash),
            new ZoneNeighbor("Eldin Field Water Bomb Fish Grotto", store => store.items.Crystal),
            new ZoneNeighbor("Eldin Field Bomskit Grotto", store => store.items.Crystal),
            new ZoneNeighbor(
                "Eldin Field Stalfos Grotto",
                // the smash requirement feels redundant, but, shrug.
                store => store.items.Crystal
                    && store.items.Spinner
                    && (fns.canSmash(store) || store.settings.skip.lanayruTwilight || store.items.Crystal)
                    && (store.items.GateKeys || store.settings.smallKeys === "keysy")
            ),
        ],
        "Eldin Long Cave": [ZoneNeighbor.always("Kakariko Gorge")],
        "Goron Stockcave": [ZoneNeighbor.always("Eldin Field")],
        "Kakariko Gorge": [
            new ZoneNeighbor("Eldin Field", fns.canSmash),
            ZoneNeighbor.always("Faron Field"),
            ZoneNeighbor.always("Kakariko Village"),
            new ZoneNeighbor("Eldin Long Cave", fns.canSmash),
        ],
        "Death Mountain Interiors": [
            ZoneNeighbor.always("Death Mountain Volcano"),
            new ZoneNeighbor(
                "Goron Mines Entrance",
                store => store.items.IronBoots || store.settings.goronMinesLogic !== "closed"
            ),
        ],
        "Death Mountain Trail": [
            ZoneNeighbor.always("Kakariko Village"),
            new ZoneNeighbor("Death Mountain Volcano", store => store.items.IronBoots || store.items.Crystal),
        ],
        "Death Mountain Volcano": [
            ZoneNeighbor.always("Death Mountain Trail"),
            new ZoneNeighbor(
                "Death Mountain Interiors",
                store => store.items.IronBoots && (fns.canDefeatGoron(store) || store.settings.goronMinesLogic === "open")
            )
        ],
        "Kakariko Village": [
            ZoneNeighbor.always("Kakariko Gorge"),
            ZoneNeighbor.always("Eldin Field"),
            ZoneNeighbor.always("Death Mountain Trail"),
            new ZoneNeighbor(
                "Lake Hylia",
                (store) => fns.canUseWaterBombs(store)
                    && (store.items.IronBoots || store.items.ZoraArmor)
                    && (store.items.GateKeys || store.settings.smallKeys === "keysy"),
            ),
        ],
    },
    lanayru: {
        "Castle Town": [
            ZoneNeighbor.always("Outside Castle Town West"),
            ZoneNeighbor.always("Eldin Field"),
            ZoneNeighbor.always("Outside Castle Town South"),
            new ZoneNeighbor("Hyrule Castle Entrance", fns.never),
        ],
        "Lake Hylia Bridge Bubble Grotto": [ZoneNeighbor.always("Lake Hylia Bridge")],
        "Lake Hylia Bridge": [
            new ZoneNeighbor("Faron Field", (store) => store.items.GateKeys || store.settings.smallKeys === "keysy"),
            ZoneNeighbor.always("Lake Hylia"),
            new ZoneNeighbor("Lanayru Field", fns.canSmash),
            ZoneNeighbor.always("Outside Castle Town West"),
            new ZoneNeighbor("Lake Hylia Bridge Bubble Grotto", (store) => store.items.Crystal && fns.canLaunchBombs(store) && store.items.Clawshot > 0),
        ],
        "Lanayru Field Poe Grotto": [
            ZoneNeighbor.always("Lanayru Field"),
        ],
        "Lanayru Field Skulltula Grotto": [
            ZoneNeighbor.always("Lanayru Field"),
        ],
        "Lanayru Field": [
            new ZoneNeighbor("Eldin Field", fns.canSmash),
            new ZoneNeighbor("Zoras Domain", fns.canSmash),
            ZoneNeighbor.always("Outside Castle Town West"),
            new ZoneNeighbor("Lanayru Ice Puzzle Cave", fns.canSmash),
            new ZoneNeighbor("Lake Hylia Bridge", fns.canSmash),
            new ZoneNeighbor("Hidden Village", (store) => store.items.Wooden_Statue),
            new ZoneNeighbor("Lanayru Field Skulltula Grotto", (store) => store.items.Crystal),
            new ZoneNeighbor("Lanayru Field Poe Grotto", (store) => store.items.Crystal),
        ],
        "Lanayru Ice Puzzle Cave": [
            ZoneNeighbor.always("Lanayru Field"),
        ],
        "Outside Castle Town South": [
            ZoneNeighbor.always("Castle Town"),
            ZoneNeighbor.always("Faron Field"),
            new ZoneNeighbor("Outside South Castle Town Tektite Grotto", (store) => store.items.Crystal),
            ZoneNeighbor.always("Lake Hylia"),
        ],
        "Outside Castle Town West": [
            ZoneNeighbor.always("Lake Hylia Bridge"),
            ZoneNeighbor.always("Lanayru Field"),
            ZoneNeighbor.always("Castle Town"),
            new ZoneNeighbor("West Hyrule Field Helmasaur Grotto", (store) => store.items.Crystal && store.items.Clawshot > 0),
        ],
        "Outside South Castle Town Tektite Grotto": [
            ZoneNeighbor.always("Outside Castle Town South"),
        ],
        "West Hyrule Field Helmasaur Grotto": [
            ZoneNeighbor.always("Outside Castle Town West")
        ],
        "Lake Hylia Long Cave": [
            ZoneNeighbor.always("Lake Hylia"),
        ],
        "Lake Hylia Shell Blade Grotto": [
            ZoneNeighbor.always("Lake Hylia"),
        ],
        "Lake Hylia Water Toadpoli Grotto": [
            ZoneNeighbor.always("Lake Hylia"),
        ],
        "Lake Hylia": [
            new ZoneNeighbor("Gerudo Desert", ({ items }) => items.Memo),
            new ZoneNeighbor("Lake Hylia Long Cave", fns.canSmash),
            new ZoneNeighbor("Lake Hylia Water Toadpoli Grotto", (store) => store.items.Crystal),
            new ZoneNeighbor("Lake Hylia Shell Blade Grotto", (store) => store.items.Crystal),
            new ZoneNeighbor(
                "Lakebed Temple Entrance",
                (store) => store.items.ZoraArmor &&
                    ((store.items.IronBoots && fns.canUseWaterBombs(store)) || store.settings.skip.lakebedEntrance)
            ),
            new ZoneNeighbor("City in The Sky Entrance", fns.never),
            ZoneNeighbor.always("Lake Hylia Bridge"),
            new ZoneNeighbor("Zoras Domain", (store) => store.items.Crystal),
        ],
        "Zoras Domain": [
            ZoneNeighbor.always("Lanayru Field"),
            ZoneNeighbor.always("Snowpeak Climb"),
        ],
    },
    gerudo: {
        "Gerudo Desert": [
            new ZoneNeighbor("Cave of Ordeals Floors 01-11", store => fns.canDefeatShadowBeast(store) && store.items.Clawshot > 0),
            new ZoneNeighbor("Bulblin Camp", fns.canDefeatBulblin),
            new ZoneNeighbor("Gerudo Desert Rock Grotto", ({ items }) => items.Crystal && items.Clawshot > 0),
            new ZoneNeighbor("Gerudo Desert Skulltula Grotto", ({ items }) => items.Crystal),
        ],
        "Gerudo Desert Rock Grotto": [ZoneNeighbor.always("Gerudo Desert")],
        "Gerudo Desert Skulltula Grotto": [ZoneNeighbor.always("Gerudo Desert")],
        "Bulblin Camp": [
            ZoneNeighbor.always("Gerudo Desert"),
            new ZoneNeighbor(
                "Outside Arbiters Grounds",
                (store) => store.settings.skip.arbitersEntrance || (
                    // fixme: Camp Key
                    fns.canDefeatKingBulbinDesert(store) && (store.settings.smallKeys === "keysy")
                )
            ),
        ],
        "Outside Arbiters Grounds": [
            ZoneNeighbor.always("Bulblin Camp"),
            ZoneNeighbor.always("Arbiters Grounds Entrance"),
        ],
        "Mirror Chamber": [
            ZoneNeighbor.always("Arbiters Grounds Boss Room"),
            new ZoneNeighbor("Palace of Twilight Entrance", fns.never),
        ],
        "Cave of Ordeals Floors 01-11": [
            new ZoneNeighbor("Gerudo Desert", ({ items }) => items.Clawshot > 0),
            new ZoneNeighbor(
                "Cave of Ordeals Floors 12-21",
                (store) => fns.canDefeatBokoblin(store)
                    && fns.canDefeatKeese(store)
                    && fns.canDefeatRat(store)
                    && fns.canDefeatBabaSerpent(store)
                    && fns.canDefeatSkulltula(store)
                    && fns.canDefeatBulblin(store)
                    && fns.canDefeatTorchSlug(store)
                    && fns.canDefeatFireKeese(store)
                    && fns.canDefeatDodongo(store)
                    && fns.canDefeatTektite(store)
                    && fns.canDefeatLizalfos(store)
            )
        ],
        "Cave of Ordeals Floors 12-21": [
            new ZoneNeighbor("Ordon Province", ({ items }) => items.Clawshot > 0),
            new ZoneNeighbor(
                "Cave of Ordeals Floors 22-31",
                (store) => fns.canDefeatHelmasaur(store)
                    && fns.canDefeatRat(store)
                    && store.items.Spinner
                    && fns.canDefeatChu(store)
                    && fns.canDefeatChuWorm(store)
                    && fns.canDefeatBubble(store)
                    && fns.canDefeatBulblin(store)
                    && fns.canDefeatKeese(store)
                    && fns.canDefeatRat(store)
                    && fns.canDefeatStalhound(store)
                    && fns.canDefeatPoe(store)
                    && fns.canDefeatLeever(store)
            )
        ],
        "Cave of Ordeals Floors 22-31": [
            new ZoneNeighbor("South Faron Woods", ({ items }) => items.Clawshot > 0),
            new ZoneNeighbor("Cave of Ordeals Floors 32-41",
                (store) => fns.canDefeatBokoblin(store)
                    && fns.canDefeatIceKeese(store)
                    && store.items.Chainball
                    && fns.canDefeatKeese(store)
                    && fns.canDefeatRat(store)
                    && fns.canDefeatGhoulRat(store)
                    && fns.canDefeatStalchild(store)
                    && fns.canDefeatRedeadKnight(store)
                    && fns.canDefeatBulblin(store)
                    && fns.canDefeatStalfos(store)
                    && fns.canDefeatSkulltula(store)
                    && fns.canDefeatBubble(store)
                    && fns.canDefeatLizalfos(store)
                    && fns.canDefeatFireBubble(store),
            )
        ],
        "Cave of Ordeals Floors 32-41": [
            new ZoneNeighbor("Kakariko Village", ({ items }) => items.Clawshot > 0),
            new ZoneNeighbor(
                "Cave of Ordeals Floors 42-50",
                (store) => fns.canDefeatBeamos(store)
                    && fns.canDefeatKeese(store)
                    && store.items.Dominion >= 2
                    && fns.canDefeatTorchSlug(store)
                    && fns.canDefeatFireKeese(store)
                    && fns.canDefeatDodongo(store)
                    && fns.canDefeatFireBubble(store)
                    && fns.canDefeatRedeadKnight(store)
                    && fns.canDefeatPoe(store)
                    && fns.canDefeatGhoulRat(store)
                    && fns.canDefeatChu(store)
                    && fns.canDefeatIceKeese(store)
                    && fns.canDefeatFreezard(store)
                    && fns.canDefeatChilfos(store)
                    && fns.canDefeatIceBubble(store)
                    && fns.canDefeatLeever(store)
                    && fns.canDefeatDarknut(store)
            )
        ],
        "Cave of Ordeals Floors 42-50": [
            new ZoneNeighbor(
                "Lake Hylia",
                (store) => fns.canDefeatArmos(store)
                    && store.items.Clawshot >= 2
                    && fns.canDefeatBokoblin(store)
                    && fns.canDefeatBabaSerpent(store)
                    && fns.canDefeatLizalfos(store)
                    && fns.canDefeatBulblin(store)
                    && fns.canDefeatDinalfos(store)
                    && fns.canDefeatPoe(store)
                    && fns.canDefeatRedeadKnight(store)
                    && fns.canDefeatChu(store)
                    && fns.canDefeatFreezard(store)
                    && fns.canDefeatChilfos(store)
                    && fns.canDefeatGhoulRat(store)
                    && fns.canDefeatRat(store)
                    && fns.canDefeatStalchild(store)
                    && fns.canDefeatAeralfos(store)
                    && fns.canDefeatDarknut(store)
            )
        ],
    },
    snowpeak: {
        "Snowpeak Climb": [
            ZoneNeighbor.always("Zoras Domain"),
            new ZoneNeighbor("Snowpeak Summit", ({ settings, items }) => (items.Rod >= 2 || settings.skip.snowpeakEntrance) && items.Crystal),
            new ZoneNeighbor("Snowpeak Freezard Grotto", ({ settings, items }) => (items.Rod >= 2 || settings.skip.snowpeakEntrance) && items.Crystal),
        ],
        "Snowpeak Freezard Grotto": [
            ZoneNeighbor.always("Snowpeak Climb"),
        ],
        "Snowpeak Summit": [
            new ZoneNeighbor("Snowpeak Climb", ({ items }) => items.Crystal),
            // fixme: bonks do damage settings
            new ZoneNeighbor("Snowpeak Ruins Entrance", fns.canDefeatShadowBeast),
        ]
    },

    forestTemple: {
        "Forest Temple Entrance": [
            ZoneNeighbor.always("North Faron Woods"),
            new ZoneNeighbor("Forest Temple Lobby", store => fns.canDefeatWalltula(store) && fns.canDefeatBokoblin(store) && fns.canBreakMonkeyCage(store)),
        ],
        "Forest Temple Lobby": [
            ZoneNeighbor.always("Forest Temple Entrance"),
            ZoneNeighbor.always("Forest Temple East Wing"),
            // todo: key related settings?
            // https://github.com/zsrtp/Randomizer-Web-Generator/blob/b5ad864ba738a7daa3ccfe8f3076d2a906d6474d/Generator/World/Rooms/Dungeons/Forest%20Temple/Forest%20Temple%20Lobby.jsonc#L12C6-L12C17
            new ZoneNeighbor("Forest Temple West Wing", store => fns.canBurnWebs(store) && (fns.canDefeatBokoblin(store) || store.items.Clawshot >= 1)),
            // see above wrt key settings
            new ZoneNeighbor("Ook", store => store.items.Lantern && fns.canDefeatWalltula(store) && fns.canDefeatBokoblin(store) && fns.canBreakMonkeyCage(store)),
        ],
        "Forest Temple East Wing": [
            ZoneNeighbor.always("Forest Temple Lobby"),
            ZoneNeighbor.always("Forest Temple North Wing"),
        ],
        "Forest Temple West Wing": [
            ZoneNeighbor.always("Forest Temple Lobby"),
            new ZoneNeighbor("Ook", store => store.items.Boomerang),
        ],
        "Ook": [
            new ZoneNeighbor("Forest Temple West Wing", store => fns.canDefeatOok(store) && store.items.Boomerang),
        ],
        "Forest Temple North Wing": [
            ZoneNeighbor.always("Forest Temple East Wing"),
            new ZoneNeighbor("Forest Temple Boss Room", store => store.items.Boomerang && (fns.canFreeAllMonkeys(store) || store.items.Clawshot >= 1)),
        ],
        "Forest Temple Boss Room": [
            new ZoneNeighbor("South Faron Woods", store => fns.canDefeatDiababa(store)),
        ],
    },
    goronMines: {
        "Goron Mines Entrance": [
            ZoneNeighbor.always("Death Mountain Interiors"),
            new ZoneNeighbor("Goron Mines Magnet Room", store => store.items.IronBoots && fns.canBreakWoodenDoor(store)),
        ],
        "Goron Mines Magnet Room": [
            ZoneNeighbor.always("Goron Mines Entrance"),
            // key related setting, we assume we have the key.
            ZoneNeighbor.always("Goron Mines Lower West Wing"),
            // key related setting, we assume we have the key.
            new ZoneNeighbor("Goron Mines Crystal Switch Room", store => store.items.IronBoots),
        ],
        "Goron Mines Lower West Wing": [ZoneNeighbor.always("Goron Mines Magnet Room")],
        "Goron Mines Crystal Switch Room": [
            ZoneNeighbor.always("Goron Mines Magnet Room"),
            new ZoneNeighbor(
                "Goron Mines North Wing",
                // key related setting, we assume we have the key.
                store => (store.items.IronBoots && store.items.Sword > 0) || store.items.Bow > 0,
            )
        ],
        "Goron Mines North Wing": [
            ZoneNeighbor.always("Goron Mines Crystal Switch Room"),
            // key related setting, we assume we have the key.
            ZoneNeighbor.always("Goron Mines Upper East Wing"),
            // key related setting, we assume we have the key.
            new ZoneNeighbor("Goron Mines Boss Room", store => store.items.Bow > 0 && store.items.IronBoots && fns.canDefeatBulblin(store))
        ],
        "Goron Mines Upper East Wing": [
            ZoneNeighbor.always("Goron Mines Upper East Wing"),
            new ZoneNeighbor("Goron Mines Magnet Room", store => store.items.IronBoots && fns.canDefeatDangoro(store) && store.items.Bow > 0),
        ],
        "Goron Mines Boss Room": [
            new ZoneNeighbor("Kakariko Village", fns.canDefeatFyrus),
        ],
    },
    lakebedTemple: {
        "Lakebed Temple Entrance": [
            ZoneNeighbor.always("Lake Hylia"),
            new ZoneNeighbor("Lakebed Temple Central Room", fns.canLaunchBombs),
        ],
        "Lakebed Temple Central Room": [
            ZoneNeighbor.always("Lakebed Temple Entrance"),
            // small key requirement, assume we have it.
            ZoneNeighbor.always("Lakebed Temple East Wing Second Floor"),
            ZoneNeighbor.always("Lakebed Temple East Wing First Floor"),
            // key requirement, assume we have it.
            new ZoneNeighbor("Lakebed Temple West Wing", (store) => fns.canSmash(store) && store.items.Clawshot > 0),
            // key requirement, assume we have it.
            new ZoneNeighbor("Lakebed Temple Boss Room", (store) => fns.canLaunchBombs(store) && store.items.Clawshot > 0),
        ],
        "Lakebed Temple East Wing First Floor": [
            ZoneNeighbor.always("Lakebed Temple Central Room"),
        ],
        "Lakebed Temple East Wing Second Floor": [
            ZoneNeighbor.always("Lakebed Temple Central Room"),
            new ZoneNeighbor("Lakebed Temple East Wing First Floor", (store) => fns.canLaunchBombs(store) || store.items.Clawshot > 0),
        ],
        "Lakebed Temple West Wing": [
            ZoneNeighbor.always("Lakebed Temple Central Room"),
        ],
        "Lakebed Temple Boss Room": [
            new ZoneNeighbor("Lake Hylia", fns.canDefeatMorpheel)
        ]
    },
    arbitersGrounds: {
        "Arbiters Grounds Entrance": [
            ZoneNeighbor.always("Outside Arbiters Grounds"),
            new ZoneNeighbor("Arbiters Grounds Lobby", ({ items }) => items.Lantern),
        ],
        "Arbiters Grounds Lobby": [
            ZoneNeighbor.always("Arbiters Grounds Entrance"),
            ZoneNeighbor.always("Arbiters Grounds East Wing"),
            ZoneNeighbor.always("Arbiters Grounds West Wing"),
            new ZoneNeighbor(
                "Arbiters Grounds After Poe Gate",
                (store) => store.items.Crystal
                    && store.items.Clawshot > 0
                    && fns.canDefeatPoe(store)
                    && fns.canDefeatRedeadKnight(store)
                    && fns.canDefeatStalchild(store)
                    && fns.canDefeatBubble(store)
                    && fns.canDefeatGhoulRat(store)
                    && fns.canDefeatStalfos(store)
            )
        ],
        "Arbiters Grounds East Wing": [
            ZoneNeighbor.always("Arbiters Grounds Lobby"),
        ],
        "Arbiters Grounds West Wing": [
            ZoneNeighbor.always("Arbiters Grounds Lobby"),
        ],
        "Arbiters Grounds After Poe Gate": [
            ZoneNeighbor.always("Arbiters Grounds Lobby"),
            new ZoneNeighbor("Arbiters Grounds Boss Room", ({ items }) => items.Spinner),
        ],
        "Arbiters Grounds Boss Room": [
            new ZoneNeighbor("Mirror Chamber", fns.canDefeatStallord),
        ],
    },
    snowpeakRuins: {
        "Snowpeak Ruins Boss Room": [
            new ZoneNeighbor("Snowpeak Summit", fns.canDefeatBlizzeta),
        ],
        "Snowpeak Ruins Caged Freezard Room": [
            ZoneNeighbor.always("Snowpeak Ruins Yeto and Yeta"),
            // key setting ignored
            new ZoneNeighbor("Snowpeak Ruins Second Floor Mini Freezard Room", ({ items }) => items.Chainball),
            new ZoneNeighbor("Snowpeak Ruins Wooden Beam Room", ({ items }) => items.Chainball),
            // key setting ignored
            ZoneNeighbor.always("Snowpeak Ruins West Courtyard"),
        ],
        "Snowpeak Ruins Chapel": [
            new ZoneNeighbor("Snowpeak Ruins West Courtyard", fns.canDefeatChilfos)
        ],
        "Snowpeak Ruins Darkhammer Room": [
            new ZoneNeighbor("Snowpeak Ruins West Courtyard", fns.canDefeatDarkhammer)
        ],
        "Snowpeak Ruins East Courtyard": [
            ZoneNeighbor.always("Snowpeak Ruins Yeto and Yeta"),
            new ZoneNeighbor("Snowpeak Ruins West Courtyard", ({ items }) => items.Chainball),
            // https://github.com/zsrtp/Randomizer-Web-Generator/blob/b5ad864ba738a7daa3ccfe8f3076d2a906d6474d/Generator/World/Rooms/Dungeons/Snowpeak%20Ruins/Snowpeak%20Ruins%20East%20Courtyard.jsonc#L12
            // key settings being ignored simplifies this massively.
            new ZoneNeighbor("Snowpeak Ruins Northeast Chilfos Room First Floor", fns.canDefeatMiniFreezard)
        ],
        "Snowpeak Ruins Entrance": [
            ZoneNeighbor.always("Snowpeak Summit"),
            ZoneNeighbor.always("Snowpeak Ruins Yeto and Yeta"),
        ],
        "Snowpeak Ruins Northeast Chilfos Room First Floor": [
            ZoneNeighbor.always("Snowpeak Ruins East Courtyard"),
            new ZoneNeighbor("Snowpeak Ruins Yeto and Yeta", fns.canDefeatChilfos),
        ],
        "Snowpeak Ruins Northeast Chilfos Room Second Floor": [
            ZoneNeighbor.always("Snowpeak Ruins Northeast Chilfos Room First Floor"),
            new ZoneNeighbor("Snowpeak Ruins Yeto and Yeta", ({ items }) => items.Chainball),
        ],
        "Snowpeak Ruins Second Floor Mini Freezard Room": [
            ZoneNeighbor.always("Snowpeak Ruins Entrance"),
            new ZoneNeighbor("Snowpeak Ruins East Courtyard", ({ items }) => items.Crystal || items.Chainball),
            new ZoneNeighbor(
                "Snowpeak Ruins Northeast Chilfos Room Second Floor",
                (store) => store.items.Chainball && store.items.Clawshot > 0 && fns.canDefeatChilfos(store)
            ),
            ZoneNeighbor.always("Snowpeak Ruins Caged Freezard Room"),

        ],
        "Snowpeak Ruins West Cannon Room": [
            ZoneNeighbor.always("Snowpeak Ruins West Courtyard"),
            new ZoneNeighbor("Snowpeak Ruins Wooden Beam Room", fns.canSmash),

        ],
        "Snowpeak Ruins West Courtyard": [
            ZoneNeighbor.always("Snowpeak Ruins Yeto and Yeta"),
            new ZoneNeighbor("Snowpeak Ruins East Courtyard", ({ items }) => items.Chainball),
            ZoneNeighbor.always("Snowpeak Ruins West Cannon Room"),
            // key setting ignored.
            new ZoneNeighbor("Snowpeak Ruins Chapel", (store) => store.items.Chainball && fns.hasBombs(store)),
            // key setting ignored.
            new ZoneNeighbor("Snowpeak Ruins Darkhammer Room", (store) => store.items.Chainball || fns.hasBombs(store)),
            // key setting ignored.
            new ZoneNeighbor("Snowpeak Ruins Boss Room", (store) => store.items.Chainball && fns.hasBombs(store)),
        ],
        "Snowpeak Ruins Wooden Beam Room": [
            ZoneNeighbor.always("Snowpeak Ruins West Cannon Room"),
        ],
        "Snowpeak Ruins Yeto and Yeta": [
            ZoneNeighbor.always("Snowpeak Ruins Entrance"),

            // key setting ignored.
            ZoneNeighbor.always("Snowpeak Ruins Caged Freezard Room"),
            // key setting ignored.
            ZoneNeighbor.always("Snowpeak Ruins West Courtyard"),
            new ZoneNeighbor("Snowpeak Ruins East Courtyard", ({ items }) => items.Crystal || items.Chainball)
        ],
    },
    templeOfTime: {
        "Temple of Time Armos Antechamber": [
            ZoneNeighbor.always("Temple of Time Central Mechanical Platform"),
        ],
        "Temple of Time Boss Room": [
            new ZoneNeighbor("Sacred Grove Temple of Time", fns.canDefeatArmogohma),
        ],
        "Temple of Time Central Mechanical Platform": [
            ZoneNeighbor.always("Temple of Time Connecting Corridors"),
            new ZoneNeighbor("Temple of Time Armos Antechamber", ({ items }) => items.Spinner),
            // keys ignored.
            new ZoneNeighbor("Temple of Time Moving Wall Hallways", ({ items }) => items.Spinner),
        ],
        "Temple of Time Connecting Corridors": [
            ZoneNeighbor.always("Temple of Time Entrance"),
            new ZoneNeighbor(
                "Temple of Time Central Mechanical Platform",
                (store) => fns.hasRangedItem(store) && fns.canDefeatYoungGohma(store) && fns.canDefeatLizalfos(store)
            ),
        ],
        "Temple of Time Crumbling Corridor": [
            ZoneNeighbor.always("Temple of Time Entrance"),
            // keys ignored.
            new ZoneNeighbor("Temple of Time Boss Room", ({ items }) => items.Dominion > 0),
        ],
        "Temple of Time Darknut Arena": [
            new ZoneNeighbor("Temple of Time Upper Spike Trap Corridor", (store) => fns.canDefeatDarknut(store) && store.items.Dominion > 0),
        ],
        "Temple of Time Entrance": [
            ZoneNeighbor.always("Sacred Grove Temple of Time"),
            // keys ignored.
            ZoneNeighbor.always("Temple of Time Connecting Corridors"),
            // keys ignored (which happens to make the Open DoT setting useless).
            new ZoneNeighbor(
                "Temple of Time Crumbling Corridor",
                (store) => store.items.Dominion > 0
                    && store.items.Bow > 0
                    && store.items.Spinner
                    && fns.canDefeatLizalfos(store)
                    && fns.canDefeatDinalfos(store)
                    && fns.canDefeatDarknut(store)
            ),
        ],
        "Temple of Time Floor Switch Puzzle Room": [
            ZoneNeighbor.always("Temple of Time Scales of Time")
        ],
        "Temple of Time Moving Wall Hallways": [
            ZoneNeighbor.always("Temple of Time Central Mechanical Platform"),
            new ZoneNeighbor("Temple of Time Scales of Time", (store) => store.items.Bow > 0 && fns.canDefeatLizalfos(store) && fns.canDefeatDinalfos(store))
        ],
        "Temple of Time Scales of Time": [
            ZoneNeighbor.always("Temple of Time Moving Wall Hallways"),
            new ZoneNeighbor("Temple of Time Floor Switch Puzzle Room", ({ items }) => items.Clawshot > 0 && items.Spinner),
            ZoneNeighbor.always("Temple of Time Upper Spike Trap Corridor"),
        ],
        "Temple of Time Upper Spike Trap Corridor": [
            ZoneNeighbor.always("Temple of Time Upper Spike Trap Corridor"),
            // keys ignored.
            new ZoneNeighbor(
                "Temple of Time Darknut Arena",
                (store) => fns.canDefeatLizalfos(store)
                    && fns.canDefeatBabyGohma(store)
                    && fns.canDefeatYoungGohma(store)
                    && fns.canDefeatArmos(store)
            )
        ],
    },
    cityInTheSky: {},
    palaceOfTwilight: {},
    hyruleCastle: {},
};

export type ZoneNeighbors<T extends ZoneId = ZoneId> = Record<T, ZoneNeighbor[]>;

export const zoneNeighborsGlitchless: ZoneNeighbors = Object.assign({}, ...Object.values(regionsGlitchless));

export function calculateReachableZones(searchZones: ZoneNeighbors, settings: RandomizerSettings, items: typeof baseItems, start: ZoneId = "Ordon Province") {
    // An implementation of DFS, modified to support interdependencies of zones.
    const stack: ZoneId[] = [];
    stack.push(start);

    if (settings.openMap && items.Crystal) {
        if (settings.skip.faronTwilight) {
            stack.push("South Faron Woods");
            stack.push("North Faron Woods");
        }

        if (settings.skip.eldinTwilight) {
            stack.push("Kakariko Gorge");
            stack.push("Kakariko Village");
            stack.push("Death Mountain Volcano");
        }
    }

    const fakeStore: LogicStore = {
        settings,
        items,
        reachableZones: new Set()
    };

    let retry: Map<ZoneId, ZoneNeighbor[]> = new Map();

    while (true) {
        while (stack.length > 0) {
            const zone = stack.pop();
            // we want to check now instead of when iterating the neighbors because the first item could be the goal,
            // and if so I'd rataher not duplicate the check.

            if (typeof (zone) === 'undefined') {
                break;
            }

            retry.delete(zone);

            if (fakeStore.reachableZones.has(zone)) {
                continue;
            }

            fakeStore.reachableZones.add(zone);

            for (const neighbor of searchZones[zone]) {
                let accessable = neighbor.accessable(fakeStore);
                if (accessable === null) {
                    let entry = retry.get(neighbor.name);
                    if (entry === undefined) {
                        entry = [];
                        retry.set(neighbor.name, entry);
                    }

                    entry.push(neighbor);
                }

                if (accessable) {
                    stack.push(neighbor.name);
                }
            }
        };

        let cont = false;
        for (const [zone, entry] of retry) {
            for (const neighbor of entry) {
                if (neighbor.accessable(fakeStore)) {
                    cont = true;
                    stack.push(zone);
                    // make sure we only do each zone once.
                    break;
                }
            }
        }

        if (!cont) {
            break;
        }
    }

    return fakeStore.reachableZones;
}
