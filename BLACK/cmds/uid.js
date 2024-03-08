const { findUid } = global.funcs;
const regExCheckURL = /^(http|https):\/\/[^ "]+$/;
module.exports = {
    config: {
        name:"ايدي",
        Auth: 0,
        Owner: "Gry KJ",
        Info: "يجيب لك ايدي لشخص معين وليس مربع",
        Hide: false,
        Class: "",
        How: "رد على شخص او رابط حساب او منشن",
        Time: 0
    },
    onType: async ({args, event, black}) => {
        if (event.messageReply)
			return black.reply(event.messageReply.senderID);
		if (!args[0])
			return black.reply(event.senderID);
		if (args[0].match(regExCheckURL)) {
			let msg = '';
			for (const link of args) {
				try {
					const uid = await findUid(link);
					msg += `${link} => ${uid}\n`;
				}
				catch (e) {
					msg += `${link} (ERROR) => ${e.message}\n`;
				}
			}
			black.reply(msg);
			return;
		}

		let msg = "";
		const { mentions } = event;
		for (const id in mentions)
			msg += `${mentions[id].replace("@", "")}: ${id}\n`;
		black.reply(msg || "error");
}
}