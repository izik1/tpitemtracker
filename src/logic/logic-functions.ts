import store from "../store";
import { type Zones } from "./zones";

export function hasDamagingIronBoots() {
    return (canDoNicheStuff() && store.items.IronBoots);
}

// Logic export functions, these help make item requirements simpler and allow us not to clutter the individual item checks
export function hasDamagingItem(checkNiche: boolean) {
    return store.items.Sword > 0
        || store.items.Chainball
        || store.items.Bow > 0
        || store.items.Bombs > 0
        || (store.items.IronBoots && (!checkNiche || canDoNicheStuff()))
        || store.items.Crystal
        || store.items.Spinner;
}

export function canDefeatArealfos() {
    return store.items.Clawshot > 0 && (
        store.items.Sword > 0
        || store.items.Chainball
        || store.items.Crystal
        || hasDamagingIronBoots()
    );
}

export function canDefeatArmos() {
    return hasDamagingItem(true)
        || store.items.Clawshot > 0
        || canUseBacksliceAsSword();
}

export function canDefeatBabaSerpent() {
    return hasDamagingItem(true)
        || canUseBacksliceAsSword();
}

export function canDefeatbabyGohma() {
    return store.items.Sword > 0
        || store.items.Chainball
        || store.items.Bow > 0
        || hasDamagingIronBoots()
        || store.items.Spinner
        || store.items.Slingshot
        || store.items.Clawshot > 0
        || hasBombs()
        || canUseBacksliceAsSword();
}

export function canDefeatBari() {
    return canUseWaterBombs() || store.items.Clawshot > 0;
}

export function canDefeatBeamos() {
    return store.items.Chainball || store.items.Bow > 0 || hasBombs();
}

export function canDefeatBigBaba() {
    return store.items.Sword > 0
        || store.items.Chainball
        || (store.items.Bow > 0 && canGetArrows())
        || hasDamagingIronBoots()
        || store.items.Crystal
        || store.items.Spinner
        || hasBombs()
        || canUseBacksliceAsSword();
}

export function canDefeatChu() {
    console.debug('stub');
    return false;
}

export function canDefeatBokoblin() {
    return store.items.Sword > 0
        || store.items.Chainball
        || (store.items.Bow > 0 && canGetArrows())
        || hasDamagingIronBoots()
        || store.items.Spinner
        || store.items.Slingshot
        || store.items.Crystal
        || hasBombs()
        || canUseBacksliceAsSword();
}

export function canDefeatBokoblinRed() {
    console.debug('stub');
    return false;
}

export function canDefeatBombfish() {
    console.debug('stub');
    return false;
}

export function canDefeatBombling() {
    console.debug('stub');
    return false;
}

export function canDefeatBomskit() {
    return store.items.Sword > 0
        || store.items.Chainball
        || store.items.Bow > 0
        || store.items.Spinner
        || store.items.Crystal
        || hasBombs()
        || canUseBacksliceAsSword()
        || (canDoNicheStuff() && store.items.IronBoots);
}

export function canDefeatBubble() {
    console.debug('stub');
    return false;
}

export function canDefeatBulbin() {
    return store.items.Sword > 0
        || store.items.Chainball
        || store.items.Bow > 0
        || (canDoNicheStuff() && store.items.IronBoots)
        || store.items.Spinner
        || store.items.Crystal
        || hasBombs()
        || canUseBacksliceAsSword();
}

export function canDefeatChilfos() {
    console.debug('stub');
    return false;
}

export function canDefeatChuWorm() {
    console.debug('stub');
    return false;
}

export function canDefeatDarknut() {
    console.debug('stub');
    return false;
}

export function canDefeatDekuBaba() {
    console.debug('stub');
    return false;
}

export function canDefeatDekuLike() {
    console.debug('stub');
    return false;
}

export function canDefeatDodongo() {
    console.debug('stub');
    return false;
}

export function canDefeatDinalfos() {
    console.debug('stub');
    return false;
}

export function canDefeatFireBubble() {
    console.debug('stub');
    return false;
}

export function canDefeatFireKeese() {
    console.debug('stub');
    return false;
}

export function canDefeatFireToadpoli() {
    console.debug('stub');
    return false;
}

export function canDefeatFreezard() {
    console.debug('stub');
    return false;
}

export function canDefeatGoron() {
    return store.items.Sword > 0
        || store.items.Chainball
        || store.items.Bow > 0
        || (canDoNicheStuff() && (store.items.IronBoots || store.items.Boomerang))
        || store.items.Spinner
        || (hasShield() && (store.items.Skills >= 2))
        || store.items.Slingshot
        || (canDoDifficultCombat() && store.items.Lantern)
        || store.items.Clawshot > 0
        || hasBombs()
        || canUseBacksliceAsSword();
}

export function canDefeatGhoulRat() {
    console.debug('stub');
    return false;
}

export function canDefeatGuay() {
    console.debug('stub');
    return false;
}

export function canDefeatHelmasaur() {
    console.debug('stub');
    return false;
}

export function canDefeatHelmasaurus() {
    console.debug('stub');
    return false;
}

export function canDefeatIceBubble() {
    console.debug('stub');
    return false;
}

export function canDefeatIceKeese() {
    console.debug('stub');
    return false;
}

export function canDefeatKargarok() {
    console.debug('stub');
    return false;
}

export function canDefeatKeese() {
    console.debug('stub');
    return false;
}

export function canDefeatLeever() {
    console.debug('stub');
    return false;
}

export function canDefeatLizalfos() {
    console.debug('stub');
    return false;
}

export function canDefeatMiniFreezard() {
    console.debug('stub');
    return false;
}

export function canDefeatMoldorm() {
    console.debug('stub');
    return false;
}

export function canDefeatPoisonMite() {
    console.debug('stub');
    return false;
}

export function canDefeatPuppet() {
    console.debug('stub');
    return false;
}

export function canDefeatRat() {
    console.debug('stub');
    return false;
}

export function canDefeatRedeadKnight() {
    console.debug('stub');
    return false;
}

export function canDefeatShadowBeast() {
    return store.items.Sword > 0 || (store.items.Crystal && canCompleteMDH());
}

export function canDefeatShadowBublin() {
    console.debug('stub');
    return false;
}

export function canDefeatShadowDekuBaba() {
    console.debug('stub');
    return false;
}

export function canDefeatShadowInsect() {
    console.debug('stub');
    return false;
}

export function canDefeatShadowKargarok() {
    console.debug('stub');
    return false;
}

export function canDefeatShadowKeese() {
    console.debug('stub');
    return false;
}

export function canDefeatShadowVermin() {
    console.debug('stub');
    return false;
}

export function canDefeatShellBlade() {
    console.debug('stub');
    return false;
}

export function canDefeatSkullfish() {
    console.debug('stub');
    return false;
}

export function canDefeatSkulltula() {
    return store.items.Sword > 0
        || store.items.Chainball
        || store.items.Bow > 0
        || hasDamagingIronBoots()
        || store.items.Spinner
        || store.items.Crystal
        || hasBombs()
        || canUseBacksliceAsSword();
}

export function canDefeatStalhound() {
    console.debug('stub');
    return false;
}

export function canDefeatStalchild() {
    console.debug('stub');
    return false;
}

export function canDefeatTaktite() {
    console.debug('stub');
    return false;
}

export function canDefeatTileWorm() {
    if (!store.items.Boomerang) {
        return false;
    }

    return store.items.Sword > 0
        || store.items.Chainball
        || store.items.Bow > 0
        || store.items.Crystal
        || store.items.Spinner
        || hasDamagingIronBoots()
        || hasBombs()
        || canUseBacksliceAsSword();
}

export function canDefeatToado() {
    console.debug('stub');
    return false;
}

export function canDefeatWaterToadpoli() {
    console.debug('stub');
    return false;
}

export function canDefeatTorchSlug() {
    console.debug('stub');
    return false;
}

export function canDefeatWalltula() {
    return store.items.Chainball
        || store.items.Slingshot
        || store.items.Boomerang
        || store.items.Clawshot > 0
        || (store.items.Bow > 0 && canGetArrows());
}

export function canDefeatWhiteWolfos() {
    console.debug('stub');
    return false;
}

export function canDefeatYoungGohma() {
    console.debug('stub');
    return false;
}

export function canDefeatZantHead() {
    console.debug('stub');
    return false;
}

export function canDefeatOok() {
    return store.items.Sword > 0
        || store.items.Chainball
        || (store.items.Bow > 0 && canGetArrows())
        || hasDamagingIronBoots()
        || store.items.Crystal
        || hasBombs()
        || canUseBacksliceAsSword();
}

export function canDefeatDangoro() {
    return store.items.IronBoots
        && (
            store.items.Sword > 0
            || store.items.Crystal
            || (canDoNicheStuff() && (store.items.Chainball || (store.items.Bow > 0 && hasBombs())))
        );
}

export function canDefeatCarrierKargarok() {
    console.debug('stub');
    return false;
}

export function canDefeatTwilitBloat() {
    console.debug('stub');
    return false;
}

export function canDefeatDekuToad() {
    console.debug('stub');
    return false;
}

export function canDefeatSkullKid() {
    return store.items.Bow > 0;
}

export function canDefeatKingBulblinBridge() {
    console.debug('stub');
    return false;
}

export function canDefeatKingBulbinDesert() {
    console.debug('stub');
    return false;
}

export function canDefeatKingBulblinCastle() {
    console.debug('stub');
    return false;
}

export function canDefeatDeathSword() {
    console.debug('stub');
    return false;
}

export function canDefeatDarkhammer() {
    console.debug('stub');
    return false;
}

export function canDefeaatPhantomZant() {
    console.debug('stub');
    return false;
}

export function canDefeatDiababa() {
    return canLaunchBombs() || (
        store.items.Boomerang && (
            store.items.Sword > 0
            || store.items.Chainball
            || hasDamagingIronBoots()
            || store.items.Crystal
            || hasBombs()
            || (canDoDifficultCombat() && canUseBacksliceAsSword())
        )
    );
}

export function canDefeatFyrus() {
    return store.items.Bow > 0
        && store.items.IronBoots
        && (store.items.Sword > 0 || (canDoDifficultCombat() && canUseBacksliceAsSword()));
}

export function canDefeatMorpheel() {
    return store.items.ZoraArmor
        && store.items.IronBoots
        && store.items.Sword > 0
        && store.items.Clawshot > 0;
}

export function canDefeatStallord() {
    console.debug('stub');
    return false;
}

export function canDefeatBlizzeta() {
    console.debug('stub');
    return false;
}

export function canDefeatArmogohma() {
    console.debug('stub');
    return false;
}

export function canDefeatArgorok() {
    console.debug('stub');
    return false;
}

export function canDefeatZant() {
    console.debug('stub');
    return false;
}

export function canDefeatGanondorf() {
    console.debug('stub');
    return false;
}

export function canSmash() {
    return store.items.Chainball || hasBombs();
}

export function canBurnWebs() {
    return canSmash() || store.items.Lantern;
}

export function hasRangedItem() {
    console.debug('stub');
    return false;
}

export function hasShield() {
    console.debug('stub');
    return false;
}

export function canUseBottledFairy() {
    console.debug('stub');
    return false;
}


export function canUseBottledFairies() {
    console.debug('stub');
    return false;
}

export function canUseOilBottle() {
    console.debug('stub');
    return false;
}

export function canLaunchBombs() {
    return (store.items.Boomerang || store.items.Bow > 0) && hasBombs();
}

export function canCutHangingWeb() {
    return store.items.Clawshot >= 1
        || (store.items.Bow && canGetArrows())
        || store.items.Boomerang
        || store.items.Chainball;
}

export function canKnockDownHCPainting() {
    console.debug('stub');
    return false;
}

export function canBreakMonkeyCage() {
    return store.items.Sword > 0
        || store.items.IronBoots
        || store.items.Spinner
        || store.items.Chainball
        || store.items.Crystal
        || hasBombs()
        || (store.items.Bow > 0 && canGetArrows())
        || store.items.Clawshot > 0
        || (canDoNicheStuff() && store.items.Skills >= 2);
}

export function canPressMinesSwitch() {
    return store.items.IronBoots || (canDoNicheStuff() && store.items.Chainball);
}

export function canFreeAllMonkeys() {
    return canBreakMonkeyCage()
        && (
            store.items.Lantern
            // || (
            //     /* key setting: https://github.com/zsrtp/Randomizer-Web-Generator/blob/b5ad864ba738a7daa3ccfe8f3076d2a906d6474d/Generator/Logic/LogicFunctions.cs#L1513 */
            //     (hasBombs() || store.items.IronBoots)
            // )
        )
        && canBurnWebs()
        && store.items.Boomerang
        && canDefeatBokoblin();
    // another key setting
}

export function canKnockDownHangingBaba() {
    return store.items.Bow > 0
        || store.items.Clawshot > 0
        || store.items.Boomerang
        || store.items.Slingshot;
}

export function canBreakWoodenDoor() {
    return store.items.Crystal
        || store.items.Sword > 0
        || canSmash()
        || canUseBacksliceAsSword();

}

export function hasBombs() {
    // the actual rando logic a lot more complicated:
    // https://github.com/zsrtp/Randomizer-Web-Generator/blob/b5ad864ba738a7daa3ccfe8f3076d2a906d6474d/Generator/Logic/LogicFunctions.cs#L1554
    return store.items.Bombs >= 1;
}

export function canUseWaterBombs() {
    // the actual rando logic a lot more complicated:
    // https://github.com/zsrtp/Randomizer-Web-Generator/blob/b5ad864ba738a7daa3ccfe8f3076d2a906d6474d/Generator/Logic/LogicFunctions.cs#L1577
    return store.items.WBombs;
}

export function canGetArrows() {
    return canClearForest() || store.logic.reachableZones.has("Lost Woods");
}

export function canClearForest() {
    return (canCompleteForestTemple() || store.settings.randomizer.faronWoodsLogic === "open") && canCompletePrologue();
}

export function canCompletePrologue() {
    // fixme: check for north faron gate key (or keysy)
    return (store.items.Sword >= 1 && store.items.Slingshot) || store.settings.randomizer.skip.prologue;
}

export function canCompleteMDH() {
    return store.settings.randomizer.skip.mdh || canCompleteLakebedTemple();
}

export function canCompleteEldinTwilight() {
    console.debug('stub');
    return false;
}

export function canCompleteForestTemple() {
    return store.logic.reachableZones.has("Forest Temple Boss Room") && canDefeatDiababa();
}

export function canCompleteGoronMines() {
    return store.logic.reachableZones.has("Goron Mines Boss Room") && canDefeatFyrus();
}

export function canCompleteLakebedTemple() {
    return store.logic.reachableZones.has("Lakebed Temple Boos Room") && canDefeatMorpheel();
}

export function canCompleteArbitersGrounds() {
    console.debug('stub');
    return false;
}

export function canCompleteSnowpeakRuins() {
    console.debug('stub');
    return false;
}

export function canCompleteTempleofTime() {
    console.debug('stub');
    return false;
}

export function canCompleteCityInTheSky() {
    console.debug('stub');
    return false;
}

export function canCompletePalaceofTwilight() {
    console.debug('stub');
    return false;
}

export function canCompleteAllDungeons() {
    console.debug('stub');
    return false;
}

export function hasBug() {
    console.debug('stub');
    return false;
}

export function canDoDifficultCombat() {
    // https://github.com/zsrtp/Randomizer-Web-Generator/blob/b5ad864ba738a7daa3ccfe8f3076d2a906d6474d/Generator/Logic/LogicFunctions.cs#L1777
    // it's a stub, but it actually always returns the right value.
    // console.debug('half-stub');
    return false;
}

export function canDoNicheStuff() {
    // https://github.com/zsrtp/Randomizer-Web-Generator/blob/b5ad864ba738a7daa3ccfe8f3076d2a906d6474d/Generator/Logic/LogicFunctions.cs#L1786
    return store.settings.randomizer.logic === "glitched";
}

export function canUseBacksliceAsSword() {
    return canDoNicheStuff() && store.items.Skills >= 3;
}

export function canGetBugWithLantern() {
    console.debug('stub');
    return false;
}

export function hasSwordOrBS() {
    console.debug('stub');
    return false;
}

export function hasBottle() {
    // lantern is required in case oil is in all bottles.
    return store.items.Bottle > 0 && store.items.Lantern;
}

export function hasBottles() {
    // lantern is required in case oil is in all bottles.
    return store.items.Bottle >= 2 && store.items.Lantern;
}

export function hasHeavyMod() {
    console.debug('stub');
    return false;
}

export function hasCutsceneItem() {
    console.debug('stub');
    return false;
}

export function zDoLJA() {
    console.debug('stub');
    return false;
}

export function canDoJSLJA() {
    console.debug('stub');
    return false;
}

export function canDoMapGlitch() {
    console.debug('stub');
    return false;
}

export function canDoStorage() {
    console.debug('stub');
    return false;
}

export function hasOneHandedItem() {
    console.debug('stub');
    return false;
}

export function canDoMoonBoots() {
    console.debug('stub');
    return false;
}

export function canDoJSMoonBoots() {
    console.debug('stub');
    return false;
}

export function canDoBSMoonBoots() {
    console.debug('stub');
    return false;
}

export function canDoEBMoonBoots() {
    console.debug('stub');
    return false;
}

export function canDoFlyGlitch() {
    console.debug('stub');
    return false;
}

export function canDoAirRefill() {
    console.debug('stub');
    return false;
}


export function canDoHiddenVillageGlitched() {
    console.debug('stub');
    return false;
}

export function canDoFTWindlessBridgeRoom() {
    console.debug('stub');
    return false;
}

export function canCompleteEldinTwilightGlitched() {
    console.debug('stub');
    return false;
}

export function canSkipKeyToDekuToad() {
    console.debug('stub');
    return false;
}

export const always = () => true;

/**
 * Placeholder because not all the logic exists yet.
 *
 */
export const never = () => false;
