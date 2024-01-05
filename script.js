// console.log("Hello, world!");

function Gameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    //create the board in a 2D array
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;

    const printBoard = () => {
        for (let i = 0; i < rows; i++) {
            console.log("row " + i + " " +
                board[i][0].getValue() + "|" +
                board[i][1].getValue() + "|" +
                board[i][2].getValue());
        }
        console.log("************");
    };

    const writeToken = (row, column, token) => {
        if (board[row][column].getValue() === "-") {
            board[row][column].setValue(token);
            return true;
        } return false;
    };

    const resetBoard = () => {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                board[i][j].setValue("-");
            }
        }
    };

    return { getBoard, printBoard, writeToken , resetBoard };
};

function Cell() {
    let value = "-";

    const getValue = () => value;

    const setValue = (token) => {
        value = token;
    }

    return { getValue, setValue };
};

function GameController() {
    const board = Gameboard();

    const players = [
        { name: "Player 1 (X)", token: "X" },
        { name: "Player 2 (O)", token: "O" }
    ];

    let activePlayer = players[0];
    let nthRound = 0;

    const switchPlayer = () => {
        if (activePlayer === players[0]) {
            activePlayer = players[1];
        } else {
            activePlayer = players[0];
        }
    };

    const getActivePlayer = () => activePlayer;

    const printRound = () => {
        board.printBoard();
        console.log(getActivePlayer().name + "'s turn to play");
        console.log("************");
    };

    const endGame = (string) => {
        board.printBoard();
        if (string == "tie") {
            console.log("++++++++++++");
            console.log("++++++++++++");
            console.log("The game is a tie.");
            console.log("++++++++++++");
            console.log("++++++++++++");
        } else {
            console.log("++++++++++++");
            console.log("++++++++++++");
            console.log(string + " wins!");
            console.log("++++++++++++");
            console.log("++++++++++++");
        }
        nthRound = 0;
        board.resetBoard();
        activePlayer = players[0];
        printRound();
    };

    const playRound = (row, column) => {
        let player = getActivePlayer();
        //if the player's move was valid
        if (board.writeToken(row, column, player.token)) {
            //will check for a tie later
            nthRound++;
            //win conditions
            let current = board.getBoard();
            //check rows
            if (current[0][0].getValue() == player.token && 
            current[0][1].getValue() == player.token && 
            current[0][2].getValue() == player.token) {
                endGame(player.name);
            } else if (current[1][0].getValue() == player.token && 
            current[1][1].getValue() == player.token && 
            current[1][2].getValue() == player.token) {
                endGame(player.name);
            } else if (current[2][0].getValue() == player.token && 
            current[2][1].getValue() == player.token && 
            current[2][2].getValue() == player.token) {
                endGame(player.name);
            }
            //check columns
            else if (current[0][0].getValue() == player.token && 
            current[1][0].getValue() == player.token && 
            current[2][0].getValue() == player.token) {
                endGame(player.name);
            } else if (current[0][1].getValue() == player.token && 
            current[1][1].getValue() == player.token && 
            current[2][1].getValue() == player.token) {
                endGame(player.name);
            } else if (current[0][2].getValue() == player.token && 
            current[1][2].getValue() == player.token && 
            current[2][2].getValue() == player.token) {
                endGame(player.name);
            }
            //check diagonals
            else if (current[0][0].getValue() == player.token && 
            current[1][1].getValue() == player.token && 
            current[2][2].getValue() == player.token) {
                endGame(player.name);
            }
            else if (current[2][0].getValue() == player.token && 
            current[1][1].getValue() == player.token && 
            current[0][2].getValue() == player.token) {
                endGame(player.name);
            }
            //no win so far => check for tie
            else if (nthRound == 9) {
                endGame("tie");
            }
            //no win, no tie, the game continues
            else {
                switchPlayer();
                printRound();
            }
        }
        //The move was invalid
        else {
            console.log("That cell is already taken. Play again.");
            printRound();
        }
    };

    //the initial board
    printRound();

    return { playRound };
};

const game = GameController();