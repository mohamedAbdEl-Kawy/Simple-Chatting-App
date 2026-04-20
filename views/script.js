const socket = io();

let username = prompt("Enter your name");
socket.emit("join", username);

const input = document.getElementById("input");
const send = document.getElementById("send");
const messages = document.getElementById("messages");
const online = document.getElementById("online");
const typing = document.getElementById("typing");

send.onclick = sendMessage;

input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
    socket.emit("typing", true);
});

input.addEventListener("keyup", () => {
    socket.emit("typing", false);
});

function sendMessage() {
    if (input.value.trim() === "") return;
    socket.emit("message", input.value);
    input.value = "";
}

socket.on("message", (data) => {
    let div = document.createElement("div");
    div.classList.add("message");

    if (data.user === username) {
        div.classList.add("me");
    } else {
        div.classList.add("other");
    }

    div.innerHTML = `
        <div class="text-xs opacity-70 mb-1">${data.user}</div>
        <div>${data.text}</div>
    `;

    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
});

socket.on("system", (msg) => {
    let div = document.createElement("div");
    div.classList.add("system");
    div.innerText = msg;
    messages.appendChild(div);
});

socket.on("online", (count) => {
    online.innerText = count + " online";
});

socket.on("typing", (data) => {
    typing.innerText = data.status ? data.user + " typing..." : "";
});
