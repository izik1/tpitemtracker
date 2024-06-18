import type { LogicStore } from ".";

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

export function canDefeatArealfos(store: LogicStore) {
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
    console.debug('stub');
    return false;
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
    console.debug('stub');
    return false;
}

export function canDefeatBombfish(store: LogicStore) {
    console.debug('stub');
    return false;
}

export function canDefeatBombling(store: LogicStore) {
    console.debug('stub');
    return false;
}

export function canDefeatBomskit(store: LogicStore) {
    return store.items.Sword > 0
        || store.items.Chainball
        || store.items.Bow > 0
        || store.items.Spinner
        || store.items.Crystal
        || hasBombs(store)
        || canUseBacksliceAsSword(store)
        || (canDoNicheStuff(store) && store.items.IronBoots);
}

export function canDefeatBubble(store: LogicStore) {
    console.debug('stub');
    return false;
}

export function canDefeatBulbin(store: LogicStore) {
    return store.items.Sword > 0
        || store.items.Chainball
        || store.items.Bow > 0
        || (canDoNicheStuff(store) && store.items.IronBoots)
        || store.items.Spinner
        || store.items.Crystal
        || hasBombs(store)
        || canUseBacksliceAsSword(store);
}

export function canDefeatChilfos(store: LogicStore) {
    console.debug('stub');
    return false;
}

export function canDefeatChuWorm(store: LogicStore) {
    console.debug('stub');
    return false;
}

export function canDefeatDarknut(store: LogicStore) {
    console.debug('stub');
    return false;
}

export function canDefeatDekuBaba(store: LogicStore) {
    console.debug('stub');
    return false;
}

export function canDefeatDekuLike(store: LogicStore) {
    console.debug('stub');
    return false;
}

export function canDefeatDodongo(store: LogicStore) {
    console.debug('stub');
    return false;
}

export function canDefeatDinalfos(store: LogicStore) {
    console.debug('stub');
    return false;
}

export function canDefeatFireBubble(store: LogicStore) {
    console.debug('stub');
    return false;
}

export function canDefeatFireKeese(store: LogicStore) {
    console.debug('stub');
    return false;
}

export function canDefeatFireToadpoli(store: LogicStore) {
    console.debug('stub');
    return false;
}

export function canDefeatFreezard(store: LogicStore) {
    console.debug('stub');
    return false;
}

export function canDefeatGoron(store: LogicStore) {
    return store.items.Sword > 0
        || store.items.Chainball
        || store.items.Bow > 0
        || (canDoNicheStuff(store) && (store.items.IronBoots || store.items.Boomerang))
        || store.items.Spinner
        || (hasShield(store) && (store.items.Skills >= 2))
        || store.items.Slingshot
        || (canDoDifficultCombat(store) && store.items.Lantern)
        || store.items.Clawshot > 0
        || hasBombs(store)
        || canUseBacksliceAsSword(store);
}

export function canDefeatGhoulRat(store: LogicStore) {
    console.debug('stub');
    return false;
}

export function canDefeatGuay(store: LogicStore) {
    console.debug('stub');
    return false;
}

export function canDefeatHelmasaur(store: LogicStore) {
    console.debug('stub');
    return false;
}

export function canDefeatHelmasaurus(store: LogicStore) {
    console.debug('stub');
    return false;
}

export function canDefeatIceBubble(store: LogicStore) {
    console.debug('stub');
    return false;
}

export function canDefeatIceKeese(store: LogicStore) {
    console.debug('stub');
    return false;
}

export function canDefeatKargarok(store: LogicStore) {
    console.debug('stub');
    return false;
}

export function canDefeatKeese(store: LogicStore) {
    console.debug('stub');
    return false;
}

export function canDefeatLeever(store: LogicStore) {
    console.debug('stub');
    return false;
}

export function canDefeatLizalfos(store: LogicStore) {
    console.debug('stub');
    return false;
}

export function canDefeatMiniFreezard(store: LogicStore) {
    console.debug('stub');
    return false;
}

export function canDefeatMoldorm(store: LogicStore) {
    console.debug('stub');
    return false;
}

export function canDefeatPoisonMite(store: LogicStore) {
    console.debug('stub');
    return false;
}

export function canDefeatPuppet(store: LogicStore) {
    console.debug('stub');
    return false;
}

export function canDefeatRat(store: LogicStore) {
    console.debug('stub');
    return false;
}

export function canDefeatRedeadKnight(store: LogicStore) {
    console.debug('stub');
    return false;
}

export function canDefeatShadowBeast(store: LogicStore) {
    return store.items.Sword > 0 || (store.items.Crystal && canCompleteMDH(store));
}

export function canDefeatShadowBublin(store: LogicStore) {
    console.debug('stub');
    return false;
}

export function canDefeatShadowDekuBaba(store: LogicStore) {
    console.debug('stub');
    return false;
}

export function canDefeatShadowInsect(store: LogicStore) {
    console.debug('stub');
    return false;
}

export function canDefeatShadowKargarok(store: LogicStore) {
    console.debug('stub');
    return false;
}

export function canDefeatShadowKeese(store: LogicStore) {
    console.debug('stub');
    return false;
}

export function canDefeatShadowVermin(store: LogicStore) {
    console.debug('stub');
    return false;
}

export function canDefeatShellBlade(store: LogicStore) {
    console.debug('stub');
    return false;
}

export function canDefeatSkullfish(store: LogicStore) {
    console.debug('stub');
    return false;
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
    console.debug('stub');
    return false;
}

export function canDefeatStalchild(store: LogicStore) {
    console.debug('stub');
    return false;
}

export function canDefeatTaktite(store: LogicStore) {
    console.debug('stub');
    return false;
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
    console.debug('stub');
    return false;
}

export function canDefeatWaterToadpoli(store: LogicStore) {
    console.debug('stub');
    return false;
}

export function canDefeatTorchSlug(store: LogicStore) {
    console.debug('stub');
    return false;
}

export function canDefeatWalltula(store: LogicStore) {
    return store.items.Chainball
        || store.items.Slingshot
        || store.items.Boomerang
        || store.items.Clawshot > 0
        || (store.items.Bow > 0 && canGetArrows(store));
}

export function canDefeatWhiteWolfos(store: LogicStore) {
    console.debug('stub');
    return false;
}

export function canDefeatYoungGohma(store: LogicStore) {
    console.debug('stub');
    return false;
}

export function canDefeatZantHead(store: LogicStore) {
    console.debug('stub');
    return false;
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
    console.debug('stub');
    return false;
}

export function canDefeatTwilitBloat(store: LogicStore) {
    console.debug('stub');
    return false;
}

export function canDefeatDekuToad(store: LogicStore) {
    console.debug('stub');
    return false;
}

export function canDefeatSkullKid(store: LogicStore) {
    return store.items.Bow > 0;
}

export function canDefeatKingBulblinBridge(store: LogicStore) {
    console.debug('stub');
    return false;
}

export function canDefeatKingBulbinDesert(store: LogicStore) {
    console.debug('stub');
    return false;
}

export function canDefeatKingBulblinCastle(store: LogicStore) {
    console.debug('stub');
    return false;
}

export function canDefeatDeathSword(store: LogicStore) {
    console.debug('stub');
    return false;
}

export function canDefeatDarkhammer(store: LogicStore) {
    console.debug('stub');
    return false;
}

export function canDefeaatPhantomZant(store: LogicStore) {
    console.debug('stub');
    return false;
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
    console.debug('stub');
    return false;
}

export function canDefeatBlizzeta(store: LogicStore) {
    console.debug('stub');
    return false;
}

export function canDefeatArmogohma(store: LogicStore) {
    console.debug('stub');
    return false;
}

export function canDefeatArgorok(store: LogicStore) {
    console.debug('stub');
    return false;
}

export function canDefeatZant(store: LogicStore) {
    console.debug('stub');
    return false;
}

export function canDefeatGanondorf(store: LogicStore) {
    console.debug('stub');
    return false;
}

export function canSmash(store: LogicStore) {
    return store.items.Chainball || hasBombs(store);
}

export function canBurnWebs(store: LogicStore) {
    return canSmash(store) || store.items.Lantern;
}

export function hasRangedItem(store: LogicStore) {
    console.debug('stub');
    return false;
}

export function hasShield(store: LogicStore) {
    console.debug('stub');
    return false;
}

export function canUseBottledFairy(store: LogicStore) {
    console.debug('stub');
    return false;
}


export function canUseBottledFairies(store: LogicStore) {
    console.debug('stub');
    return false;
}

export function canUseOilBottle(store: LogicStore) {
    console.debug('stub');
    return false;
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
    console.debug('stub');
    return false;
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
    return store.items.WBombs;
}

export function canGetArrows(store: LogicStore) {
    return canClearForest(store) || store.reachableZones.has("Lost Woods");
}

export function canClearForest(store: LogicStore) {
    return (canCompleteForestTemple(store) || store.settings.faronWoodsLogic === "open") && canCompletePrologue(store);
}

export function canCompletePrologue({ settings, items }: LogicStore) {
    // fixme: check for north faron gate key (or keysy)
    return (items.Sword >= 1 && items.Slingshot) || settings.skip.prologue;
}

export function canCompleteMDH(store: LogicStore) {
    return store.settings.skip.mdh || canCompleteLakebedTemple(store);
}

export function canCompleteEldinTwilight() {
    console.debug('stub');
    return false;
}

export function canCompleteForestTemple(store: LogicStore) {
    return store.reachableZones.has("Forest Temple Boss Room") && canDefeatDiababa(store);
}

export function canCompleteGoronMines(store: LogicStore) {
    return store.reachableZones.has("Goron Mines Boss Room") && canDefeatFyrus(store);
}

export function canCompleteLakebedTemple(store: LogicStore) {
    return store.reachableZones.has("Lakebed Temple Boss Room") && canDefeatMorpheel(store);
}

export function canCompleteArbitersGrounds(store: LogicStore) {
    console.debug('stub');
    return false;
}

export function canCompleteSnowpeakRuins(store: LogicStore) {
    console.debug('stub');
    return false;
}

export function canCompleteTempleofTime(store: LogicStore) {
    console.debug('stub');
    return false;
}

export function canCompleteCityInTheSky(store: LogicStore) {
    console.debug('stub');
    return false;
}

export function canCompletePalaceofTwilight(store: LogicStore) {
    console.debug('stub');
    return false;
}

export function canCompleteAllDungeons(store: LogicStore) {
    console.debug('stub');
    return false;
}

export function hasBug(store: LogicStore) {
    console.debug('stub');
    return false;
}

export function canDoDifficultCombat(store: LogicStore) {
    // https://github.com/zsrtp/Randomizer-Web-Generator/blob/b5ad864ba738a7daa3ccfe8f3076d2a906d6474d/Generator/Logic/LogicFunctions.cs#L1777
    // it's a stub, but it actually always returns the right value.
    // console.debug('half-stub');
    return false;
}

export function canDoNicheStuff(store: LogicStore) {
    // https://github.com/zsrtp/Randomizer-Web-Generator/blob/b5ad864ba738a7daa3ccfe8f3076d2a906d6474d/Generator/Logic/LogicFunctions.cs#L1786
    return false;
    // return store.settings.logic === "glitched";
}

export function canUseBacksliceAsSword(store: LogicStore) {
    return canDoNicheStuff(store) && store.items.Skills >= 3;
}

export function canGetBugWithLantern(store: LogicStore) {
    console.debug('stub');
    return false;
}

export function hasSwordOrBS(store: LogicStore) {
    console.debug('stub');
    return false;
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
    console.debug('stub');
    return false;
}

export function hasCutsceneItem(store: LogicStore) {
    console.debug('stub');
    return false;
}

export function zDoLJA(store: LogicStore) {
    console.debug('stub');
    return false;
}

export function canDoJSLJA(store: LogicStore) {
    console.debug('stub');
    return false;
}

export function canDoMapGlitch(store: LogicStore) {
    console.debug('stub');
    return false;
}

export function canDoStorage(store: LogicStore) {
    console.debug('stub');
    return false;
}

export function hasOneHandedItem(store: LogicStore) {
    console.debug('stub');
    return false;
}

export function canDoMoonBoots(store: LogicStore) {
    console.debug('stub');
    return false;
}

export function canDoJSMoonBoots(store: LogicStore) {
    console.debug('stub');
    return false;
}

export function canDoBSMoonBoots(store: LogicStore) {
    console.debug('stub');
    return false;
}

export function canDoEBMoonBoots(store: LogicStore) {
    console.debug('stub');
    return false;
}

export function canDoFlyGlitch(store: LogicStore) {
    console.debug('stub');
    return false;
}

export function canDoAirRefill(store: LogicStore) {
    console.debug('stub');
    return false;
}


export function canDoHiddenVillageGlitched(store: LogicStore) {
    console.debug('stub');
    return false;
}

export function canDoFTWindlessBridgeRoom(store: LogicStore) {
    console.debug('stub');
    return false;
}

export function canCompleteEldinTwilightGlitched(store: LogicStore) {
    console.debug('stub');
    return false;
}

export function canSkipKeyToDekuToad(store: LogicStore) {
    console.debug('stub');
    return false;
}

export const always = () => true;

/**
 * Placeholder because not all the logic exists yet.
 *
 */
export const never = () => false;
