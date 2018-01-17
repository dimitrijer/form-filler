let ipcRenderer = require('electron').ipcRenderer;
let pdfFiller = require('pdffiller');

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

function fillPdf(data) {

  var sourcePDF = "test/test.pdf";
  var destinationPDF = "test/test_complete.pdf";

  pdfFiller.fillForm( sourcePDF, destinationPDF, data, function(err) {
    if (err) throw err;
    console.log("In callback (we're done).");
  });
}
