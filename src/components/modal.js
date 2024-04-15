const popups = document.querySelectorAll(".popup");

function openPopup(popup) {
  setTimeout(() => popup.classList.add("popup_is-opened"), 0);
  popup.classList.add("popup_is-animated");
  document.addEventListener("keydown", closePopupEsc);
}

function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupEsc);
}

function closePopupEsc(evt) {
  const openedPopup = document.querySelector(".popup_is-opened");
  if (evt.key === "Escape") {
    closePopup(openedPopup);
  }
}

function closePopupByButton(evt) {
  if (
    evt.target.classList.contains("popup__close") ||
    evt.target.classList.contains("popup")
  ) {
    closePopup(evt.currentTarget);
  }
}

popups.forEach((popup) => {
  popup.addEventListener("mousedown", closePopupByButton);
});

export { openPopup, closePopup };
