import { initialCards, Card} from './Card.js';
import {settings, FormValidator } from './FormValidator.js';

const buttonOpenPopupEditProfile = document.querySelector('.profile__edit-button'); //Находим кнопку редактирования
const popupEditProfile = document.querySelector('.popup_type_edit'); //Находим попап
const popupEditName = popupEditProfile.querySelector('.popup__input_type_edit-profile-name'); //Находим поле ввода имени в попапе
const profileName = document.querySelector('.profile__name'); //Находим имя профиля на странице

const popupEditAbout = popupEditProfile.querySelector('.popup__input_type_edit-profile-about'); //Находим поле ввода о себе в попапе
const profileAbout = document.querySelector('.profile__about'); //Находим о себе профиля на странице

//Заполнение полей попапа, необходимое для правильной валидации при открытии попапа

popupEditName.value = profileName.textContent;
popupEditAbout.value = profileAbout.textContent;

//Функция для закрытия попапов при нажатии Escape

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  };
};

// Функции для открытия и закрытия попапов

export const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape)
};

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
};

//Объявление переменной для всех попапов и функция для закрытия попапов по крестику

const popups = document.querySelectorAll('.popup');

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    };
    if (evt.target.classList.contains('popup__close')) {
      closePopup(popup);
    };
  });
});

//Функция для удаления стиля поля с ошибкой и сообщения об ошибке

const removeErrorsMessages = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const errorMessageList = Array.from(formElement.querySelectorAll('.popup__input-error'));
  inputList.forEach((inputElement) => {
    inputElement.classList.remove('popup__input_type_error');
  });
  errorMessageList.forEach((inputElement) => {
    inputElement.classList.remove('popup__input-error_active');
  });
};

const popupFormEditSubmit = popupEditProfile.querySelector('.popup__submit');

buttonOpenPopupEditProfile.addEventListener('click', () => { //Команда по клику для кнопки редактирования
  openPopup(popupEditProfile); //Добавление класса попапу, чтобы он появился на странице
  popupEditName.value = profileName.textContent; //Команда, которая заполняет поле ввода имени в попапе именем профиля на странице
  popupEditAbout.value = profileAbout.textContent; //Команда, которая заполняетполе ввода о себе в попапе тем, что содержится в "о себе" профиля на странице
  removeErrorsMessages(popupEditProfile);
  popupFormEditSubmit.classList.remove('popup__submit_inactive');
  popupFormEditSubmit.removeAttribute('disabled');
});

function submitEditProfile(evt) { //Функция для кнопки сохранения
  evt.preventDefault(); //Отмена свойств
  profileName.textContent = popupEditName.value; //Команда, которая будет заменять имя профиля текстом из поля ввода имени в попапе
  profileAbout.textContent = popupEditAbout.value; //Команда, которая будет заменять "о себе" текстом из поля ввода "о себе" в попапе
  closePopup(popupEditProfile); //Удаление класса попапу, чтобы он закрылся на странице
};

popupEditProfile.addEventListener('submit', submitEditProfile); //Команда по клику для кнопки сохранения

// Команда для поиска блока с карточками

const cards = document.querySelector('.cards');

// Команда для отображения заготовленных карточек

initialCards.forEach((dataCard) => {
  const card = new Card(dataCard, '#card-template');

  cards.append(card.generateCard());
});

// Команды для поиска кнопки добавления карточки, попапа

const buttonOpenPopupAddCard = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_type_add');

// Команды для поиска полей ввода попапа и формы

const inputCardName = popupAddCard.querySelector('.popup__input_type_add-card-name');
const inputCardLink = popupAddCard.querySelector('.popup__input_type_add-card-link');
const popupFormAdd = popupAddCard.querySelector('.popup__form_type_add');
const popupFormAddSubmit = popupAddCard.querySelector('.popup__submit');

// Команды по нажитию кнопок для открытия

buttonOpenPopupAddCard.addEventListener('click', () => {
  openPopup(popupAddCard);
  popupFormAdd.reset();
  popupFormAddSubmit.classList.add('popup__submit_inactive');
  popupFormAddSubmit.setAttribute('disabled', true);
  removeErrorsMessages(popupAddCard);
});

// Функция для добавления карточки и ее заполнения

const addCard = (dataCard) => {
  const card = new Card(dataCard, '#card-template');

  cards.prepend(card.generateCard());
};

const handleAddCard = (evt) => {
  evt.preventDefault();
  addCard({ name: inputCardName.value, link: inputCardLink.value });
  closePopup(popupAddCard);
};

popupAddCard.addEventListener('submit', handleAddCard);

// Подключение валидации

const validationTypeAdd = new FormValidator(settings, '.popup__form_type_add');

validationTypeAdd.enableValidation();

const validationTypeEdit = new FormValidator(settings, '.popup__form_type_edit');

validationTypeEdit.enableValidation();