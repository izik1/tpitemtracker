export type ZoneId = DungeonZoneId | OverworldZoneId;

type DungeonZoneId = ArbitersGroundsZoneId | CitSZoneId | ForestTempleZoneId | GoronMinesZoneId | HyruleCastleZoneId | LakebedTempleZoneId | PoTZoneId | SnowpeakRuinsZoneId | ToTZoneId;

export type ArbitersGroundsZoneId =
    | "Arbiters Grounds After Poe Gate"
    | "Arbiters Grounds Boss Room"
    | "Arbiters Grounds East Wing"
    | "Arbiters Grounds Entrance"
    | "Arbiters Grounds Lobby"
    | "Arbiters Grounds West Wing";

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
export type LakebedTempleZoneId =
    | "Lakebed Temple Boss Room"
    | "Lakebed Temple Central Room"
    | "Lakebed Temple East Wing First Floor"
    | "Lakebed Temple East Wing Second Floor"
    | "Lakebed Temple Entrance"
    | "Lakebed Temple West Wing";

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

export type GerudoZoneId = GerudoDesertZoneId | CaveOfOrdealsZoneId;

type GerudoDesertZoneId =
    | "Bulblin Camp"
    | "Gerudo Desert Rock Grotto"
    | "Gerudo Desert Skulltula Grotto"
    | "Gerudo Desert"
    | "Mirror Chamber"
    | "Outside Arbiters Grounds";

type CaveOfOrdealsZoneId =
    | "Cave of Ordeals Floors 01-11"
    | "Cave of Ordeals Floors 12-21"
    | "Cave of Ordeals Floors 22-31"
    | "Cave of Ordeals Floors 32-41"
    | "Cave of Ordeals Floors 42-50";

export type LanayruZoneId = CastleTownZoneId | LanayruFieldZoneId | LakeHyliaZoneId | ZorasDomainZoneId;

type CastleTownZoneId = "Castle Town";

type LanayruFieldZoneId =
    | "Lake Hylia Bridge Bubble Grotto"
    | "Lake Hylia Bridge"
    | "Lanayru Field Poe Grotto"
    | "Lanayru Field Skulltula Grotto"
    | "Lanayru Field"
    | "Lanayru Ice Puzzle Cave"
    | "Outside Castle Town South"
    | "Outside Castle Town West"
    | "Outside South Castle Town Tektite Grotto"
    | "West Hyrule Field Helmasaur Grotto";

type LakeHyliaZoneId =
    | "Lake Hylia Long Cave"
    | "Lake Hylia Shell Blade Grotto"
    | "Lake Hylia Water Toadpoli Grotto"
    | "Lake Hylia";

type ZorasDomainZoneId = "Zoras Domain";

export type OrdonaZoneId = "Ordon Province" | "Ordon Ranch Grotto";

export type SnowpeakZoneId =
    | "Snowpeak Climb"
    | "Snowpeak Freezard Grotto"
    | "Snowpeak Summit";
