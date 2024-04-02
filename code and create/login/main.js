const container = document.querySelector('.container');
const signupbtn = document.querySelector('.green-bg button');

signupbtn.addEventListener('click', () => {
    container.classList.toggle('change');
});