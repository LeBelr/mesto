// Создание класса карточки

export default class Card {
  constructor( dataCard, {handleCardClick} , templateSelector) {
    this._title = dataCard.title;
    this._image = dataCard.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  };

  // Копирование разметки шаблона карточки

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector)
    .content.querySelector('.cards__item')
    .cloneNode(true);

    return cardElement;
  };

  _setData() {
    this._cardImage = this._card.querySelector('.cards__image');

    this._card.querySelector('.cards__title').textContent = this._title;
    this._cardImage.src = this._image;
    this._cardImage.alt = this._title;
  };

  // Удаление карточки

  _handleDeleteCard() {
    this._card.remove();
    this._card = null;
  };

  // Изменение стиля лайка карточки

  _handleLikeCard() {
    this._cardLike.classList.toggle('cards__like-button_active');
  };

  // Добавление слушателей кнопкам удаления и лайка, картинке карточки

  _setEventListener() {
    this._cardLike = this._card.querySelector('.cards__like-button');

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick();
    });

    this._card.querySelector('.cards__delete-button').addEventListener('click', () => {
      this._handleDeleteCard();
    });

    this._cardLike.addEventListener('click', () => {
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
