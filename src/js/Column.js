require('../styles/column.scss')

export default class Column {
  constructor(el) {
    this.el = document.getElementById(el)
    this.level = 0
    this.attach()
  }

  attach() {}

  contains(x,y) {
    let bounds = this.el.getBoundingClientRect()
    return y >= bounds.top && y <= bounds.bottom && x >= bounds.left && x <= bounds.right
  }

  addCard(card) {
    let vertOffset =  50 * this.level
    card.el.style.zIndex = this.level + 10
    card.el.style.left = this.el.offsetLeft + 'px'
    card.el.style.top = this.el.offsetTop + vertOffset + 'px'
    this.level += 1
  }
}
