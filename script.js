const board = document.getElementById('board');
const cells = [];
let currentPlayer = 'black';
let gameOver = false;

// 创建棋盘格子
for (let i = 0; i < 15; i++) {
    for (let j = 0; j < 15; j++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.row = i;
        cell.dataset.col = j;
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
        cells.push(cell);
    }
}

// 重置游戏
const resetBtn = document.getElementById('reset');
resetBtn.addEventListener('click', resetGame);

// 处理单元格点击事件
function handleCellClick(event) {
    if (gameOver) return;
    const cell = event.target;
    if (cell.classList.contains('black') || cell.classList.contains('white')) return;
    cell.classList.add(currentPlayer);
    checkWin(cell.dataset.row, cell.dataset.col);
    currentPlayer = currentPlayer === 'black'? 'white' : 'black';
}

// 检查是否有玩家获胜
function checkWin(row, col) {
    const directions = [
        [1, 0], [0, 1], [1, 1], [1, -1]
    ];
    for (const [dx, dy] of directions) {
        let count = 1;
        for (let i = 1; i < 5; i++) {
            const newRow = row + dx * i;
            const newCol = col + dy * i;
            if (newRow >= 0 && newRow < 15 && newCol >= 0 && newCol < 15) {
                const cell = cells[newRow * 15 + newCol];
                if (cell.classList.contains(currentPlayer)) {
                    count++;
                } else {
                    break;
                }
            } else {
                break;
            }
        }
        for (let i = 1; i < 5; i++) {
            const newRow = row - dx * i;
            const newCol = col - dy * i;
            if (newRow >= 0 && newRow < 15 && newCol >= 0 && newCol < 15) {
                const cell = cells[newRow * 15 + newCol];
                if (cell.classList.contains(currentPlayer)) {
                    count++;
                } else {
                    break;
                }
            } else {
                break;
            }
        }
        if (count >= 5) {
            gameOver = true;
            alert(`玩家 ${currentPlayer === 'black'? '黑' : '白'} 获胜！`);
        }
    }
}

// 重置游戏
function resetGame() {
    cells.forEach(cell => {
        cell.classList.remove('black', 'white');
    });
    currentPlayer = 'black';
    gameOver = false;
}
