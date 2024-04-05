import React from "react";

type ChatTableProps = {
  messages: Message[];
  name: string;
};
type Message = {
  body: string;
  from: string;
};
const ChatTable: React.FC<ChatTableProps> = ({ messages, name }) => {
  return (
    <>
      <h1 className="text-2xl text-center my-2">{name}</h1>
      <ul className="h-80 overflow-y-auto bg-white rounded-t p-2 col flex flex-col-reverse">
        {messages.map((msg, index) => (
          <li
            key={index}
            className={`my-2 p-2 table text-sm rounded-md ${
              msg.from === name
                ? "bg-sky-700 ml-auto w-2/3"
                : "bg-pink-800 w-2/3"
            }`}
          >
            <b>{msg.from != name ? msg.from : "Me"}</b>: {msg.body}
          </li>
        ))}
      </ul>
    </>
  );
};

export default ChatTable;
