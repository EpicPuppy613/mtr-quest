scoreboard players set @p mtrq_current_quest 19
scoreboard players set @p mtrq_quest_progress 0
scoreboard players set @p mtrq_quest_complete 0
tellraw @p [{"text": "Quest Started: ", "bold": true, "color": "yellow"}, {"text": "Marathon Vol. 1: 1-25", "bold": true, "color": "white"}]
execute as @p run function mtrq:tick/quests