const TABLE = document.getElementById("table")
var initialX = (window.innerWidth <= 509) ? 7 : 11
var initialY = 12
var yPortalAxis = (window.innerWidth <= 509) ? 12 : 11
var currentPacman, currentClass, currentContainer;
var timeMovement = 0;

class Pacman{
    constructor(){
        currentClass = "pacmanLeft"
        this.x = initialX
        this.y = initialY
        this.process = false

        this.display()
        this.controls()
    }

    display(){
        currentContainer = BOARD_GAME.childNodes[this.y].childNodes[this.x]
        currentPacman = document.createElement("div")
        currentPacman.classList.add("pacman")
        currentContainer.appendChild(currentPacman)
        currentPacman.classList.add(currentClass)
    }

    controls(){
        document.addEventListener("keydown", evt => {
            this.keyboardCode = evt.keyCode
            this.comprobation(this.keyboardCode)
        })

        TABLE.addEventListener("touchstart", evt => {
            this.firstXTouch = evt.touches[0].screenX
            this.firstYTouch = evt.touches[0].screenY
        })

        TABLE.addEventListener("touchend", evt => {
            this.lastXTouch = evt.changedTouches[0].screenX
            this.lastYTouch = evt.changedTouches[0].screenY

            this.touchDirection()
        })
    }

    touchDirection(){
        let x, y, xDirection, yDirection
        if(this.firstXTouch > this.lastXTouch){
            x = this.firstXTouch - this.lastXTouch //Left
            xDirection = 37 //Left
        }else{
            x = this.lastXTouch - this.firstXTouch //Right
            xDirection = 39 //Right
        }

        if(this.firstYTouch < this.lastYTouch){
            y = this.lastYTouch - this.firstYTouch //Down
            yDirection = 40 //Down
        }else{
            y = this.firstYTouch - this.lastYTouch //Up
            yDirection = 38 //Up
        }

        (x > y) ? this.keyboardCode = xDirection : this.keyboardCode = yDirection

        this.comprobation(this.keyboardCode)
    }

    comprobation(code){
        let expectedPacman

        if(this.process === false){

            switch(code){
                case 37: //Left
                    if(this.x - 1 < 0 && this.y === yPortalAxis){
                        expectedPacman = BOARD_GAME.childNodes[this.y].childNodes[this.x - 1]
                        this.portal(code)
                    }else if(this.x - 1 >= 0){
                        expectedPacman = BOARD_GAME.childNodes[this.y].childNodes[this.x - 1]
                        this.available(expectedPacman, code)
                    }
                break;
                case 38: //Up
                    if(this.y - 1 >= 0){
                        expectedPacman = BOARD_GAME.childNodes[this.y - 1].childNodes[this.x]
                        this.available(expectedPacman, code)
                    }
                break;
                case 39: //Right
                    if(this.x + 1 > CELLS - 1 && this.y === yPortalAxis){
                        expectedPacman = BOARD_GAME.childNodes[this.y].childNodes[this.x + 1]
                        this.portal(code)
                    }else if(this.x + 1 <= CELLS - 1){
                        expectedPacman = BOARD_GAME.childNodes[this.y].childNodes[this.x + 1]
                        this.available(expectedPacman, code)
                    }
                break;
                case 40: //Down
                    if(this.y + 1 <= 21){
                        expectedPacman = BOARD_GAME.childNodes[this.y + 1].childNodes[this.x]
                        this.available(expectedPacman, code)
                    }
                break;
            }
        }
    }

    portal(dir){
        this.keyboardCode = dir

        switch(dir){
            case 37: //Left
                this.x = CELLS - 1
                this.portalClass = "portalLeft"
            break;
            case 39: //Right
                this.x = 0
                this.portalClass = "portalRight"
            break;
        }

        BOARD_GAME.classList.add(this.portalClass)
        this.changePosition()
        this.comprobation(this.keyboardCode)

        setTimeout(() => {
            BOARD_GAME.classList.remove(this.portalClass)
        }, 200)
    }

    available(expectedPosition, direction){
        if(expectedPosition != undefined){
            if(expectedPosition.dataset.value != 1){
                this.process = true
                this.move(direction)
            }
        }
    }

    move(direction){
        currentPacman.classList.remove(currentClass)

        switch(direction){
            case 37: //Left
                currentClass = "pacmanLeft"
                timeMovement -= 2;
                (timeMovement <= -20) ? this.stopMovement("X", false) : this.movementEffect(direction, "X")
            break;
            case 38: //Up
                currentClass = "pacmanUp"
                timeMovement -= 2;
                (timeMovement <= -20) ? this.stopMovement("Y", false) : this.movementEffect(direction, "Y")
                break;
                case 39: //Right
                currentClass = "pacmanRight"
                timeMovement += 2;
                (timeMovement >= 20) ? this.stopMovement("X", true) : this.movementEffect(direction, "X")
            break;
            case 40: //Down
                currentClass = "pacmanDown"
                timeMovement += 2;
                (timeMovement >= 20) ? this.stopMovement("Y", true) : this.movementEffect(direction, "Y")
            break;
        }

        currentPacman.classList.add(currentClass)
    }

    movementEffect(direction, axis){
        setTimeout(() => {
            currentPacman.style.transform = `translate${axis}(${timeMovement}px)`
            this.move(direction)
        }, 30)
    }

    stopMovement(axis, position){
        timeMovement = 0
        if(axis === "X"){
            (position) ? this.x++ : this.x--
        }else{
            (position) ? this.y++ : this.y--
        }
        this.changePosition()
        this.process = false
        this.comprobation(this.keyboardCode)
    }

    changePosition(){
        currentContainer.removeChild(currentPacman)
        currentContainer = BOARD_GAME.childNodes[this.y].childNodes[this.x]
        currentPacman.classList.add("pacman")
        currentPacman.style.transform = "none"
        currentContainer.appendChild(currentPacman)
        currentPacman.classList.add(currentClass)

        ghost1.expectedY = this.y
        ghost1.expectedX = this.x

        this.awardsEaten(currentContainer)
    }

    awardsEaten(){
        if(currentContainer.classList.contains("chocolate")){
            currentContainer.classList.remove("chocolate")
            newGame.score++
            htmlScoreContainer.innerHTML = newGame.score
        }
    }
}