import { useState, useEffect } from "react";
import Header from "./Header";
import "./Memory.css";

const generateCards = (size) => {
  const totalPairs = (size * size) / 2;
  const numbers = Array.from({ length: totalPairs }, (_, i) => i + 1);
  const pairs = [...numbers, ...numbers].sort(() => Math.random() - 0.5);
  return pairs.map((num, index) => ({
    id: index,
    value: num,
    flipped: false,
    matched: false,
  }));
};

export default function MemoryGame({ gridSize, onNewGame }) {
  const [size] = useState(gridSize);
  const [cards, setCards] = useState(generateCards(size));
  const [flippedCards, setFlippedCards] = useState([]);
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [time, setTime] = useState(40);

  // Reset board when gridSize changes
  useEffect(() => {
    setCards(generateCards(size));
    setLives(3);
    setScore(0);
    setTime(40);
  }, [size]);

  // Countdown timer effect
  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);
    return () => clearInterval(timerInterval);
  }, []);

  // Automatically restart game when time runs out
  useEffect(() => {
    if (time <= 0) {
      restartGame();
    }
  }, [time]);

  // Handle flipped cards logic
  useEffect(() => {
    if (flippedCards.length === 2) {
      setIsProcessing(true);
      const [first, second] = flippedCards;
      if (cards[first].value === cards[second].value) {
        setCards((prev) =>
          prev.map((card, i) =>
            i === first || i === second ? { ...card, matched: true } : card
          )
        );
        setScore((prevScore) => prevScore + 1);
      } else {
        setLives((prevLives) => prevLives - 1);
      }
      setTimeout(() => {
        setCards((prev) =>
          prev.map((card, i) =>
            i === first || i === second ? { ...card, flipped: false } : card
          )
        );
        setFlippedCards([]);
        setIsProcessing(false);
      }, 1000);
    }
  }, [flippedCards, cards]);

  const handleClick = (index) => {
    if (isProcessing) return;
    if (
      flippedCards.length < 2 &&
      !cards[index].flipped &&
      !cards[index].matched &&
      lives > 0
    ) {
      setCards((prev) =>
        prev.map((card, i) => (i === index ? { ...card, flipped: true } : card))
      );
      setFlippedCards((prev) => [...prev, index]);
    }
  };

  const restartGame = () => {
    setCards(generateCards(size));
    setLives(3);
    setScore(0);
    setFlippedCards([]);
    setIsProcessing(false);
    setTime(40);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="container">
      <Header onRestart={restartGame} onNewGame={onNewGame} />

      <div className="content-wrapper">
        <div className="timer-display">Time: {formatTime(time)}</div>

        <div className="stats">
          <span className="score">Score: {score}</span>
          <span className="lives">Lives: {lives}</span>
        </div>

        <div
          className="game-board"
          style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
        >
          {cards.map((card) => (
            <div
              key={card.id}
              className={`card ${card.flipped ? "flipped" : ""} ${
                card.matched ? "matched" : ""
              }`}
              onClick={() => handleClick(card.id)}
            >
              <div className="inner">
                <div className="front">{card.value}</div>
                <div className="back"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
