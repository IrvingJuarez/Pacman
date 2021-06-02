var initialX = (window.innerWidth <= 509) ? 7 : 11
var initialY = 12
var yPortalAxis = (window.innerWidth <= 509) ? 12 : 11
var currentPacman, currentContainer;
var timeMovement = 0;

class Pacman{
    constructor(){
        this.oldKeyboardCode = 37
        currentClass = "pacmanLeft"
        this.x = initialX
        this.y = initialY
        this.process = false
        
        this.display()
        this.comprobation(this.oldKeyboardCode);
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
            this.oldKeyboardCode = evt.keyCode
            this.comprobation(this.oldKeyboardCode)
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

        (x > y) ? this.oldKeyboardCode = xDirection : this.oldKeyboardCode = yDirection

        this.comprobation(this.oldKeyboardCode)
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
        ghostsArray.forEach(ghost => {
            if(ghost.towardsX === "Right"){
                ghost.towardsX = "Left"
            }else if(ghost.towardsX === "Left"){
                ghost.towardsX = "Right"
            }
        })

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
            if(expectedPosition.dataset.value == 1){
                if(this.keyboardCode != this.oldKeyboardCode){
                    this.process = true
                    this.move(this.keyboardCode)
                }
            }else{
                this.keyboardCode = this.oldKeyboardCode
                this.process = true
                this.move(direction)
            }
        }
    }

    move(direction){
        currentPacman.classList.remove(currentClass)

        switch(direction){
            case 37: //Left
                if(this.x - 1 >= 0){
                    if(BOARD_GAME.childNodes[this.y].childNodes[this.x - 1].dataset.value == 1){
                        this.process = false
                    }else{
                        currentClass = "pacmanLeft"
                        timeMovement -= 2;
                        (timeMovement <= -20) ? this.stopMovement("X", false) : this.movementEffect(direction, "X")
                    }
                }else{
                    this.process = false
                }
            break;
            case 38: //Up
                if(this.y - 1 >= 0){
                    if(BOARD_GAME.childNodes[this.y - 1].childNodes[this.x].dataset.value == 1){
                        this.process = false
                    }else{
                        currentClass = "pacmanUp"
                        timeMovement -= 2;
                        (timeMovement <= -20) ? this.stopMovement("Y", false) : this.movementEffect(direction, "Y")
                    }
                }else{
                    this.process = false
                }
            break;
            case 39: //Right
                if(this.x + 1 <= CELLS - 1){
                    if(BOARD_GAME.childNodes[this.y].childNodes[this.x + 1].dataset.value == 1){
                        this.process = false    
                    }else{
                        currentClass = "pacmanRight"
                        timeMovement += 2;
                        (timeMovement >= 20) ? this.stopMovement("X", true) : this.movementEffect(direction, "X")
                    }
                }else{
                    this.process = false
                }
            break;
            case 40: //Down
                if(this.y + 1 <= 21){
                    if(BOARD_GAME.childNodes[this.y + 1].childNodes[this.x].dataset.value == 1){
                        this.process = false    
                    }else{
                        currentClass = "pacmanDown"
                        timeMovement += 2;
                        (timeMovement >= 20) ? this.stopMovement("Y", true) : this.movementEffect(direction, "Y")
                    }
                }else{
                    this.process = false
                }
            break;
        }

        currentPacman.classList.add(currentClass)
    }

    movementEffect(direction, axis){
        setTimeout(() => {
            currentPacman.style.transform = `translate${axis}(${timeMovement}px)`
            if(!newGame.pacmanStop)
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
        this.changePosition();
        (newGame.pacmanStop) ? this.process = true : this.process = false
        this.comprobation(this.oldKeyboardCode)
    }

    changePosition(){
        currentContainer.removeChild(currentPacman)
        currentContainer = BOARD_GAME.childNodes[this.y].childNodes[this.x]
        currentPacman.classList.add("pacman")
        currentPacman.style.transform = "none"
        currentContainer.appendChild(currentPacman)
        currentPacman.classList.add(currentClass)

        this.awardsEaten(currentContainer)
    }

    awardsEaten(){
        if(currentContainer.classList.contains("chocolate")){
            currentContainer.classList.remove("chocolate")
            newGame.score++
            htmlScoreContainer.innerHTML = newGame.score

            if(newGame.score === newGame.winScore){
                newGame.win()
            }
        }
    }
}