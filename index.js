const START_BUTTON = document.getElementById("start-button")
const BOARD_GAME = document.getElementById("board-game")
const ROWS = 23
const CELLS = (window.innerWidth <= 509) ? 14 : 23

class Game{
    constructor(){
        this.grid()
    }

    grid(){
        for(let i = 0; i < ROWS; i++){
            let row = document.createElement("section")
            row.classList.add("row")
            BOARD_GAME.appendChild(row)

            for(let j = 0; j < CELLS; j++){
                let cell = document.createElement("div")
                cell.classList.add("cell")
                row.appendChild(cell)
            }
        }
    }
}

function startGame(){
    const newGame = new Game()
    START_BUTTON.style.display = "none"
}