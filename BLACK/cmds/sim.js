const axios = require('axios');


module.exports = {
  config: {
    name: "سيم",
    Owner: "عبدالرحمن",
    Auth: 0,
    Time: 0,
    Info: "سمسم 🐢",
    Class: "ثريدز",
  },

  onType: async function({ event, api, args, black, usersData, threadsData }) {

    const coj = args.join(" ")
    if (!coj) return black.reply('اكتب شي')
    const res = await axios.get(`https://simsimi.fun/api/v2/?mode=talk&lang=ar&message=${encodeURIComponent(coj)}&filter=false`);
    const rd = res.data.success;



    return black.reply({ body: rd }, (error, info) => {
      global.client.Reply.push(info.messageID, {
        name: this.config.name,
        author: event.senderID,
        messageID: info.messageID

      });
    });
  },

  onReply: async function({ api, event, Reply, black, usersData, threadsData }) {

    const res = await axios.get(`https://simsimi.fun/api/v2/?mode=talk&lang=ar&message=${encodeURIComponent(event.body)}&filter=false`);
    const sim = res.data.success;


    return black.reply({ body: sim }, (error, info) => {
      global.client.Reply.push(info.messageID, {
        name: this.config.name,
        author: event.senderID,
        messageID: info.messageID
      });
    });




  },
};
