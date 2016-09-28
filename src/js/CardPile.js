import DropZone from './DropZone.js'

export default class CardPile extends DropZone {
  constructor(el) {
    super(el)
    this.cards = []
  }

  lastCard() {
    return this.cards[this.cards.length - 1]
  }

  willAccept(card) {
    super.willAccept(card)
  }

  add(card) {
    throw 'Must implement add(1)'
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
    if (this.lastCard()) {
      this.lastCard().deselect()
    }
  }

  swap(target) {
    return (function() { target.add(this.draw()) }.bind(this))
  }

  static move(origin, target) {
    window.moveList.add({
      move: origin.swap(target),
      undo: target.swap(origin)
    })
  }
}
