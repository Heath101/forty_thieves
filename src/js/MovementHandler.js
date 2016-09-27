require('../styles/tableau.scss')

export default class MovementHandler {
  constructor(el) {
    this.el = el
    this.el.className = 'tableau';
    this.dropZones = []
    this.mousePosX = 0
    this.mousePosY = 0
    this.mouseOffsetX = 0
    this.mouseOffsetY = 0
    this.currentCard = null
    this.attach()
  }

  attach() {
    this.el.addEventListener('mousemove', this.mousemove.bind(this))
    this.el.addEventListener('mouseup',    this.mouseup.bind(this))
    document.addEventListener('moveCard', this.moveCard.bind(this))
  }

  addDropZones(dropZones) {
    dropZones.forEach( dz => this.dropZones.push(dz))
  }

  moveCard(e) {
    let card = e.detail.card
    this.currentCard = card
    this.origin = e.detail.origin
    this.currentCard.el.style.zIndex = 100
    this.mouseOffsetX = this.mousePosX - this.currentCard.el.offsetLeft;
    this.mouseOffsetY = this.mousePosY - this.currentCard.el.offsetTop;
    // turn on mousemove listener
  }

  clearMovement() {
    this.currentCard = null
    this.origin = null
  }

  mouseup(e) {
    if (this.currentCard) {
      let x = this.mousePosX
      let y = this.mousePosY
      let dropZone = this.dropZones.find((dropZone) => {
        if (dropZone.willAccept(this.currentCard,x,y)) {
          return dropZone
        }
      })
      if (dropZone) {
        dropZone.addCard(this.currentCard)
        this.clearMovement()
      } else {
        // return card to origin
        this.origin.addCard(this.currentCard)
        this.clearMovement()
      }
    }
  }

  mousemove(e) {
    this.mousePosX = window.event.clientX
    this.mousePosY = window.event.clientY
    if (this.currentCard !== null) {
      this.currentCard.el.style.left = `${this.mousePosX - this.mouseOffsetX}px`;
      this.currentCard.el.style.top  = `${this.mousePosY - this.mouseOffsetY}px`;
    }
  }
}
