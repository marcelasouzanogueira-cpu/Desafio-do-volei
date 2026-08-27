// ==========================================
// 1. VARIÁVEIS (Estado do Jogo)
// ==========================================
let pontos = 0;
let placarTimeA = 0;
let placarTimeB = 0;
let bolaEmJogo = true;
let bolaLevantada = false; // Controle que impede atacar sem antes levantar

function atualizarInterface(mensagem, dica, status = "● BOLA PRONTA") {
document.getElementById("resultado").innerHTML = mensagem;
document.getElementById("dica").textContent = dica;
document.getElementById("bolaStatus").textContent = status;
document.getElementById("placarA").textContent = placarTimeA;
document.getElementById("placarB").textContent = placarTimeB;
}

// ==========================================
// 2. FUNÇÃO DE RODÍZIO (Lógica de Troca)
// ==========================================
function fazerRodizio() {
// Pega os nomes atuais de cada campo na quadra
const p1 = document.getElementById("pos1").value;
const p2 = document.getElementById("pos2").value;
const p3 = document.getElementById("pos3").value;
const p4 = document.getElementById("pos4").value;
const p5 = document.getElementById("pos5").value;
const p6 = document.getElementById("pos6").value;

// Rotação oficial de vôlei (sentido horário)
document.getElementById("pos1").value = p2;
document.getElementById("pos6").value = p1;
document.getElementById("pos5").value = p6;
document.getElementById("pos4").value = p5;
document.getElementById("pos3").value = p4;
document.getElementById("pos2").value = p3;

// Reseta a condição do levantamento no rodízio
bolaLevantada = false;

atualizarInterface("🔄 Rodízio realizado!", "Novo sacador: " + p2 + ". Escolha a próxima jogada.");
}

// ==========================================
// 3. FUNÇÕES DE AÇÕES DAS JOGADAS (DOM)
// ==========================================
function sacar() {
bolaLevantada = false; // Reinicia a sequência de ataque
const sacador = document.getElementById("pos1").value;
atualizarInterface("🏐 Saque realizado por <b>" + sacador + "</b>!", "A bola está do outro lado. Prepare a defesa.", "● SAQUE EXECUTADO");
}

function defender() {
atualizarInterface("👏 Defesa realizada com sucesso!", "Agora prepare o levantamento para criar o ataque.", "● BOLA DEFENDIDA");
}

function levantar() {
// Pega o nome do jogador na Posição 3 (Levantador)
const levantador = document.getElementById("pos3").value;

// Ativa a permissão para que o ataque ocorra
bolaLevantada = true;

atualizarInterface("🎯 Levantamento perfeito feito por <b>" + levantador + "</b>!", "A bola está pronta: finalize com um ataque.", "● BOLA LEVANTADA");
}

function atacar() {
// REGRA DE VALIDAÇÃO: Verifica se houve levantamento prévio
if (!bolaLevantada) {
atualizarInterface("⚠️ <b>Ataque não permitido!</b> É necessário realizar um <b>Levantamento</b> antes de atacar!", "Siga a sequência: defesa, levantamento e ataque.", "● AGUARDANDO LEVANTAMENTO");
return; // Interrompe a função
}

// Consome a bola levantada (precisará de outro levantamento no próximo ponto)
bolaLevantada = false;

pontos++;

atualizarInterface("🔥 Ataque potente no chão! Ponto para sua equipe!", "Ponto marcado. O rodízio foi feito automaticamente.", "● PONTO MARCADO");

const elementoPlacar = document.getElementById("placar");
if (elementoPlacar) {
elementoPlacar.innerHTML = "Placar: " + pontos;
}

registrarPonto("A");
}

function bloquear() {
atualizarInterface("🛡️ Bloqueio realizado!", "A muralha funcionou. Continue a sequência.");
}

function reiniciarPartida() {
placarTimeA = 0;
placarTimeB = 0;
pontos = 0;
bolaEmJogo = true;
bolaLevantada = false;
atualizarInterface("Aguardando jogada...", "Comece pelo saque para colocar a bola em jogo.");
}

// ==========================================
// 4. REGRAS DE NEGÓCIO E LÓGICA DA PARTIDA
// ==========================================
function registrarPonto(timeVencedor) {
if (!bolaEmJogo) return;

if (timeVencedor === "A") {
placarTimeA++;
console.log("Ponto para o Time A!");
// Faz o rodízio automaticamente ao marcar ponto
fazerRodizio();
} else {
placarTimeB++;
console.log("Ponto para o Time B!");
}

verificarFimDeSet();
}

function verificarFimDeSet() {
if (placarTimeA >= 5) {
console.log("Fim do Set! Time A venceu!");
document.getElementById("resultado").innerHTML = "🏆 Fim do Set! Sua equipe venceu!";
bolaEmJogo = false;
} else if (placarTimeB >= 5) {
console.log("Fim do Set! Time B venceu!");
bolaEmJogo = false;
}
}