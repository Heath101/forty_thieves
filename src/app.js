require('./styles/base/layout.scss')
require('./styles/base/animations.scss')
require('./styles/base/utilities.scss')
require('./styles/StartScreen.scss')
require('./styles/Game.scss')

import FortyThieves from './js/FortyThieves.js'
import MoveList from './js/MoveList.js'

window.moveList = new MoveList()

const start = document.getElementById('newGame')
start.addEventListener('click', startGame)

function startGame(e) {
  let game = new FortyThieves()
  game.init(document.getElementById('gameBoard'))
  let screen = document.querySelector('#startScreen')
  screen.classList.add('hidden')
  screen.style.zIndex = 0
  e.target.removeEventListener(e.type, startGame)
}

let undo = document.getElementById('undo')
undo.addEventListener('click', e => {
  window.moveList.undo()
})
