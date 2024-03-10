module.exports = {
    config: {
        name: "اكس_او",
        aliases: ["xo", "ttt"],
        hide: false,
        time: 5,
        auth: 0,
        class: "العاب",
        info: "العب اكس او مع صديقك الحلو"
    },
    onType: async function ({ event, black: message, usersData, args }) {
        const mention = Object.keys(event.mentions);

        if (args[0] === "انهاء") {
            if (!global.game.hasOwnProperty(event.threadID) || !global.game[event.threadID].on) {
                message.reply("لا توجد أي لعبة بادئة في هذا القروب 🔖");
            } else {
                if (event.senderID === global.game[event.threadID].player1.id || event.senderID === global.game[event.threadID].player2.id) {
                    const winner = event.senderID === global.game[event.threadID].player1.id ? global.game[event.threadID].player2 : global.game[event.threadID].player1;
                    message.reply(`الفائز هو ${winner.name}.`);
                    global.game[event.threadID].on = false;
                } else {
                    message.reply("ليس لديك أي لعبة بالمجموعة هذه.");
                }
            }
        } else {
            if (mention.length === 0) {
                message.reply("من فضلك منشن شخصاً ما 🔖");
            } else if (!global.game.hasOwnProperty(event.threadID) || !global.game[event.threadID].on) {
                global.game[event.threadID] = {
                    on: true,
                    board: "🔲🔲🔲\n🔲🔲🔲\n🔲🔲🔲",
                    bid: "",
                    board2: "123456789",
                    avcell: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
                    turn: mention[0],
                    player1: { id: mention[0], name: await usersData.getName(mention[0]) },
                    player2: { id: event.senderID, name: await usersData.getName(event.senderID) },
                    bidd: "❌",
                    ttrns: [],
                    counting: 0
                };
                message.send(global.game[event.threadID].board, (err, info) => {
                    global.game[event.threadID].bid = info.messageID;
                    global.fff.push(info.messageID);
                });
            } else {
                message.reply("اللعبة بادئة بالفعل في هذا القروب.");
            }
        }
    },
    xPrefix: async function ({ event, black: message }) {
        if (event.type === "message_reply" && global.game[event.threadID] && global.game[event.threadID].on) {
            if (event.messageReply.messageID === global.game[event.threadID].bid) {
                if (global.game[event.threadID].turn === event.senderID) {
                    if (["1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(event.body)) {
                        if (global.game[event.threadID].avcell.includes(event.body)) {
                            global.game[event.threadID].avcell.splice(global.game[event.threadID].avcell.indexOf(event.body), 1);
                            let input2 = event.body * 2;
                            global.game[event.threadID].ttrns.forEach(e => {
                                if (e < event.body) {
                                    input2--;
                                }
                            });
                            if (["4", "5", "6"].includes(event.body)) {
                                input2++;
                            } else if (["7", "8", "9"].includes(event.body)) {
                                input2 += 2;
                            }
                            global.game[event.threadID].board = global.game[event.threadID].board.replaceAt("🔲", global.game[event.threadID].bidd, input2 - 2);
                            global.game[event.threadID].board2 = global.game[event.threadID].board2.replace(event.body, global.game[event.threadID].bidd);
                            message.send(global.game[event.threadID].board, (err, infos) => {
                                global.game[event.threadID].bid = infos.messageID;
                                global.fff.push(infos.messageID);
                            });
                            let winncomb = [
                                [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
                            ];
                            for (let i = 0; i < winncomb.length; i++) {
                                const [a, b, c] = winncomb[i];
                                if (global.game[event.threadID].board2[a] === global.game[event.threadID].bidd &&
                                    global.game[event.threadID].board2[b] === global.game[event.threadID].bidd &&
                                    global.game[event.threadID].board2[c] === global.game[event.threadID].bidd) {
                                    const winnerName = global.game[event.threadID].bidd === "❌" ? global.game[event.threadID].player1.name : global.game[event.threadID].player2.name;
                                    message.send(`${winnerName} فاز باللعبة!`);
                                    global.game[event.threadID].on = false;
                                    return;
                                }
                            }
                            if (global.game[event.threadID].counting === 8) {
                                message.send("تعادل!");
                                global.game[event.threadID].on = false;
                            } else {
                                global.game[event.threadID].counting++;
                                message.unsend(event.messageReply.messageID);
                                global.game[event.threadID].ttrns.push(event.body);
                                global.game[event.threadID].turn = global.game[event.threadID].turn === global.game[event.threadID].player1.id ? global.game[event.threadID].player2.id : global.game[event.threadID].player1.id;
                                global.game[event.threadID].bidd = global.game[event.threadID].bidd === "❌" ? "⭕" : "❌";
                            }
                        } else {
                            message.reply("هذا المربع مأخوذ بالفعل!");
                        }
                    } else {
                        message.reply("يرجى الرد برقم من 1 إلى 9 فقط.");
                    }
                } else {
                    message.reply("ليس دورك في اللعبة الآن.");
                }
            } else {
                message.reply("يرجى الرد على الرسالة الأصلية للعب.");
            }
        }
    }
};

String.prototype.replaceAt = function (search,
