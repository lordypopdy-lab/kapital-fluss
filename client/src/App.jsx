import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Deposit from "./pages/Deposit";
import ChatPage from "./pages/ChatPage";
import Withdraw from "./pages/Withdraw";
import Dashboard from "./admin/Dashboard";
import LoginAdmin from "./admin/LoginAdmin";
import AdminChatPage from "./admin/AdminChatPage";
import DashboardLayout from "./components/Nav/DashboardLayout";

import axios from 'axios';
import { Toaster } from 'react-hot-toast';

import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css"

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

axios.defaults.baseURL = 'https://kapital-fluss-server.vercel.app';
axios.defaults.withCredentials = true;

//http://localhost:8080

function App() {

  return (
    <>
    <Toaster position='top-right' toastOptions={{ duration: 4000 }} />
    <Router>
      <Routes>
        <Route index="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/deposit" element={<Deposit />} />
        <Route path="/withdraw" element={<Withdraw />} />
        <Route path="/login-admin" element={<LoginAdmin />} />
        <Route path="/dashboard" element={<DashboardLayout />} />
        <Route path="/admin-chat-page" element={<AdminChatPage />} />
      </Routes>
    </Router>
  </>
  )
}

export default App
