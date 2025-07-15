execute if score @s mtrq_speed_level matches 0 if score @s mtrq_player_level matches 1.. if score @s mtrq_qp matches 30.. run scoreboard players set @s mtrq_upgrade_success 1
execute if score @s mtrq_speed_level matches 0 if score @s mtrq_player_level matches 1.. if score @s mtrq_qp matches 30.. run scoreboard players remove @s mtrq_qp 30
execute if score @s mtrq_speed_level matches 1 if score @s mtrq_player_level matches 5.. if score @s mtrq_qp matches 100.. run scoreboard players set @s mtrq_upgrade_success 1
execute if score @s mtrq_speed_level matches 1 if score @s mtrq_player_level matches 5.. if score @s mtrq_qp matches 100.. run scoreboard players remove @s mtrq_qp 100
execute if score @s mtrq_speed_level matches 2 if score @s mtrq_player_level matches 10.. if score @s mtrq_qp matches 250.. run scoreboard players set @s mtrq_upgrade_success 1
execute if score @s mtrq_speed_level matches 2 if score @s mtrq_player_level matches 10.. if score @s mtrq_qp matches 250.. run scoreboard players remove @s mtrq_qp 250
execute if score @s mtrq_speed_level matches 3 if score @s mtrq_player_level matches 20.. if score @s mtrq_qp matches 600.. run scoreboard players set @s mtrq_upgrade_success 1
execute if score @s mtrq_speed_level matches 3 if score @s mtrq_player_level matches 20.. if score @s mtrq_qp matches 600.. run scoreboard players remove @s mtrq_qp 600
execute if score @s mtrq_speed_level matches 4 if score @s mtrq_player_level matches 35.. if score @s mtrq_qp matches 1500.. run scoreboard players set @s mtrq_upgrade_success 1
execute if score @s mtrq_speed_level matches 4 if score @s mtrq_player_level matches 35.. if score @s mtrq_qp matches 1500.. run scoreboard players remove @s mtrq_qp 1500
execute if score @s mtrq_speed_level matches 5 if score @s mtrq_player_level matches 50.. if score @s mtrq_qp matches 3500.. run scoreboard players set @s mtrq_upgrade_success 1
execute if score @s mtrq_speed_level matches 5 if score @s mtrq_player_level matches 50.. if score @s mtrq_qp matches 3500.. run scoreboard players remove @s mtrq_qp 3500
execute if score @s mtrq_speed_level matches 6 if score @s mtrq_player_level matches 70.. if score @s mtrq_qp matches 10000.. run scoreboard players set @s mtrq_upgrade_success 1
execute if score @s mtrq_speed_level matches 6 if score @s mtrq_player_level matches 70.. if score @s mtrq_qp matches 10000.. run scoreboard players remove @s mtrq_qp 10000

execute unless score @s mtrq_upgrade_success matches 1 run playsound entity.villager.no master @s ~ ~ ~
execute if score @s mtrq_upgrade_success matches 1 run scoreboard players add @s mtrq_speed_level 1
execute if score @s mtrq_upgrade_success matches 1 run playsound minecraft:entity.experience_orb.pickup master @s ~ ~ ~ 1 1
execute if score @s mtrq_upgrade_success matches 1 run scoreboard players set @s mtrq_upgrade_success 0