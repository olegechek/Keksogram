
// Функция случайного числа

const getRandomDigit = (minValue, maxValue) => {

  if (minValue < 0 || maxValue < 0) {
    return -1;
  }

  let difference = maxValue - minValue;

  if (difference < 0) {
    difference *= -1;
    minValue = maxValue;
  }

  let randomForDifference = Math.ceil(Math.random() * (difference + 1)) - 1;

  return (minValue + randomForDifference);
}

getRandomDigit(1, 5);




// Функция создания массива случайных чисел

const getRandomDigitArray = (arrayValue = 100, minNumber = 1, maxNumber = 100) => {
  const array = [];
  for (let i = 0; i < arrayValue; i++) {
    array.push(getRandomDigit(minNumber, maxNumber));
  }
  return array;
}




// Функция проверки максимальной длины строки

const checkStringLength = (stringGiven, lengthGiven) => {
  return (stringGiven.length <= lengthGiven) ? true : false;
}

checkStringLength('Ура Ура Ура', 10);




// Функция по созданию объекта - комментария для фото объекта

const getComment = (randomIdArray, numberInIdArray = 0) => {

  const messageArray = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

  const nameArray = ['Петя', 'Коля', 'Лена', 'Гриша', 'Тамара', 'Костя', 'Арчибальд', 'Тарас', 'Назар', 'Юля', 'Таня', 'Ричард'];

  const comment = { id: randomIdArray[numberInIdArray], avatar: 'img/avatar-' + getRandomDigit(1, 6) + '.svg', message: messageArray[getRandomDigit(0, 5)], name: nameArray[getRandomDigit(0, 11)] };

  return comment;
}


// Функция по созданию Фото-объекта

const getPhotoObject = (idNumber, randomCommentIdArray) => {

  const photoTitle = ['Пироги', 'Прелести', 'Фантики', 'Класс', 'Минутка', 'Вечер', 'Часики', 'Робот', 'Игрушки', 'Стены', 'Закат', 'Скорость', 'Лодка', 'Шторм', 'Дождик', 'Ненастье', 'Рыбалка', 'Красота', 'Свет', 'Мишина', 'Трава', 'Домики', 'Зверюшки', 'Платья', 'Окна'];

  const photoObject = { id: idNumber, url: 'photos/' + idNumber + '.jpg', description: photoTitle[idNumber - 1], likes: getRandomDigit(15, 200), comments: getComment(randomCommentIdArray, idNumber) };

  return photoObject;

}


//  Функция по созданию массива фото-объектов

const getPhotoObjectArray = (numberOfObjects = 25) => {

  const randomCommentIdArray = getRandomDigitArray(numberOfObjects);

  const array = [];


  for (let i = 0; i < numberOfObjects; i++) {
    array.push(getPhotoObject((i + 1), randomCommentIdArray));
  }
  return array
}



// Сама программа


const NUMBER = 25;

getPhotoObjectArray(NUMBER);






