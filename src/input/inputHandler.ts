export class InputHandler {
  constructor() {
    this.keys = {};
    window.addEventListener("keydown", (e) => this.onKeyDown(e));
    window.addEventListener("keyup", (e) => this.onKeyUp(e));
  }
  onKeyDown(event) {
    if (!this.keys[event.key]) {
      this.keys[event.key] = true;
    }
  }
  onKeyUp(event) {
    this.keys[event.key] = false;
  }
  isKeyPressed(key) {
    return this.keys[key] === true;
  }
}
