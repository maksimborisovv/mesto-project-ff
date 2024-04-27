import { deleteCardFromServer, setLikeCard, unlikeCard } from "./api";

// Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// DOM узлы
const placesList = document.querySelector(".places__list");

function createCard(
  card,
  userId,
  deleteCardCallback,
  popupCallback,
  likeCallback
) {
  const cardNode = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardNode.querySelector(".card__image");
  const cardTitle = cardNode.querySelector(".card__title");
  const cardLikeElement = cardNode.querySelector(".card__like-button_count");
  const deleteButton = cardNode.querySelector(".card__delete-button");
  const likeButton = cardNode.querySelector(".card__like-button");

  if (card.owner._id != userId) {
    deleteButton.classList.add("card__delete-button_hidden");
  }

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;
  cardLikeElement.textContent = card.likes.length;

  cardImage.addEventListener("click", () =>
    popupCallback(card.link, card.name)
  );

  likeButton.addEventListener("click", () => likeCallback(cardNode, card._id));

  deleteButton.addEventListener("click", () => {
    deleteCardFromServer(card._id)
      .then(() => deleteCardCallback(cardNode))
      .catch((err) =>
        console.log("Ошибка удаления карточки с сервера. " + err)
      );
  });

  return cardNode;
}

//Функция добавления карточки
function addCard(card) {
  placesList.prepend(card);
}

// Функция удаления карточки
function deleteCard(card) {
  card.remove();
}

function likeCard(cardNode, cardId) {
  const likeButton = cardNode.querySelector(".card__like-button");
  const cardLikeElement = cardNode.querySelector(".card__like-button_count");

  if (likeButton.classList.contains("card__like-button_is-active")) {
    unlikeCard(cardId)
      .then((card) => {
        likeButton.classList.remove("card__like-button_is-active");
        cardLikeElement.textContent = card.likes.length;
      })
      .catch((err) =>
        console.log("Ошибка при изменении значения лайка. " + err)
      );
  } else {
    setLikeCard(cardId)
      .then((card) => {
        likeButton.classList.add("card__like-button_is-active");
        cardLikeElement.textContent = card.likes.length;
      })
      .catch((err) =>
        console.log("Ошибка при изменении значения лайка. " + err)
      );
  }
}

export { createCard, addCard, deleteCard, likeCard };
