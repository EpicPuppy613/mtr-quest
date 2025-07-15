scoreboard players set @p mtrq_current_quest 15
scoreboard players set @p mtrq_quest_progress 0
scoreboard players set @p mtrq_quest_complete 0
tellraw @p [{"text": "Quest Started: ", "bold": true, "color": "yellow"}, {"text": "Ride-Along: Violet Line", "bold": true, "color": "white"}]
execute as @p run function mtrq:tick/quests