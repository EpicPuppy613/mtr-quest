execute if score @s mtrq_quest_progress matches 0 run scoreboard players set @s mtrq_quest_target 23
execute if score @s mtrq_quest_progress matches 1 run scoreboard players set @s mtrq_quest_target 21
execute if score @s mtrq_quest_progress matches 2 run scoreboard players set @s mtrq_quest_target 38
execute if score @s mtrq_quest_progress matches 3 run scoreboard players set @s mtrq_quest_target 45
execute if score @s mtrq_quest_progress matches 4 run scoreboard players set @s mtrq_quest_target 41
execute if score @s mtrq_quest_progress matches 5 run scoreboard players add @s mtrq_qp 40
execute if score @s mtrq_quest_progress matches 5 run scoreboard players add @s mtrq_player_xp 40
execute if score @s mtrq_quest_progress matches 5 run tellraw @s [{"text": "Quest Complete: ", "bold": true, "color": "green"}, {"text": "Expedition Vol. 2: Down South", "bold": true, "color": "white"}, {"text": "\n+40 Quest Points & Player XP", "bold": true, "color": "aqua"}]
execute if score @s mtrq_quest_progress matches 5 run scoreboard players add @s mtrq_completions_qid3 1
execute if score @s mtrq_quest_progress matches 5 store result score @s mtrq_completions run scoreboard players get @s mtrq_completions_qid3
execute if score @s mtrq_quest_progress matches 5 run function mtrq:complete/quest