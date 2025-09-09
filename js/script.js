const canvas = document.getElementById("mockupCanvas");
const ctx = canvas.getContext("2d");

let currentMockup = new Image();
currentMockup.src = "images/mockup1.jpg";

currentMockup.onload = () => {
  ctx.drawImage(currentMockup, 0, 0, canvas.width, canvas.height);
};

document.getElementById("nombre").addEventListener("input", actualizarTexto);
document.getElementById("edad").addEventListener("input", actualizarTexto);

function cargarMockup(src) {
  currentMockup = new Image();
  currentMockup.src = src;
  currentMockup.onload = () => {
    ctx.drawImage(currentMockup, 0, 0, canvas.width, canvas.height);
    actualizarTexto();
  };
}

function actualizarTexto() {
  ctx.drawImage(currentMockup, 0, 0, canvas.width, canvas.height);

  const nombre = document.getElementById("nombre").value;
  const edad = document.getElementById("edad").value;

  ctx.font = "bold 36px Arial";
  ctx.fillStyle = "black";
  ctx.textAlign = "center";

  // Posiciones predeterminadas (ajústalas midiendo en Photoshop)
  if (nombre) ctx.fillText(nombre, 400, 100);
  if (edad) ctx.fillText(edad, 400, 150);
}

// Descargar en PDF
document.getElementById("descargar").addEventListener("click", () => {
  html2canvas(document.querySelector(".preview")).then(canvas => {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF("p", "mm", "a4");
    const imgData = canvas.toDataURL("image/png");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("etiqueta.pdf");
  });
});
