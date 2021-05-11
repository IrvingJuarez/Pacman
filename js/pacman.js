var initialX = 7;
var initialY = 12;
var currentPacman, currentClass, currentContainer;
var timeMovement = 0;

class Pacman{
    constructor(){
        currentClass = "pacmanLeft"
        this.x = initialX
        this.y = initialY
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

            switch(evt.keyCode){
                case 37: //Left
                    this.comprobation(evt.keyCode)
                break;
                case 38: //Up
                    this.comprobation(evt.keyCode)
                break;
                case 39: //Right
                    this.comprobation(evt.keyCode)
                break;
                case 40: //Down
                    this.comprobation(evt.keyCode)
                break;
            }
        })
    }

    comprobation(code){
        let expectedPacman

        switch(code){
            case 37: //Left
                expectedPacman = BOARD_GAME.childNodes[this.y].childNodes[this.x - 1]
                this.available(expectedPacman, code)
            break;
            case 38: //Up
                expectedPacman = BOARD_GAME.childNodes[this.y - 1].childNodes[this.x]
                this.available(expectedPacman, code)
            break;
            case 39: //Right
                expectedPacman = BOARD_GAME.childNodes[this.y].childNodes[this.x + 1]
                this.available(expectedPacman, code)
            break;
            case 40: //Down
                expectedPacman = BOARD_GAME.childNodes[this.y + 1].childNodes[this.x]
                this.available(expectedPacman, code)
            break;
        }
    }

    available(expectedPosition, direction){
        if(expectedPosition === undefined){
            //There is nothing
        }else{
            if(expectedPosition.dataset.value == 1){
                //No available
            }else{
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
            this.comprobation(37)
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
            this.comprobation(39)
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
            this.comprobation(38)
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
            if(this.y > 20){

            }else{
                this.comprobation(40)
            }
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