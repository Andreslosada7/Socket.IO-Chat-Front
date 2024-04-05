import { useEffect, useState } from "react";
import io from "socket.io-client";
import ChatForm from "./components/ChatForm";
import ChatTable from "./components/ChatTable";
import StartForm from "./components/StartForm";

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

  const receiveMessage = (message: Message) => {
    console.log(message);
    setMessages((state) => [message, ...state]);
  };

  useEffect(() => {
    socket.on("message", receiveMessage);

    return () => {
      socket.off("message", receiveMessage);
    };
  }, [messages]);

  const sendMessage = (newMessage: Message) => {
    setMessages((state) => [newMessage, ...state]);
    socket.emit("message", newMessage);
  };

  return (
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
  );
}
