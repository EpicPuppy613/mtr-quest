# Objective Completion
execute as @a if score @s mtrq_quest_complete = @s mtrq_quest_target run function mtrq:complete/objective

# Location Processing
function mtrq:tick/locations

# Starting Level Requirement
execute as @a unless score @s mtrq_player_level matches 1.. run scoreboard players set @s mtrq_player_xpneed 20
execute as @a unless score @s mtrq_player_level matches 1.. run scoreboard players set @s mtrq_player_level 1

# Level Up
execute as @a if score @s mtrq_player_xp >= @s mtrq_player_xpneed run function mtrq:complete/level

# Shop GUI
scoreboard players set @a mtrq_in_shop 0
# execute positioned -6 15 53 as @p[distance=..3] run function mtrq:gui/shop
# execute positioned -6 15 59 as @p[distance=..3] run function mtrq:gui/shop

# Action Bar
execute as @a if score @s mtrq_player_xp matches 1.. run scoreboard players set @s mtrq_player 1
execute as @a if score @s mtrq_player matches 1 unless score @s mtrq_disable_actionbar matches 1 unless score @s mtrq_in_shop matches 1 run function mtrq:tick/actionbar