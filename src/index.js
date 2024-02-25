import './styles/index.css'
import { initialCards } from './cards';

// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// DOM узлы
const placesList = document.querySelector('.places__list');

// Функция создания карточки
function createCard(imageSrc, imageAlt, title, deleteCardCallback) {
    const card = cardTemplate.querySelector('.card').cloneNode(true);

    card.querySelector('.card__image').src = imageSrc;
    card.querySelector('.card__image').alt = imageAlt;
    card.querySelector('.card__title').textContent = title;
    
    const deleteButton = card.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => deleteCardCallback(card));

    return card;
}

//Функция добавления карточки
function addCard(card) {
    placesList.append(card);
}

// Функция удаления карточки
function deleteCard(card) {
    card.remove();
}

// Вывести карточки на страницу
initialCards.forEach(
    card => addCard(createCard(card.link, card.name, card.name, deleteCard))
);