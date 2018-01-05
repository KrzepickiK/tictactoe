function podajGraczy(){

    var gracz1 = "";
    var gracz2 = "";
    var podany = false;
    
    while(!podany){
        if(gracz1 == "" || gracz1 == null || gracz2== "" || gracz2==null){
            gracz1 = prompt("Podaj imię gracz1:", gracz1);
            gracz2 = prompt("Podaj imię gracz2:", gracz2);
        }else{
            alert("Witajcie " + gracz1 +" i " + gracz2);
            podany = true;
        }      
    }
    return gracze = [gracz1, gracz2];
    
}

var gracze = podajGraczy();
var game = [new Array(3),new Array(3),new Array(3)];
game = [[null,null,null],
        [null,null,null],
        [null,null,null]];
var turn = true; //true- gracz 1 false gracz -2

function renderPlayerName(gracz1,gracz2){
    var name = document.querySelector("#name");
    var sign = document.querySelector("#sign");
    
    var gracz1 = gracz1;
    var gracz2 = gracz2;
    
    name.innerText = (turn ? gracz1 : gracz2);
    sign.innerText = (turn ? "X" : "O");
}
function addEvents(){
    var fields = document.querySelectorAll(".btn");
    for(var i = 0; i < fields.length; i++){
        fields[i].addEventListener("click", onClick);
    }
}
function onClick(){
    console.log(this);
    var i = this.getAttribute("data-i");
    var j = this.getAttribute("data-j");
    console.log(i, j, game[i][j]);
    
    
    if(game[i][j] == null || game[i][j] == ""){
        game[i][j] = (turn ? 1 : 2);
        turn = !turn;
        redraw();
        checkWhoWin();
    }else{
        alert("Pole zajęte!");
    }
}
function render(){
    
var container = document.querySelector("#container");
container.innerHTML = "";
    
    for(i = 0; i < game.length; i++){
        var currentLine = game[i];
        var lineContainer = document.createElement("div");
        
        lineContainer.className = "playground__row";
        
        for(var j = 0; j < currentLine.length; j++){
            var currentElement = currentLine[j];
            var div = document.createElement('div');
            var btn = document.createElement('input');
            
            div.className = "playground__field";
            
            btn.type = "button";
            btn.className = "btn";
            btn.setAttribute("data-i", i);
            btn.setAttribute("data-j", j);
            
            switch (currentElement) {
                case 1:
                    btn.value = "x";
                break;
                case 2:
                    btn.value = "o";
                break;
                default:
                    btn.value = "";
                break;
            }
            
            lineContainer.appendChild(div);
            div.appendChild(btn);
        }
        container.appendChild(lineContainer);
    }
    
}

function checkLineWin(){
    var whoWin = false;
    for (var i = 0; i < game.length; i++){
        var first = game[i][0];
        for(var j=0; j < game[i].length; j++){
            var element = game[i][j];
            if(element == null || first != element){
                whoWin = false;
                break;
            }else{
                whoWin = game[i][j];
            }
        }
        if(whoWin){break;}
    }
    return whoWin;
}
function checkColWin(){
    var whoWin = false;
    for (var i = 0; i < game.length; i++){
        var first = game[0][i];
        for(var j=0; j < game[i].length; j++){
            var element = game[j][i];
            if(element == null || first != element){
                whoWin = false;
                break;
            }else{
                whoWin = game[j][i];
            }
        }
        if(whoWin){break;}
    }
    return whoWin;
}
function checkCrossWin(){
    var first = game[0][0];
    var whoWin = false;
    for(var i = 0; i < game.length; i++){
        var element = game [i][i];
            if(element == null || first != element){
                whoWin = false;
                break;
            }else{
                whoWin = game[i][i];}
    }
    return whoWin;
}
function checkCross2Win(){
    var lastId = game.length - 1;
    var first = game[0][lastId];
    var whoWin = false;
    for(var i = 0; i < game.length; i++){
        var element = game [i][lastId - i];
        for (var j = 0; j < game.length; j++){
            var element = game[i][j]
            if(element == null || first != element){
                whoWin = false;
                break;
            }else{
                whoWin = game[i][lastId - i];
            }
        }
    }
    return whoWin;
}

function winMessage(whoWin){
    alert(whoWin == 1 ? "wygrał " + gracze[0] : "wygrał" + gracze[1]);
}
function checkWhoWin(){
    var colWin = checkColWin();
    var rowWin = checkLineWin();
    var crossWin = checkCrossWin();
    var cross2Win = checkCross2Win();
    var draw = checkIfDraw();
    
    if(rowWin){winMessage(rowWin);resetGame();}
    else if(colWin){winMessage(colWin);resetGame();}
    else if(crossWin){winMessage(crossWin);resetGame();}
    else if(cross2Win){winMessage(cross2Win);resetGame();}
    else if(draw){alert("REMIS!");resetGame();}
}
function redraw(){
    render();
    renderPlayerName(gracze[0], gracze[1]);
    addEvents();
}

function checkIfDraw(){
    for(var i = 0; i < game.length; i++){
        for(var j = 0; j < game[i].length; j++){
            if(game[i][j] == null){return false;}
        }
    }
    return true;
}
function resetGame(){
    game = [[null,null,null],
        [null,null,null],
        [null,null,null]];
    redraw();
}
redraw();