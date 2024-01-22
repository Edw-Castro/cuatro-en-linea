export function checkWinner(newBoard) {
    const checkLine = (line) => line.join('').match(/(⭐{4}|⭕{4})/);

    // Verificar filas y columnas
    for (let i = 0; i < 4; i++) {
        const row = newBoard[i];
        const col = newBoard.map(col => col[i]);

        const rowWinner = checkLine(row);
        const colWinner = checkLine(col);

        if (rowWinner) return rowWinner[0][0];
        if (colWinner) return colWinner[0][0];
    }

    // Verificar diagonales
    const mainDiagonal = newBoard.map((row, i) => row[i]);
    const secondaryDiagonal = newBoard.map((row, i) => row[newBoard.length - 1 - i]);

    const mainDiagonalWinner = checkLine(mainDiagonal);
    const secondaryDiagonalWinner = checkLine(secondaryDiagonal);

    if (mainDiagonalWinner) return mainDiagonalWinner[0][0];
    if (secondaryDiagonalWinner) return secondaryDiagonalWinner[0][0];

    return null;
}

export const checkEndGame = (newBoard) => {

    // Recorre cada fila y columna para verificar si todas las casillas están llenas
    for (let i = 0; i < newBoard.length; i++) {
        for (let j = 0; j < newBoard[i].length; j++) {
            if (!newBoard[i][j]) {
                // Si encuentra una casilla vacía, el juego aún no ha terminado
                return false;
            }
        }
    }

    // Si no se encontraron casillas vacías, el juego ha terminado
    return true;
};