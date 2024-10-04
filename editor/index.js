const terminal = new Terminal();
terminal.open(document.getElementById("terminal-container"));

const socket = new WebSocket("ws://localhost:8080");

terminal.onData((data) => {
    socket.send(data);
});

socket.onmessage = (event) => {
    terminal.write(event.data);
};
