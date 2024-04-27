export const profileName = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(
  ".profile__description"
);
export const profileImage = document.querySelector(".profile__image");

export const popupProfile = document.querySelector(".popup_type_edit");
export const popupProfileForm = popupProfile.querySelector(".popup__form");
export const profileNameInput = popupProfileForm.elements.name;
export const profileDescriptionInput = popupProfileForm.elements.description;

export const popupNewCard = document.querySelector(".popup_type_new-card");

export const popupEditAvatar = document.querySelector(".popup_type_edit_avatar");
export const editAvatarForm = popupEditAvatar.querySelector(".popup__form");
export const avatarUrl = editAvatarForm.elements["avatar-url"];

export const newCardForm = popupNewCard.querySelector(".popup__form");
export const newCardTitle = newCardForm.elements["place-name"];
export const newCardUrl = newCardForm.elements.link;

export const popupCard = document.querySelector(".popup_type_image");
export const popupCardImage = popupCard.querySelector(".popup__image");
export const popupCardCaption = popupCard.querySelector(".popup__caption");

export const editButton = document.querySelector(".profile__edit-button");
export const addButton = document.querySelector(".profile__add-button");

export let userId;
