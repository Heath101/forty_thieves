require('../styles/stock.scss')

export default class Stock {
  constructor(cards) {
    this.stock = cards
  }

  pop() {
    return this.stock.pop()
  }
}
