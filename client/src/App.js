import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

import Nav from "./components/Nav";
import Index from "./components/Index";

import LogSignUp from "./components/LogSignUp";

import NewQuestion from "./components/NewQuestion";
import QuestionDetails from "./components/QuestionDetails";
import EditQuestion from "./components/EditQuestion";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import socket from "./socket";
import Notfound from "./components/Notfound";
import Footer from "./components/footer";



function App() {
  const [socketCoonected, setsocketCoonected] = useState(false)
  const {user} = useAuthContext([])
  // const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    
    socket.on('connection', () => {
      console.log('Connected to socket server');
    });
    socket.emit("setup", user);
    socket.on('connected', ()=> setsocketCoonected(true) )
    
    // socket.on("onlineUsers", (users) => {
    //   setOnlineUsers(users);
    // });

    // socket.on('user-disconnect', (users) => {
    //   console.log('Disconnected from socket server');
    //   setOnlineUsers(users)
    // });
  }, [user]);
  return (
    <div className="d-flex flex-column justify-content-between" style={{ minHeight: "100vh" }}>
      <div className="flex-grow-1">
      <Router>
        <Nav socket={socket} socketCoonected={socketCoonected} />
        <ToastContainer />
        <Routes>
          <Route exact path="/" element={<Index />} />
          <Route exact path="/login" element={!user ? <LogSignUp /> : <Navigate to="/"/>} />
          <Route exact path="/new-question" element={user ? <NewQuestion /> : <Navigate to="/login"/>} />
          <Route exact path="/question/:id" element={<QuestionDetails socket={socket}/>} />
          <Route exact path="/edit-question/:id" element={user ?<EditQuestion /> : <Navigate to="/login"/>} />
          <Route exact path="/profile/:id" element={user ? <Profile /> : <Navigate to="/login"/>} />
          <Route exact path="/edit-profile/:id" element={user ? <EditProfile /> : <Navigate to="/login"/>} />
          <Route path="/*"element={<Notfound/>} />
        </Routes>
      </Router>
      </div>
      <div className="flex-shrink-0">
        <Footer/>
      </div>
    </div>
  );
}

export default App;

