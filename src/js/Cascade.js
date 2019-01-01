import CardPile from './CardPile.js'

require('../styles/Cascade.scss')

export default class Cascade extends CardPile {
  willAccept (card) {
    if (this.cards.length === 0) { return true }
    let topCard = this.lastCard
    if (topCard.suit === card.suit && topCard.rank - 1 === card.rank) { return true }
    return false
  }

  add (card) {
    let level = this.cards.length
    this.cards.push(card)
    let vertOffset = 44 * level
    this.el.appendChild(card.el)
    card.position({ top: vertOffset, left: 0, z: level + 10 })
  }

  resetCard () {
    let level = this.cards.length - 1
    let vertOffset = 44 * level
    let card = this.lastCard
    if (card) {
      card.position({ top: vertOffset, left: 0, z: level + 10 })
    }
  }
}
