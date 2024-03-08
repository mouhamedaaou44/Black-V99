const axios = require("axios");
  const { str, Imgbb } = global.funcs;
module.exports = {
  config :{
  name: "جوده",
  Auth: 0,
  Hide: false,
  Owner: "Omar",
  Info: "توضيح صورك",
  Class: "أدوات",
  How: "رد على صورة",
  Time: 0
},

onType: async function({ api, args, black, event }) { 
    if (event.type !== "message_reply" || !["photo", "sticker"].includes(event.messageReply.attachments[0].type)) {
        return black.reply("رد عا صوره ");
      }

    const picurl = event.messageReply.attachments[0].url;
            const imgbb = await Imgbb(picurl);
       const so = imgbb.image.url;







       black.react("⌛");

      const response = await axios.get(`https://www.api.vyturex.com/upscale?imageUrl=${so}`);
      const url = response.data.resultUrl;

      const Stream = await str(url);

      await black.reply({
        body: "⚝ ◄ تفضل ► ⚝",
        attachment: Stream,
      });
      await black.react("✅");
}
  };
