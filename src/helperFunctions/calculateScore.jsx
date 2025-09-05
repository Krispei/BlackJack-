export function calculateScore(cards) {
  let total = 0;
  let aces = 0;


  for (const [rank, suit, facedown] of cards) {
    if (facedown) {
      continue;
    }

    if (rank === 14) {   
      total += 11;
      aces += 1;
    } else if (rank > 10) {   
      total += 10;
    } else {
      total += rank;
    }
  }

  // Adjust for Aces if total > 21
  while (total > 21 && aces > 0) {
    total -= 10;  // convert one Ace from 11 → 1
    aces -= 1;
  }

  return total;
}