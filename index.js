var request = require('request');
var _ = require('underscore');

var MITV = function(ipAddress, options) {
  this.baseUrl = "http://" + ipAddress + ":6095"

  this.r = request.defaults({json: true, method: "GET", baseUrl: this.baseUrl});
};

MITV.prototype.sendHomeKey = function(callback) {
  return this._sendKey('home', callback);
};

MITV.prototype.sendMenuKey = function(callback) {
  return this._sendKey('menu', callback);
};

MITV.prototype.sendBackKey = function(callback) {
  return this._sendKey('back', callback);
};

MITV.prototype.sendUpKey = function(callback) {
  return this._sendKey('up', callback);
};

MITV.prototype.sendDownKey = function(callback) {
  return this._sendKey('down', callback);
};

MITV.prototype.sendLeftKey = function(callback) {
  return this._sendKey('left', callback);
};

MITV.prototype.sendRightKey = function(callback) {
  return this._sendKey('right', callback);
};

MITV.prototype.sendEnterKey = function(callback) {
  return this._sendKey('enter', callback);
};

MITV.prototype.sendVolumeUp = function(callback) {
  return this._sendKey('volumeup', callback);
};

MITV.prototype.sendVolumeDown = function(callback) {
  return this._sendKey('volumedown', callback);
};

MITV.prototype.sendPowerButton = function(callback) {
  return this._sendKey('power', callback);
};

MITV.prototype._sendKey = function(keyName, callback) {
  var options = {
    url: "/controller?action=keyevent&keycode=" + keyName,
  };

  this.r(options, function(err, res, body) {
    if (err) return callback(err);
    if (res.statusCode !== 200) {
      return callback("Invalid Response from Server " + res.statusCode);
    }
    if (body.msg !== "success" || body.status !== 0) {
      return callback("Server returned (" + body.status + ") " + body.msg);
    }
    callback(null, body);
  });
};

MITV.prototype.getAccountState = function(callback) {
  var options = {
    url: "/account?action=getState",
  };

  this.r(options, function(err, res, body) {
    if (err) return callback(err);
    if (res.statusCode !== 200) {
      return callback("Invalid Response from Server " + res.statusCode);
    }
    if (body.msg !== "success" || body.status !== 0) {
      return callback("Server returned (" + body.status + ") " + body.msg);
    }
    callback(null, body.data);
  });
};

MITV.prototype.getVolume = function(callback) {
  var options = {
    url: "/general?action=getVolum",
  };

  this.r(options, function(err, res, body) {
    if (err) return callback(err);
    if (res.statusCode !== 200) {
      return callback("Invalid Response from Server " + res.statusCode);
    }
    if (body.msg !== "success" || body.request_result !== 200) {
      return callback("Server returned (" + body.request_result + ") " + body.msg);
    }
    callback(null, body.data);
  });
};

MITV.prototype.getInstalledApps = function(count, callback) {
  if (!count || count === 0) count = 999;
  var options = {
    url: "/controller?action=getinstalledapp&count=" + count + "&changeIcon=1",
  };

  this.r(options, function(err, res, body) {
    if (err) return callback(err);
    if (res.statusCode !== 200) {
      return callback("Invalid Response from Server " + res.statusCode);
    }
    if (body.msg !== "success" || body.status !== 0) {
      return callback("Server returned (" + body.status + ") " + body.msg);
    }
    callback(null, body.data.AppInfo);
  });
};

MITV.prototype.startApp = function(packageName, callback) {
  var options = {
    url: "/controller?action=startapp&&type=packagename&packagename=" + packageName,
  };

  this.r(options, function(err, res, body) {
    if (err) return callback(err);
    if (res.statusCode !== 200) {
      return callback("Invalid Response from Server " + res.statusCode);
    }
    if (body.msg !== "success" || body.status !== 0) {
      return callback("Server returned (" + body.status + ") " + body.msg);
    }
    callback(null);
  });
};

MITV.prototype.systemCleanInfo = function(callback) {
  var options = {
    url: "/generalA?action=systemCleanInfo",
  };

  this.r(options, function(err, res, body) {
    if (err) return callback(err);
    if (res.statusCode !== 200) {
      return callback("Invalid Response from Server " + res.statusCode);
    }
    if (!body.hasOwnProperty("request_result_string") || body.request_result !== 200) {
      return callback("Server returned (" + body.request_result + ") " + body.request_result_string);
    }
    callback(null, body.request_result_string);
  });
};

MITV.prototype.isAlive = function(callback) {
  var options = {
    url: "/request?action=isalive",
  };

  this.r(options, function(err, res, body) {
    if (err) return callback(err);
    if (res.statusCode !== 200) {
      return callback("Invalid Response from Server " + body);
    }
    if (body.msg !== "success" || body.status !== 0) {
      return callback("Server returned (" + body.status + ") " + body.msg);
    }
    callback(null, body.data);
  });
};

module.exports = MITV;

var mitv = new MITV("192.168.1.154");
// mitv.isAlive(function(err, isAlive) {
//   if (err) return console.error(err);
//   console.log(isAlive);
// });
// mitv.getState(function(err, isAlive) {
//   if (err) return console.error(err);
//   console.log(isAlive);
// });
// mitv.getVolume(function(err, volume) {
//   if (err) return console.error(err);
//   console.log(volume);
// });
// mitv.getInstalledApps(999, function(err, apps) {
//   if (err) return console.error(err);
//   console.log(apps);
// });
// mitv.startApp("com.xiaomi.mitv.mediaexplorer", function(err) {
//   if (err) return console.error(err);
//   console.log();
// });
