import { useState, useEffect } from "react";

const COLORS = ["red", "blue", "green", "yellow", "purple", "orange"];

const ColorGuessingGame = () => {
  const [targetColor, setTargetColor] = useState("");
  const [score, setScore] = useState(0);
  const [gameStatus, setGameStatus] = useState("");

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    setTargetColor(randomColor);
    setGameStatus("Hey Player! Guess the correct color!");
  };

  const handleGuess = (color) => {
    if (color === targetColor) {
      setScore(score + 1);
      setGameStatus("Correct! 🎉");
      document.querySelector(".color-box").classList.add("correct");
      setTimeout(() => {
        document.querySelector(".color-box").classList.remove("correct");
        startNewGame(); // Starts a new game after correct guess
      }, 1000);
    } else {
      setGameStatus("Wrong! Try again. ❌");
      document.querySelector(".color-box").classList.add("wrong");
      setTimeout(() => {
        document.querySelector(".color-box").classList.remove("wrong");
      }, 500);
    }
  };

  // Handle clicking "New Game" button
  const handleNewGameClick = () => {
    setScore(0); // Reset score when starting a new game
    startNewGame(); // Start a new game with a new color
  };

  return (
    <div className="game-container">
      <h1>INSTRUCTIONS</h1>
      <h2 data-testid="gameInstructions">
      Player Will Guess the correct color by click on the color that matched the Answer!
        </h2>
      <div
        data-testid="colorBox"
        className="color-box"
        style={{ backgroundColor: targetColor }}
      ></div>
      <div className="options">
        {COLORS.map((color) => (
          <button
            key={color}
            data-testid="colorOption"
            className="color-button"
            style={{ backgroundColor: color }}
            onClick={() => handleGuess(color)}
          ></button>
        ))}
      </div>
      <p data-testid="gameStatus">{gameStatus}</p>
      <p data-testid="score">Score: {score}</p>
      <button data-testid="newGameButton" onClick={handleNewGameClick}>
        New Game
      </button>
    </div>
  );
};

export default ColorGuessingGame;
