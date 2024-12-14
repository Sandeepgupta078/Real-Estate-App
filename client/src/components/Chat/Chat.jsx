import React, { useContext, useEffect, useRef } from 'react'
import './Chat.scss'
import { useState } from 'react'
import { AuthContext } from '../../context/AuthContext';
import apiRequest from '../../lib/apiRequest';
import { format } from 'timeago.js';
import { SocketContext } from '../../context/SocketContext';
import { useNotificationStore } from '../../lib/notificationStore';

const Chat = ({ chats }) => {
    const [chat, setchat] = useState(null);
    const { currentUser } = useContext(AuthContext);
    const { socket } = useContext(SocketContext);
    // console.log(chats) 

    const messageEndRef = useRef();

    const decrease = useNotificationStore((state) => state.decrease);
    

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    } , [chat]);

    const handleOpenChat = async (id, receiver) => {
        try {
            const res = await apiRequest.get(`/chats/${id}`);
            if (!res.data.seenBy.includes(currentUser.id)) {
                decrease();
            }
            setchat({ ...res.data, receiver });

        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const text = formData.get('text');

        if (!text) return;
        try {
            const res = await apiRequest.post(`/messages/${chat.id}`, { text });
            setchat({ ...chat, messages: [...chat.messages, res.data] });
            e.target.reset();
            socket.emit("sendMessage", {
                receiverId: chat.receiver.id,
                data: res.data,
            })
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        const read = async () => {
            try {
                await apiRequest.put(`/messages/${chat.id}/read`);
            } catch (error) {
                console.log(error);
            }
        }

        if (chat && socket) {
            socket.on("getMessage", (data) => {
                if (data.chatId === chat.id) {
                    setchat({
                        ...chat,
                        messages: [...chat.messages, data],
                    });
                    read();
                }
            });
        }
        return () => {
            socket.off("getMessage");
        }
    }, [chat, socket]);



    return (
        <div className='chat'>
            <div className="messages">
                <h1>Messages</h1>
                {
                    chats?.map((c) => (
                        <div
                            className="message"
                            key={c.id}
                            style={{
                                backgroundColor: c.seenBy.includes(currentUser.id) || chat?.id === c.id
                                    ? "white" : "#fecd514e",
                            }}
                            onClick={() => handleOpenChat(c.id, c.receiver)}
                        >
                            <img
                                src={c.receiver?.avatar || "/no-avatar.jpg"}
                                alt=""
                            />
                            <span>{c.receiver?.username}</span>
                            <p>{c.lastMessage}</p>
                        </div>
                    ))
                }
            </div>
            {
                chat && (
                    <div className="chatBox">
                        <div className="top">
                            <div className="user">
                                <img src={chat.receiver.avatar || "/no-avatar.jpg"} alt="" />
                                {chat.receiver.username}
                            </div>
                            <div className="close" onClick={() => setchat(null)}>X</div>
                        </div>
                        <div className="center">
                            {
                                chat.messages.map((message) => (
                                    <div className="chatMessage"
                                        style={{
                                            alignSelf: message.userId === currentUser.id ? "flex-end" : "flex-start",
                                            textAlign: message.userId === currentUser.id ? "right" : "left",
                                        }}
                                        key={message.id}>
                                        <p>{message.text}</p>
                                        <span>{format(message.createdAt)}</span>
                                    </div>
                                ))
                            }
                            <div ref={messageEndRef}></div>
                        </div>
                        <form
                            onSubmit={handleSubmit}
                            className="bottom">
                            <textarea name="text" id=""></textarea>
                            <button>Send</button>
                        </form>
                    </div>
                )
            }
        </div>
    )
}

export default Chat