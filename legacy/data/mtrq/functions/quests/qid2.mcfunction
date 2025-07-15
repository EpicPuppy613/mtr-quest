execute if score @s mtrq_quest_progress matches 0 run scoreboard players set @s mtrq_quest_target 6
execute if score @s mtrq_quest_progress matches 1 run scoreboard players set @s mtrq_quest_target 84
execute if score @s mtrq_quest_progress matches 2 run scoreboard players set @s mtrq_quest_target 17
execute if score @s mtrq_quest_progress matches 3 run scoreboard players set @s mtrq_quest_target 32
execute if score @s mtrq_quest_progress matches 4 run scoreboard players set @s mtrq_quest_target 37
execute if score @s mtrq_quest_progress matches 5 run scoreboard players add @s mtrq_qp 40
execute if score @s mtrq_quest_progress matches 5 run scoreboard players add @s mtrq_player_xp 40
execute if score @s mtrq_quest_progress matches 5 run tellraw @s [{"text": "Quest Complete: ", "bold": true, "color": "green"}, {"text": "Expedition Vol. 1: Up North", "bold": true, "color": "white"}, {"text": "\n+40 Quest Points & Player XP", "bold": true, "color": "aqua"}]
execute if score @s mtrq_quest_progress matches 5 run scoreboard players add @s mtrq_completions_qid2 1
execute if score @s mtrq_quest_progress matches 5 store result score @s mtrq_completions run scoreboard players get @s mtrq_completions_qid2
execute if score @s mtrq_quest_progress matches 5 run function mtrq:complete/quest