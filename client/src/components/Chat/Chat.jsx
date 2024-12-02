import React from 'react'
import './Chat.scss'
import { useState } from 'react'

const Chat = () => {
    const [chat, setchat] = useState(true);
  return (
    <div className='chat'>
        <div className="messages">
            <h1>Messages</h1>
            <div className="message">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQIGdq3tg9Vw8TlQ7t4QilyHB5mGd53IHL9A&s" alt="" />
                <span>Sandy Gupta</span>
                <p>hlw dear! can we talk about real estate...</p>
            </div>
            <div className="message">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQIGdq3tg9Vw8TlQ7t4QilyHB5mGd53IHL9A&s" alt="" />
                <span>Sandy Gupta</span>
                <p>hlw dear! can we talk about real estate...</p>
            </div>
            <div className="message">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQIGdq3tg9Vw8TlQ7t4QilyHB5mGd53IHL9A&s" alt="" />
                <span>Sandy Gupta</span>
                <p>hlw dear! can we talk about real estate...</p>
            </div><div className="message">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQIGdq3tg9Vw8TlQ7t4QilyHB5mGd53IHL9A&s" alt="" />
                <span>Sandy Gupta</span>
                <p>hlw dear! can we talk about real estate...</p>
            </div>
            <div className="message">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQIGdq3tg9Vw8TlQ7t4QilyHB5mGd53IHL9A&s" alt="" />
                <span>Sandy Gupta</span>
                <p>hlw dear! can we talk about real estate...</p>
            </div>
            <div className="message">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQIGdq3tg9Vw8TlQ7t4QilyHB5mGd53IHL9A&s" alt="" />
                <span>Sandy Gupta</span>
                <p>hlw dear! can we talk about real estate...</p>
            </div>
        </div>
        {
            chat && (
                <div className="chatBox">
            <div className="top">
                <div className="user">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQIGdq3tg9Vw8TlQ7t4QilyHB5mGd53IHL9A&s" alt="" />
                    Sandy Gupta
                </div>
                <div className="close" onClick={()=> setchat(null)}>X</div>
            </div>
            <div className="center">
                <div className="chatMessage">
                    <p>Lorem ipsum dolor sit amet.</p>
                    <span>1 hour ago</span>
                </div>
                <div className="chatMessage own">
                    <p>Lorem ipsum dolor sit amet.</p>
                    <span>1 hour ago</span>
                </div>
                <div className="chatMessage">
                    <p>Lorem ipsum dolor sit amet.</p>
                    <span>1 hour ago</span>
                </div>
                <div className="chatMessage own">
                    <p>Lorem ipsum dolor sit amet.</p>
                    <span>1 hour ago</span>
                </div>
                <div className="chatMessage">
                    <p>Lorem ipsum dolor sit amet.</p>
                    <span>1 hour ago</span>
                </div>
                <div className="chatMessage own">
                    <p>Lorem ipsum dolor sit amet.</p>
                    <span>1 hour ago</span>
                </div>
                <div className="chatMessage">
                    <p>Lorem ipsum dolor sit amet.</p>
                    <span>1 hour ago</span>
                </div>
                <div className="chatMessage own">
                    <p>Lorem ipsum dolor sit amet.</p>
                    <span>1 hour ago</span>
                </div>
                <div className="chatMessage">
                    <p>Lorem ipsum dolor sit amet.</p>
                    <span>1 hour ago</span>
                </div>
                <div className="chatMessage own">
                    <p>Lorem ipsum dolor sit amet.</p>
                    <span>1 hour ago</span>
                </div>
            </div>
            <div className="bottom">
                <textarea name="" id=""></textarea>
                <button>Send</button>
            </div>
        </div>
            )
        }
    </div>
  )
}

export default Chat