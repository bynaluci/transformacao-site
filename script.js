// ... (código existente) ...

document.getElementById("voluntario-form").addEventListener("submit", function(event) {
  event.preventDefault(); // impede envio padrão do formulário

  emailjs.sendForm("service_f3w95js", "template_xv8exuz", this)
    .then(function() {
      alert("Mensagem enviada com sucesso! Obrigado pelo contato.");
      document.getElementById("voluntario-form").reset();
    }, function(error) {
      alert("Ocorreu um erro: " + JSON.stringify(error));
    });
});

const modal = document.getElementById("modalOrganograma");
const btn = document.getElementById("abrirOrganogramaBtn");
const span = document.getElementsByClassName("close-button")[0];
const pdfViewer = document.getElementById("pdfViewer");

const caminhoDoPDF = 'organograma.PDF';

btn.onclick = function(event) {
  event.preventDefault(); // Impede que o link '#' mude a URL
  pdfViewer.src = caminhoDoPDF; // Carrega o PDF no iframe
  modal.style.display = "block"; // Mostra a janela modal
}

span.onclick = function() {
  modal.style.display = "none"; // Esconde a janela modal
  pdfViewer.src = ""; // Limpa o src para parar de carregar o PDF
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none"; // Esconde a janela modal
    pdfViewer.src = ""; // Limpa o src
  }
}

// ---- JOGO ----
document.getElementById('btnJogo').addEventListener('click', abrirJogo);
document.getElementById('btnJogoImpacto').addEventListener('click', abrirJogo); // NOVO: Botão Jogue Aqui no impacto
document.getElementById('fecharJogo').addEventListener('click', fecharJogo);

let jogo = {
  // ... (restante do objeto jogo) ...
};

// ... (restante das funções do jogo) ...