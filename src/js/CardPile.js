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
    let ev = new CustomEvent('card:pickup', {'detail': {'origin': this, 'card': this.lastCard()}})
    document.dispatchEvent(ev)
  }

  mouseup(e) {
    let ev = new CustomEvent('card:drop', {'detail': {'target': this}})
    document.dispatchEvent(ev)
  }

  lastCard() {
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
    this.el.removeChild(card.el)
    return card
  }

  activate() {
    this.lastCard().select()
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

  static move(origin, target) {
    window.moveList.add({
      move: origin.swap(target),
      undo: target.swap(origin)
    })
  }
}
