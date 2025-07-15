const fs = require('fs');
//const data = JSON.parse(fs.readFileSync('location.json', 'utf8'));
let raw = fs.readFileSync('in\\points.csv', 'utf8').split("\n").map(x => x.split(","));
let bossbars = "";
let locations = "";
for (let i = 0; i < raw.length; i++) {
    let data = {
        id: raw[i][0],
        name: raw[i][1],
        type: raw[i][2],
        line: raw[i][3]
    }
    data.line = data.line.replace("\r", "");
    let text = [{text: "Objective: ", bold: true, color: "white"}];
    let color = "";
    switch (data.type) {
        case "A":
            text.push({text: "Visit ", bold: true, color: "red"});
            color = "red";
            break;
        case "B":
            text.push({text: "Complete parkour at ", bold: true, color: "yellow"});
            color = "yellow";
            break;
        case "C":
            text.push({text: "Solve puzzle at ", bold: true, color: "green"});
            color = "green";
            break;
        case "D":
            text.push({text: "Complete parkour at ", bold: true, color: "aqua"});
            color = "aqua";
            break;
        default:
            color = "white";
    }
    text.push({text: data.name, bold: true, color: "light_purple"});
    let out = `bossbar add mtrq_locid${data.id} ""\nbossbar set mtrq_locid${data.id} name ${JSON.stringify(text)}\nbossbar set mtrq_locid${data.id} color ${color}\nbossbar set mtrq_locid${data.id} max 1\nbossbar set mtrq_locid${data.id} value 1`;
    out += `\n\nbossbar set mtrq_locid${data.id} players @a[scores={mtrq_quest_target=${data.id},mtrq_current_quest=1..}]`;
    //fs.writeFileSync('location.txt', out, 'utf8');
    let write = out.split("\n\n");
    bossbars += write[0] + "\n\n";
    locations += write[1] + "\n";
}
fs.writeFileSync("out\\load\\bossbars.mcfunction", bossbars, "utf-8");
fs.writeFileSync("out\\tick\\locations.mcfunction", locations, "utf-8");