execute store result score @s mtrq_level_prev run scoreboard players get @s mtrq_player_level
scoreboard players add @s mtrq_player_level 1
tellraw @s ["",{"text":"LEVEL UP!!!","bold":true,"color":"green"},"\n",{"score":{"name":"@s","objective":"mtrq_level_prev"},"color":"gray"}," -> ",{"score":{"name":"@s","objective":"mtrq_player_level"},"bold":true,"color":"aqua"}]
execute store result score @s mtrq_player_level_calc run scoreboard players get @s mtrq_player_level
scoreboard players operation @s mtrq_player_level_calc %= announce_interval mtrq_storage
execute if score @s mtrq_player_level_calc matches 0 run tellraw @a ["",{"text":"[","color":"white"},{"text":"MTR Quest","color":"dark_aqua"},{"text":"] ","color":"white"},{"selector":"@s","color":"light_purple"},{"text":" levelled up to level ","color":"white"},{"score":{"name":"@s","objective":"mtrq_player_level"},"bold":true,"color":"aqua"},{"text":"!","color":"white"}]
scoreboard players operation @s mtrq_player_xp -= @s mtrq_player_xpneed
scoreboard players operation @s mtrq_player_xpneed *= level_increase_by mtrq_storage
scoreboard players operation @s mtrq_player_xpneed /= level_divide_by mtrq_storage
execute store result score @s mtrq_player_level_percent run scoreboard players get @s mtrq_player_xp
scoreboard players operation @s mtrq_player_level_percent *= percent_multiplier mtrq_storage
scoreboard players operation @s mtrq_player_level_percent /= @s mtrq_player_xpneed