import React from "react";
import Card from "./components/Card";
import Filler from "./components/Filler";
import { pause } from "./helperFunctions/puase";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./cardAnimations.css";

export default function CardHandler({ cards, score, win, DealerOrPlayer }) {

  return (
    <div id="containerStyle" className={win ? "winStyle" : ""}>

      {(DealerOrPlayer == "player" && score != null) && <p id="scoreStyle">{score}</p>}
      <div id="cardsStyle">
        <TransitionGroup component={null}>
          {cards.map((oneCard, i) => {
            const ref = React.createRef();

            return (
              <CSSTransition
                key={i}
                timeout={300}
                classNames="fade"
                nodeRef={ref}
              >
                <div ref={ref}>
                  <Card card={oneCard} />
                </div>
              </CSSTransition>
            );
          })}
        </TransitionGroup>
        {win && <div id="highlight"></div>}

      </div>
      
      {(DealerOrPlayer == "dealer" && score != null) && <p id="scoreStyle">{score}</p>}

      
      
    </div>
  );
}