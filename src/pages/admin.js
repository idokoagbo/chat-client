import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import ChatScreen from "../components/chatScreen";


const AdminPage = () => {
    const [responses, setResponses] = useState([]);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    // load sample response from server
    useEffect(() => {
        fetch('http://localhost:8000/responses')
            .then(response => response.json())
            .then(data => {
                setResponses(data);
            });
    }, []);

    const socket = io("http://localhost:8000");

    socket.on("connect", () => {
        console.log("connected to server");
    });

    socket.on("message", (message) => {
        console.log("received message from server", message);
        if (message.search('Agent:') !== -1) {
            return;
        }
        setTimeout(() => {
            setMessages([...messages, message]);
        }, 1000);
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        setMessages([...messages, `Me: ${input}`]);
        setTimeout(() => {
            socket.emit("message", `Agent: ${input}`);
        }, 1000);
        setInput("");
    };

    const handleAddResponse = (event) => {
        event.preventDefault();
        window.location.href = '/add-response'
    }

    return (
        <div>
            <h1>Admin</h1>
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
                <button onClick={handleAddResponse} style={{
                    padding: '10px',
                    fontSize: '16px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    backgroundColor: 'blue',
                    color: 'white',
                    cursor: 'pointer'


                }}>Add new response</button>
                <br />
                <ul>
                    {
                        responses.map((response, index) => {
                            return (
                                <li key={response._id}><a href="" onClick={(event) => {
                                    event.preventDefault();
                                    setInput(response.response);
                                }}>{response.response}</a> </li>
                            );
                        }
                        )
                    }
                </ul>
            </div>
        </div>
    );
};

export default AdminPage;
