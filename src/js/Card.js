require('../styles/card.scss')

export default class Card {
  constructor(elementId, id) {
    this.el = document.getElementById(elementId)
    this.id = id
  }

  id() {
    return this.id
  }
}
