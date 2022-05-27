const Jimp = require("jimp");

const colorizer = async (number) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newRed = Math.floor((Math.random() * 1000000) % 256);
      const newGreen = Math.floor((Math.random() * 1000000) % 256);
      const newBlue = Math.floor((Math.random() * 1000000) % 256);

      const image = await Jimp.read("./base.png");

      image.scan(
        0,
        0,
        image.bitmap.width,
        image.bitmap.height,
        async function (x, y, idx) {
          let red = this.bitmap.data[idx + 0];
          let green = this.bitmap.data[idx + 1];
          let blue = this.bitmap.data[idx + 2];

          if (red > 0 || green > 0 || blue > 0) {
            this.bitmap.data[idx] = newRed;
            this.bitmap.data[idx + 1] = newGreen;
            this.bitmap.data[idx + 2] = newBlue;
            this.bitmap.data[idx + 3] = 255;
          }

          if (x === image.bitmap.width - 1 && y === image.bitmap.height - 1) {
            console.log(`now creating logo: ${number}`);
            await image
              .rgba(false)
              .background(
                parseInt(Math.floor(Math.random() * 16777215).toString(), 16)
              )
              .writeAsync(`./logos/logo_${number}.jpg`);

            resolve();
          }
        }
      );
    } catch (e) {
      reject(e);
    }
  });
};

[...Array(1000)].map((a, b) => colorizer(b).catch(console.log));
