/* eslint-disable react/jsx-key */
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

import "./App.css";
import Die from "./components/Die";

export default function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [score, setScore] = useState(0);

  function generateDice() {
    const num = Math.floor(Math.random() * (7 - 1) + 1);
    return {
      value: num,
      isHeld: false,
      id: nanoid(),
    };
  }

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
      console.log("You Won!");
    }
  }, [dice]);

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateDice());
    }
    return newDice;
  }

  const holdDice = (id) => {
    setDice((prevDice) =>
      prevDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  };

  function rollDice() {
    if (!tenzies) {
      setDice((prevDice) => {
        return prevDice.map((die) => {
          return die.isHeld ? die : generateDice();
        });
      });
      setScore((prevScore) => prevScore + 1);
    } else {
      setTenzies(false);
      setDice(allNewDice());
      setScore(0);
    }
    console.log(tenzies);
  }

  const createDice = dice.map((die) => {
    return (
      <Die
        key={die.id}
        id={die.id}
        value={die.value}
        holdDice={holdDice}
        isHeld={die.isHeld}
      />
    );
  });

  return (
    <main>
      <div className="container">
        <h1>Tenzies</h1>
        <div className="description">
          <p>
            Roll until all dice are the same. Click each die to freeze it as its
            current value between rolls.
          </p>
        </div>
        <div className="diceContainer">{createDice}</div>
        <button className="rollBtn" onClick={rollDice}>
          {tenzies ? "Play Again" : "Roll"}
        </button>
        {tenzies && <Confetti />}
        <p>Score: {score}</p>
        {tenzies && <h2>You Win!!</h2>}
      </div>
    </main>
  );
}
