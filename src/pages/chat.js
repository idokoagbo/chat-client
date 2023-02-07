import React, { useState } from "react";
import io from "socket.io-client";

// const socket = io("http://localhost:8000");

// socket.on('connect', () => {
//     console.log("connected to server");
// });

// socket.on('message', (message) => {
//     console.log("received message from server", message);
// });

// socket.disconnect('disconnect', () => {
//     console.log("disconnected from server");
// });


const ChatApp = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const socket = io("http://localhost:8000");

    socket.on("connect", () => {
        console.log("connected to server");
    });

    socket.on("message", (message) => {
        console.log("received message from server", message);
        setMessages([...messages, message]);
    });


    const handleSubmit = (event) => {
        event.preventDefault();
        setMessages([...messages, `Me: ${input}`]);
        setTimeout(() => {
            socket.emit("message", input);
        }, 1000);
        setInput("");
    };

    return (
        <div>
            <h1>Chat App</h1>
            <ul>
                {messages.map((message, index) => (
                    <li key={index}>{message}</li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default ChatApp;
