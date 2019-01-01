import Stock from './Stock.js'
import Waste from './Waste.js'

require('../styles/PlayArea.scss')

export default class PlayArea {
  constructor (el) {
    this.el = el
    this.stock = this.create(Stock, 'Stock')
    this.waste = this.create(Waste, 'Waste')
  }

  addStock (cards) {
    this.stock.populate(cards)
  }

  create (type, styleClass) {
    let el = document.createElement('div')
    el.className = styleClass
    this.el.appendChild(el)
    return new type(el, this)
  }

  play (card) {
    let ev = new CustomEvent('move:add', {
      'detail': {
        move: this.moveStockToWaste.bind(this, card),
        undo: this.moveCardToStock.bind(this, card)
      }
    })
    document.dispatchEvent(ev)
  }

  reset () {
    let ev = new CustomEvent('move:add', {
      'detail': {
        move: this.moveAllWasteToStock.bind(this),
        undo: this.moveAllStockToWaste.bind(this)
      }
    })
    document.dispatchEvent(ev)
  }

  moveAllWasteToStock () {
    this.stock.cards = this.waste.cards.reverse()
    this.waste.cards = []
    this.waste.el.innerHTML = ''
  }

  moveAllStockToWaste () {
    this.stock.cards.reverse().forEach(card => {
      this.waste.add(card)
    })
    this.stock.cards = []
    this.stock.reset()
  }

  moveStockToWaste (card) {
    this.waste.add(card)
  }

  moveCardToStock (card) {
    this.stock.add(card)
    this.waste.draw()
  }
}
