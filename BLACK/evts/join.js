const moment = require("moment-timezone");

module.exports = {
	config: {
		name: "welcome",
		Type: ["log:subscribe"],
		Owner: "GryKJ"
	},
	onType: async ({ black, event, api }) => {
		const hours = moment.tz("Africa/Casablanca").format("HH:mm:ss");
		const { threadID } = event;
		const { PREFIX, BOTNAME } = global.config;
		const dataAddedParticipants = event.logMessageData.addedParticipants;
		if (dataAddedParticipants.some(item => item.userFbId == global.BlackUid)) {
			if (BOTNAME) api.changeNickname(BOTNAME, threadID, global.BlackUid);
      api.sendMessage(`⚝ ${threadID} ⚝  ⨕ ⚝ ${hours} ⚝`, config.OWNERID)
			            return black.send(`
⚝ أنا القوة، أنا الأقوى، أنا المعالج، أنا بلاك ⚝
↫ البادئة الخاصة بي هي [ ${PREFIX} ]  ↬
`);
		}
    if (dataAddedParticipants.some(item => item.userFbId == config.OWNERID)) {
     return black.send(`⚝ مرحباً بك يا مولاي ⚝`);
    }
	}
};