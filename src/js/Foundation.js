require('../styles/foundation.scss')

export default class Foundation {
  constructor(el, table) {
    this.el = el
    this.table = table
    this.cards = []
  }

  attach() {}

  contains(x,y) {
    let bounds = this.el.getBoundingClientRect()
    return y >= bounds.top && y <= bounds.bottom && x >= bounds.left && x <= bounds.right
  }

  addCard(card) {
    this.cards.push(card)
    this.el.appendChild(card.el)
    card.el.style.zIndex = this.cards.length + 20
    card.el.style.left = '0px'
    card.el.style.top = '0px'
  }
}
