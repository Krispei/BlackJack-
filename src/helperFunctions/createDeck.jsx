export function createDeck(numDecks) {

  const ranks = [2,3,4,5,6,7,8,9,10,11,12,13,14];
  const suits = ["h","d","c","s"];
  const facedown = [true,false];

  let shoe = [];

  for (let i = 0; i < numDecks; i++) {
    ranks.forEach(rank => {
      suits.forEach(suit => {
        shoe.push([rank,suit,facedown[1]]);
      });
    });
  }

  //shuffling
  for (let i = shoe.length-1; i >= 0; i--) {
    let j = Math.floor(Math.random() * (i+1));
    [shoe[i], shoe[j]] = [shoe[j], shoe[i]];
  }

  return shoe;

}