import FortyThieves from './js/FortyThieves.js'
import StartScreen from './js/StartScreen.js'

require('./styles/base/layout.scss')
require('./styles/base/animations.scss')
require('./styles/base/utilities.scss')
require('./styles/base/variables.scss')
require('./styles/StartScreen.scss')
require('./styles/Game.scss')

new StartScreen(document.getElementById('startScreen'))

document.addEventListener('game:new', () => {
  window.game = new FortyThieves(document.getElementById('gameBoard'))
  window.game.init()
})
