import React from "react";
type AdminPanelProps = {
  sendStartGame: () => void;
  sendShowForm: () => void;
  sendShowGame: () => void;
  sendShowPlayers: () => void;
};
const AdminPanel: React.FC<AdminPanelProps> = ({
  sendStartGame,
  sendShowForm,
  sendShowPlayers,
  sendShowGame,
}) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl text-center my-2">AdminPanel</h1>
      <div className="flex justify-around w-1/2 mx-auto">
        <button
          onClick={sendStartGame}
          className="bg-white hover:bg-gray-500 text-gray-700 font-semibold hover:text-white my-2 mx-auto py-2 px-4 border border-black hover:border-transparent rounded"
        >
          Start game
        </button>
        <button
          onClick={sendShowForm}
          className="bg-white hover:bg-gray-500 text-gray-700 font-semibold hover:text-white my-2 mx-auto py-2 px-4 border border-black hover:border-transparent rounded"
        >
          ShowForm
        </button>
        <button
          onClick={sendShowGame}
          className="bg-white hover:bg-gray-500 text-gray-700 font-semibold hover:text-white my-2 mx-auto py-2 px-4 border border-black hover:border-transparent rounded"
        >
          ShowGame
        </button>
        <button
          onClick={sendShowPlayers}
          className="bg-white hover:bg-gray-500 text-gray-700 font-semibold hover:text-white my-2 mx-auto py-2 px-4 border border-black hover:border-transparent rounded"
        >
          ShowPlayers
        </button>
        <button className="bg-white hover:bg-gray-500 text-gray-700 font-semibold hover:text-white my-2 mx-auto py-2 px-4 border border-black hover:border-transparent rounded">
          Thanks
        </button>
      </div>
    </div>
  );
};

export default AdminPanel;
