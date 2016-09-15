require('../styles/column.scss')

export default class Column {
  constructor(el) {
    this.el = document.getElementById(el)
    this.attach()
  }

  attach() {
  }

  contains(x,y) {
    let bounds = this.el.getBoundingClientRect()
    return y >= bounds.top && y <= bounds.bottom && x >= bounds.left && x <= bounds.right
  }

  addCard(card) {
    card.el.style.left = this.el.offsetLeft + 'px'
    card.el.style.top = this.el.offsetTop + 'px'
  }
}
