const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password1 = document.getElementById("password1");
const password2 = document.getElementById("password2");

function showError(input, message) {
  const formControl = input.closest(".form-control");

  formControl.className = "form-control error";
  const error = formControl.querySelector("small");
  error.textContent = message;
}

function showSuccess(input) {
  const formControl = input.closest(".form-control");
  formControl.className = "form-control success";
}

function checkValidation(inputArr) {
  inputArr.forEach((input) => {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

function checkLength(input, min, max) {
  const inputLength = input.value.trim().length;
  if (inputLength < min) {
    showError(
      input,
      `${getFieldName(input)} length should be more than ${min}`
    );
  } else if (inputLength > max) {
    showError(
      input,
      `${getFieldName(input)} length should be less than ${max}`
    );
  } else {
    showSuccess(input);
    console.log("No errror occure");
  }
}

function checkEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if(emailRegex.test(email.value.toLowerCase())) {
        showSuccess(email);
        console.log("valid email");
    }else {
        showError(email, "Invalid email format");
        console.log("invalid email");
    }
}

function checkPasswordMatch(input1, input2) {
    const password1 = input1.value.trim();
    const password2 = input2.value.trim();
    
    if(password1 === password2) {
        showSuccess(input1);
        showSuccess(input2);
    }else {
        showError(input2, "password mismatch");
    }
}
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Event listner

form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkValidation([username, email, password1, password2]);
  checkLength(username, 4, 10);
  checkEmail(email);
  checkPasswordMatch(password1, password2);
});
