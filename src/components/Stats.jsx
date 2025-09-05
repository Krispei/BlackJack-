import "./Stats.css"

export default function Stats({handsPlayed, cardsRemaining, wins, winRatio}) {
    return (
    <div id="stats">
        <p id="handsPlayed">Hands Played: {handsPlayed} </p>
        <p id="cardsRemaining">Cards Remaining: {cardsRemaining} </p>
        <p id="wins">Wins: {wins} </p>
        <p id="winRatio">Win Ratio: {winRatio} </p>
    </div>
    )
}