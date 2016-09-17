export default class Deck {
  constructor() { }

  static generateDeck() {
    let cards = []
    let suits = ['spades','diamonds','hearts','clubs']
    let vals = ['ace','2','3','4','5','6','7','8','9','10','jack','queen','king']

    while (suits.length != 0) {
      let suit = suits.pop()
      vals.forEach(function(val) {
        let card = document.createElement('div')
        card.className = 'card ' + suit + '-' + val;
        cards.push(card)
      })
    }
    return cards
  }
}
