// returns a random value between 0 and below max
function randInt(max) {
  if (max <= 0) { return 0; }

  let value = Math.floor(Math.random() * (max));
  return value;
}

module.exports = {
  name: "minesweeper",
  alias: [],
  execute(client, message, args) {
      if (args.length !== 0 && args.length !== 3) {
        message.reply("Use the command with no arguments for default, or specify 3 values for width, height and mine count.");
        return;
      }

      for (const value of args) {
        if (isNaN(value)) { return; }
      }

      let width = 10;
      let height = 10;
      let mineCount = 10;
      let squareCount = width * height;

      if (args.length === 3) {
        width = args[0];
        height = args[1];
        mineCount = args[2];
        squareCount = width * height;

        if (width < 0 || width > 50 || height < 0 || height > 50) {
          message.reply("Minesweeper field size has to be between 0-50");
          return;
        }

        if (mineCount < 0) {
          message.reply("Mine count needs to be positive.");
          return;
        }

        if (mineCount > (squareCount / 2)) {
          message.reply("Mine count needs to be less than half of the whole map.")
          return;
        }
      }

      // console.log(`Size: ${width}x${height}, mines: ${mineCount}`)

      // Creating the minesweeper field

      const field = new Array(width);
      for (let i = 0; i < width; ++i) {
        field[i] = new Array(height);
      }

      for (let x = 0; x < width; ++x) {
        for (let y = 0; y < height; ++y) {
          field[x][y] = {
            mine: false,
            warningNumber: 0
          }
        }
      }

      let minesPlanted = 0;
      while (minesPlanted < mineCount) {
        const x = randInt(width);
        const y = randInt(height);

        if (field[x][y].mine === false) {
          field[x][y].mine = true;
          minesPlanted += 1;

          for (let warnX = x - 1; warnX <= x + 1; ++warnX) {
            for (let warnY = y - 1; warnY <= y + 1; ++warnY) {
              if (warnX >= 0 && warnY >= 0 && warnX < width && warnY < height) {
                field[warnX][warnY].warningNumber += 1;
              }
            }
          }
        }
      }

      let reply = "";
      for (let y = 0; y < height; ++y) {
        let row = "";
        for (let x = 0; x < width; ++x) {
          if (field[x][y].mine) {
            row += "||:boom:||";
          } else {
            switch(field[x][y].warningNumber) {
              case 0:
                row += "||:zero:||";
                break;
              case 1:
                row += "||:one:||";
                break;
              case 2:
                row += "||:two:||";
                break;
              case 3:
                row += "||:three:||";
                break;
              case 4:
                row += "||:four:||";
                break;
              case 5:
                row += "||:five:||";
                break;
              case 6:
                row += "||:six:||";
                break;
              case 7:
                row += "||:seven:||";
                break;
              case 8:
                row += "||:eight:||";
                break;
            }
          }
        }
        reply += `${row}\n`
        // console.log(row);
      }

      message.channel.send(reply);
  }
};