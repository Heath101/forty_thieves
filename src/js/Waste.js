// require('../styles/stock.scss')

export default class Waste {
  constructor(el, playArea) {
    this.waste = []
    this.playArea = playArea
    this.el = el
    this.attach()
  }

  attach() {
    this.el.addEventListener('mousedown', this.mousedown.bind(this))
  }

  mousedown(e) {
    if (this.waste.length != 0) {
      let lastCard = this.waste [this.waste .length - 1]
      let bounds = lastCard.el.getBoundingClientRect()
      let x = e.clientX
      let y = e.clientY
      if (y >= bounds.top && y <= bounds.bottom && x >= bounds.left && x <= bounds.right) {
        let ev = new CustomEvent('moveCard', {'detail': {'card': this.waste .pop(), 'origin': this}})
        document.dispatchEvent(ev)
      }
    }
  }

  addCard(card) {
    let level = this.waste.length
    this.waste.push(card)

    let horizontalOffset =  24 * level
    this.el.appendChild(card.el)
    card.el.style.zIndex = level + 10
    card.el.style.left = horizontalOffset + 'px'
    card.el.style.top = '0px'
  }
}
