
// ФУНКЦИЯ ЗАКРЫТИЯ ОКНА ПОПАПА
const closeUploadContainer = () => {
  const newPhotoInput = document.querySelector('.img-upload__input');     //Взял поле для загрузки файлов-фотографий
  const uploadContainer = document.querySelector('.img-upload__overlay');  //Взял попап, который появляется после загрузки нового фото

  uploadContainer.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  newPhotoInput.value = '';
}


// ФУНКЦИЯ ОТРИСОВКИ ИЗОБРАЖЕНИЯ  ПО ВСЕМ ВЫСТАВЛЕННЫМ НАСТРОЙКАМ
const createPicture = () => {
  const scale = document.querySelector('.img-upload__scale');           // Узел окна вывода и кнопок размера масштаба
  const effectName = document.querySelector('.effects__radio:checked'); // Узел выбраной радиокнопки
  const effectLevel = document.querySelector('.effect-level__value');   // Узел где в value хранится уровень еффекта

  const effectsBlock = document.querySelector('.img-upload__effect-level');

  const preViewPicture = document.querySelector('.img-upload__preview'); //Узел где хранится картинка
  const scaleWindow = document.querySelector('.scale__control--value');  // Окно куда будем выводить проценты масштаба

  const effectNameFormula = {
    none: 'none',
    chrome: `grayscale(${effectLevel.value})`,
    sepia: `sepia(${effectLevel.value})`,
    marvin: `invert(${effectLevel.value}%)`,
    phobos: `blur(${effectLevel.value}px)`,
    heat: `brightness(${effectLevel.value})`,
  };

  const effectStyle = `filter: ${effectNameFormula[effectName.value]}`;

  const transformStyle = `transform:scale(${scale.value})`;                     // завели в переменную цифру масштаба

  scaleWindow.setAttribute('value', `${scale.value * 100}%`);                   // Отрисовали проценты в окне масштаба
  preViewPicture.setAttribute('style', `${transformStyle} ; ${effectStyle}`);   // Добавили картинки стиль ее масштаба

  preViewPicture.setAttribute('class', `img-upload__preview effects__preview--${effectName.value}`);  //Добавили класс стиля текущей радиокнопки

  if (effectName.value == 'none') {
    effectsBlock.classList.add('visually-hidden');
  } else {
    effectsBlock.classList.remove('visually-hidden')
  }
}


// ФУНКЦИЯ ПЕРЕДАЧИ НАЧАЛЬНЫХ НАСТРОЕК РАЗМЕТКЕ ПРИ ОТКРЫТИИ ПОПАПА (масштаб, стиль, слайдер)
const getInitialTunes = () => {
  document.querySelector('#effect-none').checked = true;                // Установил активную радиокнопку на первом окошке
  document.querySelector('#effect-none').click();
  const scaleValue = document.querySelector('.img-upload__scale');      // Узел окна вывода и кнопок размера масштаба
  const effectName = document.querySelector('.effects__radio:checked'); // Узел выбраной радиокнопки
  const effectLevel = document.querySelector('.effect-level__value'); // Узел где в value хранится уровень еффекта
  scaleValue.value = 1;
  effectName.setAttribute('value', 'none');
  effectLevel.setAttribute('value', 1);
  createPicture();
}


// фУНКЦИЯ ПЕРЕКЛЮЧЕНИЯ КНОПОК МАСШТАБА
const defineScale = () => {

  const smallerButton = document.querySelector('.scale__control--smaller');  //Узел кнопки увеличения масштаба
  const biggerButton = document.querySelector('.scale__control--bigger');    //Узел кнопки уменьшения масштаба
  const scale = document.querySelector('.img-upload__scale');             //Узел окна вывода и кнопок размера масштаба

  smallerButton.addEventListener('click', () => {
    if (scale.value > 0.25) {
      scale.value -= 0.25;
    } else {
      scale.value = 0.25;
    }
    createPicture();
  });
  biggerButton.addEventListener('click', () => {
    if (scale.value < 1) {
      scale.value += 0.25;
    } else {
      scale.value = 1;
    }
    createPicture();
  });
};


//ФУНКЦИЯ ДОБАВЛЕНИЯ ЭФФЕКТА ДЛЯ ФОТО
const defineEffect = () => {

  const effectsList = document.querySelector('.effects__list');          //Узел контроля радиокнопок

  effectsList.addEventListener('change', () => {                         //При смене радиокнопки обновляется отрисовка
    createPicture();
  });
}


//ФУНКЦИЯ РАБОТЫ СЛАЙДЕРА
const showSlider = () => {
  const sliderElement = document.querySelector('.effect-level__slider'); //Узел для вставки слайдера
  const effectsList = document.querySelector('.effects__list');          //Узел контроля радиокнопок
  let effectName = document.querySelector('.effects__radio:checked');    // Узел выбраной радиокнопки

  const effectNameData = {
    none: { min: 0, max: 1, start: 1, step: 0.1 },
    chrome: { min: 0, max: 1, start: 1, step: 0.1 },
    sepia: { min: 0, max: 1, start: 1, step: 0.1 },
    marvin: { min: 0, max: 100, start: 100, step: 1 },
    phobos: { min: 0, max: 3, start: 3, step: 0.1 },
    heat: { min: 1, max: 3, start: 3, step: 0.1 },
  };

  noUiSlider.create(sliderElement, {                                     //Первичная отрисовка слайдера
    range: {
      min: effectNameData[effectName.value].min,
      max: effectNameData[effectName.value].max,
    },
    start: effectNameData[effectName.value].start,
    step: effectNameData[effectName.value].step,
    connect: 'lower',
    format: {                                                           //Лабуда из документации чтобы дроби после точки не скакали
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });


  effectsList.addEventListener('change', () => {                            //При смене радиокнопки обновляются данные слайдера

    effectName = document.querySelector('.effects__radio:checked');         //Узел выбраной радиокнопки

    sliderElement.noUiSlider.updateOptions({                                //Обновление слайдера
      range: {
        min: effectNameData[effectName.value].min,
        max: effectNameData[effectName.value].max,
      },
      start: effectNameData[effectName.value].start,
      step: effectNameData[effectName.value].step,
      connect: 'lower',
    });
    createPicture();
  });


  sliderElement.noUiSlider.on('update', (values, handle) => {             // Обрабочик движения флажка слайдера
    const effectLevel = document.querySelector('.effect-level__value');   // Узел где в value хранится уровень еффекта
    const valueElement = values[handle];
    effectLevel.setAttribute('value', valueElement);
    createPicture();
  });
}



//*****     ОСНОВНОЕ   ТЕЛО    ПРОГРАММЫ    ******//

const newPhotoInput = document.querySelector('.img-upload__input');     //Взял поле для загрузки файлов-фотографий
const uploadContainer = document.querySelector('.img-upload__overlay');  //Взял попап, который появляется после загрузки нового фото
const uploadContainerClose = uploadContainer.querySelector('.img-upload__cancel');  // Взял кнопку закрытия попапа
const escapeKeys = { ESC: 'Esc', ESCAPE: 'Escape' };


newPhotoInput.addEventListener('change', () => {       //Обрабочик на открытие попапа при изменении в содержимом поля загрузки файлов
  uploadContainer.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  getInitialTunes();
});


uploadContainerClose.addEventListener('click', closeUploadContainer);         //Обработчик на закрытие попапа при нажатии на крестик выхода
window.addEventListener('keydown', (evt) => {
  evt.preventDefault();                                                       //Обработчик на закрытие попапа при нажатии на клавишу ESC
  if (evt.key === escapeKeys.ESC || evt.key === escapeKeys.ESCAPE) {
    closeUploadContainer();
  }
});


defineScale();
defineEffect();
showSlider();

