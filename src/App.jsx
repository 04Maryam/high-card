import "./App.css";
import { makeShuffledDeck } from "./utils.jsx";
import { useState } from "react";
import PlayingCard from "./PlayingCard";
import { Button } from "react-bootstrap";

function App(props) {
  // Set default value of card deck to new shuffled deck
  const [cardDeck, setCardDeck] = useState(makeShuffledDeck());
  // currCards holds the cards from the current round
  const [currCards, setCurrCards] = useState([]);

  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const [totalWins, setTotalWins] = useState({ player1: 0, player2: 0 });

  const dealCards = () => {
    if (cardDeck.length < 2) {
      setGameOver(true);
      if (player1Score > player2Score) {
        setTotalWins({ ...totalWins, player1: totalWins.player1 + 1 });
      } else if (player2Score > player1Score) {
        setTotalWins({ ...totalWins, player2: totalWins.player2 + 1 });
      }
      return;
    }
    const newCurrCards = [cardDeck.pop(), cardDeck.pop()];
    setCurrCards(newCurrCards);
    setCardDeck([...cardDeck]);

    if (newCurrCards[0].rank > newCurrCards[1].rank) {
      setPlayer1Score(player1Score + 1);
    } else if (newCurrCards[0].rank < newCurrCards[1].rank) {
      setPlayer2Score(player2Score + 1);
    }
  };
  // You can write JavaScript here, just don't try and set your state!

  const restartGame = () => {
    setCardDeck(makeShuffledDeck());
    setCurrCards([]);
    setPlayer1Score(0);
    setPlayer2Score(0);
    setGameOver(false);
  };

  // You can access your current components state here, as indicated below
  // const currCardElems = currCards.map(({ name, suit }) => (
  //   // Give each list element a unique key
  //   <div key={`${name}${suit}`}>
  //     {name} of {suit}
  //   </div>
  // ));

  return (
    <div className="container game-container">
      <header>
        {/* <div className="card"> */}
        <h2>React High Card 🚀</h2>
      </header>
      <div className="d-md-flex g-6 mx-auto">
        <div className="card-container">
          <div className="d-flex g-5 mb-3 justify-content-center align-items-center score">
            <div>
              <h4>Player 1</h4>
            </div>
            <div>
              <h6 className="text-muted">Score: {player1Score}</h6>
            </div>
            <div>
              <h6 className="text-muted">Total Wins: {totalWins.player1}</h6>
            </div>
          </div>
          {currCards.length > 0 && (
            <div className="d-flex justify-content-center">
              <PlayingCard card={currCards[0]} />
            </div>
          )}
        </div>
        <div className="card-container">
          <div className="d-flex g-5 mb-3 justify-content-center align-items-center score">
            <div>
              <h4>Player 2</h4>
            </div>
            <div>
              <h6 className="text-muted">Score: {player2Score}</h6>
            </div>
            <div>
              <h6 className="text-muted">Total Wins: {totalWins.player2}</h6>
            </div>
          </div>
          {currCards.length > 0 && (
            <div className="d-flex justify-content-center">
              <PlayingCard card={currCards[1]} />
            </div>
          )}
        </div>
      </div>
      {gameOver ? (
        <div>
          <h3>Game Over!</h3>
          <h4>
            {player1Score > player2Score ? "Player 1 wins!" : "Player 2 wins!"}
          </h4>
          <Button className="primary" onClick={restartGame}>
            Restart
          </Button>
        </div>
      ) : (
        <div>
          <Button className="success" onClick={dealCards}>
            Deal
          </Button>
        </div>
      )}
    </div>
  );
}

export default App;
