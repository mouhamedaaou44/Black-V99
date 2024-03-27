const axios = require('axios');
const fs = require('fs');
const request = require('request');

module.exports = {
  config: {
    name: "صفحة",
    Owner: "louFi2",
    Auth: 0,
    Time: 0,
    Info: "صفحة من القرآن 🥹",
    Class: "اسلامي",
  },

module.exports.onType = async function({ api, event, args, black }) => {
  let pageNumber = parseInt(args[0]);

  // Validate input
  if (isNaN(pageNumber) || pageNumber <= 0) {
    return         black.reply('يرجى إدخال رقم صفحة صحيح');
  }

  // Format page number
  let formattedPageNumber = ('0000' + pageNumber).slice(-4);

  const url = `https://ia600701.us.archive.org/BookReader/BookReaderImages.php?zip=/17/items/quran_shubah/quran_shubah_jp2.zip&file=quran_shubah_jp2/quran_shubah_${formattedPageNumber}.jp2&id=quran_shubah&scale=2&rotate=0`;

  try {
    let callback = function () {
      return         black.reply(
        {
          body: `
          القرآن الكريم برواية شعبة
          الصفحة التي فيها السند: ${pageNumber}
          `,
          attachment: await funcs.str(__dirname + `/cache/quran_page_${formattedPageNumber}.jpg`)
        },() => fs.unlinkSync(__dirname + `/cache/quran_page_${formattedPageNumber}.jpg`), );
    };

    request(url).pipe(fs.createWriteStream(__dirname + `/cache/quran_page_${formattedPageNumber}.jpg`)).on("close", callback);
  } catch (err) {
    console.error(err);
            black.reply('حدث خطأ أثناء جلب صفحة من القرآن الكريم.');
  }
};