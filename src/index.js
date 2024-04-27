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

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const applyButton = popupProfile.querySelector(".popup__button");
  applyButton.textContent = "Сохранение...";

  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  updateUserInformation(profileName.textContent, profileDescription.textContent)
    .catch((err) => console.log(err))
    .finally(() => (applyButton.textContent = "Сохранить"));

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

  const applyButton = popupNewCard.querySelector(".popup__button");
  applyButton.textContent = "Сохранение...";

  uploadCard(newCardTitle.value, newCardUrl.value)
    .then((card) => {
      addCard(
        createCard(card, userId, deleteCard, openCardPopupByButton, likeCard)
      );
    })
    .catch((err) =>
      console.log("Ошибка во время загрузки карточки на сервер. " + err)
    )
    .finally(() => (applyButton.textContent = "Сохранить"));

  closePopup(popupNewCard);
  newCardForm.reset();
}

function openProfilePopupByButton() {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;

  const popupFormElement = popupProfile.querySelector(".popup__form");
  clearValidation(popupFormElement, validationParams);

  openPopup(popupProfile);
}

function openNewCardPopupByButton() {
  const popupFormElement = popupNewCard.querySelector(".popup__form");
  clearValidation(popupFormElement, validationParams);

  openPopup(popupNewCard);
}

function handleEditAvatarFormSubmit(evt) {
  evt.preventDefault();

  const applyButton = popupEditAvatar.querySelector(".popup__button");
  applyButton.textContent = "Сохранение...";

  uploadAvatar(avatarUrl.value)
    .then(() => {
      profileImage.style.backgroundImage = `url(${avatarUrl.value})`;
    })
    .catch((err) => console.log("Ошибка при редактировании аватара. " + err))
    .finally(() => (applyButton.textContent = "Сохранить"));

  closePopup(popupEditAvatar);
  newCardForm.reset();
}

function openUpdateAvatarPopupByButton() {
  const popupFormElement = popupEditAvatar.querySelector(".popup__form");
  clearValidation(popupFormElement, validationParams);

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
