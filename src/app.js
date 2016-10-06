require('./styles/layout.scss')
import FortyThieves from './js/FortyThieves.js'
import MoveList from './js/MoveList.js'

window.moveList = new MoveList()

const start = document.getElementById('start')
start.addEventListener('click', startGame)

function startGame(e) {
  let game = new FortyThieves()
  game.init(document.getElementById('game'))
  console.log("Game Started");
  e.target.removeEventListener(e.type, startGame)
}

let undo = document.getElementById('undo')
undo.addEventListener('click', e => {
  window.moveList.undo()
})
