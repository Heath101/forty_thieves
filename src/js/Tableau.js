require('../styles/tableau.scss')
require('../styles/waste.scss')

import Cascade from './Cascade.js'
import Deck from './Deck.js'
import Foundation from './Foundation.js'
import PlayArea from './PlayArea.js'

export default class Tableau {
  constructor(id) {
    this.el = document.getElementById(id)
    this.el = document.getElementById(id)
    let cards = Deck.generate().concat(Deck.generate())
    Deck.shuffle(cards)
    this.foundations = this.createFoundations()

    this.playArea = this.createPlayArea()
    this.cascades = this.createCascades()
    this.distributeCards(cards)
    this.playArea.addStock(cards)
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

  createCascades() {
    let cascades = []
    let cascadesEl = document.createElement('div')
    cascadesEl.className = 'cascades'

    for(let i = 1; i <= 10; i++) {
      let cascade = document.createElement('div')
      cascade.className = 'cascade'
      cascadesEl.appendChild(cascade)
      cascades.push(new Cascade(cascade, this) )
    }
    this.el.appendChild(cascadesEl)
    return cascades
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

  createPlayArea() {
    let playAreaEl = document.createElement('div')
    playAreaEl.className = 'play-area'
    this.el.appendChild(playAreaEl)
    return new PlayArea(playAreaEl)
  }

  distributeCards(stock) {
    let i = 1
    while (i <=4) {
      for(let tab of this.cascades) {
        tab.addCard(stock.pop())
      }
      i++
    }
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
      let dropZone = this.cascades.find((cascade) => {
        if (cascade.willAccept(this.currentCard,x,y)) {
          return cascade
        }
      })
      if (!dropZone) {
        dropZone = this.foundations.find(function(foundation) {
          if (foundation.willAccept(this.currentCard,x,y)) {
            return foundation
          }
        }.bind(this))
      }
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
