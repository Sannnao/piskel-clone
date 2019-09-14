export default class Animation {
  static startAnimation(framesStorage) {
    const animationContainer = document.querySelector('.animation-container');
    const fpsHandle = document.querySelector('.fps-handle');

    let itemsCount = 0;

    const fpsCount = fpsHandle.valueAsNumber;

    return setInterval(() => {
      if (itemsCount < framesStorage.length) {
        animationContainer.style.backgroundImage = `url(${framesStorage[itemsCount].canvasImg})`;
        itemsCount += 1;

        if (itemsCount === framesStorage.length) {
          itemsCount = 0;
        }
      }
    }, 1000 / fpsCount);
  }
}
