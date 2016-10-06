require('./styles/layout.scss')
require('./styles/start-screen.scss')

import FortyThieves from './js/FortyThieves.js'
import MoveList from './js/MoveList.js'

window.moveList = new MoveList()

const start = document.getElementById('start')
start.addEventListener('click', startGame)

function startGame(e) {
  let game = new FortyThieves()
  game.init(document.getElementById('game'))
  let screen = document.querySelector('#startScreen')
  screen.classList.add('hidden')
  screen.style.zIndex = 0
  e.target.removeEventListener(e.type, startGame)
}

let undo = document.getElementById('undo')
undo.addEventListener('click', e => {
  window.moveList.undo()
})
