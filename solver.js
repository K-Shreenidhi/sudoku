const boardElement = document.getElementById("sudoku-board");

createBoard();

function createBoard() {

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {

            const cell = document.createElement("input");
            cell.type = "text";
            cell.maxLength = "1";

            /* allow only numbers 1-9 */
            cell.addEventListener("input", () => {
                cell.value = cell.value.replace(/[^1-9]/g, "");
            });

            boardElement.appendChild(cell);

        }
    }

}

/* read values from UI */
function getBoardValues() {

    const cells = boardElement.querySelectorAll("input");
    let board = [];

    for (let i = 0; i < 9; i++) {

        board.push([]);

        for (let j = 0; j < 9; j++) {

            let value = cells[i * 9 + j].value;
            board[i].push(value === "" ? "." : value);

        }

    }

    return board;

}

/* write solution to UI */
function setBoardValues(board) {

    const cells = boardElement.querySelectorAll("input");

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {

            cells[i * 9 + j].value =
                board[i][j] === "." ? "" : board[i][j];

        }
    }

}

/* button: solve */
function solveSudoku() {

    let board = getBoardValues();

    if (solve(board)) {
        setBoardValues(board);
    } else {
        alert("No solution exists!");
    }

}

/* button: clear */
function clearBoard() {

    const cells = boardElement.querySelectorAll("input");

    cells.forEach(cell => {
        cell.value = "";
    });

}

const EMPTY = ".";

function solve(board) {

    let emptyspaces = [];

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {

            if (board[i][j] === EMPTY) {
                emptyspaces.push({ row: i, col: j });
            }

        }
    }

    function recurse(index) {

        if (index >= emptyspaces.length) {
            return true;
        }

        const { row, col } = emptyspaces[index];

        for (let num = 1; num <= 9; num++) {

            let value = num.toString();

            if (isValid(value, row, col, board)) {

                board[row][col] = value;

                if (recurse(index + 1)) {
                    return true;
                }

                board[row][col] = EMPTY;

            }

        }

        return false;

    }

    return recurse(0);

}

/* validation check */
function isValid(number, row, col, board) {

    for (let i = 0; i < 9; i++) {

        if (board[row][i] === number) return false;
        if (board[i][col] === number) return false;

    }

    let startrow = Math.floor(row / 3) * 3;
    let startcol = Math.floor(col / 3) * 3;

    for (let i = startrow; i < startrow + 3; i++) {
        for (let j = startcol; j < startcol + 3; j++) {

            if (board[i][j] === number) return false;

        }
    }

    return true;

}
