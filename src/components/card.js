
// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// DOM узлы
const placesList = document.querySelector('.places__list');

function createCard(imageSrc, imageAlt, title, deleteCardCallback, popupCallback, likeCallback) {
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = card.querySelector('.card__image');
    const cardTitle = card.querySelector('.card__title');

    cardImage.src = imageSrc;
    cardImage.alt = imageAlt;
    cardTitle.textContent = title;
    cardImage.addEventListener('click', popupCallback);

    const likeButton = card.querySelector('.card__like-button');
    likeButton.addEventListener('click', likeCallback);
    
    const deleteButton = card.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => deleteCardCallback(card));

    return card;
}

//Функция добавления карточки
function addCard(card) {
    placesList.prepend(card);
}

// Функция удаления карточки
function deleteCard(card) {
    card.remove();
}

function likeCard(evt) {
    const likeButton = evt.currentTarget;

    if (likeButton.classList.contains('card__like-button_is-active')) {
        likeButton.classList.remove('card__like-button_is-active');
    } else {
        likeButton.classList.add('card__like-button_is-active');
    }
}

export {createCard, addCard, deleteCard, likeCard}