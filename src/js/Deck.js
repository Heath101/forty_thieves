import Card from './Card.js'

export default class Deck {
  constructor() { }

  static generate() {
    let cards = []
    let suits = ['spades','diamonds','hearts','clubs']
    let values = ['ace','2','3','4','5','6','7','8','9','10','jack','queen','king']

    while (suits.length != 0) {
      let suit = suits.pop()
      let rank = 1
      values.forEach(function(value) {
        let card = document.createElement('div')
        card.className = 'card ' + suit + '-' + value;

        cards.push(new Card(card, suit, value, rank))
        rank += 1
      })
    }
    return cards
  }

  static shuffle(deck) {
    let i = 0,
        j = 0,
        temp = null

    for (i = deck.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1))
      temp = deck[i]
      deck[i] = deck[j]
      deck[j] = temp
    }
  }
}
