execute if score @s mtrq_quest_progress matches 0 run scoreboard players set @s mtrq_quest_target 1
execute if score @s mtrq_quest_progress matches 1 run scoreboard players set @s mtrq_quest_target 2
execute if score @s mtrq_quest_progress matches 2 run scoreboard players set @s mtrq_quest_target 3
execute if score @s mtrq_quest_progress matches 3 run scoreboard players set @s mtrq_quest_target 4
execute if score @s mtrq_quest_progress matches 4 run scoreboard players set @s mtrq_quest_target 5
execute if score @s mtrq_quest_progress matches 5 run scoreboard players set @s mtrq_quest_target 6
execute if score @s mtrq_quest_progress matches 6 run scoreboard players set @s mtrq_quest_target 7
execute if score @s mtrq_quest_progress matches 7 run scoreboard players set @s mtrq_quest_target 8
execute if score @s mtrq_quest_progress matches 8 run scoreboard players set @s mtrq_quest_target 9
execute if score @s mtrq_quest_progress matches 9 run scoreboard players set @s mtrq_quest_target 10
execute if score @s mtrq_quest_progress matches 10 run scoreboard players set @s mtrq_quest_target 11
execute if score @s mtrq_quest_progress matches 11 run scoreboard players set @s mtrq_quest_target 12
execute if score @s mtrq_quest_progress matches 12 run scoreboard players set @s mtrq_quest_target 13
execute if score @s mtrq_quest_progress matches 13 run scoreboard players set @s mtrq_quest_target 14
execute if score @s mtrq_quest_progress matches 14 run scoreboard players set @s mtrq_quest_target 15
execute if score @s mtrq_quest_progress matches 15 run scoreboard players set @s mtrq_quest_target 16
execute if score @s mtrq_quest_progress matches 16 run scoreboard players set @s mtrq_quest_target 17
execute if score @s mtrq_quest_progress matches 17 run scoreboard players set @s mtrq_quest_target 18
execute if score @s mtrq_quest_progress matches 18 run scoreboard players set @s mtrq_quest_target 19
execute if score @s mtrq_quest_progress matches 19 run scoreboard players set @s mtrq_quest_target 20
execute if score @s mtrq_quest_progress matches 20 run scoreboard players set @s mtrq_quest_target 21
execute if score @s mtrq_quest_progress matches 21 run scoreboard players set @s mtrq_quest_target 22
execute if score @s mtrq_quest_progress matches 22 run scoreboard players set @s mtrq_quest_target 23
execute if score @s mtrq_quest_progress matches 23 run scoreboard players set @s mtrq_quest_target 24
execute if score @s mtrq_quest_progress matches 24 run scoreboard players set @s mtrq_quest_target 25
execute if score @s mtrq_quest_progress matches 25 run scoreboard players add @s mtrq_qp 320
execute if score @s mtrq_quest_progress matches 25 run scoreboard players add @s mtrq_player_xp 320
execute if score @s mtrq_quest_progress matches 25 run tellraw @s [{"text": "Quest Complete: ", "bold": true, "color": "green"}, {"text": "Marathon Vol. 1: 1-25", "bold": true, "color": "white"}, {"text": "\n+320 Quest Points & Player XP", "bold": true, "color": "aqua"}]
execute if score @s mtrq_quest_progress matches 25 run scoreboard players add @s mtrq_completions_qid19 1
execute if score @s mtrq_quest_progress matches 25 store result score @s mtrq_completions run scoreboard players get @s mtrq_completions_qid19
execute if score @s mtrq_quest_progress matches 25 run function mtrq:complete/quest