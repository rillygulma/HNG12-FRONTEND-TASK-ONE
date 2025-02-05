import { useState, useEffect } from "react";

const ColorGuessingGame = () => {
  const [targetColor, setTargetColor] = useState("");
  const [optionColors, setOptionColors] = useState([]);
  const [score, setScore] = useState(0);
  const [gameStatus, setGameStatus] = useState("");

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const randomColor = generateRandomColor();
    setTargetColor(randomColor);
    setOptionColors(generateDistinctColors(randomColor, 5));
    setGameStatus("Hey Player! Guess the correct color!");
  };

  const generateRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const generateDistinctColors = (baseColor, count) => {
    const baseRGB = hexToRgb(baseColor);
    const distinctColors = [baseColor];

    for (let i = 1; i < count; i++) {
      const newColor = {
        r: clamp(baseRGB.r + getRandomLargeOffset(), 0, 255),
        g: clamp(baseRGB.g + getRandomLargeOffset(), 0, 255),
        b: clamp(baseRGB.b + getRandomLargeOffset(), 0, 255),
      };
      distinctColors.push(rgbToHex(newColor));
    }

    return shuffleArray(distinctColors);
  };

  const hexToRgb = (hex) => {
    const bigint = parseInt(hex.slice(1), 16);
    return {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255,
    };
  };

  const rgbToHex = ({ r, g, b }) => {
    return (
      "#" +
      [r, g, b]
        .map((x) => {
          const hex = x.toString(16);
          return hex.length === 1 ? "0" + hex : hex;
        })
        .join("")
    );
  };

  const getRandomLargeOffset = () => {
    const offset = Math.floor(Math.random() * 256) - 128; // Range: -128 to 127
    return offset;
  };

  const clamp = (num, min, max) => {
    return Math.min(Math.max(num, min), max);
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleGuess = (color) => {
    if (color === targetColor) {
      setScore(score + 1);
      setGameStatus("Correct! 🎉");
      document.querySelector(".color-box").classList.add("correct");
      setTimeout(() => {
        document.querySelector(".color-box").classList.remove("correct");
        startNewGame();
      }, 1000);
    } else {
      setGameStatus("Wrong! Try again. ❌");
      document.querySelector(".color-box").classList.add("wrong");
      setTimeout(() => {
        document.querySelector(".color-box").classList.remove("wrong");
      }, 500);
    }
  };

  const handleNewGameClick = () => {
    setScore(0);
    startNewGame();
  };

  return (
    <div className="game-container">
      <h1>INSTRUCTIONS</h1>
      <h2 data-testid="gameInstructions">
        Player Will Guess the correct color by clicking on the color that
        matches the Answer!
      </h2>
      <div
        data-testid="colorBox"
        className="color-box"
        style={{ backgroundColor: targetColor }}
      ></div>
      <div className="options">
        {optionColors.map((color, index) => (
          <button
            key={index}
            data-testid="colorOption"
            className="color-button"
            style={{ backgroundColor: color }}
            onClick={() => handleGuess(color)}
          ></button>
        ))}
      </div>
      <p data-testid="gameStatus">{gameStatus}</p>
      <p data-testid="score" className="score">Score: {score}</p>
      <button data-testid="newGameButton" onClick={handleNewGameClick}>
        New Game
      </button>
    </div>
  );
};

export default ColorGuessingGame;
