execute if score @s mtrq_quest_progress matches 0 run scoreboard players set @s mtrq_quest_target 8
execute if score @s mtrq_quest_progress matches 1 run scoreboard players set @s mtrq_quest_target 73
execute if score @s mtrq_quest_progress matches 2 run scoreboard players set @s mtrq_quest_target 30
execute if score @s mtrq_quest_progress matches 3 run scoreboard players set @s mtrq_quest_target 60
execute if score @s mtrq_quest_progress matches 4 run scoreboard players set @s mtrq_quest_target 84
execute if score @s mtrq_quest_progress matches 5 run scoreboard players set @s mtrq_quest_target 40
execute if score @s mtrq_quest_progress matches 6 run scoreboard players set @s mtrq_quest_target 50
execute if score @s mtrq_quest_progress matches 7 run scoreboard players set @s mtrq_quest_target 98
execute if score @s mtrq_quest_progress matches 8 run scoreboard players set @s mtrq_quest_target 62
execute if score @s mtrq_quest_progress matches 9 run scoreboard players set @s mtrq_quest_target 92
execute if score @s mtrq_quest_progress matches 10 run scoreboard players set @s mtrq_quest_target 66
execute if score @s mtrq_quest_progress matches 11 run scoreboard players set @s mtrq_quest_target 26
execute if score @s mtrq_quest_progress matches 12 run scoreboard players set @s mtrq_quest_target 56
execute if score @s mtrq_quest_progress matches 13 run scoreboard players set @s mtrq_quest_target 99
execute if score @s mtrq_quest_progress matches 14 run scoreboard players set @s mtrq_quest_target 35
execute if score @s mtrq_quest_progress matches 15 run scoreboard players add @s mtrq_qp 300
execute if score @s mtrq_quest_progress matches 15 run scoreboard players add @s mtrq_player_xp 300
execute if score @s mtrq_quest_progress matches 15 run tellraw @s [{"text": "Quest Complete: ", "bold": true, "color": "green"}, {"text": "Torture Vol. 1: There and Back", "bold": true, "color": "white"}, {"text": "\n+300 Quest Points & Player XP", "bold": true, "color": "aqua"}]
execute if score @s mtrq_quest_progress matches 15 run scoreboard players add @s mtrq_completions_qid6 1
execute if score @s mtrq_quest_progress matches 15 store result score @s mtrq_completions run scoreboard players get @s mtrq_completions_qid6
execute if score @s mtrq_quest_progress matches 15 run function mtrq:complete/quest