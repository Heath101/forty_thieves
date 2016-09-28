export default class DropZone {

  constructor(el) {
    this.el = el
    this.attach()
  }

  attach() {
    this.el.addEventListener('click', this.click.bind(this))
  }

  click(e) {
    let ev = new CustomEvent('dropZone:selected', {'detail': {'dropZone': this}})
    document.dispatchEvent(ev)
  }

  willAccept(card) {
    throw 'Must implement the function `willAccept(1)`'
  }
}
