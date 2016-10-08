require('../styles/Stock.scss')

export default class Stock {
  constructor(el, playArea) {
    this.el = el
    this.playArea = playArea
    this.attach()
  }

  attach() {
    this.el.addEventListener('click', this.click.bind(this))
    document.addEventListener('keydown', this.keydown.bind(this))
  }

  click(e) {
    if (this.cards.length == 0) { // no more cards in deck
      this.playArea.reset()
    } else {
      this.playArea.play(this.cards.pop())
    }
    this.el.innerHTML = this.cards.length
  }

  keydown(e) {
    if (e.which == 13) { this.click(e) }
  }

  add(card) {
    this.cards.push(card)
    this.el.style.background = "";
    this.el.innerHTML = this.cards.length
  }

  populate(cards) {
    this.cards = cards
  }
}
