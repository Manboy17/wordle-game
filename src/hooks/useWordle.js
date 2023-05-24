import { useState } from "react";

const useWorlde = (solution) => {
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState([...Array(6)]);
  const [history, setHistory] = useState([]); // storing just words
  const [isCorrect, setIsCorrect] = useState(false);
  const [usedKeys, setUsedKeys] = useState({}); // {a: "green", b: "grey"}

  const formatGuesss = () => {
    console.log("Formatting has started successfully!");
    // {key: "a", color: "grey"}
    const solutionArray = [...solution]; // split out on letters
    const formattedGuess = [...currentGuess].map((letter) => {
      return { key: letter, color: "grey" };
    });
    // green color implementation
    formattedGuess.forEach((letter, i) => {
      if (solutionArray[i] === letter.key) {
        formattedGuess[i].color = "green";
        solutionArray[i] = null;
      }
    });

    // yellow color implementation
    formattedGuess.forEach((letter, i) => {
      if (solutionArray.includes(letter.key) && letter.color !== "green") {
        formattedGuess[i].color = "yellow";
        solutionArray[solutionArray.indexOf(letter.key)] = null;
      }
    });

    return formattedGuess;
  };

  const addNewGuess = (formattedGuess) => {
    if (solution === currentGuess) {
      setIsCorrect(true);
    }
    setGuesses((prevGuesses) => {
      const newGuesses = [...prevGuesses];
      newGuesses[turn] = formattedGuess;
      return newGuesses;
    });
    setHistory((prevHistory) => {
      return [...prevHistory, currentGuess];
    });
    setTurn((prevTurn) => {
      return prevTurn + 1;
    });
    setUsedKeys((prevUsedKeys) => {
      let newKeys = { ...prevUsedKeys };

      formattedGuess.forEach((l) => {
        const currentColor = newKeys[l.key];

        if (l.color === "green") {
          newKeys[l.key] = "green";
          return;
        }
        if (l.color === "yellow" && currentColor !== "green") {
          newKeys[l.key] = "yellow";
          return;
        }
        if (
          l.color === "grey" &&
          currentColor !== "green" &&
          currentColor !== "yellow"
        ) {
          newKeys[l.key] = "grey";
          return;
        }
      });

      return newKeys;
    });

    setCurrentGuess("");
  };

  const handleKeyup = ({ key }) => {
    if (key === "Enter") {
      if (turn > 5) {
        console.log("You have only 5 turns!");
        return;
      }
      if (history.includes(currentGuess)) {
        console.log("That word has already been used!");
        return;
      }
      if (currentGuess.length !== 5) {
        console.log("The word must contain 5 letters!");
        return;
      }
      const formatted = formatGuesss();
      addNewGuess(formatted);
    }
    if (key === "Backspace") {
      setCurrentGuess((prev) => {
        return prev.slice(0, -1);
      });
      return;
    }
    if (/^[A-Za-z]$/.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess((prev) => {
          return prev + key;
        });
      }
    }
  };

  return { turn, currentGuess, guesses, isCorrect, usedKeys, handleKeyup };
};

export default useWorlde;
