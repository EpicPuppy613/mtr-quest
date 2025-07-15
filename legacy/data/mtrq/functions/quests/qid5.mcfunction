execute if score @s mtrq_quest_progress matches 0 run scoreboard players set @s mtrq_quest_target 50
execute if score @s mtrq_quest_progress matches 1 run scoreboard players set @s mtrq_quest_target 8
execute if score @s mtrq_quest_progress matches 2 run scoreboard players set @s mtrq_quest_target 84
execute if score @s mtrq_quest_progress matches 3 run scoreboard players set @s mtrq_quest_target 92
execute if score @s mtrq_quest_progress matches 4 run scoreboard players set @s mtrq_quest_target 100
execute if score @s mtrq_quest_progress matches 5 run scoreboard players set @s mtrq_quest_target 35
execute if score @s mtrq_quest_progress matches 6 run scoreboard players add @s mtrq_qp 100
execute if score @s mtrq_quest_progress matches 6 run scoreboard players add @s mtrq_player_xp 100
execute if score @s mtrq_quest_progress matches 6 run tellraw @s [{"text": "Quest Complete: ", "bold": true, "color": "green"}, {"text": "Expedition Vol. 4: The Far Reaches", "bold": true, "color": "white"}, {"text": "\n+100 Quest Points & Player XP", "bold": true, "color": "aqua"}]
execute if score @s mtrq_quest_progress matches 6 run scoreboard players add @s mtrq_completions_qid5 1
execute if score @s mtrq_quest_progress matches 6 store result score @s mtrq_completions run scoreboard players get @s mtrq_completions_qid5
execute if score @s mtrq_quest_progress matches 6 run function mtrq:complete/quest