class Game {

    // https://www.w3schools.com/js/js_random.asp and office hours
    constructor(size) {
        this.size = size;
        this.setupNewGame();


    }

    setupNewGame() {

        this.board = Array(this.size ** 2).fill(0);
        this.addTile();
        this.addTile();






        // this.counter = 0;


        this.score = 0;
        this.won = false;
        this.over = false;
        this.moveListener = [];
        this.winListener = [];
        this.loseCallbacks = [];


    }

    loadGame(gameState) {
        this.size = Math.sqrt(gameState.board.length);
        this.board = gameState.board;
        this.score = gameState.score;
        this.won = gameState.won;
        this.over = gameState.over;
        // this.counter = 0;
        // this.moveListener = [];

        // // added after
        // this.winListener = [];
        // this.loseCallbacks = [];

        // this.checkVictory();
        // this.gameOver();

    }

    move(direction) {

        this.beforeChange = [...this.board]

        switch (direction) {

            case "up":

                if (this.checkValidity(direction)) {
                    this.repositionUP();
                    this.mergeUp();
                    this.repositionUP();
                    // this.addTile();

                }
                break;

            case "down":

                if (this.checkValidity(direction)) {
                    this.repositionDown();
                    this.mergeDown();
                    this.repositionDown();
                    // this.addTile();

                }
                break;

            case "left":

                if (this.checkValidity(direction)) {
                    this.repositionLeft();
                    this.mergeLeft();
                    this.repositionLeft();
                    // this.addTile();


                }
                break;

            case "right":
                if (this.checkValidity(direction)) {
                    this.repositionRight();
                    this.mergeRight();
                    this.repositionRight();
                    // this.addTile();


                }
                break;

            default:
                break;

        }

        if (!this.isEqual(this.beforeChange, this.board)) {

            this.addTile();

            this.moveListener.forEach(callback => {
                // console.log(`Callback: ${this.counter}`);
                callback(this.getGameState());
                // this.counter++;
            })


            if (this.checkVictory()) {
                // this.counter++;
                this.won = true;
                this.winListener.forEach(callback => {
                    callback(this.getGameState());
                })
            }
            if (this.gameOver()) {
                this.over = true;
                this.loseCallbacks.forEach(callback => {
                    callback(this.getGameState());
                })
            }
        }

    }

    onMove(callback) {
        this.moveListener.push(callback);
    }

    onWin(callback) {
        this.winListener.push(callback);
    }

    onLose(callback) {
        this.loseCallbacks.push(callback);
    }

    isEqual(past, present) {
        let equals = true;
        past.forEach((element, index) => {
            if (element !== present[index]) {
                equals = false;
            }
        })
        return equals;
    }


    repositionUP() {
        this.board.forEach((item, index, array) => {
            //find element
            if (index >= this.size && item !== 0) {
                let locationAbove = index - this.size;
                // check if elements above is empty
                while (array[locationAbove] === 0) {
                    locationAbove -= this.size;
                }
                locationAbove = locationAbove + this.size;
                if (locationAbove !== index) {
                    array[locationAbove] = item;
                    array[index] = 0;
                }
            }
        })
    }

    repositionDown() {
        let startLocation = (this.board.length - 1) - this.size;

        for (let i = startLocation; i >= 0; i--) {
            const item = this.board[i];
            const index = i;
            let array = this.board;
            let col = Math.round(index % this.size);
            let row = Math.floor(index / this.size);

            if (index < (this.board.length - this.size) && item !== 0) {
                let locationBelow = index + this.size;
                let locationBelowRow = Math.floor(locationBelow / this.size);
                let locationBelowCol = Math.round(locationBelow % this.size);
                // check if elements above is empty
                while (array[locationBelow] === 0 && locationBelowCol == col) {
                    locationBelow += this.size;
                }
                locationBelow = locationBelow - this.size;
                if (locationBelow !== index) {
                    array[locationBelow] = item;
                    array[index] = 0;
                }
            }

        }
    }

    repositionRight() {


        for (let i = this.board.length - 1; i >= 0; i--) {
            let item = this.board[i];
            let index = i;
            let array = this.board;
            let col = Math.round(index % this.size);
            let row = Math.floor(index / this.size);

            //find valid elements
            if (col < this.size - 1 && item !== 0) {
                let rightLocation = index + 1;
                let rightLocationRow = Math.floor(rightLocation / this.size);
                while (array[rightLocation] === 0 && rightLocationRow === row) {
                    rightLocation += 1;
                    rightLocationRow = Math.floor(rightLocation / this.size)
                }
                rightLocation = rightLocation - 1;
                if (rightLocation !== index) {
                    array[rightLocation] = item;
                    array[index] = 0;
                }

            }
        }

    }
    repositionLeft() {
        this.board.forEach((item, index, array) => {
            // find element
            let col = Math.round(index % this.size);
            let row = Math.floor(index / this.size);

            if (col > 0 && item !== 0) {
                // console.log(`Col: ${col} Row: ${row} Item: ${item}`);
                let leftLocation = index - 1;
                let leftItem = array[leftLocation];
                let leftRow = Math.floor(leftLocation / this.size);
                while (array[leftLocation] === 0 && leftRow === row) {
                    leftLocation -= 1;
                    leftRow = Math.floor(leftLocation / this.size);
                }
                leftLocation = leftLocation + 1;
                if (leftLocation !== index) {
                    // console.log(`Col: ${col} Row: ${row} Item: ${item}`);
                    array[leftLocation] = item;
                    array[index] = 0;
                }

            }

        })
    }

    mergeUp() {
        // merge going upwards
        this.board.forEach((item, index, array) => {
            //find element
            if (index >= this.size && item !== 0) {
                let locationAbove = index - this.size;
                // check if elements above is empty
                if (array[locationAbove] === item) {
                    array[locationAbove] = item + item;
                    this.score += array[locationAbove];
                    array[index] = 0;
                }
            }
        })
    }

    mergeDown() {

        // merge downwards
        const startingPos = this.board.length - 1 - this.size;

        for (let i = this.board.length - 1; i >= 0; i--) {
            let item = this.board[i];
            let index = i;
            let array = this.board;
            let col = Math.round(index % this.size);
            let row = Math.floor(index / this.size);

            // console.log(`Col: ${col} Row: ${row} Item: ${item} \n`);
            if (row < this.size - 1 && item !== 0) {
                let belowIndex = index + this.size;
                let belowRow = Math.floor(belowIndex / this.size);
                let belowCol = Math.round(belowIndex % this.size);
                let belowItem = this.board[belowIndex];

                if (belowCol === col && belowItem === item) {

                    this.board[belowIndex] *= 2;
                    this.score += this.board[belowIndex];
                    this.board[index] = 0;
                }
            }


        }
    }

    mergeRight() {
        // merge going right
        for (let i = this.board.length - 1; i >= 0; i--) {
            let item = this.board[i];
            let index = i;
            let array = this.board;
            let col = Math.round(index % this.size);
            let row = Math.floor(index / this.size);

            if (col < (this.size - 1) && item !== 0) {
                // console.log(`Col: ${col} Row: ${row} Item: ${item}`); // 42882
                let rightPosition = index + 1;
                let rightPositionRow = Math.floor(rightPosition / this.size);
                let rightPosistionCol = Math.round(rightPosition % this.size);
                let rightItem = array[rightPosition];

                if (rightPositionRow === row && rightItem === item) {
                    this.board[index + 1] *= 2;
                    this.score += this.board[index + 1];
                    this.board[index] = 0;
                }
            }

        }

    }

    mergeLeft() {
        this.board.forEach((item, index, array) => {
            let col = Math.round(index % this.size);
            let row = Math.floor(index / this.size);

            if (col > 0 && item !== 0) {
                let leftPosition = index - 1;
                let leftPositionRow = Math.floor(leftPosition / this.size);
                let leftPositionCol = Math.round(leftPosition % this.size);
                let leftItem = array[leftPosition];

                if (leftPositionRow === row && leftItem === item) {
                    this.board[index - 1] *= 2;
                    this.score += this.board[index - 1];
                    this.board[index] = 0;
                }
            }
        })
    }


    addTile() {
        //https://www.w3schools.com/js/js_random.asp
        let tile = 2;
        if (Math.random() >= .9) tile = 4;

        const vacantTiles = [];
        this.board.forEach((item, index, array) => {
            if (item === 0) {
                vacantTiles.push(index);
            }
        });
        if (vacantTiles.length > 0) {
            this.board[vacantTiles[Math.floor(Math.random() * vacantTiles.length)]] = tile;
        }
    }

    toString() {
        let result = "";

        for (let i = 0; i < this.board.length; i++) {
            if (i != 0 && i % this.size === 0) {
                result += "\n";
            }
            result += "[";
            result += this.board[i];
            result += "]";

        }

        result += `\nScore: ${this.score}`;
        result += `\nWon: ${this.won}`;
        result += `\nOver: ${this.over}`;

        return result;
    }



    checkValidity(direction) {
        let valid = false;
        this.board.forEach((item, index, array) => {
            let col = Math.round(index % this.size);
            let row = Math.floor(index / this.size);

            switch (direction) {
                case "up":
                    if (row > 0 && item !== 0 && (this.board[index - this.size] === 0 || this.board[index - this.size] === item)) {
                        valid = true;
                    }
                    break;
                case "down":
                    if (row < this.size && item !== 0 && (array[index + this.size] === 0 || array[index + this.size] === item)) {
                        valid = true;
                    }

                    break;
                case "left":
                    if (col > 0 && item !== 0 && (array[index - 1] === 0 || array[index - 1] === item)) {
                        valid = true;
                    }

                    break;
                case "right":
                    if (col < this.size - 1 && item !== 0 && (array[index + 1] === 0 || array[index + 1] === item)) {
                        valid = true;
                    }
                    break;

                default:
                    // console.log("not a valid directions");
                    // return false;
                    break;
            }
        })

        return valid;
    }

    getGameState() {
        let gameState = {
            board: this.board,
            score: this.score,
            won: this.won,
            over: this.over
        }

        return gameState;
    }

    gameOver() {
        let gameOver = true;

        this.board.forEach((item, index, array) => {


            let col = Math.round(index % this.size);
            let row = Math.floor(index / this.size);


            if (item === 0) {
                return false;
            }

            //pushing up
            if (row > 0 && item !== 0 && (this.board[index - this.size] === 0 || this.board[index - this.size] === item)) {
                // console.log("up exist");
                gameOver = false;
            }
            // pushing down 
            if (row < this.size && item !== 0 && (array[index + this.size] === 0 || array[index + this.size] === item)) {
                // console.log("down exist");
                gameOver = false;
            }
            // pushing left
            if (col > 0 && item !== 0 && (array[index - 1] === 0 || array[index - 1] === item)) {
                // console.log("left exist");
                gameOver = false;
            }
            // pushing right
            if (col < this.size - 1 && item !== 0 && (array[index + 1] === 0 || array[index + 1] === item)) {
                // console.log("right exist");
                gameOver = false;
            }
        })


        this.over = gameOver;


        return gameOver;
    }

    checkVictory() {
        let bool = false;
        this.board.forEach((item) => {
            if (item === 2048) {
                // this.won = true;
                bool = true;
            }
        })
        return bool;
    }

    resetGame4x4() {
        this.setupNewGame(4);
    }

}



export default Game;
