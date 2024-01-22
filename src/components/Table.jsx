import { Square } from "./Square"

export const Table = ({ board, updateBoard }) => {
    return (
        <section className='game'  >
            {
                //recorriendo las filas
                board.map((row, rowIndex) => (
                    //recorriendo cada columna que se da por cada índice de fila
                    row.map((_, colIndex) => (
                        <Square key={rowIndex + colIndex} rowIndex={rowIndex} colIndex={colIndex} updateBoard={updateBoard} style={{ backgroundColor: "green" }}  >
                            {board[rowIndex][colIndex]}
                        </Square >
                    ))
                )
                )
            }
        </section>
    )
}
