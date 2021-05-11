var xAxis = 7;
var yAxis = 12;
var currentPacman, currentClass;
var expectedPacman, timeMovement = 0;

class Pacman{
    constructor(){
        currentClass = "pacmanLeft"
        this.display()
        this.controls()
        this.left()
    }

    display(){
        currentPacman = BOARD_GAME.childNodes[yAxis].childNodes[xAxis]
        currentPacman.classList.add("pacman")
        currentPacman.classList.add(currentClass)
    }

    controls(){
        document.addEventListener("keydown", evt => {
            currentPacman.classList.remove(currentClass)
            switch(evt.keyCode){
                case 39:
                    //Right
                    currentClass = "pacmanRight"
                    this.display()
                    this.right()
                break;
                case 37:
                    //Left
                    currentClass = "pacmanLeft"
                    this.display()
                    this.left()
                break;
                case 40:
                    //Down
                    currentClass = "pacmanDown"

                    this.display()
                break;
                case 38:
                    //Up
                    currentClass = "pacmanUp"

                    currentPacman.classList.add("pacman")
                    currentPacman.classList.add(currentClass)
                break;
            }
        })
    }

    left(){
        expectedPacman = BOARD_GAME.childNodes[yAxis].childNodes[xAxis - 1]

        if(expectedPacman.dataset.value == 1){
            console.log(`No`)
        }else{
            this.leftwards()
        }
    }

    leftwards(){
        timeMovement -= 2

        setTimeout(() => {
            currentPacman.style.transform = `translateX(${timeMovement}px)`;

            if(timeMovement <= -20){
                timeMovement = 0
                currentPacman.classList.remove("pacman")
                xAxis--
                this.display()
            }else{
                this.leftwards()
            }
        }, 30)
    }

    right(){
        expectedPacman = BOARD_GAME.childNodes[yAxis].childNodes[xAxis + 1]

        if(expectedPacman.dataset.value == 1){
            console.log(`No`)
        }else{
            this.rightwards()
        }
    }

    rightwards(){
        timeMovement += 2

        setTimeout(() => {
            currentPacman.style.transform = `translateX(${timeMovement}px)`;

            if(timeMovement >= 20){
                timeMovement = 0
                currentPacman.classList.remove("pacman")
                xAxis++
                this.display()
            }else{
                this.rightwards()
            }
        }, 30)
    }
}