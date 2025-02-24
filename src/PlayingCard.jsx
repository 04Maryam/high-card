import react from "react";
import Card from "react-bootstrap/Card";

const PlayingCard = ({ card }) => {
  if (!card) return null;

  return (
    <Card className="text-center m-2" style={{ width: "180px" }}>
      <Card.Body>
        <Card.Title>{card.name}</Card.Title>
        <Card.Text>{card.suit}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default PlayingCard;
