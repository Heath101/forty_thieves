require('../styles/tableau.scss')

import Column from './Column.js'

export default class Tableau {
  constructor(id) {
    this.el = document.getElementById(id)
    this.columns = [
      new Column('column', this, 1),
      new Column('column2', this, 2)
    ]
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

  moveCard(e) {
    let card = e.detail.card
    this.currentCard = card
    this.originColumn = e.detail.originColumn
    this.currentCard.style.zIndex = 100
    this.mouseOffsetX = this.mousePosX - this.currentCard.offsetLeft;
    this.mouseOffsetY = this.mousePosY - this.currentCard.offsetTop;
    // turn on mousemove listener
  }

  clearMovement() {
    this.currentCard = null
    this.originColumn = null
  }

  mouseup(e) {
    if (this.currentCard) {
      let x = this.mousePosX
      let y = this.mousePosY
      let newColumn = this.columns.find(function(column) {
        if (column.contains(x,y)) {
          return column
        }
      })
      if (newColumn) {
        newColumn.addCard(this.currentCard)
        this.clearMovement()
      } else {
        // return card to originColumn
        this.originColumn.addCard(this.currentCard)
        this.clearMovement()
      }
    }
  }

  mousemove(e) {
    this.mousePosX = window.event.clientX
    this.mousePosY = window.event.clientY
    if (this.currentCard !== null) {
      this.currentCard.style.left = (this.mousePosX - this.mouseOffsetX) + "px";
      this.currentCard.style.top  = (this.mousePosY - this.mouseOffsetY) + "px";
    }
  }
}
