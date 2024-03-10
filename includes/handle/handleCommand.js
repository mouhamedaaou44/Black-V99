module.exports = function ({ api, models, Users, Threads, Currencies, globalData, usersData, threadsData ,black }) {
  const stringSimilarity = require("string-similarity"),
    escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
    logger = require("../../utils/log.js");
  const moment = require("moment-timezone");

  return async function ({ event }) {
    const dateNow = Date.now();
    const time = moment.tz("Asia/Manila").format("HH:MM:ss DD/MM/YYYY");
    const { allowInbox, PREFIX, ADMINBOT, DeveloperMode, adminOnly } =
      global.config;

    const { userBanned, threadBanned, threadInfo, threadData, commandBanned } =
      global.data;
    const { commands, Time } = global.client;
    var { body, senderID, threadID, messageID } = event;

    var senderID = String(senderID),
      threadID = String(threadID);
    const threadSetting = threadData.get(threadID) || {};
    const prefixRegex = new RegExp(
      `^(<@!?${senderID}>|${escapeRegex(
        threadSetting.hasOwnProperty("PREFIX") ? threadSetting.PREFIX : PREFIX
      )}|\\s*)`
    );
    if (!event.body.startsWith(await funcs.getPrefix(event.threadID))) return;

    if (
      userBanned.has(senderID) ||
      threadBanned.has(threadID) ||
      (allowInbox === false && senderID == threadID)
    ) {
      if (!ADMINBOT.includes(senderID.toString())) {
        if (userBanned.has(senderID)) {
          const { reason, dateAdded } = userBanned.get(senderID) || {};
          return api.sendMessage(
            global.getText("handleCommand", "userBanned", reason, dateAdded),
            threadID,
            async (err, info) => {
              await new Promise((resolve) => setTimeout(resolve, 5 * 1000));
              return api.unsendMessage(info.messageID);
            },
            messageID
          );
        } else {
          if (threadBanned.has(threadID)) {
            const { reason, dateAdded } = threadBanned.get(threadID) || {};
            return api.sendMessage(
              global.getText(
                "handleCommand",
                "threadBanned",
                reason,
                dateAdded
              ),
              threadID,
              async (err, info) => {
                await new Promise((resolve) => setTimeout(resolve, 5 * 1000));
                return api.unsendMessage(info.messageID);
              },
              messageID
            );
          }
        }
      }
    }

    const [matchedPrefix] = body.match(prefixRegex),
      args = body.slice(matchedPrefix.length).trim().split(/ +/);
    commandName = args.shift().toLowerCase();
    var command = commands.get(commandName) || global.client.KJ.get(commandName);
    if (!command) {
      var allCommandName = [];
      const commandValues = commands["keys"]();
      for (const cmd of commandValues) allCommandName.push(cmd);
      const checker = stringSimilarity.findBestMatch(
        commandName,
        allCommandName
      );
      if (checker.bestMatch.rating >= 0.5)
        command = client.commands.get(checker.bestMatch.target);
      else
        return black.reply("هذا الامر مش موجود يا سيد");
    }
    if (commandBanned.get(threadID) || commandBanned.get(senderID)) {
      if (!ADMINBOT.includes(senderID)) {
        const banThreads = commandBanned.get(threadID) || [],
          banUsers = commandBanned.get(senderID) || [];
        if (banThreads.includes(command.config.name))
          return api.sendMessage(
            global.getText(
              "handleCommand",
              "commandThreadBanned",
              command.config.name
            ),
            threadID,
            async (err, info) => {
              await new Promise((resolve) => setTimeout(resolve, 5 * 1000));
              return api.unsendMessage(info.messageID);
            },
            messageID
          );
        if (banUsers.includes(command.config.name))
          return api.sendMessage(
            global.getText(
              "handleCommand",
              "commandUserBanned",
              command.config.name
            ),
            threadID,
            async (err, info) => {
              await new Promise((resolve) => setTimeout(resolve, 5 * 1000));
              return api.unsendMessage(info.messageID);
            },
            messageID
          );
      }
    }
    if (
      command.config.Class.toLowerCase() == "nsfw" &&
      !global.data.threadAllowNSFW.includes(threadID) &&
      !ADMINBOT.includes(senderID)
    )
      return api.sendMessage(
        global.getText("handleCommand", "threadNotAllowNSFW"),
        threadID,
        async (err, info) => {
          await new Promise((resolve) => setTimeout(resolve, 5 * 1000));
          return api.unsendMessage(info.messageID);
        },
        messageID
      );
    var threadInfo2;
    if (event.isGroup == !![])
      try {
        threadInfo2 =
          threadInfo.get(threadID) || (await Threads.getInfo(threadID));
        if (Object.keys(threadInfo2).length == 0) throw new Error();
      } catch (err) {
        logger(global.getText("handleCommand", "cantGetInfoThread", "error"));
      }
    var permssion = 0;
    var threadInfoo =
      threadInfo.get(threadID) || (await Threads.getInfo(threadID));
    const find = threadInfoo.adminIDs.find((el) => el.id == senderID);
    if (ADMINBOT.includes(senderID.toString())) permssion = 2;
    else if (!ADMINBOT.includes(senderID) && find) permssion = 1;
    else if (senderID == config.OWNERID) permssion = 3;
    if (command.config.Auth > permssion)
      return api.sendMessage(
        global.getText(
          "handleCommand",
          "permssionNotEnough",
          command.config.name
        ),
        event.threadID,
        event.messageID
      );
    if (!client.Time.has(command.config.name))
      client.Time.set(command.config.name, new Map());
    const timestamps = client.Time.get(command.config.name);
    const expirationTime = (command.config.Time || 1) * 1000;
    if (
      timestamps.has(senderID) &&
      dateNow < timestamps.get(senderID) + expirationTime
    )
      return api.setMessageReaction(
        "❎",
        event.messageID,
        (err) =>
          err
            ? logger("Đã có lỗi xảy ra khi thực thi setMessageReaction", 2)
            : "",
        !![]
      );
    var getText2;
    if (
      command.langs &&
      typeof command.langs == "object" &&
      command.langs.hasOwnProperty(global.config.langs)
    )
      getText2 = (...values) => {
        var lang = command.langs[global.config.langs][values[0]] || "";
        for (var i = values.length; i > 0x2533 + 0x1105 + -0x3638; i--) {
          const expReg = RegExp("%" + i, "g");
          lang = lang.replace(expReg, values[i]);
        }
        return lang;
      };
    else getText2 = () => {};
    try {
      const Obj = {};
      Obj.api = api;
      Obj.event = event;
      Obj.args = args;
      Obj.models = models;
      Obj.Users = Users;
      Obj.usersData = usersData;
      Obj.threadsData = threadsData;
      Obj.globalData = globalData;
      Obj.black = black;
      Obj.Threads = Threads;
      Obj.Currencies = Currencies;
      Obj.permssion = permssion;
      Obj.getText = getText2;
      command.onType(Obj);
      timestamps.set(senderID, dateNow);
      if (DeveloperMode == !![])
        logger(
          global.getText(
            "handleCommand",
            "executeCommand",
            time,
            commandName,
            senderID,
            threadID,
            args.join(" "),
            Date.now() - dateNow
          ),
          "[ DEV MODE ]"
        );
    } catch (e) {
      return api.sendMessage(
        global.getText("handleCommand", "commandError", commandName, e),
        threadID
      );
    }
  };
};
