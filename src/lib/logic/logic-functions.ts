import type { ItemId } from "$lib/items";
import type { LogicStore } from "./index";
import type { ZoneId } from "./zone/id";
// fixme: remove tri-state logic again, just, do it carefully.

export function hasDamagingIronBoots(store: LogicStore) {
    return (canDoNicheStuff(store) && store.items.IronBoots);
}

// Logic export functions, these help make item requirements simpler and allow us not to clutter the individual item checks
export function hasDamagingItem(store: LogicStore, checkNiche: boolean) {
    return store.items.Sword > 0
        || store.items.Chainball
        || store.items.Bow > 0
        || store.items.Bombs > 0
        || (store.items.IronBoots && (!checkNiche || canDoNicheStuff(store)))
        || store.items.Crystal
        || store.items.Spinner;
}

export function canDefeatAeralfos(store: LogicStore) {
    return store.items.Clawshot > 0 && (
        store.items.Sword > 0
        || store.items.Chainball
        || store.items.Crystal
        || hasDamagingIronBoots(store)
    );
}

export function canDefeatArmos(store: LogicStore) {
    return hasDamagingItem(store, true)
        || store.items.Clawshot > 0
        || canUseBacksliceAsSword(store);
}

export function canDefeatBabaSerpent(store: LogicStore) {
    return hasDamagingItem(store, true)
        || canUseBacksliceAsSword(store);
}

export function canDefeatbabyGohma(store: LogicStore) {
    return store.items.Sword > 0
        || store.items.Chainball
        || store.items.Bow > 0
        || hasDamagingIronBoots(store)
        || store.items.Spinner
        || store.items.Slingshot
        || store.items.Clawshot > 0
        || hasBombs(store)
        || canUseBacksliceAsSword(store);
}

export function canDefeatBari(store: LogicStore) {
    return canUseWaterBombs(store) || store.items.Clawshot > 0;
}

export function canDefeatBeamos(store: LogicStore) {
    return store.items.Chainball || store.items.Bow > 0 || hasBombs(store);
}

export function canDefeatBigBaba(store: LogicStore) {
    return store.items.Sword > 0
        || store.items.Chainball
        || (store.items.Bow > 0 && canGetArrows(store))
        || hasDamagingIronBoots(store)
        || store.items.Crystal
        || store.items.Spinner
        || hasBombs(store)
        || canUseBacksliceAsSword(store);
}

export function canDefeatChu(store: LogicStore) {
    return store.items.Sword > 0
        || store.items.Chainball
        || store.items.Bow > 0
        || hasDamagingIronBoots(store)
        || store.items.Spinner
        || store.items.Crystal
        || store.items.Clawshot > 0
        || hasBombs(store)
        || canUseBacksliceAsSword(store);
}

export function canDefeatBokoblin(store: LogicStore) {
    return store.items.Sword > 0
        || store.items.Chainball
        || (store.items.Bow > 0 && canGetArrows(store))
        || hasDamagingIronBoots(store)
        || store.items.Spinner
        || store.items.Slingshot
        || store.items.Crystal
        || hasBombs(store)
        || canUseBacksliceAsSword(store);
}

export function canDefeatBokoblinRed(store: LogicStore) {
    return store.items.Sword > 0
        || store.items.Chainball
        || (store.items.Bow > 0 && canGetArrows(store))
        || store.items.Crystal
        || hasBombs(store)
        || canUseBacksliceAsSword(store)
        || (canDoDifficultCombat(store) && (store.items.IronBoots || store.items.Spinner));
}

export function canDefeatBombfish(store: LogicStore) {
    return (store.items.IronBoots || (store.settings.logic === "glitched" && store.items.MagicArmor)) && (
        store.items.Sword > 0 || store.items.Clawshot > 0
        || (store.items.Shield > 0 && store.items.Skills >= 2)
    );
}

export function canDefeatBombling(store: LogicStore) {
    return store.items.Sword > 0
        || store.items.Chainball
        || (store.items.Bow > 0 && canGetArrows(store))
        || (hasDamagingIronBoots(store))
        || store.items.Spinner
        || store.items.Crystal
        || store.items.Clawshot > 0;
}

export function canDefeatBomskit(store: LogicStore) {
    return store.items.Sword > 0
        || store.items.Chainball
        || store.items.Bow > 0
        || store.items.Spinner
        || store.items.Crystal
        || hasBombs(store)
        || canUseBacksliceAsSword(store)
        || (hasDamagingIronBoots(store));
}

export function canDefeatBubble(store: LogicStore) {
    return store.items.Sword > 0
        || store.items.Chainball
        || store.items.Bow > 0
        || (hasDamagingIronBoots(store))
        || store.items.Spinner
        || store.items.Crystal
        || canUseBacksliceAsSword(store);
}

export function canDefeatBulblin(store: LogicStore) {
    return store.items.Sword > 0
        || store.items.Chainball
        || store.items.Bow > 0
        || (hasDamagingIronBoots(store))
        || store.items.Spinner
        || store.items.Crystal
        || hasBombs(store)
        || canUseBacksliceAsSword(store);
}

export function canDefeatChilfos(store: LogicStore) {
    return store.items.Sword > 0
        || store.items.Chainball
        || (hasDamagingIronBoots(store))
        || store.items.Crystal
        || store.items.Spinner
        || hasBombs(store)
        || canUseBacksliceAsSword(store);
}

export function canDefeatChuWorm(store: LogicStore) {
    return (hasBombs(store) || store.items.Clawshot > 0) && (
        store.items.Sword > 0
        || store.items.Chainball
        || (hasDamagingIronBoots(store))
        || store.items.Crystal
        || store.items.Spinner
        || canUseBacksliceAsSword(store)
    );
}

export function canDefeatDarknut(store: LogicStore) {
    return store.items.Sword > 0 || (canDoDifficultCombat(store) && hasBombs(store) || store.items.Chainball);
}

export function canDefeatDekuBaba(store: LogicStore) {
    return store.items.Sword > 0
        || store.items.Chainball
        || store.items.Bow > 0
        || (hasDamagingIronBoots(store))
        || store.items.Spinner
        || store.items.Skills >= 2
        || store.items.Slingshot
        || store.items.Clawshot > 0
        || hasBombs(store)
        || canUseBacksliceAsSword(store);
}

export function canDefeatDekuLike(store: LogicStore) {
    return hasBombs(store);
}

export function canDefeatDodongo(store: LogicStore) {
    return store.items.Sword > 0
        || store.items.Chainball
        || store.items.Bow > 0
        || (hasDamagingIronBoots(store))
        || store.items.Spinner
        || store.items.Crystal
        || hasBombs(store)
        || canUseBacksliceAsSword(store);
}

export function canDefeatDinalfos(store: LogicStore) {
    return store.items.Sword > 0 || store.items.Chainball || store.items.Crystal;
}

export function canDefeatFireBubble(store: LogicStore) {
    return store.items.Sword > 0
        || store.items.Chainball
        || store.items.Bow > 0
        || (hasDamagingIronBoots(store))
        || store.items.Spinner
        || store.items.Crystal
        || canUseBacksliceAsSword(store);
}

export function canDefeatFireKeese(store: LogicStore) {
    return store.items.Sword > 0
        || store.items.Chainball
        || store.items.Bow > 0
        || (hasDamagingIronBoots(store))
        || store.items.Spinner
        || store.items.Slingshot
        || store.items.Crystal
        || hasBombs(store)
        || canUseBacksliceAsSword(store);
}

export function canDefeatFireToadpoli(store: LogicStore) {
    return store.items.Sword > 0
        || store.items.Chainball
        || store.items.Bow > 0
        || (store.items.Shield >= 2 && store.items.Skills >= 2)
        || (canDoDifficultCombat(store) && store.items.Crystal);
}

export function canDefeatFreezard(store: LogicStore) {
    return store.items.Chainball;
}

export function canDefeatGoron(store: LogicStore, allowShield: boolean = true): boolean {
    return store.items.Sword > 0
        || store.items.Chainball
        || store.items.Bow > 0
        || (canDoNicheStuff(store) && (store.items.IronBoots || store.items.Boomerang))
        || store.items.Spinner
        || (allowShield && (store.items.Skills >= 2) && hasShield(store))
        || store.items.Slingshot
        || (canDoDifficultCombat(store) && store.items.Lantern)
        || store.items.Clawshot > 0
        || hasBombs(store)
        || canUseBacksliceAsSword(store);
}

export function canDefeatGhoulRat(store: LogicStore) {
    return store.items.Crystal;
}

export function canDefeatGuay(store: LogicStore) {
    return store.items.Sword > 0
        || store.items.Chainball
        || store.items.Bow > 0
        || (hasDamagingIronBoots(store))
        || (canDoDifficultCombat(store) && store.items.Spinner)
        || store.items.Crystal
        || store.items.Slingshot;
}

export function canDefeatHelmasaur(store: LogicStore) {
    return store.items.Sword > 0
        || store.items.Chainball
        || store.items.Bow > 0
        || (hasDamagingIronBoots(store))
        || store.items.Spinner
        || store.items.Crystal
        || hasBombs(store)
        || canUseBacksliceAsSword(store);
}

export function canDefeatHelmasaurus(store: LogicStore) {
    return store.items.Sword > 0
        || store.items.Chainball
        || store.items.Bow > 0
        || (hasDamagingIronBoots(store))
        || store.items.Spinner
        || store.items.Crystal
        || hasBombs(store)
        || canUseBacksliceAsSword(store);
}

export function canDefeatIceBubble(store: LogicStore) {
    return store.items.Sword > 0
        || store.items.Chainball
        || store.items.Bow > 0
        || (hasDamagingIronBoots(store))
        || store.items.Spinner
        || store.items.Crystal
        || canUseBacksliceAsSword(store);
}

export function canDefeatIceKeese(store: LogicStore) {
    return store.items.Sword > 0
        || store.items.Chainball
        || store.items.Bow > 0
        || (hasDamagingIronBoots(store))
        || store.items.Spinner
        || store.items.Slingshot
        || store.items.Crystal
        || canUseBacksliceAsSword(store);
}

export function canDefeatPoe(store: LogicStore) {
    return store.items.Crystal;
}

export function canDefeatKargarok(store: LogicStore) {
    return store.items.Sword > 0
        || store.items.Chainball
        || store.items.Bow > 0
        || (hasDamagingIronBoots(store))
        || store.items.Spinner
        || store.items.Crystal
        || canUseBacksliceAsSword(store);
}

export function canDefeatKeese(store: LogicStore) {
    return store.items.Sword > 0
        || store.items.Chainball
        || store.items.Bow > 0
        || (hasDamagingIronBoots(store))
        || store.items.Spinner
        || store.items.Slingshot
        || store.items.Crystal
        || canUseBacksliceAsSword(store);
}

export function canDefeatLeever(store: LogicStore) {
    return store.items.Sword > 0
        || store.items.Chainball
        || store.items.Bow > 0
        || (hasDamagingIronBoots(store))
        || store.items.Spinner
        || store.items.Crystal
        || hasBombs(store);
}

export function canDefeatLizalfos(store: LogicStore) {
    return store.items.Sword > 0
        || store.items.Chainball
        || store.items.Bow > 0
        || (hasDamagingIronBoots(store))
        || store.items.Crystal
        || hasBombs(store)
        || canUseBacksliceAsSword(store);
}

export function canDefeatMiniFreezard(store: LogicStore) {
    return store.items.Sword > 0
        || store.items.Chainball
        || store.items.Bow > 0
        || (hasDamagingIronBoots(store))
        || store.items.Spinner
        || store.items.Crystal
        || hasBombs(store)
        || canUseBacksliceAsSword(store);
}

export function canDefeatMoldorm(store: LogicStore) {
    return store.items.Sword > 0
        || store.items.Chainball
        || store.items.Bow > 0
        || (hasDamagingIronBoots(store))
        || store.items.Spinner
        || store.items.Crystal
        || hasBombs(store);
}

export function canDefeatPoisonMite(store: LogicStore) {
    return store.items.Sword > 0
        || store.items.Chainball
        || store.items.Bow > 0
        || (hasDamagingIronBoots(store))
        || store.items.Lantern
        || store.items.Spinner
        || store.items.Crystal;
}

export function canDefeatPuppet(store: LogicStore) {
    return store.items.Sword > 0
        || store.items.Chainball
        || store.items.Bow > 0
        || (hasDamagingIronBoots(store))
        || store.items.Spinner
        || store.items.Crystal
        || hasBombs(store)
        || canUseBacksliceAsSword(store);
}

export function canDefeatRat(store: LogicStore) {
    return store.items.Sword > 0
        || store.items.Chainball
        || store.items.Bow > 0
        || (hasDamagingIronBoots(store))
        || store.items.Spinner
        || store.items.Slingshot
        || store.items.Crystal
        || hasBombs(store)
        || canUseBacksliceAsSword(store);
}

export function canDefeatRedeadKnight(store: LogicStore) {
    return store.items.Sword > 0
        || store.items.Chainball
        || store.items.Bow > 0
        || (hasDamagingIronBoots(store))
        || store.items.Crystal
        || hasBombs(store)
        || canUseBacksliceAsSword(store);
}

export function canDefeatShadowBeast(store: LogicStore) {
    return store.items.Sword > 0 || (store.items.Crystal && canCompleteMDH(store));
}

export function canDefeatShadowBublin(store: LogicStore) {
    return store.items.Sword > 0
        || store.items.Chainball
        || store.items.Bow > 0
        || (hasDamagingIronBoots(store))
        || store.items.Spinner
        || store.items.Crystal
        || hasBombs(store)
        || canUseBacksliceAsSword(store);
}

export function canDefeatShadowDekuBaba(store: LogicStore) {
    return store.items.Sword > 0
        || store.items.Chainball
        || store.items.Bow > 0
        || (hasDamagingIronBoots(store))
        || store.items.Spinner
        || (hasShield(store) && store.items.Skills >= 2)
        || store.items.Slingshot
        || store.items.Clawshot > 0
        || hasBombs(store)
        || canUseBacksliceAsSword(store);
}

export function canDefeatShadowInsect(store: LogicStore) {
    return store.items.Crystal;
}

export function canDefeatShadowKargarok(store: LogicStore) {
    return store.items.Sword > 0
        || store.items.Chainball
        || store.items.Bow > 0
        || (hasDamagingIronBoots(store))
        || store.items.Spinner
        || store.items.Crystal
        || hasBombs(store)
        || canUseBacksliceAsSword(store);
}

export function canDefeatShadowKeese(store: LogicStore) {
    return store.items.Sword > 0
        || store.items.Chainball
        || store.items.Bow > 0
        || (hasDamagingIronBoots(store))
        || store.items.Spinner
        || store.items.Slingshot
        || store.items.Crystal
        || canUseBacksliceAsSword(store);
}

export function canDefeatShadowVermin(store: LogicStore) {
    return store.items.Sword > 0
        || store.items.Chainball
        || store.items.Bow > 0
        || (hasDamagingIronBoots(store))
        || store.items.Spinner
        || store.items.Crystal
        || hasBombs(store)
        || canUseBacksliceAsSword(store);
}

export function canDefeatShellBlade(store: LogicStore) {
    return canUseWaterBombs(store) ||
        (store.items.Sword > 0 && (store.items.IronBoots || (canDoNicheStuff(store) && store.items.MagicArmor)));
}

export function canDefeatSkullfish(store: LogicStore) {
    return store.items.Sword > 0
        || store.items.Chainball
        || store.items.Bow > 0
        || (hasDamagingIronBoots(store))
        || store.items.Spinner
        || store.items.Crystal;
}

export function canDefeatSkulltula(store: LogicStore) {
    return store.items.Sword > 0
        || store.items.Chainball
        || store.items.Bow > 0
        || hasDamagingIronBoots(store)
        || store.items.Spinner
        || store.items.Crystal
        || hasBombs(store)
        || canUseBacksliceAsSword(store);
}

export function canDefeatStalfos(store: LogicStore) {
    return canSmash(store);
}

export function canDefeatStalhound(store: LogicStore) {
    return store.items.Sword > 0
        || store.items.Chainball
        || store.items.Bow > 0
        || (hasDamagingIronBoots(store))
        || store.items.Spinner
        || store.items.Crystal
        || hasBombs(store)
        || canUseBacksliceAsSword(store);
}

export function canDefeatStalchild(store: LogicStore) {
    return store.items.Sword > 0
        || store.items.Chainball
        || store.items.Bow > 0
        || (hasDamagingIronBoots(store))
        || store.items.Spinner
        || store.items.Crystal
        || hasBombs(store)
        || canUseBacksliceAsSword(store);
}

export function canDefeatTektite(store: LogicStore) {
    return store.items.Sword > 0
        || store.items.Chainball
        || store.items.Bow > 0
        || (hasDamagingIronBoots(store))
        || store.items.Spinner
        || store.items.Crystal
        || hasBombs(store)
        || canUseBacksliceAsSword(store);
}

export function canDefeatTileWorm(store: LogicStore) {
    if (!store.items.Boomerang) {
        return false;
    }

    return store.items.Sword > 0
        || store.items.Chainball
        || store.items.Bow > 0
        || store.items.Crystal
        || store.items.Spinner
        || hasDamagingIronBoots(store)
        || hasBombs(store)
        || canUseBacksliceAsSword(store);
}

export function canDefeatToado(store: LogicStore) {
    return store.items.Sword > 0
        || store.items.Chainball
        || store.items.Bow > 0
        || (hasDamagingIronBoots(store))
        || store.items.Spinner
        || store.items.Crystal;
}

export function canDefeatWaterToadpoli(store: LogicStore) {
    return store.items.Sword > 0
        || store.items.Chainball
        || store.items.Bow > 0
        || (hasShield(store) && store.items.Skills >= 2)
        || (canDoDifficultCombat(store) && store.items.Crystal);
}

export function canDefeatTorchSlug(store: LogicStore) {
    return store.items.Sword > 0
        || store.items.Chainball
        || store.items.Bow > 0
        || store.items.Crystal
        || hasBombs(store);
}

export function canDefeatWalltula(store: LogicStore) {
    return store.items.Chainball
        || store.items.Slingshot
        || store.items.Boomerang
        || store.items.Clawshot > 0
        || (store.items.Bow > 0 && canGetArrows(store));
}

export function canDefeatWhiteWolfos(store: LogicStore) {
    return store.items.Sword > 0
        || store.items.Chainball
        || store.items.Bow > 0
        || (hasDamagingIronBoots(store))
        || store.items.Spinner
        || store.items.Crystal
        || hasBombs(store);
}

export function canDefeatYoungGohma(store: LogicStore) {
    return store.items.Sword > 0
        || store.items.Chainball
        || store.items.Bow > 0
        || (hasDamagingIronBoots(store))
        || store.items.Spinner
        || store.items.Crystal
        || hasBombs(store);
}

export function canDefeatZantHead(store: LogicStore) {
    return store.items.Sword > 0
        || store.items.Crystal
        || canUseBacksliceAsSword(store);
}

export function canDefeatOok(store: LogicStore) {
    return store.items.Sword > 0
        || store.items.Chainball
        || (store.items.Bow > 0 && canGetArrows(store))
        || hasDamagingIronBoots(store)
        || store.items.Crystal
        || hasBombs(store)
        || canUseBacksliceAsSword(store);
}

export function canDefeatDangoro(store: LogicStore) {
    return store.items.IronBoots
        && (
            store.items.Sword > 0
            || store.items.Crystal
            || (canDoNicheStuff(store) && (store.items.Chainball || (store.items.Bow > 0 && hasBombs(store))))
        );
}

export function canDefeatCarrierKargarok(store: LogicStore) {
    return store.items.Crystal;
}

export function canDefeatTwilitBloat(store: LogicStore) {
    return store.items.Crystal;
}

export function canDefeatDekuToad(store: LogicStore) {
    return store.items.Sword > 0
        || store.items.Chainball
        || store.items.Bow > 0
        || (hasDamagingIronBoots(store))
        || store.items.Crystal
        || hasBombs(store)
        || canUseBacksliceAsSword(store);
}

export function canDefeatSkullKid(store: LogicStore) {
    return store.items.Bow > 0;
}

export function canDefeatKingBulblinBridge(store: LogicStore) {
    return store.items.Bow > 0;
}

export function canDefeatKingBulbinDesert(store: LogicStore) {
    return store.items.Sword > 0
        || store.items.Chainball
        || store.items.Crystal
        || store.items.Bow >= 3
        || canUseBacksliceAsSword(store)
        || (
            canDoDifficultCombat(store) &&
            (store.items.Spinner || store.items.IronBoots || hasBombs(store) || store.items.Bow >= 2)
        );
}

export function canDefeatKingBulblinCastle(store: LogicStore) {
    return store.items.Sword > 0
        || store.items.Chainball
        || store.items.Crystal
        || store.items.Bow >= 3
        || (
            canDoDifficultCombat(store)
            && (store.items.Spinner || store.items.IronBoots || hasBombs(store) || canUseBacksliceAsSword(store))
        );
}

export function canDefeatDeathSword(store: LogicStore) {
    return store.items.Sword > 0
        && store.items.Crystal
        && (store.items.Boomerang || store.items.Bow > 0 || store.items.Clawshot > 0);
}

export function canDefeatDarkhammer(store: LogicStore) {
    return store.items.Sword > 0
        || store.items.Chainball
        || store.items.Bow > 0
        || (hasDamagingIronBoots(store))
        || store.items.Crystal
        || hasBombs(store)
        || (canDoDifficultCombat(store) && canUseBacksliceAsSword(store));
}

export function canDefeatPhantomZant(store: LogicStore) {
    return store.items.Crystal || store.items.Sword > 0;
}

export function canDefeatDiababa(store: LogicStore) {
    return canLaunchBombs(store) || (
        store.items.Boomerang && (
            store.items.Sword > 0
            || store.items.Chainball
            || hasDamagingIronBoots(store)
            || store.items.Crystal
            || hasBombs(store)
            || (canDoDifficultCombat(store) && canUseBacksliceAsSword(store))
        )
    );
}

export function canDefeatFyrus(store: LogicStore) {
    return store.items.Bow > 0
        && store.items.IronBoots
        && (store.items.Sword > 0 || (canDoDifficultCombat(store) && canUseBacksliceAsSword(store)));
}

export function canDefeatMorpheel(store: LogicStore) {
    return store.items.ZoraArmor
        && store.items.IronBoots
        && store.items.Sword > 0
        && store.items.Clawshot > 0;
}

export function canDefeatStallord(store: LogicStore) {
    return store.items.Spinner && (canDoDifficultCombat(store) || store.items.Sword > 0);
}

export function canDefeatBlizzeta(store: LogicStore) {
    return store.items.Chainball;
}

export function canDefeatArmogohma(store: LogicStore) {
    return store.items.Bow > 0 && store.items.Dominion > 0;
}

export function canDefeatArgorok(store: LogicStore) {
    return store.items.Clawshot >= 2
        && store.items.Sword >= 2
        && store.items.IronBoots || (canDoNicheStuff(store) && store.items.MagicArmor);
}

export function canDefeatZant(store: LogicStore) {
    return store.items.Sword >= 3
        && store.items.Boomerang
        && store.items.Clawshot > 0
        && store.items.Chainball
        && (store.items.IronBoots || (canDoNicheStuff(store) && store.items.MagicArmor))
        && (store.items.ZoraArmor || (store.settings.logic === "glitched" && canDoAirRefill(store)));
}

export function canDefeatGanondorf(store: LogicStore) {
    return store.items.Crystal
        && store.items.Sword >= 3
        && store.items.Skills > 0;
}

export function canSmash(store: LogicStore) {
    return store.items.Chainball || hasBombs(store);
}

export function canBurnWebs(store: LogicStore) {
    return canSmash(store) || store.items.Lantern;
}

export function hasRangedItem(store: LogicStore) {
    return store.items.Chainball
        || store.items.Slingshot
        || store.items.Bow > 0
        || store.items.Clawshot > 0
        || store.items.Boomerang;
}

const canReachZone = (store: LogicStore, zone: ZoneId) => store.reachableZones.has(zone) ? true : null;

export function hasShield(store: LogicStore) {
    return store.items.Shield === 2
        || canReachZone(store, "Kakariko Village")
        || canReachZone(store, "Castle Town")
        // if we need a source of wooden shields to beat Gorons,
        // and we need to beat Gorons to have a source of wooden shields.
        // then we can't beat Gorons. 
        || canReachZone(store, "Death Mountain Volcano") && canDefeatGoron(store, false);
}

export function canUseBottledFairy(store: LogicStore) {
    return hasBottle(store) && canReachZone(store, "Lake Hylia");
}

export function canUseBottledFairies(store: LogicStore) {
    return hasBottles(store) && canReachZone(store, "Lake Hylia");
}

export function canLaunchBombs(store: LogicStore) {
    return (store.items.Boomerang || store.items.Bow > 0) && hasBombs(store);
}

export function canCutHangingWeb(store: LogicStore) {
    return store.items.Clawshot >= 1
        || (store.items.Bow && canGetArrows(store))
        || store.items.Boomerang
        || store.items.Chainball;
}

export function canKnockDownHCPainting(store: LogicStore) {
    return store.items.Bow > 0
        || (canDoNicheStuff(store) && (hasBombs(store) || (store.items.Sword > 0 && store.items.Skills >= 6)))
        || (
            store.settings.logic === "glitched" &&
            ((store.items.Sword > 0 && canDoMoonBoots(store)) || canDoBSMoonBoots(store))
        );
}

export function canBreakMonkeyCage(store: LogicStore) {
    return store.items.Sword > 0
        || store.items.IronBoots
        || store.items.Spinner
        || store.items.Chainball
        || store.items.Crystal
        || hasBombs(store)
        || (store.items.Bow > 0 && canGetArrows(store))
        || store.items.Clawshot > 0
        || (canDoNicheStuff(store) && store.items.Skills >= 2);
}

export function canPressMinesSwitch(store: LogicStore) {
    return store.items.IronBoots || (canDoNicheStuff(store) && store.items.Chainball);
}

export function canFreeAllMonkeys(store: LogicStore) {
    return canBreakMonkeyCage(store)
        && (
            store.items.Lantern
            // || (
            //     /* key setting: https://github.com/zsrtp/Randomizer-Web-Generator/blob/b5ad864ba738a7daa3ccfe8f3076d2a906d6474d/Generator/Logic/LogicFunctions.cs#L1513 */
            //     (hasBombs() || store.items.IronBoots)
            // )
        )
        && canBurnWebs(store)
        && store.items.Boomerang
        && canDefeatBokoblin(store);
    // another key setting
}

export function canKnockDownHangingBaba(store: LogicStore) {
    return store.items.Bow > 0
        || store.items.Clawshot > 0
        || store.items.Boomerang
        || store.items.Slingshot;
}

export function canBreakWoodenDoor(store: LogicStore) {
    return store.items.Crystal
        || store.items.Sword > 0
        || canSmash(store)
        || canUseBacksliceAsSword(store);

}

export function hasBombs(store: LogicStore) {
    // the actual rando logic a lot more complicated:
    // https://github.com/zsrtp/Randomizer-Web-Generator/blob/b5ad864ba738a7daa3ccfe8f3076d2a906d6474d/Generator/Logic/LogicFunctions.cs#L1554
    return store.items.Bombs >= 1;
}

export function canUseWaterBombs(store: LogicStore) {
    // the actual rando logic a lot more complicated:
    // https://github.com/zsrtp/Randomizer-Web-Generator/blob/b5ad864ba738a7daa3ccfe8f3076d2a906d6474d/Generator/Logic/LogicFunctions.cs#L1577
    return hasBombs(store) && store.items.WBombs;
}

export function canGetArrows(store: LogicStore) {
    return canClearForest(store) || canReachZone(store, "Lost Woods");
}

export function canClearForest(store: LogicStore) {
    return canCompletePrologue(store) && (store.settings.faronWoodsLogic === "open" || canCompleteForestTemple(store));
}

export function canCompletePrologue({ settings, items }: LogicStore) {
    // fixme: check for north faron gate key (or keysy)
    return (items.Sword >= 1 && items.Slingshot) || settings.skip.prologue;
}

export function canCompleteMDH(store: LogicStore) {
    return store.settings.skip.mdh || canCompleteLakebedTemple(store);
}

export function canCompleteEldinTwilight(store: LogicStore) {
    return store.settings.skip.eldinTwilight || canClearForest(store);
}

export function canCompleteForestTemple(store: LogicStore) {
    return store.items.Boss1;
}

export function canCompleteGoronMines(store: LogicStore) {
    return store.items.Boss2;
}

export function canCompleteLakebedTemple(store: LogicStore) {
    return store.items.Boss3;
}

export function canCompleteArbitersGrounds(store: LogicStore) {
    return store.items.Boss4;
}

export function canCompleteSnowpeakRuins(store: LogicStore) {
    return store.items.Boss4;
}

export function canCompleteTempleofTime(store: LogicStore) {
    return store.items.Boss5;
}

export function canCompleteCityInTheSky(store: LogicStore) {
    return store.items.Boss6;
}

export function canCompletePalaceofTwilight(store: LogicStore) {
    return store.items.Boss7;
}

export function canCompleteAllDungeons(store: LogicStore) {
    return canCompleteForestTemple(store)
        && canCompleteGoronMines(store)
        && canCompleteLakebedTemple(store)
        && canCompleteArbitersGrounds(store)
        && canCompleteSnowpeakRuins(store)
        && canCompleteTempleofTime(store)
        && canCompleteCityInTheSky(store)
        && canCompletePalaceofTwilight(store);
}

export function hasBug(store: LogicStore) {
    return store.items.Bugs > 0;
}

export function canDoDifficultCombat(store: LogicStore) {
    // https://github.com/zsrtp/Randomizer-Web-Generator/blob/b5ad864ba738a7daa3ccfe8f3076d2a906d6474d/Generator/Logic/LogicFunctions.cs#L1777
    // it's a stub, but it actually always returns the right value.
    // console.debug('half-stub');
    return false;
}

export function canDoNicheStuff(store: LogicStore) {
    // https://github.com/zsrtp/Randomizer-Web-Generator/blob/b5ad864ba738a7daa3ccfe8f3076d2a906d6474d/Generator/Logic/LogicFunctions.cs#L1786
    return store.settings.logic === "glitched";
}

export function canUseBacksliceAsSword(store: LogicStore) {
    return canDoNicheStuff(store) && store.items.Skills >= 3;
}

export function canGetBugWithLantern(store: LogicStore) {
    return false;
}

export function hasSwordOrBS(store: LogicStore) {
    return store.items.Sword > 0 || store.items.Skills >= 3;
}

export function hasBottle(store: LogicStore) {
    // lantern is required in case oil is in all bottles.
    return store.items.Bottle > 0 && store.items.Lantern;
}

export function hasBottles(store: LogicStore) {
    // lantern is required in case oil is in all bottles.
    return store.items.Bottle >= 2 && store.items.Lantern;
}

export function hasHeavyMod(store: LogicStore) {
    return store.items.IronBoots || store.items.MagicArmor;
}

export function hasCutsceneItem(store: LogicStore) {
    return store.items.Skybook > 0 || hasBottle(store) || store.items.Horse_Call;
}

export function canDoLJA(store: LogicStore) {
    return store.items.Sword > 0 && store.items.Boomerang;
}

export function canDoJSLJA(store: LogicStore) {
    return canDoLJA(store) && store.items.Skills >= 6;
}

export function canDoMapGlitch(store: LogicStore) {
    return store.items.Crystal && canReachZone(store, "Kakariko Gorge");
}

export function canDoStorage(store: LogicStore) {
    return canDoMapGlitch(store) && hasOneHandedItem(store);
}

export function hasOneHandedItem(store: LogicStore) {
    return store.items.Sword > 0
        || hasBottle(store)
        || store.items.Boomerang
        || store.items.Clawshot > 0
        || store.items.Lantern
        || store.items.Bow > 0
        || store.items.Slingshot
        || store.items.Dominion > 0;
}

export function canDoMoonBoots(store: LogicStore) {
    return store.items.Sword > 0 && (store.items.MagicArmor || (store.items.IronBoots && getItemWheelSlotCount(store) >= 3));
}

export function canDoJSMoonBoots(store: LogicStore) {
    return canDoMoonBoots(store) && store.items.Skills >= 6;
}

export function canDoBSMoonBoots(store: LogicStore) {
    return store.items.Skills >= 3 && store.items.MagicArmor;
}

export function canDoEBMoonBoots(store: LogicStore) {
    return canDoMoonBoots(store) && store.items.Skills > 0 && store.items.Sword >= 2;
}

export function canDoFlyGlitch(store: LogicStore) {
    return store.items.Rod > 0 && hasHeavyMod(store);
}

export function canDoAirRefill(store: LogicStore) {
    return canUseWaterBombs(store)
        && (store.items.Sword > 0 || store.items.Clawshot > 0)
        && (store.items.MagicArmor || (store.items.IronBoots && getItemWheelSlotCount(store) >= 3));
}


export function canDoHiddenVillageGlitched(store: LogicStore) {
    return store.items.Bow > 0
        || store.items.Chainball
        || (
            store.items.Slingshot
            && (store.items.Crystal || store.items.Sword > 0 || hasBombs(store) || store.items.IronBoots || store.items.Spinner)
        );
}

export function canClearForestGlitched(store: LogicStore) {
    return canCompletePrologue(store) && (
        store.settings.faronWoodsLogic === "open"
        || canCompleteForestTemple(store)
        || canDoLJA(store)
        || canDoMapGlitch(store)
    );
}

export function canDoFTWindlessBridgeRoom(store: LogicStore) {
    return hasBombs(store) || canDoBSMoonBoots(store) || canDoJSMoonBoots(store);
}

export function canCompleteEldinTwilightGlitched(store: LogicStore) {
    return store.settings.skip.eldinTwilight || canClearForestGlitched(store);
}

export function canSkipKeyToDekuToad(store: LogicStore) {
    return (store.settings.smallKeys === "keysy")
        || store.items.Skills >= 3
        || canDoBSMoonBoots(store)
        || canDoJSMoonBoots(store)
        || canDoLJA(store)
        || (hasBombs(store) && (hasHeavyMod(store) || store.items.Skills >= 6));
}

const itemWheelItems: ItemId[] = [
    "Clawshot",
    "Dominion",
    "Chainball",
    "Spinner",
    "Bow",
    "IronBoots",
    "Boomerang",
    "Lantern",
    "Slingshot",
    "Rod",
    "Hawkeye",
    // note: bombs count more than once
    "Bombs",
    // as do bottles
    "Bottle",
    "Memo",
    // > Covers letter, invoice, statue, charm. It doesn't matter which item you
    // > have in the chain, as long as you have the slot available.
    "Renardos_Letter",
];

export function getItemWheelSlotCount(store: LogicStore) {
    let count = 0;
    for (const itemId of itemWheelItems) {
        if (itemId === "Bombs" || itemId === "Bottle") {
            count += store.items[itemId];
            continue;
        }

        // if we have *any* of the item we want to add 1 to the count.
        // I wish this wasn't (seemingly) the most ideomatic way to write this.
        count += +(!!store.items[itemId]);
    }

    return count;
}

export const always = () => true;

/**
 * Placeholder because not all the logic exists yet.
 *
 */
export const never = () => false;
