var ghostContainer, currentGhostPosition, ghost1, stringTriggerMovement
const posibleAxis = 4
var movementTime = 0

class Ghost{
    constructor(){
        this.x = (window.innerWidth <= 509) ? 7 : 21
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

        if(this.trigger){
            this.triggerSecondTime = true
            this.triggerUntilEscape()
        }else{
            this.setNextMovement(this.towardsX, this.towardsY)
        }
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
        }else{
            this.trigger = true
            this.triggerUntilEscape()
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

    triggerUntilEscape(){
        if(!this.trigger){
            this.trigger = true
            this.posibleDirections()
        }else{
            if(this.triggerSecondTime){
                let axisComprobation
                (stringTriggerMovement === "Down" || stringTriggerMovement === "Up") ? axisComprobation = this.towardsX : axisComprobation = this.towardsY

                if(this.arrayPosibleDirections.includes(axisComprobation)){
                    this.trigger = false
                    this.triggerSecondTime = false
                    this.moveTo(axisComprobation)
                }else{
                    this.moveTo(stringTriggerMovement)
                }
            }else{
                let triggerMovement = Math.floor(Math.random() * this.arrayPosibleDirections.length)
                stringTriggerMovement = this.arrayPosibleDirections[triggerMovement]
                this.moveTo(stringTriggerMovement)
            }
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
        this.arrayPosibleDirections = []

        console.log(`X: ${this.x}. ExpectedX: ${this,this.expectedX}. Y: ${this.y}. ExpectedY: ${this.expectedY}`)

        if(this.x != this.expectedX || this.y != this.expectedY){
            if(!this.trigger){
                this.posibleDirections()
            }else{
                this.trigger = false
                this.triggerUntilEscape()
            }
        }
    }

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

    movementListen(){
        setTimeout(() => {
            (this.expectedY === this.y) ? this.movementListen() : this.whereToGetExpecY()
        }, 1000)
    }
}

function ghosts(){
    ghost1 = new Ghost()
}