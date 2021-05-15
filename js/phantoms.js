var ghostContainer, currentGhostPosition, ghost1
const posibleAxis = 4
var movementTime = 0

class Ghost{
    constructor(){
        this.x = (window.innerWidth <= 509) ? 7 : 11
        this.y = 9
        this.expectedY = pacman.y
        this.expectedX = pacman.x
        this.directions = []
        this.display()
    }

    display(){
        ghostContainer = BOARD_GAME.childNodes[this.y].childNodes[this.x]
        currentGhostPosition = document.createElement("div")
        currentGhostPosition.classList.add("ghost")
        ghostContainer.appendChild(currentGhostPosition)

        this.whereToGetExpecY()
    }

    whereToGetExpecY(){
        let result
        if(this.expectedY === this.y){
            result = "Sideways"
        }else if(this.expectedY > this.y){
            result = "Down"
        }else if(this.expectedY < this.y){
            result = "Up"
        }

        this.towardsY = result
        this.posibleDirections()
    }

    posibleDirections(currentDirection){
        for(let i = 0; i < posibleAxis; i++){
            let expectedDirection, direct

            switch (i) {
                case 0: //Right
                    (this.x === CELLS - 1) ? expectedDirection = undefined : 
                        expectedDirection = BOARD_GAME.childNodes[this.y].childNodes[this.x + 1]
                        direct = "Right"
                break;
                case 1: //Down
                    (this.y === 21) ? expectedDirection = undefined : 
                        expectedDirection = BOARD_GAME.childNodes[this.y + 1].childNodes[this.x]
                        direct = "Down"
                break;
                case 2: //Left
                    (this.x === 0) ? expectedDirection = undefined : 
                        expectedDirection = BOARD_GAME.childNodes[this.y].childNodes[this.x - 1]
                        direct = "Left"
                break;
                case 3: //Up
                    (this.y === 0) ? expectedDirection = undefined : 
                        expectedDirection = BOARD_GAME.childNodes[this.y - 1].childNodes[this.x]
                        direct = "Up"
                break;
            }

            if(expectedDirection != undefined){
                if(expectedDirection.dataset.value != 1)
                    this.directions.push(direct)
            }
        }

        if(currentDirection){
            (this.directions.length > 2) ? 
                (this.directions.includes(this.towardsY)) ? this.movement(this.towardsY) : this.movement(currentDirection) 
                :
                this.movement(currentDirection)
        }else{
            (this.directions.includes(this.towardsY)) ? this.movement(this.towardsY) : this.move()
        }
    }

    move(){
        this.chosenDirection = Math.floor(Math.random() * this.directions.length)
        let movDirect = this.directions[this.chosenDirection]

        if(this.towardsY == "Down" && movDirect == "Up"){
            this.move()
        }else if(this.towardsY == "Up" && movDirect == "Down"){
            this.move()
        }else{
            this.movement(movDirect)
        }
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

            if(this.x != CELLS - 1){
                (BOARD_GAME.childNodes[this.y].childNodes[this.x + 1].dataset.value == 1) ? this.posibleDirections() : this.posibleDirections("Right")
            }else{
                this.posibleDirections()
            }
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

            if(this.y >= this.expectedY){
                this.getExpectedX()
            }else{
                (this.y != 21) ? 
                    (BOARD_GAME.childNodes[this.y + 1].childNodes[this.x].dataset.value == 1) ? this.posibleDirections() : this.Down()
                :
                    this.posibleDirections()
            }
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

            if(this.x != 0){
                (BOARD_GAME.childNodes[this.y].childNodes[this.x - 1].dataset.value == 1) ? this.posibleDirections() : this.posibleDirections("Left")
            }else{
                this.posibleDirections()
            }
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

            if(this.y <= this.expectedY){
                this.getExpectedX()
            }else{
                (this.y != 0) ?
                    (BOARD_GAME.childNodes[this.y - 1].childNodes[this.x].dataset.value == 1) ? this.posibleDirections() : this.Up()
                :
                    this.posibleDirections()
            }
        }else{
            setTimeout(() => {
                currentGhostPosition.style.transform = `translateY(${movementTime}px)`
                this.Up()
            }, 50)
        }
    }

    getExpectedX(){
        let direccion = (this.x < this.expectedX) ? "Right" : "Left"
        let blocks = (this.x < this.expectedX) ? this.expectedX - this.x : this.x - this.expectedX
        this.towardsX = direccion
        console.log(`You need to go to the ${this.towardsX} in ${blocks} blocks`)
    }

    changePosition(){
        ghostContainer.removeChild(currentGhostPosition)
        ghostContainer = BOARD_GAME.childNodes[this.y].childNodes[this.x]
        currentGhostPosition.style.transform = `none`
        ghostContainer.appendChild(currentGhostPosition)
    }

    movementListen(){
        setTimeout(() => {
            (this.expectedY === this.y) ? this.movementListen() : this.whereToGetExpecY()
        }, 1000)
    }
}

function ghosts(){
    ghost1 = new Ghost()
}