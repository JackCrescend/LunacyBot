const https = require('https')
const getSpotifyToken = require('../spotifyLogin')

module.exports = {
  name: "spotify",
  alias: [],
  parameters: ["[song search words] = all parameters will be written into the spotify search"],
  info: "Gives a song link to the closest guess to your search, as determined by Spotifys algorithms",
  execute(client, message, args) {

    if (client.spotifyTokenValid) {
      searchTrack(client, message, args);

    } else {
      getSpotifyToken()
        .then((token) => {
          client.spotifyToken = token;
          client.spotifyTokenValid = true;
          const validTime = token.expires_in * 1000;
          setTimeout(() => client.spotifyTokenValid = false, validTime);
          searchTrack(client, message, args);
        })
        .catch((error) => console.log(error));
    }
  }
};

const searchTrack = (client, message, args) => {
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