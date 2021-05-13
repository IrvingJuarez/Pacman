var ghostContainer, currentGhostPosition
const posibleAxis = 4
var movementTime = 0

class Ghost{
    constructor(){
        this.x = (window.innerWidth <= 509) ? 7 : 11
        this.y = 9
        this.directions = []
        this.display()
    }

    display(){
        ghostContainer = BOARD_GAME.childNodes[this.y].childNodes[this.x]
        currentGhostPosition = document.createElement("div")
        currentGhostPosition.classList.add("ghost")
        ghostContainer.appendChild(currentGhostPosition)

        this.posibleDirections()
    }

    posibleDirections(){
        for(let i = 0; i < posibleAxis; i++){
            let expectedDirection, direct

            switch (i) {
                case 0: //Right
                    if(this.x === CELLS - 1){
                        expectedDirection = undefined
                    }else{
                        expectedDirection = BOARD_GAME.childNodes[this.y].childNodes[this.x + 1]
                        direct = "Right"
                    }
                break;
                case 1: //Down
                    if(this.y === 21){
                        expectedDirection = undefined
                    }else{
                        expectedDirection = BOARD_GAME.childNodes[this.y + 1].childNodes[this.x]
                        direct = "Down"
                    }
                break;
                case 2: //Left
                    if(this.x === 0){
                        expectedDirection = undefined
                    }else{
                        expectedDirection = BOARD_GAME.childNodes[this.y].childNodes[this.x - 1]
                        direct = "Left"
                    }
                break;
                case 3: //Up
                    if(this.y === 0){
                        expectedDirection = undefined
                    }else{
                        expectedDirection = BOARD_GAME.childNodes[this.y - 1].childNodes[this.x]
                        direct = "Up"
                    }
                break;
            }

            if(expectedDirection === undefined){
                //Nothing
            }else{
                if(expectedDirection.dataset.value != 1){
                    this.directions.push(direct)
                }
            }
        }

        this.move()
    }

    move(){
        this.chosenDirection = Math.floor(Math.random() * this.directions.length)
        let movDirect = this.directions[this.chosenDirection]
        this.movement(movDirect)
    }

    movement(position){
        switch(position){
            case "Right":
                this.Right()
            break;
            case "Down":
                this.Down()
            break;
            case "Left":
                this.Left()
            break;
            case "Up":
                this.Up()
            break;
        }

        this.directions = []
    }

    Right(){
        movementTime += 2

        if(movementTime >= 20){
            movementTime = 0
            this.x++
            this.changePosition()
        }else{
            setTimeout(() => {
                currentGhostPosition.style.transform = `translateX(${movementTime}px)`
                this.Right()
            }, 50)
        }
    }

    Down(){
        movementTime += 2

        if(movementTime >= 20){
            movementTime = 0
            this.y++
            this.changePosition()
        }else{
            setTimeout(() => {
                currentGhostPosition.style.transform = `translateY(${movementTime}px)`
                this.Down()
            }, 50)
        }
    }

    Left(){
        movementTime -= 2

        if(movementTime <= -20){
            movementTime = 0
            this.x--
            this.changePosition()
        }else{
            setTimeout(() => {
                currentGhostPosition.style.transform = `translateX(${movementTime}px)`
                this.Left()
            }, 50)
        }
    }

    Up(){
        movementTime -= 2

        if(movementTime <= -20){
            movementTime = 0
            this.y--
            this.changePosition()
        }else{
            setTimeout(() => {
                currentGhostPosition.style.transform = `translateY(${movementTime}px)`
                this.Up()
            }, 50)
        }
    }

    changePosition(){
        ghostContainer.removeChild(currentGhostPosition)
        ghostContainer = BOARD_GAME.childNodes[this.y].childNodes[this.x]
        currentGhostPosition.style.transform = `none`
        ghostContainer.appendChild(currentGhostPosition)
        this.posibleDirections()
    }
}

function ghosts(){
    let ghost1 = new Ghost()
}