var ghostContainer, currentGhostPosition, ghost1
const posibleAxis = 4
var movementTime = 0

class Ghost{
    constructor(){
        this.x = (window.innerWidth <= 509) ? 7 : 1
        this.y = 21
        this.expectedY = pacman.y
        this.expectedX = pacman.x
        this.arrayPosibleDirections = []
        this.towardsX = null
        this.display()
    }

    display(){
        ghostContainer = BOARD_GAME.childNodes[this.y].childNodes[this.x]
        currentGhostPosition = document.createElement("div")
        currentGhostPosition.classList.add("ghost")
        ghostContainer.appendChild(currentGhostPosition)

        this.getExpectedX()
        this.getExpectedY()
    }

    getExpectedX(){
        if(this.x === this.expectedX){
            this.towardsX = "Center"
        }else if(this.x < this.expectedX){
            this.towardsX = "Right"  
        }else if(this.x > this.expectedX){
            this.towardsX = "Left"
        }
        // this.towardsY = null
        // this.posibleDirections(this.towardsX)
    }

    getExpectedY(){
        if(this.expectedY === this.y){
            this.towardsY = "Center"
        }else if(this.expectedY > this.y){
            this.towardsY = "Down"
        }else if(this.expectedY < this.y){
            this.towardsY = "Up"
        }
        
        this.posibleDirections()
    }

    posibleDirections(){
        for(let i = 0; i < posibleAxis; i++){
            let expectedPosition, nextDirection

            switch (i) {
                case 0: //Right
                    (this.x === CELLS - 1) ? expectedPosition = undefined :
                        expectedPosition = BOARD_GAME.childNodes[this.y].childNodes[this.x + 1]
                        nextDirection = "Right"
                break;
                case 1: //Down
                    (this.y === 21) ? expectedPosition = undefined :
                        expectedPosition = BOARD_GAME.childNodes[this.y + 1].childNodes[this.x]
                        nextDirection = "Down"
                break;
                case 2: //Left
                    (this.x === 0) ? expectedPosition = undefined :
                        expectedPosition = BOARD_GAME.childNodes[this.y].childNodes[this.x - 1]
                        nextDirection = "Left"
                break;
                case 3: //Up
                    (this.y === 0) ? expectedPosition = undefined :
                        expectedPosition = BOARD_GAME.childNodes[this.y - 1].childNodes[this.x]
                        nextDirection = "Up"
                break;
            }

            if(expectedPosition){
                if(expectedPosition.dataset.value != 1)
                    this.arrayPosibleDirections.push(nextDirection)
            }
        }

        this.setNextMovement(this.towardsX, this.towardsY)
    }

    setNextMovement(posibleMovInX, posibleMovInY){
        let x, y, positions = this.arrayPosibleDirections
        x = (positions.includes(posibleMovInX)) ? true : false
        y = (positions.includes(posibleMovInY)) ? true : false
        
        if(x && y){
            this.shuffleMovement(posibleMovInX, posibleMovInY)
        }else if(x){
            this.moveTo(posibleMovInX)
        }else if(y){
            this.moveTo(posibleMovInY)
        }
    }

    shuffleMovement(directionInX, directionInY){
        let nextMovement = Math.floor(Math.random() * 2)
        switch(nextMovement){
            case 0: //X
                this.moveTo(directionInX)
            break;
            case 1: //Y
                this.moveTo(directionInY)
            break;
        }
    }

    moveTo(direction){
        switch(direction){
            case "Right":
                movementTime += 2
                if(movementTime >= 20){
                    this.finishedMovementEffect(direction, true)
                }else{
                    this.movementEffect("X", direction)
                }
            break;
            case "Down":
                movementTime += 2
                if(movementTime >= 20){
                    this.finishedMovementEffect(direction, true)
                }else{
                    this.movementEffect("Y", direction)
                }
            break;
            case "Left":
                movementTime -= 2
                if(movementTime <= -20){
                    this.finishedMovementEffect(direction, false)
                }else{
                    this.movementEffect("X", direction)
                }
            break;
            case "Up":
                movementTime -= 2
                if(movementTime <= -20){
                    this.finishedMovementEffect(direction, false)
                }else{
                    this.movementEffect("Y", direction)
                }
            break;
        }
    }

    finishedMovementEffect(direction, value){
        movementTime = 0
        if(direction === "Right" || direction === "Left"){
            (value) ? this.x++ : this.x--
        }else{
            (value) ? this.y++ : this.y--
        }
        this.changePosition()
    }

    movementEffect(axis, direction){
        setTimeout(() => {
            currentGhostPosition.style.transform = `translate${axis}(${movementTime}px)`
            this.moveTo(direction)
        }, 50)
    }

    changePosition(){
        ghostContainer.removeChild(currentGhostPosition)
        ghostContainer = BOARD_GAME.childNodes[this.y].childNodes[this.x]
        currentGhostPosition.style.transform = `none`
        ghostContainer.appendChild(currentGhostPosition)
    }

    // posibleDirections(currentDirection, secondPreference){
    //     for(let i = 0; i < posibleAxis; i++){
    //         let expectedDirection, direct

    //         switch (i) {
    //             case 0: //Right
    //                 (this.x === CELLS - 1) ? expectedDirection = undefined : 
    //                     expectedDirection = BOARD_GAME.childNodes[this.y].childNodes[this.x + 1]
    //                     direct = "Right"
    //             break;
    //             case 1: //Down
    //                 (this.y === 21) ? expectedDirection = undefined : 
    //                     expectedDirection = BOARD_GAME.childNodes[this.y + 1].childNodes[this.x]
    //                     direct = "Down"
    //             break;
    //             case 2: //Left
    //                 (this.x === 0) ? expectedDirection = undefined : 
    //                     expectedDirection = BOARD_GAME.childNodes[this.y].childNodes[this.x - 1]
    //                     direct = "Left"
    //             break;
    //             case 3: //Up
    //                 (this.y === 0) ? expectedDirection = undefined : 
    //                     expectedDirection = BOARD_GAME.childNodes[this.y - 1].childNodes[this.x]
    //                     direct = "Up"
    //             break;
    //         }

    //         if(expectedDirection != undefined){
    //             if(expectedDirection.dataset.value != 1)
    //                 this.directions.push(direct)
    //         }
    //     }

    //     if(currentDirection){
    //         if(this.towardsX){
    //             if(this.x === this.expectedX){
    //                 console.log(`Got it`)
    //             }else{
    //                 switch(this.towardsX){
    //                     case "Right":
    //                         if(BOARD_GAME.childNodes[this.y].childNodes[this.x + 1].dataset.value == 1){
    //                             (this.secondChance) ? this.move(secondPreference) : this.move()
    //                         }else{
    //                             this.movement(currentDirection)
    //                         }
    //                     break;
    //                     case "Left":
    //                         if(BOARD_GAME.childNodes[this.y].childNodes[this.x - 1].dataset.value == 1){
    //                             (this.secondChance) ? this.move(secondPreference) : this.move()
    //                         }else{
    //                             this.movement(currentDirection)
    //                         }
    //                     break;
    //                 }
    //             }
    //         }else{
    //             (this.directions.length > 2) ? 
    //                 (this.directions.includes(this.towardsY)) ? this.movement(this.towardsY) : this.movement(currentDirection) 
    //                 :
    //                 this.movement(currentDirection)
    //         }
    //     }else{
    //         if(this.towardsX){
    //             (this.directions.includes("Down")) ? this.movement("Down") : this.movement("Up")
    //         }else{
    //             (this.directions.includes(this.towardsY)) ? this.movement(this.towardsY) : this.move()
    //         }
    //     }
    // }

    move(directionPreference){
        if(directionPreference){
            this.movement(directionPreference)
        }else{
            this.chosenDirection = Math.floor(Math.random() * this.directions.length)
            let movDirect = this.directions[this.chosenDirection]
    
            if(this.towardsY){
                if(this.towardsY == "Down" && movDirect == "Up"){
                    this.move()
                }else if(this.towardsY == "Up" && movDirect == "Down"){
                    this.move()
                }else{
                    this.movement(movDirect)
                }
            }else if(this.towardsX){
                if(this.towardsX === "Left" && movDirect === "Right"){
                    this.move()
                }else if(this.towardsX === "Right" && movDirect === "Left"){
                    this.move()
                }else{
                    this.movement(movDirect)
                }
            }
        }
    }

    // movement(position){
    //     switch(position){
    //         case "Right":
    //             this.Right()
    //         break;
    //         case "Down":
    //             this.Down()
    //         break;
    //         case "Left":
    //             this.Left()
    //         break;
    //         case "Up":
    //             this.Up()
    //         break;
    //     }

    //     this.directions = []
    // }

    Right(){
        movementTime += 2

        if(movementTime >= 20){
            movementTime = 0
            this.x++
            this.changePosition()

            if(this.x != CELLS - 1){
                (BOARD_GAME.childNodes[this.y].childNodes[this.x + 1].dataset.value == 1) ? this.posibleDirections() : this.posibleDirections("Right")
            }else{
                if(!this.towardsX)
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

            if(this.towardsX){
                this.secondChance = true
                this.posibleDirections(this.towardsX, "Down")
            }else{
                if(this.y >= this.expectedY){
                    this.getExpectedX()
                }else{
                    (this.y != 21) ? 
                        (BOARD_GAME.childNodes[this.y + 1].childNodes[this.x].dataset.value == 1) ? this.posibleDirections() : this.Down()
                    :
                        this.posibleDirections()
                }
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
                if(!this.towardsX)
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

            if(this.towardsX){
                this.secondChance = true
                this.posibleDirections(this.towardsX, "Up")
            }else{
                if(this.y <= this.expectedY){
                    this.getExpectedX()
                }else{
                    (this.y != 0) ?
                        (BOARD_GAME.childNodes[this.y - 1].childNodes[this.x].dataset.value == 1) ? this.posibleDirections() : this.Up()
                    :
                        this.posibleDirections()
                }
            }
        }else{
            setTimeout(() => {
                currentGhostPosition.style.transform = `translateY(${movementTime}px)`
                this.Up()
            }, 50)
        }
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