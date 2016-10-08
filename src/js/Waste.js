require('../styles/Waste.scss')

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
    card.position({top: 0, left: horizontalOffset, z: level + 10})
  }

  willAccept(card) { return false }

  resetCard() {
    let card = this.lastCard
    if (card) {
      let level = this.cards.length - 1
      let horizontalOffset =  24 * level
      card.position({top: 0, left: horizontalOffset, z: level + 10})
    }
  }
}
