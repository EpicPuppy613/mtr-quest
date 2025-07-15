execute if score @s mtrq_leggings_level matches 0 if score @s mtrq_player_level matches 1.. if score @s mtrq_qp matches 10.. run scoreboard players set @s mtrq_upgrade_success 1
execute if score @s mtrq_leggings_level matches 0 if score @s mtrq_player_level matches 1.. if score @s mtrq_qp matches 10.. run scoreboard players remove @s mtrq_qp 10
execute if score @s mtrq_leggings_level matches 1 if score @s mtrq_player_level matches 5.. if score @s mtrq_qp matches 25.. run scoreboard players set @s mtrq_upgrade_success 1
execute if score @s mtrq_leggings_level matches 1 if score @s mtrq_player_level matches 5.. if score @s mtrq_qp matches 25.. run scoreboard players remove @s mtrq_qp 25
execute if score @s mtrq_leggings_level matches 2 if score @s mtrq_player_level matches 10.. if score @s mtrq_qp matches 50.. run scoreboard players set @s mtrq_upgrade_success 1
execute if score @s mtrq_leggings_level matches 2 if score @s mtrq_player_level matches 10.. if score @s mtrq_qp matches 50.. run scoreboard players remove @s mtrq_qp 50
execute if score @s mtrq_leggings_level matches 3 if score @s mtrq_player_level matches 20.. if score @s mtrq_qp matches 125.. run scoreboard players set @s mtrq_upgrade_success 1
execute if score @s mtrq_leggings_level matches 3 if score @s mtrq_player_level matches 20.. if score @s mtrq_qp matches 125.. run scoreboard players remove @s mtrq_qp 125
execute if score @s mtrq_leggings_level matches 4 if score @s mtrq_player_level matches 35.. if score @s mtrq_qp matches 300.. run scoreboard players set @s mtrq_upgrade_success 1
execute if score @s mtrq_leggings_level matches 4 if score @s mtrq_player_level matches 35.. if score @s mtrq_qp matches 300.. run scoreboard players remove @s mtrq_qp 300
execute if score @s mtrq_leggings_level matches 5 if score @s mtrq_player_level matches 50.. if score @s mtrq_qp matches 750.. run scoreboard players set @s mtrq_upgrade_success 1
execute if score @s mtrq_leggings_level matches 5 if score @s mtrq_player_level matches 50.. if score @s mtrq_qp matches 750.. run scoreboard players remove @s mtrq_qp 750
execute if score @s mtrq_leggings_level matches 6 if score @s mtrq_player_level matches 70.. if score @s mtrq_qp matches 2000.. run scoreboard players set @s mtrq_upgrade_success 1
execute if score @s mtrq_leggings_level matches 6 if score @s mtrq_player_level matches 70.. if score @s mtrq_qp matches 2000.. run scoreboard players remove @s mtrq_qp 2000

execute unless score @s mtrq_upgrade_success matches 1 run playsound entity.villager.no master @s ~ ~ ~
execute if score @s mtrq_upgrade_success matches 1 run scoreboard players add @s mtrq_leggings_level 1
execute if score @s mtrq_upgrade_success matches 1 run playsound minecraft:entity.experience_orb.pickup master @s ~ ~ ~ 1 1
execute if score @s mtrq_upgrade_success matches 1 run scoreboard players set @s mtrq_upgrade_success 0