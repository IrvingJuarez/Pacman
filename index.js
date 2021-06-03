var newGame
const TABLE = document.getElementById("table")
const FIRST_VIEW = document.getElementById("firstView")
const BOARD_GAME = document.getElementById("board-game")
const BOARD_GAME_STYLES = document.getElementById("boardGameStyles")
const ROWS = 23
const CELLS = (window.innerWidth <= 509) ? 14 : 23
const SCORE_DIV_POSITION = 3
const LEVEL_DIV_POSITION = 7
var pacman, currentClass, htmlScoreContainer, htmlLevelContainer

class Game{
    constructor(){
        this.level = 1
        this.lives = 2
        this.score = 0
        this.winScore = (window.innerWidth <= 509) ? 194 : 308
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

        this.printStatus()
        this.printGrid()
    }

    printStatus(){
        for(let p = 0; p < this.lives; p++){
            BOARD_GAME.childNodes[ROWS - 1].childNodes[p].classList.add("pacmanLive")
        }

        let divScore = document.createElement("div")
        divScore.classList.add("score")
        BOARD_GAME.childNodes[ROWS - 1].childNodes[CELLS - SCORE_DIV_POSITION].appendChild(divScore)

        let htmlScore = document.createElement("span")
        htmlScore.innerHTML = this.score
        BOARD_GAME.childNodes[ROWS - 1].childNodes[CELLS - SCORE_DIV_POSITION].childNodes[0].appendChild(htmlScore)
        htmlScoreContainer = BOARD_GAME.childNodes[ROWS - 1].childNodes[CELLS - SCORE_DIV_POSITION].childNodes[0].childNodes[0]

        let divLevel = document.createElement("div")
        divLevel.classList.add("level")
        BOARD_GAME.childNodes[ROWS - 1].childNodes[CELLS - LEVEL_DIV_POSITION].appendChild(divLevel)

        let htmlLevel = document.createElement("span")
        htmlLevel.innerHTML = this.level
        BOARD_GAME.childNodes[ROWS - 1].childNodes[CELLS - LEVEL_DIV_POSITION].childNodes[0].appendChild(htmlLevel)
        htmlLevelContainer = BOARD_GAME.childNodes[ROWS - 1].childNodes[CELLS - LEVEL_DIV_POSITION].childNodes[0].childNodes[0]
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

    win(){
        this.pacmanStop = true
        this.score = 0
        this.level++
        if(this.level >= 4){
            console.log(`Congrats, you won`)
        }else{
            BOARD_GAME.childNodes[ROWS - 1].childNodes[newGame.lives].classList.add("pacmanLive")
            this.lives++
            htmlLevelContainer.innerHTML = this.level
            ghostsArray.forEach(item => {
                item.ghostContainer = BOARD_GAME.childNodes[item.y].childNodes[item.x]
                item.ghostContainer.removeChild(item.ghostContainer.childNodes[0])
            })
            
            setTimeout(() => {
                ghostsArray = []
                currentContainer.removeChild(currentPacman)
                this.pacmanStop = false
                this.refillGrid()
                pacman = new Pacman()
                ghosts()
            }, 1000)
        }
    }

    gameOver(){
        this.pacmanStop = true
        currentContainer.removeChild(currentPacman)
        ghostsArray.forEach(item => {
            item.ghostContainer.childNodes[0].style.zIndex = 0
        })

        setTimeout(() => {
            this.lives--

            if(this.lives >= 0){
                currentContainer.appendChild(currentPacman)
                ghostsArray.forEach(item => {
                    item.ghostContainer.removeChild(item.ghostContainer.childNodes[0])
                })
                newGame.pacmanStop = false
                BOARD_GAME.childNodes[ROWS - 1].childNodes[newGame.lives].classList.remove("pacmanLive")
                pacman.oldKeyboardCode = 37
                pacman.process = false
                pacman.y = initialY
                pacman.x = initialX
                ghostsArray = []
                ghosts()
                pacman.changePosition()
                pacman.comprobation(pacman.oldKeyboardCode)
            }else{
                location.reload()
            }
        }, 3000)
    }

    refillGrid(){
        for(let i = 0; i < ROWS - 1; i++){
            let currentRow = BOARD_GAME.childNodes[i]
            let currentArray = ROWS_ARRAY[i]
            
            for(let j = 0; j < CELLS; j++){
                let currentCell = currentRow.childNodes[j]
                if(currentCell.dataset.value != 1)
                    currentCell.classList.add("chocolate")
            }
        }
    }
}

function startGame(){
    newGame = new Game()
    FIRST_VIEW.style.display = "none"
}