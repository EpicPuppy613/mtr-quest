execute if score @s mtrq_quest_progress matches 0 run scoreboard players set @s mtrq_quest_target 85
execute if score @s mtrq_quest_progress matches 1 run scoreboard players add @s mtrq_qp 1
execute if score @s mtrq_quest_progress matches 1 run scoreboard players add @s mtrq_player_xp 1
execute if score @s mtrq_quest_progress matches 1 run tellraw @s [{"text": "Quest Complete: ", "bold": true, "color": "green"}, {"text": "Torture Vol. 4: Time to Quit", "bold": true, "color": "white"}, {"text": "\n+1 Quest Points & Player XP", "bold": true, "color": "aqua"}]
execute if score @s mtrq_quest_progress matches 1 run scoreboard players add @s mtrq_completions_qid9 1
execute if score @s mtrq_quest_progress matches 1 store result score @s mtrq_completions run scoreboard players get @s mtrq_completions_qid9
execute if score @s mtrq_quest_progress matches 1 run function mtrq:complete/quest