import Deck            from './Deck.js'
import MovementHandler from './MovementHandler.js'
import PlayArea        from './PlayArea.js'
import Foundation      from './Foundation.js'
import Cascade         from './Cascade.js'

export default class FortyThieves {

  init(el) {
    this.el = el
    let movementHandler = new MovementHandler(el)
    let cards = Deck.generate().concat(Deck.generate())
    Deck.shuffle(cards)
    let foundations = this.createFoundations()
    let playArea = this.createPlayArea()
    let cascades = this.createCascades()
    this.populateCascades(cards, cascades)
    playArea.addStock(cards)
    movementHandler.addDropZones(foundations)
    movementHandler.addDropZones(cascades)
  }

  createPlayArea() {
    let playAreaEl = document.createElement('div')
    playAreaEl.className = 'play-area'
    this.el.appendChild(playAreaEl)
    return new PlayArea(playAreaEl)
  }

  createFoundations() {
    let foundations = []
    let foundationsEl = document.createElement('div')
    foundationsEl.className = 'foundations'
    for(let i = 1; i <= 8; i++) {
      let foundation = document.createElement('div')
      foundation.className = 'foundation'
      foundationsEl.appendChild(foundation)
      foundations.push(new Foundation(foundation) )
    }
    this.el.appendChild(foundationsEl)
    return foundations
  }

  createCascades() {
    let cascades = []
    let cascadesEl = document.createElement('div')
    cascadesEl.className = 'cascades'

    for(let i = 1; i <= 10; i++) {
      let cascade = document.createElement('div')
      cascade.className = 'cascade'
      cascadesEl.appendChild(cascade)
      cascades.push(new Cascade(cascade) )
    }
    this.el.appendChild(cascadesEl)
    return cascades
  }

  populateCascades(cards, cascades) {
    let i = 1
    while (i <=4) {
      for(let c of cascades) { c.addCard(cards.pop()) }
      i++
    }
  }
}
