import "./Card.css"

function RenderedCard({rank, suit, isFaceDown}) {
  if (isFaceDown) {
    return(
      <div className="faceDownCard"></div>
    )
  } else {
    return (
      <div className={suit == "♥" || suit == "♦" ? "card red" : "card black"}>
        <p className="rank">{rank}</p>
        <p className="suit">{suit}</p>
      </div>
    );
  }
}


export default function Card({ card }) {
  const suitLookup = { h: "♥", c: "♣", s: "♠", d: "♦" };
  const faceLookup = { 11: "J", 12: "Q", 13: "K", 14: "A" };
  const rank = faceLookup[card[0]] ?? card[0];
  const suit = suitLookup[card[1]];
  const isFaceDown = card[2];


  return (
    <RenderedCard rank={rank} suit={suit} isFaceDown={isFaceDown} />
  )

  
}