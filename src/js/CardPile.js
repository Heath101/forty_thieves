export default class CardPile {
  constructor(el) {
    this.el = el
    this.cards = []
    this.attach()
  }

  attach() {
    this.el.addEventListener('mousedown', this.mousedown.bind(this))
    this.el.addEventListener('mouseup', this.mouseup.bind(this))
    document.addEventListener('move:undo', this.moveUndo.bind(this))
  }

  mousedown(e) {
    if (this.lastCard != null && this.isAboveLastCard(e.clientX, e.clientY)) {
      let ev = new CustomEvent('card:pickup', {'detail': {'origin': this, 'card': this.lastCard}})
      document.dispatchEvent(ev)
    }
  }

  mouseup(e) {
    e.stopPropagation()
    let ev = new CustomEvent('card:drop', {'detail': {'target': this}})
    document.dispatchEvent(ev)
  }

  get lastCard() {
    return this.cards[this.cards.length - 1]
  }

  willAccept(card) {
    throw 'Must implement the function `willAccept(1)`'
  }

  add(card) {
    throw 'Must implement the function add(1)'
  }

  resetCard() {
    throw 'Must implement the function resetCard()'
  }

  draw() {
    let card = this.cards.pop()
    card.deselect()
    this.el.removeChild(card.el)
    return card
  }

  activate() {
    this.lastCard.select()
  }

  deactivate() {
    this.cards.forEach( card => card.deselect() )
  }

  swap(target) {
    return (function() { target.add(this.draw()) }.bind(this))
  }

  moveUndo(e) {
    this.deactivate()
  }

  isAboveLastCard(x, y) {
    let area = (this.cards.length != 0) ? this.lastCard.el : this.el
    let bounds = area.getBoundingClientRect()
    return y >= bounds.top && y <= bounds.bottom && x >= bounds.left && x <= bounds.right
  }

  static move(origin, target) {
    let ev = new CustomEvent('move:add', {
      'detail': {
        move: origin.swap(target),
        undo: target.swap(origin)
      }
    })
    document.dispatchEvent(ev)
  }
}
