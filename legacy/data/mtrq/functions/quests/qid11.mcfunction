execute if score @s mtrq_quest_progress matches 0 run scoreboard players set @s mtrq_quest_target 23
execute if score @s mtrq_quest_progress matches 1 run scoreboard players set @s mtrq_quest_target 22
execute if score @s mtrq_quest_progress matches 2 run scoreboard players set @s mtrq_quest_target 21
execute if score @s mtrq_quest_progress matches 3 run scoreboard players add @s mtrq_qp 20
execute if score @s mtrq_quest_progress matches 3 run scoreboard players add @s mtrq_player_xp 20
execute if score @s mtrq_quest_progress matches 3 run tellraw @s [{"text": "Quest Complete: ", "bold": true, "color": "green"}, {"text": "Destination Vol. 2: Lake City", "bold": true, "color": "white"}, {"text": "\n+20 Quest Points & Player XP", "bold": true, "color": "aqua"}]
execute if score @s mtrq_quest_progress matches 3 run scoreboard players add @s mtrq_completions_qid11 1
execute if score @s mtrq_quest_progress matches 3 store result score @s mtrq_completions run scoreboard players get @s mtrq_completions_qid11
execute if score @s mtrq_quest_progress matches 3 run function mtrq:complete/quest