import { events, dispatch } from './Events'

export default class CardPile {
  constructor (el) {
    this.el = el
    this.cards = []
    this.attach()
  }

  attach () {
    this.el.addEventListener('mousedown', this.mousedown.bind(this))
    this.el.addEventListener('mouseup', this.mouseup.bind(this))
    document.addEventListener(events.move.undo, this.moveUndo.bind(this))
  }

  mousedown (e) {
    if (this.lastCard != null && this.isAboveLastCard(e.clientX, e.clientY)) {
      dispatch.card.pickup({ origin: this, card: this.lastCard })
    }
  }

  mouseup (e) {
    e.stopPropagation()
    dispatch.card.drop({ target: this })
  }

  get lastCard () {
    return this.cards[this.cards.length - 1]
  }

  willAccept (card) {
    throw new Error('Must implement the function `willAccept(1)`')
  }

  add (card) {
    throw new Error('Must implement the function add(1)')
  }

  resetCard () {
    throw new Error('Must implement the function resetCard()')
  }

  draw () {
    let card = this.cards.pop()
    card.deselect()
    this.el.removeChild(card.el)
    return card
  }

  activate () {
    this.lastCard.select()
  }

  deactivate () {
    this.cards.forEach(card => card.deselect())
  }

  swap (target) {
    return (function () { target.add(this.draw()) }.bind(this))
  }

  moveUndo (e) {
    this.deactivate()
  }

  isAboveLastCard (x, y) {
    let area = (this.cards.length !== 0) ? this.lastCard.el : this.el
    let bounds = area.getBoundingClientRect()
    return y >= bounds.top && y <= bounds.bottom && x >= bounds.left && x <= bounds.right
  }

  static move (origin, target) {
    dispatch.move.add({
      move: origin.swap(target),
      undo: target.swap(origin)
    })
  }
}
