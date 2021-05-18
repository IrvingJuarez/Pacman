const FIRST_VIEW = document.getElementById("firstView")
const BOARD_GAME = document.getElementById("board-game")
const BOARD_GAME_STYLES = document.getElementById("boardGameStyles")
const ROWS = 23
const CELLS = (window.innerWidth <= 509) ? 14 : 23
var pacman

class Game{
    constructor(){
        this.jailBlocks = []
        this.grid()
        this.jail()
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

        if(window.innerWidth <= 509){
            BOARD_GAME_STYLES.href = "./css/boardGame.css"
        }else{
            BOARD_GAME_STYLES.href = "./css/desktopBoardGame.css"
        }

        for(let i = 0; i < ROWS - 1; i++){
            let currentRow = BOARD_GAME.childNodes[i]
            let currentArray = ROWS_ARRAY[i]
            
            for(let j = 0; j < CELLS; j++){
                let currentCell = currentRow.childNodes[j]
                for(let comprobation of currentArray){
                    if(j + 1 === comprobation){
                        currentCell.style.backgroundColor = "#03091f"
                        currentCell.dataset.value = 1
                    }
                }

                if(currentCell.dataset.value != 1)
                    currentCell.classList.add("chocolate")
            }
        }
    }

    jail(){
        this.jailY = 10

        if(window.innerWidth <= 509){
            this.jailX = 5
            this.jailWidth = 4
        }else{
            this.jailX = 10
            this.jailWidth = 3
        }

        for(let k = 0; k < this.jailWidth; k++){
            this.jailBlocks.push(BOARD_GAME.childNodes[this.jailY].childNodes[this.jailX])
            this.jailBlocks.push(BOARD_GAME.childNodes[this.jailY + 1].childNodes[this.jailX])

            this.jailX++
        }

        this.jailBlocks.map(block => {
            block.dataset.value = 1
        })

        pacman = new Pacman()
        ghosts()
    }
}

function startGame(){
    const newGame = new Game()
    FIRST_VIEW.style.display = "none"
}