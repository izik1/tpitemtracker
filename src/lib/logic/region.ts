import type {
    ArbitersGroundsCheckName,
    CheckName,
    CitSCheckName,
    EldinCheckName,
    FaronCheckName,
    ForestTempleCheckName,
    GerudoCheckName,
    GoronMinesCheckName,
    HyruleCastleCheckName,
    LakebedTempleCheckName,
    LanayruCheckName,
    OrdonaCheckName,
    PoTCheckName,
    SnowpeakCheckName,
    SnowpeakRuinsCheckName,
    ToTCheckName
} from "./check-name";

import type {
    ArbitersGroundsZoneId,
    CitSZoneId,
    EldinZoneId,
    FaronZoneId,
    ForestTempleZoneId,
    GerudoZoneId,
    GoronMinesZoneId,
    HyruleCastleZoneId,
    LakebedTempleZoneId,
    LanayruZoneId,
    OrdonaZoneId,
    PoTZoneId,
    SnowpeakRuinsZoneId,
    SnowpeakZoneId,
    ToTZoneId,
    ZoneId
} from "./zone/id";

interface Region<Z extends ZoneId, C extends CheckName> {
    zones: Z;
    checks: C;
}

export type RegionKey = keyof RegionMap;

export type RegionMap = {
    ordon: Region<OrdonaZoneId, OrdonaCheckName>;
    faron: Region<FaronZoneId, FaronCheckName>;
    eldin: Region<EldinZoneId, EldinCheckName>;
    lanayru: Region<LanayruZoneId, LanayruCheckName>;
    gerudo: Region<GerudoZoneId, GerudoCheckName>;
    snowpeak: Region<SnowpeakZoneId, SnowpeakCheckName>;

    forestTemple: Region<ForestTempleZoneId, ForestTempleCheckName>;
    goronMines: Region<GoronMinesZoneId, GoronMinesCheckName>;
    lakebedTemple: Region<LakebedTempleZoneId, LakebedTempleCheckName>;
    arbitersGrounds: Region<ArbitersGroundsZoneId, ArbitersGroundsCheckName>;
    snowpeakRuins: Region<SnowpeakRuinsZoneId, SnowpeakRuinsCheckName>;
    templeOfTime: Region<ToTZoneId, ToTCheckName>,
    cityInTheSky: Region<CitSZoneId, CitSCheckName>,
    palaceOfTwilight: Region<PoTZoneId, PoTCheckName>,
    hyruleCastle: Region<HyruleCastleZoneId, HyruleCastleCheckName>,
};

export type Regions<K extends "zones" | "checks", V> = Readonly<{ [P in keyof RegionMap]: Record<RegionMap[P][K], V> }>;
