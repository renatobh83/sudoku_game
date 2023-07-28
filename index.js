const sudokuBoard = document.getElementById('sudokuBoard');
const size = 9;
const boxSize = 3;
let board = [];


// Estrutura do tabuleiro
function createBoard() {
  for (let i = 0; i < size; i++) {
    const row = [];
    for (let j = 0; j < size; j++) {
      row.push(0);
    }
    board.push(row);
  }
}

// Gerar numeros iniciais

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function fillValues() {
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (getRandomNumber(1, 4) === 1) {
        const randomNumber = getRandomNumber(1, 9);
        if (isValidMove(i, j, randomNumber)) {
          board[i][j] = randomNumber;
        }
      }
    }
  }
}


// Verificar validade de uma jogada
function isValidMove(row, col, num) {
  // Verificar na linha
  for (let i = 0; i < size; i++) {
    if (board[row][i] === num) {
      return false;
    }
  }

  // Verificar na coluna
  for (let i = 0; i < size; i++) {
    if (board[i][col] === num) {
      return false;
    }
  }

  // Verificar no bloco 3x3
  const startRow = row - (row % boxSize);
  const startCol = col - (col % boxSize);
  for (let i = 0; i < boxSize; i++) {
    for (let j = 0; j < boxSize; j++) {
      if (board[i + startRow][j + startCol] === num) {
        return false;
      }
    }
  }

  return true;
}


// Mostrar o tabuleiro
function renderBoard() {
  sudokuBoard.innerHTML = '';
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const cell = document.createElement('input');
      cell.type = 'text';
      cell.className = 'cell';
      cell.value = board[i][j] === 0 ? '' : board[i][j];
      cell.addEventListener('input', () => {
        // Aqui você pode adicionar a lógica para verificar se o input é válido e atualizar o tabuleiro
      });
      sudokuBoard.appendChild(cell);
    }
    sudokuBoard.appendChild(document.createElement('br'));
  }
}

// Agora, vamos chamar as funções para criar e preencher o tabuleiro
createBoard();
fillValues();
renderBoard();



const hintBox = document.getElementById('hintBox');
const hintMessage = document.getElementById('hintMessage');

function generateHint() {
  const emptyCells = [];
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (board[i][j] === 0) {
        emptyCells.push({ row: i, col: j });
      }
    }
  }

  if (emptyCells.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const randomCell = emptyCells[randomIndex];
    const randomNumber = getRandomNumber(1, 9);
    if (isValidMove(randomCell.row, randomCell.col, randomNumber)) {
      hintMessage.textContent = `Tente colocar o número ${randomNumber} na célula (${randomCell.row + 1}, ${randomCell.col + 1})`;
      hintBox.style.display = 'block';
    } else {
      // Se não houver uma dica válida, tente gerar outra
      generateHint();
    }
  }
}

// Chamamos a função para gerar uma dica inicial assim que o tabuleiro é renderizado
generateHint();