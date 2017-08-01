function makeGrid(x, y) {
    var grid = new Array(x);
    for (var i = 0; i < x; i++) {
        grid[i] = new Array(y);
        for (var j = 0; j < y; j++) grid[i][j] = 0;
    }
    return grid;
}

function randGrid(grid, car_N) {
    for (var i = 0; i < car_N;) {
        var tx = Math.floor(Math.random() * (grid.length));
        var ty = Math.floor(Math.random() * (grid[0].length));
        if (grid[tx][ty] == 0) {
            grid[tx][ty] = Math.floor(Math.random() * 2 + 1);
            i++;
        }
    }
    return grid;
}

function drawGrid(x, y) {
    var hT = "<table cellpadding='0' cellspacing='1'>";
    for (var i = 0; i < x; i++) {
        hT += "<tr>";
        for (var j = 0; j < y; j++) {
            hT += "<td id='cell" + i + '_' + j + "'>";
            hT += "</td>";
        }
        hT += "</tr>";
    }
    document.getElementById("caf").innerHTML = hT + "</table>";
}

function showCars(grid) {
    for (var i = 0; i < grid.length; i++) {
        for (var j = 0; j < grid[0].length; j++) {
            var temp = "cell" + i + "_" + j;
            if (grid[i][j] == 1)
                document.getElementById(temp).className = "blue";
            else if (grid[i][j] == 2)
                document.getElementById(temp).className = "red";
            else if (grid[i][j] == 3)
                document.getElementById(temp).className = "blueHalt";
            else if (grid[i][j] == 4)
                document.getElementById(temp).className = "redHalt";
            else
                document.getElementById(temp).className = "";
        }
    }
}

function isSafe(grid, a, b) {
    return (grid[a][b] == 0);
}

function isBlue(grid, a, b) {
    return (grid[a][b] % 2);
}

function isRed(grid, a, b) {
    return (!(grid[a][b] % 2));
}

function moveCarsRed(grid) {
    for (var j = 0; j < grid[0].length; j++) {
        var emptyCell = grid.length - 1;
        for (; emptyCell >=0; emptyCell--) {
            if (!grid[emptyCell][j])
                break;
        }
        if (emptyCell == -1)
            emptyCell = 0;
        for (var i = emptyCell; i < grid.length; i++) {
            if (grid[i][j] == 2 || grid[i][j] == 4) {
                if (i == 0 && isSafe(grid, grid.length - 1, j)) {
                    grid[grid.length - 1][j] = 6;
                    grid[i][j] = 0;
                }
                else if (i > 0 && isSafe(grid, i - 1, j)) {
                    grid[i - 1][j] = 2;
                    grid[i][j] = 0;
                }
                else {
                    grid[i][j] = 4
                }
            }
        }
        for (var i = 0; i < emptyCell; i++) {
            if (grid[i][j] == 2 || grid[i][j] == 4) {
                if (i == 0 && isSafe(grid, grid.length - 1, j)) {
                    grid[grid.length - 1][j] = 6;
                    grid[i][j] = 0;
                }
                else if (i > 0 && isSafe(grid, i - 1, j)) {
                    grid[i - 1][j] = 2;
                    grid[i][j] = 0;
                }
                else {
                    grid[i][j] = 4
                }
            }
        }
        if (grid[grid.length - 1][j] == 6) {
            grid[grid.length - 1][j] = 2;
        }
    }
    for (var i = 0; i < grid.length; i++) {
        var emptyCell = 0;
        for (; emptyCell < grid[0].length; emptyCell++) {
            if (!grid[i][emptyCell])
                break;
        }
        if (emptyCell == grid[0].length)
            emptyCell = grid[0].length - 1;
        for (var j = emptyCell; j >= 0; j--) {
            if (grid[i][j] == 1 || grid[i][j] == 3) {
                if (i == grid.length - 1 && j == grid[0].length - 1 && isSafe(grid, i, 0) && (isSafe(grid, 0, 0) || isBlue(grid, 0, 0))) {
                    grid[i][0] = 5;
                    grid[i][j] = 0;
                }
                else if (i != grid.length - 1 && j == grid[0].length - 1 && isSafe(grid, i, 0) && (isSafe(grid, i + 1, 0) || isBlue(grid, i + 1, 0))) {
                    grid[i][0] = 5;
                    grid[i][j] = 0;
                }
                else if (i == grid.length - 1 && isSafe(grid, i, j + 1) && (isSafe(grid, 0, j + 1) || isBlue(grid, 0, j + 1))) {
                    grid[i][j + 1] = 1;
                    grid[i][j] = 0;
                }
                else if (i < grid.length - 1 && j < grid[0].length - 1 && isSafe(grid, i, j + 1) && (isSafe(grid, i + 1, j + 1) || isBlue(grid, i + 1, j + 1))) {
                    grid[i][j + 1] = 1;
                    grid[i][j] = 0;
                }
                else {
                    grid[i][j] = 3
                }
            }
        }
        for (var j = grid[0].length - 1; j > emptyCell; j--) {
            if (grid[i][j] == 1 || grid[i][j] == 3) {
                if (i == grid.length - 1 && j == grid[0].length - 1 && isSafe(grid, i, 0) && (isSafe(grid, 0, 0) || isBlue(grid, 0, 0))) {
                    grid[i][0] = 5;
                    grid[i][j] = 0;
                }
                else if (i != grid.length - 1 && j == grid[0].length - 1 && isSafe(grid, i, 0) && (isSafe(grid, i + 1, 0) || isBlue(grid, i + 1, 0))) {
                    grid[i][0] = 5;
                    grid[i][j] = 0;
                }
                else if (i == grid.length - 1 && isSafe(grid, i, j + 1) && (isSafe(grid, 0, j + 1) || isBlue(grid, 0, j + 1))) {
                    grid[i][j + 1] = 1;
                    grid[i][j] = 0;
                }
                else if (i < grid.length - 1 && j < grid[0].length - 1 && isSafe(grid, i, j + 1) && (isSafe(grid, i + 1, j + 1) || isBlue(grid, i + 1, j + 1))) {
                    grid[i][j + 1] = 1;
                    grid[i][j] = 0;
                }
                else {
                    grid[i][j] = 3
                }
            }
        }
        if (grid[i][0]==5){
            grid[i][0]=1;
        }
    }
    return grid;
}

function moveCarsBlue(grid) {
    for (var i = 0; i < grid.length; i++) {
        var emptyCell = 0;
        for (; emptyCell < grid[0].length; emptyCell++) {
            if (!grid[i][emptyCell])
                break;
        }
        if (emptyCell == grid[0].length)
            emptyCell = grid[0].length - 1;
        for (var j = emptyCell; j >= 0; j--) {
            if (grid[i][j] == 1 || grid[i][j] == 3) {
                if (j == grid[0].length - 1 && isSafe(grid, i, 0)) {
                    grid[i][0] = 5;
                    grid[i][j] = 0;
                }
                else if (j < grid[0].length - 1 && isSafe(grid, i, j + 1)) {
                    grid[i][j + 1] = 1;
                    grid[i][j] = 0;
                }
                else {
                    grid[i][j] = 3
                }
            }
        }
        for (var j = grid[0].length - 1; j > emptyCell; j--) {
            if (grid[i][j] == 1 || grid[i][j] == 3) {
                if (j == grid[0].length - 1 && isSafe(grid, i, 0)) {
                    grid[i][0] = 5;
                    grid[i][j] = 0;
                }
                else if (j < grid[0].length - 1 && isSafe(grid, i, j + 1)) {
                    grid[i][j + 1] = 1;
                    grid[i][j] = 0;
                }
                else {
                    grid[i][j] = 3
                }
            }
        }
    if (grid[i][0] == 5) {
            grid[i][0] = 1
        }
    }
    for (var j = 0; j < grid[0].length; j++) {

        var emptyCell = grid.length - 1;
        for (; emptyCell >=0; emptyCell--) {
            if (!grid[emptyCell][j])
                break;
        }
        if (emptyCell == -1)
            emptyCell = 0;
        for (var i = emptyCell; i < grid.length; i++) {
            if (grid[i][j] == 2 || grid[i][j] == 4) {
                if (i == 0 && j == 0 && isSafe(grid, grid.length - 1, 0) && (isSafe(grid, grid.length - 1, grid[0].length - 1) || isRed(grid, grid.length - 1, grid[0].length - 1))) {
                    grid[grid.length - 1][j] = 6;
                    grid[i][j] = 0;
                }
                else if (i != 0 && j == 0 && isSafe(grid, i - 1, j) && (isSafe(grid, i - 1, grid[0].length - 1) || isRed(grid, i - 1, grid[0].length - 1))) {
                    grid[i - 1][j] = 2;
                    grid[i][j] = 0;
                }
                else if (i == 0 && isSafe(grid, grid.length - 1, j) && (isSafe(grid, grid.length - 1, j - 1) || isRed(grid, grid.length - 1, j - 1))) {
                    grid[grid.length - 1][j] = 6;
                    grid[i][j] = 0;
                }
                else if (i > 0 && j > 0 && isSafe(grid, i - 1, j) && (isSafe(grid, i - 1, j - 1) || isRed(grid, i - 1, j - 1))) {
                    grid[i - 1][j] = 2;
                    grid[i][j] = 0;
                }
                else {
                    grid[i][j] = 4
                }
            }
        }
        for (var i = 0; i < emptyCell; i++) {
            if (grid[i][j] == 2 || grid[i][j] == 4) {
                if (i == 0 && j == 0 && isSafe(grid, grid.length - 1, 0) && (isSafe(grid, grid.length - 1, grid[0].length - 1) || isRed(grid, grid.length - 1, grid[0].length - 1))) {
                    grid[grid.length - 1][j] = 6;
                    grid[i][j] = 0;
                }
                else if (i != 0 && j == 0 && isSafe(grid, i - 1, j) && (isSafe(grid, i - 1, grid[0].length - 1) || isRed(grid, i - 1, grid[0].length - 1))) {
                    grid[i - 1][j] = 2;
                    grid[i][j] = 0;
                }
                else if (i == 0 && isSafe(grid, grid.length - 1, j) && (isSafe(grid, grid.length - 1, j - 1) || isRed(grid, grid.length - 1, j - 1))) {
                    grid[grid.length - 1][j] = 6;
                    grid[i][j] = 0;
                }
                else if (i > 0 && j > 0 && isSafe(grid, i - 1, j) && (isSafe(grid, i - 1, j - 1) || isRed(grid, i - 1, j - 1))) {
                    grid[i - 1][j] = 2;
                    grid[i][j] = 0;
                }
                else {
                    grid[i][j] = 4
                }
            }
        }
    if (grid[grid.length - 1][j] == 6) {
            grid[grid.length - 1][j] = 2
        }
    }
    return grid;
}

function verCar(verPrior) {
    return (Math.random() <= verPrior) ? 1 : 0;
}

function moveCar(grid, i1, j1, i2, j2) {
    if (verCar(verPrior)) {
        grid[i1 - 1][j1] = grid[i1][j1];
        grid[i1][j1] = 0;
    }
    else {
        grid[i2][j2 + 1] = grid[i2][j2];
        grid[i2][j2] = 0;
    }
}

function moveCarsVer(grid) {
    for (var i = 0; i < grid.length; i++) {
        for (var j = 0; j < grid[0].length; j++) {
///////////////////////////////////////////////////
        }
    }
}

var x, y, prior, verPrior, car_N;
var grid;
var timer = -1;

function oneStep() {
    prior = $('input[name=Prior]:checked').val()
    if (prior == "Red") {
        grid = moveCarsRed(grid);
        showCars(grid);
    }
    else if (prior == "Blue") {
        grid = moveCarsBlue(grid);
        showCars(grid);
    }
    else {
        grid = moveCarsVer(grid);
        showCars(grid);
    }
}

document.getElementById('Submit_Par').onclick = function () {
    x = parseInt($('#Set_X').val());
    y = parseInt($('#Set_Y').val());
    car_N = parseInt($('#Car_N').val());
    verPrior = parseFloat($('#verPrior').val());
    grid = randGrid(makeGrid(x, y), car_N);
    drawGrid(x, y);
    showCars(grid);
}

document.getElementById('Tick').onclick = function () {
    oneStep();
}

document.getElementById('Cont').onclick = function () {
    var timeStep = parseInt($('#timeStep').val());
    if (timer == -1) {
        timer = setInterval('oneStep()', timeStep);
    }
    else {
        clearInterval(timer);
        timer = -1;
    }
}