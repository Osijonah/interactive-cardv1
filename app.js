const inputNumber = document.getElementById("cardnumber");
const inputName = document.getElementById("cardname");
const inputMonth = document.getElementById("mm");
const inputYear = document.getElementById("yy");
const inputcvc = document.querySelector(".cvc-input");
const button = document.querySelector("button");
const div = document.querySelector(".white");
const form = document.querySelector(".form");

const cardNumber = document.querySelector(".span span");
const cardName = document.querySelector(".name");
const cardMonth = document.querySelector(".mm");
const cardYear = document.querySelector(".yy");
const cardCVC = document.querySelector(".cvc");

window.addEventListener("input", () => {
  cardNumber.textContent = inputNumber.value;
  cardName.textContent = inputName.value;
  cardCVC.textContent = inputcvc.value;
  cardMonth.textContent = inputMonth.value;
  cardYear.textContent = inputYear.value;
});

const checkName = () => {
  let valid = false;
  const min = 3,
    max = 25;

  const name = inputName.value.trim();

  if (!isRequired(name)) {
    showError(inputName, "Card name cannot be blank");
  } else if (!isBetween(name.length, min, max)) {
    showError(
      inputName,
      `Card name must be between ${min} and ${max} characters`
    );
  } else {
    showSuccess(inputName);
    valid = true;
  }
  return valid;
};

const checkNumber = () => {
  let valid = false;
  const digit = 16;

  const number = inputNumber.value.trim();

  if (!isRequired(number)) {
    showError(inputNumber, "Card Number cannot be blank");
  } else if (number.length != digit) {
    showError(inputNumber, `Card number must be ${digit} digits`);
  } else {
    showSuccess(inputNumber);
    valid = true;
  }
  return valid;
};

const checkCVC = () => {
  let valid = false;
  let cvcDigits = 3;
  const cvc = inputcvc.value.trim();

  if (!isRequired(cvc)) {
    showError(inputcvc, "can't be blank");
  } else if (cvc.length != cvcDigits) {
    showError(inputcvc, `cvc number is invalid`);
    inputcvc.classList.add("error");
  } else {
    showSuccess(inputcvc);
    valid = true;
  }
  return valid;
};

const checkExpDate = () => {
  let valid = false;
  const expMonth = inputMonth.value.trim();
  const expYear = inputYear.value.trim();

  if (!isRequired(expMonth) || !isRequired(expYear)) {
    showError(inputMonth, "can't be blank");
    showError(inputYear, "can't be blank");
  } else if (
    expMonth.length != 2 ||
    expMonth > 31 ||
    expYear.length != 2 ||
    expYear > 12
  ) {
    showError(inputMonth, "invalid");
    showError(inputYear, "invalid");
  } else {
    showSuccess(inputMonth);
    showSuccess(inputYear);
    valid = true;
  }
  return valid;
};

const isRequired = (value) => (value === "" ? false : true);
const isBetween = (length, min, max) =>
  length < min || length > max ? false : true;

const showError = (input, message) => {
  const formField = input.parentElement;

  formField.classList.add("error");

  const error = formField.querySelector("small");
  error.textContent = message;
};

const showSuccess = (input) => {
  const formField = input.parentElement;

  formField.classList.remove("error");

  const error = formField.querySelector("small");
  error.textContent = "";
};

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let isNameValid = checkName(),
    isNumberValid = checkNumber(),
    isCVCValid = checkCVC(),
    isDateValid = checkExpDate();

  let isFormValid = isNameValid && isNumberValid && isCVCValid && isDateValid;

  if (isFormValid) {
    div.innerHTML = "";
    let newDiv = document.createElement("div");
    newDiv.className = "form";
    let newDiv1 = document.createElement("div");
    let svg = document.createElement("img");
    svg.src = "images/icon-complete.svg";
    newDiv1.appendChild(svg);
    let newDiv2 = document.createElement("div");
    let p1 = document.createElement("p");
    let p2 = document.createElement("p");
    p1.textContent = "THANK YOU!";
    p2.textContent = `We've added your card details`;
    newDiv2.appendChild(p1);
    newDiv2.appendChild(p2);
    newDiv2.className = "center";
    let newDiv3 = document.createElement("div");
    let newButton = document.createElement("button");
    newButton.textContent = `Continue`;
    newDiv3.appendChild(newButton);
    newDiv.appendChild(newDiv1);
    newDiv.appendChild(newDiv2);
    newDiv.appendChild(newDiv3);
    div.appendChild(newDiv);
  }
});

const debounce = (fn, delay = 500) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      fn.apply(null, args);
    }, delay);
  };
};

form.addEventListener(
  "input",
  debounce(function (e) {
    switch (e.target.id) {
      case "name":
        checkName();
        break;
      case "number":
        checkNumber();
        break;
      case "cvc":
        checkCVC();
        break;
      case "date":
        checkExpDate();
        break;
    }
  })
);
