const axios = require('axios');
const fs = require('fs');
const request = require('request');

module.exports.config = {
  name: "صفحة",
  version: "1.0.0",
  hasPermission: 0,
  credits: "علي فاضل",
  description: "عرض صفحة من القرآن الكريم بصورة",
  commandCategory: "معلومات",
  usages: "صفحة [رقم الصفحة]",
  cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
  let pageNumber = parseInt(args[0]);

  // Validate input
  if (isNaN(pageNumber) || pageNumber <= 0) {
    return api.sendMessage('يرجى إدخال رقم صفحة صحيح', event.threadID, event.messageID);
  }

  // Format page number
  let formattedPageNumber = ('0000' + pageNumber).slice(-4);

  const url = `https://ia600701.us.archive.org/BookReader/BookReaderImages.php?zip=/17/items/quran_shubah/quran_shubah_jp2.zip&file=quran_shubah_jp2/quran_shubah_${formattedPageNumber}.jp2&id=quran_shubah&scale=2&rotate=0`;

  try {
    let callback = function () {
      return api.sendMessage(
        {
          body: `
          القرآن الكريم برواية شعبة
          الصفحة التي فيها السند: ${pageNumber}
          `,
          attachment: fs.createReadStream(__dirname + `/cache/quran_page_${formattedPageNumber}.jpg`)
        }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/quran_page_${formattedPageNumber}.jpg`), event.messageID);
    };

    request(url).pipe(fs.createWriteStream(__dirname + `/cache/quran_page_${formattedPageNumber}.jpg`)).on("close", callback);
  } catch (err) {
    console.error(err);
    api.sendMessage('حدث خطأ أثناء جلب صفحة من القرآن الكريم.', event.threadID, event.messageID);
  }
};