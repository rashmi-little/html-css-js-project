
// const container = document.querySelector(".container");
// console.log(container);
// window.addEventListener("keydown", (e) => {
//             container.innerHTML = `<div class="key">
//             ${e.key === ' ' ? 'space':e.key}
//             <small>e.key</small>
//         </div>
//         <div class="key">
//             ${e.keyCode}
//             <small>e.keycode</small>
//         </div>
//         <div class="key">
//             ${e.code}
//             <small>e.code</small>`;
// });



const container = document.querySelector(".container");

function showKeyCode(e) {
    container.innerHTML="";
    const keyObject = {
        'e.key': e.key === ' ' ? 'space':e.key,
        'e.keyCode': e.keyCode,
        'e.code': e.code
    };

    for (const key in keyObject) {
        const div = document.createElement('div');
        const small = document.createElement("small");
        div.classList.add("key");
        div.textContent = keyObject[key];
        small.textContent=key;
        div.appendChild(small);
        container.appendChild(div);
    }
}


window.addEventListener('keydown', showKeyCode);