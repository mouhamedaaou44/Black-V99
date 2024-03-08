const axios = require("axios");
module.exports = {
  config :{
  name: "تحويل",
  Auth: 0,
  Hide: false,
  Owner: "Omar",
  Info: "تحويل صورك لانمي",
  Class: "أدوات",
  How: "",
  Time: 0
},

onType: async function({ api, args, black, event }) {

  let bb = args[0];
  if (!bb) {
    bb = 1;
  }

  if (isNaN(bb)) {
    return black.send("حط رقم مش كلام ما اعرف من وين جبته" );
  }
  if (parseInt(bb) < 1) {
    return black.send("استمر مبدع\n\nحط رقم من 1 وفوق لاشقك 𓆩⚝𓆪");
  }
  if (parseInt(bb) > 21) {
    return black.send("ممنوع اكثر من 21𓆩⚝𓆪");
  }


  if (event.type !== "message_reply" || !["photo", "sticker"].includes(event.messageReply.attachments[0].type)) {
    return black.reply("رد عا صوره𓆩⚝𓆪");
  }





  const imageUrl = event.messageReply.attachments[0].url;
  const encodedImageUrl = encodeURIComponent(imageUrl);

  black.react("⌛");

  const response = await axios.get(`https://simoapi-aimirror.onrender.com/generate?imageUrl=${encodedImageUrl}&modelNumber=${bb}`);
  const url = response.data.imageUrl;
  const mod = response.data.modelName;
  const Stream = await funcs.str(url);

  await black.reply({
    body: `𓆩⚝𓆪 ابها السيد المحترم تفضل  𓆩⚝𓆪\n\𓆩⚝𓆪∘ النوع: ${bb} 𓆩⚝𓆪\n\n𓆩⚝𓆪 الموديل: ${mod} 𓆩⚝𓆪`,
    attachment: Stream,
  });
  await black.react("✅");

}
};
