require('../styles/card.scss')

export default class Card {
  constructor(el, suit, value, rank) {
    this.el = el
    this.suit = suit
    this.value = value
    this.rank = rank
    this.attach()
  }

  attach() {
    this.el.addEventListener('click', this.click.bind(this))
  }

  click() {
    if (this.el.classList.contains('selected')) {
      this.el.classList.remove('selected')
    } else {
      this.el.classList.add('selected')
    }
  }

  static createCard() {
    let card = document.createElement('div')
    card.className = 'card'
    return card
  }
}
