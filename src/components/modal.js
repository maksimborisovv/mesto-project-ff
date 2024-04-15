const popups = document.querySelectorAll('.popup');

function openPopup(popup) {
    setTimeout(() => popup.classList.add('popup_is-opened'), 0);
    popup.classList.add('popup_is-animated');
    document.addEventListener('keydown', (evt) => closePopupEsc(evt, popup));
}

function closePopup(popup) {
    popup.classList.remove('popup_is-opened');  
    document.removeEventListener('keydown', (evt) => closePopup(evt, popup));
}

function closePopupEsc(evt, popup) {
    if (evt.key === 'Escape') {
        closePopup(popup);
    }
}

function closePopupByButton(evt) {
    if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup')) {
        closePopup(evt.currentTarget);
    }
}

popups.forEach(popup => {
    popup.addEventListener('mousedown', closePopupByButton)
});

export {openPopup, closePopup};