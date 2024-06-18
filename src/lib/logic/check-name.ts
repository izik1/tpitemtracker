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

type GoronMinesCheckName =
    | "Goron Mines After Crystal Switch Room Magnet Wall Chest"
    | "Goron Mines Beamos Room Chest"
    | "Goron Mines Chest Before Dangoro"
    | "Goron Mines Crystal Switch Room Small Chest"
    | "Goron Mines Crystal Switch Room Underwater Chest"
    | "Goron Mines Dangoro Chest"
    | "Goron Mines Dungeon Reward"
    | "Goron Mines Entrance Chest"
    | "Goron Mines Fyrus Heart Container"
    | "Goron Mines Gor Amato Chest"
    | "Goron Mines Gor Amato Key Shard"
    | "Goron Mines Gor Amato Small Chest"
    | "Goron Mines Gor Ebizo Chest"
    | "Goron Mines Gor Ebizo Key Shard"
    | "Goron Mines Gor Liggs Chest"
    | "Goron Mines Gor Liggs Key Shard"
    | "Goron Mines Magnet Maze Chest"
    | "Goron Mines Main Magnet Room Bottom Chest"
    | "Goron Mines Main Magnet Room Top Chest"
    | "Goron Mines Outside Beamos Chest"
    | "Goron Mines Outside Clawshot Chest"
    | "Goron Mines Outside Underwater Chest";

type HyruleCastleCheckName = never;
type LakebedTempleCheckName = never;
type PoTCheckName = never;
type SnowpeakRuinsCheckName = never;
type ToTCheckName = never;

type OverworldCheckName = EldinCheckName | FaronCheckName | GerudoCheckName | LanayruCheckName | OrdonaCheckName | SnowpeakCheckName;

type EldinCheckName =
    | "Barnes Bomb Bag"
    | "Bridge of Eldin Female Phasmid"
    | "Bridge of Eldin Male Phasmid"
    | "Bridge of Eldin Owl Statue Chest"
    | "Bridge of Eldin Owl Statue Sky Character"
    | "Cats Hide and Seek Minigame"
    | "Death Mountain Alcove Chest"
    | "Death Mountain Trail Poe"
    | "Eldin Field Bomb Rock Chest"
    | "Eldin Field Bomskit Grotto Lantern Chest"
    | "Eldin Field Bomskit Grotto Left Chest"
    | "Eldin Field Female Grasshopper"
    | "Eldin Field Male Grasshopper"
    | "Eldin Field Stalfos Grotto Left Small Chest"
    | "Eldin Field Stalfos Grotto Right Small Chest"
    | "Eldin Field Stalfos Grotto Stalfos Chest"
    | "Eldin Field Water Bomb Fish Grotto Chest"
    | "Eldin Lantern Cave First Chest"
    | "Eldin Lantern Cave Lantern Chest"
    | "Eldin Lantern Cave Poe"
    | "Eldin Lantern Cave Second Chest"
    | "Eldin Spring Underwater Chest"
    | "Eldin Stockcave Lantern Chest"
    | "Eldin Stockcave Lowest Chest"
    | "Eldin Stockcave Upper Chest"
    | "Gift From Ralis"
    | "Goron Springwater Rush"
    | "Hidden Village Poe"
    | "Ilia Charm"
    | "Ilia Memory Reward"
    | "Kakariko Gorge Double Clawshot Chest"
    | "Kakariko Gorge Female Pill Bug"
    | "Kakariko Gorge Male Pill Bug"
    | "Kakariko Gorge Owl Statue Chest"
    | "Kakariko Gorge Owl Statue Sky Character"
    | "Kakariko Gorge Poe"
    | "Kakariko Gorge Spire Heart Piece"
    | "Kakariko Graveyard Golden Wolf"
    | "Kakariko Graveyard Grave Poe"
    | "Kakariko Graveyard Lantern Chest"
    | "Kakariko Graveyard Male Ant"
    | "Kakariko Graveyard Open Poe"
    | "Kakariko Inn Chest"
    | "Kakariko Village Bomb Rock Spire Heart Piece"
    | "Kakariko Village Bomb Shop Poe"
    | "Kakariko Village Female Ant"
    | "Kakariko Village Malo Mart Hawkeye"
    | "Kakariko Village Malo Mart Hylian Shield"
    | "Kakariko Village Malo Mart Red Potion"
    | "Kakariko Village Malo Mart Wooden Shield"
    | "Kakariko Village Watchtower Poe"
    | "Kakariko Watchtower Alcove Chest"
    | "Kakariko Watchtower Chest"
    | "Renados Letter"
    | "Rutelas Blessing"
    | "Skybook From Impaz"
    | "Talo Sharpshooting";

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
