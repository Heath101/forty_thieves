require('../styles/card.scss')

export default class Card {
  constructor(el, suit, value, rank) {
    this.el = el
    this.suit = suit
    this.value = value
    this.rank = rank
  }

  static createCard() {
    let card = document.createElement('div')
    card.className = 'card'
    return card
  }
}
