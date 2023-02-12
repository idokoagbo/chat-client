import React, { useState } from "react";
import io from "socket.io-client";
import ChatScreen from "../components/chatScreen";


const ChatAgentPage = () => {
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
            <h1>Support Agent</h1>
            <div style={{
                width: "70%",
                float: "left",
            }}>
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
            <div style={
                {
                    width: "25%",
                    padding: "10px",
                    float: "right",
                    overflow: "scroll"
                }
            }>
                <h2>Sample Responses</h2>
                <ul>
                    <li>Hi, how can I help you?</li>
                    <li>Hi, I have a problem with my account</li>
                    <li>What is the problem?</li>
                    <li>My account is not working</li>
                    <li>Can you please tell me your account number?</li>
                    <li>My account number is 123456789</li>
                    <li>Thank you, I will check your account</li>
                    <li>Ok, thank you</li>
                </ul>
            </div>
        </div>
    );
};

export default ChatAgentPage;
