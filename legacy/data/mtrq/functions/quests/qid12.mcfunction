execute if score @s mtrq_quest_progress matches 0 run scoreboard players set @s mtrq_quest_target 6
execute if score @s mtrq_quest_progress matches 1 run scoreboard players set @s mtrq_quest_target 8
execute if score @s mtrq_quest_progress matches 2 run scoreboard players set @s mtrq_quest_target 10
execute if score @s mtrq_quest_progress matches 3 run scoreboard players set @s mtrq_quest_target 11
execute if score @s mtrq_quest_progress matches 4 run scoreboard players add @s mtrq_qp 25
execute if score @s mtrq_quest_progress matches 4 run scoreboard players add @s mtrq_player_xp 25
execute if score @s mtrq_quest_progress matches 4 run tellraw @s [{"text": "Quest Complete: ", "bold": true, "color": "green"}, {"text": "Fairview Ferry Fun", "bold": true, "color": "white"}, {"text": "\n+25 Quest Points & Player XP", "bold": true, "color": "aqua"}]
execute if score @s mtrq_quest_progress matches 4 run scoreboard players add @s mtrq_completions_qid12 1
execute if score @s mtrq_quest_progress matches 4 store result score @s mtrq_completions run scoreboard players get @s mtrq_completions_qid12
execute if score @s mtrq_quest_progress matches 4 run function mtrq:complete/quest