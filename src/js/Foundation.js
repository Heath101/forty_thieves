require('../styles/Foundation.scss')

import CardPile from './CardPile.js'

export default class Foundation extends CardPile {
  constructor(el) {
    super(el)
    this.suit = null
    this.currentRank = 0
  }

  willAccept(card) {
    if (this.currentRank <= 13) {
      if ((this.suit == card.suit) || (this.suit == null)) {
        if (this.currentRank + 1 == card.rank) {
          this.suit = card.suit
          return true
        }
      }
    }
    return false
  }

  add(card) {
    this.cards.push(card)
    this.currentRank = card.rank
    this.el.appendChild(card.el)
    card.position({top: 0, left: 0, z: this.cards.length + 20})
    document.dispatchEvent(new CustomEvent('foundation:add'))
  }

  // this overrides the fn in CardPile.  Needs custom logic about reseting state
  draw() {
    let card = this.cards.pop()
    this.el.removeChild(card.el)
    document.dispatchEvent(new CustomEvent('foundation:draw'))
    if (this.cards.length == 0) {
      this.suit = null
      this.currentRank = 0
    } else {
      this.currentRank = card.rank - 1
    }
    return card
  }

  resetCard() {
    let card = this.lastCard
    if (card) {
      this.currentRank = this.currentRank - 1
      card.position({top: 0, left: 0, z: this.cards.length + 20})
    }
  }
}
