import Popup from "./Popup.js";

export default class PopupDelete extends Popup {
  constructor({ popupSelector }) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
  }

  submit(remove) {
    this._handleSubmit = remove;
  }

  setEventListener() {
    super.setEventListener();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmit();
    })
  }
}