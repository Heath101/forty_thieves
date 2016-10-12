export default class MoveList {
  constructor() {
    this.moveList = []
    this.attach()
  }

  attach() {
    document.addEventListener('move:add', this.add.bind(this))
    document.addEventListener('move:undo', this.undo.bind(this))
  }

  add(e) {
    const move = e.detail
    this.moveList.push(move)
    move.move()
  }

  undo() {
    if (this.moveList.length > 0) {
      this.moveList.pop().undo()
    }
  }
}
