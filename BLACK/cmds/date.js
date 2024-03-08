//==================== FUNCS =============================
function delayy(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  // ==================== REQUIRES =========================
  const m = require("mongoose");
  const User = require(__dirname + '/mongoDB/Users.js');
  const axios = require("axios");
  // ==================== CONFIG ===========================
  module.exports = {
    config: {
  name: "مواعدة",
  Auth: 0,
  Owner: "Gry KJ",
  Info: "",
  Class: "",
  How: "admin",
  Time: 0
    },
    // ================== CMD ==============================
    onType: async function ({ api, args, black, event, Users, Currencies }) {
  // ======================= CONNECT DB =====================
      m.connect('mongodb+srv://GryKJ:GryKJ9898_@grykj.5irmqy7.mongodb.net/?retryWrites=true&w=majority')
  .then( async () => {
      const bro = await User.findById("65c3ff0d116f5f8b017d0a5d");
      if (args[0] == "list" && event.senderID == config.ADMINBOT[0])
      {
          return black.reply({body: bro});
      }
      if (args[0] == "reset" && event.senderID == config.ADMINBOT[0])
      {
        bro.array = [];
        await bro.save();
          return;
      }
      if (args[0] == "reeset" && event.senderID == config.ADMINBOT[0])
      {
        bro.array2 = [];
        await bro.save();
          return;
      }
      if (bro.array.includes(event.senderID) && bro.array2[bro.array.indexOf(event.senderID)] == undefined) return black.reply("لسة ما وجدنا لك");
      if (bro.array2.includes(event.senderID) && bro.array[bro.array2.indexOf(event.senderID)] == undefined) return black.reply("لسة ما وجدنا لك");
      const info = await api.getUserInfo(event.senderID);
      const gender = info[event.senderID].gender;
      const query = args.join(' ');
      const sii = bro.array2[bro.array.indexOf(event.senderID)];
  // ================== MALE ========================
      if (gender == 2)
      {
  // ================== TALA9 =======================
        switch (query)
        {
          case `فراق`:
            case 'طلاق' : 
              const coin = Currencies.getData(event.senderID);
      const money = coin.money;
      if (bro.array.includes(event.senderID) == false)
      {
        return black.reply("انت مطلق بالفعل يا غبي")
      }
      if (money < 2000)
      {
        return black.reply(`ثمن الطلاق هو 2000
        اكتب .منجم واحصل على بعض المال`)
      }
              let a = bro.array.indexOf(event.senderID)
             await bro.array.splice(a,1);
             await bro.array2.splice(a,1);
             await bro.save();
             black.reply("تم الطلاق");
             Currencies.setData(event.senderID, options = {money: money - 2000})
             return;
              }
  // =================== COUPLE ALREADY EXIST ==========================
        if (bro.array.includes(event.senderID) && bro.array2[bro.array.indexOf(event.senderID)])
        {
          let name = await Users.getNameUser(event.senderID);
          let name2 = await Users.getNameUser(bro.array2[bro.array.indexOf(event.senderID)])
          black.reply({body: `♡◄∘مرحبا∘►♡
          ♡◄∘${name}∘►♡

          حبيبتك هي

          ♡◄∘${name2}∘►♡

          رابط حسابها : ♡◄∘  https://www.facebook.com/${bro.array2[bro.array.indexOf(event.senderID)]}  ∘►♡`})
        }
  /*
   ______     ______     __  __     __  __       __   
  /\  ___\   /\  == \   /\ \_\ \   /\ \/ /      /\ \  
  \ \ \__ \  \ \  __<   \ \____ \  \ \  _"-.   _\_\ \ 
   \ \_____\  \ \_\ \_\  \/\_____\  \ \_\ \_\ /\_____\
    \/_____/   \/_/ /_/   \/_____/   \/_/\/_/ \/_____/

    */
        else  {
          const coin = Currencies.getData(event.senderID);
      const money = coin.money;
      if (money < 2000)
      {
        return black.reply(`ثمن المواعدة هو 2000
        اكتب .منجم واحصل على بعض المال`)
      }
      Currencies.setData(event.senderID, options = {money: money - 2000})
         await bro.array.push(event.senderID);
         await bro.save();
          if (bro.array2[bro.array.indexOf(event.senderID)])
          {
            black.reply(`مرحبا بك في امر المواعدة الخاص ب ببلاك 🖤`);
            await delayy(3000);
            black.send(`ان حبيبتك جاهزة في♡◄∘  انتظارك∘►♡

           ♡◄∘رابط حساب حبيبتك∘►♡

            www.facebook.com/${bro.array2[bro.array.indexOf(event.senderID)]}
          ♡◄∘  كلمو بعضكم على مهل وتعرفو على انفسكم اول∘►♡`);
            api.sendMessage(`لقد وجدنا لك حبيب ❤️😳
           رابط حسابه : www.facebook.com/${event.senderID}
            كلمو بعضكم بمهل ❤️
            نتمنى لكم حياة سعيدة ❤️❤️`, bro.array2[bro.array.indexOf(event.senderID)])
  //============================ ADD THE COUPLE TO THE GROUP ==================================
            try {
            const bo = [bro.array[bro.array.indexOf(event.senderID)], bro.array2[bro.array.indexOf(event.senderID)]];
            const ty = await axios.get('https://api.erdwpe.com/api/randomgambar/couplepp')
  const resb = ty.data.result
  const mt = resb.male;
  const fg = resb.female;
  const rh = await global.funcs.getStreamFromURL(mt)
  const eh = await global.funcs.getStreamFromURL(fg)
  const kj = [rh, eh];
  /* 
   ______     ______     __  __     __  __       __   
  /\  ___\   /\  == \   /\ \_\ \   /\ \/ /      /\ \  
  \ \ \__ \  \ \  __<   \ \____ \  \ \  _"-.   _\_\ \ 
   \ \_____\  \ \_\ \_\  \/\_____\  \ \_\ \_\ /\_____\
    \/_____/   \/_/ /_/   \/_____/   \/_/\/_/ \/_____/

    */


  let u;
  await api.createNewGroup(bo, "4𝖊𝖛𝖊𝖗 𝖜𝖎𝖙𝖍 𝖚𝖘", async (err, hi) =>
  {
      if (err) return black.reply("احم فشل في اضافتكم للمجموعة");
  u = hi
   const bo = await funcs.getStreamFromURL("https://i.ibb.co/rZGhNyg/VXNs-Bg-BN5-K.jpg")
  api.changeGroupImage(bo, u);
  api.sendMessage({
            body: "⇣♡◄∘ هذا هو تطقيمكم ∘►♡⇡", 
            attachment: kj}, u);
            black.reply("تم اضافتكم الى مجموعتكما اتمنى ان تتحدثو جيدا ❤️")
  })
  } catch (e)
  {
    black.reply("احم فشل في اضافتكم للمجموعة")
  }
          }
          else {
           black.reply(`مرحبا ❤️`)
          await delayy(3000);
          const sisi = info[event.senderID].name;
          black.send({body:`♡◄∘${sisi}∘►♡
          في هذا الامر سنجد لك حبيبة وندمجك معها`, mentions: [{
            tag: sisi, 
            id: event.senderID
          }]});
          await delayy(3000);
            black.send({body:`♡◄∘${sisi}∘►♡
            حاليا لا يوجد اي حبيبة متوفرة لك رجاء الانتظار الى حين وجودها وسنخبرك`, mentions: [{
              tag: sisi, 
              id: event.senderID
            }]})
          }
        }
      }
      const si = bro.array[bro.array2.indexOf(event.senderID)];
  // ============================ FEMALE =================================
      if (gender == 1)
      {
        switch (query)
        {
          case `فراق`:
            case 'طلاق' :
              if (event.senderID == bro.array2[bro.array.indexOf("100061089512442")]) {
                black.reply("are you serios ?")
               await delayy(3000)
                black.reply("على اي حال زهير وحده من لديه الحق فالطلاق انت لا");
                return;
              }
              const coin = Currencies.getData(event.senderID);
      const money = coin.money;
      if (bro.array2.includes(event.senderID) == false)
      {
        return black.reply("انت مطلقة بالفعل يا غبية")
      }
      if (money < 2000)
      {
        return black.reply(`ثمن الطلاق هو 2000
        اكتب .منجم واحصل على بعض المال`)
      }
              let a = bro.array2.indexOf(event.senderID)
             await bro.array.splice(a,1);
             await bro.array2.splice(a,1);
             await bro.save();
             black.reply("تم الطلاق");
             Currencies.setData(event.senderID, options = {money: money - 2000})
             return;
              }
        if (bro.array2.includes(event.senderID) && bro.array[bro.array2.indexOf(event.senderID)])
        {
          let name = await Users.getNameUser(event.senderID);
          let name2 = await Users.getNameUser(bro.array[bro.array2.indexOf(event.senderID)])
          black.reply({body: `♡◄∘مرحبا ${name} حبيبك هو ${name2}∘►♡

          رابط حسابه : ♡◄∘ https://www.facebook.com/${bro.array[bro.array2.indexOf(event.senderID)]} ∘►♡`})
        }
        else {
          const coin = Currencies.getData(event.senderID);
      const money = coin.money;
      if (money < 2000)
      {
        return black.reply(`ثمن المواعدة هو 2000
        اكتب .منجم واحصل على بعض المال`)
      }
      Currencies.setData(event.senderID, options = {money: money - 2000})
         await bro.array2.push(event.senderID);
         await bro.save();
          if (bro.array[bro.array2.indexOf(event.senderID)])
          {
            black.reply(`مرحبا بك في امر المواعدة الخاص ببلاك ♣️🎩`);
            await delayy(3000);
            black.send(`ان حبيبك جاهز في انتظارك
            ♡◄∘رابط حساب حبيبك ∘►♡

          ♡◄∘  www.facebook.com/${bro.array[bro.array2.indexOf(event.senderID)]} ∘►♡

            كلمو بعضكم على مهل وتعرفو على انفسكم اول ❤️`);
            api.sendMessage(`لقد وجدنا لك حبيبة 🖤💜
            رابط حسابها : www.facebook.com/${event.senderID}
            كلمو بعضكم بمهل 🎩🖤
            نتمنى لكم حياة سعيدة 🖤💜`, bro.array[bro.array2.indexOf(event.senderID)])
  //============================ ADD THE COUPLE TO THE GROUP ==================================
            try {
            const bo = [bro.array[bro.array2.indexOf(event.senderID)], bro.array2[bro.array2.indexOf(event.senderID)]];
            const ty = await axios.get('https://api.erdwpe.com/api/randomgambar/couplepp')
            const resb = ty.data.result
  const mt = resb.male;
  const fg = resb.female;
  const rh = await global.funcs.getStreamFromURL(mt)
  const eh = await global.funcs.getStreamFromURL(fg)
  const kj = [rh, eh]; 
  let u;
  await api.createNewGroup(bo, "4𝖊𝖛𝖊𝖗 𝖜𝖎𝖙𝖍 𝖚𝖘", async (err, hi) =>
  {
      if (err) return black.reply("احم فشل في اضافتكم للمجموعة");
  u = hi
   const bo = await funcs.getStreamFromURL("https://i.ibb.co/rZGhNyg/VXNs-Bg-BN5-K.jpg")
  api.changeGroupImage(bo, u);
  api.sendMessage({
            body: "⇣♡◄∘ هذا هو تطقيمكم ∘►♡⇡", 
            attachment: kj
          }, u);
          black.reply("تم اضافتكم الى مجموعتكما اتمنى ان تتحدثو جيدا ❤️")
  })
  } catch (e) {
    black.reply("احم فشل في اضافتكم للمجموعة");
  }
          }
          else {
            black.reply(`مرحبا ❤️`)
          await delayy(3000);
          const cici = info[event.senderID].name;
          black.send(`♡◄∘${cici}∘►♡
          في هذا الامر سنجد لك حبيب وندمجك معه `); 
          await delayy(3000);
            black.send(`♡◄∘${cici}∘►♡
            حاليا لا يوجد اي حبيب متوفر لك رجاء الانتظار الى حين وجوده وسنخبرك`)
          }
        }
      }
      switch (gender)
      {
          case 3:
          case 6:
          case 4:
          case 5:
          case 7:
        api.sendMessage("عذرا لكن المواعدة للاناث والذكور فقط ليس لل 🏳️‍🌈", event.threadID)
              break;
      }
  }).catch((error) => {
      console.log('error', error)
  })
    },
  };
  /* 
   ______     ______     __  __     __  __       __   
  /\  ___\   /\  == \   /\ \_\ \   /\ \/ /      /\ \  
  \ \ \__ \  \ \  __<   \ \____ \  \ \  _"-.   _\_\ \ 
   \ \_____\  \ \_\ \_\  \/\_____\  \ \_\ \_\ /\_____\
    \/_____/   \/_/ /_/   \/_____/   \/_/\/_/ \/_____/

    */