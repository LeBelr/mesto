const buttonOpenPopupEditProfile = document.querySelector('.profile__edit-button'); //Находим кнопку редактирования
const popupEditProfile = document.querySelector('.popup_type_edit'); //Находим попап
const buttonClosePopupEditProfile = popupEditProfile.querySelector('.popup__close_type_edit'); //Находим кнопку закрытия
const popupEditName = popupEditProfile.querySelector('.popup__input_type_edit-profile-name'); //Находим поле ввода имени в попапе
const profileName = document.querySelector('.profile__name'); //Находим имя профиля на странице
const popupFormEdit = document.querySelector('.popup__form_type_edit')

const popupEditAbout = popupEditProfile.querySelector('.popup__input_type_edit-profile-about'); //Находим поле ввода о себе в попапе
const profileAbout = document.querySelector('.profile__about'); //Находим о себе профиля на странице

//Заполнение полей попапа, необходимое для правильной валидации при открытии попапа

popupEditName.value = profileName.textContent;
popupEditAbout.value = profileAbout.textContent;

// Функции для открытия и закрытия попапов

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
}

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
}

buttonOpenPopupEditProfile.addEventListener('click', () => { //Команда по клику для кнопки редактирования
  openPopup(popupEditProfile); //Добавление класса попапу, чтобы он появился на странице
  popupEditName.value = profileName.textContent; //Команда, которая заполняет поле ввода имени в попапе именем профиля на странице
  popupEditAbout.value = profileAbout.textContent; //Команда, которая заполняетполе ввода о себе в попапе тем, что содержится в "о себе" профиля на странице
});

buttonClosePopupEditProfile.addEventListener('click', () => { //Команда по клику для кнопки закрытия
  closePopup(popupEditProfile); //Удаление класса попапу, чтобы он закрылся на странице
});

function submitEditProfile(evt) { //Функция для кнопки сохранения
  evt.preventDefault(); //Отмена свойств
  profileName.textContent = popupEditName.value; //Команда, которая будет заменять имя профиля текстом из поля ввода имени в попапе
  profileAbout.textContent = popupEditAbout.value; //Команда, которая будет заменять "о себе" текстом из поля ввода "о себе" в попапе
  closePopup(popupEditProfile); //Удаление класса попапу, чтобы он закрылся на странице
};

popupEditProfile.addEventListener('submit', submitEditProfile); //Команда по клику для кнопки сохранения

// Команда для поиска блока с карточками и шаблона карточки

const cards = document.querySelector('.cards');
const cardTemplate = document.querySelector('#card-template').content.querySelector('.cards__item');

// Функция для удаления ближайшего элемента с классом cards__item

cards.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('cards__delete-button')) {
    evt.target.closest('.cards__item').remove();
  }
});

// Функция для изменения лайка

cards.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('cards__like-button')) {
    evt.target.classList.toggle('cards__like-button_active');
  }
});

// Команды для поиска элементов попапа с картинкой

const popupTypeImage = document.querySelector('.popup_type_image');
const buttonClosePopupTypeImage = document.querySelector('.popup__close_type_image');
const popupImage = document.querySelector('.popup__image');
const popupImageTitle = document.querySelector('.popup__image-title');

// Функция для закрытия попапа

buttonClosePopupTypeImage.addEventListener('click', () => {
  closePopup(popupTypeImage);
});

// Функция, в которой клонируется карточка, заполняется содержимым из массива

const generateCard = (dataCard) => {
  const cardItem = cardTemplate.cloneNode(true);
  const title = cardItem.querySelector('.cards__title');
  const image = cardItem.querySelector('.cards__image');

  title.textContent = dataCard.name;
  image.src = dataCard.link;
  image.alt = dataCard.name;

  return cardItem;
};

// Добавление возможности открытия попапа при нажатии на картинку

cards.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('cards__image')) {
    openPopup(popupTypeImage);
    popupImage.src = evt.target.closest('.cards__image').src;
    popupImageTitle.alt = evt.target.closest('.cards__item').querySelector('.cards__title').textContent;
    popupImageTitle.textContent = evt.target.closest('.cards__item').querySelector('.cards__title').textContent;
  }
})

// Команда для отображения карточек на экране

const renderCard = (dataCard) => {
  cards.append(generateCard(dataCard));
};

initialCards.forEach((dataCard) => {
  renderCard(dataCard);
});

// Команды для поиска кнопки добавления карточки, попапа, кнопки закрытия попапа

const buttonOpenPopupAddCard = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_type_add');
const buttonClosePopupAddCard = document.querySelector('.popup__close_type_add');

// Команды для поиска полей ввода попапа и формы

const inputCardName = popupAddCard.querySelector('.popup__input_type_add-card-name');
const inputCardLink = popupAddCard.querySelector('.popup__input_type_add-card-link');
const popupFormAdd = popupAddCard.querySelector('.popup__form_type_add');

// Команды по нажитию кнопок для открытия и закрытия попапа

buttonOpenPopupAddCard.addEventListener('click', () => {
  openPopup(popupAddCard);
  popupFormAdd.reset();
});

buttonClosePopupAddCard.addEventListener('click', () => {
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

//Функция для закрытия попапов при клике на оверлей и при нажатии на Escape

const closePopupOnOverlayAndEscape = () => {
  const popupList = Array.from(document.querySelectorAll('.popup'));
  popupList.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
      if (evt.target === evt.currentTarget) {
        closePopup(popup);
      };
    });
    document.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') {
        closePopup(popup);
      };
    });
  });
};

closePopupOnOverlayAndEscape();