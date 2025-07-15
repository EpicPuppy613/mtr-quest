execute if score @s mtrq_quest_progress matches 0 run scoreboard players set @s mtrq_quest_target 9
execute if score @s mtrq_quest_progress matches 1 run scoreboard players set @s mtrq_quest_target 8
execute if score @s mtrq_quest_progress matches 2 run scoreboard players set @s mtrq_quest_target 10
execute if score @s mtrq_quest_progress matches 3 run scoreboard players set @s mtrq_quest_target 6
execute if score @s mtrq_quest_progress matches 4 run scoreboard players set @s mtrq_quest_target 84
execute if score @s mtrq_quest_progress matches 5 run scoreboard players add @s mtrq_qp 30
execute if score @s mtrq_quest_progress matches 5 run scoreboard players add @s mtrq_player_xp 30
execute if score @s mtrq_quest_progress matches 5 run tellraw @s [{"text": "Quest Complete: ", "bold": true, "color": "green"}, {"text": "Destination Vol. 1: Reston & Fairview", "bold": true, "color": "white"}, {"text": "\n+30 Quest Points & Player XP", "bold": true, "color": "aqua"}]
execute if score @s mtrq_quest_progress matches 5 run scoreboard players add @s mtrq_completions_qid10 1
execute if score @s mtrq_quest_progress matches 5 store result score @s mtrq_completions run scoreboard players get @s mtrq_completions_qid10
execute if score @s mtrq_quest_progress matches 5 run function mtrq:complete/quest