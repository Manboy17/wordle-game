import React, { useEffect, useState } from "react";
import useWorlde from "../hooks/useWordle";
import Grid from "./Grid";
import Keyboard from "./Keyboard";
import Modal from "./Modal";

export default function Wordle({ solution }) {
  const { currentGuess, handleKeyup, guesses, turn, isCorrect, usedKeys } =
    useWorlde(solution);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyup);

    if (isCorrect) {
      setTimeout(() => setShowModal(true), 2000);
      window.removeEventListener("keyup", handleKeyup);
    }

    if (turn > 5) {
      setTimeout(() => setShowModal(true), 2000);
      window.removeEventListener("keyup", handleKeyup);
    }

    return () => {
      window.removeEventListener("keyup", handleKeyup);
    };
  }, [handleKeyup]);

  useEffect(() => {
    console.log(guesses, turn, isCorrect);
  }, [guesses, turn, isCorrect]);

  return (
    <div>
      <Grid guesses={guesses} turn={turn} currentGuess={currentGuess} />
      <Keyboard usedKeys={usedKeys} />
      {showModal && (
        <Modal isCorrect={isCorrect} turn={turn} solution={solution} />
      )}
    </div>
  );
}
