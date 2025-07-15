execute if score @s mtrq_quest_progress matches 0 run scoreboard players set @s mtrq_quest_target 120
execute if score @s mtrq_quest_progress matches 1 run scoreboard players set @s mtrq_quest_target 85
execute if score @s mtrq_quest_progress matches 2 run scoreboard players add @s mtrq_qp 25
execute if score @s mtrq_quest_progress matches 2 run scoreboard players add @s mtrq_player_xp 25
execute if score @s mtrq_quest_progress matches 2 run tellraw @s [{"text": "Quest Complete: ", "bold": true, "color": "green"}, {"text": "R2C: City Tower", "bold": true, "color": "white"}, {"text": "\n+25 Quest Points & Player XP", "bold": true, "color": "aqua"}]
execute if score @s mtrq_quest_progress matches 2 run scoreboard players add @s mtrq_completions_qid27 1
execute if score @s mtrq_quest_progress matches 2 store result score @s mtrq_completions run scoreboard players get @s mtrq_completions_qid27
execute if score @s mtrq_quest_progress matches 2 run function mtrq:complete/quest