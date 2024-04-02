const base_url = "https://jsonplaceholder.typicode.com/todos";
const todoForm = document.getElementById("todo-form");
let count = 0;

const getTodos = () => {
  fetch(base_url + "?_limit=10")
    .then((res) => res.json())
    .then((todos) => {
      todos.forEach((todo) => insertTodo(todo));
    })
    .catch((err) => console.log(err));
};

function insertTodo(todo) {
  const div = document.createElement("div");
  div.appendChild(document.createTextNode(todo.title));
  div.setAttribute("data-id", todo.id);

  if (todo.completed) {
    div.classList.add("done");
  }

  document.getElementById("todo-list").appendChild(div);
}

function createTodo(e) {
    e.preventDefault();
    const form = new FormData(todoForm);
    fetch(base_url, {
        method : 'POST',
        body : JSON.stringify({
            userId : count,
            title : form.get('todo-title'),
            completed : false
        }),
        headers: {
            "Content-type": "application/json"
        }
    }).then(res => res.json()).then(todo => insertTodo(todo)).catch(err => console.log(err));
}

document.addEventListener("DOMContentLoaded", () => {
  getTodos();
  todoForm.addEventListener('submit', createTodo);
});

