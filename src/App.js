import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ChatApp from './pages/chat';
import LoginPage from './pages/login';
import ChatAgentPage from './pages/chatAgent';
import AdminPage from './pages/admin';
import ResponseForm from './pages/response';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<ChatApp />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/chat-agent" element={<ChatAgentPage />} />
        <Route path="/add-response" element={<ResponseForm />} />
      </Routes>
    </Router>

  );
}

export default App;
