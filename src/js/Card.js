require('../styles/Card.scss')

export default class Card {
  constructor(el, suit, value, rank) {
    this.el = el
    this.suit = suit
    this.value = value
    this.rank = rank
  }

  select() {
    this.el.classList.add('selected')
  }

  deselect() {
    this.el.classList.remove('selected')
  }
}
