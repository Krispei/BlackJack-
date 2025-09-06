import { useState, useEffect} from 'react'
import { createDeck } from './helperFunctions/createDeck'
import { calculateScore } from './helperFunctions/calculateScore'
import { pause } from './helperFunctions/puase'
import Deck from "./components/Deck"
import Stats from './components/Stats'
import CardHandler from './CardHandler'
import './App.css'

function App() {
  const decks = 5
  const [deck, setDeck] = useState(() => createDeck(decks));
  const [dealerCards, setDealerCards] = useState([]);
  const [dealerScore, setDealerScore] = useState(null);
  const [playerCards, setPlayerCards] = useState([]);
  const [playerScore, setPlayerScore] = useState(null);
  const [handsPlayed, setHandsPlayed] = useState(0);
  const [wins, setWins] = useState(0);
  const [inGame, setInGame] = useState(false);
  const [playerTurn, setPlayerTurn] = useState(false);
  const [winner, setWinner] = useState(0); //0 for nothing, 1 for player, 2 for dealer, 3 for tie

  useEffect(() => {
      if (deck.length < (0.5 * decks * 52)) {
        setDeck(createDeck(decks));
      }

      if (!playerTurn && inGame) {
        const runDealer = async () => {
          let updatedDealerCards = [...dealerCards];
          let updatedDeck = [...deck];

          await pause(100); 
          // Reveal hidden card
          if (updatedDealerCards[1]) {
            updatedDealerCards[1][2] = false;
          }
          setDealerCards([...updatedDealerCards]); // Trigger render to reveal card

          let dynamicDealerScore = calculateScore(updatedDealerCards);
          setDealerScore(dynamicDealerScore);


          // Dealer draws until score >= 17
          while (calculateScore(updatedDealerCards) < 17) {
            await pause(500); // Pause before each card draw
            const card = updatedDeck.pop();
            updatedDealerCards.push(card);
            dynamicDealerScore = calculateScore(updatedDealerCards);
            setDealerScore(dynamicDealerScore)
            setDealerCards([...updatedDealerCards]); // Update state
            setDeck([...updatedDeck]);
          }

          const finalDealerScore = calculateScore(updatedDealerCards);
          setDealerScore(finalDealerScore);

          await pause(500)
          // Determine winner
          if (playerScore > finalDealerScore || finalDealerScore > 21) {
            setWinner(1); // player wins
            setWins(prev => prev+1);
          } else if (playerScore === finalDealerScore) {
            setWinner(3); // tie
          } else {
            setWinner(2); // dealer wins
          }
          setHandsPlayed(prev => prev+1);
          setInGame(false);
        };

        runDealer();
      }
    }, [playerTurn, inGame]);



      async function deal() {
        
        if (inGame) return;
        
        const notEmpty = (playerCards.length != 0 || dealerCards.length != 0);

        setWinner(0);
        setPlayerCards([]);
        setDealerCards([]);
        setPlayerScore(0);
        setDealerScore(0);

        if (notEmpty) await pause(300);

        const newDeck = [...deck];

        const playerCard1 = newDeck.pop();
        let newPlayerCards = [playerCard1];
        const dealerCard1 = newDeck.pop();
        let newDealerCards = [dealerCard1];
        setPlayerCards(newPlayerCards);
        setPlayerScore(calculateScore(newPlayerCards));
        setDealerCards(newDealerCards);
        setDealerScore(calculateScore(newDealerCards));
        await pause(200)
        const playerCard2 = newDeck.pop();
        newPlayerCards = [playerCard1, playerCard2];
        const dealerCard2 = newDeck.pop();
        dealerCard2[2] = true; //makes the dealers second card face down
        newDealerCards = [dealerCard1,dealerCard2];
        setDealerCards(newDealerCards);
        setDealerScore(calculateScore(newDealerCards));
        setPlayerCards(newPlayerCards);
        setPlayerScore(calculateScore(newPlayerCards));
        await pause(200)

        setDeck(newDeck);
        setInGame(true);
        setPlayerTurn(true);

        if (calculateScore(newPlayerCards) == 21) {
          
          newDealerCards[1][2] = false;
          setDealerCards(newDealerCards);
          setDealerScore(calculateScore(newDealerCards));
          await pause(200);

          if (calculateScore(newDealerCards) != 21) {
            setWinner(1);
          } else {
            setWinner(3);
          }
          
          setHandsPlayed(prev => prev+1);
          setInGame(false);
          setPlayerTurn(false);
    } 
    
  }


  async function hit() {

    if (!playerTurn) return;

    const newDeck = [...deck];  
    const hitCard = newDeck.pop();

    const newPlayerCards = [...playerCards, hitCard]
    const newPlayerScore = calculateScore(newPlayerCards)

    setPlayerCards(newPlayerCards);
    setPlayerScore(newPlayerScore);
    setDeck(newDeck);

    if (newPlayerScore > 21) {
      console.log("player busted!")
      setInGame(false);
      setPlayerTurn(false);
      await pause(300)
      setWinner(2);
      setHandsPlayed(prev => prev+1);
    } 
  }

  function stand() {

    if (!playerTurn) return;
    setPlayerTurn(false);

  }


  return (
    <div id='screen'>
      <div id='stats_box' className='section'>
        <Stats handsPlayed={handsPlayed} cardsRemaining={deck.length} wins={wins} winRatio={(wins/handsPlayed).toFixed(2)} />
      </div>
      <div id='title' className='section'>BlackJack!</div>
      <div id='dealer' className='section'>
        <CardHandler cards={dealerCards} score={dealerScore} win={winner==2 || winner==3} DealerOrPlayer={"dealer"}/>
      </div>
      <div id='decksection' className='section'>
        <Deck />
      </div>
      <div id='player' className='section'>
        <CardHandler cards={playerCards} score={playerScore} win={winner==1 || winner==3} DealerOrPlayer={"player"}/>
      </div>
      <div id='playerControl' className='section'>
        <div id="playerButtons">
          <button id='hit' className={(inGame && playerTurn) ? 'button button--active' : 'button button--inactive'} onClick={hit}>Hit</button>
          <button id='deal' className={!inGame ? 'button button--active' : 'button button--inactive'} onClick={deal}>Deal</button>
          <button id='stand' className={(inGame && playerTurn) ? 'button button--active' : 'button button--inactive'} onClick={stand}>Stand</button>
        </div>
      </div>
    </div>
  )
}

export default App


