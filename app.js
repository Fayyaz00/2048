import Game from "./engine/game.js";

// view 
// model: game.js

// main folder
const $root = $('#root');

$root.append('<input id="restart" class="restart" title="restart" type="button" name="restart" value="restart" aria-label="restart">');
const $restart = $(`.restart`);

$root.append(`<div class="grid"></div>`)
const $grid = $(`.grid`);

let gameObject = new Game(4);

/*
hieracrchy
Root
    win?
    reset
    grid
        tile
    score
    lost?
*/

let counter = 0;

document.addEventListener("keydown", e => {
    switch (e.key) {
        case 'ArrowUp':
            gameObject.move("up");
            break;
        case 'ArrowDown':
            gameObject.move("down");
            break;
        case 'ArrowLeft':
            gameObject.move("left");
            break;
        case 'ArrowRight':
            gameObject.move("right");
            break;
    }

})


$restart.click(function () {
    $root.empty
    $grid.empty();
    $(".win").remove();
    $(".lose").remove();
    gameObject.setupNewGame();
    // gameObject.moveListener = [];

    startGame();

})

// stackOverflow




function startGame() {


    gameObject = new Game(4);
    render(gameObject.getGameState(), $grid);


    updateBoard(gameObject.board);





    gameObject.onMove(gameState => {
        render(gameState, $grid);
    })


    gameObject.onWin(gameState => {


        if (gameState.won) {
            $(".win").remove();
            $root.prepend(
                `<h1 id=win class=win>
                    You Won! \nYou Got 2048! 
                </h1>`
            )
            // console.log(gameObject.toString())
        }
    })

    gameObject.onLose(gameState => {
        // render(gameState, $grid);
        if (gameState.over) {
            $(".lose").remove();
            $root.append(
                `<h1 id=lose class=lose>
                        You Lost! No Moves Remaining!
                </h1>`
            )
        }
    })






}

function render(gameState, $grid) {

    updateBoard(gameState.board);
    updateScore(gameState.score);
}

function updateBoard(board) {
    $grid.empty();

    board.forEach(tile => {


        if (tile === 0) {
            $grid.append(
                `<div id=${tile} class=tile>
                  
                </div>`
            )
        } else {
            $grid.append(
                `<div id=${tile} class=tile>
                    ${tile}
                </div>`
            )
        }



        // $grid.append(
        //     `<div id=${tile} class=tile>
        //         ${tile}
        //     </div>`
        // )





    })
}

function updateScore(score) {
    $(".score").remove();
    $root.append(`<div id="score" class="score">Score: ${score}</div>`)
}




startGame()