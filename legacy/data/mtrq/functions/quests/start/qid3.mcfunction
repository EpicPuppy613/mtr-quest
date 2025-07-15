scoreboard players set @p mtrq_current_quest 3
scoreboard players set @p mtrq_quest_progress 0
scoreboard players set @p mtrq_quest_complete 0
tellraw @p [{"text": "Quest Started: ", "bold": true, "color": "yellow"}, {"text": "Expedition Vol. 2: Down South", "bold": true, "color": "white"}]
execute as @p run function mtrq:tick/quests