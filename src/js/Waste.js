require('../styles/waste.scss')

import CardPile from './CardPile.js'

export default class Waste extends CardPile {
  constructor(el, playArea) {
    super(el)
    this.playArea = playArea
  }

  add(card) {
    let level = this.cards.length
    this.cards.push(card)

    let horizontalOffset =  24 * level
    this.el.appendChild(card.el)
    card.el.style.zIndex = level + 10
    card.el.style.left = horizontalOffset + 'px'
    card.el.style.top = '0px'
  }

  willAccept(card) { return false }

  resetCard() {
    let card = this.lastCard()
    let level = this.cards.length - 1
    let horizontalOffset =  24 * level
    card.el.style.zIndex = level + 10
    card.el.style.left = horizontalOffset + 'px'
    card.el.style.top = '0px'
  }
}
