const axios = require('axios');
const cmdN = "اكيناتور"
module.exports = {
  config: {
  name: cmdN,
    KJ: ["aki"],
  Auth: 0,
  Owner: "CMD: Omar, API : Gry KJ",
  Info: "مارد ازرق",
  Hide: false,
  Class: "شات",
  How: "فقط اكتب الأمر وسوف تعرف",
  Time: 2
  },

  onType: async function ({ event, api, black }) {
    const gry_server = "https://akinator-5c1baee38e17.herokuapp.com/game";
    

    

    const u = {
      user_id: event.senderID,
      answer: "2",
      region: "ar"
      
    };

    const res = await axios.post(gry_server, u);

    

    


    
    const message = res.data.question;

    return black.reply({ body: message + " 🦄" }, (error, info) => {
      if (!error) {
        global.client.Reply.push({
          name: cmdN,
          author: event.senderID,
          messageID: info.messageID
        });
      }
    });
  },

  onReply: async function ({ api, event, Reply, black }) {
    const { author, messageID } = Reply;
    if (event.senderID != author) return api.sendMessage('مش لك', event.threadID, event.messageID);
    let gry_server = "https://akinator-5c1baee38e17.herokuapp.com/game";
    let answer;

    switch (event.body) {
      case "نعم":
        answer = "0";
        break;
      case "لا":
        answer = "1";
        break;
      case "لا اعلم" :
        answer = "2";
        break;
      case "من الممكن":
        answer = "3";
        break;
        case "الضاهر لا":
        answer = "4";
        break;
        case "رجوع":
          gry_server = gry_server.replace("/game","/back");
          break;
      default:
        return api.sendMessage("الرجاء الرد ب\n\nنعم | لا | لا اعلم | من الممكن | الضاهر لا\n\nرجوع : رجوع خطوة وراء", event.threadID, event.messageID);
    }
    let u = {
      user_id: event.senderID,
      answer: answer, 
      region: "ar"
    };
    const res = await axios.post(gry_server, u);

if (res.data.result) {
  const name = res.data.result[0].name;
    const des = res.data.result[0].description;
    const imged = await axios.get(res.data.result[0].absolute_picture_path, {responseType: "stream"});
 return api.sendMessage({

    body: `اسم الشخصية: ${name}\n\nنبذة عن الشخصية: ${des}`,
    attachment: imged.data
  }, event.threadID, event.messageID)
}
    
    const replyMessage = res.data.question;

    await black.unsend(messageID);

    return black.reply({ body: replyMessage + " 🧜‍♂️"}, (error, info) => {
      if (!error) {
        global.client.Reply.push(info.messageID, {
          name: cmdN,
          author: event.senderID,
          messageID: info.messageID
        });
      }
    });
  },
};
