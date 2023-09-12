const currentLetter_className = "currentLetter";
const blackLetter_className = "blackLetter";
const greenLetter_className = "letterGreen";
const errorLetter_className = "letterError";

const numberWords = 25;

const words = new Words(
  "https://trouve-mot.fr/api/random/",
  numberWords,
  "words",
  currentLetter_className,
  blackLetter_className
);

const keyboard = new Keyboard(
  words.getLetters(),
  currentLetter_className,
  greenLetter_className,
  errorLetter_className
);

document.getElementById("restart").addEventListener("click", function (e) {
  e.preventDefault();

  document.getElementById("words").textContent = "";

  words.generateWords();
  keyboard.remove_keyup_event();
  keyboard.keyup_event();
  document.getElementById("container_result").style.opacity = "0";
});
