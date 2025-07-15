execute if score @s mtrq_quest_progress matches 0 run scoreboard players set @s mtrq_quest_target 16
execute if score @s mtrq_quest_progress matches 1 run scoreboard players set @s mtrq_quest_target 92
execute if score @s mtrq_quest_progress matches 2 run scoreboard players set @s mtrq_quest_target 8
execute if score @s mtrq_quest_progress matches 3 run scoreboard players set @s mtrq_quest_target 24
execute if score @s mtrq_quest_progress matches 4 run scoreboard players set @s mtrq_quest_target 108
execute if score @s mtrq_quest_progress matches 5 run scoreboard players set @s mtrq_quest_target 114
execute if score @s mtrq_quest_progress matches 6 run scoreboard players set @s mtrq_quest_target 118
execute if score @s mtrq_quest_progress matches 7 run scoreboard players add @s mtrq_qp 120
execute if score @s mtrq_quest_progress matches 7 run scoreboard players add @s mtrq_player_xp 120
execute if score @s mtrq_quest_progress matches 7 run tellraw @s [{"text": "Quest Complete: ", "bold": true, "color": "green"}, {"text": "Expedition Vol. 5: Neglected Corners", "bold": true, "color": "white"}, {"text": "\n+120 Quest Points & Player XP", "bold": true, "color": "aqua"}]
execute if score @s mtrq_quest_progress matches 7 run scoreboard players add @s mtrq_completions_qid17 1
execute if score @s mtrq_quest_progress matches 7 store result score @s mtrq_completions run scoreboard players get @s mtrq_completions_qid17
execute if score @s mtrq_quest_progress matches 7 run function mtrq:complete/quest