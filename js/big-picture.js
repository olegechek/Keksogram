import { createPhotoArray } from './gallery.js';

const currentPictures = document.querySelectorAll('.picture');                               // сделал МАССИВ всех появившишся картинок
const bigPictureContainer = document.querySelector('.big-picture');                          // загнал в переменную всю разметку по всплываюющему большому фото
const bigPictureCancelButton = document.querySelector('.big-picture__cancel');               // загнал в переменную кнопку закрытия попапа

const socialCommentClone = bigPictureContainer.querySelector('.social__comment').cloneNode(true); // Сделал клон разметки с первого комментария в разметке
bigPictureContainer.querySelector('.social__comment').remove();                               //Удалил из разметки два первых комментария, которые там были сами по себе, и первый из которых мы юзали как шаблон
bigPictureContainer.querySelector('.social__comment').remove();


for (let i = 0; i < currentPictures.length; i++) {                                     //Перебираем все картинки на экране - определяем что будет с каждой из них если нажать на нее

  currentPictures[i].addEventListener('click', (evt) => {                              //Функция вызова окна большой картинки по клику на каждую маленькую картинку
    evt.preventDefault();

    document.querySelector('body').classList.add('modal-open');                        //Добавляем эту хрень при открытии большого фото, чтобы задний фон не дрыгался

    bigPictureContainer.querySelector('.big-picture__img').querySelector('img').src =  //Переносим фото в большое окно
      currentPictures[i].querySelector('.picture__img').src;

    bigPictureContainer.querySelector('.social__caption').textContent =                //Переносим описание фото в большое окно
      currentPictures[i].querySelector('.picture__img').alt;


    bigPictureContainer.querySelector('.likes-count').textContent =                    //Переносим лайки в большое окно
      currentPictures[i].querySelector('.picture__likes').textContent;

    bigPictureContainer.querySelector('.comments-count').textContent =                 //Переносим число комментов в большое окно
      currentPictures[i].querySelector('.picture__comments').textContent;



    /*      здесь отдельно работа со вставкой комментариев       */

    const commentArray = createPhotoArray[i].comments;                                   // забрал массив комментариев к конкретнному нажатому фото (из data.js)
    const socialCommentCollection = document.createDocumentFragment();                   // создал корзинку для всех комментариев

    for (let j = 0; j < commentArray.length; j++) {                                      // перебираем все элементы массива комментариев

      const socialCommentTemplate = socialCommentClone.cloneNode(true);                            // сделал шаблон из ранее сделанного клона (т.к. реальную разметку мы удалили уже)
      socialCommentTemplate.querySelector('.social__picture').src = commentArray[j].avatar;        // скормил в шаблон аватар из массива комментов
      socialCommentTemplate.querySelector('.social__picture').alt = commentArray[j].name;          // скормил в шаблон имя  из массива комментов
      socialCommentTemplate.querySelector('.social__text').textContent = commentArray[j].message; // скормил в шаблон текст комментария

      socialCommentCollection.appendChild(socialCommentTemplate);  // кинул заполненный шаблон в корзинку

    }

    bigPictureContainer.querySelector('.social__comments').appendChild(socialCommentCollection);  // Корзинку прицепил в разметку


    bigPictureContainer.classList.remove('hidden');                                      //Заставляем окно появиться после всего что мы туда напихали

    bigPictureContainer.querySelector('.social__comment-count').classList.add('hidden'); // Попросили спрятать до следующего урока
    bigPictureContainer.querySelector('.comments-loader').classList.add('hidden');       // Попросили спрятать до следующего урока


    bigPictureCancelButton.addEventListener('click', function () {                       //Обработчик на закрытие окна при нажатии на крестик большого фото
      bigPictureContainer.classList.add('hidden');                                       //Закрываем большое окно
      document.querySelector('body').classList.remove('modal-open');                     //Чтобы задний фон задрыгался опять

      while (bigPictureContainer.querySelector('.social__comments').lastElementChild) {   // Корзинку удалил из разметки после закрытия окна большого фото. Удалял не всей корзинкой, а поэлементно вот таким дебильным циклом.
        bigPictureContainer.querySelector('.social__comments').removeChild(bigPictureContainer.querySelector('.social__comments').lastElementChild);
      }

    });

  });
}






