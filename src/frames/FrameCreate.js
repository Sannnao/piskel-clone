export default class CreateFrame {
  static createFrame(frameNumber, delCallback, copyCallback) {
    const frame = document.createElement('div');

    const frameNum = document.createElement('div');
    const delBtn = document.createElement('button');
    const copyBtn = document.createElement('button');

    frame.setAttribute('class', 'frame-wrap');
    frame.style.order = frameNumber;
    frame.setAttribute('draggable', 'true');

    frameNum.setAttribute('class', 'frame-btn frame-num');
    frameNum.addEventListener('click', (e) => {
      e.stopPropagation();
    });
    delBtn.setAttribute('class', 'frame-btn del-button');
    copyBtn.setAttribute('class', 'frame-btn dubl-button');

    frameNum.innerHTML = frameNumber;
    delBtn.innerHTML = 'Del';
    copyBtn.innerHTML = 'Copy';

    CreateFrame.addFrameListeners(delBtn, copyBtn, delCallback, copyCallback);

    frame.appendChild(frameNum);
    frame.appendChild(delBtn);
    frame.appendChild(copyBtn);

    return frame;
  }

  static addFrameListeners(del, copy, delCallback, copyCallback) {
    del.addEventListener('click', delCallback, false);
    copy.addEventListener('click', copyCallback, false);
  }
}
