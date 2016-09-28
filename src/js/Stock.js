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
    if (this.stock.length != 0) {
      this.playArea.play(this.stock.pop())
      this.el.innerHTML = this.stock.length
    } else {
      this.el.style.background = "rgba(0,0,0,.3)";
    }
  }

  add(card) {
    this.stock.push(card)
    this.el.innerHTML = this.stock.length
  }

  populate(cards) {
    this.stock = cards
  }
}
