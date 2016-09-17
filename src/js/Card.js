require('../styles/card.scss')

export default class Card {
  constructor(elementId, id) {
    this.el = document.getElementById(elementId)
    this.id = id
  }

  static createCard() {
    let card = document.createElement('div')
    card.className = 'card'
    return card
  }

  id() {
    return this.id
  }
}
