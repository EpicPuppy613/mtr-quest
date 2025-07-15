scoreboard players set @p mtrq_current_quest 2
scoreboard players set @p mtrq_quest_progress 0
scoreboard players set @p mtrq_quest_complete 0
tellraw @p [{"text": "Quest Started: ", "bold": true, "color": "yellow"}, {"text": "Expedition Vol. 1: Up North", "bold": true, "color": "white"}]
execute as @p run function mtrq:tick/quests