import './index.css'
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import { initialCards, settings, buttonOpenPopupEditProfile, buttonOpenPopupAddCard } from '../utils/constants.js';

// Создание класса, который отрисовывает карточки

const cards = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(
      item,
      {
        handleCardClick: () => {
          const popupWithImage = new PopupWithImage('.popup_type_image');
          popupWithImage.open(item);
          popupWithImage.setEventListener();
        }
      }, '#card-template');

    cards.addItem(card.generateCard());
  }
}, '.cards');

// Создание классов для валидации форм попапов

const validationTypeAdd = new FormValidator(settings, '.popup__form_type_add');
const validationTypeEdit = new FormValidator(settings, '.popup__form_type_edit');

// Создание класса, который заполняет поля формы попапа редактирования профиля и изменяет инфо профиля 

const userInfo = new UserInfo('.profile__name', '.profile__about')

// Создание классов попапов

const popupTypeEdit = new PopupWithForm({
  popupSelector: '.popup_type_edit',
  handleSubmit: (formData) => {
    userInfo.setUserInfo(formData);
    popupTypeEdit.close();
  }
})

const popupTypeAdd = new PopupWithForm({
  popupSelector: '.popup_type_add',
  handleSubmit: (formData) => {
    const card = new Card(
      formData,
      {
        handleCardClick: () => {
          const popupWithImage = new PopupWithImage('.popup_type_image');
          popupWithImage.open(formData);
          popupWithImage.setEventListener();
        }
      },
      '#card-template');

    cards.addItem(card.generateCard());
    popupTypeAdd.close();
  }
});

// Функция отрисовки карточек

cards.renderItems();

// Функции добавления валидации форм попапов

validationTypeAdd.enableValidation();
validationTypeEdit.enableValidation();

// Функции добавления слушателей форм попапов

popupTypeEdit.setEventListener();
popupTypeAdd.setEventListener();

// Функции добавления слушателей кнопкам редактирования профиля и добавления карточки

buttonOpenPopupEditProfile.addEventListener('click', () => {
  popupTypeEdit.open();
  userInfo.getUserInfo();
  validationTypeEdit.removeValidationErrors();
  validationTypeEdit.enableSubmitButton();
});

buttonOpenPopupAddCard.addEventListener('click', () => {
  popupTypeAdd.open();
  validationTypeAdd.removeValidationErrors();
  validationTypeAdd.disableSubmitButton();
});