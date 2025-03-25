# Jogo da Velha Online

Este projeto é uma versão interativa do clássico Jogo da Velha (Tic-Tac-Toe), desenvolvido com HTML, CSS e JavaScript. Ele permite que dois jogadores disputem entre si ou que um jogador enfrente o computador. O jogo inclui funcionalidades como detecção de vitória, reinício da partida, menu de navegação e modais informativos.

<div>
<img src="http://img.shields.io/static/v1?label=STATUS%20DO%20PROJETO&message=%20EM%20ANDAMENTO&color=GREEN&style=for-the-badge_blank">
</div>

## Funcionalidades

* **Jogo Interativo:** Permite que dois jogadores joguem alternando entre os símbolos "X" e "O".
* **Modo Contra o Computador:** Possibilidade de jogar contra a IA do jogo.
* **Tabuleiro 3x3:** Interface do jogo em formato de grade 3x3.
* **Detecção de Vitória/Empate:** O jogo identifica automaticamente o vencedor ou um empate e exibe a mensagem correspondente.
* **Reinício do Jogo:** Botão para reiniciar a partida a qualquer momento.
* **Menu Hambúrguer:** Navegação para acessar informações sobre o jogo e opções de contato.
* **Modais Informativos:**
    * **Sobre:** Informações sobre o jogo e como jogar.
    * **Contato:** Opções para entrar em contato com o desenvolvedor.
* **Animações e Efeitos Visuais:**
    * Confetes ao final da partida.
    * Estilos para destacar a linha vencedora.
* **Efeitos Sonoros:** Som de vitória ao final da partida.

## Tecnologias Utilizadas

* **HTML:** Estrutura da página e organização dos elementos do jogo.
* **CSS:** Estilos, layout, animações e responsividade.
* **JavaScript:** Lógica do jogo, interação com o usuário, IA, manipulação do DOM e funcionalidades extras.
  
## Instalação
1.  Clone o repositório do projeto:

<code>git clone https://github.com/KeurePassos/Jogo-Da-Velha.git</code>

2.  Navegue até a pasta do projeto clonado:
cd jogo-da-velha

3.  Abra o arquivo `index.html` em um navegador web para jogar.

## Como Jogar

1.  **Início:** O jogo começa com o jogador "X".
2.  **Jogadas:** Clique nas células vazias do tabuleiro para marcar com o seu símbolo ("X" ou "O").
3.  **Alternância de Jogadores:** Os jogadores se alternam a cada jogada.
4.  **Vitória:** O primeiro jogador a alinhar três símbolos iguais em uma linha, coluna ou diagonal vence.
5.  **Empate:** Se o tabuleiro for preenchido sem que nenhum jogador complete uma linha, a partida termina em empate.
6.  **Reiniciar:** Clique no botão "Reiniciar Jogo" para começar uma nova partida.
7.  **Jogar contra o Computador:** Clique no botão "Jogar contra o Computador" para ativar o modo de jogo contra a IA.
8.  **Menu:** Utilize o menu hambúrguer para acessar as seções "Sobre" e "Contato".

## Estrutura do Projeto

* `index.html`: Arquivo principal com a estrutura HTML do jogo e os modais.
* `style.css`: Arquivo com os estilos CSS para o layout, animações e componentes do jogo.
* `script.js`: Arquivo JavaScript contendo a lógica do jogo, IA, manipulação do DOM e interações com o usuário.
* `victory-sound.mp3`: Arquivo de áudio para o som de vitória.
* 
## Lógica da IA

O jogo inclui uma lógica de Inteligência Artificial para o modo "Jogar contra o Computador". A IA segue as seguintes prioridades:

1.  **Vitória da IA:** Tenta vencer na próxima jogada.
2.  **Bloquear Vitória do Jogador:** Impede que o jogador vença na próxima jogada.
3.  **Criar Sequência:** Tenta criar uma sequência para vencer.
4.  **Jogada Aleatória:** Se nenhuma das opções anteriores for possível, faz uma jogada aleatória.

## Contribuição

Contribuições são bem-vindas! Se você tiver sugestões de melhorias, correções de bugs ou novas funcionalidades, sinta-se à vontade para abrir uma Issue ou enviar um Pull Request.

* Este projeto foi desenvolvido por Kéure Passos Soares.
  
## Contato

Você pode me contatar em:

<div>
<a href="https://instagram.com/keure_passos" target="_blank"><img src="https://img.shields.io/badge/-Instagram-%23E4405F?style=for-the-badge&logo=instagram&logoColor=white" target="_blank"></a>
<a href="https://www.linkedin.com/in/k%C3%A9ure-passos-soares-6b6ba8268/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a>
<a href="mailto:keurepassos17@gmail.com">
<img src="https://img.shields.io/badge/-Gmail-%23333?style=for-the-badge&logo=gmail&logoColor=white" alt="Gmail" />
</a>
</div>
