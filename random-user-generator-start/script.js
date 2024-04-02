const generateButton = document.getElementById("generate");
const userDiv = document.getElementById("user");

function generateUser() {
  showSpinner();
  var userResponse = fetch("https://randomuser.me/api/");
  userResponse
    .then((res) => res.json())
    .then((user) => {
        hideSpinner();
        displayUser(user.results[0]);
    })
    .catch((err) => console.log("Some error occure"));
}

function displayUser(user) {
  if (user.gender === "female") {
    document.querySelector("body").style.backgroundColor = "purple";
  } else {
    document.querySelector("body").style.backgroundColor = "steelblue";
  }

  userDiv.innerHTML = `<div class="flex justify-between">
    <div class="flex">
      <img
        class="w-48 h-48 rounded-full mr-8"
        src="${user.picture.large}"
      />
      <div class="space-y-3">
        <p class="text-xl">
          <span class="font-bold">Name: </span>${
            user.name.first + " " + user.name.last
          }
        </p>
        <p class="text-xl">
          <span class="font-bold">Email: </span> ${user.email}
        </p>
        <p class="text-xl">
          <span class="font-bold">Phone: </span> ${user.phone}
        </p>
        <p class="text-xl">
          <span class="font-bold">Location: </span> ${
            user.location.state + "," + user.location.country
          }
        </p>
        <p class="text-xl"><span class="font-bold">Age: </span> ${
          user.dob.age
        }</p>
      </div>
    </div>
  </div>`;
}

function showSpinner() {
  document.querySelector(".spinner").style.display = "block";
}

function hideSpinner() {
  document.querySelector(".spinner").style.display = "none";
}

generateButton.addEventListener("click", generateUser);
