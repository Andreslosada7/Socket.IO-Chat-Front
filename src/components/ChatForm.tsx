import React, { useState } from "react";

type ChatFormProps = {
  sendMessage: (newMessage: Message) => void;
  name: string;
};
type Message = {
  body: string;
  from: string;
};
const ChatForm: React.FC<ChatFormProps> = ({ sendMessage, name }) => {
  const [message, setMessage] = useState<string>("");
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newMessage: Message = {
      body: message,
      from: name,
    };
    sendMessage(newMessage);
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-pink-800 p-10 rounded-b">
      <input
        name="message"
        type="text"
        placeholder="Write your message..."
        onChange={(e) => setMessage(e.target.value)}
        className="border-2 border-zinc-500 p-2 w-full text-black rounded"
        value={message}
        autoComplete="off"
        autoFocus
      />
    </form>
  );
};

export default ChatForm;
