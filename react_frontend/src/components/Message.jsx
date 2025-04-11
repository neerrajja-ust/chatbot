import React from 'react';

export default function Message({ text, sender }) {
  return (
    <div className={`message ${sender === 'user' ? 'user-message' : 'bot-message'}`}>
      <p>{text}</p>
    </div>
  );
}

