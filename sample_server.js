let os = require("os");

let opcua = require("node-opcua");

let util = require("./utility");

let server = new opcua.OPCUAServer({
    port: 4334,
    resourcePath: "/UA/RaspServer",
    buildInfo: {
        productName: "RaspUAServer1",
        buildNumber: "1",
        buildDate: new Date()
    }
});

server.initialize(() => {
    console.log("OPC UA Server initialized.");

    function build_my_address_space(server) {
        const addressSpace = server.engine.addressSpace;
        const namespace = addressSpace.getOwnNamespace();

        //declare a new object
        let device = namespace.addObject({
            organizedBy: addressSpace.rootFolder.objects,
            browseName: "MyDevice"
        });

        //add some variables
        namespace.addVariable({
            propertyOf: device,
            browseName: "CPU_Architecture",
            dataType: "String",
            value: {
                get: function() { 
                    return new opcua.Variant({ 
                        dataType: opcua.DataType.String, 
                        value: process.arch 
                    });
                }
            }
        });

        namespace.addVariable({
            componentOf: device,
            browseName: "FreeMemory",
            dataType: "Double",
            value: {
                get: function() { return new opcua.Variant({
                    dataType: opcua.DataType.Double,
                    value: util.getAvailableMemory()    
                })}
            }
        });

        //add the following variable for a Raspberry only
        if (["arm", "arm64"].indexOf(os.arch()) !== -1) {
            namespace.addVariable({
                componentOf: device,
                browseName: "CPU_Temperature",
                dataType: "Double",
                value: {
                    refreshFunc: util.getTemperatureAsync
                }
            });

            namespace.addVariable({
                componentOf: device,
                browseName: "RedLed",
                dataType: "Boolean",
                value: {
                    get: util.getLedValue,
                    set: util.setLedValue
                }
            });
        }
    }

    build_my_address_space(server);
    console.log("Address space initialized.");

    server.start(() => {
        console.log(`Server is now listening port ${server.endpoints[0].port}... (press CTRL+C to stop)`);
        let endpointUrl = server.endpoints[0].endpointDescriptions()[0].endpointUrl;
        console.log("The primary server endpoint url is ", endpointUrl);
    });
});

process.on('SIGINT', function () {
    util.freeResources();
    process.exit(0);
});
