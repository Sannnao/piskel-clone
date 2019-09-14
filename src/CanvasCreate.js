export default class AddCanvas {
  constructor(size, scaleCoef, shiftCoef) {
    this.size = size;
    this.scaleCoef = scaleCoef;
    this.shiftCoef = shiftCoef;
    this.currentTool = null;
    this.activeButton = null;
  }

  createCanvas(className) {
    const canvas = document.createElement('canvas');

    canvas.setAttribute('class', className);
    canvas.setAttribute('width', this.size);
    canvas.setAttribute('height', this.size);

    canvas.style.transform = `scale(${this.scaleCoef})`;
    canvas.style.top = `${this.shiftCoef}px`;
    canvas.style.left = `${this.shiftCoef}px`;

    return canvas;
  }

  static addCanvasListeners(drawCanvas) {
    const cursorCords = document.getElementById('cords-cursor');

    drawCanvas.addEventListener('mousemove', (e) => {
      cursorCords.innerHTML = `y: ${e.offsetY}, x: ${e.offsetX}`;
    });
  }
}
