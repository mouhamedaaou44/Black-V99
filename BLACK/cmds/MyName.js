const Black = { name: "اسمي", Auth: 0, Hide: false, KJ: ["name"], Class: "البوت", Info: "عرفني على اسمك حب", Time: 5 };
const URI = "mongodb+srv://GryKJ:GryKJ9898_@grykj.5irmqy7.mongodb.net/?retryWrites=true&w=majority";
module.exports.config = Black;
const Name = require(__dirname + '/mongoDB/Names.js');
const m = require("mongoose");
module.exports.onType = async function({args, black, event }) {
  m.connect(URI)
  .then( async () => {
    let bro = await Name.findById("65df0a095506249b4abb3f5b");
    if(args.join(" ") == "list" && event.senderID == config.OWNERID) return black.reply({body: bro});
    if(args[0] == "reset" && event.senderID == config.OWNERID) 
    {
      let index = bro.array.indexOf(args[1]);
      if (index > 0) return black.reply("had luser makinch asidi");
      bro.array.splice(index, 1);
      bro.array2.splice(index, 1);
      await bro.save();
      return;
    }
  if(bro.array.includes(event.senderID)) return black.reply("انا اعرف اسمك بالفعل يا " + bro.array2[bro.array.indexOf(event.senderID)]);
  black.reply("رد على الرسالة هذه ب اسمك عشان اتذكره", (error, info) => {
      global.client.Reply.push(info.messageID, {
        name: this.config.name,
        author: event.senderID,
        messageID: info.messageID
      });
    });
  }).catch((error) => black.reply(error))
}
module.exports.onReply = async ({Reply, black, event, api}) =>
{
  if (Reply.author != event.senderID) return;
   m.connect(URI)
  .then( async () => {
     let bro = await Name.findById("65df0a095506249b4abb3f5b");
  if (event.body)
  {
    black.reply("حسنا شكرا يا " + event.body + " اعدك اني سأتذكر اسمك طول حياتي ")
    black.unsend(Reply.messageID);
    bro.array.push(event.senderID);
    bro.array2.push(event.body);
    await bro.save()
  };
  }).catch((error) => black.reply(error))
};
module.exports.xPrefix = async ({event, black, api}) => {
  let ts = ["مرحبا كيف يمكنني مساعدتك اليوم؟", "تحتاج مساعدة ف شيء ما؟ ", "تعبتني وانت تنادي علي", "هل هناك ما يحتاج توضيح سيد؟", "ااااه يلا الازعاااج ماذا تريد؟", "هل انت غبي تناديني بس بلاك هكذا الا تعرف من انا؟ ", "مرحبا يا عمري كيف اقدر اساعدك اليوم", "انا القوة انا القوي انا العظيم انا الشجاع انا الملك انا الظلام. نعم، انا بلاك"];
  let Rts = ts[Math.floor(Math.random() * ts.length)]
  m.connect(URI)
    .then(async () => {
      let bro = await Name.findById("65df0a095506249b4abb3f5b");
      if (event.body == "بلاك"  && event.senderID != config.OWNERID)
      {
      if (bro.array.includes(event.senderID)) { 
         let name = bro.array2[bro.array.indexOf(event.senderID)];
        let rodod = [`مرحبا بك ${name}`, `${name}, كيف حالك اليوم`, `احم ياله من اسم جميل ${name}`, `يبدو اني اشتقت لك يا ${name} `, `الخمر يسكر من يعاقر كأسهُ .. و عيناكِ خمرٌ بلا كؤوس تسكرُ  يا ${name},
عيناك سحر مترفُ كاد يهلكني `, `سيد/تي ${name} كيف حالك اليوم`];
let rand = rodod[Math.floor(Math.random() * rodod.length)];
        return black.reply(rand)}
        else return black.reply(Rts);
      }
    }).catch((error) => black.reply(error))
  }
