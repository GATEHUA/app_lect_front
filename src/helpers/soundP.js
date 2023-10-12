export function playCorrectSound() {
  const audio = new Audio("/sounds/win.mp3");
  audio.play();
}

export function playIncorrectSound() {
  const audio = new Audio("/sounds/lose.mp3");
  audio.play();
}
