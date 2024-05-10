import React from "react";
import BankForm from "./BankForm";
import HideSeek from "./HideSeek";
type GameProps = {
  showForm: boolean;
  showGame: boolean;
};
const Game: React.FC<GameProps> = ({ showForm, showGame }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {!showGame && (
        <h1 className="text-3xl text-center my-2">Bienvenidos al juego</h1>
      )}
      {showForm && !showGame && <BankForm />}
      {showGame && <HideSeek />}
    </div>
  );
};

export default Game;
