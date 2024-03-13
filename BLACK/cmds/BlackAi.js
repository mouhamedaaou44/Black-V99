const axios = require("axios");
const URI = "mongodb+srv://GryKJ:GryKJ9898_@grykj.5irmqy7.mongodb.net/?retryWrites=true&w=majority";
const Name = require(__dirname + '/mongoDB/Names.js');
const m = require("mongoose");
module.exports = {
  config: {
  name: "بلاك",
  KJ: ["black","ai"],
  Auth: 0,
  Owner: "Gry KJ",
  Info: "ذكاء اصطناعي بلاك",
  Hide: false,
  Class: "شات",
  How: "بلاك ثم اكتب شيء بعدها",
  Time: 0
},
onType: async function({args, black, event })
{
  m.connect(URI)
  .then( async () => {
    let bro = await Name.findById("65df0a095506249b4abb3f5b");
  const query = args.join(" ");
  if(!query)
  {
    return black.reply("مرحبا ايها السيد في ماذا قد اساعدك اليوم 𓆩⚝𓆪");
  }
  let options = {
  method: "POST",
  url: "https://api.edenai.run/v2/text/chat",
  headers: {
    authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZmYyMTk5MGYtODc4NC00YjUwLTk4MzItNjFmYmYzZDUyMzA0IiwidHlwZSI6ImFwaV90b2tlbiJ9.Zxbk7j3uEk42h_a4M5-xDVrel9E25NaMooVtJnI4nUQ",
  },
  data: {
    providers: "google",
    text: query,
    chatbot_global_action: `As a messenger bot, and as a black bot, I respect my users, my creator are named Zuhair, he has a friend named Omar who has a bot named Kayra, my prefix is ${config.PREFIX}, the commands inside me can be used by the prefix and then the name of the command, there are some commands that use responses such as XO and Manga, i'm talk with Arabic, Shady is a boy who thinks that he is Omar and Zuhair's teacher, but he is only a teacher of Omar, It's just an illusion for Zuhair, number of my commands is ${client.commands.size}, Ayoub is a person who did not learn programming no matter how hard he tried, Zuhair and Omar his uncles.`,
    previous_history: [],
    temperature: 0.1,
    max_tokens: 1900,
    fallback_providers: "",
  },
};
if (event.senderID == config.OWNERID)
{
  options.data.chatbot_global_action = `As a messenger bot, and as a black bot, I respect my users, my creator are named Zuhair, he has a friend named Omar who has a bot named Kayra, my prefix is ${config.PREFIX}, the commands inside me can be used by the prefix and then the name of the command, there are some commands that use responses such as XO and Manga, i'm talk with Arabic, Shady is a boy who thinks that he is Omar and Zuhair's teacher, but he is only a teacher of Omar, It's just an illusion for Zuhair, number of my commands is ${client.commands.size}, Ayoub is a person who did not learn programming no matter how hard he tried, Zuhair and Omar his uncles, now i'm talkin with my lord Zuhair`
}
if (bro.array.includes(event.senderID) && event.senderID != config.OWNERID) {
  options.data.chatbot_global_action = `As a messenger bot, and as a black bot, I respect my users, my creator are named Zuhair, he has a friend named Omar who has a bot named Kayra, my prefix is *, the commands inside me can be used by the prefix and then the name of the command, there are some commands that use responses such as XO and Manga, i'm talk with Arabic, Shady is a boy who thinks that he is Omar and Zuhair's teacher, but he is only a teacher of Omar, It's just an illusion for Zuhair, number of my commands is ${client.commands.size}, Ayoub is a person who did not learn programming no matter how hard he tried, Zuhair and Omar his uncles, now i'm talkin with ${bro.array2[bro.array.indexOf(event.senderID)]}`
}
axios
  .request(options)
  .then(async (response) => {
    black.reply(response.data.google.generated_text);
  })
  .catch((error) => {
    black.reply(error)
  });
}).catch((error) => black.reply(error))
}
};
