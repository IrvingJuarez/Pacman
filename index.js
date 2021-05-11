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

        this.printGrid()
    }

    printGrid(){
        for(let i = 1; i < 22; i++){
            let currentRow = BOARD_GAME.childNodes[i]
            let currentArray = ROWS_ARRAY[i - 1]
            
            for(let j = 0; j < CELLS; j++){
                let currentCell = currentRow.childNodes[j]
                for(let comprobation of currentArray){
                    if(j + 1 === comprobation){
                        currentCell.style.backgroundColor = "#03091f"
                        currentCell.dataset.value = 1
                    }
                }
            }
        }

        const pacman = new Pacman()
    }
}

function startGame(){
    const newGame = new Game()
    START_BUTTON.style.display = "none"
}