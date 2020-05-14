const help_message = 
`**Commands to toggle color roles**

<:yellowEmote:674356833766473744> = !role yellow
<:orangeEmote:674356833770668043> = !role orange
<:redEmote:674356835905568769> = !role red
<:pinkEmote:674356833762410517> = !role pink
<:magentaEmote:674356833443512346> = !role magenta
<:purpleEmote:674356833393311837> = !role purple
<:blueEmote:674356833707753480> = !role blue
<:cyanEmote:674356833779187772> = !role cyan
<:turquoiseEmote:674356833783382058> = !role turquoise
<:greenEmote:674356833762148372> = !role green
<:blackEmote:674356833766604810> = !role black
<:grayEmote:674356833384792086> = !role gray
<:whiteEmote:674356833779056640> = !role white`;

const guilds_roles = new Map();

const GC_id = "522571164208332810";
const GC_roles = new Map();
GC_roles.set("yellow", "584139153130651765");
GC_roles.set("orange", "674708815450603520");
GC_roles.set("red", "626533388844793856");
GC_roles.set("pink", "584286913645510656");
GC_roles.set("magenta", "674709274118586399");
GC_roles.set("purple", "674710239974785025");
GC_roles.set("blue", "610474668553535489");
GC_roles.set("cyan", "647776252148711444");
GC_roles.set("turquoise", "674709322852466728");
GC_roles.set("green", "674709530931626015");
GC_roles.set("white", "674708982224388166");
GC_roles.set("gray", "674709080647925787");
GC_roles.set("grey", "674709080647925787");
GC_roles.set("black", "575741888926187522");
guilds_roles.set(GC_id, GC_roles);

const lounge_id = "674290040486232065";
const lounge_roles = new Map();
lounge_roles.set("green", "674347563062788109");
lounge_roles.set("gray", "674291144859058215");
lounge_roles.set("grey", "674291144859058215");
lounge_roles.set("black", "674351017537568794");
lounge_roles.set("white", "674351204758716446");
lounge_roles.set("blue", "674349925756174367");
lounge_roles.set("purple", "674349448050245653");
lounge_roles.set("magenta", "674347964436840524");
lounge_roles.set("red", "674346959821078538");
lounge_roles.set("pink", "674347532905742359");
lounge_roles.set("cyan", "674346619545714688");
lounge_roles.set("turquoise", "674290776129273856");
lounge_roles.set("orange", "674346854577733662");
lounge_roles.set("yellow", "674350210159476736");
guilds_roles.set(lounge_id, lounge_roles);

module.exports = {
    name: "role",
    alias: ["toggle"],
    execute(client, message, args) {
        if (args.length != 1) { return; }
        const rolename = args[0].toLowerCase();

        if (rolename == "help") {
            message.channel.send(help_message);
        }

        if (guilds_roles.has(message.guild.id)) {
            const available_roles = guilds_roles.get(message.guild.id);
            if (available_roles.has(rolename)) {
                const role = available_roles.get(rolename);
                const member = message.member;
                if (!member) { return; }

                if (member.roles.cache.has(role)) {
                    member.roles.remove(role)
                        .then(console.log(`${rolename} removed from ${message.author.username}`))
                        .catch(console.log);
                } else {
                    member.roles.add(role)
                        .then(console.log(`${rolename} added to ${message.author.username}`))
                        .catch(console.log);
                }
            }
        }
    }
};