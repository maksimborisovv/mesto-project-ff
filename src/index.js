import './styles/index.css'
import { initialCards } from './components/cards';
import { closePopup, openPopup } from './components/modal';
import { createCard, addCard, deleteCard, likeCard } from './components/card';

const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const popupProfile = document.querySelector('.popup_type_edit');
const popupProfileForm = popupProfile.querySelector('.popup__form');
const profileNameInput = popupProfileForm.elements.name;
const profileDescriptionInput = popupProfileForm.elements.description;

const popupNewCard = document.querySelector('.popup_type_new-card');

const newCardForm = popupNewCard.querySelector('.popup__form');
const newCardTitle = newCardForm.elements['place-name'];
const newCardUrl = newCardForm.elements.link;

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = profileNameInput.value;
    profileDescription.textContent = profileDescriptionInput.value;
    closePopup(popupProfile);
}

const popupCard = document.querySelector('.popup_type_image');
const popupCardImage = popupCard.querySelector('.popup__image');
const popupCardCaption = popupCard.querySelector('.popup__caption');

function openCardPopupByButton(evt) {
    popupCardImage.src = evt.target.src;
    popupCardCaption.textContent = evt.target.alt;
    openPopup(popupCard);
}

function handleNewCardFormSubmit(evt) {
    evt.preventDefault();
    addCard(createCard(newCardUrl.value, newCardTitle.value, newCardTitle.value, deleteCard, openCardPopupByButton, likeCard));
    closePopup(popupNewCard);
    newCardUrl.value = "";
    newCardTitle.value = "";
}

newCardForm.addEventListener('submit', handleNewCardFormSubmit);

popupProfileForm.addEventListener('submit', handleProfileFormSubmit);

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

function openProfilePopupByButton() {
    profileNameInput.value = profileName.textContent;
    profileDescriptionInput.value = profileDescription.textContent;
    openPopup(popupProfile);
}

function openNewCardPopupByButton() {
    openPopup(popupNewCard);
}

editButton.addEventListener('click', openProfilePopupByButton);
addButton.addEventListener('click', openNewCardPopupByButton);

// Вывести карточки на страницу
initialCards.forEach(
    card => addCard(createCard(card.link, card.name, card.name, deleteCard, openCardPopupByButton, likeCard))
);