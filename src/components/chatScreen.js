import React from "react";
import "../stylesheet/chatScreen.css";

const ChatScreen = (props) => {
    return (
        <div className="chat-screen">
            {
                props.messages.map((message, index) => {
                    return (
                        message.search('Me') !== -1 ?
                            <div key={index} className="message-bubble sender">
                                <p className="message-text">{message}</p>
                            </div>
                            :
                            <div key={index} className="message-bubble receiver">
                                <p className="message-text">{message}</p>
                            </div>
                    );
                })
            }
        </div>
    );
};

export default ChatScreen;

