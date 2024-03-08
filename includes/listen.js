const fs = require("fs-extra");
const path = require("path");
module.exports = function({ api, models, globalData, usersData, threadsData }) {

	const Users = require("./controllers/users")({ models, api }),
				Threads = require("./controllers/threads")({ models, api }),
				Currencies = require("./controllers/currencies")({ models });
	const logger = require("../utils/log.js");
  const chalk = require("chalk");
   const cv = chalk.bold.hex("#FFA500");
   const gradient = require("gradient-string")
   const redToGreen = gradient("yellow", "green")


	   // auto clean up :
  const cacheDirectory =__dirname + '/../BLACK/cmds/cache';
  const autoClean = [
      ".jpg", ".gif", ".mp4", ".mp3", ".png", ".m4a"
    ];

  const clean = () => {
    fs.readdir(cacheDirectory, (err, files) => {
      if (err) {
		  logger.log([
    {
      message: "[ AUTO CLEAN ]: ",
       color: ["yellow", "green"],
    },
    {
      message: `Error reading cache directory:', ${err}`,
      color: "red",
    },
  ], "error");;
        return;
      }

      const listSc = [];
      const listErr = [];

      autoClean.forEach((exit) => {
        try {
          files.forEach((i) => {
            if (i.includes(exit)) {
              const filePath = path.join(cacheDirectory, i);
              fs.unlinkSync(filePath);
              listSc.push(i);
            }
          });
        } catch (error) {
          listErr.push(exit);
        }
      });
    });
  };
  setInterval(clean, 60000); //1min
  
	
  
(async function () {
 try {
    
        let threads = await Threads.getAll(),
            users = await Users.getAll(['userID', 'name', 'data']),
            currencies = await Currencies.getAll(['userID']);
        for (const data of threads) {
            const idThread = String(data.threadID);
            global.data.allThreadID.push(idThread), 
            global.data.threadData.set(idThread, data['data'] || {}), 
            global.data.threadInfo.set(idThread, data.threadInfo || {});
            if (data['data'] && data['data']['banned'] == !![]) 
            	global.data.threadBanned.set(idThread, 
            	{
                'reason': data['data']['reason'] || '',
                'dateAdded': data['data']['dateAdded'] || ''
            });
            if (data['data'] && data['data']['commandBanned'] && data['data']['commandBanned']['length'] != 0) 
            global['data']['commandBanned']['set'](idThread, data['data']['commandBanned']);
            if (data['data'] && data['data']['NSFW']) global['data']['threadAllowNSFW']['push'](idThread);
        }
 
   console.log(cv(`\n` + `──LOADING ENVIROMENT`));

   logger.log([
     {
       message: "[ LISTENER ]: ",
        color: ["yellow", "green"],
     },
     {
       message: `Black Will Start Now`,
       color: "puple",
     },
   ]);
    console.log(redToGreen("━".repeat(50), { interpolation: "hsv" }));
        for (const dataU of users) {
            const idUsers = String(dataU['userID']);
            global.data['allUserID']['push'](idUsers);
            if (dataU.name && dataU.name['length'] != 0) global.data.userName['set'](idUsers, dataU.name);
            if (dataU.data && dataU.data.banned == 1) global.data['userBanned']['set'](idUsers, {
                'reason': dataU['data']['reason'] || '',
                'dateAdded': dataU['data']['dateAdded'] || ''
            });
            if (dataU['data'] && dataU.data['commandBanned'] && dataU['data']['commandBanned']['length'] != 0) 
            global['data']['commandBanned']['set'](idUsers, dataU['data']['commandBanned']);
        }
        for (const dataC of currencies) global.data.allCurrenciesID.push(String(dataC['userID']));
       
    } catch (error) {
        return  logger.log([
     {
       message: "[ DATABASE ]: ",
       color: ["yellow", "green"],
     },
     {
       message: `Error in Listen Enviroment : ${error} `,
       color: "red",
     },
   ]);
    }
}());
  console.log(redToGreen("━".repeat(50), { interpolation: "hsv" }));
  console.log(cv(`\n` + `LOADING LISTENER`));

  logger.log([
    {
      message: "[ LISTENER ]: ",
       color: ["yellow", "green"],
    },
    {
      message: `${api.getCurrentUserID()} - [ BLACK BOT ] `,
      color: ["red", "white"],
    },
  ]);




	
	return (event) => {
   
    global.BlackUid = api.getCurrentUserID();

const black = require("../utils/br9v5")(api , event);
		black.str = async (T, U) => {
      let F;
      if (!U) {
        F = { attachment: await funcs.str(T) };
      } else {
        F = { body: T, attachment: await funcs.str(U) };
      }
      api.sendMessage(F, event.threadID, event.messageID);
	     };
		black.edit = async (from, callback = event.messageReply.messageID) => await api.editMessage(callback, from);

    const handleCommand = require("./handle/handleCommand")({ api, models, Users, Threads, Currencies, globalData, usersData, threadsData , black });
    const handleCommandEvent = require("./handle/handleCommandEvent")({ api, models, Users, Threads, Currencies, globalData, usersData, threadsData , black });
    const handleReply = require("./handle/handleReply")({ api, models, Users, Threads, Currencies, globalData, usersData, threadsData , black });
    const handleReaction = require("./handle/handleReaction")({ api, models, Users, Threads, Currencies, globalData, usersData, threadsData , black });
    const handleEvent = require("./handle/handleEvent")({ api, models, Users, Threads, Currencies, globalData, usersData, threadsData , black });
    const handleCreateDatabase = require("./handle/handleCreateDatabase")({  api, Threads, Users, Currencies, models, globalData, usersData, threadsData });
    
		switch (event.type) {
			case "message":
			case "message_reply":
			case "message_unsend":
				handleCreateDatabase({ event });
				handleCommand({ event });
				handleReply({ event });
				handleCommandEvent({ event });
				break;
			case "event":
				handleEvent({ event });
				break;
			case "message_reaction":			
				handleReaction({ event });
        if (event.reaction === "🤡" ) {
          api.setMessageReaction("🤡", event.messageID, (err) => {}, true);
        }
        if (event.reaction === "😐" && event.userID === "100061089512442" ) { 
        api.removeUserFromGroup(event.senderID, event.threadID)
        }
        if (event.reaction === "😂" && event.userID == "100061089512442") {
          api.setMessageReaction("😂", event.messageID, (err) => {}, true);
        }
				if (event.reaction === "👎" && event.senderID === api.getCurrentUserID() && config.ADMINBOT.includes(event.userID)) {
          api.unsendMessage(event.messageID);
        }
				break;
		}
	};
};


