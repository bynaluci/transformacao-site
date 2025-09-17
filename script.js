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

// ---- JOGO ----
document.getElementById('btnJogo').addEventListener('click', abrirJogo);
document.getElementById('btnJogoImpacto').addEventListener('click', abrirJogo); // NOVO: Botão Jogue Aqui no impacto
document.getElementById('fecharJogo').addEventListener('click', fecharJogo);

let jogo = {
  // ... (restante do objeto jogo) ...
};

// ... (restante das funções do jogo) ...