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
        if (grid[tx][ty] === 0) {
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
            hT += "<td id='cell" + i + '_' + j + "' onclick='CellClick(" + i + "," + j + ");'>";
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
        hT += "<td  align='center' id='Ycell" + i + "'>" + ((xsp[i] / xcon[i]) ? xsp[i] / xcon[i] : 0).toFixed(2);
        hT += "</td>";
        hT += "</tr>";
    }
    document.getElementById("xspeed").innerHTML = hT + "</table>";
}

function drawYSpeed(y) {
    var hT = "<table cellpadding='0' cellspacing='1'>";
    hT += "<tr>";
    for (var i = 0; i < y; i++) {
        hT += "<td align='center' id='Xcell" + i + "'>" + ((ysp[i] / ycon[i]) ? ysp[i] / ycon[i] : 0).toFixed(2);
        hT += "</td>";
    }
    hT += "</tr>";
    document.getElementById("yspeed").innerHTML = hT + "</table>";
}

function drawASpeed() {
    sumsp = 0;
    sumcon = 0;
    for (var i = 0; i < xsp.length; i++) {
        sumsp += xsp[i];
        sumcon += xcon[i];
    }
    for (i = 0; i < ysp.length; i++) {
        sumsp += ysp[i];
        sumcon += ycon[i];
    }

    var hT = "<table cellpadding='0' cellspacing='1'>";
    hT += "<tr>";
    hT += "<td align='center'>" + ((sumsp / sumcon) ? sumsp / sumcon : 0).toFixed(2);
    hT += "</td>";
    hT += "</tr>";
    document.getElementById("aspeed").innerHTML = hT + "</table>";
}

function CellClick(a, b) {
    a = parseInt(a);
    b = parseInt(b);
    grid[a][b]++;
    if (grid[a][b] >= 3) {
        grid[a][b] = 0;
    }
    showCars(grid);
}

function showCars(grid) {
   for (var i = 0; i < grid.length; i++) {
        for (var j = 0; j < grid[0].length; j++) {
            var temp = "cell" + i + "_" + j;
            if (prior === "Red" || prior === "Blue" || rule === "R184") {
                if (grid[i][j] === 1)
                    document.getElementById(temp).className = "blue";
                else if (grid[i][j] === 2)
                    document.getElementById(temp).className = "red";
                else if (grid[i][j] === 3)
                    document.getElementById(temp).className = "blueHalt";
                else if (grid[i][j] === 4)
                    document.getElementById(temp).className = "redHalt";
                else if (grid[i][j] === 7)
                    document.getElementById(temp).className = "bluePriorHalt";
                else if (grid[i][j] === 8)
                    document.getElementById(temp).className = "redPriorHalt";
                else
                    document.getElementById(temp).className = "";
            }
            else {
                if (grid[i][j] === 3)
                    document.getElementById(temp).className = "blue";
                else if (grid[i][j] === 4)
                    document.getElementById(temp).className = "red";
                else if (grid[i][j] === 1)
                    document.getElementById(temp).className = "blueHalt";
                else if (grid[i][j] === 2)
                    document.getElementById(temp).className = "redHalt";
                else if (grid[i][j] === 7)
                    document.getElementById(temp).className = "bluePriorHalt";
                else if (grid[i][j] === 8)
                    document.getElementById(temp).className = "redPriorHalt";
                else
                    document.getElementById(temp).className = "";
            }
        }
    }
}

function isSafe(grid, a, b) {
    return (grid[a][b] === 0);
}

function isBlue(grid, a, b) {
    return (grid[a][b] % 2);
}

function isRed(grid, a, b) {
    return (!(grid[a][b] % 2));
}

function verCar(verPrior) {
    return (Math.random() <= verPrior) ? 1 : 0;
}

function moveCarsRed240(grid) {
    for (var i = 0; i < grid.length; i++) {
        for (var j = 0; j < grid[0].length; j++) {
            if (grid[i][j] === 7) {
                grid[i][j] = 3;
            }
            else if (grid[i][j] === 8) {
                grid[i][j] = 4;
            }
        }
    }
    for (j = 0; j < grid[0].length; j++) {
        var emptyCell = grid.length - 1;
        for (; emptyCell >= 0; emptyCell--) {
            if (!grid[emptyCell][j])
                break;
        }
        if (emptyCell === -1)
            emptyCell = 0;
        for (i = emptyCell; i < grid.length; i++) {
            if (grid[i][j] === 2 || grid[i][j] === 4) {
                if (i === 0 && isSafe(grid, grid.length - 1, j)) {
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
        for (i = 0; i < emptyCell; i++) {
            if (grid[i][j] === 2 || grid[i][j] === 4) {
                if (i === 0 && isSafe(grid, grid.length - 1, j)) {
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
        if (grid[grid.length - 1][j] === 6) {
            grid[grid.length - 1][j] = 2;
        }
    }
    for (i = 0; i < grid.length; i++) {
        emptyCell = 0;
        for (; emptyCell < grid[0].length; emptyCell++) {
            if (!grid[i][emptyCell])
                break;
        }
        if (emptyCell === grid[0].length)
            emptyCell = grid[0].length - 1;
        for (j = emptyCell; j >= 0; j--) {
            if (grid[i][j] === 1 || grid[i][j] === 3) {
                if (j === grid[0].length - 1 && isSafe(grid, i, 0)) {
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
        for (j = grid[0].length - 1; j > emptyCell; j--) {
            if (grid[i][j] === 1 || grid[i][j] === 3) {
                if (j === grid[0].length - 1 && isSafe(grid, i, 0)) {
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
        if (grid[i][0] === 5) {
            grid[i][0] = 1
        }
        // Код для обработки разрыва непрерывных потоков более приоритетными.
        // for (var j = emptyCell; j >= 0; j--) {
        //     if (grid[i][j] === 1 || grid[i][j] === 3) {
        //         if (i === grid.length - 1 && j === grid[0].length - 1 && isSafe(grid, i, 0) && (isSafe(grid, 0, 0) || isBlue(grid, 0, 0))) {
        //             grid[i][0] = 5;
        //             grid[i][j] = 0;
        //         }
        //         else if (i !== grid.length - 1 && j === grid[0].length - 1 && isSafe(grid, i, 0) && (isSafe(grid, i + 1, 0) || isBlue(grid, i + 1, 0))) {
        //             grid[i][0] = 5;
        //             grid[i][j] = 0;
        //         }
        //         else if (i === grid.length - 1 && isSafe(grid, i, j + 1) && (isSafe(grid, 0, j + 1) || isBlue(grid, 0, j + 1))) {
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
        //     if (grid[i][j] === 1 || grid[i][j] === 3) {
        //         if (i === grid.length - 1 && j === grid[0].length - 1 && isSafe(grid, i, 0) && (isSafe(grid, 0, 0) || isBlue(grid, 0, 0))) {
        //             grid[i][0] = 5;
        //             grid[i][j] = 0;
        //         }
        //         else if (i !== grid.length - 1 && j === grid[0].length - 1 && isSafe(grid, i, 0) && (isSafe(grid, i + 1, 0) || isBlue(grid, i + 1, 0))) {
        //             grid[i][0] = 5;
        //             grid[i][j] = 0;
        //         }
        //         else if (i === grid.length - 1 && isSafe(grid, i, j + 1) && (isSafe(grid, 0, j + 1) || isBlue(grid, 0, j + 1))) {
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
        if (grid[i][0] === 5) {
            grid[i][0] = 1;
        }
    }
    return grid;
}

function moveCarsBlue240(grid) {
    for (var i = 0; i < grid.length; i++) {
        for (var j = 0; j < grid[0].length; j++) {
            if (grid[i][j] === 7) {
                grid[i][j] = 3;
            }
            else if (grid[i][j] === 8) {
                grid[i][j] = 4;
            }
        }
    }
    for (i = 0; i < grid.length; i++) {
        var emptyCell = 0;
        for (; emptyCell < grid[0].length; emptyCell++) {
            if (!grid[i][emptyCell])
                break;
        }
        if (emptyCell === grid[0].length)
            emptyCell = grid[0].length - 1;
        for (j = emptyCell; j >= 0; j--) {
            if (grid[i][j] === 1 || grid[i][j] === 3) {
                if (j === grid[0].length - 1 && isSafe(grid, i, 0)) {
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
        for (j = grid[0].length - 1; j > emptyCell; j--) {
            if (grid[i][j] === 1 || grid[i][j] === 3) {
                if (j === grid[0].length - 1 && isSafe(grid, i, 0)) {
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
        if (grid[i][0] === 5) {
            grid[i][0] = 1
        }
    }
    for (j = 0; j < grid[0].length; j++) {
        emptyCell = grid.length - 1;
        for (; emptyCell >= 0; emptyCell--) {
            if (!grid[emptyCell][j])
                break;
        }
        if (emptyCell === -1)
            emptyCell = 0;
        for (i = emptyCell; i < grid.length; i++) {
            if (grid[i][j] === 2 || grid[i][j] === 4) {
                if (i === 0 && isSafe(grid, grid.length - 1, j)) {
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
        for (i = 0; i < emptyCell; i++) {
            if (grid[i][j] === 2 || grid[i][j] === 4) {
                if (i === 0 && isSafe(grid, grid.length - 1, j)) {
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
        if (grid[grid.length - 1][j] === 6) {
            grid[grid.length - 1][j] = 2;
        }
        // for (var i = emptyCell; i < grid.length; i++) {
        //     if (grid[i][j] === 2 || grid[i][j] === 4) {
        //         if (i === 0 && j === 0 && isSafe(grid, grid.length - 1, 0) && (isSafe(grid, grid.length - 1, grid[0].length - 1) || isRed(grid, grid.length - 1, grid[0].length - 1))) {
        //             grid[grid.length - 1][j] = 6;
        //             grid[i][j] = 0;
        //         }
        //         else if (i !== 0 && j === 0 && isSafe(grid, i - 1, j) && (isSafe(grid, i - 1, grid[0].length - 1) || isRed(grid, i - 1, grid[0].length - 1))) {
        //             grid[i - 1][j] = 2;
        //             grid[i][j] = 0;
        //         }
        //         else if (i === 0 && isSafe(grid, grid.length - 1, j) && (isSafe(grid, grid.length - 1, j - 1) || isRed(grid, grid.length - 1, j - 1))) {
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
        //     if (grid[i][j] === 2 || grid[i][j] === 4) {
        //         if (i === 0 && j === 0 && isSafe(grid, grid.length - 1, 0) && (isSafe(grid, grid.length - 1, grid[0].length - 1) || isRed(grid, grid.length - 1, grid[0].length - 1))) {
        //             grid[grid.length - 1][j] = 6;
        //             grid[i][j] = 0;
        //         }
        //         else if (i !== 0 && j === 0 && isSafe(grid, i - 1, j) && (isSafe(grid, i - 1, grid[0].length - 1) || isRed(grid, i - 1, grid[0].length - 1))) {
        //             grid[i - 1][j] = 2;
        //             grid[i][j] = 0;
        //         }
        //         else if (i === 0 && isSafe(grid, grid.length - 1, j) && (isSafe(grid, grid.length - 1, j - 1) || isRed(grid, grid.length - 1, j - 1))) {
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
        if (grid[grid.length - 1][j] === 6) {
            grid[grid.length - 1][j] = 2
        }
    }
    return grid;
}

function moveCarsVer240(grid) {
    for (var i = 0; i < grid.length; i++) {
        for (var j = 0; j < grid[0].length; j++) {
            if (grid[i][j] === 3 || grid[i][j] === 7) {
                grid[i][j] = 1;
            }
            else if (grid[i][j] === 4 || grid[i][j] === 8) {
                grid[i][j] = 2;
            }
        }
    }
    // Ищем конфликты. Стопорим все.
    for (i = 0; i < grid.length; i++) {
        for (j = 0; j < grid[0].length; j++) {
            if (i < grid.length - 1 && j < grid[0].length - 1) {
                if (isBlue(grid, i, j) && (isRed(grid, i + 1, j + 1) && !isSafe(grid, i + 1, j + 1))) {
                    grid[i][j] = 7;
                    grid[i + 1][j + 1] = 8;
                }
            }
            else if (i === grid.length - 1 && j === grid[0].length - 1) {
                if (isBlue(grid, i, j) && (isRed(grid, 0, 0) && !isSafe(grid, 0, 0))) {
                    grid[i][j] = 7;
                    grid[0][0] = 8;
                }
            }
            else if (i === grid.length - 1) {
                if (isBlue(grid, i, j) && (isRed(grid, 0, j + 1) && !isSafe(grid, 0, j + 1))) {
                    grid[i][j] = 7;
                    grid[0][j + 1] = 8;
                }
            }
            else if (j === grid.length - 1) {
                if (isBlue(grid, i, j) && (isRed(grid, i + 1, 0) && !isSafe(grid, i + 1, 0))) {
                    grid[i][j] = 7;
                    grid[i + 1][0] = 8;
                }
            }
        }
    }
    // Двигаем всё, что движется, помечаем, что подвинули.
    grid = moveFree240(grid);
    // Разрешаем конфликты. Снимаем метки с тех, что выиграли.
    for (i = 0; i < grid.length; i++) {
        for (j = grid[0].length; j >= 0; j--) {
            if (i < grid.length - 1 && j < grid[0].length - 1) {
                if (grid[i][j] === 7) {//(isBlue(grid, i, j) && (isRed(grid, i + 1, j + 1) && !isSafe(grid, i + 1, j + 1))) {
                    if (verCar(verPrior)) {
                        grid[i + 1][j + 1] = 2;
                    }
                    else {
                        grid[i][j] = 1;
                    }
                }
            }
            else if (i === grid.length - 1 && j === grid[0].length - 1) {
                if (grid[i][j] === 7) {//(isBlue(grid, i, j) && (isRed(grid, 0, 0) && !isSafe(grid, 0, 0))) {
                    if (verCar(verPrior)) {
                        grid[0][0] = 2;
                    }
                    else {
                        grid[i][j] = 1;
                    }
                }
            }
            else if (i === grid.length - 1) {
                if (grid[i][j] === 7) {//(isBlue(grid, i, j) && (isRed(grid, 0, j + 1) && !isSafe(grid, 0, j + 1))) {
                    if (verCar(verPrior)) {
                        grid[0][j + 1] = 2;
                    }
                    else {
                        grid[i][j] = 1;
                    }
                }
            }
            else if (j === grid.length - 1) {
                if (grid[i][j] === 7) {//(isBlue(grid, i, j) && (isRed(grid, i + 1, 0) && !isSafe(grid, i + 1, 0))) {
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
    for (i = 0; i < grid.length; i++) {
        for (j = 0; j < grid[0].length; j++) {
            if (grid[i][j] === 1 || grid[i][j] === 2) {
                grid = moveFree240(grid);
            }
        }
    }
    return grid;
}

function moveFree240(grid) {
    for (var i = 0; i < grid.length; i++) {
        var emptyCell = 0;
        for (; emptyCell < grid[0].length; emptyCell++) {
            if (!grid[i][emptyCell])
                break;
        }
        if (emptyCell === grid[0].length)
            emptyCell = grid[0].length - 1;
        for (var j = emptyCell; j >= 0; j--) {
            if (grid[i][j] === 1) {
                if (j === grid[0].length - 1 && isSafe(grid, i, 0)) {
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
        for (j = grid[0].length - 1; j > emptyCell; j--) {
            if (grid[i][j] === 1) {
                if (j === grid[0].length - 1 && isSafe(grid, i, 0)) {
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
    for (j = 0; j < grid[0].length; j++) {
        emptyCell = grid.length - 1;
        for (; emptyCell >= 0; emptyCell--) {
            if (!grid[emptyCell][j])
                break;
        }
        if (emptyCell === -1)
            emptyCell = 0;
        for (i = emptyCell; i < grid.length; i++) {
            if (grid[i][j] === 2) {
                if (i === 0 && isSafe(grid, grid.length - 1, j)) {
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
        for (i = 0; i < emptyCell; i++) {
            if (grid[i][j] === 2) {
                if (i === 0 && isSafe(grid, grid.length - 1, j)) {
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

function moveCarsRed184(grid) {
    for (var i = 0; i < grid.length; i++) {
        for (var j = 0; j < grid[0].length; j++) {
            if (grid[i][j] === 7) {
                grid[i][j] = 3;
            }
            else if (grid[i][j] === 8) {
                grid[i][j] = 4;
            }
        }
    }
    for (j = 0; j < grid[0].length; j++) {
        var stopCell = 0;
        for (; stopCell < grid.length; stopCell++) {
            if (stopCell === 0 && grid[stopCell][j] && grid[grid.length - 1][j])
                break;
            if (stopCell !== 0 && grid[stopCell][j] && grid[stopCell - 1][j])
                break;
        }
        if (stopCell === grid.length)
            stopCell = grid.length - 1;
        for (i = stopCell; i >= 0; i--) {
            if (grid[i][j] === 2 || grid[i][j] === 4) {
                if (i === 0 && isSafe(grid, grid.length - 1, j)) {
                    grid[grid.length - 1][j] = 6;
                    grid[i][j] = 0;
                    ysp[j]++;
                }
                else if (i > 0 && isSafe(grid, i - 1, j)) {
                    grid[i - 1][j] = 6;
                    grid[i][j] = 0;
                    ysp[j]++;
                }
                else {
                    grid[i][j] = 4
                }
            }
        }
        for (i = grid.length - 1; i > stopCell; i--) {
            if (grid[i][j] === 2 || grid[i][j] === 4) {
                if (i === 0 && isSafe(grid, grid.length - 1, j)) {
                    grid[grid.length - 1][j] = 6;
                    grid[i][j] = 0;
                    ysp[j]++;
                }
                else if (i > 0 && isSafe(grid, i - 1, j)) {
                    grid[i - 1][j] = 6;
                    grid[i][j] = 0;
                    ysp[j]++;
                }
                else {
                    grid[i][j] = 4
                }
            }
        }
    }
    for (i = 0; i < grid.length; i++) {
        stopCell = 0;
        for (; stopCell < grid[0].length; stopCell++) {
            if (stopCell === grid[0].length - 1 && grid[i][stopCell] && grid[i][0])
                break;
            if (stopCell !== grid[0].length - 1 && grid[i][stopCell] && grid[i][stopCell + 1])
                break;
        }
        if (stopCell === grid[0].length)
            stopCell = grid[0].length - 1;

        for (j = stopCell; j < grid[0].length; j++) {
            if (grid[i][j] === 1 || grid[i][j] === 3) {
                if (j === grid[0].length - 1 && isSafe(grid, i, 0)) {
                    grid[i][0] = 5;
                    grid[i][j] = 0;
                    xsp[i]++;
                }
                else if (j < grid[0].length - 1 && isSafe(grid, i, j + 1)) {
                    grid[i][j + 1] = 5;
                    grid[i][j] = 0;
                    xsp[i]++;
                }
                else {
                    grid[i][j] = 3
                }
            }
        }
        for (j = 0; j < stopCell; j++) {
            if (grid[i][j] === 1 || grid[i][j] === 3) {
                if (j === grid[0].length - 1 && isSafe(grid, i, 0)) {
                    grid[i][0] = 5;
                    grid[i][j] = 0;
                    xsp[i]++;
                }
                else if (j < grid[0].length - 1 && isSafe(grid, i, j + 1)) {
                    grid[i][j + 1] = 5;
                    grid[i][j] = 0;
                    xsp[i]++;
                }
                else {
                    grid[i][j] = 3
                }
            }
        }
    }
    for (i = 0; i < grid.length; i++) {
        for (j = 0; j < grid[0].length; j++) {
            if (grid[i][j] === 6)
                grid[i][j] = 2;
            if (grid[i][j] === 5)
                grid[i][j] = 1;
        }
    }
    return grid;
}

function moveCarsBlue184(grid) {
    for (var i = 0; i < grid.length; i++) {
        for (var j = 0; j < grid[0].length; j++) {
            if (grid[i][j] === 7) {
                grid[i][j] = 3;
            }
            else if (grid[i][j] === 8) {
                grid[i][j] = 4;
            }
        }
    }
    for (i = 0; i < grid.length; i++) {
        var stopCell = 0;
        for (; stopCell < grid[0].length; stopCell++) {
            if (stopCell === grid[0].length - 1 && grid[i][stopCell] && grid[i][0])
                break;
            if (stopCell !== grid[0].length - 1 && grid[i][stopCell] && grid[i][stopCell + 1])
                break;
        }
        if (stopCell === grid[0].length)
            stopCell = grid[0].length - 1;

        for (j = stopCell; j < grid[0].length; j++) {
            if (grid[i][j] === 1 || grid[i][j] === 3) {
                if (j === grid[0].length - 1 && isSafe(grid, i, 0)) {
                    grid[i][0] = 5;
                    grid[i][j] = 0;
                    xsp[i]++;
                }
                else if (j < grid[0].length - 1 && isSafe(grid, i, j + 1)) {
                    grid[i][j + 1] = 5;
                    grid[i][j] = 0;
                    xsp[i]++;
                }
                else {
                    grid[i][j] = 3
                }
            }
        }
        for (j = 0; j < stopCell; j++) {
            if (grid[i][j] === 1 || grid[i][j] === 3) {
                if (j === grid[0].length - 1 && isSafe(grid, i, 0)) {
                    grid[i][0] = 5;
                    grid[i][j] = 0;
                    xsp[i]++;
                }
                else if (j < grid[0].length - 1 && isSafe(grid, i, j + 1)) {
                    grid[i][j + 1] = 5;
                    grid[i][j] = 0;
                    xsp[i]++;
                }
                else {
                    grid[i][j] = 3
                }
            }
        }
    }
    for (j = 0; j < grid[0].length; j++) {
        stopCell = 0;
        for (; stopCell < grid.length; stopCell++) {
            if (stopCell === 0 && grid[stopCell][j] && grid[grid.length - 1][j])
                break;
            if (stopCell !== 0 && grid[stopCell][j] && grid[stopCell - 1][j])
                break;
        }
        if (stopCell === grid.length)
            stopCell = grid.length - 1;
        for (i = stopCell; i >= 0; i--) {
            if (grid[i][j] === 2 || grid[i][j] === 4) {
                if (i === 0 && isSafe(grid, grid.length - 1, j)) {
                    grid[grid.length - 1][j] = 6;
                    grid[i][j] = 0;
                    ysp[j]++;
                }
                else if (i > 0 && isSafe(grid, i - 1, j)) {
                    grid[i - 1][j] = 6;
                    grid[i][j] = 0;
                    ysp[j]++;
                }
                else {
                    grid[i][j] = 4
                }
            }
        }
        for (i = grid.length - 1; i > stopCell; i--) {
            if (grid[i][j] === 2 || grid[i][j] === 4) {
                if (i === 0 && isSafe(grid, grid.length - 1, j)) {
                    grid[grid.length - 1][j] = 6;
                    grid[i][j] = 0;
                    ysp[j]++;
                }
                else if (i > 0 && isSafe(grid, i - 1, j)) {
                    grid[i - 1][j] = 6;
                    grid[i][j] = 0;
                    ysp[j]++;
                }
                else {
                    grid[i][j] = 4
                }
            }
        }
    }
    for (i = 0; i < grid.length; i++) {
        for (j = 0; j < grid[0].length; j++) {
            if (grid[i][j] === 6)
                grid[i][j] = 2;
            if (grid[i][j] === 5)
                grid[i][j] = 1;
        }
    }
    return grid;
}

function moveCarsVer184(grid) {
    for (var i = 0; i < grid.length; i++) {
        for (var j = 0; j < grid[0].length; j++) {
            if (grid[i][j] === 3 || grid[i][j] === 7) {
                grid[i][j] = 1;
            }
            else if (grid[i][j] === 4 || grid[i][j] === 8) {
                grid[i][j] = 2;
            }
        }
    }
    // Ищем конфликты. Стопорим все.
    for (i = 0; i < grid.length; i++) {
        for (j = 0; j < grid[0].length; j++) {
            if (i < grid.length - 1 && j < grid[0].length - 1) {
                if (isSafe(grid, i, j + 1) && isBlue(grid, i, j) && (isRed(grid, i + 1, j + 1) && !isSafe(grid, i + 1, j + 1))) {
                    grid[i][j] = 7;
                    grid[i + 1][j + 1] = 8;
                }
                else if (isRed(grid, i, j + 1) && isBlue(grid, i, j) && (isRed(grid, i + 1, j + 1) && !isSafe(grid, i + 1, j + 1))) {
                    grid[i][j] = 9;
                }
            }
            else if (i === grid.length - 1 && j === grid[0].length - 1) {
                if (isSafe(grid, i, 0) && isBlue(grid, i, j) && (isRed(grid, 0, 0) && !isSafe(grid, 0, 0))) {
                    grid[i][j] = 7;
                    grid[0][0] = 8;
                }
                else if (isRed(grid, 0, j) && isBlue(grid, i, j) && (isRed(grid, 0, 0) && !isSafe(grid, 0, 0))) {
                    grid[i][j] = 9;
                }
            }
            else if (i === grid.length - 1) {
                if (isSafe(grid, i, j + 1) && isBlue(grid, i, j) && (isRed(grid, 0, j + 1) && !isSafe(grid, 0, j + 1))) {
                    grid[i][j] = 7;
                    grid[0][j + 1] = 8;
                }
                else if (isRed(grid, i, j + 1) && isBlue(grid, i, j) && (isRed(grid, 0, j + 1) && !isSafe(grid, 0, j + 1))) {
                    grid[i][j] = 9;
                }
            }
            else if (j === grid.length - 1) {
                if (isSafe(grid, i, 0) && isBlue(grid, i, j) && (isRed(grid, i + 1, 0) && !isSafe(grid, i + 1, 0))) {
                    grid[i][j] = 7;
                    grid[i + 1][0] = 8;
                }
                else if (isRed(grid, i, 0) && isBlue(grid, i, j) && (isRed(grid, i + 1, 0) && !isSafe(grid, i + 1, 0))) {
                    grid[i][j] = 9;
                }

            }
        }
    }
    // Двигаем всё, что движется, помечаем, что подвинули.
    grid = moveFree184(grid);
    // Разрешаем конфликты. Снимаем метки с тех, что выиграли.
    for (i = 0; i < grid.length; i++) {
        for (j = grid[0].length; j >= 0; j--) {
            if (i < grid.length - 1 && j < grid[0].length - 1) {
                if (grid[i][j] === 7) {//(isBlue(grid, i, j) && (isRed(grid, i + 1, j + 1) && !isSafe(grid, i + 1, j + 1))) {
                    if (verCar(verPrior)) {
                        grid[i + 1][j + 1] = 2;
                    }
                    else {
                        grid[i][j] = 1;
                    }
                }
            }
            else if (i === grid.length - 1 && j === grid[0].length - 1) {
                if (grid[i][j] === 7) {//(isBlue(grid, i, j) && (isRed(grid, 0, 0) && !isSafe(grid, 0, 0))) {
                    if (verCar(verPrior)) {
                        grid[0][0] = 2;
                    }
                    else {
                        grid[i][j] = 1;
                    }
                }
            }
            else if (i === grid.length - 1) {
                if (grid[i][j] === 7) {//(isBlue(grid, i, j) && (isRed(grid, 0, j + 1) && !isSafe(grid, 0, j + 1))) {
                    if (verCar(verPrior)) {
                        grid[0][j + 1] = 2;
                    }
                    else {
                        grid[i][j] = 1;
                    }
                }
            }
            else if (j === grid.length - 1) {
                if (grid[i][j] === 7) {//(isBlue(grid, i, j) && (isRed(grid, i + 1, 0) && !isSafe(grid, i + 1, 0))) {
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
    for (i = 0; i < grid.length; i++) {
        for (j = 0; j < grid[0].length; j++) {
            if (grid[i][j] === 1 || grid[i][j] === 2) {
                grid = moveFree184(grid);
            }
        }
    }
    for (i = 0; i < grid.length; i++) {
        for (j = 0; j < grid[0].length; j++) {
            if (grid[i][j] === 6)
                grid[i][j] = 2;
            else if (grid[i][j] === 10)
                grid[i][j] = 4;
            else if (grid[i][j] === 5)
                grid[i][j] = 1;
            else if (grid[i][j] === 9)
                grid[i][j] = 3;
        }
    }
    return grid;
}

function moveFree184(grid) {
    for (var j = 0; j < grid[0].length; j++) {
        var stopCell = 0;
        for (; stopCell < grid.length; stopCell++) {
            if (stopCell === 0 && grid[stopCell][j] && grid[grid.length - 1][j])
                break;
            if (stopCell !== 0 && grid[stopCell][j] && grid[stopCell - 1][j])
                break;
        }
        if (stopCell === grid.length)
            stopCell = grid.length - 1;
        for (var i = stopCell; i >= 0; i--) {
            if (grid[i][j] === 2 || grid[i][j] === 4) {
                if (i === 0 && isSafe(grid, grid.length - 1, j)) {
                    grid[grid.length - 1][j] = 6;
                    grid[i][j] = 0;
                    ysp[j]++;
                }
                else if (i > 0 && isSafe(grid, i - 1, j)) {
                    grid[i - 1][j] = 6;
                    grid[i][j] = 0;
                    ysp[j]++;
                }
                else {
                    grid[i][j] = 10
                }
            }
        }
        for (i = grid.length - 1; i > stopCell; i--) {
            if (grid[i][j] === 2 || grid[i][j] === 4) {
                if (i === 0 && isSafe(grid, grid.length - 1, j)) {
                    grid[grid.length - 1][j] = 6;
                    grid[i][j] = 0;
                    ysp[j]++;
                }
                else if (i > 0 && isSafe(grid, i - 1, j)) {
                    grid[i - 1][j] = 6;
                    grid[i][j] = 0;
                    ysp[j]++;
                }
                else {
                    grid[i][j] = 10
                }
            }
        }
    }
    for (i = 0; i < grid.length; i++) {
        stopCell = 0;
        for (; stopCell < grid[0].length; stopCell++) {
            if (stopCell === grid[0].length - 1 && grid[i][stopCell] && grid[i][0])
                break;
            if (stopCell !== grid[0].length - 1 && grid[i][stopCell] && grid[i][stopCell + 1])
                break;
        }
        if (stopCell === grid[0].length)
            stopCell = grid[0].length - 1;

        for (j = stopCell; j < grid[0].length; j++) {
            if (grid[i][j] === 1 || grid[i][j] === 3) {
                if (j === grid[0].length - 1 && isSafe(grid, i, 0)) {
                    grid[i][0] = 5;
                    grid[i][j] = 0;
                    xsp[i]++;
                }
                else if (j < grid[0].length - 1 && isSafe(grid, i, j + 1)) {
                    grid[i][j + 1] = 5;
                    grid[i][j] = 0;
                    xsp[i]++;
                }
                else {
                    grid[i][j] = 9
                }
            }
        }
        for (j = 0; j < stopCell; j++) {
            if (grid[i][j] === 1 || grid[i][j] === 3) {
                if (j === grid[0].length - 1 && isSafe(grid, i, 0)) {
                    grid[i][0] = 5;
                    grid[i][j] = 0;
                    xsp[i]++;
                }
                else if (j < grid[0].length - 1 && isSafe(grid, i, j + 1)) {
                    grid[i][j + 1] = 5;
                    grid[i][j] = 0;
                    xsp[i]++;
                }
                else {
                    grid[i][j] = 9
                }
            }
        }
    }
    return grid;
}

var x, y, rule, prior, verPrior, car_N;
var grid;
var timer = -1;
var xsp, ysp, xcon, ycon;
var y_sp_arr = new Array(1000);
var x_sp_arr = new Array(1000);
var a_sp_arr = new Array(1000);

function oneStep() {
    prior = $('input[name=Prior]:checked').val();
    rule = $('input[name=Rule]:checked').val();
    verPrior = parseFloat($('#verPrior').val());
    if (verPrior > 1) {
        alert("Вероятность не может быть больше 1.");
        return;
    }

    for (var i = 0; i < grid.length; i++) {
        for (var j = 0; j < grid[0].length; j++) {
            if (grid[i][j]) {
                if (isBlue(grid, i, j)) {
                    xcon[i]++;
                }
                else if (isRed(grid, i, j)) {
                    ycon[j]++;
                }
            }
        }
    }
    if (rule === "R184") {
        if (prior === "Red") {
            grid = moveCarsRed184(grid);
            showCars(grid);
        }
        else if (prior === "Blue") {
            grid = moveCarsBlue184(grid);
            showCars(grid);
        }
        else {
            grid = moveCarsVer184(grid);
            showCars(grid);
        }
    }
    else {
        if (prior === "Red") {
            grid = moveCarsRed240(grid);
            showCars(grid);
        }
        else if (prior === "Blue") {
            grid = moveCarsBlue240(grid);
            showCars(grid);
        }
        else {
            grid = moveCarsVer240(grid);
            showCars(grid);
        }
    }
    var xsumsp = 0;
    var xsumcon = 0;
    for (var i = 0; i < xsp.length; i++) {
        xsumsp += xsp[i];
        xsumcon += xcon[i];
    }
    x_sp_arr[gtime] = (xsumsp / xsumcon) ? xsumsp / xsumcon : 0;
    var ysumsp = 0;
    var ysumcon = 0;
    for (i = 0; i < ysp.length; i++) {
        ysumsp += ysp[i];
        ysumcon += ycon[i];
    }
    y_sp_arr[gtime] = (ysumsp / ysumcon) ? ysumsp / ysumcon : 0;
    a_sp_arr[gtime] = (x_sp_arr[gtime] + y_sp_arr[gtime]) / 2;
    drawASpeed();
    draw_g();
    drawXSpeed(x);
    for (i = 0; i < x; i++) {
        xsp[i] = 0;
        xcon[i] = 0;
    }
    drawYSpeed(y);
    for (i = 0; i < y; i++) {
        ysp[i] = 0;
        ycon[i] = 0;
    }
}

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

document.getElementById('Save_res').onclick = function () {
    download('result.txt',x_sp_arr.toString()+'\n'+y_sp_arr.toString()+'\n'+a_sp_arr.toString());
}
document.getElementById('Submit_Par').onclick = function () {
    x = parseInt($('#Set_X').val());
    y = parseInt($('#Set_Y').val());
    car_N = parseInt($('#Car_N').val());
    if (x * y < car_N) {
        alert("Количество машин больше количества клеток поля.");
        return;
    }
    verPrior = parseFloat($('#verPrior').val());
    if (verPrior > 1) {
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

    for (i = 0; i < y; i++) {
        ysp[i] = 0;
        ycon[i] = 0;
    }

    grid = randGrid(makeGrid(x, y), car_N);
    drawGrid(x, y);
    drawXSpeed(x);
    drawYSpeed(y);
    drawASpeed();
    showCars(grid);
    var gx_canvas = document.getElementById("grx");
    var gx_context = gx_canvas.getContext("2d");
    var gy_canvas = document.getElementById("gry");
    var gy_context = gy_canvas.getContext("2d");
    var ga_canvas = document.getElementById("gra");
    var ga_context = ga_canvas.getContext("2d");
    gx_context.clearRect(0, 0, gx_canvas.width, gx_canvas.height);
    gy_context.clearRect(0, 0, gy_canvas.width, gy_canvas.height);
    ga_context.clearRect(0, 0, ga_canvas.width, ga_canvas.height);
    gtime = 0;
};

document.getElementById('Show_gr').onclick = function () {
    if (document.getElementById("graphs").style.display === 'none')
        document.getElementById("graphs").style.display = '';
    else
        document.getElementById("graphs").style.display = 'none';
};

document.getElementById('Show_vis').onclick = function () {
    if (document.getElementById("car_div").style.display === 'none')
        document.getElementById("car_div").style.display = '';
    else
        document.getElementById("car_div").style.display = 'none';
};

document.getElementById('Tick').onclick = function () {
    oneStep();
};

document.getElementById('Cont').onclick = function () {
    var timeStep = parseInt($('#timeStep').val());
    if (timer === -1) {
        timer = setInterval('oneStep()', timeStep);
    }
    else {
        clearInterval(timer);
        timer = -1;
    }
};

var sumsp = 0; // Для суммы скоростей
var sumcon = 0;// Для суммы машин
var gtime = 0; // Для x в графиках
var lastx = 0; // Прошлое у в графиках скорости синих
var lasty = 0; // Прошлое у в графиках скорости красных
var lasta = 0; // Прошлое у в графиках общей скорости

function draw_g() {
    // График синих
    var gx_canvas = document.getElementById("grx");
    var gx_context = gx_canvas.getContext("2d");
    // var xsumsp = 0;
    // var xsumcon = 0;
    // for (var i = 0; i < xsp.length; i++) {
    //     xsumsp += xsp[i];
    //     xsumcon += xcon[i];
    // }
    // var curx = (xsumsp / xsumcon) ? xsumsp / xsumcon : 0;
    var curx = x_sp_arr[gtime];
    gx_context.beginPath();
    gx_context.moveTo(gtime, 100 - lastx * 100);
    gx_context.lineTo(gtime + 1, 100 - curx * 100);
    gx_context.strokeStyle = "Blue";
    gx_context.stroke();
    lastx = curx;
    // График красных
    var gy_canvas = document.getElementById("gry");
    var gy_context = gy_canvas.getContext("2d");
    // var ysumsp = 0;
    // var ysumcon = 0;
    // for (i = 0; i < ysp.length; i++) {
    //     ysumsp += ysp[i];
    //     ysumcon += ycon[i];
    // }
    // var cury = (ysumsp / ysumcon) ? ysumsp / ysumcon : 0;
    var cury = y_sp_arr[gtime];
    gy_context.beginPath();
    gy_context.moveTo(gtime, 100 - lasty * 100);
    gy_context.lineTo(gtime + 1, 100 - cury * 100);
    gy_context.strokeStyle = "Red";
    gy_context.stroke();
    lasty = cury;
    // График общий
    var ga_canvas = document.getElementById("gra");
    var ga_context = ga_canvas.getContext("2d");
    var cura = (curx + cury) / 2;
    ga_context.beginPath();
    ga_context.moveTo(gtime, 100 - lasta * 100);
    ga_context.lineTo(gtime + 1, 100 - cura * 100);
    ga_context.strokeStyle = "Black";
    ga_context.stroke();
    lasta = cura;

    if (gtime > 1000) {
        gtime = 0;
        gx_context.clearRect(0, 0, gx_canvas.width, gx_canvas.height);
        gy_context.clearRect(0, 0, gy_canvas.width, gy_canvas.height);
        ga_context.clearRect(0, 0, ga_canvas.width, ga_canvas.height);
    }
    else gtime += 1;
}