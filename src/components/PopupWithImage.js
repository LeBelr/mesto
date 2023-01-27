import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = document.querySelector('.popup__image')
    this._popupImageTitle = document.querySelector('.popup__image-title');
  }

  open(item) {
    super.open();
    this._popupImage.src = item.link;
    this._popupImage.alt = item.title;
    this._popupImageTitle.textContent = item.title;
  }
}
