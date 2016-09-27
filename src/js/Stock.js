require('../styles/stock.scss')

export default class Stock {
  constructor(el, playArea) {
    this.stock = []
    this.playArea = playArea
    this.el = el
    this.attach()
  }

  attach() {
    this.el.addEventListener('click', this.click.bind(this))
  }

  click(e) {
    this.playArea.play(this.stock.pop())
  }

  add(cards) {
    this.stock = cards
  }
}
