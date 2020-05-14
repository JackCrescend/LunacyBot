const https = require('https')

module.exports = {
  name: "spotify",
  alias: [],
  execute(client, message, args) {
    let songQuery = "?q=";
    songQuery += args.join('%20');
    songQuery += "&type=track";
    songQuery += "&limit=5";

    const options = {
      host: "api.spotify.com",
      path: `/v1/search${songQuery}`,
      method: "GET",
      headers: {
        "Authorization": `${client.spotifyToken.token_type} ${client.spotifyToken.access_token}`
      }
    };

    const req = https.get(options, (res) => {
      let incData = "";
      
      res.on('data', (chunk) => {
        incData += chunk;
      });

      res.on('end', () => {
        if (res.statusCode !== 200) {
          console.log(res);
          return;
        }

        const data = JSON.parse(incData);
        const tracks = data.tracks.items;

        if (tracks.length <= 0) {
          message.channel.send("Search came up empty!");
          return;
        }

        let popularity = 0;
        let mostPopular = 0;
        for (let i = 0; i < tracks.length; ++i) {
          const track = tracks[i];
          if (track.popularity > popularity) {
            popularity = track.popularity;
            mostPopular = i;
          }
        }

        message.channel.send(tracks[mostPopular].external_urls.spotify);
      });
      
    }).on("error", (err) => {
      console.log(`Error: ${err.message}`);
    });

    req.end();
  }
};