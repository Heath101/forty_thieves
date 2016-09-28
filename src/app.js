require('./styles/layout.scss')
import FortyThieves from './js/FortyThieves.js'
import MoveList from './js/MoveList.js'

window.moveList = new MoveList()

let game = new FortyThieves()
game.init(document.getElementById('game'))

let undo = document.getElementById('undo')
undo.addEventListener('click', e => {
  let move = window.moveList.undo()
})
