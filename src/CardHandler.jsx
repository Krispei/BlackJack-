import React from "react";
import Card from "./components/Card";
import Filler from "./components/Filler";
import { pause } from "./helperFunctions/puase";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./cardAnimations.css";

export default function CardHandler({ cards, score, win }) {

  return (
    <div id="containerStyle" className={win ? "winStyle" : ""}>
      {win && <div id="highlight"></div>}
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
      </div>
      
      {score != null && <p id="scoreStyle">{score}</p>}

      
      
    </div>
  );
}