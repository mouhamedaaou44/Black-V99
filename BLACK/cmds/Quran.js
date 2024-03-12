const fs = require("fs");
const axios = require("axios");
const Black = {
  name: "QuranEveryHour", 
  Class: "islam",
  Auth: 0,
  Hide: true,
  Owner: "Gry KJ",
  Time: 0
}

module.exports = {
config: Black,
onType: async function({event, black}) {black.reply("work")},
onLoad: async function ({api, event, args, black, usersData}) {

setInterval(async ()=> {
    const s1 = Math.floor(Math.random() * 114);
    var url2 = `https://api.alquran.cloud/v1/surah/${s1}`;
    var response = await fetch(url2);
    var dataa = await response.json();
    const s2 = Math.floor(Math.random() * dataa.data.numberOfAyahs);
    var url = `https://api.quran.gading.dev/surah/${s1}/${s2}`;
    var res = await fetch(url);
    var data = await res.json();
    const audio = data.data.audio.secondary[1];
    const audata = await axios.get(audio, {responseType: "stream"});
    const writer = fs.createWriteStream(__dirname + "/cache/quran.mp3");
    audata.data.pipe(writer);
    writer.on('finish', () => {
       api.getThreadList(10, null, ["INBOX"], (err, threads) => {
  if (err) {
    console.error(err);
    return;
  }

  const IDs = threads.map(th => th.threadID);
for (let id of IDs) {
 api.sendMessage({body: `${dataa.data.name}
رقم الآية : ${s2}
${data.data.text.arab}
` , attachment: fs.createReadStream(__dirname + "/cache/quran.mp3")}, id)

}

});
    })
}, 3600000)

}
}
