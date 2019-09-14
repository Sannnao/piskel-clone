export default class FpsHandle {
  static addFpsHandle() {
    const currentFps = document.querySelector('#fps');
    const fpsHandle = document.querySelector('.fps-handle');

    fpsHandle.addEventListener('input', () => {
      currentFps.innerHTML = fpsHandle.value;
    });
  }

  static addFatHandle() {
    const currentFat = document.querySelector('#fat');
    const fatHandle = document.querySelector('.fat-handle');

    fatHandle.addEventListener('input', () => {
      currentFat.innerHTML = fatHandle.value;
    });
  }

  static swapColor() {
    const color = document.querySelector('#color-1');
    const color2 = document.querySelector('#color-2');

    const colorStorage = color.value;
    const colorStorage2 = color2.value;

    color.value = colorStorage2;
    color2.value = colorStorage;
  }
}
