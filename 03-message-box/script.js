function getText() {
  let text = document.querySelector("#text-box").value;

  let paragraph = document.querySelector("p");
  paragraph.textContent = "Hello " + text + " welcome to my page";
}
