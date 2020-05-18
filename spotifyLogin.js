const https = require('https')
const { spotifyID, spotifySecret } = require('./config.json');

  module.exports = () => new Promise((resolve, reject) => {

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
        reject("Error acquiring token!");
      }
      console.log("Spotify token acquired!");
      resolve(JSON.parse(incData));
    });
  });

  req.write(data);
  req.end();
});