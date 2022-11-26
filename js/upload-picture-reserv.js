const newPhotoInput = document.querySelector('#upload-file');     //Взял поле для загрузки файлов-фотографий

const uploadContainer = document.querySelector('.img-upload__overlay');  //Взял попап, который появляется после загрузки нового фото

const uploadContainerClose = uploadContainer.querySelector('.img-upload__cancel');  // Взял кнопку закрытия попапа

let transformStyle = '';
let filterStyle = '';


const closeUploadContainer = () => {                   // ФУНКЦИЯ ЗАКРЫТИЯ ОКНА ПОПАПА
  uploadContainer.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  newPhotoInput.value = '';
}



const defineScale = () => {                           //ФУНКЦИЯ ОПРЕДЕЛЕНИЯ МАСШТАБА фОТО

  const scaleBlock = document.querySelector('.img-upload__scale');
  const smallerButton = scaleBlock.querySelector('.scale__control--smaller');
  const biggerButton = scaleBlock.querySelector('.scale__control--bigger');
  let scaleWindow = scaleBlock.querySelector('.scale__control--value');

  const preViewPicture = document.querySelector('.img-upload__preview');

  transformStyle = '';

  let scaleValue = 1;

  scaleWindow.setAttribute('value', `${scaleValue * 100}%`);
  preViewPicture.setAttribute('style', `transform:scale(${scaleValue})`);

  smallerButton.addEventListener('click', () => {
    if (scaleValue > 0.25) {
      scaleValue -= 0.25;
      console.log(scaleValue);
    } else {
      scaleValue = 0.25;
    }
    scaleWindow.setAttribute('value', `${scaleValue * 100}%`);
    transformStyle = `transform:scale(${scaleValue})`;
    preViewPicture.setAttribute('style', `${filterStyle}; ${transformStyle}`);
  });

  biggerButton.addEventListener('click', () => {
    if (scaleValue < 1) {
      scaleValue += 0.25;
    } else {
      scaleValue = 1;
    }
    scaleWindow.setAttribute('value', `${scaleValue * 100}%`);
    transformStyle = `transform:scale(${scaleValue})`;
    preViewPicture.setAttribute('style', `${filterStyle}; ${transformStyle}`);
    console.log(transformStyle);
  });

  return scaleValue;
};


const showSlider = (effectName) => {                     // ФУНКЦИЯ СОЗДАНИЯ СЛАЙДЕРА ДЛЯ ГЛУБИНЫ ЭФФЕКТОВ

  const effectNameData = {
    chrome: { min: 0, max: 1, start: 1, step: 0.1, measure: '', effect: 'grayscale' },
    sepia: { min: 0, max: 1, start: 1, step: 0.1, measure: '', effect: 'sepia' },
    marvin: { min: 0, max: 100, start: 100, step: 1, measure: '%', effect: 'invert' },
    phobos: { min: 0, max: 3, start: 3, step: 0.1, measure: 'px', effect: 'blur' },
    heat: { min: 1, max: 3, start: 3, step: 0.1, measure: '', effect: 'brightness' },
  };

  const sliderElement = document.querySelector('.effect-level__slider');

  if (sliderElement.noUiSlider) {
    sliderElement.noUiSlider.destroy();
  }

  if (effectName == 'none') {
    if (!sliderElement.noUiSlider) {
      return
    } else {
      sliderElement.noUiSlider.destroy();
      return
    }
  }

  if (!sliderElement.noUiSlider) {

    noUiSlider.create(sliderElement, {
      range: {
        min: effectNameData[effectName].min,
        max: effectNameData[effectName].max,
      },
      start: effectNameData[effectName].start,
      step: effectNameData[effectName].step,
      connect: 'lower',
    });

  } else {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: effectNameData[effectName].min,
        max: effectNameData[effectName].max,
      },
      start: effectNameData[effectName].start,
      step: effectNameData[effectName].step,
      connect: 'lower',
    });
  }

  // дальше надо снимать показания со слайдера и отправлять их в разметку и в стили
  const effectLevel = document.querySelector('.effect-level__value');
  const effectClass = document.querySelector(`.effects__preview--${effectName}`);
  filterStyle = '';
  console.log(effectClass);
  sliderElement.noUiSlider.on('update', (_, handle, unencoded) => {
    const valueElement = unencoded[handle];
    effectLevel.setAttribute('value', valueElement);
    //console.log(preViewEffect);

    filterStyle = `filter: ${effectNameData[effectName].effect}(${valueElement}${effectNameData[effectName].measure})`;
    effectClass.setAttribute('style', `${filterStyle}; ${transformStyle}`);
    console.log(transformStyle);

  });

};



const defineEffect = () => {                          //ФУНКЦИЯ ДОБАВЛЕНИЯ ЭФФЕКТА ДЛЯ ФОТО

  const preViewEffect = document.querySelector('.img-upload__preview');
  const effectsList = document.querySelector('.effects__list');
  let effectName = 'none';
  preViewEffect.setAttribute('class', 'img-upload__preview');
  preViewEffect.classList.add(`effects__preview--${effectName}`);
  console.log(preViewEffect);

  effectsList.addEventListener('change', (evt) => {
    preViewEffect.classList.remove(`effects__preview--${effectName}`);
    effectName = evt.target.value;
    console.log(effectName);
    preViewEffect.classList.add(`effects__preview--${effectName}`);

    showSlider(effectName);

  });
}




//*****     ОСНОВНОЕ   ТЕЛО    ПРОГРАММЫ    ******//

newPhotoInput.addEventListener('change', () => {       //Обрабочик на открытие попапа при изменении в содержимом поля загрузки файлов
  uploadContainer.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.querySelector('#effect-none').checked = true;
  transformStyle = '';
  filterStyle = '';
  defineEffect();
  defineScale();
});


uploadContainerClose.addEventListener('click', closeUploadContainer);             //Обработчик на закрытие попапа при нажатии на крестик выхода
window.addEventListener('keydown', (evt) => {                                     //Обработчик на закрытие попапа при нажатии на клавишу ESC
  if (evt.key === 'Escape') { closeUploadContainer() }
});

console.log(newPhotoInput);
console.log(uploadContainer);
