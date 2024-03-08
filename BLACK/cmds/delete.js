const Black = {
	name: "حذف",
    Owner: "Gry KJ",
	Time: 3,
	Auth: 0,
	Info: "حذف رسالة للبوت",
	Class: "آدوات",
	How: "رد به على رسالة البوت",
    Hide: false
};


module.exports = {
	config: Black,
	onType: async function ({ black, event }) {
        if (!event.messageReply) return black.reply("رد على رسالة يا سيد");
        if (event.messageReply.senderID != BlackUid) return black.reply("انا مش هكر عشان اقدر احدف رسالة شخص اخر");
        black.unsend(event.messageReply.messageID)
    },
}
