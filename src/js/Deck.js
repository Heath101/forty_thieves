import Card from './Card.js'

export default class Deck {
  static generate (decks = 1) {
    let cards = []
    for (let i = 1; i <= decks; i++) {
      cards = cards.concat(Deck.create())
    }
    return cards
  }

  static create () {
    let cards = []
    const suits = ['spades', 'diamonds', 'hearts', 'clubs']
    const values = ['ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king']

    while (suits.length !== 0) {
      let suit = suits.pop()
      let rank = 1
      values.forEach((value) => {
        let card = document.createElement('div')
        card.className = `Card ${suit}-${value}`

        cards.push(new Card(card, suit, value, rank))
        rank += 1
      })
    }
    return cards
  }

  static shuffle (deck) {
    let i = 0
    let j = 0
    let temp = null

    for (i = deck.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1))
      temp = deck[i]
      deck[i] = deck[j]
      deck[j] = temp
    }
  }
}
