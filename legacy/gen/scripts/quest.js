const fs = require('fs');
const data = JSON.parse(fs.readFileSync('in/quest.json', 'utf8'));
let out = "";
for (let i = 0; i < data.objectives.length; i++) {
    out += `execute if score @s mtrq_quest_progress matches ${i} run scoreboard players set @s mtrq_quest_target ${data.objectives[i]}\n`;
}
out += `execute if score @s mtrq_quest_progress matches ${data.objectives.length} run scoreboard players add @s mtrq_qp ${data.reward}\n`;
out += `execute if score @s mtrq_quest_progress matches ${data.objectives.length} run scoreboard players add @s mtrq_player_xp ${data.reward}\n`;
out += `execute if score @s mtrq_quest_progress matches ${data.objectives.length} run tellraw @s [{"text": "Quest Complete: ", "bold": true, "color": "green"}, {"text": "${data.name}", "bold": true, "color": "white"}, {"text": "\\n+${data.reward} Quest Points & Player XP", "bold": true, "color": "aqua"}]\n`;
out += `execute if score @s mtrq_quest_progress matches ${data.objectives.length} run scoreboard players add @s mtrq_completions_qid${data.id} 1\n`;
out += `execute if score @s mtrq_quest_progress matches ${data.objectives.length} store result score @s mtrq_completions run scoreboard players get @s mtrq_completions_qid${data.id}\n`;
out += `execute if score @s mtrq_quest_progress matches ${data.objectives.length} run function mtrq:complete/quest`;
fs.writeFileSync('out\\quest.txt', out, 'utf8');
fs.writeFileSync("out\\quests\\qid" + data.id + ".mcfunction", out, "utf-8");
let starter = "";
starter += `scoreboard players set @p mtrq_current_quest ${data.id}\n`;
starter += `scoreboard players set @p mtrq_quest_progress 0\n`;
starter += `scoreboard players set @p mtrq_quest_complete 0\n`;
starter += `tellraw @p [{"text": "Quest Started: ", "bold": true, "color": "yellow"}, {"text": "${data.name}", "bold": true, "color": "white"}]`;
if (data.r2c) starter += `\ntellraw @p [{"text": "Please do not use /warp Spawn when returning from R2C quests", "bold": false, "color": "gold"}]`;
if (data.hard) starter += `\ntellraw @p [{"text": "Warning: This quest contains some harder parkour sections, it is not recommended for people who struggle with parkour", "bold": false, "color": "gold"}]`;
starter += `\nexecute as @p run function mtrq:tick/quests`;
fs.writeFileSync("out\\quests\\start\\qid" + data.id + ".mcfunction", starter, "utf-8");