execute if score @s mtrq_quest_progress matches 0 run scoreboard players set @s mtrq_quest_target 120
execute if score @s mtrq_quest_progress matches 1 run scoreboard players set @s mtrq_quest_target 85
execute if score @s mtrq_quest_progress matches 2 run scoreboard players set @s mtrq_quest_target 120
execute if score @s mtrq_quest_progress matches 3 run scoreboard players set @s mtrq_quest_target 85
execute if score @s mtrq_quest_progress matches 4 run scoreboard players set @s mtrq_quest_target 120
execute if score @s mtrq_quest_progress matches 5 run scoreboard players set @s mtrq_quest_target 85
execute if score @s mtrq_quest_progress matches 6 run scoreboard players set @s mtrq_quest_target 120
execute if score @s mtrq_quest_progress matches 7 run scoreboard players set @s mtrq_quest_target 85
execute if score @s mtrq_quest_progress matches 8 run scoreboard players set @s mtrq_quest_target 120
execute if score @s mtrq_quest_progress matches 9 run scoreboard players set @s mtrq_quest_target 85
execute if score @s mtrq_quest_progress matches 10 run scoreboard players set @s mtrq_quest_target 120
execute if score @s mtrq_quest_progress matches 11 run scoreboard players set @s mtrq_quest_target 85
execute if score @s mtrq_quest_progress matches 12 run scoreboard players set @s mtrq_quest_target 120
execute if score @s mtrq_quest_progress matches 13 run scoreboard players set @s mtrq_quest_target 85
execute if score @s mtrq_quest_progress matches 14 run scoreboard players set @s mtrq_quest_target 120
execute if score @s mtrq_quest_progress matches 15 run scoreboard players set @s mtrq_quest_target 85
execute if score @s mtrq_quest_progress matches 16 run scoreboard players set @s mtrq_quest_target 120
execute if score @s mtrq_quest_progress matches 17 run scoreboard players set @s mtrq_quest_target 85
execute if score @s mtrq_quest_progress matches 18 run scoreboard players set @s mtrq_quest_target 120
execute if score @s mtrq_quest_progress matches 19 run scoreboard players set @s mtrq_quest_target 85
execute if score @s mtrq_quest_progress matches 20 run scoreboard players add @s mtrq_qp 500
execute if score @s mtrq_quest_progress matches 20 run scoreboard players add @s mtrq_player_xp 500
execute if score @s mtrq_quest_progress matches 20 run tellraw @s [{"text": "Quest Complete: ", "bold": true, "color": "green"}, {"text": "Torture Vol. 3: Voluntary PTSD", "bold": true, "color": "white"}, {"text": "\n+500 Quest Points & Player XP", "bold": true, "color": "aqua"}]
execute if score @s mtrq_quest_progress matches 20 run scoreboard players add @s mtrq_completions_qid8 1
execute if score @s mtrq_quest_progress matches 20 store result score @s mtrq_completions run scoreboard players get @s mtrq_completions_qid8
execute if score @s mtrq_quest_progress matches 20 run function mtrq:complete/quest