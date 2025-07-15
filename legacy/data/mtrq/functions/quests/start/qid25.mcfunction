scoreboard players set @p mtrq_current_quest 25
scoreboard players set @p mtrq_quest_progress 0
scoreboard players set @p mtrq_quest_complete 0
tellraw @p [{"text": "Quest Started: ", "bold": true, "color": "yellow"}, {"text": "R2C: Desert Grand Central", "bold": true, "color": "white"}]
tellraw @p [{"text": "Please do not use /warp Spawn when returning from R2C quests", "bold": false, "color": "gold"}]
execute as @p run function mtrq:tick/quests