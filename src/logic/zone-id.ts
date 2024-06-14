export type ZoneId = DungeonZoneId | OverworldZoneId;

type DungeonZoneId = ArbitersGroundsZoneId | CitSZoneId | ForestTempleZoneId | GoronMinesZoneId | HyruleCastleZoneId | LakebedTempleZoneId | PoTZoneId | SnowpeakRuinsZoneId | ToTZoneId;

type ArbitersGroundsZoneId = never;

type CitSZoneId = never;

type ForestTempleZoneId =
    | "Forest Temple Boss Room"
    | "Forest Temple East Wing"
    | "Forest Temple Entrance"
    | "Forest Temple Lobby"
    | "Forest Temple North Wing"
    | "Forest Temple West Wing"
    | "Ook";

type GoronMinesZoneId = never;

type HyruleCastleZoneId = never;

type LakebedTempleZoneId = never;

type PoTZoneId = never;

type SnowpeakRuinsZoneId = never;

type ToTZoneId = never;

// Overworld

type OverworldZoneId = EldinZoneId | FaronZoneId | GerudoZoneId | LanayruZoneId | OrdonaZoneId | SnowpeakZoneId;

type EldinZoneId = never;

type FaronZoneId = FaronWoodsZoneId | FaronFieldZoneId | SacredGroveZoneId;

type FaronWoodsZoneId = "Faron Mist Area" | "Faron Mist Cave" | "North Faron Woods" | "South Faron Woods Cave" | "South Faron Woods";

type FaronFieldZoneId = "Faron Field" | "Faron Field Corner Grotto";

type SacredGroveZoneId = "Lost Woods" | "Sacred Grove Baba Serpent Grotto" | "Sacred Grove Master Sword" | "Sacred Grove Temple of Time";

type GerudoZoneId = never;

type LanayruZoneId = never;

type OrdonaZoneId = "Ordon Province" | "Ordon Ranch Grotto";

type SnowpeakZoneId = never;
