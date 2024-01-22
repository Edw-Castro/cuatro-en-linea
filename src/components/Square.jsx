// el children => es para saber si hay que renderizar ⭐ o ⭕
// updateBoard => es para actualizar el tablero según donde se haga click
// index => es para saber cada cuadrado qué índice es
export const Square = ({ children, isSelected, updateBoard, rowIndex, colIndex }) => {
    const className = `square ${isSelected ? 'is-selected' : ''}`

    const hadnleClick = () => {
        updateBoard(rowIndex, colIndex)
    }
    return (
        <div onClick={hadnleClick} className={className} >
            {children}
        </div >
    )
}