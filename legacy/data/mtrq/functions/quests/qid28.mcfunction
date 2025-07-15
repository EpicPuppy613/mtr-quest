execute if score @s mtrq_quest_progress matches 0 run scoreboard players set @s mtrq_quest_target 9
execute if score @s mtrq_quest_progress matches 1 run scoreboard players set @s mtrq_quest_target 47
execute if score @s mtrq_quest_progress matches 2 run scoreboard players set @s mtrq_quest_target 6
execute if score @s mtrq_quest_progress matches 3 run scoreboard players set @s mtrq_quest_target 62
execute if score @s mtrq_quest_progress matches 4 run scoreboard players set @s mtrq_quest_target 25
execute if score @s mtrq_quest_progress matches 5 run scoreboard players set @s mtrq_quest_target 66
execute if score @s mtrq_quest_progress matches 6 run scoreboard players set @s mtrq_quest_target 17
execute if score @s mtrq_quest_progress matches 7 run scoreboard players set @s mtrq_quest_target 30
execute if score @s mtrq_quest_progress matches 8 run scoreboard players set @s mtrq_quest_target 22
execute if score @s mtrq_quest_progress matches 9 run scoreboard players set @s mtrq_quest_target 11
execute if score @s mtrq_quest_progress matches 10 run scoreboard players set @s mtrq_quest_target 41
execute if score @s mtrq_quest_progress matches 11 run scoreboard players set @s mtrq_quest_target 71
execute if score @s mtrq_quest_progress matches 12 run scoreboard players set @s mtrq_quest_target 42
execute if score @s mtrq_quest_progress matches 13 run scoreboard players set @s mtrq_quest_target 15
execute if score @s mtrq_quest_progress matches 14 run scoreboard players add @s mtrq_qp 200
execute if score @s mtrq_quest_progress matches 14 run scoreboard players add @s mtrq_player_xp 200
execute if score @s mtrq_quest_progress matches 14 run tellraw @s [{"text": "Quest Complete: ", "bold": true, "color": "green"}, {"text": "Pain and Suffering Vol. 1", "bold": true, "color": "white"}, {"text": "\n+200 Quest Points & Player XP", "bold": true, "color": "aqua"}]
execute if score @s mtrq_quest_progress matches 14 run scoreboard players add @s mtrq_completions_qid28 1
execute if score @s mtrq_quest_progress matches 14 store result score @s mtrq_completions run scoreboard players get @s mtrq_completions_qid28
execute if score @s mtrq_quest_progress matches 14 run function mtrq:complete/quest