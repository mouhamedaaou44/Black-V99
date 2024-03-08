const axios = Import("axios");
const Nyk = async ({api, event, black, args}) =>
{
  if(!args.join(" ")) return black.reply("اكتب البين لاولد البطاقات");
  if(isNaN(args.join(" "))) return black.reply("ايه ذا يا ولد البين يكون على شكل ارقام مش لي انت كاتبه دلوقتي");
const res = await axios.get(`https://vihangayt.me/tools/bingen?query=${args.join(" ")}`);
const data = res.data.data

let cards = "تم توليد الفيزات بنجاح ✅:";
for (let card of data)
{
cards += "\n\n" + `${card.CVV}|${card.ExpirationDate} 
|${card.CardNumber}`
}

black.reply(cards)
}
const Black = {
  name: "فيزا",
  Auth: 0,
  Class: "أدوات",
  KJ: ["visa", "namsogen"],
  Info: "يولد لك فيزات",
  Owner: "Gry KJ",
  How: "الامر بعده البين",
  Hide: false,
  Time: 4
}
module.exports = {
  config: Black, 
  onType: Nyk
}
