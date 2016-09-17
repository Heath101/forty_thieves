require('../styles/card.scss')

export default class Card {
  constructor(el, suit, value) {
    this.el = el
    this.suit = suit
    this.value = value
  }

  static createCard() {
    let card = document.createElement('div')
    card.className = 'card'
    return card
  }
}
