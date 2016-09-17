require('../styles/table.scss')

import Tableau from './Tableau.js'
import Card from './Card.js'

export default class Table {
  constructor(id) {
    this.el = document.getElementById(id)
    this.tableaus = this.createTableaus()
    this.cards = this.createCards()
    this.distributeCards()
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

  createTableaus() {
    let cols = []
    for(let i = 1; i <= 10; i++) {
      let col = document.createElement('div')
      col.className = 'tableau'
      this.el.appendChild(col)
      cols.push(new Tableau(col, this, 0) )
    }
    return cols
  }

  createCards() {
    let cards = []
    for(let i = 1; i <= 104; i++) {
      let card = document.createElement('div')
      card.className = 'card'
      this.el.appendChild(card)
      cards.push(card)
    }
    return cards
  }

  distributeCards() {
    let i = 1
    while (i <= 4) {
      for(let col of this.tableaus) {
        col.addCard(this.cards.pop())
      }
      i++
    }
  }

  moveCard(e) {
    let card = e.detail.card
    this.currentCard = card
    this.originTableau = e.detail.originTableau
    this.currentCard.style.zIndex = 100
    this.mouseOffsetX = this.mousePosX - this.currentCard.offsetLeft;
    this.mouseOffsetY = this.mousePosY - this.currentCard.offsetTop;
    // turn on mousemove listener
  }

  clearMovement() {
    this.currentCard = null
    this.originTableau = null
  }

  mouseup(e) {
    if (this.currentCard) {
      let x = this.mousePosX
      let y = this.mousePosY
      let newTableau = this.tableaus.find(function(tableau) {
        if (tableau.contains(x,y)) {
          return tableau
        }
      })
      if (newTableau) {
        newTableau.addCard(this.currentCard)
        this.clearMovement()
      } else {
        // return card to originTableau
        this.originTableau.addCard(this.currentCard)
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
