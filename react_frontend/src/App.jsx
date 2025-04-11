import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ChatBox from './components/ChatBox';
import './style.css';

export default function App() {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <ChatBox />
      </main>
      <Footer />
    </div>
  );
}
