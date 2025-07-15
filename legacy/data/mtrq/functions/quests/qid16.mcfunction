execute if score @s mtrq_quest_progress matches 0 run scoreboard players set @s mtrq_quest_target 21
execute if score @s mtrq_quest_progress matches 1 run scoreboard players set @s mtrq_quest_target 62
execute if score @s mtrq_quest_progress matches 2 run scoreboard players set @s mtrq_quest_target 30
execute if score @s mtrq_quest_progress matches 3 run scoreboard players set @s mtrq_quest_target 14
execute if score @s mtrq_quest_progress matches 4 run scoreboard players set @s mtrq_quest_target 25
execute if score @s mtrq_quest_progress matches 5 run scoreboard players set @s mtrq_quest_target 11
execute if score @s mtrq_quest_progress matches 6 run scoreboard players set @s mtrq_quest_target 10
execute if score @s mtrq_quest_progress matches 7 run scoreboard players add @s mtrq_qp 80
execute if score @s mtrq_quest_progress matches 7 run scoreboard players add @s mtrq_player_xp 80
execute if score @s mtrq_quest_progress matches 7 run tellraw @s [{"text": "Quest Complete: ", "bold": true, "color": "green"}, {"text": "Grand Server Tour Vol. 1", "bold": true, "color": "white"}, {"text": "\n+80 Quest Points & Player XP", "bold": true, "color": "aqua"}]
execute if score @s mtrq_quest_progress matches 7 run scoreboard players add @s mtrq_completions_qid16 1
execute if score @s mtrq_quest_progress matches 7 store result score @s mtrq_completions run scoreboard players get @s mtrq_completions_qid16
execute if score @s mtrq_quest_progress matches 7 run function mtrq:complete/quest