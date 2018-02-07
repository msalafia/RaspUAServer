let os = require("os");

module.exports.getAvailableMemory = function() {
    let percentageMemUsed = (os.freemem() / os.totalmem()) * 100.0;
    return percentageMemUsed;
}