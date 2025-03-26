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

// Lógica do Jogo da Velha
const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('.status');
const resetButton = document.querySelector('.reset');
let currentPlayer = 'X';
let board = Array(9).fill(null);
let gameActive = true;
let contraComputador = false;

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

// Função para atualizar o status
function updateStatus() {
    statusText.textContent = `Vez do jogador ${currentPlayer}`;
}

// Lógica para a jogada do computador
function melhorJogada() {
    if (!gameActive || contraComputador === false || currentPlayer !== 'O') return;

    for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
            board[i] = 'O';
            if (checkWinner()) {
                cells[i].textContent = 'O';
                cells[i].classList.add('O');
                return;
            }
            board[i] = null;
        }
    }

    for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
            board[i] = 'X';
            if (checkWinner()) {
                board[i] = 'O';
                cells[i].textContent = 'O';
                cells[i].classList.add('O');
                return;
            }
            board[i] = null;
        }
    }

    const jogadasPrioritarias = [4, 0, 2, 6, 8, 1, 3, 5, 7];
    for (let i of jogadasPrioritarias) {
        if (board[i] === null) {
            board[i] = 'O';
            cells[i].textContent = 'O';
            cells[i].classList.add('O');
            if (checkWinner()) return;
            break;
        }
    }
}

// Atualiza o tabuleiro com o clique
cells.forEach(cell => {
    cell.addEventListener('click', () => {
        const index = cell.dataset.index;

        if (board[index] !== null || !gameActive) return;

        // Realiza a jogada do jogador
        board[index] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer);

        if (!checkWinner()) {
            if (!contraComputador) {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                updateStatus();
            } else if (currentPlayer === 'X') {
                currentPlayer = 'O';
                updateStatus();
                setTimeout(() => {
                    if (IAcheck()) {
                        if (checkWinner()) { 
                            return; 
                        }
                        if (!gameActive) return;
                        currentPlayer = 'X';
                        updateStatus();
                    }
                }, 500);
            }
        }
    });
});

// Função para reiniciar o jogo
resetButton.addEventListener('click', resetGame);

function resetGame() {
    board = Array(9).fill(null);
    gameActive = true;
    currentPlayer = 'X';
    updateStatus();
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O', 'winner-line');
    });
}

// Lógica do botão "Jogar contra o Computador"
document.getElementById('jogar-contra-computador').addEventListener('click', () => {
    contraComputador = true;
    resetGame();
    statusText.textContent = "Sua vez!";
});

// Modifique o botão de reset para usar a função resetGame
resetButton.addEventListener('click', resetGame);

// Referências aos modais
const sobreModal = document.getElementById("sobre-modal");
const contatoModal = document.getElementById("contato-modal");
const salasModal = document.getElementById("salas-modal");

// Referências aos botões de abrir os modais
const sobreLink = document.getElementById("sobre-link");
const contatoLink = document.getElementById("contato-link");
const salasLink = document.getElementById("salas-link");

// Referências aos botões de fechar os modais
const closeSobreBtn = document.getElementById("close-sobre-btn");
const closeContatoBtn = document.getElementById("close-contato-btn");
const closeSalasBtn = document.getElementById("close-salas-btn");

// Abrir o modal sobre
sobreLink.addEventListener("click", function () {
    sobreModal.style.display = "block";
});

// Abrir o modal de contato
contatoLink.addEventListener("click", function () {
    contatoModal.style.display = "block";
});

// Abrir o modal de salas
salasLink.addEventListener("click", function () {
    salasModal.style.display = "block";
});

// Fechar o modal sobre
closeSobreBtn.addEventListener("click", function () {
    sobreModal.style.display = "none";
});

// Fechar o modal de contato
closeContatoBtn.addEventListener("click", function () {
    contatoModal.style.display = "none";
});

// Fechar o modal salas
closeSalasBtn.addEventListener("click", function () {
    salasModal.style.display = "none";
});

// Fechar os modais clicando fora deles
window.addEventListener("click", function (event) {
    if (event.target === sobreModal) {
        sobreModal.style.display = "none";
    }
    if (event.target === contatoModal) {
        contatoModal.style.display = "none";
    }
    if (event.target === salasModal) {
        salasModal.style.display = "none";
    }
});
