const synth = window.speechSynthesis;
const select = document.getElementById("voice-select");
setTimeout(addAllVoice, 1);
const form = document.getElementById("form");

form.addEventListener("submit", onSubmit);

function onSubmit(e) {
  e.preventDefault();
  const input = document.getElementById("text-input");
  const inputValue = input.value;

  const utterThis = new SpeechSynthesisUtterance(inputValue);

  const voice = select.selectedOptions[0].getAttribute('data-name');
  console.log(voice);
  const voices = synth.getVoices();

  for(let i = 0; i < voices.length; i++) {
    if(voices[i].name == voice) {
        utterThis.voice = voices[i];
        console.log('voice match found');
        break;
    }
  }
  synth.speak(utterThis);
}

function addAllVoice() {
  const voices = synth.getVoices();

  for (let i = 0; i < voices.length; i++) {
    const option = document.createElement("option");

    option.textContent = `${voices[i].name}`;

    if (voices[i].default) {
      option.textContent += " - DEFAULT";
    }

    option.setAttribute("data-lang", `${voices[i].lang}`);
    option.setAttribute("data-name", `${voices[i].name}`);

    select.appendChild(option);
  }
}

