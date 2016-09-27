require('./styles/layout.scss')
import FortyThieves from './js/FortyThieves.js'


let game = new FortyThieves()
game.init(document.getElementById('game'))
