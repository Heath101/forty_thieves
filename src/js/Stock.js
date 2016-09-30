require('../styles/stock.scss')

import CardPile from './CardPile.js'

export default class Stock extends CardPile {
  constructor(el, playArea) {
    super(el)
    this.playArea = playArea
  }

  click(e) {
    if (this.cards.length > 0)  { this.playArea.play(this.cards.pop()) }
    if (this.cards.length == 0) { this.el.style.background = "rgba(0,0,0,.3)" }
    this.el.innerHTML = this.cards.length
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
