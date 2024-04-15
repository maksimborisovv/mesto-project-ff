const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const popupProfile = document.querySelector(".popup_type_edit");
const popupProfileForm = popupProfile.querySelector(".popup__form");
const profileNameInput = popupProfileForm.elements.name;
const profileDescriptionInput = popupProfileForm.elements.description;

const popupNewCard = document.querySelector(".popup_type_new-card");

const newCardForm = popupNewCard.querySelector(".popup__form");
const newCardTitle = newCardForm.elements["place-name"];
const newCardUrl = newCardForm.elements.link;

const popupCard = document.querySelector(".popup_type_image");
const popupCardImage = popupCard.querySelector(".popup__image");
const popupCardCaption = popupCard.querySelector(".popup__caption");

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

export {
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
};
