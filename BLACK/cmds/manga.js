const axios = require("axios");
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
};

module.exports = {
    config: {
        name: "مانجا",
        KJ: ["نوو", "ليب"],
        Owner: "1.0.0",
        Auth: 0,
        Owner: "عمار الكافي",
        Class: "ثريدز",
        Time: 5,
        Hide: false,
    },
    onType: async ({ black: message }) => {
        const msg = `🔥 |  مكتــبة الانمي 🏫📚

 ←› يرجى الرد على هذه الرسالة بكلمات البحث لاسم الانمي المراد البحث عنه . 

⌯︙يفضل استخدام الحروف الانجليزية .
⌯︙يمكنك البحث عن انمي مسلسل/فلم .`;

        message.reply(msg, (err, info) => {
            global.client.Reply.push(info.messageID, {
                name: "المكتبة",
                messageID: info.messageID,
                type: "letsSearch",
            });
        });
    },
    onReply: async ({ Reply, black: message, event }) => {
        const { type, result } = Reply;
        const messageBody = event.body.trim().toLowerCase();
        const body = parseInt(messageBody);
        if (type === "letsSearch") {
            const keywords = messageBody;
            message.react("🔎");
            try {
                const response = await axios.get(
                    `https://mslayed.onrender.com/search/${encodeURIComponent(
                        keywords
                    )}`
                );
                const mangaData = response.data.data;
                const NumberOfSearch = mangaData.length;

                if (NumberOfSearch === 0) {
                    message.react("❌");
                    return message.reply(`❌︙لم يتم العثور على "${keywords}"🫠`);
                }

                let formattedMessage = `〄 تم العثور على ${NumberOfSearch} مانجا 🔎⤷\n\n`;

                mangaData.forEach((anime, index) => {
                    formattedMessage += `${index + 1}- الاسم ←› ${anime.manga_name}🤍\n`;
                    formattedMessage += `←› التصانيف: ${anime.manga_genres}🗝\n`;
                    formattedMessage += `←› التقييم: ${anime.manga_rating}✨\n\n`;
                });

                let please = `⌯︙قم بالرد برقم بين 1 و ${NumberOfSearch} 🧞‍♂`;
                if (NumberOfSearch === 1) {
                    please = "⌯︙ قم بالرد برقم واحد 1 .";
                }

                message.reply(
                    `
${formattedMessage}
${please}
`,
                    (err, info) => {
                        global.client.Reply.push(info.messageID, {
                            name: "مانجا",
                            messageID: info.messageID,
                            resultMessageID: info.messageID,
                          author: event.senderID,
                            type: "animeResults",
                            result: mangaData,
                        });
                    }
                );
            } catch (error) {
                console.error("Error occurred while fetching anime data:", error);
                return message.reply(`❌︙لم يتم العثور على "${keywords}"🧞‍♂`);
            }
        }

        if (type === "animeResults") {
            try {
                if (isNaN(body) || body < 1 || body > result.length) {
                    return message.reply(`⌯︙قم بالرد برقم بين 1 و ${result.length} 🧞‍♂`);
                }
                const index = body - 1;
                const playUrl = result[index].manga_id;

                const response = await axios.get(
                    `https://mslayed.onrender.com/details/${encodeURIComponent(
                        playUrl
                    )}`
                );
                const mangaData = response.data;
                let rating = "لا يوجد";
                if (mangaData.manga_rating) {
                    rating = mangaData.manga_rating;
                }
                let season = "لا يوجد";
                if (mangaData.manga_status) {
                    season = mangaData.manga_status;
                }
                let categories = "لا يوجد";
                if (mangaData.manga_genres) {
                    categories = mangaData.manga_genres
                }
                const downloadLinks = "";
                let downloadMessage = "";
               
                const msg = `
• ┉ • ┉ • ┉ • ┉ • ┉ •
←› الاسم : ${mangaData.manga_name} ☸
←› التاريخ : ${mangaData.manga_release_date} ✴
←› الشخصية الرئيسية : ${mangaData.manga_theater} 🗝
←› النوع : ${season} 🔱
←› الفئات : ${categories} 🔖
←› التقييم : ${rating} ✳

• ┉ • ┉ • ┉ • ┉ • ┉ •
←› القصة : ${mangaData.manga_description} 📖
• ┉ • ┉ • ┉ • ┉ • ┉ •
←› لقرائة المانجا : الرجاء الرد على الرساله بكلمة "قراءة"
                `;
                const stream = await global.Mods.imgd(mangaData.manga_cover_image_url);
                message.reply(
                    {
                        body: msg,
                        attachment: stream,
                    },
                    (err, info) => {
                        const downloadLinks = "";
                        let downloadMsg = "";
                        
                        global.client.Reply.push(info.messageID, {
                            name: "مانجا",
                            messageID: info.messageID,
                            resultMessageID: info.messageID,
                            author: event.senderID,
                            type: "mangaChapte",
                            result: mangaData
                        });
                    }
                );
            } catch (error) {
                console.error("Error occurred while fetching anime details:", error);
                return message.reply("❌︙حدث خطأ أثناء جلب تفاصيل المانجا. الرجاء المحاولة مرة أخرى في وقت لاحق.");
            }
        }

        if (type == "mangaChapte" && messageBody === "قراءة" ) {
            var res = await axios.get(`https://mslayed.onrender.com/manga/${result.manga_id}`);
            const resData = res.data.data[0];
            let msg = `⋆˚ ⬷ تحتوي هذه المانغا/مانهوا على ${resData.chapter_number} رد برقم الفصل لبدك تقرأه ⋆˚ ⬷`;
            message.reply(msg, (err, info) => {
                global.client.Reply.push(info.messageID, {
                    name: "مانجا",
                    messageID: info.messageID,
                    resultMessageID: info.messageID,
                    author: event.senderID,
                    type: "ReadChapt",
                    result: result,
                });
            });
        }


if (type == "ReadChapt") {
    if (isNaN(messageBody)) return message.reply("رد برقم يااا");
    let num = messageBody;
    var res = await axios.get(`https://mslayed.onrender.com/manga/${result.manga_id}`);
    let data = res.data.data;
    let chapter = data.find(obj => obj.chapter_number == num);
    var res = await axios.get(`https://mslayed.onrender.com/chapter/${chapter.chapter_id}`);
    let rr = res.data.data;
    let arr = []
    for (let i = 1; i < rr.length; ++i) {
        arr.push(await global.Mods.imgd(rr[i].page_image_url))
    }
    let index = 0;

    for (let i = 1; i < rr.length; ++i) {
        let imagesToSend = arr.slice(index, index + 9);
        message.send({
            body: `⋆˚ ┊ تفضل ┊ ⋆˚ ⁭`,
            attachment: imagesToSend
        });
        index += 9;
        await delay(4000);
        
        if (index >= arr.length) break;
    }
}

        
    },
};