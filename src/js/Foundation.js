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
    card.el.style.zIndex = this.cards.length + 20
    card.el.style.left = '0px'
    card.el.style.top = '0px'
  }

  // this overrides the fn in CardPile.  Needs custom logic about reseting state
  draw() {
    let card = this.cards.pop()
    this.el.removeChild(card.el)
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
      card.el.style.zIndex = this.cards.length + 20
      card.el.style.left = '0px'
      card.el.style.top = '0px'
    }
  }
}
