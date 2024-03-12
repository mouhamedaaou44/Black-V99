let picQ = [
  { imageUrl: "https://tinyurl.com/27mbal7q", answer: "5" },
  { imageUrl: "https://tinyurl.com/2bjdm6gh", answer: "4" },
  { imageUrl: "https://tinyurl.com/27f4jbvh", answer: "6" },
  { imageUrl: "https://tinyurl.com/28xr46vs", answer: "2" },
  { imageUrl: "https://tinyurl.com/23eeu425", answer: "17" },
  { imageUrl: "https://tinyurl.com/2am9b2yh", answer: "7" },
  { imageUrl: "https://tinyurl.com/24x5kntn", answer: "13" },
  { imageUrl: "https://tinyurl.com/22amy4je", answer: "2" },
 { imageUrl: "https://tinyurl.com/257wfcdk", answer: "3", },
   { imageUrl: "https://tinyurl.com/27udb5kz", answer: "f"},
  { imageUrl: "https://tinyurl.com/23427oww", answer: "8" },
  { imageUrl: "https://tinyurl.com/22v97btf", answer: "3" },
  { imageUrl: "https://tinyurl.com/2dpo5cyo", answer: "2" },
  { imageUrl: "https://tinyurl.com/29n7ndfe", answer: "1" },
  { imageUrl: "https://tinyurl.com/2dm26e2d", answer: "6" },
  { imageUrl: "https://tinyurl.com/27hnc93y", answer: "5" },
  { imageUrl: "https://tinyurl.com/2bvna4k5", answer: "2" },
  { imageUrl: "https://tinyurl.com/26ljqrlg", answer: "8" },
 { imageUrl: "https://tinyurl.com/2ytdbg7r", answer: "27" },
   { imageUrl: "https://tinyurl.com/29ho5usn", answer: "6" },
  ];
  
  let textQ = [
{
    question: "ما هو الشيء الذي يسير ولا يمشي؟",
    options: ["السفينة", "السيارة", "الساعة", "الكتاب"],
    answer: "الساعة"
  },
  {
    question: "ما هو الشيء الذي يُعطى ولا يُأخذ؟",
    options: ["الحل", "القلب", "الوعد", "السر"],
    answer: "السر"
  },
  {
    question: "ما هو الشيء الذي يأتي بالليل ويذهب بالنهار؟",
    options: ["القمر", "الشمس", "النجم", "النوم"],
    answer: "النجم"
  },
  {
    question: "ما هو الشيء الذي يُمسك باليدين ولكن لا يستطيع أن يمسك به؟",
    options: ["الحلم", "البصيرة", "الهواء", "الماء"],
    answer: "الهواء"
  }
];

module.exports = {
  config: {
  name: "سفينة",
  Auth: 0,
  Owner: `القصة من طرف ايوب
  
  برمجة الامر  من طرف زهير`,
  Info: "--",
  Class: "العاب",
  How: "--",
  Time: 5,
},

onType: async function({ api, event, args, Users, black: nino }) {
    const Name = await Users.getNameUser(event.senderID);
    
    const msg = `وجد ${Name} سفينة قرصان مرعبة تطفو في البحر كما لو كانت تنتظر بصبر مستكشفًا شجاعًا لاكتشاف أسرارها المظلمة. تحاول الأمواج العاتية طي النقاب عنها، لكن فضول المستكشف الشجاع يدفع Ã${Name} لاستكشاف هذا العجيب الغامض.
    
    بينما يتسلق ${Name} على طول الحبال ويتجول في أرجاء السفينة، يجد نفسه وحيدًا في داخلها، محاطًا بالهدوء المخيف والظلام الكثيف. يتجول بحذر بين الأروقة المتهالكة والغرف المهجورة، يبحث عن أي مؤشر يمكن أن يوجهه نحو الكنز المفقود.
    
    وفي أحد الزوايا المظلمة، يكتشف ${Name} خريطة ممزقة وملطخة بالصدأ، مكبوتة بين بقايا الأثاث المتهالك. يتأملها بفضول وتحمس، يشعر بالإثارة والتحدي يتزايدان داخله، حيث يعلم أن هذه الخريطة هي مفتاح الوصول إلى الكنز المخفي في أعماق هذه السفينة الملعونة.
    
    هل تريد اللعب؟`
    
    nino.reply(msg, (err, info) => {
      if(!err) 
      {
        global.client.Reply.push(info.messageID, {
        commandName: "سفينة", 
        author: event.senderID,
        mid: info.messageID,
        type: "1M"
       })
      }
    })
  
},
onReply: async function({ api, event, args, black : nino, Reply}) {
  const { author, type } = Reply;
  if(!author) return;
  let RQ1, RQ2, RQ4, RQ5;
  if (type == "1M") 
  {
    switch (event.body) {
      case "نعم":
       nino.reply({body: `اختر بابًا لتبدأ رحلتك في سفينة القراصنة :
1. الباب الأول
2. الباب الثاني
3. الباب الثالث`, attachment: await funcs.str("https://tinyurl.com/2dcwt2tj")}, (err, info) => {
      if(!err) 
      {
        global.client.Reply.push(info.messageID, {
        commandName: "سفينة", 
        author: event.senderID,
        mid: info.messageID,
        type: "2M"
       })
      }
    });
    nino.unsend(mid);
break;
case "لا":
  nino.reply("يا لك من جبان!")
  break;
  default:
  nino.reply("رد بنعم او لا وبس");
    }
  }
  if (type == "2M")
  {
    const Rdoor = Math.floor(Math.random() * 3);
    switch (event.body) {
     case Rdoor :
        RQ1 = textQ[Math.floor(Math.random()* textQ.length)];
       nino.reply(`الباب صحيح : 
       المرحلة التالية هي مرحلة الألغاز ونبدأ باول لغز :
       
            ${RQ1.question}  `, (err, info) => {
      if(!err) 
      {
        global.client.Reply.push(info.messageID, {
        commandName: "سفينة", 
        author: event.senderID,
        mid: info.messageID,
        type: "3M"
       })
      }
    })
    break;
    default:
    nino.reply("الباب الخاطئ لقد خسرت!");
    }
  }
  if (type == "3M") 
  {
    if (event.body)
    {
      for(let ONE of RQ1.options)
      {
        if(event.body == ONE)
        {
          RQ2 = textQ[Math.floor(Math.random()* textQ.length)];
          nino.reply(`جوابك صحيح ✅ 
          اللغز التالي هو :
          
         ${RQ2.question}`)
        }
      }
    }
  }
}
  }
