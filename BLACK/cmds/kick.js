module.exports = {
	config: {
		name: "طرد",
		Owner: "Gry KJ",
		Time: 3,
		Auth: 1,
		Info: "طرد شخص من مجموعة",
		Class: "المجموعة",
		How: "رد على شخص او منشن",
        Hide: false
	},

	onType: async function ({ black, event, args, threadsData, api }) {
		const { adminIDs } = await threadsData.get(event.threadID);
		if (!adminIDs.includes(api.getCurrentUserID()))
			return black.reply("⚝ يجب على البوت ان يكون ادمن اولا ⚝");
		async function kickAndCheckError(uid) {
			try {
				await api.removeUserFromGroup(uid, event.threadID);
			}
			catch (e) {
				black.reply("حدث خطأ");
				return "ERROR";
			}
		}
		if (!args[0]) {
			if (!event.messageReply)
				return black.reply('تاكد انك راد على شخص او ممنشه');
			await kickAndCheckError(event.messageReply.senderID);
		}
		else {
			const uids = Object.keys(event.mentions);
			if (uids.length === 0)
                 return black.reply('تاكد انك راد على شخص او ممنشه');
			if (await kickAndCheckError(uids.shift()) === "ERROR")
				return;
			for (const uid of uids)
				api.removeUserFromGroup(uid, event.threadID);
		}
	}
};
