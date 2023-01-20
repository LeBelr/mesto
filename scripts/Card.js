import { openPopup } from "./index.js";

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

// Команды для поиска элементов попапа с картинкой

const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupImageTitle = document.querySelector('.popup__image-title');

// Создание класса карточки

class Card {
  constructor (dataCard, templateSelector) {
    this._title = dataCard.name;
    this._image = dataCard.link;
    this._templateSelector = templateSelector;
  };

  // Копирование разметки шаблона карточки

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector)
    .content.querySelector('.cards__item')
    .cloneNode(true);

    return cardElement;
  };

  _setData() {
    this._card.querySelector('.cards__title').textContent = this._title;
    this._card.querySelector('.cards__image').src = this._image;
    this._card.querySelector('.cards__image').alt = this._title;
  };

  // Открытие попапа с картинкой карточки

  _handleOpenPopupTypeImage() {
    openPopup(popupTypeImage);
    popupImage.src = this._image;
    popupImage.alt = this._title;
    popupImageTitle.textContent = this._title;
  };

  // Удаление карточки

  _handleDeleteCard() {
    this._card.remove();
    this._card = null;
  };

  // Изменение стиля лайка карточки

  _handleLikeCard() {
    this._card.querySelector('.cards__like-button')
    .classList.toggle('cards__like-button_active');
  };

  // Добавление слушателей кнопкам удаления и лайка, картинке карточки

  _setEventListener() {
    this._card.querySelector('.cards__image').addEventListener('click', () => {
      this._handleOpenPopupTypeImage();
    });

    this._card.querySelector('.cards__delete-button').addEventListener('click', () => {
      this._handleDeleteCard();
    });

    this._card.querySelector('.cards__like-button').addEventListener('click', () => {
      this._handleLikeCard();
    });
  };

  generateCard() {
    this._card = this._getTemplate();
    this._setData();
    this._setEventListener();

    return this._card;
  };
};

export { initialCards, Card}