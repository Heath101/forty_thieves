require('../styles/play-area.scss')

import Stock from './Stock.js'
import Waste from './Waste.js'

export default class PlayArea {
  constructor(el) {
    this.el = el
    this.stock = this.createStock()
    this.waste = this.createWaste()
    this.attach()
  }

  attach() {
    // this.el.addEventListener('click', ()=> {
    //   console.log("stock called");
    // })
  }

  addStock(cards) {
    this.stock.add(cards)
  }

  createStock() {
    let stockEl = document.createElement('div')
    stockEl.className = 'stock'
    this.el.appendChild(stockEl)
    return new Stock(stockEl, this)
  }

  createWaste() {
    let wasteEl = document.createElement('div')
    wasteEl.className = 'waste'
    this.el.appendChild(wasteEl)
    return new Waste(wasteEl, this)
  }

  play(card) {
    this.waste.addCard(card)
  }
}
