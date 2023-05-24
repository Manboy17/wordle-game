import React, { useEffect, useState } from "react";

export default function Keyboard({ usedKeys }) {
  const [letters, setLetters] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/letters").then((res) => {
      res.json().then((json) => {
        setLetters(json);
      });
    });
  }, []);

  return (
    <div className="keyboard">
      {letters.map((l) => {
        const color = usedKeys[l.key];
        return (
          <div key={l.key} className={color}>
            {l.key}
          </div>
        );
      })}
    </div>
  );
}
