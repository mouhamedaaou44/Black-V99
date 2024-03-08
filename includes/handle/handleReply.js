module.exports = function ({ api, models, Users, Threads, Currencies, globalData, usersData, threadsData ,black }) {
    return function ({ event }) {
        if (!event.messageReply) return;
        const { Reply, commands } = global.client
        const { messageID, threadID, messageReply } = event;
        if (Reply.length !== 0) {
            const indexOfHandle = Reply.findIndex(e => e.messageID == messageReply.messageID);
            if (indexOfHandle < 0) return;
            const indexOfMessage = Reply[indexOfHandle];
            const handleNeedExec = commands.get(indexOfMessage.name);
            if (!handleNeedExec) return api.sendMessage(global.getText('handleReply', 'missingValue'), threadID, messageID);
            try {
                var getText2;
                if (handleNeedExec.langs && typeof handleNeedExec.langs == 'object') 
                	getText2 = (...value) => {
                    const reply = handleNeedExec.langs || {};
                    if (!reply.hasOwnProperty(global.config.langs)) 
                    	return api.sendMessage(global.getText('handleCommand', 'notFoundLanguage', handleNeedExec.config.name), threadID, messengeID);
                    var lang = handleNeedExec.langs[global.config.langs][value[0]] || '';
                    for (var i = value.length; i > -0x4 * 0x4db + 0x6d * 0x55 + -0x597 * 0x3; i--) {
                        const expReg = RegExp('%' + i, 'g');
                        lang = lang.replace(expReg, value[i]);
                    }
                    return lang;
                };
                else getText2 = () => {};
                const Obj = {};
                Obj.api = api
                Obj.event = event 
                Obj.models = models
                Obj.Users = Users
                Obj.Threads = Threads 
                Obj.Currencies = Currencies
                Obj.black = black;
                Obj.usersData = usersData;
                Obj.threadsData = threadsData;
                Obj.globalData = globalData;
                Obj.Reply = indexOfMessage
                Obj.models = models
                Obj.getText = getText2
                handleNeedExec.onReply(Obj);
                return;
            } catch (error) {
                return api.sendMessage(global.getText('handleReply', 'executeError', error), threadID, messageID);
            }
        }
    };
}