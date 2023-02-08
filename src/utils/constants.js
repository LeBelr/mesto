// Функция для поиска кнопки редактирования

const buttonOpenPopupEditProfile = document.querySelector('.profile__edit-button');

// Функция для поиска кнопки добавления карточки, попапа

const buttonOpenPopupAddCard = document.querySelector('.profile__add-button');

// Функция для поиска кнопки добавления карточки, попапа
const profileAvatar = document.querySelector('.profile__avatar-edit-button');

// Данные настроек для валидации

const settings = {
  inputSelector: '.popup__input',
  inputErrorSelector: '.popup__input-error',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
  submitButtonInactive: 'popup__submit_inactive'
}

export { settings, buttonOpenPopupEditProfile, buttonOpenPopupAddCard, profileAvatar };