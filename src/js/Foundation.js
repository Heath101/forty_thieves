require('../styles/foundation.scss')

export default class Foundation {
  constructor(el, tableau) {
    this.el = el
    this.tableau = tableau
    this.suit = null
    this.cards = []
    this.currentRank = 0
  }

  attach() {}

  willAccept(card, x,y) {
    if (this.inDropZone(x,y) && this.currentRank <= 13) {
      if ((this.suit == card.suit) || (this.suit == null)) {
        if (this.currentRank + 1 == card.rank) {
          this.suit = card.suit
          return true
        }
      }
    }
    return false
  }

  addCard(card) {
    this.cards.push(card)
    this.currentRank = card.rank
    this.el.appendChild(card.el)
    card.el.style.zIndex = this.cards.length + 20
    card.el.style.left = '0px'
    card.el.style.top = '0px'
  }

  inDropZone(x,y) {
    let bounds = this.el.getBoundingClientRect()
    return y >= bounds.top && y <= bounds.bottom && x >= bounds.left && x <= bounds.right
  }
}
