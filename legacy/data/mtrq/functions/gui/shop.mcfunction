# GUI ITEMS
# O: black_stained_glass_pane{display:{Name:'["",{"text":" ","italic":false}]'}, mtrqgui:1b}
# h: helmet display
# c: chestplate display
# l: leggings display
# b: boots display
# H: helmet upgrade display
# C: chestplate upgrade display
# L: leggings upgrade display
# B: boots upgrade display
# s: speed display
# S: speed upgrade display

# GUI LAYOUT
# O X X X X O O X O
# O h c l b O O s O
# O H C L B O O S O

scoreboard players set @s mtrq_in_shop 1
title @s actionbar ["",{"score":{"name":"@s","objective":"mtrq_qp"},"color":"yellow"},{"text":" QP","color":"white"},{"text":" | ","color":"white"},{"text":"Level ","color":"white"},{"score":{"name":"@s","objective":"mtrq_player_level"},"color":"aqua"}]

# Default Levels
execute unless score @s mtrq_helmet_level matches 0.. run scoreboard players set @s mtrq_helmet_level 0
execute unless score @s mtrq_chestplate_level matches 0.. run scoreboard players set @s mtrq_chestplate_level 0
execute unless score @s mtrq_leggings_level matches 0.. run scoreboard players set @s mtrq_leggings_level 0
execute unless score @s mtrq_boots_level matches 0.. run scoreboard players set @s mtrq_boots_level 0
execute unless score @s mtrq_speed_level matches 0.. run scoreboard players set @s mtrq_speed_level 0

# Clear GUI items from the player's inventory
clear @s black_stained_glass_pane{mtrqgui:1b}
clear @s magenta_stained_glass_pane{mtrqgui:1b}
clear @s red_stained_glass_pane{mtrqgui:1b}
clear @s lime_stained_glass_pane{mtrqgui:1b}
clear @s red_dye{mtrqgui:1b}
clear @s sunflower{mtrqgui:1b}
clear @s glass{mtrqgui:1b}
clear @s white_stained_glass{mtrqgui:1b}
clear @s orange_stained_glass{mtrqgui:1b}
clear @s light_gray_stained_glass{mtrqgui:1b}
clear @s cyan_stained_glass{mtrqgui:1b}
clear @s gray_stained_glass{mtrqgui:1b}
clear @s purple_stained_glass{mtrqgui:1b}
clear @s leather_chestplate{mtrqgui:1b}
clear @s leather_leggings{mtrqgui:1b}
clear @s leather_boots{mtrqgui:1b}
clear @s cobweb{mtrqgui:1b}
clear @s feather{mtrqgui:1b}

# Detect clicks
execute unless data block ~ ~ ~ Items[{Slot:1b}] run function mtrq:gear/unequip/helmet
execute unless data block ~ ~ ~ Items[{Slot:2b}] run function mtrq:gear/unequip/chestplate
execute unless data block ~ ~ ~ Items[{Slot:3b}] run function mtrq:gear/unequip/leggings
execute unless data block ~ ~ ~ Items[{Slot:4b}] run function mtrq:gear/unequip/boots
execute unless data block ~ ~ ~ Items[{Slot:7b}] run function mtrq:gear/unequip/speed

execute unless data block ~ ~ ~ Items[{Slot:9b}] run function mtrq:gear/equip/all
execute unless data block ~ ~ ~ Items[{Slot:10b}] run function mtrq:gear/equip/helmet
execute unless data block ~ ~ ~ Items[{Slot:11b}] run function mtrq:gear/equip/chestplate
execute unless data block ~ ~ ~ Items[{Slot:12b}] run function mtrq:gear/equip/leggings
execute unless data block ~ ~ ~ Items[{Slot:13b}] run function mtrq:gear/equip/boots
execute unless data block ~ ~ ~ Items[{Slot:16b}] run function mtrq:gear/equip/speed

execute unless data block ~ ~ ~ Items[{Slot:19b}] run function mtrq:gear/upgrade/helmet
execute unless data block ~ ~ ~ Items[{Slot:20b}] run function mtrq:gear/upgrade/chestplate
execute unless data block ~ ~ ~ Items[{Slot:21b}] run function mtrq:gear/upgrade/leggings
execute unless data block ~ ~ ~ Items[{Slot:22b}] run function mtrq:gear/upgrade/boots
execute unless data block ~ ~ ~ Items[{Slot:25b}] run function mtrq:gear/upgrade/speed

# Fill in static GUI elements
item replace block ~ ~ ~ container.0 with black_stained_glass_pane{display:{Name:'["",{"text":" ","italic":false}]'}, mtrqgui:1b}
item replace block ~ ~ ~ container.1 with red_dye{display:{Name:'["",{"text":"Unequip Helmet","color":"dark_red","bold":true,"italic":false}]',Lore:['[""]','["",{"text":"Click to Clear Helmet Slot","italic":false,"color":"red"}]']}, mtrqgui:1b}
item replace block ~ ~ ~ container.2 with red_dye{display:{Name:'["",{"text":"Unequip Chestplate","color":"dark_red","bold":true,"italic":false}]',Lore:['[""]','["",{"text":"Click to Clear Chestplate Slot","italic":false,"color":"red"}]']}, mtrqgui:1b}
item replace block ~ ~ ~ container.3 with red_dye{display:{Name:'["",{"text":"Unequip Leggings","color":"dark_red","bold":true,"italic":false}]',Lore:['[""]','["",{"text":"Click to Clear Leggings Slot","italic":false,"color":"red"}]']}, mtrqgui:1b}
item replace block ~ ~ ~ container.4 with red_dye{display:{Name:'["",{"text":"Unequip Boots","color":"dark_red","bold":true,"italic":false}]',Lore:['[""]','["",{"text":"Click to Clear Boots Slot","italic":false,"color":"red"}]']}, mtrqgui:1b}
item replace block ~ ~ ~ container.5 with black_stained_glass_pane{display:{Name:'["",{"text":" ","italic":false}]'}, mtrqgui:1b}
item replace block ~ ~ ~ container.6 with black_stained_glass_pane{display:{Name:'["",{"text":" ","italic":false}]'}, mtrqgui:1b}
item replace block ~ ~ ~ container.7 with red_dye{display:{Name:'["",{"text":"Unequip Speed Boost","color":"dark_red","bold":true,"italic":false}]',Lore:['[""]','["",{"text":"Click to Clear Speed Boost","italic":false,"color":"red"}]']}, mtrqgui:1b}
item replace block ~ ~ ~ container.8 with black_stained_glass_pane{display:{Name:'["",{"text":" ","italic":false}]'}, mtrqgui:1b}
item replace block ~ ~ ~ container.9 with sunflower{display:{Name:'["",{"text":"Equip All","color":"gold","bold":true,"italic":false}]',Lore:['[""]','["",{"text":"Click to Equip All Armor","italic":false,"color":"yellow"}]']}, mtrqgui:1b}
# HELMET
# CHESTPLATE
# LEGGINGS
# BOOTS
item replace block ~ ~ ~ container.14 with black_stained_glass_pane{display:{Name:'["",{"text":" ","italic":false}]'}, mtrqgui:1b}
item replace block ~ ~ ~ container.15 with black_stained_glass_pane{display:{Name:'["",{"text":" ","italic":false}]'}, mtrqgui:1b}
# SPEED
item replace block ~ ~ ~ container.17 with black_stained_glass_pane{display:{Name:'["",{"text":" ","italic":false}]'}, mtrqgui:1b}
item replace block ~ ~ ~ container.18 with black_stained_glass_pane{display:{Name:'["",{"text":" ","italic":false}]'}, mtrqgui:1b}
# HELMET UPGRADE
# CHESTPLATE UPGRADE
# LEGGINGS UPGRADE
# BOOTS UPGRADE
item replace block ~ ~ ~ container.23 with black_stained_glass_pane{display:{Name:'["",{"text":" ","italic":false}]'}, mtrqgui:1b}
item replace block ~ ~ ~ container.24 with black_stained_glass_pane{display:{Name:'["",{"text":" ","italic":false}]'}, mtrqgui:1b}
# SPEED UPGRADE
item replace block ~ ~ ~ container.26 with black_stained_glass_pane{display:{Name:'["",{"text":" ","italic":false}]'}, mtrqgui:1b}

# Dynamic GUI elements
function mtrq:gui/shopdata