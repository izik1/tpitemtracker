export type CheckName = DungeonCheckName | OverworldCheckName;

type DungeonCheckName =
    | ArbitersGroundsCheckName
    | CitSCheckName
    | ForestTempleCheckName
    | GoronMinesCheckName
    | HyruleCastleCheckName
    | LakebedTempleCheckName
    | PoTCheckName
    | SnowpeakRuinsCheckName
    | ToTCheckName;


type ArbitersGroundsCheckName = never;
type CitSCheckName = never;
type ForestTempleCheckName =
    | "Forest Temple Big Baba Key"
    | "Forest Temple Big Key Chest"
    | "Forest Temple Central Chest Behind Stairs"
    | "Forest Temple Central Chest Hanging From Web"
    | "Forest Temple Central North Chest"
    | "Forest Temple Diababa Heart Container"
    | "Forest Temple Dungeon Reward"
    | "Forest Temple East Tile Worm Chest"
    | "Forest Temple East Water Cave Chest"
    | "Forest Temple Entrance Vines Chest"
    | "Forest Temple Gale Boomerang"
    | "Forest Temple North Deku Like Chest"
    | "Forest Temple Second Monkey Under Bridge Chest"
    | "Forest Temple Totem Pole Chest"
    | "Forest Temple West Deku Like Chest"
    | "Forest Temple West Tile Worm Chest Behind Stairs"
    | "Forest Temple West Tile Worm Room Vines Chest"
    | "Forest Temple Windless Bridge Chest";

type GoronMinesCheckName = never;
type HyruleCastleCheckName = never;
type LakebedTempleCheckName = never;
type PoTCheckName = never;
type SnowpeakRuinsCheckName = never;
type ToTCheckName = never;

type OverworldCheckName = EldinCheckName | FaronCheckName | GerudoCheckName | LanayruCheckName | OrdonaCheckName | SnowpeakCheckName;

type EldinCheckName = never;

type FaronCheckName =
    | "Coro Bottle"
    | "Faron Field Bridge Chest"
    | "Faron Field Corner Grotto Left Chest"
    | "Faron Field Corner Grotto Rear Chest"
    | "Faron Field Corner Grotto Right Chest"
    | "Faron Field Female Beetle"
    | "Faron Field Male Beetle"
    | "Faron Field Poe"
    | "Faron Field Tree Heart Piece"
    | "Faron Mist Cave Lantern Chest"
    | "Faron Mist Cave Open Chest"
    | "Faron Mist North Chest"
    | "Faron Mist Poe"
    | "Faron Mist South Chest"
    | "Faron Mist Stump Chest"
    | "Faron Woods Golden Wolf"
    | "Faron Woods Owl Statue Chest"
    | "Faron Woods Owl Statue Sky Character"
    | "Lost Woods Boulder Poe"
    | "Lost Woods Lantern Chest"
    | "Lost Woods Waterfall Poe"
    | "North Faron Woods Deku Baba Chest"
    | "Sacred Grove Baba Serpent Grotto Chest"
    | "Sacred Grove Female Snail"
    | "Sacred Grove Male Snail"
    | "Sacred Grove Master Sword Poe"
    | "Sacred Grove Past Owl Statue Chest"
    | "Sacred Grove Spinner Chest"
    | "Sacred Grove Temple of Time Owl Statue Poe"
    | "South Faron Cave Chest";

type GerudoCheckName = never;

type LanayruCheckName = never;

type OrdonaCheckName = |
    "Herding Goats Reward"
    | "Links Basement Chest"
    | "Ordon Cat Rescue"
    | "Ordon Ranch Grotto Lantern Chest"
    | "Ordon Shield"
    | "Ordon Spring Golden Wolf"
    | "Ordon Sword"
    | "Sera Shop Slingshot"
    | "Uli Cradle Delivery"
    | "Wooden Sword Chest"
    | "Wrestling With Bo";

type SnowpeakCheckName = never;
