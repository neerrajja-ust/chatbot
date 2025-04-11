import React from 'react';

export default function Loader({ isThinking }) {
  if (!isThinking) return null;

  return <div className="loader">Thinking...</div>;
}
