const config = {
	name: "يومية",
    Owner: "Gry KJ",
	Time: 3,
	Auth: 0,
	Info: "هدية يومية",
	Class: "الفلوس",
	How: "فقط اكتب الأمر",
    Hide: false
};


module.exports = {
	config: config,
	onType: async function ({ usersData, black, event }) {
		const moment = require("moment-timezone");
		const dateTime = moment.tz("Africa/Casablanca").format("DD/MM/YYYY");
		const { senderID } = event;
		const userData = await usersData.get(senderID);
		if (userData.settings.daily === dateTime) return black.reply("انتظر للغد لتحصل على مكافئة جديدة");

		const getCoin = Math.floor(Math.random() * 100);
		const getExp = Math.floor(Math.random() * 500);

		await usersData.set(senderID, {
			money: userData.money + getCoin,
			exp: userData.exp + getExp
		})
		await usersData.set(senderID, dateTime, "settings.daily")
			black.reply(`لقد تم منحك  ${getCoin} جوهرة و ${getExp} عملة`);

	}
};
