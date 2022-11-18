import { getPhotoObjectArray } from './data.js'

const createPhotoArray = getPhotoObjectArray();

const picturesList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const pictureListFragment = document.createDocumentFragment();

createPhotoArray.forEach(({ url, likes, comments, description }) => {

  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__img').alt = description;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureListFragment.appendChild(pictureElement);
});



picturesList.appendChild(pictureListFragment);



export { createPhotoArray };


/*
// мой вариант - более простой
for (let i = 0; i < createPhotoArray.length; i++) {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = createPhotoArray[i].url;
  pictureElement.querySelector('.picture__comments').textContent = createPhotoArray[i].comments.length;
  pictureElement.querySelector('.picture__likes').textContent = createPhotoArray[i].likes;

  pictureListFragment.appendChild(pictureElement);
}

picturesList.appendChild(pictureListFragment);
*/
