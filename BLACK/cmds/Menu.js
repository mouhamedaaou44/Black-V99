module.exports = {
  config: {
  name: "اوامر",
    KJ: ["menu","help","cmds","أوامر"],
  Auth: 0,
  Owner: "Gry KJ",
  Info: "قائمة الأوامر",
  Hide: true,
  Class: "أدوات",
  How: "",
  Time: 0
},
onType: async function({args, black, event }) {
  const query = args.join(" ");
  if (query)
  {
    let pics = ["http://tinyurl.com/2ycnad5g",

"http://tinyurl.com/223nzycl",

"http://tinyurl.com/26v67hdx",]
    let rpic = pics[Math.floor(Math.random() * pics.length)];
    if (client.commands.has(query))
    {
      const infos = client.commands.get(query);
      const msg = `
⚝ اسم الأمر ⚝⋆˚ ⬷  ☂︎ ${infos.config. name} ☂︎
⚝ الوصف ⚝ ⋆˚ ⬷ ☂︎ ${infos.config.Info || "مافي وصف"} ☂︎
⚝ صانعه ⚝ ⋆˚ ⬷ ☂︎ ${infos.config.Owner || "Gry KJ"} ☂︎
⚝ تصنيفه  ⚝ ⋆˚ ⬷ ☂︎ ${infos. config.Class || "أدوات"} ☂︎
⚝ كيفية الاستعمال ⚝ ⋆˚ ⬷ ☂︎ ${infos.config.How || "غير متوفر"} ☂︎
      `
      return black.reply({body:msg, attachment: await funcs.str(rpic)})
    }
    else {
      return black.reply("⚝ الأمر الذي تحاول البحث عنه غير موجود ⚝")
    }
  }
  let sym = ['❥',  '☏','☑', '♚', '▲', '♪', 'Ⓐ', '☤', '✘', '☒', '♛', '▼', '♫', '⌘', '♡', 'ღ', 'ツ', '☼', '❅', '✎', '✪', '✯', '☭', '✿', '✄', '∞', '✫', '★'];
function test(so) {
  const Symms = {
    '1': '⓵',
    '2': '⓶',
    '3': '⓷',
    '4': '⓸',
    '5': '⓹',
    '6': '⓺',
    '7': '⓻',
    '8': '⓼',
    '9': '⓽',
    '0': '⓪' 
    };
if (so > 9)
{
const a = so.toString().split("");
  a.reverse();
let h = "";
for (let i = 0 ; i < a.length ; i++)
{
h += `${Symms[a[i]]}`
}
return h;
}
  return Symms[so];
}

 const keys = [...client.commands.keys()]
let d = new String();
let i = 0;
for (let key of keys)
{
i++
let c = client.commands.get(key);
if (c.config.Hide && c.config.Hide == true)
{
i = i-1
}
else
{
let name = c.config.name;
let info = c.config.Info || "ما في وصف";
let k = sym[Math.floor(Math.random() * sym.length)];
d += "\n" + `${test(i)} ⚝ ${name} ⚝ ⋆˚  ⬷ ${k} ${info} ${k}\n - - - - - - - - - - - - - - - - - - - - - - - - - - `;
}
}
let t = `\n\nㅤㅤㅤㅤ${config.BOTNAME}`
let f = `───الہٰاوامر الہٰموجودة فہٰ بٰٰلہٰاكہٰ──\n`
let u = ["http://tinyurl.com/2dhbdh36",

"http://tinyurl.com/2c7fnezn",

"http://tinyurl.com/2bh4wbt8",

"http://tinyurl.com/28afolao",

"http://tinyurl.com/225sqdt9",

"http://tinyurl.com/2y8x75fc",

"http://tinyurl.com/27kuhogu",]

let p = u[Math.floor(Math.random() * u.length)]

black.reply({body:f + d + t, attachment: await funcs.str(p)})
}
};
