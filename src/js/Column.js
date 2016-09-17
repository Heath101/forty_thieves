require('../styles/column.scss')
import Card from './Card.js'

export default class Column {
  constructor(el, tableau, id) {
    this.el = document.getElementById(el)
    this.tableau = tableau
    this.id = id
    this.cards = []
    this.addCard(Card.createCard())
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
        let ev = new CustomEvent('moveCard', {'detail': {'card': this.cards.pop(), 'originColumn': this}})
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
    card.style.left = '20px'
    card.style.top = 20 + vertOffset + 'px'
  }
}
