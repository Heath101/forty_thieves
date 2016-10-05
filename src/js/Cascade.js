require('../styles/cascade.scss')

import CardPile from './CardPile.js'

export default class Cascade extends CardPile {
  constructor(el) {
    super(el)
  }

  willAccept(card) {
    if (this.cards.length == 0) { return true }
    let topCard = this.lastCard()
    if  (topCard.suit == card.suit &&
        topCard.rank - 1 == card.rank
      ) { return true }
    return false
  }

  add(card) {
    let level = this.cards.length
    this.cards.push(card)
    let vertOffset =  44 * level
    this.el.appendChild(card.el)
    card.el.style.zIndex = level + 10
    card.el.style.left = '0px'
    card.el.style.top = vertOffset + 'px'
  }

  resetCard() {
    let level = this.cards.length - 1
    let vertOffset =  44 * level
    let card = this.lastCard()
    card.el.style.zIndex = level + 10
    card.el.style.left = '0px'
    card.el.style.top = vertOffset + 'px'
  }
}
