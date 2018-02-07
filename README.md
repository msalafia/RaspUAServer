# RaspUAServer

RaspUAServer is a simple implementation of an OPC UA Server using the stack for Node.js provided by [Node-OPCUA](https://github.com/node-opcua/node-opcua).

This server exposes in the address space an object rapresenting che current device running the server. Such an object owns two variables representing the architecture of the CPU and the percentage of free memory.

---

In order to run the server, clone the repository and open a terminal having current path (*pwd*) in the project folder. Be sure that Node.Js is instaled in your system. Finally, run the command:

`node sample_server.js`

---

The server has been evaluated on a Raspberry Pi model B and the aim of future features is exposes information relevant the Raspberry itself, like CPU temperature or information retrieved by GPIO pins.