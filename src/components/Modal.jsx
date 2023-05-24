import React from "react";

export default function Modal({ isCorrect, turn, solution }) {
  return (
    <div className="modal">
      {isCorrect ? (
        <div>
          <h1>You win!</h1>
          <p>
            The solution is <span className="solution">{solution}</span>
          </p>
          <p>You have found the answer in {turn} guesses</p>
        </div>
      ) : (
        <div>
          <h1>Good luck next time :)</h1>
          <p className="solution">
            The solution is <span className="solution">{solution}</span>
          </p>
          <p>You have run out of given guesses</p>
        </div>
      )}
    </div>
  );
}
