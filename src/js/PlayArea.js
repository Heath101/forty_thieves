require('../styles/play-area.scss')

import Stock from './Stock.js'
import Waste from './Waste.js'

export default class PlayArea {
  constructor(el, moveList) {
    this.el = el
    this.moveList = moveList
    this.stock = this.create(Stock, 'stock')
    this.waste = this.create(Waste, 'waste')
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
    let ev = new CustomEvent('dropZone:deselected', {'detail': {'dropZone': this.waste}})
    document.dispatchEvent(ev)
    this.moveList.add({
      move: this.moveStockToWaste.bind(this, card),
      undo: this.moveCardToStock.bind(this,card)
    })
  }

  moveStockToWaste(card) {
    this.waste.add(card)
  }

  moveCardToStock(card) {
    this.stock.add(card)
    this.waste.draw()
  }
}
