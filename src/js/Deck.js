import Card from './Card.js'

export default class Deck {
  constructor() { }

  static generateDeck() {
    let cards = []
    let suits = ['spades','diamonds','hearts','clubs']
    let vals = ['ace','2','3','4','5','6','7','8','9','10','jack','queen','king']

    while (suits.length != 0) {
      let suit = suits.pop()
      vals.forEach(function(val) {
        let card = document.createElement('div')
        card.className = 'card ' + suit + '-' + val;

        cards.push(new Card(card, suit, val))
      })
    }
    return cards
  }

  static shuffle (array) {
    let i = 0,
        j = 0,
        temp = null

    for (i = array.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1))
      temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }
  }
}
