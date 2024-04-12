import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import io from "socket.io-client";
import ChatForm from "./components/ChatForm";
import ChatTable from "./components/ChatTable";
import StartForm from "./components/StartForm";
import AdminPanel from "./components/AdminPanel";
import Game from "./components/Game";

const URL = import.meta.env.VITE_BACKEND_URL;
const socket = io(URL);

type Message = {
  body: string;
  from: string;
};

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [name, setName] = useState("");
  const [registered, setRegistered] = useState(false);
  const [gameMood, setGameMood] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const receiveMessage = (message: Message) => {
    setMessages((state) => [message, ...state]);
  };

  const handleGameMood = () => {
    setGameMood(true);
  };
  const handleShowForm = () => {
    setShowForm(true);
  };

  useEffect(() => {
    socket.on("message", receiveMessage);
    socket.on("startGame", handleGameMood);
    socket.on("showForm", handleShowForm);

    return () => {
      socket.off("message");
      socket.off("startGame");
    };
  }, [messages]);

  const sendMessage = (newMessage: Message) => {
    setMessages((state) => [newMessage, ...state]);
    socket.emit("message", newMessage);
  };

  const sendStartGame = () => {
    socket.emit("startGame");
  };

  const sendShowForm = () => {
    socket.emit("showForm");
  };

  return (
    <Routes>
      {!gameMood ? (
        <Route
          path="/"
          element={
            <div className="h-screen bg-pink-600 text-white">
              <div className="flex justify-center items-center h-screen">
                {!registered ? (
                  <StartForm setName={setName} setRegistered={setRegistered} />
                ) : (
                  <div className="flex flex-col sm:w-1/4 w-full h-screen">
                    <ChatTable messages={messages} name={name} />
                    <ChatForm sendMessage={sendMessage} name={name} />
                  </div>
                )}
              </div>
            </div>
          }
        ></Route>
      ) : (
        <Route path="/" element={<Game showForm={showForm} />}></Route>
      )}
      <Route
        path="/admin"
        element={
          <AdminPanel
            sendStartGame={sendStartGame}
            sendShowForm={sendShowForm}
          />
        }
      ></Route>
    </Routes>
  );
}
