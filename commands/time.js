module.exports = {
    name: "time",
    alias: ["servertime", "st"],
    execute(client, message, args) {
        const time = new Date();
        const currentHours = time.getUTCHours();
        const currentMinutes = time.getUTCMinutes();
        let offset = 0;

        if (args.length > 0) {
            const timezone = args[0].toUpperCase();

            if (timezone == "SERVERTIME" || timezone == "ST" || timezone == "GMT") {
                offset = 0;
            } else if (timezone == "GMT+1" || timezone == "UTC+1" || timezone == "CET") {
                offset = 1;
            } else if (timezone == "GMT+2" || timezone == "UTC+2" || timezone == "CEST" || timezone == "GC" || timezone == "GRANDCHASE") {
                offset = 2;
            } else if (timezone == "GMT+3" || timezone == "UTC+3") {
                offset = 3;
            } else if (timezone == "GMT+4" || timezone == "UTC+4") {
                offset = 4;
            } else if (timezone == "GMT+5" || timezone == "UTC+5") {
                offset = 5;
            } else if (timezone == "GMT+6" || timezone == "UTC+6") {
                offset = 6;
            } else if (timezone == "GMT+7" || timezone == "UTC+7") {
                offset = 7;
            } else if (timezone == "GMT+8" || timezone == "UTC+8") {
                offset = 8;
            } else if (timezone == "GMT+9" || timezone == "UTC+9") {
                offset = 9;
            } else if (timezone == "GMT+10" || timezone == "UTC+10") {
                offset = 10;
            } else if (timezone == "GMT+11" || timezone == "UTC+11") {
                offset = 11;
            } else if (timezone == "GMT+12" || timezone == "UTC+12") {
                offset = 12;
            } else if (timezone == "GMT-1" || timezone == "UTC-1") {
                offset = -1;
            } else if (timezone == "GMT-2" || timezone == "UTC-2") {
                offset = -2;
            } else if (timezone == "GMT-3" || timezone == "UTC-3") {
                offset = -3;
            } else if (timezone == "GMT-4" || timezone == "UTC-4") {
                offset = -4;
            } else if (timezone == "GMT-5" || timezone == "UTC-5" || timezone == "EST") {
                offset = -5;
            } else if (timezone == "GMT-6" || timezone == "UTC-6" || timezone == "CST") {
                offset = -6;
            } else if (timezone == "GMT-7" || timezone == "UTC-7" || timezone == "PDT") {
                offset = -7;
            } else if (timezone == "GMT-8" || timezone == "UTC-8" || timezone == "PST") {
                offset = -8;
            } else if (timezone == "GMT-9" || timezone == "UTC-9") {
                offset = -9;
            } else if (timezone == "GMT-10" || timezone == "UTC-10") {
                offset = -10;
            } else if (timezone == "GMT-11" || timezone == "UTC-11") {
                offset = -11;
            } else if (timezone == "GMT-12" || timezone == "UTC12") {
                offset = -12;
            } else {
                let response = "Timezone not recognized, sorry!";
                message.reply(response);
                return;
            }
            
        }

        let hours = currentHours + offset;
        let minutes = currentMinutes;
        let PM = false;

        if (hours >= 24) {
            hours -= 24;
        } else if (hours < 0) {
            hours += 24;
        }

        if (hours >= 12) {
            PM = true;
        }

        let emote = " ";
        if (hours >= 0 && hours < 8) {
            emote += client.comboemotes.get("kannasleep");
        } else if (hours >= 8 && hours < 12) {
            emote += client.comboemotes.get("kannasippy");
        } else if (hours >= 12 && hours < 18) {
            emote += client.comboemotes.get("tohruhi"); 
        } else if (hours >= 18 && hours < 24) {
            emote += client.comboemotes.get("smugpls");
        }

        if (hours == 0) {
            hours += 12;
        } else if (hours >= 13) {
            hours -= 12;
        }

        let response = "Current time ";
        if (args.length > 0) {
            response += `in ${args[0]} => `;
        } else {
            response += "in UTC => ";
        }

        response += hours + ":";

        if (minutes < 10) {
            response += "0";
        }
        response += minutes + " ";

        if (PM) {
            response += "PM";
        } else {
            response += "AM";
        }

        response += emote;

        message.channel.send(response);
    }
};