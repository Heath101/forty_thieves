require('../styles/PlayArea.scss')

import Stock from './Stock.js'
import Waste from './Waste.js'

export default class PlayArea {
  constructor(el, moveList) {
    this.el = el
    this.moveList = moveList
    this.stock = this.create(Stock, 'Stock')
    this.waste = this.create(Waste, 'Waste')
  }

  addStock(cards) {
    this.stock.populate(cards)
  }

  create(type, styleClass) {
    let el = document.createElement('div')
    el.className = styleClass
    this.el.appendChild(el)
    return new type(el, this)
  }

  play(card) {
    this.moveList.add({
      move: this.moveStockToWaste.bind(this, card),
      undo: this.moveCardToStock.bind(this,card)
    })
  }

  reset() {
    this.stock.cards = this.waste.cards.reverse()
    this.waste.cards = []
    this.waste.el.innerHTML = ''
    this.stock.el.style.background = "";
  }

  moveStockToWaste(card) {
    this.waste.add(card)
  }

  moveCardToStock(card) {
    this.stock.add(card)
    this.waste.draw()
  }
}
