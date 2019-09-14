/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
export default class AddTools {
  constructor() {
    this.mouseDown = false;
    this.activeTool = null;
  }

  static addPenTool(carrierCtx, color, fatHandle, framesStorage, carrierCanvas) {
    let mouseDown;

    const penToolDown = (e) => {
      mouseDown = true;

      carrierCtx.beginPath();
      carrierCtx.strokeStyle = color.value;
      carrierCtx.lineWidth = fatHandle.value;
      carrierCtx.moveTo(e.offsetX, e.offsetY);
    };

    const penToolMove = (e) => {
      if (!mouseDown) return;

      carrierCtx.lineTo(e.offsetX, e.offsetY);
      carrierCtx.stroke();
    };

    const penToolUp = (e) => {
      mouseDown = false;
      AddTools.addCanvasToFrameListener(e.target, framesStorage, carrierCanvas);
    };

    const penToolLeave = () => {
      mouseDown = false;
    };

    return {
      mousedown: penToolDown,
      mousemove: penToolMove,
      mouseup: penToolUp,
      mouseleave: penToolLeave,
    };
  }

  static addMirrorPenTool(carrierCtx, color, fatHandle, framesStorage, carrierCanvas) {
    const canvasSize = document.querySelector('.canvas-size-handle');
    let mouseDown;

    const mirrorPenToolDown = () => {
      mouseDown = true;
      carrierCtx.fillStyle = color.value;
    };

    const mirrorPenToolMove = (e) => {
      if (!mouseDown) return;

      const fatSize = fatHandle.valueAsNumber;

      carrierCtx.fillRect(e.offsetX, e.offsetY, fatSize, fatSize);
      carrierCtx.fillRect(canvasSize.valueAsNumber - e.offsetX, e.offsetY, fatSize, fatSize);
    };

    const mirrorPenToolUp = (e) => {
      mouseDown = false;
      AddTools.addCanvasToFrameListener(e.target, framesStorage, carrierCanvas);
    };

    const mirrorPenToolLeave = () => {
      mouseDown = false;
    };

    const mirrorPenTool = {
      mousedown: mirrorPenToolDown,
      mousemove: mirrorPenToolMove,
      mouseup: mirrorPenToolUp,
      mouseleave: mirrorPenToolLeave,
    };

    return mirrorPenTool;
  }

  static addEraserTool(carrierCtx, fatHandle, framesStorage, carrierCanvas) {
    let mouseDown;

    const eraserToolDown = () => {
      mouseDown = true;

      carrierCtx.beginPath();
      carrierCtx.strokeStyle = '#fff';
      carrierCtx.fillStyle = '#fff';
      carrierCtx.lineWidth = fatHandle.value;
    };

    const eraserToolMove = (e) => {
      if (!mouseDown) return;

      const xCord = e.offsetX;
      const yCord = e.offsetY;

      carrierCtx.lineTo(xCord, yCord);
      carrierCtx.stroke();

      carrierCtx.beginPath();
      carrierCtx.arc(xCord, yCord, fatHandle.valueAsNumber / 2, 0, Math.PI * 2);
      carrierCtx.fill();

      carrierCtx.beginPath();
      carrierCtx.moveTo(xCord, yCord);
    };

    const eraserToolUp = (e) => {
      mouseDown = false;

      carrierCtx.beginPath();
      AddTools.addCanvasToFrameListener(e.target, framesStorage, carrierCanvas);
    };

    const eraserToolMouseLeave = () => {
      mouseDown = false;
    };

    return {
      mousedown: eraserToolDown,
      mousemove: eraserToolMove,
      mouseup: eraserToolUp,
      mouseleave: eraserToolMouseLeave,
    };
  }

  static addLineTool(carrierCtx, drawCtx, color, fatHandle, framesStorage, carrierCanvas) {
    const canvasSizeHandle = document.querySelector('.canvas-size-handle');

    let mouseDown;
    let canvasSize;

    let startX;
    let startY;

    const lineToolDown = (e) => {
      mouseDown = true;

      startX = e.offsetX;
      startY = e.offsetY;

      carrierCtx.beginPath();
      carrierCtx.strokeStyle = color.value;
      carrierCtx.lineWidth = fatHandle.value;

      carrierCtx.moveTo(startX, startY);
    };

    const lineToolMove = (e) => {
      if (!mouseDown) return;

      canvasSize = canvasSizeHandle.valueAsNumber;

      drawCtx.clearRect(0, 0, canvasSize, canvasSize);
      drawCtx.beginPath();
      drawCtx.strokeStyle = color.value;
      drawCtx.lineWidth = fatHandle.value;
      drawCtx.moveTo(startX, startY);
      drawCtx.lineTo(e.offsetX, e.offsetY);
      drawCtx.stroke();
      drawCtx.closePath();
    };

    const lineToolUp = (e) => {
      mouseDown = false;

      drawCtx.clearRect(0, 0, canvasSize, canvasSize);
      carrierCtx.lineTo(e.offsetX, e.offsetY);
      carrierCtx.stroke();
      carrierCtx.closePath();
      AddTools.addCanvasToFrameListener(e.target, framesStorage, carrierCanvas);
    };

    const lineToolLeave = () => {
      mouseDown = false;
    };

    return {
      mousedown: lineToolDown,
      mousemove: lineToolMove,
      mouseup: lineToolUp,
      mouseleave: lineToolLeave,
    };
  }

  static addRectTool(carrierCtx, drawCtx, color, fatHandle, framesStorage, carrierCanvas) {
    const canvasSizeHandle = document.querySelector('.canvas-size-handle');

    let canvasSize;
    let mouseDown;

    let startX;
    let startY;

    let fatSize;

    const rectToolDown = (e) => {
      mouseDown = true;

      startX = e.offsetX;
      startY = e.offsetY;

      carrierCtx.strokeStyle = color.value;
      drawCtx.strokeStyle = color.value;

      fatSize = fatHandle.value;

      carrierCtx.lineWidth = fatSize;
      drawCtx.lineWidth = fatSize;
    };

    const rectToolMove = (e) => {
      if (!mouseDown) return;

      const width = e.offsetX - startX;
      const height = e.offsetY - startY;

      canvasSize = canvasSizeHandle.valueAsNumber;

      drawCtx.clearRect(0, 0, canvasSize, canvasSize);
      drawCtx.strokeRect(startX, startY, width, height);
    };

    const rectToolUp = (e) => {
      mouseDown = false;

      const width = e.offsetX - startX;
      const height = e.offsetY - startY;

      carrierCtx.strokeRect(startX, startY, width, height);
      drawCtx.clearRect(0, 0, canvasSize, canvasSize);
      AddTools.addCanvasToFrameListener(e.target, framesStorage, carrierCanvas);
    };

    const rectToolLeave = () => {
      mouseDown = false;
    };

    return {
      mousedown: rectToolDown,
      mousemove: rectToolMove,
      mouseup: rectToolUp,
      mouseleave: rectToolLeave,
    };
  }

  static addFillRectTool(carrierCtx, drawCtx, color, fatHandle, framesStorage, carrierCanvas) {
    const canvasSizeHandle = document.querySelector('.canvas-size-handle');

    let canvasSize;
    let mouseDown;

    let startX;
    let startY;

    let fatSize;

    const fillRectToolDown = (e) => {
      mouseDown = true;

      startX = e.offsetX;
      startY = e.offsetY;

      carrierCtx.fillStyle = color.value;
      drawCtx.fillStyle = color.value;

      fatSize = fatHandle.value;

      carrierCtx.lineWidth = fatSize;
      drawCtx.lineWidth = fatSize;
    };

    const fillRectToolMove = (e) => {
      if (!mouseDown) return;

      const width = e.offsetX - startX;
      const height = e.offsetY - startY;

      canvasSize = canvasSizeHandle.valueAsNumber;

      drawCtx.clearRect(0, 0, canvasSize, canvasSize);
      drawCtx.fillRect(startX, startY, width, height);
    };

    const fillRectToolUp = (e) => {
      mouseDown = false;

      const width = e.offsetX - startX;
      const height = e.offsetY - startY;

      carrierCtx.fillRect(startX, startY, width, height);
      drawCtx.clearRect(0, 0, canvasSize, canvasSize);
      AddTools.addCanvasToFrameListener(e.target, framesStorage, carrierCanvas);
    };

    const fillRectToolLeave = () => {
      mouseDown = false;
    };

    return {
      mousedown: fillRectToolDown,
      mousemove: fillRectToolMove,
      mouseup: fillRectToolUp,
      mouseleave: fillRectToolLeave,
    };
  }

  static addArcTool(carrierCtx, drawCtx, color, fatHandle, framesStorage, carrierCanvas) {
    const canvasSizeHandle = document.querySelector('.canvas-size-handle');

    let canvasSize;
    let mouseDown;

    let startX;
    let startY;

    let fatSize;

    function drawEllipse(x1, y1, x2, y2, ctx) {
      const radiusX = (x2 - x1) * 0.5;
      const radiusY = (y2 - y1) * 0.5;
      const centerX = x1 + radiusX;
      const centerY = y1 + radiusY;
      const step = 0.01;
      let a = step;
      const pi2 = Math.PI * 2 - step;

      ctx.beginPath();

      ctx.moveTo(centerX + radiusX * Math.cos(0),
        centerY + radiusY * Math.sin(0));

      for (; a < pi2; a += step) {
        ctx.lineTo(centerX + radiusX * Math.cos(a),
          centerY + radiusY * Math.sin(a));
      }

      ctx.closePath();
      ctx.stroke();
    }

    const arcToolDown = (e) => {
      mouseDown = true;

      startX = e.offsetX;
      startY = e.offsetY;

      carrierCtx.strokeStyle = color.value;
      drawCtx.strokeStyle = color.value;

      fatSize = fatHandle.value;

      carrierCtx.lineWidth = fatSize;
      drawCtx.lineWidth = fatSize;
    };

    const arcToolMove = (e) => {
      if (!mouseDown) return;

      canvasSize = canvasSizeHandle.valueAsNumber;

      drawCtx.clearRect(0, 0, canvasSize, canvasSize);
      drawEllipse(startX, startY, e.offsetX, e.offsetY, drawCtx);
    };

    const arcToolUp = (e) => {
      mouseDown = false;

      drawEllipse(startX, startY, e.offsetX, e.offsetY, carrierCtx);
      drawCtx.clearRect(0, 0, canvasSize, canvasSize);
      AddTools.addCanvasToFrameListener(e.target, framesStorage, carrierCanvas);
    };

    const arcToolLeave = () => {
      mouseDown = false;
    };

    return {
      mousedown: arcToolDown,
      mousemove: arcToolMove,
      mouseup: arcToolUp,
      mouseleave: arcToolLeave,
    };
  }

  static addLightenTool(carrierCtx, fatHandle, framesStorage, carrierCanvas) {
    const ctrlCode = 17;
    let fatSize;
    let mouseDown;

    const lightenToolDown = () => {
      mouseDown = true;

      carrierCtx.beginPath();
      carrierCtx.strokeStyle = 'rgba(255, 255, 255, 0.01)';
      carrierCtx.fillStyle = 'rgba(255, 255, 255, 0.01)';
      carrierCtx.lineWidth = fatHandle.value;
    };

    const lightenToolMove = (e) => {
      if (!mouseDown) return;

      fatSize = fatHandle.valueAsNumber;

      const xCord = e.offsetX;
      const yCord = e.offsetY;

      carrierCtx.lineTo(xCord, yCord);
      carrierCtx.stroke();

      carrierCtx.beginPath();
      carrierCtx.arc(xCord, yCord, fatSize / 2, 0, Math.PI * 2);
      carrierCtx.fill();

      carrierCtx.beginPath();
      carrierCtx.moveTo(xCord, yCord);
    };

    const lightenToolUp = (e) => {
      mouseDown = false;
      AddTools.addCanvasToFrameListener(e.target, framesStorage, carrierCanvas);
    };

    const lightenToolLeave = () => {
      mouseDown = false;
    };

    document.addEventListener('keydown', (e) => {
      e.preventDefault();

      if (e.keyCode === ctrlCode) {
        carrierCtx.fillStyle = 'rgba(0, 0, 0, 0.01)';
        carrierCtx.strokeStyle = 'rgba(255, 255, 255, 0.01)';
      }
    });

    document.addEventListener('keyup', (e) => {
      e.preventDefault();

      if (e.keyCode === ctrlCode) {
        carrierCtx.fillStyle = 'rgba(255, 255, 255, 0.01)';
        carrierCtx.strokeStyle = 'rgba(255, 255, 255, 0.01)';
      }
    });

    return {
      mousedown: lightenToolDown,
      mousemove: lightenToolMove,
      mouseup: lightenToolUp,
      mouseleave: lightenToolLeave,
    };
  }

  static addColorPickerTool(carrierCtx, color) {
    const colorPickerToolClick = (e) => {
      const pixelData = carrierCtx.getImageData(e.offsetX, e.offsetY, 1, 1);

      const rChanel = pixelData.data[0];
      const gChanel = pixelData.data[1];
      const bChanel = pixelData.data[2];

      function componentToHex(c) {
        const hex = c.toString(16);
        return hex.length === 1 ? `0${hex}` : hex;
      }

      function rgbToHex(r, g, b) {
        return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
      }

      color.value = rgbToHex(rChanel, gChanel, bChanel);
    };

    return {
      click: colorPickerToolClick,
    };
  }

  static addCanvasToFrameListener(eventTarget, framesStorage, carrierCanvas) {
    const currentCanvasId = parseInt(eventTarget.getAttribute('id'), 10);
    const currentFrame = document.getElementById(`${currentCanvasId}-frame`);
    const framesWrap = document.querySelector('.frames-wrapper');

    const canvasImg = carrierCanvas.toDataURL();

    currentFrame.style.backgroundImage = `url(${canvasImg})`;
    framesStorage[currentCanvasId - 1].frame = currentFrame;
    framesStorage[currentCanvasId - 1].canvasImg = canvasImg;

    framesWrap.innerHTML = '';

    framesStorage.forEach((elem) => {
      framesWrap.appendChild(elem.frame);
    });
  }
}
