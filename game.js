// AI Game Simulator - Tic-Tac-Toe with Local AI + Ollama Integration

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = false;
let player1Type = 'human';
let player2Type = 'ai';
let gameLog = [];
let isPaused = false;
let simulationMode = false;
let useAPI = true; // Default to using API when available

const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });
    
    // Default to API, will auto-fallback if it fails
    useAPI = true;
});

function startGame() {
    const model = document.getElementById('aiModel').value.trim();
    if (!model) {
        alert('⚠️ Please enter an AI model name!');
        document.getElementById('aiModel').focus();
        return;
    }
    
    player1Type = document.getElementById('player1Type').value;
    useAPI = model.toLowerCase() !== 'local';
    simulationMode = false;
    resetGame();
    document.getElementById('gamePanel').style.display = 'block';
    document.getElementById('statusText').textContent = 
        player1Type === 'human' ? 'Your turn! (X)' : 'AI thinking... (X)';
    
    // Hide Local AI status initially
    document.getElementById('aiStatus').classList.add('hidden');
    
    if (player1Type === 'ai') {
        setTimeout(() => makeAIMove('X'), 500);
    }
}

function simulateGame() {
    const model = document.getElementById('aiModel').value.trim();
    if (!model) {
        alert('⚠️ Please enter an AI model name!');
        document.getElementById('aiModel').focus();
        return;
    }
    
    player1Type = 'ai';
    useAPI = model.toLowerCase() !== 'local';
    simulationMode = true;
    resetGame();
    document.getElementById('gamePanel').style.display = 'block';
    document.getElementById('statusText').textContent = 'AI vs AI Simulation!';
    
    // Hide Local AI status initially
    document.getElementById('aiStatus').classList.add('hidden');
    
    // AI vs AI - Auto play
    setTimeout(() => makeAIMove('X'), 500);
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    isPaused = false;
    gameLog = [];
    
    document.querySelectorAll('.cell').forEach(cell => {
        cell.textContent = '';
        cell.className = 'cell';
    });
    
    updateTurn();
    document.getElementById('gameLog').innerHTML = '';
    document.getElementById('pauseBtn').textContent = '⏸️ Pause';
}

function togglePause() {
    isPaused = !isPaused;
    document.getElementById('pauseBtn').textContent = isPaused ? '▶️ Resume' : '⏸️ Pause';
}

function allowFallback() {
    const checkbox = document.getElementById('allowFallback');
    return checkbox ? checkbox.checked : true;
}

function handleCellClick(e) {
    const index = parseInt(e.target.dataset.index);
    
    if (!gameActive || board[index] !== '' || isPaused) return;
    
    // Check if it's human's turn
    if (currentPlayer === 'X' && player1Type !== 'human') return;
    if (currentPlayer === 'O' && player2Type !== 'human') return;
    
    makeMove(index, currentPlayer);
}

function makeMove(index, player) {
    board[index] = player;
    const cell = document.querySelector(`.cell[data-index="${index}"]`);
    cell.textContent = player;
    cell.classList.add('taken', player.toLowerCase());
    
    logMove(player, index);
    
    if (checkWinner()) {
        endGame(player);
        return;
    }
    
    if (checkDraw()) {
        endGame('draw');
        return;
    }
    
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateTurn();
    
    // Trigger AI if it's AI's turn
    if (gameActive && !isPaused) {
        if ((currentPlayer === 'X' && player1Type === 'ai') ||
            (currentPlayer === 'O' && player2Type === 'ai')) {
            setTimeout(() => makeAIMove(currentPlayer), 800);
        }
    }
}

async function makeAIMove(player) {
    if (!gameActive || isPaused) return;
    
    document.getElementById('statusText').textContent = `AI ${player} is thinking...`;
    
    let move = null;
    
    // Try API first if available
    if (useAPI) {
        try {
            move = await queryOllama(player);
        } catch (error) {
            logMessage(`API failed, using local AI`);
        }
    }
    
    // Fallback to local AI (if allowed)
    if ((move === null || board[move] !== '') && allowFallback()) {
        move = getLocalAIMove(player);
        // Show Local AI status notification
        const statusDiv = document.getElementById('aiStatus');
        if (statusDiv) {
            statusDiv.classList.remove('hidden');
            statusDiv.querySelector('.status-text').textContent = 
                `Player ${player} using Local AI (API unavailable or failed)`;
        }
        logMessage(`Player ${player} switched to Local AI`);
    }
    
    if (move !== null && board[move] === '') {
        makeMove(move, player);
    } else if (allowFallback()) {
        // Ultimate fallback: random move (if allowed)
        const available = board.map((c, i) => c === '' ? i : null).filter(i => i !== null);
        if (available.length > 0) {
            const randomMove = available[Math.floor(Math.random() * available.length)];
            logMessage(`AI ${player} makes random move`);
            makeMove(randomMove, player);
        }
    } else {
        // No fallback allowed - show error but don't pause
        document.getElementById('statusText').textContent = 
            `❌ Player ${player} failed (fallback disabled) - waiting...`;
        logMessage(`Player ${player} failed - fallback disabled, waiting for valid move`);
        // Don't pause - let user retry or game continue
    }
}

// Local AI - Smart without API
function getLocalAIMove(player) {
    const opponent = player === 'X' ? 'O' : 'X';
    
    // 1. Check if AI can win
    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        const cells = [board[a], board[b], board[c]];
        const playerCount = cells.filter(c => c === player).length;
        const emptyCount = cells.filter(c => c === '').length;
        
        if (playerCount === 2 && emptyCount === 1) {
            const move = combo[cells.indexOf('')];
            logMessage(`AI ${player} goes for the win!`);
            return move;
        }
    }
    
    // 2. Block opponent from winning
    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        const cells = [board[a], board[b], board[c]];
        const opponentCount = cells.filter(c => c === opponent).length;
        const emptyCount = cells.filter(c => c === '').length;
        
        if (opponentCount === 2 && emptyCount === 1) {
            const move = combo[cells.indexOf('')];
            logMessage(`AI ${player} blocks opponent!`);
            return move;
        }
    }
    
    // 3. Take center if available
    if (board[4] === '') {
        logMessage(`AI ${player} takes center`);
        return 4;
    }
    
    // 4. Take corners
    const corners = [0, 2, 6, 8];
    const availableCorners = corners.filter(i => board[i] === '');
    if (availableCorners.length > 0) {
        const move = availableCorners[Math.floor(Math.random() * availableCorners.length)];
        logMessage(`AI ${player} takes corner`);
        return move;
    }
    
    // 5. Take any available
    const available = board.map((c, i) => c === '' ? i : null).filter(i => i !== null);
    if (available.length > 0) {
        const move = available[Math.floor(Math.random() * available.length)];
        return move;
    }
    
    return null;
}

// Try to use Ollama API (only works locally, not via https)
async function queryOllama(player) {
    const ollamaUrl = document.getElementById('ollamaUrl').value;
    const model = document.getElementById('aiModel').value;
    const maxRetries = 3;
    const previousAttempts = [];
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        // Build prompt with feedback from previous attempts
        let prompt = buildOllamaPrompt(player, previousAttempts);
        
        try {
            const response = await fetch(`${ollamaUrl}/api/generate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: model,
                    prompt: prompt,
                    stream: false
                })
            });
            
            const data = await response.json();
            const text = data.response.trim();
            
            // Extract number from response
            const match = text.match(/[0-8]/);
            if (match) {
                const move = parseInt(match[0]);
                if (board[move] === '') {
                    logMessage(`AI ${player} uses Ollama API${attempt > 1 ? ` (attempt ${attempt})` : ''}`);
                    return move;
                } else {
                    // Position already taken - record for next attempt
                    const error = `Position ${move} is ALREADY TAKEN`;
                    previousAttempts.push({ move, error, text });
                    logMessage(`AI ${player} picked taken position ${move} (attempt ${attempt}/${maxRetries})`);
                }
            } else {
                // No valid number found
                const error = `Invalid response format`;
                previousAttempts.push({ move: null, error, text });
                logMessage(`AI ${player} invalid format (attempt ${attempt}/${maxRetries})`);
            }
            
        } catch (error) {
            const errorMsg = error.message;
            previousAttempts.push({ move: null, error: errorMsg, text: null });
            logMessage(`AI ${player} API error (attempt ${attempt}/${maxRetries}): ${errorMsg}`);
        }
        
        // Wait before retry
        if (attempt < maxRetries) {
            await new Promise(resolve => setTimeout(resolve, 500));
        }
    }
    
    // All retries exhausted
    throw new Error(`Failed after ${maxRetries} attempts`);
}

function buildOllamaPrompt(player, previousAttempts) {
    const boardStr = formatBoardForAI();
    const availableMoves = getAvailableMoves();
    
    let prompt = `You are playing Tic-Tac-Toe as player ${player}. 
Current board (positions 0-8):
${boardStr}

You are ${player}. Choose the best move (0-8).
Available positions: ${availableMoves.join(', ')}
`;
    
    // Add feedback from previous failed attempts
    if (previousAttempts.length > 0) {
        prompt += `\n\n⚠️ PREVIOUS ATTEMPTS FAILED:\n`;
        previousAttempts.forEach((attempt, i) => {
            if (attempt.move !== null) {
                prompt += `Attempt ${i + 1}: Chose position ${attempt.move} - ${attempt.error}\n`;
            } else if (attempt.text) {
                prompt += `Attempt ${i + 1}: Response "${attempt.text}" - ${attempt.error}\n`;
            } else {
                prompt += `Attempt ${i + 1}: ${attempt.error}\n`;
            }
        });
        prompt += `\nPlease choose a DIFFERENT, VALID position from: ${availableMoves.join(', ')}\n`;
    }
    
    prompt += `\nRespond with ONLY a number 0-8 representing your move.

Your move:`;
    
    return prompt;
}

function formatBoardForAI() {
    let str = '';
    for (let i = 0; i < 9; i += 3) {
        const row = board.slice(i, i + 3).map(c => c || '-').join(' | ');
        str += `${i} | ${i+1} | ${i+2}  →  ${row}\n`;
    }
    return str;
}

function getAvailableMoves() {
    return board.map((c, i) => c === '' ? i : null).filter(i => i !== null);
}

function checkWinner() {
    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            combo.forEach(i => {
                document.querySelector(`.cell[data-index="${i}"]`).classList.add('winner');
            });
            return board[a];
        }
    }
    return null;
}

function checkDraw() {
    return board.every(cell => cell !== '');
}

function endGame(winner) {
    gameActive = false;
    
    if (winner === 'draw') {
        document.getElementById('statusText').textContent = '🤝 It\'s a draw!';
        logMessage('Game ended in a draw');
    } else {
        document.getElementById('statusText').textContent = `🎉 Player ${winner} wins!`;
        logMessage(`Player ${winner} wins!`);
    }
    
    // Auto-restart simulation
    if (simulationMode) {
        setTimeout(() => {
            logMessage('--- Starting new simulation game ---');
            resetGame();
            setTimeout(() => makeAIMove('X'), 1000);
        }, 3000);
    }
}

function updateTurn() {
    document.getElementById('currentTurn').textContent = currentPlayer;
    
    if (gameActive) {
        if (currentPlayer === 'X' && player1Type === 'human') {
            document.getElementById('statusText').textContent = 'Your turn! (X)';
        } else if (currentPlayer === 'O' && player2Type === 'ai') {
            document.getElementById('statusText').textContent = 'AI thinking... (O)';
        } else {
            document.getElementById('statusText').textContent = `Player ${currentPlayer}'s turn`;
        }
    }
}

function logMove(player, index) {
    const row = Math.floor(index / 3);
    const col = index % 3;
    const moveType = (player === 'X' && player1Type === 'ai') || 
                     (player === 'O' && player2Type === 'ai') ? 'ai-move' : 'human-move';
    logMessage(`${player} plays at ${index} [${row},${col}]`, moveType);
}

function logMessage(msg, className = '') {
    gameLog.push(msg);
    const logDiv = document.getElementById('gameLog');
    const entry = document.createElement('div');
    entry.className = `log-entry ${className}`;
    entry.textContent = `[${gameLog.length}] ${msg}`;
    logDiv.appendChild(entry);
    logDiv.scrollTop = logDiv.scrollHeight;
}
