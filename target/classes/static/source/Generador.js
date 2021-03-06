var world;
var visited;
var values;
var line1;
var line2;
var line3;
var size;
var mat;

function createworld(mysize) {
    size = mysize;
    world = new Array (size);
    visited = new Array (size);
    for (var i = 0; i < size; i++){
        world[i] = new Array(size);
        visited[i] = new Array(size);
        for (var j = 0; j < size; j++){
            world[i][j] = new node(i, j);
            visited[i][j] = false;
        }
    }  
    visited[0][0] = true;
    recursive(0, 0);
}

function node (ix, iy) {
    this.x = ix;
    this.y = iy;
    this.dirs = ["N", "S", "E", "W"];
    dirs = shuffle(this.dirs);
    this.list = new Array();
    this.east = false;
    this.west = false;
    this.south = false;
    this.north = false;
}


function randomfinding (startx, starty, moverse){
    this.dirs = ["N", "S", "E", "W"];
    dirs = shuffle(this.dirs);
    if(world[startx][starty].east && !world[startx][starty].south && !world[startx][starty].west && !world[startx][starty].north) return "E";
    if(!world[startx][starty].east && world[startx][starty].south && !world[startx][starty].west && !world[startx][starty].north) return "S";
    if(!world[startx][starty].east && !world[startx][starty].south && world[startx][starty].west && !world[startx][starty].north) return "W";
    if(!world[startx][starty].east && !world[startx][starty].south && !world[startx][starty].west && world[startx][starty].north) return "N";
    
    for (var i = 0; i < 4; i++){
        if(dirs[i] == "E" && world[startx][starty].east && moverse != "W") return "E";
        if(dirs[i] == "S" && world[startx][starty].south && moverse != "N") return "S";
        if(dirs[i] == "W" && world[startx][starty].west && moverse != "E") return "W";
        if(dirs[i] == "N" && world[startx][starty].north && moverse != "S") return "N";
    }
}

function pathfinding (startx, starty, targetx, targety){
    visited = new Array ();
    values = new Array ();
    var x = startx;
    var y = starty;
    
    var arriba = 100000;
    var abajo = 100000;
    var derecha = 100000;
    var izquierda = 100000;
    
    if(world[startx][starty].north){
        for (var i = 0; i < size; i++){
        visited[i] = new Array ();
        values[i] = new Array ();
        for (var j = 0; j < size; j++){
            visited[i][j] = false;
            values[i][j] = 100000;
        }
    }
        visited[startx][starty] = true;
        arriba = recursivefind(x, y+1, targetx, targety);
    }
    if(world[x][y].south){
        for (var i = 0; i < size; i++){
        visited[i] = new Array ();
        values[i] = new Array ();
        for (var j = 0; j < size; j++){
            visited[i][j] = false;
            values[i][j] = 100000;
        }
    }
        visited[startx][starty] = true;
        abajo = recursivefind(x, y-1, targetx, targety);
    }
    if(world[x][y].east){
        for (var i = 0; i < size; i++){
        visited[i] = new Array ();
        values[i] = new Array ();
        for (var j = 0; j < size; j++){
            visited[i][j] = false;
            values[i][j] = 100000;
        }
    }
        visited[startx][starty] = true;
        derecha = recursivefind(x+1, y, targetx, targety);
    }
    if(world[x][y].west){
        for (var i = 0; i < size; i++){
        visited[i] = new Array ();
        values[i] = new Array ();
        for (var j = 0; j < size; j++){
            visited[i][j] = false;
            values[i][j] = 100000;
        }
    }
        visited[startx][starty] = true;
        izquierda = recursivefind(x-1, y, targetx, targety);
    }
    console.log(arriba); console.log(abajo); console.log(derecha); console.log(izquierda);
    if(arriba <= abajo && arriba <= derecha && arriba <= izquierda) return "N";
    if(abajo <= arriba && abajo <= izquierda && abajo <= derecha) return "S";
    if(izquierda <= arriba && izquierda <= derecha && izquierda <= abajo) return "W";
    if(derecha <= izquierda && derecha <= arriba && derecha <= abajo) return "E";
    return "N";
}

function recursivefind (x, y, targetx, targety){
    var min = 100000;
    if(x == targetx && y == targety){
        console.log("!encontrado");
        return 0;
    } 
    if(visited[x][y]) return values[x][y];
    
    if(world[x][y].north && !visited[x][y-1]){
        visited[x][y-1] = true;
        min = Math.min(min, recursivefind(x, y-1, targetx, targety)+1);
        values[x][y-1] = min;
    }
    if(world[x][y].south && !visited[x][y+1]){
        visited[x][y+1] = true;
        min = Math.min(min, recursivefind(x, y+1, targetx, targety)+1);
        values[x][y+1] = min;
    }
    if(world[x][y].east && !visited[x+1][y]){
        visited[x+1][y] = true;
        min = Math.min(min, recursivefind(x+1, y, targetx, targety)+1);
        values[x+1][y] = min;
    }
    if(world[x][y].west && !visited[x-1][y]){
        visited[x-1][y] = true;
        min = Math.min(min, recursivefind(x-1, y, targetx, targety)+1);
        values[x-1][y] = min;
    }
    
    return min;
}

function casillalejana (num1, num2) {
    var cola = [];
    cola.push([num1, num2]);
    var actual;
    for (var i = 0; i < size; i++){
        visited[i] = new Array(size);
        for (var j = 0; j < size; j++){
            visited[i][j] = false;
        }
    }  
    visited[num1][num2] = true;
    while(cola.length > 0){
        actual = cola.shift();
        if(world[actual[0]][actual[1]].east){
            if(!visited[actual[0]+1][actual[1]]){
                cola.push([actual[0]+1, actual[1]]);
                visited[actual[0]+1][actual[1]] = true;
            }
        }
        if(world[actual[0]][actual[1]].north){
            if(!visited[actual[0]][actual[1]-1]){
                cola.push([actual[0], actual[1]-1]);
                visited[actual[0]][actual[1]-1] = true;
            }
        }
        if(world[actual[0]][actual[1]].south){
            if(!visited[actual[0]][actual[1]+1]){
                cola.push([actual[0], actual[1]+1]);
                visited[actual[0]][actual[1]+1] = true;
            }
        }
        if(world[actual[0]][actual[1]].west){
            if(!visited[actual[0]-1][actual[1]]){
                cola.push([actual[0]-1, actual[1]]);
                visited[actual[0]-1][actual[1]] = true;
            }
        }
    }
    return actual;
}

function shuffle(array) {
  var currentIndex = array.length;
  var auxiliar, randomIndex;

  while (currentIndex > 0) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    auxiliar = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = auxiliar;
  }

  return array;
}

function recursive (x, y) {
    var direction;
    for (var i = 0; i < 4; i++){
        direction = world[x][y].dirs[i];
        switch (direction){
            case "E":
                if (x + 1 < size) {
                    if (!visited[x + 1][y]) {
                        world[x][y].list.push([x + 1, y]);
                        world[x][y].east = true;
                        world[x + 1][y].list.push([x, y]);
                        world[x + 1][y].west = true;
                        visited[x + 1][y] = true;
                        recursive(x + 1, y);
                    }
                    
                }
                break;
                
            case "W":
                if (x - 1 >= 0) {
                    if (!visited[x - 1][y]) {
                        world[x][y].list.push([x - 1, y]);
                        world[x][y].west = true;
                        world[x - 1][y].list.push([x, y]);
                        world[x - 1][y].east = true;
                        visited[x - 1][y] = true;
                        recursive(x - 1, y);
                    }
                    
                }
                break;
                
            case "N":
                if (y - 1 >= 0) {
                    if (!visited[x][y - 1]) {
                        world[x][y].list.push([x, y - 1]);
                        world[x][y].north = true;
                        world[x][y - 1].list.push([x, y]);
                        world[x][y - 1].south = true;
                        visited[x][y - 1] = true;
                        recursive(x, y - 1);
                    }
                    
                }
                break;
                
            case "S":
                if (y + 1 < size) {
                    if (!visited[x][y + 1]) {
                        world[x][y].list.push([x, y + 1]);
                        world[x][y].south = true;
                        world[x][y + 1].list.push([x, y]);
                        world[x][y + 1].north = true;
                        visited[x][y + 1] = true;
                        recursive(x, y + 1);
                    }
                    
                }
                break;       
        }   
    }   
}

function print() {
    var linea = "";
    
    for (var i = 0; i < size; i++){
        line1 = new Array();
        line2 = new Array();
        line3 = new Array();
        for (var j = 0; j < world[i].length; j++) {

            if (world[j][i].north) {
                line1.push("■□■");
            } else {
                line1.push("■■■");
            }
            if (world[j][i].south) {
                line3.push("■□■");
            } else {
                line3.push("■■■");
            }
            if (world[j][i].east) {
                if (world[j][i].west) {
                    line2.push("□□□");
                } else {
                    line2.push("■□□");
                }
            } else {
                if (world[j][i].west) {
                    line2.push("□□■");
                } else {
                    line2.push("■□■");
                }
            }
        }
        
        for (var k = 0; k < line1.length; k++) {
            linea += line1[k];
        }
        linea += "\r\n";
        for (var k = 0; k < line2.length; k++){
            linea += line2[k];
        }
        linea += "\r\n";
        for (var k = 0; k < line3.length; k++){
            linea += line3[k];
        }
        linea += "\r\n";
    }
    document.getElementById("lineadoc").innerText = linea;
}

function addloops (count) {
    
    var x;
    var y;
    var directions = ["N", "S", "E", "W"];
    
    for (var i = 0; i < count; i++){
        x = Math.floor(Math.random() * size);
        y = Math.floor(Math.random() * size);
        directions = shuffle(directions);
        var j = 0;
        var flag = true;
        var actual;
        while (j < 4 && flag){
            actual = directions[j];
            if(actual == "N"){
                flag = world[x][y].north;
                if(!flag){
                    if(y - 1 >= 0){
                        world[x][y].list.push([x, y - 1]);
                        world[x][y].north = true;
                        world[x][y - 1].list.push([x, y]);
                        world[x][y - 1].south = true;
                    } else {
                        flag = true;
                    } 
                }
            } else if (actual == "S"){
                flag = world[x][y].south;
                if(!flag){
                    if( y + 1 < size){
                        world[x][y].list.push([x, y + 1]);
                        world[x][y].south = true;
                        world[x][y + 1].list.push([x, y]);
                        world[x][y + 1].north = true;
                    } else {
                        flag = true;
                    }

                }
            } else if (actual == "E") {
                flag = world[x][y].east;
                if(!flag){
                    if (x + 1 < size){
                        world[x][y].list.push([x + 1, y]);
                        world[x][y].east = true;
                        world[x + 1][y].list.push([x, y]);
                        world[x + 1][y].west = true;
                    } else {
                        flag = true;
                    }
                    
                }
            } else {
                flag = world[x][y].west;
                if(!flag){
                    if (x - 1 >= 0){
                        world[x][y].list.push([x - 1, y]);
                        world[x][y].west = true;
                        world[x - 1][y].list.push([x, y]);
                        world[x - 1][y].east = true; 
                    } else {
                        flag = true;
                    }
                     
                }
            }
            j++;
        }
        if(flag) count++;
    }
    
}

function arr() {
    mat = new Array(size);
    for (var x = 0; x < size; x++) {
        mat[x] = new Array(size);
    }
                for (var i = 0; i < size; i++) {
                    for (var j = 0; j < world[i].length; j++) {
                        if (world[j][i].north && world[j][i].south && world[j][i].east && world[j][i].west) {
                            mat[j][i] = 0;
                        }
                        else if (world[j][i].north && world[j][i].south && world[j][i].east) {
                            mat[j][i] = 1;
                        }
                        else if (world[j][i].north && world[j][i].south && world[j][i].west) {
                            mat[j][i] = 2;
                        }
                        else if (world[j][i].east && world[j][i].south && world[j][i].west) {
                            mat[j][i] = 3;
                        }
                        else if (world[j][i].east && world[j][i].north && world[j][i].west) {
                            mat[j][i] = 4;
                        }
                        else if (world[j][i].north && world[j][i].west) {
                            mat[j][i] = 5;
                        }
                        else if (world[j][i].west && world[j][i].south) {
                            mat[j][i] = 6;
                        }
                        else if (world[j][i].south && world[j][i].east) {
                            mat[j][i] = 7;
                        }
                        else if (world[j][i].east && world[j][i].north) {
                            mat[j][i] = 8;
                        }
                        else if (world[j][i].south && world[j][i].north) {
                            mat[j][i] = 9;
                        }
                        else if (world[j][i].east && world[j][i].west) {
                            mat[j][i] = 10;
                        }
                        else if (world[j][i].north) {
                            mat[j][i] = 11;
                        }
                        else if (world[j][i].west) {
                            mat[j][i] = 12;
                        }
                        else if (world[j][i].east) {
                            mat[j][i] = 13;
                        }
                        else if (world[j][i].south) {
                            mat[j][i] = 14;
                        }
                    }
                }
    return mat;
            }
function tileindex () {
    var linea = [];
    var matrix = arr();
    for (var i = 0; i < size; i++){
        line1 = new Array();
        line2 = new Array();
        line3 = new Array();
        for (var j = 0; j < size; j++) {
            switch(matrix[i][j]){
                case 0:
                    line1.push(6); line2.push(2); line3.push(5);
                    line1.push(1); line2.push(0); line3.push(1);
                    line1.push(4); line2.push(2); line3.push(3);
                    break;
                case 1:
                    line1.push(11); line2.push(2); line3.push(5);
                    line1.push(11); line2.push(0); line3.push(1);
                    line1.push(11); line2.push(2); line3.push(3);
                    break;
                case 2:
                    line1.push(6); line2.push(2); line3.push(13);
                    line1.push(1); line2.push(0); line3.push(13);
                    line1.push(4); line2.push(2); line3.push(13);
                    break;
                case 3:
                    line1.push(14); line2.push(14); line3.push(14);
                    line1.push(1); line2.push(0); line3.push(1);
                    line1.push(4); line2.push(2); line3.push(3);
                    break;
                case 4:
                    line1.push(6); line2.push(2); line3.push(5);
                    line1.push(1); line2.push(0); line3.push(1);
                    line1.push(12); line2.push(12); line3.push(12);
                    break;
                case 5:
                    line1.push(6); line2.push(2); line3.push(13);
                    line1.push(1); line2.push(0); line3.push(13);
                    line1.push(12); line2.push(12); line3.push(9);
                    break;
                case 6:
                    line1.push(14); line2.push(14); line3.push(10);
                    line1.push(1); line2.push(0); line3.push(13);
                    line1.push(4); line2.push(2); line3.push(13);
                    break;
                case 7:
                    line1.push(7); line2.push(14); line3.push(14);
                    line1.push(11); line2.push(0); line3.push(1);
                    line1.push(11); line2.push(2); line3.push(3);
                    break;
                case 8:
                    line1.push(11); line2.push(2); line3.push(5);
                    line1.push(11); line2.push(0); line3.push(1);
                    line1.push(8); line2.push(12); line3.push(12);
                    break;
                case 9:
                    line1.push(11); line2.push(2); line3.push(13);
                    line1.push(11); line2.push(2); line3.push(13);
                    line1.push(11); line2.push(2); line3.push(13);
                    break;
                case 10:
                    line1.push(14); line2.push(14); line3.push(14);
                    line1.push(1); line2.push(1); line3.push(1);
                    line1.push(12); line2.push(12); line3.push(12);
                    break;
                case 11:
                    line1.push(11); line2.push(2); line3.push(13);
                    line1.push(11); line2.push(0); line3.push(13);
                    line1.push(8); line2.push(12); line3.push(9);
                    break;
                case 12:
                    line1.push(14); line2.push(14); line3.push(10);
                    line1.push(1); line2.push(0); line3.push(13);
                    line1.push(12); line2.push(12); line3.push(9);
                    break;
                case 13:
                    line1.push(7); line2.push(14); line3.push(14);
                    line1.push(11); line2.push(0); line3.push(1);
                    line1.push(8); line2.push(12); line3.push(12);
                    break;
                case 14:
                    line1.push(7); line2.push(14); line3.push(10);
                    line1.push(11); line2.push(0); line3.push(13);
                    line1.push(11); line2.push(2); line3.push(13);
                    break;
            }
        }
        for (var k = 0; k < line1.length; k++) {
            linea.push(line1[k]);
        }
        for (var k = 0; k < line2.length; k++){
            linea.push(line2[k]);
        }
        for (var k = 0; k < line3.length; k++){
            linea.push(line3[k]);
        }
    };
    return linea;
    
}
function collisions() {
    var linea = [];
    
    for (var i = 0; i < size; i++){
        line1 = new Array();
        line2 = new Array();
        line3 = new Array();
        for (var j = 0; j < world[i].length; j++) {

            if (world[j][i].north) {
                line1.push(1);
                line1.push(0);
                line1.push(1);
            } else {
                line1.push(1);
                line1.push(1);
                line1.push(1);
            }
            if (world[j][i].south) {
                line3.push(1);
                line3.push(0);
                line3.push(1);
            } else {
                line3.push(1);
                line3.push(1);
                line3.push(1);
            }
            if (world[j][i].east) {
                if (world[j][i].west) {
                    line2.push(0);
                    line2.push(0);
                    line2.push(0);
                } else {
                    line2.push(1);
                    line2.push(0);
                    line2.push(0);
                }
            } else {
                if (world[j][i].west) {
                    line2.push(0);
                    line2.push(0);
                    line2.push(1);
                } else {
                    line2.push(1);
                    line2.push(0);
                    line2.push(1);
                }
            }
        }
        
        for (var k = 0; k < line1.length; k++) {
            linea.push(line1[k]);
        }
        for (var k = 0; k < line2.length; k++){
            linea.push(line2[k]);
        }
        for (var k = 0; k < line3.length; k++){
            linea.push(line3[k]);
        }
    }
    return linea;
}
/*
createworld(15);
print();
arr();*/