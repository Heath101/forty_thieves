require('../styles/column.scss')

export default class Column {
  constructor(el) {
    this.el = document.getElementById(el)
    this.cards = []
    this.attach()
  }

  attach() { }

  contains(x,y) {
    let bounds = this.el.getBoundingClientRect()
    return y >= bounds.top && y <= bounds.bottom && x >= bounds.left && x <= bounds.right
  }

  hasCard(c) {
    return this.cards.some(function(card) {
      return c.id == card.id
    })
  }

  addCard(card) {
    let level = this.cards.length
    this.cards.push(card)
    let vertOffset =  50 * level
    card.el.style.zIndex = level + 10
    card.el.style.left = this.el.offsetLeft + 'px'
    card.el.style.top = this.el.offsetTop + vertOffset + 'px'
  }

  removeCard(card) {
    this.cards.pop()
  }
}
