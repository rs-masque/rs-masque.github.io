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
            hT += "<td id='cell" + i + '_' + j + "'onclick='CellClick("+i+","+j+");'>";
            hT += "</td>";
        }
        hT += "</tr>";
    }
    document.getElementById("caf").innerHTML = hT + "</table>";
}

function drawXSpeed(x) {
    var hT = "<table cellpadding='0' cellspacing='1'>";
    for (var i = 0; i < x; i++) {
        hT += "<tr>";
        hT += "<td  align='center' id='Ycell" + i + "'>" + ((xsp[i]/xcon[i])?xsp[i]/xcon[i]:0).toFixed(2);
        hT += "</td>";
        hT += "</tr>";
    }
    document.getElementById("xspeed").innerHTML = hT + "</table>";
}

function drawYSpeed(y) {
    var hT = "<table cellpadding='0' cellspacing='1'>";
    hT += "<tr>";
    for (var i = 0; i < y; i++) {
        hT += "<td align='center' id='Xcell" + i + "'>" + ((ysp[i]/ycon[i])?ysp[i]/ycon[i]:0).toFixed(2);
        hT += "</td>";
    }
    hT += "</tr>";
    document.getElementById("yspeed").innerHTML = hT + "</table>";
}

function drawASpeed() {
    var sumsp = 0;
    var sumcon = 0;
    for (var i = 0; i < xsp.length; i++){
        sumsp += xsp[i];
        sumcon += xcon[i];
    }
    for (var i = 0; i < ysp.length; i++){
        sumsp += ysp[i];
        sumcon += ycon[i];
    }

    var hT = "<table cellpadding='0' cellspacing='1'>";
    hT += "<tr>";
    hT += "<td align='center'>" + ((sumsp/sumcon)?sumsp/sumcon:0).toFixed(2);
    hT += "</td>";
    hT += "</tr>";
    document.getElementById("aspeed").innerHTML = hT + "</table>";
}

function CellClick(a,b) {
    a = parseInt(a);
    b = parseInt(b);
    grid[a][b]++;
    if (grid[a][b] >= 3){
        grid[a][b] = 0;
    }
    showCars(grid);
}

function showCars(grid) {
    for (var i = 0; i < grid.length; i++) {
        for (var j = 0; j < grid[0].length; j++) {
            var temp = "cell" + i + "_" + j;
            if (prior == "Red" || prior == "Blue"){
                if (grid[i][j] == 1)
                    document.getElementById(temp).className = "blue";
                else if (grid[i][j] == 2)
                    document.getElementById(temp).className = "red";
                else if (grid[i][j] == 3 || grid[i][j] == 7)
                    document.getElementById(temp).className = "blueHalt";
                else if (grid[i][j] == 4 || grid[i][j] == 8)
                    document.getElementById(temp).className = "redHalt";
                else
                    document.getElementById(temp).className = "";
            }
            else {
                if (grid[i][j] == 3)
                    document.getElementById(temp).className = "blue";
                else if (grid[i][j] == 4)
                    document.getElementById(temp).className = "red";
                else if (grid[i][j] == 1)
                    document.getElementById(temp).className = "blueHalt";
                else if (grid[i][j] == 2)
                    document.getElementById(temp).className = "redHalt";
                else if (grid[i][j] == 7)
                    document.getElementById(temp).className = "bluePriorHalt";
                else if (grid[i][j] == 8)
                    document.getElementById(temp).className = "redPriorHalt";
                else
                    document.getElementById(temp).className = "";
            }
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
    for (var i = 0; i < grid.length; i++){
        for (var j = 0; j < grid[0].length; j++){
            if (grid[i][j] == 7){
                grid[i][j] = 3;
            }
            else if (grid[i][j] == 8){
                grid[i][j] = 4;
            }
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
                if (i == 0 && isSafe(grid, grid.length - 1, j)) {
                    grid[grid.length - 1][j] = 6;
                    grid[i][j] = 0;
                    ysp[j]++;
                }
                else if (i > 0 && isSafe(grid, i - 1, j)) {
                    grid[i - 1][j] = 2;
                    grid[i][j] = 0;
                    ysp[j]++;
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
                    ysp[j]++;
                }
                else if (i > 0 && isSafe(grid, i - 1, j)) {
                    grid[i - 1][j] = 2;
                    grid[i][j] = 0;
                    ysp[j]++;
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
                if (j == grid[0].length - 1 && isSafe(grid, i, 0)) {
                    grid[i][0] = 5;
                    grid[i][j] = 0;
                    xsp[i]++;
                }
                else if (j < grid[0].length - 1 && isSafe(grid, i, j + 1)) {
                    grid[i][j + 1] = 1;
                    grid[i][j] = 0;
                    xsp[i]++;
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
                    xsp[i]++;
                }
                else if (j < grid[0].length - 1 && isSafe(grid, i, j + 1)) {
                    grid[i][j + 1] = 1;
                    grid[i][j] = 0;
                    xsp[i]++;
                }
                else {
                    grid[i][j] = 3
                }
            }
        }
        if (grid[i][0] == 5) {
            grid[i][0] = 1
        }
        // for (var j = emptyCell; j >= 0; j--) {
        //     if (grid[i][j] == 1 || grid[i][j] == 3) {
        //         if (i == grid.length - 1 && j == grid[0].length - 1 && isSafe(grid, i, 0) && (isSafe(grid, 0, 0) || isBlue(grid, 0, 0))) {
        //             grid[i][0] = 5;
        //             grid[i][j] = 0;
        //         }
        //         else if (i != grid.length - 1 && j == grid[0].length - 1 && isSafe(grid, i, 0) && (isSafe(grid, i + 1, 0) || isBlue(grid, i + 1, 0))) {
        //             grid[i][0] = 5;
        //             grid[i][j] = 0;
        //         }
        //         else if (i == grid.length - 1 && isSafe(grid, i, j + 1) && (isSafe(grid, 0, j + 1) || isBlue(grid, 0, j + 1))) {
        //             grid[i][j + 1] = 1;
        //             grid[i][j] = 0;
        //         }
        //         else if (i < grid.length - 1 && j < grid[0].length - 1 && isSafe(grid, i, j + 1) && (isSafe(grid, i + 1, j + 1) || isBlue(grid, i + 1, j + 1))) {
        //             grid[i][j + 1] = 1;
        //             grid[i][j] = 0;
        //         }
        //         else {
        //             grid[i][j] = 3
        //         }
        //     }
        // }
        // for (var j = grid[0].length - 1; j > emptyCell; j--) {
        //     if (grid[i][j] == 1 || grid[i][j] == 3) {
        //         if (i == grid.length - 1 && j == grid[0].length - 1 && isSafe(grid, i, 0) && (isSafe(grid, 0, 0) || isBlue(grid, 0, 0))) {
        //             grid[i][0] = 5;
        //             grid[i][j] = 0;
        //         }
        //         else if (i != grid.length - 1 && j == grid[0].length - 1 && isSafe(grid, i, 0) && (isSafe(grid, i + 1, 0) || isBlue(grid, i + 1, 0))) {
        //             grid[i][0] = 5;
        //             grid[i][j] = 0;
        //         }
        //         else if (i == grid.length - 1 && isSafe(grid, i, j + 1) && (isSafe(grid, 0, j + 1) || isBlue(grid, 0, j + 1))) {
        //             grid[i][j + 1] = 1;
        //             grid[i][j] = 0;
        //         }
        //         else if (i < grid.length - 1 && j < grid[0].length - 1 && isSafe(grid, i, j + 1) && (isSafe(grid, i + 1, j + 1) || isBlue(grid, i + 1, j + 1))) {
        //             grid[i][j + 1] = 1;
        //             grid[i][j] = 0;
        //         }
        //         else {
        //             grid[i][j] = 3
        //         }
        //     }
        // }
        if (grid[i][0]==5){
            grid[i][0]=1;
        }
    }
    return grid;
}

function moveCarsBlue(grid) {
    for (var i = 0; i < grid.length; i++){
        for (var j = 0; j < grid[0].length; j++){
            if (grid[i][j] == 7){
                grid[i][j] = 3;
            }
            else if (grid[i][j] == 8){
                grid[i][j] = 4;
            }
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
                if (j == grid[0].length - 1 && isSafe(grid, i, 0)) {
                    grid[i][0] = 5;
                    grid[i][j] = 0;
                    xsp[i]++;
                }
                else if (j < grid[0].length - 1 && isSafe(grid, i, j + 1)) {
                    grid[i][j + 1] = 1;
                    grid[i][j] = 0;
                    xsp[i]++;
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
                    xsp[i]++;
                }
                else if (j < grid[0].length - 1 && isSafe(grid, i, j + 1)) {
                    grid[i][j + 1] = 1;
                    grid[i][j] = 0;
                    xsp[i]++;
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
                if (i == 0 && isSafe(grid, grid.length - 1, j)) {
                    grid[grid.length - 1][j] = 6;
                    grid[i][j] = 0;
                    ysp[j]++;
                }
                else if (i > 0 && isSafe(grid, i - 1, j)) {
                    grid[i - 1][j] = 2;
                    grid[i][j] = 0;
                    ysp[j]++;
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
                    ysp[j]++;
                }
                else if (i > 0 && isSafe(grid, i - 1, j)) {
                    grid[i - 1][j] = 2;
                    grid[i][j] = 0;
                    ysp[j]++;
                }
                else {
                    grid[i][j] = 4
                }
            }
        }
        if (grid[grid.length - 1][j] == 6) {
            grid[grid.length - 1][j] = 2;
        }
        // for (var i = emptyCell; i < grid.length; i++) {
        //     if (grid[i][j] == 2 || grid[i][j] == 4) {
        //         if (i == 0 && j == 0 && isSafe(grid, grid.length - 1, 0) && (isSafe(grid, grid.length - 1, grid[0].length - 1) || isRed(grid, grid.length - 1, grid[0].length - 1))) {
        //             grid[grid.length - 1][j] = 6;
        //             grid[i][j] = 0;
        //         }
        //         else if (i != 0 && j == 0 && isSafe(grid, i - 1, j) && (isSafe(grid, i - 1, grid[0].length - 1) || isRed(grid, i - 1, grid[0].length - 1))) {
        //             grid[i - 1][j] = 2;
        //             grid[i][j] = 0;
        //         }
        //         else if (i == 0 && isSafe(grid, grid.length - 1, j) && (isSafe(grid, grid.length - 1, j - 1) || isRed(grid, grid.length - 1, j - 1))) {
        //             grid[grid.length - 1][j] = 6;
        //             grid[i][j] = 0;
        //         }
        //         else if (i > 0 && j > 0 && isSafe(grid, i - 1, j) && (isSafe(grid, i - 1, j - 1) || isRed(grid, i - 1, j - 1))) {
        //             grid[i - 1][j] = 2;
        //             grid[i][j] = 0;
        //         }
        //         else {
        //             grid[i][j] = 4
        //         }
        //     }
        // }
        // for (var i = 0; i < emptyCell; i++) {
        //     if (grid[i][j] == 2 || grid[i][j] == 4) {
        //         if (i == 0 && j == 0 && isSafe(grid, grid.length - 1, 0) && (isSafe(grid, grid.length - 1, grid[0].length - 1) || isRed(grid, grid.length - 1, grid[0].length - 1))) {
        //             grid[grid.length - 1][j] = 6;
        //             grid[i][j] = 0;
        //         }
        //         else if (i != 0 && j == 0 && isSafe(grid, i - 1, j) && (isSafe(grid, i - 1, grid[0].length - 1) || isRed(grid, i - 1, grid[0].length - 1))) {
        //             grid[i - 1][j] = 2;
        //             grid[i][j] = 0;
        //         }
        //         else if (i == 0 && isSafe(grid, grid.length - 1, j) && (isSafe(grid, grid.length - 1, j - 1) || isRed(grid, grid.length - 1, j - 1))) {
        //             grid[grid.length - 1][j] = 6;
        //             grid[i][j] = 0;
        //         }
        //         else if (i > 0 && j > 0 && isSafe(grid, i - 1, j) && (isSafe(grid, i - 1, j - 1) || isRed(grid, i - 1, j - 1))) {
        //             grid[i - 1][j] = 2;
        //             grid[i][j] = 0;
        //         }
        //         else {
        //             grid[i][j] = 4
        //         }
        //     }
        // }
    if (grid[grid.length - 1][j] == 6) {
            grid[grid.length - 1][j] = 2
        }
    }
    return grid;
}

function verCar(verPrior) {
    return (Math.random() <= verPrior) ? 1 : 0;
}

function moveFree(grid) {
    for (var i = 0; i < grid.length; i++) {
        var emptyCell = 0;
        for (; emptyCell < grid[0].length; emptyCell++) {
            if (!grid[i][emptyCell])
                break;
        }
        if (emptyCell == grid[0].length)
            emptyCell = grid[0].length - 1;
        for (var j = emptyCell; j >= 0; j--) {
            if (grid[i][j] == 1) {
                if (j == grid[0].length - 1 && isSafe(grid, i, 0)) {
                    grid[i][0] = 3;
                    grid[i][j] = 0;
                    xsp[i]++;
                }
                else if (j < grid[0].length - 1 && isSafe(grid, i, j + 1)) {
                    grid[i][j + 1] = 3;
                    grid[i][j] = 0;
                    xsp[i]++;
                }
                else {
                    grid[i][j] = 1
                }
            }
        }
        for (var j = grid[0].length - 1; j > emptyCell; j--) {
            if (grid[i][j] == 1) {
                if (j == grid[0].length - 1 && isSafe(grid, i, 0)) {
                    grid[i][0] = 3;
                    grid[i][j] = 0;
                    xsp[i]++;
                }
                else if (j < grid[0].length - 1 && isSafe(grid, i, j + 1)) {
                    grid[i][j + 1] = 3;
                    grid[i][j] = 0;
                    xsp[i]++;
                }
                else {
                    grid[i][j] = 1;
                }
            }
        }
    }
    for (var j = 0; j < grid[0].length; j++) {
        var emptyCell = grid.length - 1;
        for (; emptyCell >= 0; emptyCell--) {
            if (!grid[emptyCell][j])
                break;
        }
        if (emptyCell == -1)
            emptyCell = 0;
        for (var i = emptyCell; i < grid.length; i++) {
            if (grid[i][j] == 2) {
                if (i == 0 && isSafe(grid, grid.length - 1, j)) {
                    grid[grid.length - 1][j] = 4;
                    grid[i][j] = 0;
                    ysp[j]++;
                }
                else if (i > 0 && isSafe(grid, i - 1, j)) {
                    grid[i - 1][j] = 4;
                    grid[i][j] = 0;
                    ysp[j]++;
                }
                else {
                    grid[i][j] = 2;
                }
            }
        }
        for (var i = 0; i < emptyCell; i++) {
            if (grid[i][j] == 2) {
                if (i == 0 && isSafe(grid, grid.length - 1, j)) {
                    grid[grid.length - 1][j] = 4;
                    grid[i][j] = 0;
                    ysp[j]++;
                }
                else if (i > 0 && isSafe(grid, i - 1, j)) {
                    grid[i - 1][j] = 4;
                    grid[i][j] = 0;
                    ysp[j]++;
                }
                else {
                    grid[i][j] = 2
                }
            }
        }
    }
    return grid;
}

function moveCarsVer(grid) {
    for (var i = 0; i < grid.length; i++){
        for (var j = 0; j < grid[0].length; j++ ) {
            if (grid[i][j] == 3 || grid[i][j] == 7){
                grid[i][j] = 1;
            }
            else if (grid[i][j] == 4 || grid[i][j] == 8){
                grid[i][j] = 2;
            }
        }
    }
    // Ищем конфликты. Стопорим все.
    for (var i = 0; i < grid.length; i++) {
        for (var j = 0; j < grid[0].length; j++){
            if (i < grid.length - 1 && j < grid[0].length - 1) {
                if (isBlue(grid, i, j) && (isRed(grid, i + 1, j + 1) && !isSafe(grid, i + 1, j + 1))) {
                        grid[i][j] = 7;
                        grid[i + 1][j + 1] = 8;
                }
            }
            else if (i == grid.length - 1 && j == grid[0].length - 1) {
                if (isBlue(grid, i, j) && (isRed(grid, 0, 0) && !isSafe(grid, 0, 0))) {
                        grid[i][j] = 7;
                        grid[0][0] = 8;
                }
            }
            else if (i == grid.length - 1) {
                if (isBlue(grid, i, j) && (isRed(grid, 0, j + 1) && !isSafe(grid, 0, j + 1))) {
                        grid[i][j] = 7;
                        grid[0][j + 1] = 8;
                }
            }
            else if (j == grid.length - 1) {
                if (isBlue(grid, i, j) && (isRed(grid, i + 1, 0) && !isSafe(grid, i + 1, 0))) {
                        grid[i][j] = 7;
                        grid[i + 1][0] = 8;
                }
            }
        }
    }
    // Двигаем всё, что движется, помечаем, что подвинули.
    grid = moveFree(grid);
    // Разрешаем конфликты. Снимаем метки с тех, что выиграли.
    for (var i = 0; i < grid.length; i++){
        for (var j = grid[0].length; j >= 0; j--) {
            if (i < grid.length - 1 && j < grid[0].length - 1) {
                if (grid[i][j] == 7){//(isBlue(grid, i, j) && (isRed(grid, i + 1, j + 1) && !isSafe(grid, i + 1, j + 1))) {
                    if (verCar(verPrior)) {
                        grid[i + 1][j + 1] = 2;
                    }
                    else {
                        grid[i][j] = 1;
                    }
                }
            }
            else if (i == grid.length - 1 && j == grid[0].length - 1) {
                if (grid[i][j] == 7){//(isBlue(grid, i, j) && (isRed(grid, 0, 0) && !isSafe(grid, 0, 0))) {
                    if (verCar(verPrior)) {
                        grid[0][0] = 2;
                    }
                    else {
                        grid[i][j] = 1;
                    }
                }
            }
            else if (i == grid.length - 1) {
                if (grid[i][j] == 7){//(isBlue(grid, i, j) && (isRed(grid, 0, j + 1) && !isSafe(grid, 0, j + 1))) {
                    if (verCar(verPrior)) {
                        grid[0][j + 1] = 2;
                    }
                    else {
                        grid[i][j] = 1;
                    }
                }
            }
            else if (j == grid.length - 1) {
                if (grid[i][j] == 7){//(isBlue(grid, i, j) && (isRed(grid, i + 1, 0) && !isSafe(grid, i + 1, 0))) {
                    if (verCar(verPrior)) {
                        grid[i + 1][0] = 2;
                    }
                    else {
                        grid[i][j] = 1;
                    }
                }
            }
        }
    }
    // Двигаем победителей, пока есть необработанные.
    for (var i = 0; i < grid.length; i++) {
        for (var j = 0; j < grid[0].length; j++) {
            if (grid[i][j] == 1 || grid[i][j] == 2){
                grid = moveFree(grid);
            }
        }
    }
    return grid;
}

function oneStep() {
    prior = $('input[name=Prior]:checked').val()
    verPrior = parseFloat($('#verPrior').val());
    if (verPrior > 1){
        alert("Вероятность не может быть больше 1.");
        return;
    }

    for (var i = 0; i < grid.length; i++){
        for (var j = 0; j < grid[0].length; j++){
            if (grid[i][j]){
                if (isBlue(grid, i, j)){
                    xcon[i]++;
                }
                else if (isRed(grid, i, j)){
                    ycon[j]++;
                }
            }
        }
    }

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
    drawASpeed();
    drawXSpeed(x);
    for (var i = 0; i < x; i++) {
        xsp[i] = 0;
        xcon[i] = 0;
    }
    drawYSpeed(y);
    for (var i = 0; i < y; i++) {
        ysp[i] = 0;
        ycon[i] = 0;
    }
}

var x, y, prior, verPrior, car_N;
var grid;
var timer = -1;
var xsp, ysp, xcon, ycon;

document.getElementById('Submit_Par').onclick = function () {
    x = parseInt($('#Set_X').val());
    y = parseInt($('#Set_Y').val());
    car_N = parseInt($('#Car_N').val());
    if (x*y<car_N) {
        alert("Количество машин больше количества клеток поля.");
        return;
    }
    verPrior = parseFloat($('#verPrior').val());
    if (verPrior > 1){
        alert("Вероятность не может быть больше 1.");
        return;
    }
    xsp = new Array(x);
    xcon = new Array(x);

    for (var i = 0; i < x; i++) {
        xsp[i] = 0;
        xcon[i] = 0;
    }
    ysp = new Array(y);
    ycon = new Array(y);

    for (var i = 0; i < y; i++) {
        ysp[i] = 0;
        ycon[i] = 0;
    }


    grid = randGrid(makeGrid(x, y), car_N);
    drawGrid(x, y);
    drawXSpeed(x);
    drawYSpeed(y);
    drawASpeed();
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

// function moveCarsVer(grid) {
//     if (verCar(verPrior)){
//         grid = moveCarsRed(grid);
//         showCarsPR(grid);
//     }
//     else {
//         grid = moveCarsBlue(grid);
//         showCarsPB(grid);
//     }
//     return grid;
// }
// function showCarsPR(grid) {
//     for (var i = 0; i < grid.length; i++) {
//         for (var j = 0; j < grid[0].length; j++) {
//             var temp = "cell" + i + "_" + j;
//             if (grid[i][j] == 1)
//                 document.getElementById(temp).className = "blue";
//             else if (grid[i][j] == 2)
//                 document.getElementById(temp).className = "redPrior";
//             else if (grid[i][j] == 3)
//                 document.getElementById(temp).className = "blueHalt";
//             else if (grid[i][j] == 4)
//                 document.getElementById(temp).className = "redPriorHalt";
//             else
//                 document.getElementById(temp).className = "";
//         }
//     }
// }
//
// function showCarsPB(grid) {
//     for (var i = 0; i < grid.length; i++) {
//         for (var j = 0; j < grid[0].length; j++) {
//             var temp = "cell" + i + "_" + j;
//             if (grid[i][j] == 1)
//                 document.getElementById(temp).className = "bluePrior";
//             else if (grid[i][j] == 2)
//                 document.getElementById(temp).className = "red";
//             else if (grid[i][j] == 3)
//                 document.getElementById(temp).className = "bluePriorHalt";
//             else if (grid[i][j] == 4)
//                 document.getElementById(temp).className = "redHalt";
//             else
//                 document.getElementById(temp).className = "";
//         }
//     }
// }