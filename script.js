function makeGrid(x, y) {
    var grid = new Array(x);
    for (var i = 0; i < x; i++) {
        grid[i] = new Array(y);
        for (var j=0; j<y ;j++) grid[i][j]=0;
    }
    return grid;
}

function randGrid(grid, car_N) {
    for (var i=0; i < car_N;){
        var tx = Math.floor(Math.random() * (grid.length));
        var ty = Math.floor(Math.random() * (grid[0].length));
        if (grid[tx][ty] == 0) {
            grid[tx][ty] = Math.floor(Math.random() * 2 + 1);
            i++;
            }
    }
    return grid;
}

function drawGrid(x,y) {
    var hT = "<table cellpadding='0' cellspacing='1'>";
    for (var i = 0; i < x; i++) {
        hT += "<tr>";
        for (var j = 0; j < y; j++){
            hT += "<td id='cell"+i+j+"'>";
            hT += "</td>";
        }
        hT += "</tr>";
    }
    document.getElementById("caf").innerHTML = hT + "</table>";
}

function showCars(grid) {
    for (var i=0; i<grid.length;i++){
        for (var j=0; j<grid[i].length;j++){
            var temp = "cell"+i+j;
            if (grid[i][j]==1)
                document.getElementById(temp).className="blue";
            else if (grid[i][j]==2)
                document.getElementById(temp).className="red";
            else if (grid[i][j]==3)
                document.getElementById(temp).className="blueHalt";
            else if (grid[i][j]==4)
                document.getElementById(temp).className="redHalt";
            else
                document.getElementById(temp).className="";
        }
    }
}

function isSafe(grid,a,b) {
    return (grid[a][b] == 0);
}
function isBlue(grid,a,b) {
    return (grid[a][b] % 2);
}

function moveCars(grid) {
    for (var j = 0; j < grid[0].length; j++) {
        for (var i = 0; i < grid.length; i++) {
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
            else if (grid[i][j] == 6){
                grid[i][j] = 2
            }
        }
    }
    for (var i = 0; i < grid.length; i++) {
        for (var j = grid[0].length - 1; j >= 0; j--) {
            if (grid[i][j] == 1 || grid[i][j] == 3) {
                if (i == grid.length-1 && j == grid[0].length -1 && isSafe(grid, i, 0) && (isSafe(grid, 0, 0)|| isBlue(grid,0,0))){
                    grid[i][0] = 5;
                    grid[i][j] = 0;
                }
                else if (i == grid.length - 1 && isSafe(grid, i, j + 1) && (isSafe(grid, 0, j + 1) || isBlue(grid, 0, j+1))) {
                    grid[i][j + 1] = 1;
                    grid[i][j] = 0;
                }
                else if (j == grid[0].length - 1 && isSafe(grid, i, 0) && (isSafe(grid, i + 1, 0) || isBlue(grid, i+1,0))) {
                    grid[i][0] = 5;
                    grid[i][j] = 0;
                }
                else if (i < grid.length - 1 && j < grid[0].length - 1 && isSafe(grid, i, j + 1) && (isSafe(grid, i + 1, j + 1) || isBlue(grid, i+1,j+1))) {
                    grid[i][j + 1] = 1;
                    grid[i][j] = 0;
                }
                else {
                    grid[i][j] = 3
                }
            }
            else if (grid[i][j] == 5){
                    grid[i][j] = 1
            }
        }
    }
    return grid;
}

var x, y, prior, car_N;
var grid;

document.getElementById('Submit_Par').onclick = function() {
    x = parseInt($('#Set_X').val());
    y = parseInt($('#Set_Y').val());
    car_N = parseInt($('#Car_N').val());
    prior = parseFloat($('#verPrior'));
    grid = randGrid(makeGrid(x,y), car_N);
    drawGrid(x,y);
    showCars(grid);
}

document.getElementById('Tick').onclick = function() {
    grid = moveCars(grid);
    showCars(grid);
}
