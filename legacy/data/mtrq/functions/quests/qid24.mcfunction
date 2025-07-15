execute if score @s mtrq_quest_progress matches 0 run scoreboard players set @s mtrq_quest_target 126
execute if score @s mtrq_quest_progress matches 1 run scoreboard players set @s mtrq_quest_target 112
execute if score @s mtrq_quest_progress matches 2 run scoreboard players set @s mtrq_quest_target 120
execute if score @s mtrq_quest_progress matches 3 run scoreboard players set @s mtrq_quest_target 123
execute if score @s mtrq_quest_progress matches 4 run scoreboard players set @s mtrq_quest_target 124
execute if score @s mtrq_quest_progress matches 5 run scoreboard players set @s mtrq_quest_target 119
execute if score @s mtrq_quest_progress matches 6 run scoreboard players set @s mtrq_quest_target 120
execute if score @s mtrq_quest_progress matches 7 run scoreboard players set @s mtrq_quest_target 120
execute if score @s mtrq_quest_progress matches 8 run scoreboard players set @s mtrq_quest_target 122
execute if score @s mtrq_quest_progress matches 9 run scoreboard players set @s mtrq_quest_target 113
execute if score @s mtrq_quest_progress matches 10 run scoreboard players set @s mtrq_quest_target 121
execute if score @s mtrq_quest_progress matches 11 run scoreboard players add @s mtrq_qp 1
execute if score @s mtrq_quest_progress matches 11 run scoreboard players add @s mtrq_player_xp 1
execute if score @s mtrq_quest_progress matches 11 run tellraw @s [{"text": "Quest Complete: ", "bold": true, "color": "green"}, {"text": "Destination Vol. 3: Teufort", "bold": true, "color": "white"}, {"text": "\n+1 Quest Points & Player XP", "bold": true, "color": "aqua"}]
execute if score @s mtrq_quest_progress matches 11 run scoreboard players add @s mtrq_completions_qid24 1
execute if score @s mtrq_quest_progress matches 11 store result score @s mtrq_completions run scoreboard players get @s mtrq_completions_qid24
execute if score @s mtrq_quest_progress matches 11 run function mtrq:complete/quest