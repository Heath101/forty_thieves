import Deck          from './Deck.js'
import PlayArea      from './PlayArea.js'
import Foundation    from './Foundation.js'
import Cascade       from './Cascade.js'
import MoveList      from './MoveList.js'
import CardMover     from './CardMover.js'
import CardPile      from "./CardPile.js"
import Score         from "./Score.js"

export default class FortyThieves {

  init(el) {
    this.el = el
    let cardMover = new CardMover()
    let cards = Deck.generate(2)
    Deck.shuffle(cards)
    this.foundations = this.createFoundations()
    let playArea = this.createPlayArea()
    this.cascades = this.createCascades()
    this.score = new Score(document.getElementById('score'))
    this.moveList = new MoveList()
    this.populateCascades(cards, this.cascades)
    playArea.addStock(cards)
    this.attach()
  }

  attach() {
    document.addEventListener('card:auto', this.auto.bind(this))
  }

  auto(e) {
    const card = e.detail.card
    const cardPiles = this.foundations.concat(this.cascades)
    const match = cardPiles.find( cardPile => {
      if (cardPile.willAccept(card)) { return cardPile}
    })
    if (match) { CardPile.move(e.detail.origin, match) }
  }

  createPlayArea() {
    let playAreaEl = document.createElement('div')
    playAreaEl.className = 'PlayArea'
    this.el.appendChild(playAreaEl)
    return new PlayArea(playAreaEl)
  }

  createFoundations() {
    let foundations = []
    let foundationsEl = document.createElement('div')
    foundationsEl.className = 'foundations'
    for(let i = 1; i <= 8; i++) {
      let foundation = document.createElement('div')
      foundation.className = 'Foundation'
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
      cascade.className = 'Cascade'
      cascadesEl.appendChild(cascade)
      cascades.push(new Cascade(cascade) )
    }
    this.el.appendChild(cascadesEl)
    return cascades
  }

  populateCascades(cards, cascades) {
    let i = 1
    while (i <= 4) {
      for(let c of cascades) { c.add(cards.pop()) }
      i++
    }
  }
}
