import './index.css'
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupDelete from '../components/PopupWithConfirmation';
import { settings, buttonOpenPopupEditProfile, buttonOpenPopupAddCard, profileAvatar } from '../utils/constants.js';
import Api from '../components/Api';

function createCard(item) {
  const card = new Card(
    item,
    {
      userId: userInfo.getUserId(),
      handleCardClick: () => {
        popupWithImage.open(item);
      },
      handleDeleteCard: (cardId) => {
        popupTypeDelete.open();
        popupTypeDelete.submit(() => {
          api.handleDeleteCard(cardId)
            .then(() => {
              card.handleDeleteCard();
              popupTypeDelete.close();
            })
            .catch((err) => {
              console.log(err);
            })
        })
      },
      handleLikeCard: (cardId) => {
        api.handleLikeCard(cardId)
          .then((data) => {
            card.changeLike(data);
          })
          .catch((err) => {
            console.log(err);
          })
      },
      handleDeleteLikeCard: (cardId) => {
        api.handleDeleteLikeCard(cardId)
          .then((data) => {
            card.changeLike(data);
          })
          .catch((err) => {
            console.log(err);
          })
      }
    }, '#card-template');

  const cardElement = card.generateCard();
  return cardElement;
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-58',
  headers: {
    authorization: '1dec9d07-98e5-4556-9436-d3b7e0a78948',
    'Content-Type': 'application/json'
  }
});

// Создание класса, который отрисовывает карточки

const cards = new Section({
  renderer: (item) => {
    cards.addItem(createCard(item));
  }
}, '.cards');

// Создание классов для валидации форм попапов

const validationTypeAdd = new FormValidator(settings, '.popup__form_type_add');
const validationTypeEdit = new FormValidator(settings, '.popup__form_type_edit');
const validationTypeAvatar = new FormValidator(settings, '.popup__form_type_avatar');

// Создание класса, который заполняет поля формы попапа редактирования профиля и изменяет инфо профиля 

const userInfo = new UserInfo('.profile__name', '.profile__about', '.profile__avatar');

// Создание классов попапов

const popupTypeEdit = new PopupWithForm({
  popupSelector: '.popup_type_edit',
  handleSubmit: (formData) => {
    popupTypeEdit.renderLoading(true);
    api.editProfile(formData)
      .then((data) => {
        userInfo.setUserInfo(data);
        popupTypeEdit.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupTypeEdit.renderLoading(false);
      })
  }
})

const popupTypeAdd = new PopupWithForm({
  popupSelector: '.popup_type_add',
  handleSubmit: (formData) => {
    popupTypeAdd.renderLoading(true);
    api.createCard(formData)
      .then((data) => {
        cards.addItem(createCard(data));
        popupTypeAdd.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupTypeAdd.renderLoading(false);
      })
  }
});

const popupWithImage = new PopupWithImage('.popup_type_image');

const popupTypeDelete = new PopupDelete({
  popupSelector: '.popup_type_delete'
});

const popupTypeAvatar = new PopupWithForm({
  popupSelector: '.popup_type_avatar',
  handleSubmit: (data) => {
    popupTypeAvatar.renderLoading(true);
    api.changeAvatar(data)
      .then((data) => {
        userInfo.setUserInfo(data);
        popupTypeAvatar.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupTypeAvatar.renderLoading(false);
      })
  }
});

// Функция вызова промисов

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([user, initialCards]) => {
    userInfo.setUserInfo(user);
    cards.renderItems(initialCards);
  })
  .catch((err) => {
    console.log(err);
  })

// Функции добавления валидации форм попапов

validationTypeAdd.enableValidation();
validationTypeEdit.enableValidation();
validationTypeAvatar.enableValidation();

// Функции добавления слушателей форм попапов

popupTypeEdit.setEventListener();
popupTypeAdd.setEventListener();
popupWithImage.setEventListener();
popupTypeDelete.setEventListener();
popupTypeAvatar.setEventListener();

// Функции добавления слушателей кнопкам редактирования профиля и добавления карточки

buttonOpenPopupEditProfile.addEventListener('click', () => {
  const info = userInfo.getUserInfo();

  popupTypeEdit.open();
  popupTypeEdit.setInputValues(info);
  validationTypeEdit.removeValidationErrors();
  validationTypeEdit.enableSubmitButton();
});

buttonOpenPopupAddCard.addEventListener('click', () => {
  popupTypeAdd.open();
  validationTypeAdd.removeValidationErrors();
  validationTypeAdd.disableSubmitButton();
});

profileAvatar.addEventListener('click', () => {
  popupTypeAvatar.open();
  validationTypeAvatar.removeValidationErrors();
  validationTypeAvatar.disableSubmitButton();
})