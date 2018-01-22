let ipcRenderer = require('electron').ipcRenderer;

const submitForm = document.querySelector("#ipcForm");
const responseParagraph = document.getElementById("response")

submitForm.addEventListener("submit", function(event) {
  event.preventDefault();
  let firstname = document.getElementById("firstname").value;
  let lastname = document.getElementById("lastname").value;
  ipcRenderer.send("submitForm", { 'firstname' : firstname, 'lastname' : lastname });
})

ipcRenderer.on("formProcessed", function(event, data) {
  console.log("Form processed");
  fillPdf(data);
})

