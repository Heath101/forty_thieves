export default class Score {
  constructor(el) {
    this.cardPoints = 5
    this.scoreEl = el.querySelector('span')
    this.score = 0
    this.attach()
  }

  attach() {
    document.addEventListener('foundation:add', this.updateScore.bind(this, this.cardPoints))
    document.addEventListener('foundation:draw', this.updateScore.bind(this, -this.cardPoints))
  }

  updateScore(points) {
    this.score += points
    this.scoreEl.innerHTML = this.score
  }
}
