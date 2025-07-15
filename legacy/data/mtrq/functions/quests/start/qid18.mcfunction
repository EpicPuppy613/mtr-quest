scoreboard players set @p mtrq_current_quest 18
scoreboard players set @p mtrq_quest_progress 0
scoreboard players set @p mtrq_quest_complete 0
tellraw @p [{"text": "Quest Started: ", "bold": true, "color": "yellow"}, {"text": "Expedition Vol. 6: A Final Test", "bold": true, "color": "white"}]
tellraw @p [{"text": "Warning: This quest contains some harder parkour sections, it is not recommended for people who struggle with parkour", "bold": false, "color": "gold"}]
execute as @p run function mtrq:tick/quests