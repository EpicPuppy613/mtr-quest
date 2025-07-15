execute if score @s mtrq_speed_level matches 1 run attribute @s generic.movement_speed base set 0.11
execute if score @s mtrq_speed_level matches 2 run attribute @s generic.movement_speed base set 0.12
execute if score @s mtrq_speed_level matches 3 run attribute @s generic.movement_speed base set 0.13
execute if score @s mtrq_speed_level matches 4 run attribute @s generic.movement_speed base set 0.14
execute if score @s mtrq_speed_level matches 5 run attribute @s generic.movement_speed base set 0.15
execute if score @s mtrq_speed_level matches 6 run attribute @s generic.movement_speed base set 0.16
execute if score @s mtrq_speed_level matches 7 run attribute @s generic.movement_speed base set 0.17

execute if score @s mtrq_speed_level matches 1.. run playsound entity.player.levelup master @s ~ ~ ~