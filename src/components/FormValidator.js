// Создание класса валидации

export default class FormValidator {
  constructor(formSettings, formElement) {
    this._inputSelector = formSettings.inputSelector;
    this._submitButtonSelector = formSettings.submitButtonSelector;
    this._inactiveButtonClass = formSettings.inactiveButtonClass;
    this._inputErrorClass = formSettings.inputErrorClass;
    this._errorClass = formSettings.errorClass;
    this._formElement = formElement;
    this._submitButton = document.querySelector(this._formElement).querySelector(this._submitButtonSelector);
    this._submitButtonInactive = formSettings.submitButtonInactive;
    this._inputList = Array.from(document.querySelector(this._formElement).querySelectorAll(this._inputSelector));
  }

  //Функция показа предупреждения об ошибке

  _showInputError(inputElement, errorMessage) {
    const errorElement = document.querySelector(this._formElement).querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = errorMessage;
  }

  //Функция удаления предупреждения об ошибке

  _hideInputError(inputElement) {
    const errorElement = document.querySelector(this._formElement).querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  //Функция проверки на наличине невалидного поля

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  //Функция изменения стиля кнопки и ее активации после проверки на наличине невалидного поля

  _toggleButtonState(inputList) {
    if (this._hasInvalidInput(inputList)) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.setAttribute('disabled', true);
    } else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.removeAttribute('disabled');
    };
  }

  //Функция изменения состояния предупреждения об ошибке

  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    };
  }

  //Добавление валидации для форм

  enableValidation() {
    this._toggleButtonState(this._inputList);

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState(this._inputList);
      });
    });
  }

  //Функция для удаления стиля поля с ошибкой и сообщения об ошибке

  removeValidationErrors() {
    const errorMessageList = Array.from(document.querySelector(this._formElement).querySelectorAll('.popup__input-error'));
    this._inputList.forEach((inputElement) => {
      inputElement.classList.remove(this._inputErrorClass);
    });
    errorMessageList.forEach((inputElement) => {
      inputElement.classList.remove('popup__input-error_active');
    });
  };

  // Функция активации кнопки и изменения стиля

  enableSubmitButton() {
    this._submitButton.classList.remove(this._submitButtonInactive);
    this._submitButton.removeAttribute('disabled');
  }

  // Функция деактивации кнопки и изменения стиля

  disableSubmitButton() {
    this._submitButton.classList.add(this._submitButtonInactive);
    this._submitButton.setAttribute('disabled', true);
  }
}


