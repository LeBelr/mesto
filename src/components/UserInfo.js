export default class UserInfo {
  constructor(nameSelector, aboutSelector, avatarSelector) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    this._userInfo = {};
    this._userInfo.name = this._name.textContent;
    this._userInfo.about = this._about.textContent;

    return this._userInfo;
  }

  setUserInfo(formData) {
    this._name.textContent = formData.name;
    this._about.textContent = formData.about;
    this._avatar.src = formData.avatar;
    this._userId = formData._id;
  }

  getUserId() {
    return this._userId;
  }
}