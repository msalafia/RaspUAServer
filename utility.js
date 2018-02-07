let opcua = require("node-opcua");

let os = require("os");
let exec = require("child_process").exec;

module.exports.getAvailableMemory = function() {
    let percentageMemUsed = (os.freemem() / os.totalmem()) * 100.0;
    return percentageMemUsed;
}

module.exports.getTemperatureAsync = function(callback) {
    //get the temp asynchronously
    let child = exec("/opt/vc/bin/vcgencmd measure_temp", function(err, stdout, stderr) {
        if(err !== null){ callback(err, null); }
        else {
            let val = /^temp=(\d*\.\d*).*/.exec(stdout)[1];
            let temp = parseFloat(val);
            let dataValue = new opcua.DataValue({
                value: new opcua.Variant({ dataType: opcua.DataType.Double, value: temp }),
                statusCode: opcua.StatusCodes.Good,
                sourceTimestamp: new Date()
            });
            callback(null, dataValue);
        }
    });
} 