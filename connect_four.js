function assignIds() {
    var buttons = document.querySelectorAll('button');
    for (let i = 0; i < buttons.length; i++) {
        var button = buttons[i];
        button.setAttribute('id',i);
        button.setAttribute('value','empty');
        button.addEventListener('click',addChip);
        button.style.backgroundColor = "";
    }
}

function generateButtonArray() {
    var values = [];
    var row = [];
    var buttons = document.querySelectorAll('button');
    for (let i = 0; i < buttons.length; i++) {
        var button = buttons[i];
        row.push(button);
        if (row.length === 7) {
            values.push(row);
            row = [];
        } 
    }
    return values
}

function changePlayer(params) {
    if (currentPlayer === 'blue') {
        currentPlayer = 'red';
    } else {
        currentPlayer = 'blue';
    }
    playerDisplay.text("Current Player: " + currentPlayer);
}

function checkForWinner() {
    function diagRowChecker(row_i) {
        for (let col_i = 0; col_i < 4; col_i++) {
            var start = values[row_i][col_i].value;
            var second = values[row_i+1][col_i+1].value;
            var third = values[row_i+2][col_i+2].value;
            var fourth = values[row_i+3][col_i+3].value;
            if (start === second && start !== "empty") {
                if (second === third && third === fourth) {
                    winner = start;
                }
            }
            
        }
    }
    var values = generateButtonArray();
    //row check
    var prev = "";
    var count = 0;
    values.forEach(row => {
        row.forEach(button =>{
            var value = button.getAttribute('value');
            if (value === prev && count === 2 && value !== "empty") {
                winner = value;
            } else if (value === prev && value !== "empty") {
                count++;
            } else {
                prev = value;
                count = 0;
            }
        });
    });
    //column check
    prev = "";
    count = 0;
    for (let i = 0; i < 7; i++) {
        values.forEach(row => {
            var value = row[i].getAttribute('value');
            if (value === prev && count === 2 && value !== "empty") {
                winner = value;
            } else if (value === prev && value !== "empty") {
                count++;
            } else {
                prev = value;
                count = 0;
            }
        });
        console.log("column " + i + " count " + count);
    }
    
    //diag check
    values.reverse();
    for (let row_i = 0; row_i < 2; row_i++) {
        diagRowChecker(row_i)
    }
    //reverse all rows to check opposite diag
    values.forEach(row => {
        row.reverse();
    });
    //run again to check opposite diags
    for (let row_i = 0; row_i < 2; row_i++) {
        diagRowChecker(row_i)
    }
    

    //update if winner
    if (winner) {
        playerDisplay.text(winner + " wins!");
        setTimeout(function(){
            assignIds();
            winner = false;
            currentPlayer = 'blue';
            playerDisplay.text("Current Player: blue");
        },5000);
    }
}

function addChip() {
    if (!winner) {
        var values = generateButtonArray();
        values.reverse();
        if (this.id > 6) {
            var column = this.id % 7;
        } else {
            var column = this.id;
        }
        for (let i = 0; i < values.length; i++) {
            var columnOfInterest = values[i][column];
            if (columnOfInterest.getAttribute('value') === "empty") {
                columnOfInterest.style.backgroundColor = currentPlayer;
                columnOfInterest.setAttribute('value',currentPlayer);
                changePlayer();
                checkForWinner(values);
                break;
            }
        }
    }
}

var winner = false;
var currentPlayer = 'blue';
var playerDisplay = $('#player-display');
playerDisplay.text("Current Player: " + currentPlayer);
assignIds();
console.log(generateButtonArray())


