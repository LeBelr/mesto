export default class UserInfo {
  constructor(nameSelector, aboutSelector) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
    this._form = document.querySelector('.popup__form_type_edit');
  }

  getUserInfo() {
    this._form.name.value = this._name.textContent;
    this._form.about.value = this._about.textContent;
  }

  setUserInfo(formData) {
    this._name.textContent = formData.name;
    this._about.textContent = formData.about;
  }
}