const profileEdit = document.querySelector('.profile__edit-button'); //Находим кнопку редактирования
const popupEdit = document.querySelector('.popup_type_edit'); //Находим кнопку попап
const popupCloseEdit = popupEdit.querySelector('.popup__close_type_edit'); //Находим кнопку закрытия
const popupNameEdit = popupEdit.querySelector('.popup__name_type_edit'); //Находим поле ввода имени в попапе
const profileName = document.querySelector('.profile__name'); //Находим имя профиля на странице

const popupAboutEdit = popupEdit.querySelector('.popup__about_type_edit'); //Находим поле ввода о себе в попапе
const profileAbout = document.querySelector('.profile__about'); //Находим о себе профиля на странице

// Функции для открытия и закрытия попапов

const popupOpen = (popup) => {
  popup.classList.add('popup_opened');
}

const popupClose = (popup) => {
  popup.classList.remove('popup_opened');
}

profileEdit.addEventListener('click', () => { //Команда по клику для кнопки редактирования
  popupOpen(popupEdit); //Добавление класса попапу, чтобы он появился на странице
  popupNameEdit.value = profileName.textContent; //Команда, которая заполняет поле ввода имени в попапе именем профиля на странице
  popupAboutEdit.value = profileAbout.textContent; //Команда, которая заполняетполе ввода о себе в попапе тем, что содержится в "о себе" профиля на странице
});

popupCloseEdit.addEventListener('click', () => { //Команда по клику для кнопки закрытия
  popupClose(popupEdit); //Удаление класса попапу, чтобы он закрылся на странице
});

function submitHandleEdit(evt) { //Функция для кнопки сохранения
  evt.preventDefault(); //Отмена свойств
  profileName.textContent = popupNameEdit.value; //Команда, которая будет заменять имя профиля текстом из поля ввода имени в попапе
  profileAbout.textContent = popupAboutEdit.value; //Команда, которая будет заменять "о себе" текстом из поля ввода "о себе" в попапе
  popupClose(popupEdit); //Удаление класса попапу, чтобы он закрылся на странице
};

popupEdit.addEventListener('submit', submitHandleEdit); //Команда по клику для кнопки сохранения

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Команда для поиска блока с карточками и шаблона карточки

const cards = document.querySelector('.cards');
const cardTemplate = document.querySelector('#card-template').content.querySelector('.cards__item');

// Функция для удаления ближайшего элемента с классом cards__item

const handleDeleteCard = (evt) => {
  evt.preventDefault();
  evt.target.closest('.cards__item').remove();
};

// Функция для изменения лайка

const handleLikeCard = (evt) => {
  evt.preventDefault();
  evt.target.classList.toggle('cards__like-button_active');
};

// Команды для поиска элементов попапа с картинкой

const popupTypeImage = document.querySelector('.popup_type_image');
const popupCloseImage = document.querySelector('.popup__close_type_image');
const popupImage = document.querySelector('.popup__image');
const popupImageTitle = document.querySelector('.popup__image-title');

// Функция для закрытия попапа

popupCloseImage.addEventListener('click', () => {
  popupClose(popupTypeImage);
  popupImage.src = '';
  popupImage.alt = '';
});

// Функция, в которой клонируется карточка, заполняется содержимым из массива, добавляются команды: кнопке удаления, кнопке лайка, открытие попапа при нажатии на картинку

const generateCard = (dataCard) => {
  const cardItem = cardTemplate.cloneNode(true);
  const title = cardItem.querySelector('.cards__title');
  const image = cardItem.querySelector('.cards__image');

  title.textContent = dataCard.name;
  image.src = dataCard.link;
  image.alt = dataCard.name;

  const deleteButton = cardItem.querySelector('.cards__delete-button');
  deleteButton.addEventListener('click', handleDeleteCard);

  const likeButton = cardItem.querySelector('.cards__like-button');
  likeButton.addEventListener('click', handleLikeCard);

  const cardImage = cardItem.querySelector('.cards__image');
  cardImage.addEventListener('click', (evt) => {
    evt.preventDefault();
    popupOpen(popupTypeImage);
    popupImage.src = cardImage.src;
    popupImage.alt = dataCard.name;
    popupImageTitle.textContent = dataCard.name;
  });
  
  return cardItem;
};

// Команда для отображения карточек на экране

const renderCard = (dataCard) => {
  cards.append(generateCard(dataCard));
};

initialCards.forEach((dataCard) => {
  renderCard(dataCard);
});

// Команды для поиска кнопки добавления карточки, попапа, кнопки закрытия попапа

const addButton = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('.popup_type_add');
const popupCloseAdd = document.querySelector('.popup__close_type_add');

// Команды для поиска полей ввода попапа

const popupNameAdd = popupAdd.querySelector('.popup__name_type_add');
const popupAboutAdd = popupAdd.querySelector('.popup__about_type_add');

// Команды по нажитию кнопок для открытия и закрытия попапа

addButton.addEventListener('click', () => {
  popupOpen(popupAdd);
});

popupCloseAdd.addEventListener('click', () => {
  popupClose(popupAdd);
  popupAboutAdd.value = '';
  popupNameAdd.value = '';
});

// Функция для добавления карточки и ее заполнения

const addCard = (dataCard) => {
  cards.prepend(generateCard(dataCard));
};

const handleAddCard = (evt) => {
  evt.preventDefault();
  addCard({ name: popupNameAdd.value, link: popupAboutAdd.value });
  popupClose(popupAdd);
  popupAboutAdd.value = '';
  popupNameAdd.value = '';
};

popupAdd.addEventListener('submit', handleAddCard);