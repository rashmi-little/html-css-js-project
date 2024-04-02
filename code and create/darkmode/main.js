const toggleButton = document.querySelector('.toggle');
const toggleSymbol = toggleButton.querySelector('i');

const container = document.querySelector('.container');

toggleButton.addEventListener('click', () => {
    container.classList.toggle('dark');
    if(container.classList.contains('dark')) {
        toggleSymbol.classList = 'far fa-moon';
    }else {
        toggleSymbol.classList = 'far fa-sun';
    }
});