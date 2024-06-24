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

export type ArbitersGroundsCheckName =
    | "Arbiters Grounds Big Key Chest"
    | "Arbiters Grounds Death Sword Chest"
    | "Arbiters Grounds East Lower Turnable Redead Chest"
    | "Arbiters Grounds East Turning Room Poe"
    | "Arbiters Grounds East Upper Turnable Chest"
    | "Arbiters Grounds East Upper Turnable Redead Chest"
    | "Arbiters Grounds Entrance Chest"
    | "Arbiters Grounds Ghoul Rat Room Chest"
    | "Arbiters Grounds Hidden Wall Poe"
    | "Arbiters Grounds North Turning Room Chest"
    | "Arbiters Grounds Spinner Room First Small Chest"
    | "Arbiters Grounds Spinner Room Lower Central Small Chest"
    | "Arbiters Grounds Spinner Room Lower North Chest"
    | "Arbiters Grounds Spinner Room Second Small Chest"
    | "Arbiters Grounds Spinner Room Stalfos Alcove Chest"
    | "Arbiters Grounds Stallord Heart Container"
    | "Arbiters Grounds Torch Room East Chest"
    | "Arbiters Grounds Torch Room Poe"
    | "Arbiters Grounds Torch Room West Chest"
    | "Arbiters Grounds West Chandelier Chest"
    | "Arbiters Grounds West Poe"
    | "Arbiters Grounds West Small Chest Behind Block"
    | "Arbiters Grounds West Stalfos Northeast Chest"
    | "Arbiters Grounds West Stalfos West Chest";

export type CitSCheckName = never;

export type ForestTempleCheckName =
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

export type GoronMinesCheckName =
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

export type HyruleCastleCheckName = never;

export type LakebedTempleCheckName =
    | "Lakebed Temple Before Deku Toad Alcove Chest"
    | "Lakebed Temple Before Deku Toad Underwater Left Chest"
    | "Lakebed Temple Before Deku Toad Underwater Right Chest"
    | "Lakebed Temple Big Key Chest"
    | "Lakebed Temple Central Room Chest"
    | "Lakebed Temple Central Room Small Chest"
    | "Lakebed Temple Central Room Spire Chest"
    | "Lakebed Temple Chandelier Chest"
    | "Lakebed Temple Deku Toad Chest"
    | "Lakebed Temple Dungeon Reward"
    | "Lakebed Temple East Lower Waterwheel Bridge Chest"
    | "Lakebed Temple East Lower Waterwheel Stalactite Chest"
    | "Lakebed Temple East Second Floor Southeast Chest"
    | "Lakebed Temple East Second Floor Southwest Chest"
    | "Lakebed Temple East Water Supply Clawshot Chest"
    | "Lakebed Temple East Water Supply Small Chest"
    | "Lakebed Temple Lobby Left Chest"
    | "Lakebed Temple Lobby Rear Chest"
    | "Lakebed Temple Morpheel Heart Container"
    | "Lakebed Temple Stalactite Room Chest"
    | "Lakebed Temple Underwater Maze Small Chest"
    | "Lakebed Temple West Lower Small Chest"
    | "Lakebed Temple West Second Floor Central Small Chest"
    | "Lakebed Temple West Second Floor Northeast Chest"
    | "Lakebed Temple West Second Floor Southeast Chest"
    | "Lakebed Temple West Second Floor Southwest Underwater Chest"
    | "Lakebed Temple West Water Supply Chest"
    | "Lakebed Temple West Water Supply Small Chest";

export type PoTCheckName = never;

export type SnowpeakRuinsCheckName =
    | "Snowpeak Ruins Ball and Chain"
    | "Snowpeak Ruins Blizzeta Heart Container"
    | "Snowpeak Ruins Broken Floor Chest"
    | "Snowpeak Ruins Chapel Chest"
    | "Snowpeak Ruins Chest After Darkhammer"
    | "Snowpeak Ruins Courtyard Central Chest"
    | "Snowpeak Ruins Dungeon Reward"
    | "Snowpeak Ruins East Courtyard Buried Chest"
    | "Snowpeak Ruins East Courtyard Chest"
    | "Snowpeak Ruins Ice Room Poe"
    | "Snowpeak Ruins Lobby Armor Poe"
    | "Snowpeak Ruins Lobby Chandelier Chest"
    | "Snowpeak Ruins Lobby East Armor Chest"
    | "Snowpeak Ruins Lobby Poe"
    | "Snowpeak Ruins Lobby West Armor Chest"
    | "Snowpeak Ruins Mansion Map"
    | "Snowpeak Ruins Northeast Chandelier Chest"
    | "Snowpeak Ruins Ordon Pumpkin Chest"
    | "Snowpeak Ruins West Cannon Room Central Chest"
    | "Snowpeak Ruins West Cannon Room Corner Chest"
    | "Snowpeak Ruins West Courtyard Buried Chest"
    | "Snowpeak Ruins Wooden Beam Central Chest"
    | "Snowpeak Ruins Wooden Beam Chandelier Chest"
    | "Snowpeak Ruins Wooden Beam Northwest Chest";

export type ToTCheckName = never;

type OverworldCheckName = EldinCheckName | FaronCheckName | GerudoCheckName | LanayruCheckName | OrdonaCheckName | SnowpeakCheckName;

export type EldinCheckName =
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
    // | "Kakariko Village Malo Mart Red Potion"
    // | "Kakariko Village Malo Mart Wooden Shield"
    | "Kakariko Village Watchtower Poe"
    | "Kakariko Watchtower Alcove Chest"
    | "Kakariko Watchtower Chest"
    | "Renados Letter"
    | "Rutelas Blessing"
    | "Skybook From Impaz"
    | "Talo Sharpshooting";

export type FaronCheckName =
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

export type GerudoCheckName =
    | "Bulblin Camp First Chest Under Tower At Entrance"
    | "Bulblin Camp Poe"
    | "Bulblin Camp Roasted Boar"
    | "Bulblin Camp Small Chest in Back of Camp"
    | "Bulblin Guard Key"
    | "Cave of Ordeals Floor 17 Poe"
    | "Cave of Ordeals Floor 33 Poe"
    | "Cave of Ordeals Floor 44 Poe"
    | "Cave of Ordeals Great Fairy Reward"
    | "Gerudo Desert Campfire East Chest"
    | "Gerudo Desert Campfire North Chest"
    | "Gerudo Desert Campfire West Chest"
    | "Gerudo Desert East Canyon Chest"
    | "Gerudo Desert East Poe"
    | "Gerudo Desert Female Dayfly"
    | "Gerudo Desert Golden Wolf"
    | "Gerudo Desert Lone Small Chest"
    | "Gerudo Desert Male Dayfly"
    | "Gerudo Desert North Peahat Poe"
    | "Gerudo Desert North Small Chest Before Bulblin Camp"
    | "Gerudo Desert Northeast Chest Behind Gates"
    | "Gerudo Desert Northwest Chest Behind Gates"
    | "Gerudo Desert Owl Statue Chest"
    | "Gerudo Desert Owl Statue Sky Character"
    | "Gerudo Desert Peahat Ledge Chest"
    | "Gerudo Desert Poe Above Cave of Ordeals"
    | "Gerudo Desert Rock Grotto First Poe"
    | "Gerudo Desert Rock Grotto Lantern Chest"
    | "Gerudo Desert Rock Grotto Second Poe"
    | "Gerudo Desert Skulltula Grotto Chest"
    | "Gerudo Desert South Chest Behind Wooden Gates"
    | "Gerudo Desert West Canyon Chest"
    | "Outside Arbiters Grounds Lantern Chest"
    | "Outside Arbiters Grounds Poe"
    | "Outside Bulblin Camp Poe";

export type LanayruCheckName =
    | "Agitha Bug #1 Reward"
    | "Agitha Bug #2 Reward"
    | "Agitha Bug #3 Reward"
    | "Agitha Bug #4 Reward"
    | "Agitha Bug #5 Reward"
    | "Agitha Bug #6 Reward"
    | "Agitha Bug #7 Reward"
    | "Agitha Bug #8 Reward"
    | "Agitha Bug #9 Reward"
    | "Agitha Bug #10 Reward"
    | "Agitha Bug #11 Reward"
    | "Agitha Bug #12 Reward"
    | "Agitha Bug #13 Reward"
    | "Agitha Bug #14 Reward"
    | "Agitha Bug #15 Reward"
    | "Agitha Bug #16 Reward"
    | "Agitha Bug #17 Reward"
    | "Agitha Bug #18 Reward"
    | "Agitha Bug #19 Reward"
    | "Agitha Bug #20 Reward"
    | "Agitha Bug #21 Reward"
    | "Agitha Bug #22 Reward"
    | "Agitha Bug #23 Reward"
    | "Agitha Bug #24 Reward"
    | "Auru Gift To Fyer"
    | "Castle Town Malo Mart Magic Armor"
    | "Charlo Donation Blessing"
    | "Doctors Office Balcony Chest"
    | "East Castle Town Bridge Poe"
    | "Fishing Hole Bottle"
    | "Fishing Hole Heart Piece"
    | "Flight By Fowl Fifth Platform Chest"
    | "Flight By Fowl Fourth Platform Chest"
    | "Flight By Fowl Ledge Poe"
    | "Flight By Fowl Second Platform Chest"
    | "Flight By Fowl Third Platform Chest"
    | "Flight By Fowl Top Platform Reward"
    | "Hyrule Field Amphitheater Owl Statue Chest"
    | "Hyrule Field Amphitheater Owl Statue Sky Character"
    | "Hyrule Field Amphitheater Poe"
    | "Isle of Riches Poe"
    | "Iza Helping Hand"
    | "Iza Raging Rapids Minigame"
    | "Jovani 20 Poe Soul Reward"
    | "Jovani 60 Poe Soul Reward"
    | "Jovani House Poe"
    | "Lake Hylia Alcove Poe"
    | "Lake Hylia Bridge Bubble Grotto Chest"
    | "Lake Hylia Bridge Cliff Chest"
    | "Lake Hylia Bridge Cliff Poe"
    | "Lake Hylia Bridge Female Mantis"
    | "Lake Hylia Bridge Male Mantis"
    | "Lake Hylia Bridge Owl Statue Chest"
    | "Lake Hylia Bridge Owl Statue Sky Character"
    | "Lake Hylia Bridge Vines Chest"
    | "Lake Hylia Dock Poe"
    | "Lake Hylia Shell Blade Grotto Chest"
    | "Lake Hylia Tower Poe"
    | "Lake Hylia Underwater Chest"
    | "Lake Hylia Water Toadpoli Grotto Chest"
    | "Lake Lantern Cave Eighth Chest"
    | "Lake Lantern Cave Eleventh Chest"
    | "Lake Lantern Cave End Lantern Chest"
    | "Lake Lantern Cave Fifth Chest"
    | "Lake Lantern Cave Final Poe"
    | "Lake Lantern Cave First Chest"
    | "Lake Lantern Cave First Poe"
    | "Lake Lantern Cave Fourteenth Chest"
    | "Lake Lantern Cave Fourth Chest"
    | "Lake Lantern Cave Ninth Chest"
    | "Lake Lantern Cave Second Chest"
    | "Lake Lantern Cave Second Poe"
    | "Lake Lantern Cave Seventh Chest"
    | "Lake Lantern Cave Sixth Chest"
    | "Lake Lantern Cave Tenth Chest"
    | "Lake Lantern Cave Third Chest"
    | "Lake Lantern Cave Thirteenth Chest"
    | "Lake Lantern Cave Twelfth Chest"
    | "Lanayru Field Behind Gate Underwater Chest"
    | "Lanayru Field Bridge Poe"
    | "Lanayru Field Female Stag Beetle"
    | "Lanayru Field Male Stag Beetle"
    | "Lanayru Field Poe Grotto Left Poe"
    | "Lanayru Field Poe Grotto Right Poe"
    | "Lanayru Field Skulltula Grotto Chest"
    | "Lanayru Field Spinner Track Chest"
    | "Lanayru Ice Block Puzzle Cave Chest"
    | "Lanayru Spring Back Room Lantern Chest"
    | "Lanayru Spring Back Room Left Chest"
    | "Lanayru Spring Back Room Right Chest"
    | "Lanayru Spring East Double Clawshot Chest"
    | "Lanayru Spring Underwater Left Chest"
    | "Lanayru Spring Underwater Right Chest"
    | "Lanayru Spring West Double Clawshot Chest"
    | "North Castle Town Golden Wolf"
    | "Outside Lanayru Spring Left Statue Chest"
    | "Outside Lanayru Spring Right Statue Chest"
    | "Outside South Castle Town Double Clawshot Chasm Chest"
    | "Outside South Castle Town Female Ladybug"
    | "Outside South Castle Town Fountain Chest"
    | "Outside South Castle Town Golden Wolf"
    | "Outside South Castle Town Male Ladybug"
    | "Outside South Castle Town Poe"
    | "Outside South Castle Town Tektite Grotto Chest"
    | "Outside South Castle Town Tightrope Chest"
    | "Plumm Fruit Balloon Minigame"
    | "STAR Prize 1"
    | "STAR Prize 2"
    | "Telma Invoice"
    | "Upper Zoras River Female Dragonfly"
    | "Upper Zoras River Poe"
    | "West Hyrule Field Female Butterfly"
    | "West Hyrule Field Golden Wolf"
    | "West Hyrule Field Helmasaur Grotto Chest"
    | "West Hyrule Field Male Butterfly"
    | "Wooden Statue"
    | "Zoras Domain Chest Behind Waterfall"
    | "Zoras Domain Chest By Mother and Child Isles"
    | "Zoras Domain Extinguish All Torches Chest"
    | "Zoras Domain Light All Torches Chest"
    | "Zoras Domain Male Dragonfly"
    | "Zoras Domain Mother and Child Isle Poe"
    | "Zoras Domain Underwater Goron"
    | "Zoras Domain Waterfall Poe";

export type OrdonaCheckName =
    | "Herding Goats Reward"
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

export type SnowpeakCheckName =
    | "Ashei Sketch"
    | "Snowboard Racing Prize"
    | "Snowpeak Above Freezard Grotto Poe"
    | "Snowpeak Blizzard Poe"
    | "Snowpeak Cave Ice Lantern Chest"
    | "Snowpeak Cave Ice Poe"
    | "Snowpeak Freezard Grotto Chest"
    | "Snowpeak Icy Summit Poe"
    | "Snowpeak Poe Among Trees";
