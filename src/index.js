import "./styles/index.css";
import { initialCards } from "./components/cards";
import { closePopup, openPopup } from "./components/modal";
import { createCard, addCard, deleteCard, likeCard } from "./components/card";
import {
  editButton,
  addButton,
  newCardForm,
  popupProfileForm,
  popupNewCard,
  newCardTitle,
  newCardUrl,
  popupCardImage,
  popupCardCaption,
  popupCard,
  profileNameInput,
  profileName,
  profileDescriptionInput,
  profileDescription,
  popupProfile,
} from "./components/constants";

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(popupProfile);
}

function openCardPopupByButton(src, alt) {
  popupCardImage.src = src;
  popupCardImage.alt = alt;
  popupCardCaption.textContent = alt;
  openPopup(popupCard);
}

function handleNewCardFormSubmit(evt) {
  evt.preventDefault();
  addCard(
    createCard(
      newCardUrl.value,
      newCardTitle.value,
      newCardTitle.value,
      deleteCard,
      openCardPopupByButton,
      likeCard
    )
  );
  closePopup(popupNewCard);
  newCardForm.reset();
}

function openProfilePopupByButton() {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(popupProfile);
}

function openNewCardPopupByButton() {
  openPopup(popupNewCard);
}

editButton.addEventListener("click", openProfilePopupByButton);
addButton.addEventListener("click", openNewCardPopupByButton);
newCardForm.addEventListener("submit", handleNewCardFormSubmit);
popupProfileForm.addEventListener("submit", handleProfileFormSubmit);

initialCards.forEach((card) =>
  addCard(
    createCard(
      card.link,
      card.name,
      card.name,
      deleteCard,
      openCardPopupByButton,
      likeCard
    )
  )
);
