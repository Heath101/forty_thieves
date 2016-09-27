// require('../styles/stock.scss')

export default class Waste {
  constructor(el, playArea) {
    this.waste = []
    this.playArea = playArea
    this.el = el
    this.attach()
  }

  attach() {
    // this.el.addEventListener('click', this.click.bind(this))
  }

  // click(e) {
  //   this.playArea.play(this.stock.pop())
  // }

  play(card) {
    let level = this.waste.length
    this.waste.push(card)

    let horizontalOffset =  24 * level
    this.el.appendChild(card.el)
    card.el.style.zIndex = level + 10
    card.el.style.left = horizontalOffset + 'px'
    card.el.style.top = '0px'
  }
}
