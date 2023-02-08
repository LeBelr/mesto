// Создание класса карточки

export default class Card {
  constructor(dataCard, { userId, handleCardClick, handleDeleteCard, handleLikeCard, handleDeleteLikeCard }, templateSelector) {
    this._userId = userId;
    this._title = dataCard.name;
    this._image = dataCard.link;
    this._cardId = dataCard._id;
    this._cardOwnerId = dataCard.owner._id;
    this._dataLikes = dataCard.likes;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeCard = handleLikeCard;
    this._handleDeleteLikeCard = handleDeleteLikeCard;
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
    this._cardLikeCount = this._card.querySelector('.cards__like-count');
    this._cardDeleteButton = this._card.querySelector('.cards__delete-button');
    this._cardLikeButton = this._card.querySelector('.cards__like-button');

    this._card.querySelector('.cards__title').textContent = this._title;
    this._cardImage.src = this._image;
    this._cardImage.alt = this._title;
    this._cardLikeCount.textContent = this._dataLikes.length;

    if (this._cardOwnerId != this._userId) {
      this._cardDeleteButton.remove();
    }

    if (this._dataLikes.some(item => item._id === this._userId)) {
      this._cardLikeButton.classList.add('cards__like-button_active');
    }
  };

  // Удаление карточки

  handleDeleteCard() {
    this._card.remove();
    this._card = null;
  };

  // Добавление слушателей кнопкам удаления и лайка, картинке карточки

  _setEventListener() {
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick();
    });

    this._cardDeleteButton.addEventListener('click', () => {
      this._handleDeleteCard(this._cardId)
    });

    this._cardLikeButton.addEventListener('click', () => {
      if (this._cardLikeButton.classList.contains('cards__like-button_active')) {
        this._handleDeleteLikeCard(this._cardId);
      } else {
        this._handleLikeCard(this._cardId);
      }
    });
  };

  changeLike(data) {
    this._cardLikeCount.textContent = data.likes.length;
    this._cardLikeButton.classList.toggle('cards__like-button_active');
  }

  generateCard() {
    this._card = this._getTemplate();
    this._setData();
    this._setEventListener();

    return this._card;
  };
};
