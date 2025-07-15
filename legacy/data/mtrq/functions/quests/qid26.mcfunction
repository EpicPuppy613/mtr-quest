execute if score @s mtrq_quest_progress matches 0 run scoreboard players set @s mtrq_quest_target 40
execute if score @s mtrq_quest_progress matches 1 run scoreboard players set @s mtrq_quest_target 85
execute if score @s mtrq_quest_progress matches 2 run scoreboard players add @s mtrq_qp 15
execute if score @s mtrq_quest_progress matches 2 run scoreboard players add @s mtrq_player_xp 15
execute if score @s mtrq_quest_progress matches 2 run tellraw @s [{"text": "Quest Complete: ", "bold": true, "color": "green"}, {"text": "R2C: Egg Harbour", "bold": true, "color": "white"}, {"text": "\n+15 Quest Points & Player XP", "bold": true, "color": "aqua"}]
execute if score @s mtrq_quest_progress matches 2 run scoreboard players add @s mtrq_completions_qid26 1
execute if score @s mtrq_quest_progress matches 2 store result score @s mtrq_completions run scoreboard players get @s mtrq_completions_qid26
execute if score @s mtrq_quest_progress matches 2 run function mtrq:complete/quest