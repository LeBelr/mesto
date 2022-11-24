const profileEdit = document.querySelector('.profile__edit-button'); //Находим кнопку редактирования
const popupEditProfile = document.querySelector('.popup_type_edit'); //Находим кнопку попап
const popupCloseEdit = popupEditProfile.querySelector('.popup__close_type_edit'); //Находим кнопку закрытия
const popupNameEdit = popupEditProfile.querySelector('.popup__name_type_edit'); //Находим поле ввода имени в попапе
const profileName = document.querySelector('.profile__name'); //Находим имя профиля на странице

const popupAboutEdit = popupEditProfile.querySelector('.popup__about_type_edit'); //Находим поле ввода о себе в попапе
const profileAbout = document.querySelector('.profile__about'); //Находим о себе профиля на странице

// Функции для открытия и закрытия попапов

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
}

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
}

profileEdit.addEventListener('click', () => { //Команда по клику для кнопки редактирования
  openPopup(popupEditProfile); //Добавление класса попапу, чтобы он появился на странице
  popupNameEdit.value = profileName.textContent; //Команда, которая заполняет поле ввода имени в попапе именем профиля на странице
  popupAboutEdit.value = profileAbout.textContent; //Команда, которая заполняетполе ввода о себе в попапе тем, что содержится в "о себе" профиля на странице
});

popupCloseEdit.addEventListener('click', () => { //Команда по клику для кнопки закрытия
  closePopup(popupEditProfile); //Удаление класса попапу, чтобы он закрылся на странице
});

function submitEditProfile(evt) { //Функция для кнопки сохранения
  evt.preventDefault(); //Отмена свойств
  profileName.textContent = popupNameEdit.value; //Команда, которая будет заменять имя профиля текстом из поля ввода имени в попапе
  profileAbout.textContent = popupAboutEdit.value; //Команда, которая будет заменять "о себе" текстом из поля ввода "о себе" в попапе
  closePopup(popupEditProfile); //Удаление класса попапу, чтобы он закрылся на странице
};

popupEditProfile.addEventListener('submit', submitEditProfile); //Команда по клику для кнопки сохранения

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
  closePopup(popupTypeImage);
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
    openPopup(popupTypeImage);
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

const buttonOpenAddCardPopup = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_type_add');
const popupCloseAdd = document.querySelector('.popup__close_type_add');

// Команды для поиска полей ввода попапа

const inputCardName = popupAddCard.querySelector('.popup__name_type_add');
const inputCardLink = popupAddCard.querySelector('.popup__about_type_add');
const popupFormAdd = popupAddCard.querySelector('.popup__form');

// Команды по нажитию кнопок для открытия и закрытия попапа

buttonOpenAddCardPopup.addEventListener('click', () => {
  openPopup(popupAddCard);
  popupFormAdd.reset();
});

popupCloseAdd.addEventListener('click', () => {
  closePopup(popupAddCard);
});

// Функция для добавления карточки и ее заполнения

const addCard = (dataCard) => {
  cards.prepend(generateCard(dataCard));
};

const handleAddCard = (evt) => {
  evt.preventDefault();
  addCard({ name: inputCardName.value, link: inputCardLink.value });
  closePopup(popupAddCard);
};

popupAddCard.addEventListener('submit', handleAddCard);