const URL = "http://worldtimeapi.org/api/timezone";
const fetch = require("node-fetch");
const timezones = require("../timezones.json");
const capitals = require("../capitals.json");


module.exports = {
    name: "time",
    alias: ["timezone"],
    hidden: false,
    parameters: [],
    info: "",
    async execute (client, message, args) {
        if (args.length < 1) {
            message.reply("give a timezone or a capital name as parameter");
            return;
        }
        let searchTerm = args.map(word => word.toLowerCase()).join("_");
        
        if (capitals[searchTerm]) searchTerm = capitals[searchTerm];

        const timezone = timezones.find(t => t.includes(searchTerm));

        if (!timezone) {
            message.reply(`could not find timezone ${searchTerm}`);
            return;
        }

        const response = await fetch(URL + "/" + timezone);
        if (!response.ok) {
            console.log(response);
            message.reply("timezone API call failed :<");
            return;
        }

        const data = await response.json();
        const currentTime = data.datetime.substring(11, 19);
        let reply = `Current time in ${data.timezone} (${data.abbreviation}): ${currentTime} `;
        const hour = parseInt(currentTime.substring(0,2), 10);
        if (hour < 8) reply += client.comboemotes.get("kannasleep");
        else if (hour < 12) reply += client.comboemotes.get("kannasip");
        else if (hour < 18) reply += client.comboemotes.get("tohruhi");
        else reply += client.comboemotes.get("cerberusawa");
        message.channel.send(reply);
    }
};