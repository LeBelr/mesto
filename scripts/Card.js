import { openPopup } from "../utils/utils.js";

// Команды для поиска элементов попапа с картинкой

const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupImageTitle = document.querySelector('.popup__image-title');

// Создание класса карточки

export default class Card {
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
    const cardImage = this._card.querySelector('.cards__image');

    this._card.querySelector('.cards__title').textContent = this._title;
    cardImage.src = this._image;
    cardImage.alt = this._title;
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
