require('../styles/tableau.scss')

export default class Tableau {
  constructor(el, table, id) {
    this.el = el
    this.table = table
    this.id = id
    this.cards = []
    this.attach()
  }

  attach() {
    this.el.addEventListener('mousedown', this.mousedown.bind(this))
  }

  mousedown(e) {
    if (this.cards.length != 0) {
      let lastCard = this.cards[this.cards.length - 1]
      let bounds = lastCard.getBoundingClientRect()
      let x = e.clientX
      let y = e.clientY
      if (y >= bounds.top && y <= bounds.bottom && x >= bounds.left && x <= bounds.right) {
        let ev = new CustomEvent('moveCard', {'detail': {'card': this.cards.pop(), 'originTableau': this}})
        document.dispatchEvent(ev)
      }
    }
  }

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
    this.el.appendChild(card)
    card.style.zIndex = level + 10
    card.style.left = '0px'
    card.style.top = vertOffset + 'px'
  }
}
