# LunacyBot

This is my custom Discord Bot for Lunacy servers (videogame guild), based on https://discord.js.org/. Its gone through multiple iterations and tweaks as I've experimented with what would be the most useful functions for chatters to have.

Currently, the bot does;
1) Posting (animated) emotes on peoples behalf, since typically non-paying chatters wouldn't have access to animated emotes or emotes from other servers
2) Posting entire chains of emotes, plus optional messages alongside them
3) Adding (animated) emotes as reactions to messages in chat, once again getting around the typical emote restrictions
4) Adding / removing roles from users, for instance letting regular users get access to certain flair roles to change their own chat colors without needing admin / officer help
5) Posting current time in the most typical timezones, including UTC(+-12), CET, PST, EST, BST etc.

And possibly more to be added as I come up with new ideas and inspiration.

<--- Full README rewrite coming later --->

Certain commands use external services for functionality

- Spotify's Web API for searching songs by user input
https://developer.spotify.com/documentation/web-api/

- WorldTimeAPI for querying current time across the globe
http://worldtimeapi.org/