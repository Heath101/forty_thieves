require('../styles/table.scss')

import Tableau from './Tableau.js'
import Deck from './Deck.js'
import Foundation from './Foundation.js'

export default class Table {
  constructor(id) {
    this.el = document.getElementById(id)
    this.el = document.getElementById(id)
    this.foundations = this.createFoundations()
    this.tableaus = this.createTableaus()
    this.cards = Deck.generateDeck()
    Deck.shuffle(this.cards)
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
    let tabs = []
    let tabsEl = document.createElement('div')
    tabsEl.className = 'tableaus'

    for(let i = 1; i <= 10; i++) {
      let tab = document.createElement('div')
      tab.className = 'tableau'
      tabsEl.appendChild(tab)
      tabs.push(new Tableau(tab, this) )
    }
    this.el.appendChild(tabsEl)
    return tabs
  }

  createFoundations() {
    let foundations = []
    let foundationsEl = document.createElement('div')
    foundationsEl.className = 'foundations'
    for(let i = 1; i <= 8; i++) {
      let foundation = document.createElement('div')
      foundation.className = 'foundation'
      foundationsEl.appendChild(foundation)
      foundations.push(new Foundation(foundation, this) )
    }
    this.el.appendChild(foundationsEl)
    return foundations
  }

  distributeCards() {
    let i = 1
    while (i <= 4) {
      for(let tab of this.tableaus) {
        tab.addCard(this.cards.pop())
      }
      i++
    }
  }

  moveCard(e) {
    let card = e.detail.card
    this.currentCard = card
    this.originTableau = e.detail.originTableau
    this.currentCard.el.style.zIndex = 100
    this.mouseOffsetX = this.mousePosX - this.currentCard.el.offsetLeft;
    this.mouseOffsetY = this.mousePosY - this.currentCard.el.offsetTop;
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
      this.currentCard.el.style.left = (this.mousePosX - this.mouseOffsetX) + "px";
      this.currentCard.el.style.top  = (this.mousePosY - this.mouseOffsetY) + "px";
    }
  }
}
