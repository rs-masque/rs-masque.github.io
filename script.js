function makeGrid(x, y) {
    var grid = new Array(x);
    for (var i = 0; i < y; i++) {
        grid[i] = new Array(y);
        for (var j=0;j<y;j++) grid[i][j]=0;
    }
    return grid;
}

// function cloneGrid(oldGrid) {
//     var newGrid = new Array(oldGrid.length);
//     for (var i=0; i < oldGrid.length; i++){
//         newGrid[i] = new Array(oldGrid[i].length);
//         newGrid[i] = oldGrid[i].slice(0);
//     }
//     return newGrid;
// }

function randGrid(grid) {
    var temp = 0;
    for (var i=0; i<grid.length;i++){
        for (var j=0; j<grid[i].length;j++) {
            grid[i][j] = Math.floor(Math.random() * (3));
            temp++;
            if (temp > 60){
                return grid;
            }
        }
    }
    return grid;
}

function drawGrid(x,y) {
    var hT = "<table cellpadding='0' cellspacing='1'>";
    for (var j = 0; j < y; j++) {
        hT += "<tr>";
        for (var i = 0; i < x; i++) {
            hT += "<td id='cell"+j+i+"'>";
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

function moveCars(grid) {
    for (var j = 0; j < grid[0].length; j++) {
        for (var i = 0; i < grid.length; i++) {
            if (grid[i][j] == 2 || grid[i][j] == 4) {
                if (i == 0 && isSafe(grid, y - 1, j)) {
                    grid[y - 1][j] = 6;
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
        for (var j = grid[i].length; j >= 0; j--) {
            if (grid[i][j] == 1 || grid[i][j] == 3) {
                if (j == x - 1 && isSafe(grid, i, 0)) {
                    grid[i][0] = 5;
                    grid[i][j] = 0;
                }
                else if (j < x - 1 && isSafe(grid, i, j + 1)) {
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


var x=10
var y=10

drawGrid(x,y);
var grid  = randGrid(makeGrid(x,y));
showCars(grid);

document.getElementById('Tick').onclick = function() {
    grid = moveCars(grid);
    showCars(grid);
}
