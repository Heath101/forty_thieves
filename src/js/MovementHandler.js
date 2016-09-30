import CardPile from './CardPile.js'

export default class MovementHandler {
  constructor(el) {
    this.el = el
    this.dropZones = []
    this.currentOrigin = null
    this.attach()
  }

  attach() {
    document.addEventListener('dropZone:selected', this.dropZoneSelected.bind(this))
    document.addEventListener('dropZone:deselected', this.dropZoneDeselected.bind(this))
  }

  dropZoneSelected(e) {
    if (this.currentOrigin) {
      let target = e.detail.dropZone
      let card = this.currentOrigin.lastCard()
      if (target.willAccept(card)) {
        CardPile.move(this.currentOrigin, target)
      }
      this.currentOrigin.deactivate()
      target.deactivate()
      this.currentOrigin = null
    } else {
      this.currentOrigin = e.detail.dropZone
      this.currentOrigin.activate()
    }
  }

  dropZoneDeselected(e) {
    if (this.currentOrigin == e.detail.dropZone) {
      this.currentOrigin.deactivate()
      this.currentOrigin = null
    }
  }

  addDropZones(dropZones) {
    dropZones.forEach( dz => this.dropZones.push(dz))
  }
}
