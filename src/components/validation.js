export const validationParams = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

function showInputError(
  formElement,
  inputElement,
  errorMessage,
  validationParams
) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationParams.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationParams.errorClass);
}

function hideInputError(formElement, inputElement, validationParams) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationParams.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(validationParams.errorClass);
}

function isValid(formElement, inputElement, validationParams) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      validationParams
    );
  } else {
    hideInputError(formElement, inputElement, validationParams);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function enableButton(buttonElement, validationParams) {
  buttonElement.disabled = false;
  buttonElement.classList.remove(validationParams.inactiveButtonClass);
}

function disableButton(buttonElement, validationParams) {
  buttonElement.disabled = true;
  buttonElement.classList.add(validationParams.inactiveButtonClass);
}

function toggleButton(inputList, buttonElement, validationParams) {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement, validationParams);
  } else {
    enableButton(buttonElement, validationParams);
  }
}

function setEventListeners(formElement, validationParams) {
  const inputList = Array.from(
    formElement.querySelectorAll(validationParams.inputSelector)
  );

  const buttonElement = formElement.querySelector(
    validationParams.submitButtonSelector
  );

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, validationParams);
      toggleButton(inputList, buttonElement, validationParams);
    });
  });
}

export function enableValidation(validationParams) {
  const formList = Array.from(
    document.querySelectorAll(validationParams.formSelector)
  );

  formList.forEach((formElement) =>
    setEventListeners(formElement, validationParams)
  );
}

export function clearValidation(formElement, validationParams) {
  const inputList = Array.from(
    formElement.querySelectorAll(validationParams.inputSelector)
  );

  const buttonElement = formElement.querySelector(
    validationParams.submitButtonSelector
  );

  disableButton(buttonElement, validationParams);

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, validationParams);
  });
}
