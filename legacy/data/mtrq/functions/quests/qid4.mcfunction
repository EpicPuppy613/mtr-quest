execute if score @s mtrq_quest_progress matches 0 run scoreboard players set @s mtrq_quest_target 15
execute if score @s mtrq_quest_progress matches 1 run scoreboard players set @s mtrq_quest_target 9
execute if score @s mtrq_quest_progress matches 2 run scoreboard players set @s mtrq_quest_target 47
execute if score @s mtrq_quest_progress matches 3 run scoreboard players set @s mtrq_quest_target 45
execute if score @s mtrq_quest_progress matches 4 run scoreboard players add @s mtrq_qp 45
execute if score @s mtrq_quest_progress matches 4 run scoreboard players add @s mtrq_player_xp 45
execute if score @s mtrq_quest_progress matches 4 run tellraw @s [{"text": "Quest Complete: ", "bold": true, "color": "green"}, {"text": "Expedition Vol. 3: Hoppin' Around", "bold": true, "color": "white"}, {"text": "\n+45 Quest Points & Player XP", "bold": true, "color": "aqua"}]
execute if score @s mtrq_quest_progress matches 4 run scoreboard players add @s mtrq_completions_qid4 1
execute if score @s mtrq_quest_progress matches 4 store result score @s mtrq_completions run scoreboard players get @s mtrq_completions_qid4
execute if score @s mtrq_quest_progress matches 4 run function mtrq:complete/quest