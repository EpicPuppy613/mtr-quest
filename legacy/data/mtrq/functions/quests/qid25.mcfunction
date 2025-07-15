execute if score @s mtrq_quest_progress matches 0 run scoreboard players set @s mtrq_quest_target 6
execute if score @s mtrq_quest_progress matches 1 run scoreboard players set @s mtrq_quest_target 85
execute if score @s mtrq_quest_progress matches 2 run scoreboard players add @s mtrq_qp 12
execute if score @s mtrq_quest_progress matches 2 run scoreboard players add @s mtrq_player_xp 12
execute if score @s mtrq_quest_progress matches 2 run tellraw @s [{"text": "Quest Complete: ", "bold": true, "color": "green"}, {"text": "R2C: Desert Grand Central", "bold": true, "color": "white"}, {"text": "\n+12 Quest Points & Player XP", "bold": true, "color": "aqua"}]
execute if score @s mtrq_quest_progress matches 2 run scoreboard players add @s mtrq_completions_qid25 1
execute if score @s mtrq_quest_progress matches 2 store result score @s mtrq_completions run scoreboard players get @s mtrq_completions_qid25
execute if score @s mtrq_quest_progress matches 2 run function mtrq:complete/quest