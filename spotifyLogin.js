const https = require('https')

exports.getSpotifyToken = (client, spotifyID, spotifySecret) => {

  const data = "grant_type=client_credentials";

  const authcode = `${spotifyID}:${spotifySecret}`;
  const base64auth = Buffer.from(authcode).toString('base64');
  
  const options = {
    host: "accounts.spotify.com",
    path: "/api/token",
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Content-Length": data.length,
      "Authorization": `Basic ${base64auth}`
    }
  };

  const req = https.request(options, (res) => {
    let incData = "";

    res.on('data', (chunk) => {
      incData += chunk;
    });
    
    res.on('end', () => {
      if (res.statusCode !== 200) {
        console.log(res);
        return;
      }
      client.spotifyToken = JSON.parse(incData);
      const tokenTimer = client.spotifyToken.expires_in * 1000;
      setTimeout(() => getSpotifyToken(client, spotifyID, spotifySecret), tokenTimer);
      console.log("Spotify token acquired!");
    });
  });

  req.write(data);
  req.end();
};