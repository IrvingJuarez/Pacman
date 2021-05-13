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
    }

    comprobation(code){
        let expectedPacman

        if(this.process === false){
            
            switch(code){
                case 37: //Left
                    if(this.x - 1 < 0 && this.y === yPortalAxis){
                        expectedPacman = BOARD_GAME.childNodes[this.y].childNodes[this.x - 1]
                        this.portal(code)
                    }else if(this.x - 1 < 0){
                        //Nothing
                    }else{
                        expectedPacman = BOARD_GAME.childNodes[this.y].childNodes[this.x - 1]
                        this.available(expectedPacman, code)
                    }
                break;
                case 38: //Up
                    if(this.y - 1 < 0){
                        //Nothing
                    }else{
                        expectedPacman = BOARD_GAME.childNodes[this.y - 1].childNodes[this.x]
                        this.available(expectedPacman, code)
                    }
                break;
                case 39: //Right

                    if(this.x + 1 > CELLS - 1 && this.y === yPortalAxis){
                        expectedPacman = BOARD_GAME.childNodes[this.y].childNodes[this.x + 1]
                        this.portal(code)
                    }else if(this.x + 1 > CELLS - 1){
                        //Nothing
                    }else{
                        expectedPacman = BOARD_GAME.childNodes[this.y].childNodes[this.x + 1]
                        this.available(expectedPacman, code)
                    }

                break;
                case 40: //Down
                    if(this.y + 1 > 21){
                        //Nothing
                    }else{
                        expectedPacman = BOARD_GAME.childNodes[this.y + 1].childNodes[this.x]
                        this.available(expectedPacman, code)
                    }
                break;
            }
        }
    }

    portal(dir){
        switch(dir){
            case 37: //Left
                this.x = CELLS - 1
                this.keyboardCode = dir
                this.portalClass = "portalLeft"
            break;
            case 39: //Right
                this.x = 0
                this.keyboardCode = dir
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
        if(expectedPosition === undefined){
            //There is nothing
        }else{
            if(expectedPosition.dataset.value == 1){
                //No available
            }else{
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
                this.leftwards()
            break;
            case 38: //Up
                currentClass = "pacmanUp"
                this.upwards()
            break;
            case 39: //Right
                currentClass = "pacmanRight"
                this.rightwards()
            break;
            case 40: //Down
                currentClass = "pacmanDown"
                this.downwards()
            break;
        }

        currentPacman.classList.add(currentClass)
    }

    leftwards(){
        timeMovement-=2

        if(timeMovement <= -20){
            timeMovement = 0
            this.x--
            this.changePosition()
            this.process = false
            this.comprobation(this.keyboardCode)
        }else{
            setTimeout(() => {
                currentPacman.style.transform = `translateX(${timeMovement}px)`
                this.leftwards()
            }, 30)
        }
    }

    rightwards(){
        timeMovement+=2

        if(timeMovement >= 20){
            timeMovement = 0
            this.x++
            this.changePosition()
            this.process = false
            this.comprobation(this.keyboardCode)
        }else{
            setTimeout(() => {
                currentPacman.style.transform = `translateX(${timeMovement}px)`
                this.rightwards()
            }, 30)
        }
    }

    upwards(){
        timeMovement-=2

        if(timeMovement <= -20){
            timeMovement = 0
            this.y--
            this.changePosition()
            this.process = false
            this.comprobation(this.keyboardCode)
        }else{
            setTimeout(() => {
                currentPacman.style.transform = `translateY(${timeMovement}px)`
                this.upwards()
            }, 30)
        }
    }

    downwards(){
        timeMovement += 2

        if(timeMovement >= 20){
            timeMovement = 0
            this.y++
            this.changePosition()
            this.process = false
            this.comprobation(this.keyboardCode)
        }else{
            setTimeout(() => {
                currentPacman.style.transform = `translateY(${timeMovement}px)`
                this.downwards()
            }, 30)
        }
    }

    changePosition(){
        currentContainer.removeChild(currentPacman)
        currentContainer = BOARD_GAME.childNodes[this.y].childNodes[this.x]
        currentPacman.classList.add("pacman")
        currentPacman.style.transform = "none"
        currentContainer.appendChild(currentPacman)
        currentPacman.classList.add(currentClass)
    }
}