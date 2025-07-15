execute if score @s mtrq_quest_progress matches 0 run scoreboard players set @s mtrq_quest_target 39
execute if score @s mtrq_quest_progress matches 1 run scoreboard players set @s mtrq_quest_target 117
execute if score @s mtrq_quest_progress matches 2 run scoreboard players set @s mtrq_quest_target 68
execute if score @s mtrq_quest_progress matches 3 run scoreboard players set @s mtrq_quest_target 6
execute if score @s mtrq_quest_progress matches 4 run scoreboard players set @s mtrq_quest_target 120
execute if score @s mtrq_quest_progress matches 5 run scoreboard players set @s mtrq_quest_target 47
execute if score @s mtrq_quest_progress matches 6 run scoreboard players set @s mtrq_quest_target 85
execute if score @s mtrq_quest_progress matches 7 run scoreboard players add @s mtrq_qp 160
execute if score @s mtrq_quest_progress matches 7 run scoreboard players add @s mtrq_player_xp 160
execute if score @s mtrq_quest_progress matches 7 run tellraw @s [{"text": "Quest Complete: ", "bold": true, "color": "green"}, {"text": "Expedition Vol. 6: A Final Test", "bold": true, "color": "white"}, {"text": "\n+160 Quest Points & Player XP", "bold": true, "color": "aqua"}]
execute if score @s mtrq_quest_progress matches 7 run scoreboard players add @s mtrq_completions_qid18 1
execute if score @s mtrq_quest_progress matches 7 store result score @s mtrq_completions run scoreboard players get @s mtrq_completions_qid18
execute if score @s mtrq_quest_progress matches 7 run function mtrq:complete/quest