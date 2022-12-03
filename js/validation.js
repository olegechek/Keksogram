//ФУНКЦИЯ РАЗБИЕНИЯ СТРОКИ ШЭХТЕГОВ В МАССИВ ИЗ ОТДЕЛЬНЫХ СЛОВ
const getHashTagArray = (stringData) => {
  const arrayData = stringData.trim().replace(/\s+/g, ' ').split(' ');
  //const arrayData = stringData.trim().split(/\s+/); тоже работает
  return arrayData;
}


//ФУНКЦИЯ ПРОВЕРКИ ХЭШТЕГА НА ОТСУТСТВИЕ ПОСТОРОННИХ СИМВОЛОВ
const checkHashTagSymbols = (word) => {
  const string = ('#01234567890ABCDEFGHIJKLMNOPQRSTUVWXYZАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ');
  let flag = true;
  for (let i = 0; i < word.length; i++) {
    flag = false;
    for (let j = 0; j < string.length; j++) {
      if (word.toUpperCase()[i] === string[j]) {
        flag = true;
      }
    }
    if (flag === false) {
      return flag
    }
  } return flag;
}


//фУНКЦИЯ ПРОВЕРКИ МАССИВА ХЕШТЕГОВ НА ПОВТОРЕНИЯ СРЕДИ НИХ
const findDoubleHashTagInArray = (array) => {
  let flag = false;
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (array[i].toUpperCase() === array[j].toUpperCase()) {
        flag = true;
        return flag;
      }
    }
  } return flag
}

//ФУНКЦИЯ ПО ОТРИСОВКЕ И УДАЛЕНИЮ КРАСНОЙ РАМКИ ОКНА ВВОДА ПРИ ОШИБКЕ ВАЛИДАЦИИ
const createErrorBorder = (inputField) => {

  if (inputField.validity.customError) {
    inputField.setAttribute('style', 'outline: none; border: 2px solid red');
  } else {
    inputField.removeAttribute('style');
  }
}





//      ***********    ОСНОВНОЕ ТЕЛО ПРОГРАММЫ   **************     //


// **** ВАЛИДАЦИЯ ОКНА ХЭШТЕГОВ **** //

const hashTagForm = document.querySelector('.text__hashtags');                     // Узел окошка ввода хэштегов

hashTagForm.noValidate = true;

hashTagForm.addEventListener('input', () => {

  const hashTagArray = getHashTagArray(hashTagForm.value);

  for (let i = 0; i < hashTagArray.length; i++) {

    const element = hashTagArray[i];

    if (element === '') {
      hashTagForm.setCustomValidity('');

    } else if (element[0] != '#') {
      hashTagForm.setCustomValidity('Любой хэш-тег начинается с символа # (решётка)');
      break
    } else if (element.length < 2) {
      hashTagForm.setCustomValidity('Любой хеш-тег не может состоять только из одной решётки');
      break
    } else if ((element.indexOf('#') != element.lastIndexOf('#')) && (element.lastIndexOf('#') != -1)) {
      hashTagForm.setCustomValidity('Хэш-теги должны разделяться пробелами');
      break
    } else if (checkHashTagSymbols(element) == false) {
      hashTagForm.setCustomValidity('Cтрока после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.');
      break
    } else if (element.length > 20) {
      hashTagForm.setCustomValidity('Максимальная длина одного хэш-тега 20 символов, включая решётку');
      break
    } else {
      hashTagForm.setCustomValidity('');
    }
  }

  if (findDoubleHashTagInArray(hashTagArray) === true) {
    hashTagForm.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды (хэш-теги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом)');
  } else if (hashTagArray.length > 5) {
    hashTagForm.setCustomValidity('Нельзя указывать больше пяти хэш-тегов');
  }

  createErrorBorder(hashTagForm);

  hashTagForm.reportValidity();
});



// **** ВАЛИДАЦИЯ ОКНА КОММЕНТАРИЕВ **** //

const commentsForm = document.querySelector('.text__description');                     // Узел окошка ввода комментов

commentsForm.noValidate = true;

commentsForm.addEventListener('input', () => {


  if (commentsForm.value.length > 140) {
    commentsForm.setCustomValidity('Длина комментария не может составлять больше 140 символов');
  } else {
    commentsForm.setCustomValidity('');
  }

  createErrorBorder(commentsForm);

  commentsForm.reportValidity();
});


// *** БЛОКИРОВКА ВСПЛЫТИЯ СОБЫТИЯ О НАЖАТИИ КНОПОК В ОКНАХ ХЭШТЕГОВ И КОММЕНТОВ ***//
const textInputZone = document.querySelector('.text');

textInputZone.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});
