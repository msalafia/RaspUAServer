# RaspUAServer

RaspUAServer is a simple implementation of an OPC UA Server using the stack for Node.js provided by [Node-OPCUA](https://github.com/node-opcua/node-opcua).

This server exposes in the address space an object rapresenting che current device running the server. Such an object owns four variables representing:

- the architecture of the CPU;
- the percentage of free memory;
- the temperature of the CPU;
- the status of the GPIO 4 (Pin 7 - i used it to turn on/off a LED);

**NB: this application works only on a Raspberry Pi**

---

In order to run the server, clone the repository and open a terminal having current path (*pwd*) in the project folder. Be sure that Node.Js is instaled in your system. Finally, run the commands:

```
npm install
node sample_server.js
```

---

The server has been evaluated on a Raspberry Pi model B. RaspUAServer can be run in all platform where Node.js is suported, but only on a Raspberry Pi a variable named CPU_Temperature will be exposed. 
