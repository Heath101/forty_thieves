export default class StartScreen {
  constructor (el) {
    this.el = el
    this.startGameEl = this.el.querySelector('#startGame')
    this.attach()
  };

  attach() {
    this.startGameEl.addEventListener('click', this.startGame.bind(this))
  }

  startGame(e) {
    document.dispatchEvent(new CustomEvent('game:new'))
    this.el.classList.add('hidden')
    this.el.style.zIndex = 0
    e.target.removeEventListener(e.type, this.startGame.bind(this))
  }
}
