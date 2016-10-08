import CardPile from "./CardPile.js";

export default class CardMover {
  constructor() {
    this.movingCard = false
    this.mousePosX = 0
    this.mousePosY = 0
    this.mouseOffsetX = 0
    this.mouseOffsetY = 0
    this.attach()
  }

  attach() {
    document.addEventListener('card:pickup', this.cardPickup.bind(this))
    document.addEventListener('card:drop', this.cardDrop.bind(this))
    document.addEventListener('mousemove', this.mouseMove.bind(this))
    document.addEventListener('mouseup', this.invalidCardDrop.bind(this))
  }

  cardPickup (e) {
    if (this.card) { // there is already a card activated
      if (this.card == e.detail.card) { // the card has been clicked twice, deactivate
        let ev = new CustomEvent('card:auto', {'detail': {'card': this.card, 'origin': this.origin}})
        document.dispatchEvent(ev)
        this.origin.deactivate()
        this.origin.resetCard()
        this.card = null
        this.origin = null
      }
    } else { // no card is activated
      this.card = e.detail.card
      this.origin = e.detail.origin

      // this is needed for the mouse move stuff
      this.mouseOffsetX = this.mousePosX - this.card.el.offsetLeft;
      this.mouseOffsetY = this.mousePosY - this.card.el.offsetTop;

      this.card.beginMoving()
      this.movingCard = true
    }
  };

  cardDrop(e) {
    let target = e.detail.target

    if (this.origin) {
      if (target == this.origin) {
        this.origin.resetCard()
        this.origin.activate()
        this.movingCard = false
      } else {
        if (target.willAccept(this.card)) {
          CardPile.move(this.origin, target)
          target.deactivate()
        } else {
          this.origin.deactivate()
          this.origin.resetCard()
        }
        this.reset()
      }
    }
  }

  reset() {
    this.movingCard = false
    this.card.endMoving()
    this.card = null
    this.origin = null
  }

  mouseMove (e) {
    this.mousePosX = window.event.clientX
    this.mousePosY = window.event.clientY
    if (this.movingCard) {
      this.card.position({
        top:  this.mousePosY - this.mouseOffsetY,
        left: this.mousePosX - this.mouseOffsetX
      })
    }
  }

  invalidCardDrop(e) {
    if (this.origin && this.card) { // clicking outside tableau triggers the document handler :(
      this.origin.deactivate()
      this.origin.resetCard()
      this.reset()
    }
  }
}
