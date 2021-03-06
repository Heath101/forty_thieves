import { events } from './Events'

export default class Score {
  constructor (el) {
    this.el = el
    this.cardPoints = 5
    this.score = 0
    this.attach()
    this.updateScore()
  }

  attach () {
    document.addEventListener(events.foundation.add, this.updateScore.bind(this, this.cardPoints))
    document.addEventListener(events.foundation.draw, this.updateScore.bind(this, -this.cardPoints))
  }

  updateScore (points = 0) {
    this.score += points
    this.el.innerHTML = `score:  ${this.score}`
  }
}
