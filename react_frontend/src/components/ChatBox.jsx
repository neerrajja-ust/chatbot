import React, { useState, useEffect, useRef } from 'react';
import Message from './Message';
import Loader from './Loader';
import axios from 'axios';

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { text: input, sender: 'user' }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post('http://127.0.0.1:8080/api/', {
        message: input,
      });
      setMessages([...newMessages, { text: response.data.bot_response, sender: 'bot' }]);
    } catch {
      setMessages([...newMessages, { text: 'Error: could not get response.', sender: 'bot' }]);
    }
    
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div className="chatbox">
      <div className="messages" id="messages">
        {messages.map((msg, idx) => (
          <Message key={idx} text={msg.text} sender={msg.sender} />
        ))}
        {loading && <Loader />}

        <div ref={chatRef}></div>
      </div>
      
      <div className="input-area">
        <input
          className="input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
        />
        <button className="send-button" onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
