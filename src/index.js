import './style.css';
import CreateFrame from './frames';
import CanvasCreate from './CanvasCreate';
import AddTools from './tools';
import Handles from './AppHandles';
import Animation from './Animation';

const framesContainer = document.querySelector('.frames-container');
const canvasContainer = document.querySelector('.canvas-container');
const animationContainer = document.querySelector('.animation-container');

const framesWrap = document.createElement('div');
framesWrap.classList.add('frames-wrapper');

const addBtn = document.createElement('button');
const fpsHandle = document.querySelector('.fps-handle');
const currentFps = document.querySelector('#fps');
const canvasSizeHandle = document.querySelector('.canvas-size-handle');
const canvasSize = document.getElementById('canvas-size');

const color = document.querySelector('#color-1');
const fatHandle = document.querySelector('.fat-handle');
const currentFat = document.querySelector('#fat');


const swapColorButton = document.getElementById('swap-color');

const penToolButton = document.querySelector('.pen-tool');
const mirrorPenToolButton = document.querySelector('.mirror-pen-tool');
const eraserToolButton = document.querySelector('.eraser-tool');
const lineToolButton = document.querySelector('.line-tool');
const rectToolButton = document.querySelector('.rect-tool');
const fillRectToolButton = document.querySelector('.fill-rect-tool');
const arcToolButton = document.querySelector('.arc-tool');
const lightenToolButton = document.querySelector('.lighten-tool');
const colorPickerToolButton = document.querySelector('.color-picker-tool');

let animationTimer;

const framesStorage = [];

let activeFrame;

let dragSrcEl = null;
let frameArrElem = null;

let activeButton;
let currentToolName;

let scaleCoef;
let shiftCoef;

function refreshAnimation() {
  if (animationTimer) {
    clearInterval(animationTimer);
  }
  animationTimer = Animation.startAnimation(framesStorage);
}

function resizeCanvas() {
  const canvasField = document.querySelector('.canvas-item');
  const canvasDrawField = document.querySelector('.canvas-draw-item');
  const sizeCanvas = document.getElementById('size-canvas');

  scaleCoef = +((800 / canvasSizeHandle.valueAsNumber).toFixed(2));
  shiftCoef = (800 - canvasSizeHandle.valueAsNumber) / 2;

  canvasField.style.transform = `scale(${scaleCoef})`;
  canvasDrawField.style.transform = `scale(${scaleCoef})`;

  canvasSize.innerHTML = canvasSizeHandle.value;
  sizeCanvas.innerHTML = `${canvasSizeHandle.value} x ${canvasSizeHandle.value}`;

  framesStorage.forEach((elem) => {
    const canvasItem = elem.canvas[0];
    const canvasItem1 = elem.canvas[1];

    canvasItem.setAttribute('width', canvasSizeHandle.value);
    canvasItem.setAttribute('height', canvasSizeHandle.value);

    canvasItem1.setAttribute('width', canvasSizeHandle.value);
    canvasItem1.setAttribute('height', canvasSizeHandle.value);

    canvasItem.style.transform = `scale(${scaleCoef})`;
    canvasItem.style.left = `${shiftCoef}px`;
    canvasItem.style.top = `${shiftCoef}px`;
    canvasItem1.style.transform = `scale(${scaleCoef})`;
    canvasItem1.style.left = `${shiftCoef}px`;
    canvasItem1.style.top = `${shiftCoef}px`;

    const ctx = canvasItem.getContext('2d');

    const img = new Image();
    img.src = elem.canvasImg;

    ctx.drawImage(img, 0, 0);
  });
}

function addListeners() {
  addBtn.addEventListener('click', addFrame);

  addBtn.addEventListener('click', refreshAnimation);
  fpsHandle.addEventListener('input', refreshAnimation);

  canvasSizeHandle.addEventListener('input', resizeCanvas);

  Handles.addFpsHandle();
  Handles.addFatHandle();
  swapColorButton.addEventListener('click', Handles.swapColor);

  document.addEventListener('wheel', (e) => {
    if (e.deltaY > 0 && canvasSizeHandle.valueAsNumber >= 32) {
      canvasSizeHandle.valueAsNumber -= 10;
      canvasSize.innerHTML = canvasSizeHandle.value;
      resizeCanvas();
    }

    if (e.deltaY < 0 && canvasSizeHandle.valueAsNumber <= 800) {
      canvasSizeHandle.valueAsNumber += 10;
      canvasSize.innerHTML = canvasSizeHandle.value;
      resizeCanvas();
    }
  });
}

function startApp() {
  addBtn.innerHTML = 'Add new frame';

  framesContainer.appendChild(framesWrap);
  framesContainer.appendChild(addBtn);

  addBtn.setAttribute('class', 'add-button');

  addListeners();
}

startApp();

function addToolsListeners(carrierCtx, drawCtx, carrierCanvas) {
  return {
    penTool: AddTools.addPenTool(carrierCtx, color, fatHandle, framesStorage,
      carrierCanvas),
    mirrorPenTool: AddTools.addMirrorPenTool(carrierCtx, color, fatHandle, framesStorage,
      carrierCanvas),
    eraserTool: AddTools.addEraserTool(carrierCtx, fatHandle, framesStorage,
      carrierCanvas),
    lineTool: AddTools.addLineTool(carrierCtx, drawCtx, color, fatHandle, framesStorage,
      carrierCanvas),
    rectTool: AddTools.addRectTool(carrierCtx, drawCtx, color, fatHandle, framesStorage,
      carrierCanvas),
    fillRectTool: AddTools.addFillRectTool(
      carrierCtx,
      drawCtx,
      color,
      fatHandle,
      framesStorage,
      carrierCanvas,
    ),
    arcTool: AddTools.addArcTool(
      carrierCtx,
      drawCtx,
      color,
      fatHandle,
      framesStorage,
      carrierCanvas,
    ),
    lightenTool: AddTools.addLightenTool(carrierCtx, fatHandle, framesStorage,
      carrierCanvas),
    colorPickerTool: AddTools.addColorPickerTool(carrierCtx, color),
  };
}

function chooseActiveFrame(newFrame) {
  if (activeFrame) {
    activeFrame.classList.toggle('active-frame', false);
    activeFrame = newFrame;
    activeFrame.classList.toggle('active-frame', true);
  } else {
    activeFrame = newFrame;
    activeFrame.classList.toggle('active-frame', true);
  }
}

function refreshCanvas(canvasArr) {
  canvasContainer.innerHTML = '';

  canvasArr.forEach(e => canvasContainer.appendChild(e));
}

function refreshFrames() {
  framesStorage.forEach((e, i) => {
    e.frame.querySelector('.frame-num').innerHTML = i + 1;
    e.frame.setAttribute('id', `${i + 1}-frame`);
    e.frame.style.order = i + 1;
    e.canvas[0].setAttribute('id', `${i + 1}-canvas`);
    e.canvas[1].setAttribute('id', `${i + 1}-draw-canvas`);
    framesWrap.appendChild(e.frame);
  });
}

function addTool() {
  activeButton.classList.toggle('active-tool', true);

  framesStorage.forEach((elem) => {
    Object.keys(elem.canvasListeners[currentToolName]).forEach((key) => {
      elem.canvas[1].addEventListener(`${key}`, elem.canvasListeners[currentToolName][key]);
    });
  });
}

function delTool() {
  if (currentToolName && activeButton) {
    framesStorage.forEach((elem) => {
      Object.keys(elem.canvasListeners[currentToolName]).forEach((key) => {
        elem.canvas[1].removeEventListener(`${key}`, elem.canvasListeners[currentToolName][key]);
      });
    });

    activeButton.classList.toggle('active-tool', false);
  }
}

function delFrame(e) {
  e.stopPropagation();

  const frameNum = parseInt(e.target.parentNode.getAttribute('id'), 10);

  framesStorage.splice(frameNum - 1, 1);

  framesWrap.innerHTML = '';

  canvasContainer.innerHTML = '';

  if (framesStorage.length > 0) {
    refreshCanvas(framesStorage[framesStorage.length - 1].canvas);
  }

  if (framesStorage.length === 1) {
    delTool();
  }

  refreshFrames();
}

function dragAndDrop(frame) {
  function handleDragStart(e) {
    const frameNum = parseInt(e.target.getAttribute('id'), 10);

    frameArrElem = framesStorage.splice(frameNum - 1, 1);

    e.target.style.opacity = '0.4';

    dragSrcEl = e.target;

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target.style.order);
  }

  function handleDragOver(e) {
    if (e.preventDefault) {
      e.preventDefault();
    }

    e.dataTransfer.dropEffect = 'move';

    return false;
  }

  function handleDragEnter(e) {
    e.target.classList.add('over');
  }

  function handleDragLeave(e) {
    e.target.classList.remove('over');
  }


  function handleDrop(e) {
    if (e.stopPropagation) {
      e.stopPropagation();
    }

    const frameNum = parseInt(e.target.getAttribute('id'), 10);

    framesStorage.splice(frameNum - 1, 0, ...frameArrElem);

    dragSrcEl.style.opacity = '1';

    if (dragSrcEl !== e.target) {
      dragSrcEl.style.order = e.target.style.order;
      e.target.style.order = e.dataTransfer.getData('text/html');
    }

    return false;
  }

  function handleDragEnd() {
    framesStorage.forEach(e => e.frame.classList.remove('over'));
    refreshFrames();
  }

  frame.addEventListener('dragstart', handleDragStart, false);
  frame.addEventListener('dragenter', handleDragEnter, false);
  frame.addEventListener('dragover', handleDragOver, false);
  frame.addEventListener('dragleave', handleDragLeave, false);
  frame.addEventListener('drop', handleDrop, false);
  frame.addEventListener('dragend', handleDragEnd, false);
}

function copyFrame(e) {
  let frameNum;

  if (e.type === 'click') {
    frameNum = parseInt(e.target.parentNode.getAttribute('id'), 10);
  } else {
    frameNum = parseInt(e.getAttribute('id'), 10);
  }

  const copyElem = framesStorage.slice(frameNum - 1, frameNum);

  const cloneFrame = copyElem[0].frame.cloneNode(true);
  const cloneCarrierCanvas = copyElem[0].canvas[0].cloneNode(true);
  const cloneDrawCanvas = copyElem[0].canvas[1].cloneNode(true);

  const delBtn = cloneFrame.querySelector('.del-button');
  const copyBtn = cloneFrame.querySelector('.dubl-button');

  CreateFrame.addFrameListeners(delBtn, copyBtn, delFrame, copyFrame);

  dragAndDrop(cloneFrame);

  const carrierCtx = cloneCarrierCanvas.getContext('2d');
  const drawCtx = cloneDrawCanvas.getContext('2d');

  carrierCtx.drawImage(copyElem[0].canvas[0], 0, 0);

  CanvasCreate.addCanvasListeners(cloneDrawCanvas);

  chooseActiveFrame(cloneFrame);

  framesStorage.splice(frameNum, 0, {
    frame: cloneFrame,
    canvas: [
      cloneCarrierCanvas,
      cloneDrawCanvas,
    ],
    canvasListeners: addToolsListeners(carrierCtx, drawCtx, cloneCarrierCanvas),
  });

  if (currentToolName && activeButton) {
    addTool();
  }

  refreshFrames();

  refreshCanvas([cloneCarrierCanvas, cloneDrawCanvas]);
}

function chooseTool(button, tool) {
  delTool();

  activeButton = button;
  currentToolName = tool;

  addTool();
}

function addFrame() {
  const frame = CreateFrame.createFrame(framesStorage.length + 1, delFrame, copyFrame);
  const canvasObj = new CanvasCreate(canvasSizeHandle.value, scaleCoef, shiftCoef);
  const carrierCanvas = canvasObj.createCanvas('canvas-item');
  const drawCanvas = canvasObj.createCanvas('canvas-draw-item');

  const carrierCtx = carrierCanvas.getContext('2d');
  const drawCtx = drawCanvas.getContext('2d');

  CanvasCreate.addCanvasListeners(drawCanvas);

  dragAndDrop(frame);

  refreshCanvas([carrierCanvas, drawCanvas]);

  framesStorage.push({
    frame,
    canvas: [
      carrierCanvas,
      drawCanvas,
    ],
    canvasListeners: addToolsListeners(carrierCtx, drawCtx, carrierCanvas),
  });

  if (currentToolName && activeButton) {
    addTool();
  } else {
    activeButton = penToolButton;
    currentToolName = 'penTool';

    addTool();
  }

  const frameStorageLength = framesStorage.length;

  framesStorage[frameStorageLength - 1].frame.setAttribute('id', `${frameStorageLength}-frame`);
  framesStorage[frameStorageLength - 1].canvas[0].setAttribute('id', `${frameStorageLength}-canvas`);
  framesStorage[frameStorageLength - 1].canvas[1].setAttribute('id', `${frameStorageLength}-draw-canvas`);

  framesStorage.forEach((e, i) => {
    if (framesStorage.length - 1 === i) {
      activeFrame = e.frame;
      e.frame.classList.toggle('active-frame', true);
    } else {
      e.frame.classList.toggle('active-frame', false);
    }

    framesWrap.appendChild(e.frame);
  });
}

const chooseToolsStorage = {
  penTool() {
    chooseTool(penToolButton, 'penTool');
  },
  mirrorPenTool() {
    chooseTool(mirrorPenToolButton, 'mirrorPenTool');
  },
  eraserTool() {
    chooseTool(eraserToolButton, 'eraserTool');
  },
  lineTool() {
    chooseTool(lineToolButton, 'lineTool');
  },
  rectTool() {
    chooseTool(rectToolButton, 'rectTool');
  },
  fillRectTool() {
    chooseTool(fillRectToolButton, 'fillRectTool');
  },
  circleTool() {
    chooseTool(arcToolButton, 'arcTool');
  },
  lightenTool() {
    chooseTool(lightenToolButton, 'lightenTool');
  },
  colorPickerTool() {
    chooseTool(colorPickerToolButton, 'colorPickerTool');
  },
};

const toolsStorage = {
  penTool: { button: penToolButton, callback: chooseToolsStorage.penTool },
  mirrorPenTool: { button: mirrorPenToolButton, callback: chooseToolsStorage.mirrorPenTool },
  eraserTool: { button: eraserToolButton, callback: chooseToolsStorage.eraserTool },
  lineTool: { button: lineToolButton, callback: chooseToolsStorage.lineTool },
  rectTool: { button: rectToolButton, callback: chooseToolsStorage.rectTool },
  fillRectTool: { button: fillRectToolButton, callback: chooseToolsStorage.fillRectTool },
  arcTool: { button: arcToolButton, callback: chooseToolsStorage.circleTool },
  lightenTool: { button: lightenToolButton, callback: chooseToolsStorage.lightenTool },
  colorPickerTool: { button: colorPickerToolButton, callback: chooseToolsStorage.colorPickerTool },
};

Object.keys(toolsStorage).forEach((key) => {
  toolsStorage[key].button.addEventListener('click', toolsStorage[key].callback);
});

const keyCodes = {
  keyP: 80,
  keyV: 86,
  keyE: 69,
  keyL: 76,
  keyR: 82,
  keyC: 67,
  keyU: 85,
  keyO: 79,
  keyShift: 16,
  keyN: 78,
  keyX: 88,
  keyF: 70,
  keyPlus: 107,
  keyMinus: 109,
  keyTopArrow: 38,
  keyBottomArrow: 40,
  keyMinusFat: 219,
  keyPlusFat: 221,
  keyCtrl: 17,
};

function addToolsHotKeys() {
  const rectCombo = { keyR: false, keyCtrl: false };

  document.addEventListener('keydown', (e) => {
    switch (e.keyCode) {
      case keyCodes.keyP:
        chooseToolsStorage.penTool();
        break;
      case keyCodes.keyV:
        chooseToolsStorage.mirrorPenTool();
        break;
      case keyCodes.keyE:
        chooseToolsStorage.eraserTool();
        break;
      case keyCodes.keyL:
        chooseToolsStorage.lineTool();
        break;
      case keyCodes.keyR:
        rectCombo.keyR = true;
        break;
      case keyCodes.keyC:
        chooseToolsStorage.circleTool();
        break;
      case keyCodes.keyU:
        chooseToolsStorage.lightenTool();
        break;
      case keyCodes.keyO:
        chooseToolsStorage.colorPickerTool();
        break;
      case keyCodes.keyCtrl:
        rectCombo.keyCtrl = true;
        break;
      default:
        break;
    }

    switch (true) {
      case (rectCombo.keyR && rectCombo.keyCtrl):
        chooseToolsStorage.fillRectTool();
        break;
      case (rectCombo.keyR && rectCombo.keyCtrl === false):
        chooseToolsStorage.rectTool();
        break;
      default:
        break;
    }
  });

  document.addEventListener('keyup', (e) => {
    switch (e.keyCode) {
      case keyCodes.keyR:
        rectCombo.keyR = false;
        break;
      case keyCodes.keyCtrl:
        rectCombo.keyCtrl = false;
        break;
      default:
        break;
    }
  });
}

function choosePrevFrame() {
  const frameNum = parseInt(activeFrame.getAttribute('id'), 10);

  if (frameNum > 1) {
    if (activeFrame) {
      activeFrame.classList.toggle('active-frame', false);
      activeFrame = framesStorage[frameNum - 2].frame;
      activeFrame.classList.toggle('active-frame', true);
    } else {
      activeFrame = framesStorage[frameNum - 2].frame;
      activeFrame.classList.toggle('active-frame', true);
    }

    refreshCanvas(framesStorage[frameNum - 2].canvas);
  }
}

function chooseNextFrame() {
  const frameNum = parseInt(activeFrame.getAttribute('id'), 10);

  if (frameNum < framesStorage.length) {
    if (activeFrame) {
      activeFrame.classList.toggle('active-frame', false);
      activeFrame = framesStorage[frameNum].frame;
      activeFrame.classList.toggle('active-frame', true);
    } else {
      activeFrame = framesStorage[frameNum].frame;
      activeFrame.classList.toggle('active-frame', true);
    }

    refreshCanvas(framesStorage[frameNum].canvas);
  }
}

addToolsHotKeys();

function addInterfaseHotKeys() {
  const copyFrameCombo = { keyShift: null, keyN: null };
  const fpsCombo = { keyF: null, keyPlus: null, keyMinus: null };

  document.addEventListener('keydown', (e) => {
    switch (e.keyCode) {
      case keyCodes.keyShift:
        copyFrameCombo.keyShift = keyCodes.keyShift;
        break;
      case keyCodes.keyN:
        copyFrameCombo.keyN = keyCodes.keyN;
        break;
      case keyCodes.keyX:
        Handles.swapColor();
        break;
      case keyCodes.keyF:
        fpsCombo.keyF = keyCodes.keyF;
        break;
      case keyCodes.keyPlus:
        fpsCombo.keyPlus = keyCodes.keyPlus;
        break;
      case keyCodes.keyMinus:
        fpsCombo.keyMinus = keyCodes.keyMinus;
        break;
      case keyCodes.keyTopArrow:
        choosePrevFrame();
        break;
      case keyCodes.keyBottomArrow:
        chooseNextFrame();
        break;
      case keyCodes.keyMinusFat:
        fatHandle.value -= 1;
        currentFat.innerHTML = fatHandle.value;
        break;
      case keyCodes.keyPlusFat:
        fatHandle.value += 1;
        currentFat.innerHTML = fatHandle.value;
        break;
      default:
        break;
    }

    switch (true) {
      case (copyFrameCombo.keyShift === keyCodes.keyShift && copyFrameCombo.keyN === keyCodes.keyN):
        copyFrame(activeFrame);
        refreshAnimation();
        break;
      case (copyFrameCombo.keyShift === null && copyFrameCombo.keyN === keyCodes.keyN):
        addFrame();
        refreshAnimation();
        break;
      case (fpsCombo.keyF === keyCodes.keyF && fpsCombo.keyPlus === keyCodes.keyPlus):
        fpsHandle.value += 1;
        currentFps.innerHTML = fpsHandle.value;
        refreshAnimation();
        break;
      case (fpsCombo.keyF === keyCodes.keyF && fpsCombo.keyMinus === keyCodes.keyMinus):
        fpsHandle.value -= 1;
        currentFps.innerHTML = fpsHandle.value;
        refreshAnimation();
        break;
      default:
        break;
    }
  });

  document.addEventListener('keyup', (e) => {
    switch (e.keyCode) {
      case keyCodes.keyShift:
        copyFrameCombo.keyShift = null;
        break;
      case keyCodes.keyN:
        copyFrameCombo.keyN = null;
        break;
      case keyCodes.keyF:
        fpsCombo.keyF = null;
        break;
      case keyCodes.keyPlus:
        fpsCombo.keyPlus = null;
        break;
      case keyCodes.keyMinus:
        fpsCombo.keyMinus = null;
        break;
      default:
        break;
    }
  });
}

addInterfaseHotKeys();

framesWrap.addEventListener('mousedown', (e) => {
  const frameNum = parseInt(e.target.getAttribute('id'), 10);

  chooseActiveFrame(e.target);

  if (framesStorage.length > 0) {
    refreshCanvas(framesStorage[frameNum - 1].canvas);
  }
}, true);

function toggleFullScreen() {
  if (!animationContainer.fullscreenElement) {
    animationContainer.requestFullscreen();
  } else if (animationContainer.exitFullscreen) {
    animationContainer.exitFullscreen();
  }
}

document.addEventListener('keydown', (e) => {
  const keyF11 = 122;

  if (e.keyCode === keyF11) {
    e.preventDefault();

    toggleFullScreen();
  }
}, false);
