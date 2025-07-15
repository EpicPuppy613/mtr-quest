scoreboard objectives add mtrq_storage dummy
scoreboard players set level_increase_by mtrq_storage 1065
scoreboard players set level_divide_by mtrq_storage 1000
scoreboard players set announce_interval mtrq_storage 5
scoreboard players set percent_multiplier mtrq_storage 100

# Initialize Scoreboards
scoreboard objectives add mtrq_qp dummy
scoreboard objectives add mtrq_current_quest dummy
scoreboard objectives add mtrq_quest_complete dummy
scoreboard objectives add mtrq_quest_progress dummy
scoreboard objectives add mtrq_quest_target dummy

scoreboard objectives add mtrq_player_xp dummy
scoreboard objectives add mtrq_player_level dummy
scoreboard objectives add mtrq_player_xpneed dummy
scoreboard objectives add mtrq_level_prev dummy
scoreboard objectives add mtrq_player_level_calc dummy
scoreboard objectives add mtrq_player_level_percent dummy

scoreboard objectives add mtrq_player dummy

scoreboard objectives add mtrq_helmet_level dummy
scoreboard objectives add mtrq_chestplate_level dummy
scoreboard objectives add mtrq_leggings_level dummy
scoreboard objectives add mtrq_boots_level dummy
scoreboard objectives add mtrq_speed_level dummy

scoreboard objectives add mtrq_upgrade_success dummy

scoreboard objectives add mtrq_completions dummy
scoreboard objectives add mtrq_disable_actionbar dummy
scoreboard objectives add mtrq_in_shop dummy

# Quest Completion Scoreboard
scoreboard objectives add mtrq_completions_qid1 dummy
scoreboard objectives add mtrq_completions_qid2 dummy
scoreboard objectives add mtrq_completions_qid3 dummy
scoreboard objectives add mtrq_completions_qid4 dummy
scoreboard objectives add mtrq_completions_qid5 dummy
scoreboard objectives add mtrq_completions_qid6 dummy
scoreboard objectives add mtrq_completions_qid7 dummy
scoreboard objectives add mtrq_completions_qid8 dummy
scoreboard objectives add mtrq_completions_qid9 dummy
scoreboard objectives add mtrq_completions_qid10 dummy
scoreboard objectives add mtrq_completions_qid11 dummy
scoreboard objectives add mtrq_completions_qid12 dummy
scoreboard objectives add mtrq_completions_qid13 dummy
scoreboard objectives add mtrq_completions_qid14 dummy
scoreboard objectives add mtrq_completions_qid15 dummy
scoreboard objectives add mtrq_completions_qid16 dummy
scoreboard objectives add mtrq_completions_qid17 dummy
scoreboard objectives add mtrq_completions_qid18 dummy
scoreboard objectives add mtrq_completions_qid19 dummy
scoreboard objectives add mtrq_completions_qid20 dummy
scoreboard objectives add mtrq_completions_qid21 dummy
scoreboard objectives add mtrq_completions_qid22 dummy
scoreboard objectives add mtrq_completions_qid23 dummy
scoreboard objectives add mtrq_completions_qid24 dummy
scoreboard objectives add mtrq_completions_qid25 dummy
scoreboard objectives add mtrq_completions_qid26 dummy
scoreboard objectives add mtrq_completions_qid27 dummy
scoreboard objectives add mtrq_completions_qid28 dummy
scoreboard objectives add mtrq_completions_qid29 dummy
scoreboard objectives add mtrq_completions_qid30 dummy
scoreboard objectives add mtrq_completions_qid31 dummy
scoreboard objectives add mtrq_completions_qid32 dummy
scoreboard objectives add mtrq_completions_qid33 dummy
scoreboard objectives add mtrq_completions_qid34 dummy
scoreboard objectives add mtrq_completions_qid35 dummy
scoreboard objectives add mtrq_completions_qid36 dummy
scoreboard objectives add mtrq_completions_qid37 dummy
scoreboard objectives add mtrq_completions_qid38 dummy
scoreboard objectives add mtrq_completions_qid39 dummy

# Bossbars
function mtrq:load/bossbars

tellraw @a {"text": "MTR Quest loaded! Version 1.3.0", "color": "green", "bold": true}