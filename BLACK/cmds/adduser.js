module.exports = {
  config: {
    name: "اضف",
    Auth: 0,
    Owner: "Gry KJ",
    Info: "اضافة شخص لمجموعة",
    Class: "المجموعة",
    Hide: false,
    How: "اضف + uid",
    Time: 0
  },

  onType: async function ({ api, event, args }) {
    const { threadID, messageID } = event;
    const botID = api.getCurrentUserID();
    const out = msg => api.sendMessage(msg, threadID, messageID);
    var { participantIDs, approvalMode, adminIDs } = await api.getThreadInfo(threadID);
    var participantIDs = participantIDs.map(e => parseInt(e));
    if (!args[0]) return out("الرجاء إدخال رابط أو معرف حساب الشخص المراد إضافته. 🌚");
    if (!isNaN(args[0])) return adduser(args[0], undefined);
    else {
      try {
        var [id, name, fail] = await funcs.findUid(args[0]);
        if (fail == true && id != null) return out(id);
        else if (fail == true && id == null) return out("لم يتم العثور على المستخدم. 🌚")
        else {
          await adduser(id, name || "Facebook users");
        }
      } catch (e) {
        return out(`${e.name}: ${e.message}. 🌚`);
      }
    }

    async function adduser(id, name) {
      id = parseInt(id);
      if (participantIDs.includes(id)) return out(`${name ? name : "العضو"} بالفعل داخل المجموعة. 🌚`);
      else {
        var admins = adminIDs.map(e => parseInt(e.id));
        try {
          await api.addUserToGroup(id, threadID);
        }
        catch {
          return out(`لم أتمكن من إضافة ${name ? name : "المستخدم"} إلى المجموعة. 🌚`);
        }
        if (approvalMode === true && !admins.includes(botID)) return out(`تمت إضافة ${name ? name : "العضو"} إلى قائمة الانتظار! 🌚`);
        else return out(`تمت إضافة ${name ? name : "العضو"} إلى المجموعة! 🌚`)
      }
    }
  }
};
