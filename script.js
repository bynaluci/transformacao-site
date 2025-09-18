// ---- MODAL ORGANOGRAMA ----
function verOrganograma() {
  document.getElementById("modalOrganograma").style.display = "flex";
}
function fecharOrganograma() {
  document.getElementById("modalOrganograma").style.display = "none";
}
document.addEventListener("DOMContentLoaded", () => {
  const img = document.getElementById("organogramaImg");
  const lupa = document.getElementById("lupa");
  if (!img || !lupa) return;
  const zoom = 2.5;
  img.addEventListener("mousemove", (e) => {
    const rect = img.getBoundingClientRect();
    const x = e.clientX - rect.left, y = e.clientY - rect.top;
    if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
      lupa.style.display = "none";
      return;
    }
    lupa.style.display = "block";
    lupa.style.left = `${x - lupa.offsetWidth / 2}px`;
    lupa.style.top = `${y - lupa.offsetHeight / 2}px`;
    lupa.style.backgroundImage = `url(${img.src})`;
    lupa.style.backgroundSize = `${img.width * zoom}px ${img.height * zoom}px`;
    lupa.style.backgroundPosition = `-${x * zoom - lupa.offsetWidth / 2}px -${y * zoom - lupa.offsetHeight / 2}px`;
  });
  img.addEventListener("mouseleave", () => { lupa.style.display = "none"; });
});

// ---- CARROSSEL ----
let posicaoCarrossel = 0;
function moverCarrossel(direcao) {
  const carrossel = document.querySelector(".carrossel:not(.carrossel2)");
  const imagens = carrossel.querySelectorAll("img");
  posicaoCarrossel = (posicaoCarrossel + direcao + imagens.length) % imagens.length;
  carrossel.style.transform = `translateX(-${posicaoCarrossel * 100}%)`;
}
let indiceCarrossel2 = 0;
function moverCarrossel2(direcao) {
  const carrossel = document.querySelector(".carrossel2");
  const imagens = carrossel.querySelectorAll("img");
  indiceCarrossel2 = (indiceCarrossel2 + direcao + imagens.length) % imagens.length;
  carrossel.style.transform = `translateX(-${indiceCarrossel2 * 100}%)`;
}

// ---- FORMULÁRIO VOLUNTÁRIO (EmailJS) ----
document.getElementById("voluntario-form").addEventListener("submit", function(event) {
  event.preventDefault(); 
  emailjs.sendForm("service_f3w95js", "template_xv8exuz", this)
    .then(() => {
        mostrarToast("Mensagem enviada com sucesso! Obrigado.");
        document.getElementById("voluntario-form").reset();
    }, (error) => {
        mostrarToast("Ocorreu um erro: " + JSON.stringify(error));
    });
});

// ---- JOGO ----
document.getElementById('btnJogo').addEventListener('click', abrirJogo);
// Se quiser que o botão "Jogue aqui!" também funcione, adicione a linha abaixo:
// document.getElementById('btnJogoImpacto').addEventListener('click', abrirJogo);
document.getElementById('fecharJogo').addEventListener('click', fecharJogo);
let jogo = { ativo: false, pausado: false, rafId: null, canvas: null, ctx: null, keys: {}, placar: 0, metaVencedor: 10, player: { x: 40, y: 40, w: 35, h: 35, vel: 3 }, papers: [], paperSize: 25 };
function abrirJogo() {
  const modal = document.getElementById('modalJogo');
  modal.classList.add('aberto');
  if (!jogo.canvas) {
    jogo.canvas = document.getElementById('gameCanvas');
    jogo.ctx = jogo.canvas.getContext('2d');
  }
  iniciarJogo();
}
function fecharJogo() {
  pararLoop();
  document.getElementById('modalJogo').classList.remove('aberto');
}
// ... (restante do código do jogo)
function iniciarJogo() {
  jogo.ativo = true; jogo.pausado = false; jogo.placar = 0;
  jogo.player.x = 40; jogo.player.y = 40;
  atualizarPlacar();
  jogo.papers = Array.from({ length: 5 }, () => papelAleatorio());
  document.getElementById('btnPausar').onclick = alternarPausa;
  loop();
}
function pararLoop() { if(jogo.rafId) cancelAnimationFrame(jogo.rafId); jogo.ativo = false; }
function loop() {
  if (!jogo.ativo) return;
  jogo.rafId = requestAnimationFrame(loop);
  if (jogo.pausado) return;
  atualizar();
  desenhar();
}
function atualizar() {
  const { player, canvas } = jogo;
  let dx = 0, dy = 0;
  if (jogo.keys['arrowleft'] || jogo.keys['a']) dx -= player.vel;
  if (jogo.keys['arrowright'] || jogo.keys['d']) dx += player.vel;
  if (jogo.keys['arrowup'] || jogo.keys['w']) dy -= player.vel;
  if (jogo.keys['arrowdown'] || jogo.keys['s']) dy += player.vel;
  player.x = Math.max(0, Math.min(player.x + dx, canvas.width - player.w));
  player.y = Math.max(0, Math.min(player.y + dy, canvas.height - player.h));
  jogo.papers.forEach((p, i) => {
    if (colide(player, p)) {
      jogo.placar++;
      atualizarPlacar();
      jogo.papers[i] = papelAleatorio();
      if (jogo.placar >= jogo.metaVencedor) { mostrarToast("🎉 Parabéns!"); pararLoop(); }
    }
  });
}
function desenhar() {
  const { ctx, canvas, player, papers } = jogo;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  papers.forEach(p => { ctx.fillStyle = '#dfe9ff'; ctx.fillRect(p.x, p.y, p.w, p.h); });
  ctx.fillStyle = '#1BA1E2';
  ctx.fillRect(player.x, player.y, player.w, player.h);
}
function colide(a, b) { return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y; }
function papelAleatorio() { const { canvas, paperSize } = jogo; return { x: Math.random() * (canvas.width - paperSize), y: Math.random() * (canvas.height - paperSize), w: paperSize, h: paperSize }; }
function atualizarPlacar() { document.getElementById('placar').textContent = `Papéis: ${jogo.placar}`; }
function alternarPausa() { jogo.pausado = !jogo.pausado; document.getElementById('btnPausar').textContent = jogo.pausado ? "Retomar" : "Pausar"; }
document.addEventListener('keydown', e => jogo.keys[e.key.toLowerCase()] = true);
document.addEventListener('keyup', e => jogo.keys[e.key.toLowerCase()] = false);

// ---- TOAST (Notificação) ----
function mostrarToast(texto) {
  const el = document.getElementById('toast');
  el.textContent = texto;
  el.classList.add('visivel');
  if(el._t) clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove('visivel'), 4000);
}

// ---- MENU MOBILE ----
document.addEventListener('DOMContentLoaded', () => {
  const btnMobile = document.getElementById('btn-mobile');
  const header = document.querySelector('.header');
  function toggleMenu(event) {
    if (event.type === 'touchstart') event.preventDefault();
    header.classList.toggle('ativo');
    document.body.style.overflow = header.classList.contains('ativo') ? 'hidden' : 'auto';
  }
  btnMobile.addEventListener('click', toggleMenu);
  btnMobile.addEventListener('touchstart', toggleMenu);
});