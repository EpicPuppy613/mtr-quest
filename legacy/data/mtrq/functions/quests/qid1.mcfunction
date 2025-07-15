execute if score @s mtrq_quest_progress matches 0 run scoreboard players set @s mtrq_quest_target 1
execute if score @s mtrq_quest_progress matches 1 run scoreboard players set @s mtrq_quest_target 2
execute if score @s mtrq_quest_progress matches 2 run scoreboard players set @s mtrq_quest_target 3
execute if score @s mtrq_quest_progress matches 3 run scoreboard players set @s mtrq_quest_target 4
execute if score @s mtrq_quest_progress matches 4 run scoreboard players set @s mtrq_quest_target 5
execute if score @s mtrq_quest_progress matches 5 run scoreboard players add @s mtrq_qp 1
execute if score @s mtrq_quest_progress matches 5 run scoreboard players add @s mtrq_player_xp 1
execute if score @s mtrq_quest_progress matches 5 run tellraw @s [{"text": "Quest Complete: ", "bold": true, "color": "green"}, {"text": "Tutorial Quest", "bold": true, "color": "white"}, {"text": "\n+1 Quest Points & Player XP", "bold": true, "color": "aqua"}]
execute if score @s mtrq_quest_progress matches 5 run scoreboard players add @s mtrq_completions_qid1 1
execute if score @s mtrq_quest_progress matches 5 store result score @s mtrq_completions run scoreboard players get @s mtrq_completions_qid1
execute if score @s mtrq_quest_progress matches 5 run function mtrq:complete/quest