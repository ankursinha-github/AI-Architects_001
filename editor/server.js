const WebSocket = require("ws");
const { spawn } = require("child_process");

const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (ws) => {
    const shell = spawn("bash"); // or 'cmd' on Windows

    shell.stdout.on("data", (data) => {
        ws.send(data.toString());
    });

    shell.stderr.on("data", (data) => {
        ws.send(data.toString());
    });

    ws.on("message", (message) => {
        shell.stdin.write(message);
    });

    ws.on("close", () => {
        shell.kill();
    });
});
