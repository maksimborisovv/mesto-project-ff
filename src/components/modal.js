function openPopup(popup) {
  setTimeout(() => popup.classList.add("popup_is-opened"), 0);
  popup.classList.add("popup_is-animated");
  document.addEventListener("keydown", closePopupEsc);
  popup.addEventListener("mousedown", closePopupByClick);
}

function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupEsc);
  popup.removeEventListener("mousedown", closePopupByClick);
}

function closePopupEsc(evt) {
  const openedPopup = document.querySelector(".popup_is-opened");
  if (evt.key === "Escape") {
    closePopup(openedPopup);
  }
}

function closePopupByClick(evt) {
  if (
    evt.target.classList.contains("popup__close") ||
    evt.target.classList.contains("popup")
  ) {
    closePopup(evt.currentTarget);
  }
}

export { openPopup, closePopup };
