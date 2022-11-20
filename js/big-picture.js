const bigPictureContainer = document.querySelector('.big-picture');                          // загнал в переменную всю разметку по всплываюющему большому фото - сюда буду заливать данные
const bigPictureCancelButton = document.querySelector('.big-picture__cancel');               // загнал в переменную кнопку закрытия попапа


bigPictureContainer.querySelector('.social__comment-count').classList.add('hidden');         // Попросили спрятать до следующего урока
bigPictureContainer.querySelector('.comments-loader').classList.add('hidden');               // Попросили спрятать до следующего урока


const socialCommentTemplate = bigPictureContainer.querySelector('.social__comment').cloneNode(true); // Сделал шаблон разметки с первого комментария в разметке DOM
bigPictureContainer.querySelector('.social__comments').innerHTML = '';                               //Удалил из разметки два первых комментария, которые там были сами по себе, и первый из которых мы юзали как шаблон


// ФУНКЦИЯ ПО ДОБАВЛЕНИЮ КОММЕНТАРИЕВ ИЗ РАНДОМНОГО МАССИВА В РАЗМЕТКУ БОЛЬШОГО ФОТО
const addComments = (commentArray) => {

  const socialCommentFragment = document.createDocumentFragment();                     // создал корзинку для всех комментариев

  commentArray.forEach((commentElement) => {                                           // перебираем все элементы массива комментариев

    const socialCommentItem = socialCommentTemplate.cloneNode(true);                        // сделал шаблон из ранее сделанного клона (т.к. реальную разметку мы удалили уже)
    socialCommentItem.querySelector('.social__picture').src = commentElement.avatar;        // скормил в шаблон аватар из массива комментов
    socialCommentItem.querySelector('.social__picture').alt = commentElement.name;          // скормил в шаблон имя  из массива комментов
    socialCommentItem.querySelector('.social__text').textContent = commentElement.message;  // скормил в шаблон текст комментария

    socialCommentFragment.appendChild(socialCommentItem);  // кинул заполненный шаблон в корзинку
  });

  bigPictureContainer.querySelector('.social__comments').appendChild(socialCommentFragment);  // Корзинку прицепил в разметку
};



// ФУНКЦИЯ ОТКРЫТИЯ БОЛЬШОГО ОКНА С ФОТО //

const createBigPicturePopup = (url, likes, comments, description) => {

  document.querySelector('body').classList.add('modal-open');                             //Добавляем эту хрень при открытии большого фото, чтобы задний фон не дрыгался

  bigPictureContainer.querySelector('.big-picture__img').querySelector('img').src = url;  //Переносим фото в большое окно

  bigPictureContainer.querySelector('.social__caption').textContent = description;        //Переносим описание фото в большое окно


  bigPictureContainer.querySelector('.likes-count').textContent = likes;                  //Переносим лайки в большое окно

  bigPictureContainer.querySelector('.comments-count').textContent = comments.length;     //Переносим число комментов в большое окно

  addComments(comments);                                                                  // Вызвал функцию добавления комментов на основе массива комментариев к конкретнному нажатому фото (из data.js)

  bigPictureContainer.classList.remove('hidden');                                         //Заставляем окно появиться после всего что мы туда напихали
}


// ФУНКЦИЯ ЗАКРЫТИЯ БОЛЬШОГО ОКНА С ФОТО

const closeBigPictureWindow = () => {
  bigPictureContainer.classList.add('hidden');                                       //Закрываем большое окно
  document.querySelector('body').classList.remove('modal-open');                     //Чтобы задний фон задрыгался опять
  bigPictureContainer.querySelector('.social__comments').innerHTML = '';             //Затираем данные по комментам, которые были переданы с фоткой (иначе они начнут копиться)
};



//   ****************  ОСНОВНОй КОД  *******************    //
/*
for (let i = 0; i < currentPictures.length; i++) {                                     //Перебираем все картинки на экране - определяем что будет с каждой из них если нажать на нее
  createBigPicturePopup(currentPictures[i], createPhotoArray[i].comments);

}*/

bigPictureCancelButton.addEventListener('click', closeBigPictureWindow);           //Обработчик на закрытие окна при нажатии на крестик большого фото

window.addEventListener('keydown', (evt) => {                                     //Обработчик на закрытие окна при нажатии на клавишу ESC
  if (evt.key === 'Escape') { closeBigPictureWindow() }
});



export { createBigPicturePopup }






