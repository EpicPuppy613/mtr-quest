const fs = require('fs');
const cp = require('child_process');
const input = fs.readFileSync('in/quests.csv', 'utf8').split("\r\n").map(x => x.split(","));
let ticker = "";
for (let i = 0; i < input.length; i++) {
    /** @type{string[]} */
    const quest = input[i];
    const quid = quest[0];
    const ready = quest[1] == 1;
    if (!ready) continue;
    const name = quest[2];
    const introduced = quest[3];
    const r2c = quest[4] == 1;
    const hard = quest[5] == 1;
    const diff = quest[6];
    const reward = quest[7];
    const objectives = quest.slice(8).filter(x => x.length > 0);
    const questData = {
        id: quid,
        name: name,
        objectives: objectives,
        reward: reward,
        r2c: r2c,
        hard: hard,
    };
    fs.writeFileSync("in/quest.json", JSON.stringify(questData), "utf-8");
    cp.execSync("node scripts/quest.js");
    ticker += `execute if score @s mtrq_current_quest matches ${quid} run function mtrq:quests/${quid}\n`;
    console.log(`QID ${i + 1} | ${name}`);
}
fs.writeFileSync("out/tick/quests.mcfunction", ticker, "utf-8");