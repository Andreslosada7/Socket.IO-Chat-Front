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

type Player = {
  id: string;
  hidden: number;
};

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [name, setName] = useState("");
  const [registered, setRegistered] = useState(false);
  const [gameMood, setGameMood] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);

  const receiveMessage = (message: Message) => {
    setMessages((state) => [message, ...state]);
  };

  const handleGameMood = () => {
    setGameMood(true);
  };

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleShowGame = () => {
    setShowGame(true);
  };

  const handleShowPlayers = (playerList: Player[]) => {
    setPlayers(playerList);
  };

  const handleRegisterPlayer = (dataPlayer: Player) => {
    setPlayers((state) => [dataPlayer, ...state]);
  };

  useEffect(() => {
    socket.on("message", receiveMessage);
    socket.on("startGame", handleGameMood);
    socket.on("showForm", handleShowForm);
    socket.on("showGame", handleShowGame);
    socket.on("showPlayers", handleShowPlayers);
    socket.on("registerPlayer", handleRegisterPlayer);

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

  const sendShowGame = () => {
    socket.emit("showGame");
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
        <Route
          path="/"
          element={<Game showForm={showForm} showGame={showGame} />}
        ></Route>
      )}
      <Route
        path="/admin"
        element={
          <AdminPanel
            sendStartGame={sendStartGame}
            sendShowForm={sendShowForm}
            sendShowPlayers={sendShowGame}
            sendShowGame={sendShowGame}
          />
        }
      ></Route>
    </Routes>
  );
}
