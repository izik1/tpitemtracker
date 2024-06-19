export type ZoneId = DungeonZoneId | OverworldZoneId;

type DungeonZoneId = ArbitersGroundsZoneId | CitSZoneId | ForestTempleZoneId | GoronMinesZoneId | HyruleCastleZoneId | LakebedTempleZoneId | PoTZoneId | SnowpeakRuinsZoneId | ToTZoneId;

export type ArbitersGroundsZoneId = never;

export type CitSZoneId = never;

export type ForestTempleZoneId =
    | "Forest Temple Boss Room"
    | "Forest Temple East Wing"
    | "Forest Temple Entrance"
    | "Forest Temple Lobby"
    | "Forest Temple North Wing"
    | "Forest Temple West Wing"
    | "Ook";

export type GoronMinesZoneId =
    | "Goron Mines Boss Room"
    | "Goron Mines Crystal Switch Room"
    | "Goron Mines Entrance"
    | "Goron Mines Lower West Wing"
    | "Goron Mines Magnet Room"
    | "Goron Mines North Wing"
    | "Goron Mines Upper East Wing";

type HyruleCastleZoneId = never;

type LakebedTempleZoneId = never;

type PoTZoneId = never;

type SnowpeakRuinsZoneId = never;

type ToTZoneId = never;

// Overworld

type OverworldZoneId = EldinZoneId | FaronZoneId | GerudoZoneId | LanayruZoneId | OrdonaZoneId | SnowpeakZoneId;

export type EldinZoneId =
    | HiddenVillageZoneId
    | EldinFieldZoneId
    | "Death Mountain Interiors"
    | "Death Mountain Trail"
    | "Death Mountain Volcano"
    | "Kakariko Village";

type HiddenVillageZoneId = "Hidden Village";
type EldinFieldZoneId =
    | "Eldin Field Bomskit Grotto"
    | "Eldin Field Stalfos Grotto"
    | "Eldin Field Water Bomb Fish Grotto"
    | "Eldin Field"
    | "Eldin Long Cave"
    | "Goron Stockcave"
    | "Kakariko Gorge";

export type FaronZoneId = FaronWoodsZoneId | FaronFieldZoneId | SacredGroveZoneId;

type FaronWoodsZoneId = "Faron Mist Area" | "Faron Mist Cave" | "North Faron Woods" | "South Faron Woods Cave" | "South Faron Woods";

type FaronFieldZoneId = "Faron Field" | "Faron Field Corner Grotto";

type SacredGroveZoneId = "Lost Woods" | "Sacred Grove Baba Serpent Grotto" | "Sacred Grove Master Sword" | "Sacred Grove Temple of Time";

type GerudoZoneId = never;

type LanayruZoneId = never;

export type OrdonaZoneId = "Ordon Province" | "Ordon Ranch Grotto";

type SnowpeakZoneId = never;
