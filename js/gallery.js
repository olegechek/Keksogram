import { createPhotoArray } from './data.js'
import { createBigPicturePopup } from './big-picture.js';

const picturesList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const pictureListFragment = document.createDocumentFragment();

createPhotoArray.forEach(({ url, likes, comments, description }) => {

  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__img').alt = description;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureElement.querySelector('.picture__likes').textContent = likes;


  pictureElement.addEventListener('click', (evt) => {                              //Функция вызова окна большой картинки по клику на каждую маленькую картинку
    evt.preventDefault();
    createBigPicturePopup(url, likes, comments, description);
  });


  pictureListFragment.appendChild(pictureElement);
});

picturesList.appendChild(pictureListFragment);

