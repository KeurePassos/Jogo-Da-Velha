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
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]             
];

cells.forEach(cell => {
    cell.addEventListener('click', () => {
        const index = cell.getAttribute('data-index');
        if (board[index] === "" && gameActive) {
            board[index] = currentPlayer;
            cell.textContent = currentPlayer;
            cell.classList.add(currentPlayer);
            checkWinner();
            if (gameActive) {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                statusText.textContent = `Vez do jogador ${currentPlayer}`;
            }
        }
    });
});

function checkWinner() {
    for (let condition of winConditions) {
        let [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameActive = false;
            statusText.textContent = `🎉 Jogador ${board[a]} venceu! 🎉`;
            condition.forEach(index => {
                cells[index].classList.add('winner-line');
            });
            showCelebration();  // Chama a função para mostrar os emojis
            return;
        }
    }

    if (!board.includes("")) {
        gameActive = false;
        statusText.textContent = "🤝 Empate! Tentem novamente!";
    }
}

resetButton.addEventListener('click', () => {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    statusText.textContent = `Vez do jogador ${currentPlayer}`;
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("X", "O", "winner-line");
    });
});

// Lógica do Modal "Sobre"
const sobreLink = document.getElementById('sobre-link');
const sobreModal = document.getElementById('sobre-modal');
const closeSobreBtn = document.getElementById('close-sobre-btn');

sobreLink.addEventListener('click', function() {
    sobreModal.style.display = "block";
});

closeSobreBtn.addEventListener('click', function() {
    sobreModal.style.display = "none";
});

// Lógica do formulário de Contato
const contatoLink = document.getElementById("contato-link");
const contatoForm = document.getElementById("contato-form");
const closeBtnContato = document.getElementById("close-btn");
const formStatus = document.getElementById("form-status");
const contatoInputs = contatoForm.querySelectorAll("input, textarea");

contatoLink.addEventListener("click", () => {
    contatoForm.style.display = "block";
    formStatus.textContent = "";
    contatoInputs.forEach(input => input.value = ""); // Reseta os campos
});

closeBtnContato.addEventListener("click", () => {
    contatoForm.style.display = "none";
    formStatus.textContent = "";
    contatoInputs.forEach(input => input.value = ""); // Reseta os campos ao fechar
});

document.addEventListener("click", (event) => {
    if (!contatoForm.contains(event.target) && event.target !== contatoLink) {
        contatoForm.style.display = "none";
        formStatus.textContent = "";
        contatoInputs.forEach(input => input.value = ""); // Reseta os campos ao fechar
    }
});

contatoForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensagem = document.getElementById("mensagem").value.trim();

    if (!nome || !email || !mensagem) {
        formStatus.textContent = "Por favor, preencha todos os campos.";
        formStatus.style.color = "red";
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        formStatus.textContent = "Por favor, insira um e-mail válido.";
        formStatus.style.color = "red";
        return;
    }

    formStatus.textContent = "Mensagem enviada com sucesso!";
    formStatus.style.color = "green";
    contatoInputs.forEach(input => input.value = ""); // Limpa os campos
});

// Função para mostrar os emojis 🎉 quando alguém ganhar
function showCelebration() {
    const emojis = ["🎉", "🎊", "✨", "👏"]; // Array com diferentes emojis
    for (let i = 0; i < 10; i++) { // 10 emojis de celebração
        let emoji = document.createElement("div");
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)]; // Escolhe aleatoriamente um emoji
        emoji.classList.add("celebration");

        // Posicionando o emoji aleatoriamente na tela
        emoji.style.left = Math.random() * window.innerWidth + 'px';  // Posição aleatória na horizontal
        emoji.style.animationDelay = Math.random() * 2 + 's';  // Delay aleatório para os emojis

        document.body.appendChild(emoji);

        // Remover o emoji após a animação
        setTimeout(() => {
            emoji.remove();
        }, 10000);  // 10 segundos (tempo da animação)
    }
}
