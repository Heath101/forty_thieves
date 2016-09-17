require('../styles/foundation.scss')

export default class Foundation {
  constructor(el, table) {
    this.el = el
    this.table = table
    this.suit = null
    this.cards = []
    this.order = [
      'ace','2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king'
    ]
  }

  attach() {}

  willAccept(card, x,y) {
    if (this.inDropZone(x,y)) {
      if (this.suit == null) {
        if (card.value == 'ace') {
          this.suit = card.suit
          return true
        }
      } else if (card.suit == this.suit) {
        let lastCard = this.cards[this.cards.length - 1]
        let currentIdx = this.order.indexOf(lastCard.value)
        if (this.order[currentIdx + 1] == card.value) {
          return true
        }
      }
    }
    return false
  }

  addCard(card) {
    this.cards.push(card)
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
