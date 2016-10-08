require('../styles/Card.scss')

export default class Card {
  constructor(el, suit, value, rank) {
    this.el = el
    this.suit = suit
    this.value = value
    this.rank = rank
  }

  select() {
    this.el.classList.add('selected')
  }

  deselect() {
    this.el.classList.remove('selected')
  }

  beginMoving() {
    this.el.style.pointerEvents = 'none'
    this.el.style.zIndex = 1000
  }

  endMoving() {
    this.el.style.pointerEvents = ''
  }

  position(pos) {
    let top  = pos['top'],
        left = pos['left'],
        z    = pos['z']
    if (top != null) { this.el.style.top = `${top}px` }
    if (left != null) { this.el.style.left = `${left}px` }
    if (z != null) { this.el.style.zIndex = z }
  }
}
