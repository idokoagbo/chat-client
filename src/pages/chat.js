import React, { useState } from "react";
import io from "socket.io-client";
import ChatScreen from "../components/chatScreen";


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
            <ChatScreen messages={messages} />
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={input}
                    placeholder="write something..."
                    style={{
                        width: "87%",
                        padding: "10px",
                        fontSize: "16px",
                        marginLeft: "5px",
                        border: "1px solid #ccc",
                        borderRadius: "5px",

                    }}
                    onChange={(event) => setInput(event.target.value)}
                />
                <button type="submit"

                    style={{
                        width: "10%",
                        padding: "10px",
                        fontSize: "16px",
                        float: "right",
                        marginRight: "5px",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        backgroundColor: "blue",
                        color: "white",
                        cursor: "pointer"
                    }}
                >Send</button>
            </form>
        </div>
    );
};

export default ChatApp;
