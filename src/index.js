import "./styles/index.css";
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
  profileImage,
  userId,
  popupEditAvatar,
  editAvatarForm,
  avatarUrl,
} from "./components/constants";
import {
  clearValidation,
  enableValidation,
  validationParams,
} from "./components/validation";
import {
  getCards,
  getUser,
  updateUserInformation,
  uploadAvatar,
  uploadCard,
} from "./components/api";
import { handleSubmit } from "./components/utils";

function handleProfileFormSubmit(evt) {
  function makeRequest() {
    return updateUserInformation(
      profileNameInput.value,
      profileDescriptionInput.value
    ).then((user) => {
      profileName.textContent = user.name;
      profileDescription.textContent = user.about;
      closePopup(popupProfile);
    });
  }

  handleSubmit(makeRequest, evt);
}

function openCardPopupByButton(src, alt) {
  popupCardImage.src = src;
  popupCardImage.alt = alt;
  popupCardCaption.textContent = alt;
  openPopup(popupCard);
}

function handleNewCardFormSubmit(evt) {
  function makeRequest() {
    return uploadCard(newCardTitle.value, newCardUrl.value).then((card) => {
      addCard(
        createCard(card, userId, deleteCard, openCardPopupByButton, likeCard)
      );

      closePopup(popupNewCard);
    });
  }

  handleSubmit(makeRequest, evt);
}

function openProfilePopupByButton() {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;

  clearValidation(popupProfileForm, validationParams);

  openPopup(popupProfile);
}

function openNewCardPopupByButton() {
  clearValidation(newCardForm, validationParams);

  openPopup(popupNewCard);
}

function handleEditAvatarFormSubmit(evt) {
  function makeRequest() {
    return uploadAvatar(avatarUrl.value).then(() => {
      profileImage.style.backgroundImage = `url(${avatarUrl.value})`;
      closePopup(popupEditAvatar);
    });
  }

  handleSubmit(makeRequest, evt);
}

function openUpdateAvatarPopupByButton() {
  clearValidation(editAvatarForm, validationParams);

  openPopup(popupEditAvatar);
}

Promise.all([getUser(), getCards()])
  .then(([user, cards]) => {
    profileName.textContent = user.name;
    profileDescription.textContent = user.about;
    profileImage.style.backgroundImage = `url(${user.avatar})`;
    userId = user._id;

    cards.forEach((card) =>
      addCard(
        createCard(card, userId, deleteCard, openCardPopupByButton, likeCard)
      )
    );
  })
  .catch((err) => {
    console.log(err);
  });

editButton.addEventListener("click", openProfilePopupByButton);
addButton.addEventListener("click", openNewCardPopupByButton);
profileImage.addEventListener("click", openUpdateAvatarPopupByButton);
newCardForm.addEventListener("submit", handleNewCardFormSubmit);
popupProfileForm.addEventListener("submit", handleProfileFormSubmit);
editAvatarForm.addEventListener("submit", handleEditAvatarFormSubmit);

enableValidation(validationParams);
