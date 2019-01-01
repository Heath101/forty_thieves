import CardPile from './CardPile.js'

export default class AI {
  constructor (foundations, cascades) {
    this.foundations = foundations
    this.cascades = cascades
    this.attach()
  };

  attach () {
    document.addEventListener('card:auto', this.auto.bind(this))
  }

  auto (e) {
    const card = e.detail.card
    const cardPiles = this.foundations.concat(this.cascades)
    let matches = { foundations: [], cascades: [], emptyCascades: [] }

    cardPiles.forEach(cardPile => {
      if (cardPile.willAccept(card)) {
        if (cardPile.constructor.name === 'Foundation') {
          matches.foundations.push(cardPile)
        } else {
          if (cardPile.cards.length > 0) {
            matches.cascades.push(cardPile)
          } else {
            matches.emptyCascades.push(cardPile)
          }
        }
      }
    })
    let match = matches.foundations[0] || matches.cascades[0] || matches.emptyCascades[0]

    if (match) { CardPile.move(e.detail.origin, match) }
  }
}
