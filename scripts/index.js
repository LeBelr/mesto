let profileEdit = document.querySelector('.profile__edit-button'); //Находим кнопку редактирования
let popup = document.querySelector('.popup'); //Находим кнопку попап
let popupClose = popup.querySelector('.popup__close'); //Находим кнопку закрытия

let popupName = popup.querySelector('.popup__name'); //Находим поле ввода имени в попапе
let profileName = document.querySelector('.profile__name'); //Находим имя профиля на странице

let popupAbout = popup.querySelector('.popup__about'); //Находим поле ввода о себе в попапе
let profileAbout = document.querySelector('.profile__about'); //Находим о себе профиля на странице

profileEdit.addEventListener('click', () => { //Команда по клику для кнопки редактирования
  popup.classList.add('popup_status_opened'); //Добавление класса попапу, чтобы он появился на странице
  popupName.value = profileName.textContent; //Команда, которая заполняет поле ввода имени в попапе именем профиля на странице
  popupAbout.value = profileAbout.textContent; //Команда, которая заполняетполе ввода о себе в попапе тем, что содержится в "о себе" профиля на странице
});

popupClose.addEventListener('click', () => { //Команда по клику для кнопки закрытия
  popup.classList.remove('popup_status_opened'); //Удаление класса попапу, чтобы он закрылся на странице
});

function formSubmitHandler(evt) { //Функция для кнопки сохранения
  evt.preventDefault(); //Отмена свойств
  profileName.textContent = popupName.value; //Команда, которая будет заменять имя профиля текстом из поля ввода имени в попапе
  profileAbout.textContent = popupAbout.value; //Команда, которая будет заменять "о себе" текстом из поля ввода "о себе" в попапе
  popup.classList.remove('popup_status_opened'); //Удаление класса попапу, чтобы он закрылся на странице
};

popup.addEventListener('submit', formSubmitHandler); //Команда по клику для кнопки сохранения

function handleKeyPress(e) { //Команда для кнопки сохранения по нажатию Enter
  let key = e.keyCode || e.which;
  if (key === 13) { //Клавиша Enter
    formSubmitHandler();
  };
};