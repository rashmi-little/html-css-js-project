const form = document.querySelector('#addForm');
const inputField = document.getElementById('item');
const ul = document.getElementById('items');
function onFormSubmit(e) {
    e.preventDefault();
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.innerText = inputField.value;
    ul.appendChild(li);
    form.reset();
}

form.addEventListener('submit', onFormSubmit);