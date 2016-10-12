export default class GameMenu {
  constructor () {
    this.undoButton = document.getElementById('undo')
    this.attach()
  };

  attach() {
    this.undoButton.addEventListener('click', this.undo)
  }

  undo() {
    document.dispatchEvent(new CustomEvent('move:undo'))
  }
}
