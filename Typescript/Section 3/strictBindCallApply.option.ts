const btn = document.querySelector('button')!;

function clickHandler(message: string) {
  console.log("Clicked !" + message);
}

if (btn) {
  btn.addEventListener('click', clickHandler.bind(null, "Hello"));
}