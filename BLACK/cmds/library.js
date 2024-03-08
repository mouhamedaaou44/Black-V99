const axios = require("axios");

module.exports = {
    config: {
        name: "المكتبة",
        KJ: ["library", "مكتبه"],
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
                    `https://autodefensakravmaga.online/anime/search?input=${encodeURIComponent(
                        keywords
                    )}`
                );
                const animeData = response.data.result;
                const NumberOfSearch = animeData.length;

                if (NumberOfSearch === 0) {
                    message.react("❌");
                    return message.reply(`❌︙لم يتم العثور على "${keywords}"🧞‍♂`);
                }

                let formattedMessage = `〄 تم العثور على ${NumberOfSearch} انمي 🔎⤷\n\n`;

                animeData.forEach((anime, index) => {
                    formattedMessage += `${index + 1}- الاسم ←› ${anime.name}🤍\n`;
                    formattedMessage += `←› النوع: ${anime.type}🗝\n`;
                    formattedMessage += `←› التقييم: ${anime.rate}✨\n\n`;
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
                            name: "المكتبة",
                            messageID: info.messageID,
                            resultMessageID: info.messageID,
                            type: "animeResults",
                            result: animeData,
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
                const playUrl = result[index].play;

                const response = await axios.get(
                    `https://autodefensakravmaga.online/anime/get?url=${encodeURIComponent(
                        playUrl
                    )}`
                );
                const animeData = response.data.result;
                let rating = "لا يوجد";
                if (animeData.score) {
                    rating = animeData.score;
                }
                if (animeData.rating) {
                    rating = animeData.rating;
                }
                let season = "لا يوجد";
                if (animeData.seasons) {
                    season = animeData.seasons;
                }
                let categories = "لا يوجد";
                if (animeData.category && Array.isArray(animeData.category)) {
                    categories = animeData.category.join("، ");
                }
                const downloadLinks = animeData.download;
                let downloadMessage = "";
                if (downloadLinks.length > 0) {
                    downloadMessage = '⌯︙قم بالرد ب"روابط" للحصول على روابط مباشرة لتحميل الفلم 🔗';
                }
                const msg = `
• ┉ • ┉ • ┉ • ┉ • ┉ •
←› العنوان : ${animeData.firstTitle}☸
←› الاسم : ${animeData.secondTitle}🧞‍♂
←› عدد الحلقات : ${animeData.eps}🗝
←› الموسم : ${season}🔱
←› التقييم : ${rating}✨
←› الفئات : ${categories}🔖

←› القصة : ${animeData.story}📖
• ┉ • ┉ • ┉ • ┉ • ┉ •
${animeData.info}
• ┉ • ┉ • ┉ • ┉ • ┉ •
${downloadMessage}

                `;
                const stream = await global.funcs.str(animeData.posterUrl);
                message.reply(
                    {
                        body: msg,
                        attachment: stream,
                    },
                    (err, info) => {
                        const downloadLinks = animeData.download;
                        let downloadMsg = "";
                        if (downloadLinks.length > 0) {
                            downloadMsg = '⌯︙قم بالرد ب"روابط" للحصول على روابط مباشرة لتحميل الفلم 🔗';
                        }
                        global.client.Reply.push(info.messageID, {
                            name: "المكتبة",
                            messageID: info.messageID,
                            resultMessageID: info.messageID,
                            type: "animeDetails",
                            result: animeData,
                        });
                    }
                );
            } catch (error) {
                console.error("Error occurred while fetching anime details:", error);
                return message.reply("❌︙حدث خطأ أثناء جلب تفاصيل الأنمي. الرجاء المحاولة مرة أخرى في وقت لاحق.");
            }
        }
        if (type === "animeDetails" && messageBody === "روابط") {
    try {
        const downloadLinks = result.download;
let downloadMsg = "⌯︙روابط التحميل 📥⤷\n\n";
downloadLinks.forEach((anime, index) => {
    downloadMsg += `• النوع: ${anime.mediaType}\n الجودة: 𓆩 ${anime.quality} 𓆪\n الترجمة: ✄ ${anime.lang} ✄\n الرابط: ⋆˚ ${anime.url} ⋆˚\n- - - - - - - - - - - - -\n`;
});
message.reply(downloadMsg);

    } catch (error) {
         return message.react("❌");
    }
}

    },
}; 
