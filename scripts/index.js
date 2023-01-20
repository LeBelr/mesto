import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { initialCards, settings } from '../utils/constants.js';
import { openPopup, closePopup } from '../utils/utils.js'

const buttonOpenPopupEditProfile = document.querySelector('.profile__edit-button'); //Находим кнопку редактирования
const popupEditProfile = document.querySelector('.popup_type_edit'); //Находим попап
const popupEditName = popupEditProfile.querySelector('.popup__input_type_edit-profile-name'); //Находим поле ввода имени в попапе
const profileName = document.querySelector('.profile__name'); //Находим имя профиля на странице

const popupEditAbout = popupEditProfile.querySelector('.popup__input_type_edit-profile-about'); //Находим поле ввода о себе в попапе
const profileAbout = document.querySelector('.profile__about'); //Находим о себе профиля на странице

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


buttonOpenPopupEditProfile.addEventListener('click', () => { //Команда по клику для кнопки редактирования
  openPopup(popupEditProfile); //Добавление класса попапу, чтобы он появился на странице
  popupEditName.value = profileName.textContent; //Команда, которая заполняет поле ввода имени в попапе именем профиля на странице
  popupEditAbout.value = profileAbout.textContent; //Команда, которая заполняетполе ввода о себе в попапе тем, что содержится в "о себе" профиля на странице
  validationTypeEdit.removeValidationErrors();
  validationTypeEdit.enableSubmitButton();
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

// Функция создания карточки

const createCard = (dataCard) => {
  const card = new Card(dataCard, '#card-template');
  const cardElement = card.generateCard()

  return cardElement;
}

// Команда для отображения заготовленных карточек

initialCards.forEach((dataCard) => {
  cards.append(createCard(dataCard));
});

// Команды для поиска кнопки добавления карточки, попапа

const buttonOpenPopupAddCard = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_type_add');

// Команды для поиска полей ввода попапа и формы

const inputCardName = popupAddCard.querySelector('.popup__input_type_add-card-name');
const inputCardLink = popupAddCard.querySelector('.popup__input_type_add-card-link');
const popupFormAdd = popupAddCard.querySelector('.popup__form_type_add');

// Команды по нажитию кнопок для открытия

buttonOpenPopupAddCard.addEventListener('click', () => {
  openPopup(popupAddCard);
  popupFormAdd.reset();
  validationTypeAdd.removeValidationErrors();
  validationTypeAdd.disableSubmitButton();
});

const handleAddCard = (evt) => {
  evt.preventDefault();
  cards.prepend(createCard({ name: inputCardName.value, link: inputCardLink.value }));
  closePopup(popupAddCard);
};

popupAddCard.addEventListener('submit', handleAddCard);

// Подключение валидации

const validationTypeAdd = new FormValidator(settings, '.popup__form_type_add');

validationTypeAdd.enableValidation();

const validationTypeEdit = new FormValidator(settings, '.popup__form_type_edit');

validationTypeEdit.enableValidation();