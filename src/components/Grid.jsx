import React from "react";
import Row from "./Row";

export default function Grid({ guesses, turn, currentGuess }) {
  return (
    <div>
      {guesses.map((guess, i) => {
        if (turn === i) {
          return <Row key={i} currentGuess={currentGuess} />;
        }
        return <Row key={i} guess={guess} />;
      })}
    </div>
  );
}
