// Importações do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getDatabase, ref, set, get, push, onValue } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-database.js";

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDS2YfxZbvZwyzTrllZgJWcmKuq51OyIxE",
    authDomain: "jogo-da-velha-e0d62.firebaseapp.com",
    databaseURL: "https://jogo-da-velha-e0d62-default-rtdb.firebaseio.com",
    projectId: "jogo-da-velha-e0d62",
    storageBucket: "jogo-da-velha-e0d62.firebasestorage.app",
    messagingSenderId: "908444283125",
    appId: "1:908444283125:web:9e0314bfb68b068e96d5bc",
    measurementId: "G-NTZ70N0NTF"
};

// Inicialização do Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const scoresRef = ref(db, 'scores');

// Combinações vencedoras
const WINS_POSSIBLE = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];



// Atualizar texto de status
function updateStatus() {
    statusText.textContent = `Vez do jogador ${currentPlayer}`;
}

// Verificar vencedor
function checkWinner() {
    for (let pattern of WINS_POSSIBLE) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameActive = false;
            const winner = board[a];
            statusText.textContent = `🎉 Jogador ${winner} venceu! 🎉`;
            cells[a].classList.add('winner-line');
            cells[b].classList.add('winner-line');
            cells[c].classList.add('winner-line');

            if (winner === 'X') scoreX++;
            else scoreO++;

            updateScoreboard();

            new JSConfetti().addConfetti();

            const victorySound = document.getElementById('victorySound');
            victorySound.volume = 0.05;
            victorySound.play();

            return true;
        }
    }

    if (!board.includes(null)) {
        gameActive = false;
        statusText.textContent = "🤝 Empate! Tentem novamente!";
        return true;
    }

    return false;
}

// Funções da IA
function setCellElementIA(index) {
    if (board[index] === null) {
        board[index] = 'O';
        cells[index].textContent = 'O';
        cells[index].classList.add('O');
        marks.push('O');
        return true;
    }
    return false;
}

function IArandomPlay(indices) {
    const valid = indices.filter(i => board[i] === null);
    if (valid.length > 0) {
        const random = Math.floor(Math.random() * valid.length);
        return setCellElementIA(valid[random]);
    }
    return false;
}

function IAcheck() {
    if (!gameActive || !contraComputador || currentPlayer !== 'O') return false;

    let played = false;

    // 1. Vitória da IA
    for (const combo of WINS_POSSIBLE) {
        const oCount = combo.filter(i => board[i] === 'O').length;
        const empty = combo.find(i => board[i] === null);
        if (oCount === 2 && empty !== undefined) {
            played = setCellElementIA(empty);
            break;
        }
    }
    if (played) return true;

    // 2. Bloqueio ao jogador
    for (const combo of WINS_POSSIBLE) {
        const xCount = combo.filter(i => board[i] === 'X').length;
        const empty = combo.find(i => board[i] === null);
        if (xCount === 2 && empty !== undefined) {
            played = setCellElementIA(empty);
            break;
        }
    }
    if (played) return true;

    // 3. Criar sequência
    for (const combo of WINS_POSSIBLE) {
        const oCount = combo.filter(i => board[i] === 'O').length;
        const empty = combo.find(i => board[i] === null);
        if (oCount === 1 && empty !== undefined) {
            played = setCellElementIA(empty);
            break;
        }
    }
    if (played) return true;

    // 4. Jogada aleatória
    const emptyCells = board.map((val, idx) => val === null ? idx : null).filter(v => v !== null);
    return IArandomPlay(emptyCells);
}

// Eventos das células
cells.forEach(cell => {
    cell.addEventListener('click', () => {
        const index = parseInt(cell.dataset.index);
        if (board[index] !== null || !gameActive) return;

        board[index] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer);
        marks.push(currentPlayer);

        if (checkWinner()) return;

        if (!contraComputador) {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            updateStatus();
        } else if (currentPlayer === 'X') {
            currentPlayer = 'O';
            updateStatus();
            setTimeout(() => {
                if (IAcheck() && checkWinner()) return;
                if (!gameActive) return;
                currentPlayer = 'X';
                updateStatus();
            }, 500);
        }
    });
});

// Botão de reset
resetButton.addEventListener('click', resetGame);
function resetGame() {
    board = Array(9).fill(null);
    gameActive = true;
    currentPlayer = 'X';
    marks = [];
    updateStatus();
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O', 'winner-line');
    });
}

// Botão "Jogar contra o Computador"
const jogarContraComputadorBtn = document.getElementById('jogar-contra-computador');
jogarContraComputadorBtn.addEventListener('click', () => {
    contraComputador = true;
    resetGame();
    statusText.textContent = "Sua vez!";
});

// Lógica do menu hambúrguer
const menuToggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");

menuToggle.addEventListener("click", function() {
    menu.classList.toggle("active");
});

// Fecha o menu ao clicar fora dele
document.addEventListener("click", function(event) {
    if (!menu.contains(event.target) && !menuToggle.contains(event.target)) {
        menu.classList.remove("active");
    }
});

// Modais Sobre e Contato
const sobreModal = document.getElementById("sobre-modal");
const contatoModal = document.getElementById("contato-form");
const sobreLink = document.getElementById("sobre-link");
const contatoLink = document.getElementById("contato-link");
const closeSobreBtn = document.getElementById("close-sobre-btn");
const closeContatoBtn = document.getElementById("close-btn");

sobreLink.addEventListener("click", () => sobreModal.style.display = "block");
contatoLink.addEventListener("click", () => contatoModal.style.display = "block");
closeSobreBtn.addEventListener("click", () => sobreModal.style.display = "none");
closeContatoBtn.addEventListener("click", () => contatoModal.style.display = "none");

window.addEventListener("click", (event) => {
    if (event.target === sobreModal) sobreModal.style.display = "none";
    if (event.target === contatoModal) contatoModal.style.display = "none";
});
