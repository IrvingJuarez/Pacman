var xAxis = 7;
var yAxis = 12;
var currentPacman, currentClass;
var expectedPacman;

class Pacman{
    constructor(){
        this.display()
        this.controls()
    }

    display(){
        currentClass = "pacmanLeft"

        currentPacman = BOARD_GAME.childNodes[yAxis].childNodes[xAxis]
        currentPacman.classList.add("pacman")
        currentPacman.classList.add(currentClass)

        this.left()
    }

    controls(){
        document.addEventListener("keydown", evt => {
            currentPacman.classList.remove(currentClass)
            switch(evt.keyCode){
                case 39:
                    //Right
                    currentClass = "pacmanRight"

                    currentPacman.classList.add("pacman")
                    currentPacman.classList.add(currentClass)
                break;
                case 37:
                    //Left
                    currentClass = "pacmanLeft"

                    currentPacman.classList.add("pacman")
                    currentPacman.classList.add(currentClass)
                break;
                case 40:
                    //Down
                    currentClass = "pacmanDown"

                    currentPacman.classList.add("pacman")
                    currentPacman.classList.add(currentClass)
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
        xAxis--
        expectedPacman = BOARD_GAME.childNodes[yAxis].childNodes[xAxis]

        if(expectedPacman.dataset.value == 1){
            
        }else{
            setTimeout(() => {
                currentPacman.classList.remove("pacman")

                expectedPacman.classList.add("pacman")
                expectedPacman.classList.add(currentClass)
                currentPacman = expectedPacman

                this.left()
            }, 1000)
        }
    }
}