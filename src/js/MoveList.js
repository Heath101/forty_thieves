export default class MoveList {
  constructor() {
    this.moveList = []
  }

  add(move) {
    this.moveList.push(move)
    move.move()
  }

  undo() {
    if (this.moveList.length > 0) {
      this.moveList.pop().undo()
    }
  }
}
