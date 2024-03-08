const fs = require("fs");


const axios = require("axios");

module.exports = {
  config: {
    name: "تخيل",
    Owner: "عبدالرحمن",
    Auth: 0,
    Hide: false,
    Time: 5,
    Info: "رسم من نص",
    Class: "ثريدز"
  },

  onType: async function ({ api, args, black, event }) {
   
    
    
      
let argString = args.join(" ");
      if (!argString) return black.reply({ body: "انا اتخيل مكانك ؟" }, (error, info) => {
      global.client.Reply.push(info.messageID, {
        name: this.config.name,
        author: event.senderID,
        messageID: info.messageID
        
      });
    }); 

      
      black.react("⚙");
const a = await axios.get(`https://app-malak-ef1d38dd497d.herokuapp.com/dal?prompt=${encodeURIComponent(argString)}`)
const gg = a.data.ker
const res = await axios.get(gg, {responseType:"stream"});

const path =__dirname + "/cache/cc.png";
const writer = fs.createWriteStream(path);
res.data.pipe(writer);
writer.on("finish", () => {
black.reply({
 body: "‏‏𓆪 تفضل عزيزي 𓆩",
 attachment : fs.createReadStream(path)
              })})
await black.react("✅");

   
      

      
    
  },
onReply: async function ({ api, event, Reply, black, usersData, threadsData }) {
    const { author, messageID } = Reply;
    if (event.senderID != author) return;

if( event.body === "نعم" ) {

 const ag = await axios.get("https://app-mlak-ac944ee5b007.herokuapp.com/pp")
let ggh = ag.data.pp
 black.reply("جاري رسم شيئ عشوائي")
black.unsend(messageID)
black.react("⚙");
const a = await axios.get(`https://app-malak-ef1d38dd497d.herokuapp.com/dal?prompt=${encodeURIComponent(ggh)}`)
const gg = a.data.ker
const res = await axios.get(gg, {responseType:"stream"});

const path =__dirname + "/cache/cc.png";
const writer = fs.createWriteStream(path);
res.data.pipe(writer);
writer.on("finish", () => {
black.reply({
 body: "𓆩⚝𓆪تفضل𓆩⚝𓆪",
 attachment : fs.createReadStream(path)
              })})
await black.react("✅");

}

},

 
};
