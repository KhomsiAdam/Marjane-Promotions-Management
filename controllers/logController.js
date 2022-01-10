const Log = require("../models/Logs"),
  saveLog = (userRole, userId, action, msg) => {
    let log = new Log({
      userRole: userRole,
      userId: userId,
      action: action,
      msg: msg,
    });
    log.save();
  };

module.exports = { saveLog };