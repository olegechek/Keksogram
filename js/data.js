import { getRandomDigit, getRandomDigitArray } from './util.js'



// Функция по созданию объекта - комментария для фото объекта

const getComment = () => {

  const comment = { id: randomCommentIdArray[0], avatar: 'img/avatar-' + getRandomDigit(1, 6) + '.svg', message: commentMessageArray[getRandomDigit(0, 5)], name: commentNameArray[getRandomDigit(0, 11)] };

  return comment;
}


// Функция по созданию массива комментариев

const getCommentArray = (numberOfObjects) => {
  let commentArray = [];
  for (let i = 0; i < numberOfObjects; i++) {
    commentArray.push(getComment());
    randomCommentIdArray.splice(0, 1);
  }
  return commentArray;
}



// Функция по созданию Фото-объекта

const getPhotoObject = (idNumber) => {

  const photoObject = { id: idNumber, url: 'photos/' + idNumber + '.jpg', description: descriptionArray[idNumber - 1], likes: getRandomDigit(likes.MIN, likes.MAX), comments: getCommentArray(getRandomDigit(commentsRange.MIN, commentsRange.MAX)) };

  return photoObject;

}



const NUMBER = 25;         //число записей массива - фоток с комментариями

const likes = { MIN: 15, MAX: 200 };

const commentsRange = { MIN: 1, MAX: 5 };


const descriptionArray = ['Пироги', 'Прелести', 'Фантики', 'Класс', 'Минутка', 'Вечер', 'Часики', 'Робот', 'Игрушки', 'Стены', 'Закат', 'Скорость', 'Лодка', 'Шторм', 'Дождик', 'Ненастье', 'Рыбалка', 'Красота', 'Свет', 'Мишина', 'Трава', 'Домики', 'Зверюшки', 'Платья', 'Окна'];

const commentNameArray = ['Петя', 'Коля', 'Лена', 'Гриша', 'Тамара', 'Костя', 'Арчибальд', 'Тарас', 'Назар', 'Юля', 'Таня', 'Ричард'];

const commentMessageArray = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];


const randomCommentIdArray = getRandomDigitArray(1, NUMBER * commentsRange.MAX); //Массив рандомных чисел для получения рандомного Id комментария без повторений


// Конечная функция по созданию массива Фото-объектов

const getPhotoObjectArray = () => {

  const finalArray = [];


  for (let i = 0; i < NUMBER; i++) {
    finalArray.push(getPhotoObject(i + 1));
  }
  return finalArray;
}

export {getPhotoObjectArray};
