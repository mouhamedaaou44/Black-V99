const axios = require('axios');



module.exports = {
  config: {
    name: "جبتي",
    Owner: "عبدالرحمن",
    Auth: 0,
    Time: 0,
    Info: "تحدث مع جبتي",
    Class: "ثريدز",
  },

  onType: async function({ event, api, args, black, usersData, threadsData }) {

    const coj = args.join(" ")
    if (!coj) return black.reply('اكتب شي')
    const prms = {
        senderID: event.senderID,
        query: coj
    }
    const res = await axios.post("https://gpt---api-48f263785da3.herokuapp.com/chat", prms);

    return black.reply({ body: res.data.result }, (error, info) => {
      global.client.Reply.push(info.messageID, {
        name: this.config.name,
        author: event.senderID,
        messageID: info.messageID

      });
    });
  },

  onReply: async function({ api, event, Reply, black, usersData, threadsData }) {
    const prms = {
        senderID: event.senderID,
        query: event.body
    }
    const res = await axios.post("https://gpt---api-48f263785da3.herokuapp.com/chat", prms);


    return black.reply({ body: res.data.result }, (error, info) => {
      global.client.Reply.push(info.messageID, {
        name: this.config.name,
        author: event.senderID,
        messageID: info.messageID
      });
    });




  },
};
