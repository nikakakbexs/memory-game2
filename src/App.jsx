import { useState, useEffect } from "react";
import "./index.css";

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

export default function MemoryGame() {
  const [size, setSize] = useState(4);
  const [cards, setCards] = useState(generateCards(size));
  const [flippedCards, setFlippedCards] = useState([]);
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);

  useEffect(() => {
    setCards(generateCards(size));
    setLives(3);
    setScore(0);
  }, [size]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      if (cards[first].value === cards[second].value) {
        setCards((prev) =>
          prev.map((card, i) =>
            i === first || i === second ? { ...card, matched: true } : card
          )
        );
        setScore(score + 1);
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
      }, 1000);
    }
  }, [flippedCards, cards]);

  const handleClick = (index) => {
    if (flippedCards.length < 2 && !cards[index].flipped && !cards[index].matched && lives > 0) {
      setCards((prev) =>
        prev.map((card, i) =>
          i === index ? { ...card, flipped: true } : card
        )
      );
      setFlippedCards([...flippedCards, index]);
    }
  };

  const restartGame = () => {
    setCards(generateCards(size));
    setLives(3);
    setScore(0);
    setFlippedCards([]);
  };

  return (
    <div className="container">
      <h1 className="title">Memory Game</h1>
      <div className="stats">
        <span className="score">Score: {score}</span>
        <span className="lives">Lives: {lives}</span>
      </div>
      <div className="buttons">
        <button className={size === 4 ? "active" : ""} onClick={() => setSize(4)}>4x4</button>
        <button className={size === 6 ? "active" : ""} onClick={() => setSize(6)}>6x6</button>
        <button className={size === 8 ? "active" : ""} onClick={() => setSize(8)}>8x8</button>
      </div>
      <div className="game-board" style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}>
        {cards.map((card) => (
          <div
            key={card.id}
            className={`card ${card.flipped ? "flipped" : ""} ${card.matched ? "matched" : ""}`}
            onClick={() => handleClick(card.id)}>
            <div className="inner">
              <div className="front">{card.value}</div>
              <div className="back"></div>
            </div>
          </div>
        ))}
      </div>
      <div className="controls">
        <button onClick={restartGame} className="restart">Restart</button>
      </div>
    </div>
  );
}
