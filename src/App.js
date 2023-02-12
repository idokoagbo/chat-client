import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ChatApp from './pages/chat';
import LoginPage from './pages/login';
import ChatAgentPage from './pages/chatAgent';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<ChatApp />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/chat-agent" element={<ChatAgentPage />} />
      </Routes>
    </Router>

  );
}

export default App;
