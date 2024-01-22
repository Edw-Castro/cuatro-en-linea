import { useState } from 'react'
import { Square } from './components/Square.jsx';
import { WinnerModal } from './components/WinnerModal.jsx'
import { checkWinner, checkEndGame } from './logic/board.js'
import { TURNS } from './constants.js';
import { Table } from './components/Table.jsx';
import { resetGameStorage, saveGameToStorage } from './logic/storage/index.js';
import confetti from 'canvas-confetti';
import './App.css'

function App() {

  //se deja quí el array porque cuando el usuario haga click en una
  //de las casillas se necesita que el tablero (array) se re-renderice
  //según se haya colocado ⭐ o ⭕
  const [board, setBoard] = useState(() => {



    //se coloca aquí la lectura del estado porque es más rápido y solo
    //se hace una vez, no se hace cada vez que se renderiza el componente
    //lo cual sucedería si se coloca directamente en el curpo de App
    const boardFromStorage = window.localStorage.getItem('board')
    if (boardFromStorage) return JSON.parse(boardFromStorage)
    return Array.from({ length: 4 }, () => Array.from({ length: 4 }))
  }
  )

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.x
  })
  const [winner, setWinner] = useState(null)

  const resetGame = () => {
    setBoard(Array.from({ length: 4 }, () => Array.from({ length: 4 })))
    setTurn(TURNS.x)
    setWinner(null)

    resetGameStorage()
  }

  const updateBoard = (rowIndex, colIndex) => {


    //Aquí lo que se hace es decir si ya hay algo en el índice, no lo cambies
    if (board[rowIndex][colIndex] || winner) return


    //se usa el spread operator porque no se deben mutar las props ni los
    //estados, es decir que no se debe cambiar de inmediato el valor que
    //hay en el state, sino que se puede hacer una copia y luego modificar

    //se usa el map para copiar cada fila porque es un array bidimensional
    //entonces si se llega a usar [...board] en ligar del map pasa que
    //la copia se hace superficial a las filas externas (rows), pero a las
    //internas (columns) no se llegan a copiar
    const newBoard = board.map(row => [...row]);

    //se recibe y se usa el index para saber en qué casilla se le dio click
    // y allí se le coloca el turno o sea ⭐ o ⭕
    newBoard[rowIndex][colIndex] = turn


    setBoard(newBoard)

    //aquí lo que dice es si el turno actual es "X" entonces cambia el
    //turno a "O" y viceversa
    const newTurn = turn === TURNS.x ? TURNS.o : TURNS.x

    //ahora se setea el nuevo turno
    setTurn(newTurn)

    //guardando partida en el localStorage
    saveGameToStorage({ board: newBoard, turn })

    const newWinner = checkWinner(newBoard)

    if (newWinner) {
      confetti()
      setWinner(newWinner)

    } else if (checkEndGame(newBoard)) {
      setWinner(false) //empate
    }
  }



  return (
    <>
      <main className="board ">
        <h1>CUATRO EN RAYA</h1>
        <button onClick={resetGame}>Reset del juego</button>

        <Table board={board} updateBoard={updateBoard} />
        <section className="turn">
          <Square isSelected={turn === TURNS.x}>
            {TURNS.x}
          </Square>
          <Square isSelected={turn === TURNS.o}>
            {TURNS.o}
          </Square>
        </section>
        <WinnerModal resetGame={resetGame} winner={winner} />

      </main >
    </>
  )
}

export default App
