require('../styles/tableau.scss')

import Card from './Card.js'
import Column from './Column.js'

export default class Tableau {
  constructor(id) {
    this.el = document.getElementById(id)
    this.card = new Card('card')
    this.card2 = new Card('card2')
    this.column = new Column('column')
    this.mousePosX = 0
    this.mousePosY = 0
    this.mouseOffsetX = 0
    this.mouseOffsetY = 0
    this.selected = null
    this.attach()
  }

  attach() {
    this.card.el.addEventListener('mousedown', this.mousedown.bind(this))
    this.card2.el.addEventListener('mousedown', this.mousedown.bind(this))
    this.el.addEventListener('mousemove', this.mousemove.bind(this))
    this.el.addEventListener('mouseup',    this.mouseup.bind(this))
  }

  mousedown(e) {
    e.preventDefault()
    e.stopPropagation()
    this.selected = e.target
    this.mouseOffsetX = this.mousePosX - this.selected.offsetLeft;
    this.mouseOffsetY = this.mousePosY - this.selected.offsetTop;
  }

  mouseup(e) {
    if (this.column.contains(this.mousePosX, this.mousePosY)) {
      this.column.addCard(this.card)
    };
    this.selected = null
  }

  mousemove(e) {
    this.mousePosX = window.event.clientX
    this.mousePosY = window.event.clientY
    if (this.selected !== null) {
      this.selected.style.left = (this.mousePosX - this.mouseOffsetX) + "px";
      this.selected.style.top  = (this.mousePosY - this.mouseOffsetY) + "px";
    }
  }
}
