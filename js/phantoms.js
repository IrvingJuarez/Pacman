const posibleAxis = 4
var ghostsArray = []

class Ghost{
    constructor(axisX, axisY, num){
        this.movementTime = 0
        this.number = num
        this.x = axisX
        this.y = axisY
        this.expectedY = pacman.y
        this.expectedX = pacman.x
        this.arrayPosibleDirections = []
        this.towardsX = null
        ghostsArray.push(this)
        this.display()
    }

    display(){
        this.ghostContainer = BOARD_GAME.childNodes[this.y].childNodes[this.x]
        this.currentGhostPosition = document.createElement("div")
        this.currentGhostPosition.classList.add(`ghost${this.number}`)
        this.ghostContainer.appendChild(this.currentGhostPosition)

        this.inJail()
    }
    
    inJail(){
        if(this.ghostContainer.dataset.value == 1){
            setTimeout(() => {
                this.towardsX = "Right"
                this.towardsY = "Up"
                this.arrayPosibleDirections.push("Up")
                this.setNextMovement(this.towardsX, this.towardsY)
                // this.inJail()
            }, this.number * 2000)
        }else{
            this.getExpectedX()
            this.getExpectedY()
        }
    }

    getExpectedX(){
        if(this.x <= this.expectedX){
            this.towardsX = "Right"  
        }else if(this.x >= this.expectedX){
            this.towardsX = "Left"
        }
    }

    getExpectedY(){
        if(this.expectedY >= this.y){
            this.towardsY = "Down"
        }else if(this.expectedY <= this.y){
            this.towardsY = "Up"
        }
        
        (this.newYAxis) ? this.newYAxis = false : this.posibleDirections()
    }

    posibleDirections(){
        for(let i = 0; i < posibleAxis; i++){
            // let this.expectedPosition, this.nextDirection

            switch (i) {
                case 0: //Right
                    (this.x === CELLS - 1) ? this.expectedPosition = undefined :
                        this.expectedPosition = BOARD_GAME.childNodes[this.y].childNodes[this.x + 1]
                        this.nextDirection = "Right"
                break;
                case 1: //Down
                    (this.y === 21) ? this.expectedPosition = undefined :
                        this.expectedPosition = BOARD_GAME.childNodes[this.y + 1].childNodes[this.x]
                        this.nextDirection = "Down"
                break;
                case 2: //Left
                    (this.x === 0) ? this.expectedPosition = undefined :
                        this.expectedPosition = BOARD_GAME.childNodes[this.y].childNodes[this.x - 1]
                        this.nextDirection = "Left"
                break;
                case 3: //Up
                    (this.y === 0) ? this.expectedPosition = undefined :
                        this.expectedPosition = BOARD_GAME.childNodes[this.y - 1].childNodes[this.x]
                        this.nextDirection = "Up"
                break;
            }

            if(this.expectedPosition){
                if(this.expectedPosition.dataset.value != 1)
                    this.arrayPosibleDirections.push(this.nextDirection)
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
                this.axisDirection = "X"
                this.movementTime += 2;
                (this.movementTime >= 20) ? this.finishedMovementEffect(direction, true) : this.movementEffect("X", direction)
            break;
            case "Down":
                this.axisDirection = "Y"
                this.movementTime += 2;
                (this.movementTime >= 20) ? this.finishedMovementEffect(direction, true) : this.movementEffect("Y", direction)
            break;
            case "Left":
                this.axisDirection = "X"
                this.movementTime -= 2;
                (this.movementTime <= -20) ? this.finishedMovementEffect(direction, false) : this.movementEffect("X", direction)
            break;
            case "Up":
                this.axisDirection = "Y"
                this.movementTime -= 2;
                (this.movementTime <= -20) ? this.finishedMovementEffect(direction, false) : this.movementEffect("Y", direction)
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
                (this.stringTriggerMovement === "Down" || this.stringTriggerMovement === "Up") ? axisComprobation = this.towardsX : axisComprobation = this.towardsY

                if(this.arrayPosibleDirections.includes(axisComprobation)){
                    this.trigger = false
                    this.triggerSecondTime = false
                    this.moveTo(axisComprobation)
                }else{
                    this.moveTo(this.stringTriggerMovement)
                }
            }else{
                let triggerMovement = Math.floor(Math.random() * this.arrayPosibleDirections.length)
                this.stringTriggerMovement = this.arrayPosibleDirections[triggerMovement]

                if(this.x === CELLS - 1){
                    this.stringTriggerMovement = "Left"
                }else if(this.x === 0){
                    this.stringTriggerMovement = "Right"
                }else if(this.y === 0){
                    this.stringTriggerMovement = "Down"
                }else if(this.y === 21){
                    this.stringTriggerMovement = "Up"
                }
                this.moveTo(this.stringTriggerMovement)
            }
        }
    }

    finishedMovementEffect(direction, value){
        this.movementTime = 0
        if(direction === "Right" || direction === "Left"){
            (value) ? this.x++ : this.x--
        }else{
            (value) ? this.y++ : this.y--
        }
        if(!this.stop)
            this.changePosition()
    }

    movementEffect(axis, direction){
        setTimeout(() => {
            this.currentGhostPosition.style.transform = `translate${axis}(${this.movementTime}px)`
            this.moveTo(direction)
        }, 30)
    }

    changePosition(){
        this.expectedY = pacman.y
        this.expectedX = pacman.x

        this.ghostContainer.removeChild(this.currentGhostPosition)
        this.ghostContainer = BOARD_GAME.childNodes[this.y].childNodes[this.x]
        this.currentGhostPosition.style.transform = `none`
        this.ghostContainer.appendChild(this.currentGhostPosition)
        this.arrayPosibleDirections = []

        if(this.ghostContainer.childNodes[1]){
            this.plusOneGhost = true
        }else{
            this.plusOneGhost = false
        }
        
        if(this.plusOneGhost === true){
            this.ghostContainer.childNodes[1].style.zIndex = -1;
        }else{
            this.ghostContainer.childNodes[0].style.zIndex = 0
        }

        this.isANewExpectedAxisNecessary()
        this.noBiases()
    }

    isANewExpectedAxisNecessary(){
        let x, y
        if(this.towardsX === "Left" && this.x < this.expectedX){
            x = true
        }else if(this.towardsX === "Right" && this.x > this.expectedX){
            x = true
        }
        
        if(this.towardsY === "Up" && this.y < this.expectedY){
            y = true
        }else if(this.towardsY === "Down" && this.y > this.expectedY){
            y = true
        }

        if(x & y){
            this.changeInAxisDirectionFunction("X")
            this.changeInAxisDirectionFunction("Y")
        }else if(x){
            this.changeInAxisDirectionFunction("X")
        }else if(y){
            this.changeInAxisDirectionFunction("Y")
        }
    }

    noBiases(){
        if(this.axisDirection === "X"){
            if(this.towardsX === "Right" && this.x >= this.expectedX){
                if(this.towardsY === "Up" && this.y <= this.expectedY){
                    newGame.gameOver()
                }else if(this.towardsY === "Down" && this.y >= this.expectedY){
                    newGame.gameOver()
                }else{
                    this.triggerDecision()
                }
            }else if(this.towardsX === "Left" && this.x <= this.expectedX){
                if(this.towardsY === "Down" && this.y >= this.expectedY){
                    newGame.gameOver()
                }else if(this.towardsY === "Up" && this.y <= this.expectedY){
                    newGame.gameOver()
                }else{
                    this.triggerDecision()
                }
            }else{
                this.triggerDecision()
            }
        }else if(this.axisDirection === "Y"){
            if(this.towardsY === "Down" && this.y >= this.expectedY){
                if(this.towardsX === "Right" && this.x >= this.expectedX){
                    newGame.gameOver()
                }else if(this.towardsX === "Left" && this.x <= this.expectedX){
                    newGame.gameOver()
                }else{
                    this.triggerDecision()
                }
            }else if(this.towardsY === "Up" && this.y <= this.expectedY){
                if(this.towardsX === "Right" && this.x >= this.expectedX){
                    newGame.gameOver()
                }else if(this.towardsX === "Left" && this.x <= this.expectedX){
                    newGame.gameOver()
                }else{
                    this.triggerDecision()
                }
            }else{
                this.triggerDecision()
            }
        }
        
    }
    
    triggerDecision(){
        if(!this.trigger){
            this.posibleDirections()
        }else{
            this.trigger = false
            this.triggerUntilEscape()
        }
    }

    changeInAxisDirectionFunction(axis){
        if(axis === "X"){
            this.getExpectedX()
        }else{
            this.newYAxis = true
            this.getExpectedY()
        }
    }
}

function ghosts(howManyGhosts){
    switch(howManyGhosts){
        case 1:
            var ghost1 = new Ghost((window.innerWidth <= 509) ? 7 : 11, 9, 1)
        break;
        case 2:
            var ghost1 = new Ghost((window.innerWidth <= 509) ? 7 : 11, 9, 1)
            var ghost2 = new Ghost((window.innerWidth <= 509) ? 7 : 11, 11, 2)
        break;
        case 3:
            var ghost1 = new Ghost((window.innerWidth <= 509) ? 7 : 11, 9, 1)
            var ghost2 = new Ghost((window.innerWidth <= 509) ? 7 : 11, 11, 2)
            var ghost3 = new Ghost((window.innerWidth <= 509) ? 6 : 10, 11, 3)
        break;
    }
}