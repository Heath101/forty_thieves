require('../styles/cascade.scss')

export default class Cascade {
  constructor(el, tableau) {
    this.el = el
    this.tableau = tableau
    this.cards = []
    this.attach()
  }

  attach() {
    this.el.addEventListener('mousedown', this.mousedown.bind(this))
  }

  mousedown(e) {
    if (this.cards.length != 0) {
      let lastCard = this.cards[this.cards.length - 1]
      let bounds = lastCard.el.getBoundingClientRect()
      let x = e.clientX
      let y = e.clientY
      if (y >= bounds.top && y <= bounds.bottom && x >= bounds.left && x <= bounds.right) {
        let ev = new CustomEvent('moveCard', {'detail': {'card': this.cards.pop(), 'originCascade': this}})
        document.dispatchEvent(ev)
      }
    }
  }

  contains(x,y) {
    let bounds = this.el.getBoundingClientRect()
    return y >= bounds.top && y <= bounds.bottom && x >= bounds.left && x <= bounds.right
  }

  hasCard(c) {
    return this.cards.some((card) => c.id == card.id )
  }

  addCard(card) {
    let level = this.cards.length
    this.cards.push(card)
    let vertOffset =  50 * level
    this.el.appendChild(card.el)
    card.el.style.zIndex = level + 10
    card.el.style.left = '0px'
    card.el.style.top = vertOffset + 'px'
  }
}
