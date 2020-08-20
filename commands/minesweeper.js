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
      if (args.length > 1) {
        message.reply("Give only one value for mine count.");
        return;
      }

      // Due to discord message length limits, minesweeper field size
      // had to be capped to 10x10.

      const width = 10;
      const height = 10;
      let mineCount = 10;

      if (args.length === 1) {
        if (isNaN(args[0])) {
          message.reply("Mine count needs to be a number.");
          return;
        }
        if (args[0] < 0) {
          message.reply("Mine count needs to be a positive number.");
          return;
        }
        if (args[0] > 50) {
          message.reply("Maximum mine count is 50.");
          return;
        }

        mineCount = args[0];
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

      let reply = `Mines: ${mineCount}\n`;
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