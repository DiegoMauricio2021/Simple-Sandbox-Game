jscolor.presets.default = { // Defaults for all pickers on page
	position: 'right',
	width: 140,
	height: 140,
	paletteCols: 8,
	hideOnPaletteClick: true,
	palette: [
		'#000000', '#7d7d7d', '#870014', '#ec1c23', '#ff7e26',
		'#fef100', '#22b14b', '#00ffff', '#3f47cc', '#a349a4',
		'#ffffff', '#c3c3c3', '#b87957', '#feaec9', '#ffc80d',
		'#eee3af', '#b5e61d', '#99d9ea', '#7092be', '#c8bfe7',
	],
};

var Canvas;
var Ctx;
var fps = 30;

var CanvasX = 500;
var CanvasY = 500;
var height2;
var width2;
var color;
var bucle;
var Copia
var Rot;

var TileX, TileY;

//Tablero
var tablero;
var filas = 100;
var columnas = 100;
var txt = new String;
var list = []
var importador;
var pause = false;
var gravity = document.getElementById("gravedad");
var gravity2 = document.getElementById("gravedad2");
var continuidad = document.getElementById("continuidad");
var continuidad2 = document.getElementById("continuidad2");
var continuo = false;
var RGB = "#ff0000"
var red = 255;
var blue = 0;
var green = 0;



var elementos = [
    ["#000000","muro",false,40],
    ["#ffffff","aire",false,0],
    ["#9fd5d1","agua",true,50],
    ["#ECE2C6","arena",false,50],
    ["#917250","madera",false,50],
    ["#FE0500","fuego",false,50],
    ["#A8BB19","acido",true,50],
    ["#917250","semilla",false,50],
    ["#5c9d14","tallo",false,50],
    ["#00ffff","petalo",false,50],
    ["#Ff7514","grifo",false,50],
    ["#f0ecdc","vapor",false,50],
    ["#9dcfdd","hielo",false,-50],
    ["#Cf1020","lava",true,1200],
    ["#fbfbfb","nitrogeno",true,-200],
    ["#445055","obsidiana",false,0],
    ["#000000","arcoirisA",false,0],
    ["#000000","arcoirisE",false,0],
    ["#000000","multicolorE",false,0],
    ["#000000","multicolorA",false,0],
    ["#ffffff","rayo1",false,0],
    ["#13C0E9","rayo2",false,9500],
    ["#434B4D","metal",false,50]
];

var flower = [
     [7,7,0],
     [7,0,7],
     [7,0,7],
     [7,0,7],
     [7,7,0],
     [0,0,0],
     [0,7,0],
     [0,7,0],
     [0,7,0],
     [0,7,0],
     [0,7,0],
     [0,0,0],
     [7,7,7],
     [7,0,0],
     [7,7,7],
     [7,0,0],
     [7,7,7],
     [0,0,0],
     [7,7,7],
     [7,0,0],
     [7,7,7],
     [7,0,7],
     [7,7,7],
     [0,0,0],
     [7,7,7],
     [7,0,7],
     [7,0,7],
     [7,0,7],
     [7,7,7]
];
var Rayos = [
    [[0,1,0],
     [0,1,0],
     [0,1,0],
     [1,0,0],
     [0,1,0],
     [0,0,1],
     [0,0,1],
     [0,1,0],
     [1,0,0],
     [0,1,0]],
     [[0,0,0,0,0,1,1,0,0,0],
      [1,1,1,0,1,0,0,1,0,1],
      [0,0,0,1,0,0,0,0,1,0]],
     [[0,0,0,0,0,0,0,1],
      [0,0,0,0,0,0,1,1],
      [0,0,0,0,0,0,1,0],
      [0,0,0,0,1,1,1,0],
      [0,1,1,1,1,0,0,0],
      [1,1,0,0,0,0,0,0]]
]

var numBrocha = 3;
var brochas = [
    [[[1]]],[[[1],[1]],[[1],[1]]],[[[0],[1],[0]],[[1],[1],[1]],[[0],[1],[0]]],[[[0],[1],[1],[0]],[[1],[1],[1],[1]],[[1],[1],[1],[1]],[[0],[1],[1],[0]]],[[[0],[1],[1],[1],[0]],[[1],[1],[1],[1],[1]],[[1],[1],[1],[1],[1]],[[1],[1],[1],[1],[1]],[[0],[1],[1],[1],[0]]],
    [[[0],[0],[1],[1],[0],[0]],[[0],[1],[1],[1],[1],[0]],[[1],[1],[1],[1],[1],[1]],[[1],[1],[1],[1],[1],[1]],[[0],[1],[1],[1],[1],[0]],[[0],[0],[1],[1],[0],[0]]],[[[0],[0],[1],[1],[1],[0],[0]],[[0],[1],[1],[1],[1],[1],[0]],[[1],[1],[1],[1],[1],[1],[1]],[[1],[1],[1],[1],[1],[1],[1]],[[1],[1],[1],[1],[1],[1],[1]],[[0],[1],[1],[1],[1],[1],[0]],[[0],[0],[1],[1],[1],[0],[0]]],
    [[[0],[0],[1],[1],[1],[1],[0],[0]],[[0],[1],[1],[1],[1],[1],[1],[0]],[[1],[1],[1],[1],[1],[1],[1],[1]],[[1],[1],[1],[1],[1],[1],[1],[1]],[[1],[1],[1],[1],[1],[1],[1],[1]],[[1],[1],[1],[1],[1],[1],[1],[1]],[[0],[1],[1],[1],[1],[1],[1],[0]],[[0],[0],[1],[1],[1],[1],[0],[0]]],
    [[[0],[0],[0],[1],[1],[1],[0],[0],[0]],[[0],[1],[1],[1],[1],[1],[1],[1],[0]],[[0],[1],[1],[1],[1],[1],[1],[1],[0]],[[1],[1],[1],[1],[1],[1],[1],[1],[1]],[[1],[1],[1],[1],[1],[1],[1],[1],[1]],[[1],[1],[1],[1],[1],[1],[1],[1],[1]],[[0],[1],[1],[1],[1],[1],[1],[1],[0]],[[0],[1],[1],[1],[1],[1],[1],[1],[0]],[[0],[0],[0],[1],[1],[1],[0],[0],[0]]],
     [[[0],[0],[0],[0],[1],[1],[0],[0],[0],[0]],[[0],[0],[1],[1],[1],[1],[1],[1],[0],[0]],[[0],[1],[1],[1],[1],[1],[1],[1],[1],[0]],[[0],[1],[1],[1],[1],[1],[1],[1],[1],[0]],[[1],[1],[1],[1],[1],[1],[1],[1],[1],[1]],[[1],[1],[1],[1],[1],[1],[1],[1],[1],[1]],[[0],[1],[1],[1],[1],[1],[1],[1],[1],[0]],[[0],[1],[1],[1],[1],[1],[1],[1],[1],[0]],[[0],[0],[1],[1],[1],[1],[1],[1],[0],[0]],[[0],[0],[0],[0],[1],[1],[0],[0],[0],[0]]]
];
var BrochaPer = [];

//Colores

var ClickX,ClickY;
var c_n = 0;
var Sel = false
var Selecion
var seleccionado = false;
var limpio = true;
var can = 0
var Click = false;
var evento = new Event("click");
var ini = false;
var BrochaEd = document.getElementById("Brocha");
var Vis_Temp = false; 
var guardado = [];
//Clicks

var ColorPicker = document.getElementById("color")


function Color() {
    ColorPicker = document.getElementById("color")
    elementos[16][0] = ColorPicker.jscolor.toHEXString();
    elementos[17][0] = ColorPicker.jscolor.toHEXString();
    document.getElementById("arcoiris").style.backgroundColor = ColorPicker.jscolor.toHEXString();
}

function Speed() {
    var speed = document.getElementById("speed")
    fps = parseInt(speed.value)
    clearInterval(bucle)
    bucle = setInterval(principal,1000/fps);
}

function Gravedad() {
    i = true
    if (c_n == 15 && i) {
        i = false
        c_n = 16;
    }
    if (c_n == 16 && i) {
        i = false
        c_n = 15;
    }
    
}
function Continuo() {
    continuo = !continuo
    
}

function first(Evento) {
    evento = Evento;
    
    if (Evento.type == "mousedown" && i) {
        numBrocha = BrochaEd.value;
        Click = true;
        ini = true;
    }
    i = true
    if (Evento.type == "contextmenu") {
        evento.preventDefault();
    }
    if (Evento.type == "click") {
        if (c_n == 6) {
            ClickY = Math.floor(Evento.offsetY/TileY);
            ClickX = Math.floor(Evento.offsetX/TileX);
            if (ClickY != 0 && ClickX != 0) {
                tablero[ClickY][ClickX].proxEstado = c_n;
                tablero[ClickY][ClickX].camDir = true;
            }
        }
        if ( Copia && !seleccionado && c_n == 0 ) {
            Copia = false
            i = false
            var x = 0;
            var y = height2;
            limpio = false;
            limpiado()
            var k = 0
            for(y = 0; y < BrochaPer.length;y++){
                for (let x = 0; x < BrochaPer[0].length; x++) {
                    k++
                    if (tablero[y+ClickY][x+ClickX] != undefined && BrochaPer[y][x] != 0 && ClickX != 0 && ClickY != 0) {
                        tablero[y+ClickY][x+ClickX].proxEstado = BrochaPer[y][x];
                        tablero[y+ClickY][x+ClickX].estado = BrochaPer[y][x];
                        tablero[y+ClickY][x+ClickX].proxTemp = elementos[BrochaPer[y][x]+1][3];
                        tablero[y+ClickY][x+ClickX].temperatura = elementos[BrochaPer[y][x]+1][3];
                        tablero[y+ClickY][x+ClickX].color = color[k]
                        if (BrochaPer[y][x] == 17) {
                            tablero[y+ClickY][x+ClickX].Red = parseInt(color[k][1] + color[k][2],16)
                            tablero[y+ClickY][x+ClickX].Green = parseInt(color[k][3] + color[k][4],16)
                            tablero[y+ClickY][x+ClickX].Blue = parseInt(color[k][5] + color[k][6],16)
                        }
                        tablero[y+ClickY][x+ClickX].seleccionado = false;
                    }
                    
                }
            }
            if (ClickX != 0 && ClickY != 0) {
                BrochaPer = [];
            }
        }
    }
    if (Evento.type = "mousemove") {
        if (Click) {
            evento = Evento;
        }
        if ( Copia && !seleccionado && c_n == 0) {
            ClickY = Math.floor(Evento.offsetY/TileY);
            ClickX = Math.floor(Evento.offsetX/TileX);
            limpio = false;
            limpiado()

                for (let y = 0; y < BrochaPer.length; y++) {
                    for(let x = 0;x < BrochaPer[0].length; x++){
                        if (tablero[y+ClickY][x+ClickX] != undefined && BrochaPer[y][x] != 0) {
                            tablero[y+ClickY][x+ClickX].color2 = elementos[BrochaPer[y][x]+1][0]
                            tablero[y+ClickY][x+ClickX].seleccionado = true;
                            
                        }
                    }
                }
        }
        if (Sel) {
            MovSel(Evento)
            
        }
    }
    if (Evento.type == "mouseup" && ini) {
        Click = false;
    }
}

function seleccionar(Evento) {
    c_n = 0
    var i = true 
    Sel = false
    ClickX = Math.floor(Evento.offsetX/TileX)
    ClickY = Math.floor(Evento.offsetY/TileY)
    if (limpio) {
        BrochaPer = [];
        Sel = true
        limpio = false;
        seleccionado = true
        pause = false
    }
    if (Sel == false && !limpio) {
        i = false
        limpio = true
        pause = true
    }
}

function MovSel(Evento) {
    pause = true
    Selecion = []
    if (Math.floor(Evento.offsetX/TileX) != 0) {
        ClickX2 = Math.floor(Evento.offsetX/TileX)
    }
    if (Math.floor(Evento.offsetY/TileY) != 0) {
        ClickY2 = Math.floor(Evento.offsetY/TileY)
    }  
    limpiado()  
    if (ClickY-ClickY2 < 0) {
        for (let y = ClickY; y < ClickY2; y++) {
            if (ClickX-ClickX2 < 0) {
                Selecion.push(new Array(ClickX2-ClickX))
                for (let x = ClickX; x < ClickX2; x++) {
                    Selecion[y-ClickY][x-ClickX] = tablero[y][x]
                    tablero[y][x].seleccionado = true
                    if (y == ClickY || y == ClickY2-1) {
                        tablero[y][x].color2 = "#00ffff"
                    }
                    if (x == ClickX || x == ClickX2-1) {
                        tablero[y][x].color2 = "#00ffff"
                    }
                    if ((x > ClickX && x < ClickX2-1) && (y > ClickY && y < ClickY2-1)) {
                        tablero[y][x].color2 = "#ffffff"
                    }
                }
            }
            if (ClickX-ClickX2 >= 0) {
                Selecion.push(new Array(ClickX-ClickX2))
                for (let x = ClickX2; x <= ClickX; x++) {
                    Selecion[y-ClickY][x-ClickX2] = tablero[y][x]
                    tablero[y][x].seleccionado = true
                    if (y == ClickY || y == ClickY2-1) {
                        tablero[y][x].color2 = "#00ffff"
                    }
                    if (x == ClickX2 || x == ClickX) {
                        tablero[y][x].color2 = "#00ffff"
                    }
                    if ((x > ClickX2 && x < ClickX) && (y > ClickY && y < ClickY2-1)) {
                        tablero[y][x].color2 = "#ffffff"
                    }
                }
            }
            
        }
    }
    if (ClickY-ClickY2 >= 0) {
        for (let y = ClickY2; y <= ClickY; y++) {
            if (ClickX-ClickX2 < 0) {
                Selecion.push(new Array(ClickX2-ClickX))
                for (let x = ClickX; x < ClickX2; x++) {
                    Selecion[y-ClickY2][x-ClickX] = tablero[y][x]
                    tablero[y][x].seleccionado = true
                    if (y == ClickY2 || y == ClickY) {
                        tablero[y][x].color2 = "#00ffff"
                    }
                    if (x == ClickX || x == ClickX2-1) {
                        tablero[y][x].color2 = "#00ffff"
                    }
                    if ((x > ClickX && x < ClickX2-1) && (y > ClickY2 && y < ClickY)) {
                        tablero[y][x].color2 = "#ffffff"
                    }
                }
            }
            if (ClickX-ClickX2 >= 0) {
                Selecion.push(new Array(ClickX-ClickX2))
                for (let x = ClickX2; x <= ClickX; x++) {
                    Selecion[y-ClickY2][x-ClickX2] = tablero[y][x] 
                    tablero[y][x].seleccionado = true
                    if (y == ClickY2 || y == ClickY) {
                        tablero[y][x].color2 = "#00ffff"
                    }
                    if (x == ClickX2 || x == ClickX) {
                        tablero[y][x].color2 = "#00ffff"
                    }
                    if ((x > ClickX2 && x < ClickX) && (y > ClickY2 && y < ClickY)) {
                        tablero[y][x].color2 = "#ffffff"
                    }
                }
            }
            
        }
    }
    for (let j = 0; j < Selecion.length; j++) {
        for (let i = 0; i < Selecion[j].length; i++) {
            
        }    
    }
}

function Clear() {
    pause = true
    for (let y = 0; y < filas; y++) {
        for (let x = 0; x < columnas; x++) {
            if (x == 0 || y == 0 || y == filas-1 || x == columnas-1) {
                tablero[y][x].proxEstado = -1;
            }
            else{
                tablero[y][x].proxEstado = 0;
                tablero[y][x].estado = 0;
            }
            tablero[y][x].proxTemp = elementos[tablero[y][x].proxEstado+1][3];
        }
    }
    pause = false
}

function limpiado() {
    if (!limpio) {
        for (let y = 0; y < tablero.length; y++) {
            for (let x = 0; x < tablero[0].length; x++) {
                tablero[y][x].seleccionado = false;
                tablero[y][x].color2 = "#ffffff"
                
            }
            
        }
    }
    if (!Sel) {
        pause = false
    }
}

function Agua() {
    c_n = 1;
}

function Arena() {
    c_n = 2;
}

function Muro() {
    c_n = -1;
}

function Madera(){
    c_n = 3;
}

function Fuego(){
    c_n = 4;
}

function Acido() {
    c_n = 5;
}

function Flor() {
    c_n = 6;
}
function Grifo() {
    c_n = 9;
}

function Hielo() {
    c_n = 11;
}

function Lava() {
    c_n = 12;
}

function Nitrogeno() {
    c_n = 13;
}

function Arcoiris() {
    c_n = 16;
    ColorPicker.hidden = false
    gravity.hidden = false

}

function Multicolor() {
    c_n = 17;
    continuidad.hidden = false
}

function Rayo() {
    c_n = 19
}

function Metal() {
    c_n = 21;
}

function Vista() {
    Vis_Temp = !Vis_Temp;
}

function crearTablero(f,c) {
    var obj = new Array(f);
    for(y=0;y<c;y++){
        obj[y] = new Array(c);
    }
    return(obj);
}

function inicializarTablero(tablero) {
    var estado;
    for(y=0;y<filas;y++){
        for(x=0;x<columnas;x++){
            estado = 0;
            if (y == filas-1){
                estado = -1;
            }
            if (y == 0) {
                estado = -1;
            }
            if (x == columnas-1){
                estado = -1;
            }
            if (x == 0) {
                estado = -1;
            }
            
            
            tablero[y][x] = new Agente(x,y,estado);
            tablero[y][x].proxTemp = elementos[tablero[y][x].estado+1][3]
            if (Math.floor(y/2) == y/2) {
                tablero[y][x].moveL = true;
            }
            else{
                tablero[y][x].moveL = false;
            }
        }
    }

    for(y=0;y<filas;y++){
        for(x=0;x<columnas;x++){

            tablero[y][x].addVecinos();
        }
    }
}

//Objeto
var Agente = function (x,y,estado) {
    
    this.x = x;
    this.y = y;
    this.estado = estado;
    this.proxEstado = estado;
    this.vecinos = [];
    this.camDir = true;
    this.moveL;
    this.elemento;
    this.time = 0;
    this.inflamable = false;
    this.vida = 15;
    this.expandir = 3;
    this.liquido = false;
    this.derretible = true;
    this.k = flower.length-1,this.l = 0;
    this.copia;
    this.intensity = 2;
    this.temperatura;
    this.proxTemp;
    this.seguro = false;
    this.color = "#ffffff";
    this.color2 = "#ffffff";
    this.gravedad = false
    this.Red = 255;
    this.Blue = 0;
    this.Green = 0;
    this.continuo = false;
    this.seleccionado;
    this.rayo = 0;
    this.rallado = false

    if (this.proxEstado == undefined ) {
        this.proxEstado = estado;
    }

    this.addVecinos = function(){
        var xVecino;
        var yVecino;

        for (i=-1;i<2;i++){
            for (let j = -1; j < 2; j++) {
                xVecino = (this.x+j + columnas) % columnas;
                yVecino = (this.y+i + filas) % filas;

                if(i!=0 || j!=0){
                    
                    this.vecinos.push(tablero[yVecino][xVecino]);
                }
            }
        }
    }

this.dibuja = function(){
        var color;
        for (let e = 0; e < elementos.length; e++) {
            if (this.estado == e-1){
            this.elemento = elementos[e][1];
            this.liquido = elementos[e][2];
            if (!Vis_Temp) {
                if (this.estado != 15 && this.estado != 16) {
                    color = elementos[e][0];
                }
                if ((this.estado == 15 || this.estado == 16) && this.color == "#ffffff") {
                    this.color = elementos[16][0];
                    color = elementos[16][0];
                }
                if (((this.estado == 15 || this.estado == 16) && this.color != "#ffffff") ) {
                    color = this.color;
                }
                if ((this.seleccionado && this.color2 != "#ffffff")) {
                    color = this.color2
                }
                if ( this.estado == 17 || this.estado == 18) {
                    color = this.color
                    if (this.continuo) {
                        this.color = RGB;
                    }
                }
            }
            else{
                var red;
                var blue;
                var text = "";
                if (this.temperatura >= 0) {
                    if (this.temperatura < 101) {
                        red = (this.temperatura+75);
                    }
                    else{
                        red = 255;
                    }
                    text = red.toString(16)
                    color = "#"+text+"1517";
                }
                if (this.temperatura < 0) {
                    if (this.temperatura > -101) {
                        blue = ((this.temperatura*-1)+75);  
                    }
                    else{
                        blue = 255
                    }
                    text = blue.toString(16)
                    color = "#"+"1517"+text;
                }
            }
            }
        }
    
        if (this.elemento == "madera" || this.elemento == "petalo" || this.elemento == "tallo") {
            this.inflamable = true;
        }
        if (this.elemento == "muro" || this.elemento == "aire" || this.elemento == "acido" || this.elemento == "fuego" || this.elemento == "agua") {
            this.derretible = false;
        }
        else{
            this.derretible = true;
        }
        Ctx.fillStyle = color;
        Ctx.imageSmoothingEnabled = false;
        Ctx.fillRect(this.x*TileX, this.y*TileY, TileX, TileY);
    
    

}
 this.nuevoCiclo = function(){ 
    i = true
    if (this.estado != 0 && this.estado != -1) {
        for (let e = 0; e < this.vecinos.length; e++) {
            if (this.temperatura > -100 && this.temperatura < 200) {             
                if (this.proxTemp > this.vecinos[e].proxTemp && this.vecinos[e].estado != -1 && this.vecinos[e].temperatura <= 99 && this.vecinos[e].estado != 0 && this.vecinos[e].proxEstado != 0) {
                    this.proxTemp -= 1;
                    this.vecinos[e].proxTemp += 1;
                }
            }
            if (this.temperatura < -100 || this.temperatura > 200) {
                if (this.proxTemp > this.vecinos[e].proxTemp && this.vecinos[e].estado != -1 && this.vecinos[e].temperatura <= 98 && this.vecinos[e].estado != 0 && this.vecinos[e].proxEstado != 0) {
                    this.proxTemp -= 2;
                    this.vecinos[e].proxTemp += 2;
                }
            }
            
        }
    }
    var int = 0;
    i = false;
    if (this.proxEstado == 0) {
        if (!this.seleccionado) {
            this.color = "#ffffff";
        }
        this.copia = 0;
        this.rayo = -1;
        this.time = 0;
        this.k = flower.length-1,this.l = 0;
        this.vida = 15;
        this.intensity = 2;
        this.expandir = 3 * (this.intensity/6)
        this.Red = 255;
        this.Blue = 0;
        this.Green = 0;
        this.continuo = false
        this.rallado = false;
        
        for (let e = 0; e < this.vecinos.length; e++) {
            
            
            
        }
        
        
        if (!this.seguro) {
            if (this.proxTemp > 0) {
                this.proxTemp -= (1+(Math.floor(this.temperatura/5)))
            }
            if (this.proxTemp < 0) {
                this.proxTemp += (1+(Math.floor(this.temperatura/5))*-1)
            }
            
        }
        this.seguro = false

    }
    i = true
    if (this.estado > 0 && this.proxEstado > 0 && this.liquido) {
        if (tablero[this.y+1 ][this.x].estado == 0 && i) {
            i = false
            tablero[this.y+1][this.x].proxEstado = this.estado;
            this.proxEstado = 0;
            tablero[this.y+1][this.x].proxTemp = this.temperatura;
            this.proxTemp = tablero[this.y+1][this.x].temperatura;
        }
        if (tablero[this.y-1 ][this.x].proxEstado > 0 || tablero[this.y-1 ][this.x].proxEstado == 5){
            if (tablero[y][this.x - 1].proxEstado == 0  && i && !this.moveL) {
                i = false;
                tablero[y][this.x-1].proxEstado += this.estado
                this.proxEstado = 0;
                tablero[this.y][this.x-1].proxTemp = this.temperatura;
                this.proxTemp = tablero[this.y][this.x-1].temperatura;
            }
            if (tablero[y][this.x+1].proxEstado == 0  && i && this.moveL) {
                i = false;
                tablero[y][this.x + 1].proxEstado += this.estado
                this.proxEstado = 0;
                tablero[this.y][this.x+1].proxTemp = this.temperatura;
                this.proxTemp = tablero[this.y][this.x+1].temperatura;
            }
        }
        if (tablero[this.y+1 ][this.x].proxEstado > 0 || tablero[this.y+1 ][this.x].proxEstado == 5 ) {
            if (tablero[y][this.x - 1].proxEstado == 0  && i && !this.moveL) {
                i = false;
                tablero[y][this.x-1].proxEstado += this.estado
                this.proxEstado = 0;
                tablero[this.y][this.x-1].proxTemp = this.temperatura;
                this.proxTemp = tablero[this.y][this.x-1].temperatura;
            }
            if (tablero[y][this.x+1].proxEstado == 0  && i && this.moveL) {
                i = false;
                tablero[y][this.x + 1].proxEstado += this.estado
                this.proxEstado = 0;
                tablero[this.y][this.x+1].proxTemp = this.temperatura;
                this.proxTemp = tablero[this.y][this.x+1].temperatura;
            }
            if ((tablero[y][this.x - 1].estado == -1 || tablero[y][this.x+1].estado == -1)  && i && this.camDir) {
                this.camDir = false;
                
                i = false;
                for (let x = 0; x < columnas; x++) {
                    if(tablero[this.y][x].moveL == true){
                        tablero[this.y][x].moveL = false;
                    }
                    else{
                        tablero[this.y][x].moveL = true;
                    }                    
                }

            }
    
            if (!this.camDir) {
                if (tablero[this.y-1 ][this.x].moveL == this.moveL) {
                    for (let x = 0; x < columnas; x++) {
                        if(tablero[this.y-1][x].moveL == true){
                            tablero[this.y][x].moveL = false;
                        }
                        else{
                            tablero[this.y][x].moveL = true;
                        }                    
                    }
                }
            }
        }
        var d = Math.floor(Math.random()*2) ? false:true;
        if (i &&  ( tablero[this.y+1][this.x+1].estado == 0 || tablero[this.y+1 ][this.x+1].estado == 5) && d) {
            i = false
            tablero[this.y+1][this.x+1].proxEstado = this.estado;
            this.proxEstado = tablero[this.y+1][this.x+1].estado;
            tablero[this.y+1][this.x+1].estado = this.estado;
            tablero[this.y+1][this.x+1].proxTemp = this.tablero;
            this.proxTemp = tablero[this.y+1][this.x+1].temperatura;
        }
        if (i &&  ( tablero[this.y+1][this.x-1].estado == 0 || tablero[this.y+1 ][this.x-1].estado == 5) && !d) {
            i = false
            tablero[this.y+1][this.x-1].proxEstado = this.estado;
            this.proxEstado = tablero[this.y+1][this.x-1].estado;
            tablero[this.y+1][this.x-1].estado = this.estado;
            tablero[this.y+1][this.x-1].proxTemp = this.tablero;
            this.proxTemp = tablero[this.y+1][this.x-1].temperatura;
        }
        
    }
    if (this.estado > 0 && this.proxEstado > 0 && this.elemento == "vapor") {
        
        this.time++;
        if (this.time >= fps/2) {
            this.proxTemp += -1
            this.time = 0;
        }
        if (this.proxTemp <= 20) {
            this.proxEstado = 1;
        }
        if ((tablero[this.y-1 ][this.x].estado == 0  || tablero[this.y-1 ][this.x].liquido) && i) {
            i = false
            tablero[this.y-1][this.x].proxEstado = this.estado;
            this.proxEstado = tablero[this.y-1][this.x].estado;
            tablero[this.y-1][this.x].proxTemp = this.temperatura;
            this.proxTemp = tablero[this.y-1][this.x].temperatura;
        }
        if (tablero[this.y+1 ][this.x].proxEstado == 10){
            if (tablero[y][this.x - 1].proxEstado == 0  && i && !this.moveL) {
                i = false;
                tablero[y][this.x-1].proxEstado += this.estado
                this.proxEstado = 0;
                tablero[this.y][this.x-1].proxTemp = this.temperatura;
                this.proxTemp = tablero[this.y][this.x-1].temperatura;
            }
            if (tablero[y][this.x+1].proxEstado == 0  && i && this.moveL) {
                i = false;
                tablero[y][this.x + 1].proxEstado += this.estado
                this.proxEstado = 0;
                tablero[this.y][this.x+1].proxTemp = this.temperatura;
                this.proxTemp = tablero[this.y][this.x+1].temperatura;
            }
        }
        if (tablero[this.y-1 ][this.x].proxEstado == 10 ) {
            if (tablero[y][this.x - 1].proxEstado == 0  && i && !this.moveL) {
                i = false;
                tablero[y][this.x-1].proxEstado += this.estado
                this.proxEstado = 0;
                tablero[this.y][this.x-1].proxTemp = this.temperatura;
                this.proxTemp = tablero[this.y][this.x-1].temperatura;
            }
            if (tablero[y][this.x+1].proxEstado == 0  && i && this.moveL) {
                i = false;
                tablero[y][this.x + 1].proxEstado += this.estado
                this.proxEstado = 0;
                tablero[this.y][this.x+1].proxTemp = this.temperatura;
                this.proxTemp = tablero[this.y][this.x+1].temperatura;
            }
            if ((tablero[y][this.x - 1].estado == -1 || tablero[y][this.x+1].estado == -1)  && i && this.camDir) {
                this.camDir = false;
                
                i = false;
                for (let x = 0; x < columnas; x++) {
                    if(tablero[this.y][x].moveL == true){
                        tablero[this.y][x].moveL = false;
                    }
                    else{
                        tablero[this.y][x].moveL = true;
                    }                    
                }

            }
            if (!this.camDir) {
                if (tablero[this.y+1 ][this.x].moveL == this.moveL) {
                    for (let x = 0; x < columnas; x++) {
                        if(tablero[this.y+1][x].moveL == true){
                            tablero[this.y][x].moveL = false;
                        }
                        else{
                            tablero[this.y][x].moveL = true;
                        }                    
                    }
                }
            }
        }
        
        
    }
    if (this.elemento == "agua"){

        if (i && (tablero[this.y+1 ][this.x].estado == 5)) {
            i = false
            tablero[this.y+1][this.x].proxEstado = 1;
            this.proxEstado = 5;
            tablero[this.y+1][this.x].estado = 1;
        }
        if (this.temperatura >= 100) {
            this.proxEstado = 10;
        }
        if (this.temperatura < 0) {
            this.proxEstado = 11;
        }
        
    }
    if (this.elemento == "arena" || (this.elemento == "arcoirisA")) {
        if (i && ( tablero[this.y+1][this.x].proxEstado == 0 || tablero[this.y+1 ][this.x].proxEstado == 1)) {
            i = false
            tablero[this.y+1][this.x].proxEstado = this.estado;
            this.proxEstado = tablero[this.y+1][this.x].estado;
            tablero[this.y+1][this.x].estado = this.estado;
            tablero[this.y+1][this.x].proxTemp = this.temperatura;
            this.proxTemp = tablero[this.y+1][this.x].temperatura;
            tablero[this.y+1][this.x].color = this.color
        }
        if (i &&  ( tablero[this.y+1][this.x+1].estado == 0 || tablero[this.y+1 ][this.x+1].estado == 1)) {
            i = false
            tablero[this.y+1][this.x+1].proxEstado = this.estado;
            this.proxEstado = tablero[this.y+1][this.x+1].estado;
            tablero[this.y+1][this.x+1].estado = this.estado;
            tablero[this.y+1][this.x+1].proxTemp = this.temperatura;
            this.proxTemp = tablero[this.y+1][this.x+1].temperatura;
            tablero[this.y+1][this.x+1].color = this.color
        }
        if (i &&  ( tablero[this.y+1][this.x-1].estado == 0 || tablero[this.y+1 ][this.x-1].estado == 1)) {
            i = false
            tablero[this.y+1][this.x-1].proxEstado = this.estado;
            this.proxEstado = tablero[this.y+1][this.x-1].estado;
            tablero[this.y+1][this.x-1].estado = this.estado;
            tablero[this.y+1][this.x-1].proxTemp = this.temperatura;
            this.proxTemp = tablero[this.y+1][this.x-1].temperatura;
            tablero[this.y+1][this.x+1].color = this.color
        }

    }
    if (this.elemento == "fugo") {
        if (this.vida == 0 && i) {
            i = false;
            this.proxEstado = 0;
        }
        if(this.vida > 0 && i){
            this.time += 1;
            for (let e = 0; e < this.vecinos.length; e++) {
                if (this.vecinos[e].inflamable && this.temperatura <= this.vecinos[e].temperatura) {
                    this.vecinos[e].proxEstado = 4;
                }
                if (this.time == fps) {
                    this.vida == 1;
                    this.vecinos[e].vida == 0;
                }
                if (this.vecinos[e].estado == 0) {
                    this.vecinos[e].proxEstado = 4;
                }
            }
            this.vida -= 1
        }
    }
    if (this.elemento == "fuego") {
        var quemados = 0;
        for (let e = 0; e < this.vecinos.length; e++) {
            if (this.vecinos[e].inflamable && this.time >= fps/32) {
                quemados += 1;
                this.vecinos[e].proxEstado = 4;
                this.vecinos[e].inflamable = false;
            }
            if (quemados == 0 && this.vecinos[e].estado == 0 && this.expandir > 0 && this.time >= fps/32) {
                quemados += 1;
                this.vecinos[e].proxEstado = 4;
                this.vecinos[e].inflamable = false;
                this.vecinos[e].expandir = this.expandir-1;
                this.expandir -= 1;
                this.vecinos[e].temperatura = this.temperatura;
            }
        }
        if (quemados == 0 && this.time >= fps/((this.intensity*2)+20)) {
            this.proxEstado = 0;
            this.vida = 15;
            this.expandir = 3* (this.intensity/6);
        }
        this.time++;
    }
    if (this.elemento == "acido") {
        for (let e = 0; e < this.vecinos.length; e++) {
            if (this.vecinos[e].derretible) {
                this.vecinos[e].proxEstado = 0;
                this.proxEstado = 0;
                this.estado = 0;
            }
        }
    }
    if (this.elemento == "semilla") {
        if (tablero[this.y+1 ][this.x].estado == 0 || tablero[this.y+1][this.x].liquido && i) {
            i = false
            tablero[this.y+1][this.x].proxEstado = this.estado;
            this.proxEstado = tablero[this.y+1][this.x].estado;
        }
        if (this.k <= -1 && i) {
            this.proxEstado = flower[0][(Math.floor(flower[0].length/2)+1)];
            i = false;
        }
        if (this.time >= fps/32 && i) {
            
            if ( flower[this.k][this.l] != 0) {
                this.time = 0; 
            }
            this.l++;
        }
        if (this.l >= flower[0].length && i) {
            this.l = 0;
            this.k = this.k - 1;
        }
        if(i ){
            this.time++;
            if (tablero[(this.y+this.k)-(flower.length-1)][(this.x+this.l)-(Math.floor(flower[0].length/2))] != tablero[this.y][this.x]) {
                if (flower[this.k][this.l] != 0  && tablero[(this.y+this.k)-(flower.length-1)][(this.x+this.l)-(Math.floor(flower[0].length/2))].estado != -1) {
                    tablero[(this.y+this.k)-(flower.length-1)][(this.x+this.l)-(Math.floor(flower[0].length/2))].proxEstado = flower[this.k][this.l];  
                    tablero[(this.y+this.k)-(flower.length-1)][(this.x+this.l)-(Math.floor(flower[0].length/2))].proxTemp = elementos[flower[this.k][this.l]+1][3]
                }
                
            }  
            for (let k = 0; k < list.length; k++) {
                if (list[k] == 17) {
                    tablero[(this.y+this.k)-(flower.length-1)][(this.x+this.l)-(Math.floor(flower[0].length/2))].Red = parseInt(color[k][1] + color[k][2],16)
                    tablero[(this.y+this.k)-(flower.length-1)][(this.x+this.l)-(Math.floor(flower[0].length/2))].Green = parseInt(color[k][3] + color[k][4],16)
                    tablero[(this.y+this.k)-(flower.length-1)][(this.x+this.l)-(Math.floor(flower[0].length/2))].Blue = parseInt(color[k][5] + color[k][6],16)
                }
                
            } 
        }
    }
    if (this.elemento == "grifo") {
        if (this.copia == 0) {
            for (let e = 0; e < this.vecinos.length; e++) {
                if (this.vecinos[e].estado != this.estado && this.vecinos[e].estado != 0 && this.vecinos[e].estado != 6) {
                    this.copia = this.vecinos[e].estado
                }
                if(this.vecinos[e].estado == this.estado && this.vecinos[e].copia != 0){
                    this.copia = this.vecinos[e].copia
                }
                
            }
        }
        else{
            for (let e = 0; e < this.vecinos.length; e++) {
                if (this.vecinos[e].proxEstado == 0) {
                    
                    this.vecinos[e].proxEstado = this.copia;
                    this.vecinos[e].proxTemp = elementos[this.copia+1][3]
                }
            }
        }
    }
    if (this.elemento == "hielo") {
        if (this.temperatura > 20) {
            this.proxEstado = 1;
        }
    }
    if (this.elemento == "lava") {
        if (this.temperatura < 50) {
            this.proxEstado = 14;
        }
        for (let e = 0; e < this.vecinos.length; e++) {
            if (this.vecinos[e].proxEstado == 1 && i) {
                i = false;
                this.vecinos[e].proxEstado = 10;
                this.proxEstado = 14;
            }
        }
    }
    if ((this.elemento == "multicolorE" || this.elemento == "multicolorA") && !this.continuo) {
        if (this.Red == 255 && this.Green != 255) {
            this.Green += 5;
        }
        if (this.Red > 5 && this.Green == 255) {
            this.Red -= 5;
        }
        if (this.Blue != 255 && this.Green == 255) {
            this.Blue += 5;
        }
        if (this.Green > 5 && this.Blue == 255) {
            this.Green -= 5;
        }
        if (this.Blue == 255 && this.Red != 255) {
            this.Red += 5;
        }
        if (this.Blue > 5 && this.Red == 255) {
            this.Blue -= 5;
        }
        if (this.Green < 16) {
            this.Green = "0"+this.Green.toString(16)
        }
        else{
            this.Green = this.Green.toString(16)
        }
        if (this.Blue < 16) {
            this.Blue = "0"+this.Blue.toString(16)
        }
        else{
            this.Blue = this.Blue.toString(16)
        }
        if (this.Red < 16) {
            this.Red = "0"+this.Red.toString(16)
        }
        else{
            this.Red = this.Red.toString(16)
        }
        this.color = "#"+this.Red+this.Green+this.Blue;
        this.Red = parseInt(this.Red,16)
        this.Green = parseInt(this.Green,16)
        this.Blue = parseInt(this.Blue,16)
    }
    if (this.elemento == "rayo1") {
        if (this.rayo == -1 && !this.rallado) {
            this.rayo = Rayos[Math.floor(Math.random()*3)]
            y = 0;
            x = 0;
            camY = Math.floor(Math.random()*2);
            if (camY == 0) {
                camY = -1
            }
            CamX = Math.floor(Math.random()*2);
            if (CamX == 0) {
                CamX = -1
            }
        }
        
        if (!this.rallado) {
            for (let k = 0; k < 16; k++) {
                if (this.rayo == Rayos[0]) {
                    if (this.time >= fps/30) {
                        this.time = 0;
                        x++;
                    }
                    if (x >= this.rayo[0].length) {
                        x = 0;
                        y++;
                    }
                    if (y >= this.rayo.length) {
                        this.rallado = true;
                        this.proxEstado = 0;
                        x = 0;
                        y = 0;
                    }
                    this.time++;
                }
                if (this.rayo == Rayos[1]) {
                    if (this.time >= fps/30) {
                        this.time = 0;
                        y++;
                    }
                    if (y >= this.rayo.length) {
                        y = 0;
                        x++;
                    }
                    if (x >= this.rayo[0].length) {
                        this.rallado = true;
                        this.proxEstado = 0;
                        x = 0;
                        y = 0;
                    }
                    this.time++;
                }
                if (this.rayo == Rayos[2]) {
                    if (this.time >= fps/30) {
                        this.time = 0;
                        x -= 1;
                    }
                    if (x <= 0) {
                        x = this.rayo[0].length-1;
                        y++;
                    }
                    if (y >= this.rayo.length) {
                        this.rallado = true;
                        this.proxEstado = 0;
                        x = this.rayo[0].length-1;
                        y = 0;
                    }
                    if (this.rayo[y][x] != 0 && tablero[this.y+(y*camY)][this.x+((x-(this.rayo[0].length-1)))*CamX] != tablero[this.y][this.x] && tablero[this.y+(y*camY)][this.x+((x-(this.rayo[0].length-1)))*CamX].estado == 0) {
                        tablero[this.y+(y*camY)][this.x+((x-(this.rayo[0].length-1)))*CamX].proxEstado = this.rayo[y][x]*19
                        tablero[this.y+(y*camY)][this.x+((x-(this.rayo[0].length-1)))*CamX].proxTemp = 9500;
                    }
                    if (tablero[this.y+(y*camY)][this.x+((x-(this.rayo[0].length-1)))*CamX].estado != 0) {
                        this.rallado = true;
                        y = this.rayo.length
                    }
                    this.time++;
                }
                if (this.rayo != Rayos[2]) {
                    if (this.rayo[y][x] != 0 && tablero[this.y+(y*camY)][this.x+(x*CamX)] != tablero[this.y][this.x] && tablero[this.y+(y*camY)][this.x+(x*CamX)].estado == 0) {
                        tablero[this.y+(y*camY)][this.x+(x*CamX)].proxEstado = this.rayo[y][x]*19
                        tablero[this.y+(y*camY)][this.x+(x*CamX)].proxTemp = 9500;
                    }
                    if (tablero[this.y+(y*camY)][this.x+(x*CamX)].estado != 0 && tablero[this.y+(y*camY)][this.x+(x*CamX)].estado != 19 && tablero[this.y+(y*camY)][this.x+(x*CamX)].estado != 18) {
                            this.rallado = true;
                            y = this.rayo.length;
                    }
                }
            }
        }
    }
    if (this.elemento == "rayo2") {
        this.time++;
        if (this.time >= fps/20) {
            this.proxEstado = 0;
            this.proxTemp = 50;
        }

        for (let e = 0; e < this.vecinos.length; e++) {
            if (this.vecinos[e].estado == 20 &&  this.proxEstado != 0) {
                this.vecinos[e].proxTemp = 9500;
                this.proxEstado = 0;
            }
            
        }
    }
    
}
this.cambiar = function () {
    if (this.estado != this.proxEstado ){
        this.estado = this.proxEstado;
    }
    if (this.temperatura != this.proxTemp ){
        this.temperatura = this.proxTemp;
    }

}
}



function inicializa(){
    Canvas = document.getElementById("canvas");
    Ctx = Canvas.getContext("2d");
   
    Canvas.addEventListener("mousemove",first);
    Canvas.addEventListener("mousedown",first);
    Canvas.addEventListener("mouseup",first);
    Canvas.addEventListener("click",first);
    addEventListener("keypress",Rotar);
    Canvas.addEventListener("contextmenu",first);
    Canvas.addEventListener("dblclick",seleccionar);

    Canvas.width = CanvasX;
    Canvas.height = CanvasY;

    TileX = Math.floor(CanvasX/filas);
    TileY = Math.floor(CanvasY/columnas);

   bucle = setInterval(principal,1000/fps);
}

tablero = crearTablero(filas,columnas);

inicializarTablero(tablero);

function borrarCanvas(){
    Ctx.fillStyle = "#ffffff";
    Ctx.fillRect(0,0,CanvasY,CanvasX);
}

function Rotar(evento){
    if (evento.key == "t") {
        if (BrochaPer[0] != undefined) {
            var CopiaFlower = flower;
            var Medio = [];
            var i = true
            if (Rot == 3) {
                Rot = 0;
                i = false;
                Medio = CopiaFlower;
            }
            if (Rot == 2) {
                i = false
                Rot++;
                var k = 0
                for(y = CopiaFlower.length-1; y >= 0;y -= 1){
                    Medio.push(new Array)
                    for(x = 0; x < CopiaFlower[0].length;x++){
                        if (CopiaFlower[y] != undefined) {
                            Medio[k].push(CopiaFlower[y][x])
                        }
                        else{
                            Medio[k].push(0)
                        }
                    }
                    k ++
                }
                var CopiaMedio = Medio;
                Medio = [];
                for(x = 0; x < CopiaMedio.length;x++){
                    Medio.push(new Array)
                    for(y = 0; y < CopiaMedio[0].length;y++){
                        if (CopiaMedio[x] != undefined) {
                            Medio[x].push(CopiaMedio[y][x])
                        }
                        else{
                            Medio[x].push(0)
                        }
                    }
                }
            }
            if (Rot == 1) {
                Rot++;
                var k = 0
                for(y = CopiaFlower.length-1; y >= 0;y -= 1){
                    Medio.push(new Array)
                    for(x = 0; x < CopiaFlower[0].length;x++){
                        if (CopiaFlower[y] != undefined) {
                            Medio[k].push(CopiaFlower[y][x])
                        }
                        else{
                            Medio[k].push(0)
                        }
                    }
                    k ++;
                }
            }
            if (Rot == 0 && i) {
                Rot++;
                for(x = 0; x < CopiaFlower.length;x++){
                    Medio.push(new Array)
                    for(y = 0; y < CopiaFlower[0].length;y++){
                        if (CopiaFlower[x] != undefined) {
                            Medio[x].push(CopiaFlower[y][x])
                        }
                        else{
                            Medio[x].push(0)
                        }
                    }
                }
            }
            BrochaPer = Medio
            
        }
    }
}

function dibujaTablero(obj){
    for (let y = 0; y < filas; y++) {
        for (let x = 0; x < filas; x++) {
            obj[y][x].dibuja();
        }
    }
    if (!pause) {
        for (let y=0;y<filas;y++){
            if (!tablero[y][0].moveL) {
                for(let x=0;x<columnas;x++){
                    obj[y][x].nuevoCiclo();
                }
            }
            else{
                var g = 0
                for(let x=columnas-1;x>0;x--){
                    g++
                    obj[y][x].nuevoCiclo();
                }
            }
            
        }
    }
    
    for (let y=0;y<filas;y++){
        for(let x=0;x<columnas;x++){
            obj[y][x].cambiar();
        }
    }
}

function principal() {
    if (c_n != 16 && c_n != 15) {
        ColorPicker.hidden = true
        gravity.hidden = true
        gravity2.checked = false
    }
    if (c_n != 17) {
        continuidad.hidden = true
        continuidad.checked = false;
        continuo = false
    }
    paste = document.getElementById("copy/paste");
    if (paste.value == "") {
        paste.style.height = "36px";
        paste.style.width = "164px";
    }
    else{
        paste.style.height = "350px";
        paste.style.width = "900px";
    } 
    if (evento.type == "contextmenu") {
        evento.preventDefault();
    }
    if (Click && ini && c_n != 6 && !Sel){
        if (seleccionado == true) {
            seleccionado = false;
            limpio = false;
            limpiado()
            limpio = true;
        }
        ClickY = Math.floor(evento.offsetX/TileX);
        ClickX = Math.floor(evento.offsetY/TileY);
        var g = 0;
        var h = 0;
        if (brochas[numBrocha].length/2 == Math.floor(brochas[numBrocha].length/2)) {
            for (let x = (Math.floor(brochas[numBrocha].length/2)*-1);x<(Math.floor(brochas[numBrocha].length/2));x++){
                if (g >= brochas[numBrocha].length) {
                    g = 0;
                }
                for (let y = (Math.floor(brochas[numBrocha].length/2)*-1);y<(Math.floor(brochas[numBrocha].length/2));y++){
                    if (h >= brochas[numBrocha][0].length) {
                        h = 0;
                        g++;
                    }
                    if (g >= brochas[numBrocha].length) {
                        g = 0;
                    }
                    h++;
                    
                        if (ClickX+x != 0 && ClickX+x != columnas-1 && ClickY+y != 0 && ClickY+y != filas-1) {
                            if (brochas[numBrocha][(g)][(h-1)] != 0) {
                                if (c_n != 4 && c_n != 18) {
                                    tablero[ClickX+x][ClickY+y].proxEstado = brochas[numBrocha][(g)][(h-1)]*c_n;
                                    tablero[ClickX+x][ClickY+y].camDir = true;
                                    tablero[ClickX+x][ClickY+y].proxTemp = elementos[c_n+1][3] 
                                }
                                if(c_n == 4 && tablero[ClickX+x][ClickY+y].estado == 0){
                                    tablero[ClickX+x][ClickY+y].intensity = numBrocha;
                                    tablero[ClickX+x][ClickY+y].proxEstado = brochas[numBrocha][(g)][(h-1)]*c_n;
                                    tablero[ClickX+x][ClickY+y].camDir = true;
                                    tablero[ClickX+x][ClickY+y].proxTemp += elementos[c_n+1][3]/5
                                }
                                if (c_n == 4) {
                                    tablero[ClickX+x][ClickY+y].proxTemp += elementos[c_n+1][3]/5
                                }
                                if (c_n == 15 || c_n == 16  ) {
                                    tablero[ClickX+x][ClickY+y].gravedad = gravedad;
                                    tablero[ClickX+x][ClickY+y].color = "#ffffff"
                                }
                                if (c_n == 17) {
                                    tablero[ClickX+x][ClickY+y].Red = 255;
                                    tablero[ClickX+x][ClickY+y].Blue = 0;
                                    tablero[ClickX+x][ClickY+y].Green = 0;
                                    tablero[ClickX+x][ClickY+y].continuo = continuo
                                }
                                if (!tablero[ClickX+x][ClickY+y].continuo && c_n == 17) {
                                    tablero[ClickX+x][ClickY+y].color = "#ff0000"
                                }
                                if (c_n == 18 && tablero[ClickX][ClickY].estado == 0) {
                                    tablero[ClickX][ClickY].proxEstado = 18;
                                    tablero[ClickX][ClickY].proxTemp = 0;
                                    tablero[ClickX][ClickY].rallado = false
                                    tablero[ClickX][ClickY].rayo = -1
                                }
                                
                                  
                            }
                        }
                }
            }
        }
        if (brochas[numBrocha].length/2 != Math.floor(brochas[numBrocha].length/2)) {
            for (let x = (Math.floor(brochas[numBrocha].length/2)*-1);x<(Math.floor(brochas[numBrocha].length/2)+1);x++){
                if (g >= brochas[numBrocha].length) {
                    g = 0;
                }
                for (let y = (Math.floor(brochas[numBrocha].length/2)*-1);y<(Math.floor(brochas[numBrocha].length/2)+1);y++){
                    if (h >= brochas[numBrocha][0].length) {
                        h = 0;
                        g++;
                    }
                    if (g >= brochas[numBrocha].length) {
                        g = 0;
                    }
                    h++;
                    
                        if (ClickX+x != 0 && ClickX+x != columnas-1 && ClickY+y != 0 && ClickY+y != filas-1) {
                                if (brochas[numBrocha][(g)][(h-1)] != 0) {
                                    if (c_n != 4 && c_n != 18) {
                                        tablero[ClickX+x][ClickY+y].proxEstado = brochas[numBrocha][(g)][(h-1)]*c_n;
                                        tablero[ClickX+x][ClickY+y].camDir = true;
                                        tablero[ClickX+x][ClickY+y].proxTemp = elementos[c_n+1][3] 
                                    }
                                    if(c_n == 4 && tablero[ClickX+x][ClickY+y].estado == 0){
                                        tablero[ClickX+x][ClickY+y].intensity = numBrocha;
                                        tablero[ClickX+x][ClickY+y].proxEstado = brochas[numBrocha][(g)][(h-1)]*c_n;
                                        tablero[ClickX+x][ClickY+y].camDir = true;
                                        
                                    }
                                    if (c_n == 4) {
                                        tablero[ClickX+x][ClickY+y].proxTemp += elementos[c_n+1][3]/2
                                    }
                                    if (c_n == 15 || c_n == 16 ) {
                                        tablero[ClickX+x][ClickY+y].gravedad = gravedad;
                                        tablero[ClickX+x][ClickY+y].color = "#ffffff"
                                    }
                                    if (c_n == 17) {
                                        tablero[ClickX+x][ClickY+y].Red = 255;
                                        tablero[ClickX+x][ClickY+y].Blue = 0;
                                        tablero[ClickX+x][ClickY+y].Green = 0;
                                        tablero[ClickX+x][ClickY+y].continuo = continuo
                                    }
                                    if (!tablero[ClickX+x][ClickY+y].continuo && c_n == 17) {
                                        tablero[ClickX+x][ClickY+y].color = "#ff0000"
                                    }
                                    if (c_n == 18 && tablero[ClickX][ClickY].estado == 0) {
                                        tablero[ClickX][ClickY].proxEstado = 18;
                                        tablero[ClickX][ClickY].proxTemp = 0;
                                        tablero[ClickX][ClickY].rallado = false
                                        tablero[ClickX][ClickY].rayo = -1
                                    }
                                      
                                }
                        }
                }
            }
        }
    }
    if (red == 255 && green != 255) {
        green += 5;
    }
    if (red > 5 && green == 255) {
        red -= 5;
    }
    if (blue != 255 && green == 255) {
        blue += 5;
    }
    if (green > 5 && blue == 255) {
        green -= 5;
    }
    if (blue == 255 && red != 255) {
        red += 5;
    }
    if (blue > 5 && red == 255) {
        blue -= 5;
    }
    if (green < 16) {
        green = "0"+green.toString(16)
    }
    else{
        green = green.toString(16)
    }
    if (blue < 16) {
        blue = "0"+blue.toString(16)
    }
    else{
        blue = blue.toString(16)
    }
    if (red < 16) {
        red = "0"+red.toString(16)
    }
    else{
        red = red.toString(16)
    }
    
    RGB = "#"+red+green+blue;
    elementos[17][0] = RGB
    red = parseInt(red,16)
    green = parseInt(green,16)
    blue = parseInt(blue,16)
    borrarCanvas(); 
    dibujaTablero(tablero);
}

function imprimir(){
    [[3],[2]]
    txt = ""
    if (!seleccionado) {
        for (let y=0;y<filas;y++){
            for(let x=0;x<columnas;x++){
                if (x == columnas-1) {
                    txt += String(tablero[y][x].estado);
                    if (tablero[y][x].estado == 15 || tablero[y][x].estado == 16) {
                        txt += ":"+String(tablero[y][x].color)
                    }
                }
                else{
                    txt += String(tablero[y][x].estado);
                    if (tablero[y][x].estado == 15 || tablero[y][x].estado == 16 || tablero[y][x].estado == 17) {
                        txt += ":"+String(tablero[y][x].color)
                    }
                    txt += ","
                }
            }
            if (y != filas-1) {
                txt += "," 
            }
            else{
                txt += ",true";
            }
            
        }
    }
    else{
        var d = 0;
        var w = Selecion.length;
        txt = "("
        for (let y=Selecion[0][0].y;y<=Selecion[Selecion.length-1][0].y;y++){
            d = 0;
            for(let x=Selecion[0][0].x;x<=Selecion[0][Selecion[0].length-1].x;x++){
                if (Selecion[y-Selecion[0][0].y][x-Selecion[0][0].x].estado != 0) {
                    d++;
                }
            }
            if (d == 0) {
                w -= 1
            }
            
        }
        txt += (String(w)+","+String(Selecion[0].length)+")")
        for (let y=Selecion[0][0].y;y<=Selecion[Selecion.length-1][0].y;y++){
            d = 0;
            for(let x=Selecion[0][0].x;x<=Selecion[0][Selecion[0].length-1].x;x++){
                if (Selecion[y-Selecion[0][0].y][x-Selecion[0][0].x].estado != 0) {
                    d++;
                }
            }
            
            if (d != 0) {
                for(let x=Selecion[0][0].x;x<=Selecion[0][Selecion[0].length-1].x;x++){
                    txt += String(tablero[y][x].estado);
                    if (tablero[y][x].estado == 15 || tablero[y][x].estado == 16 || tablero[y][x].estado == 17) {
                        txt += ":"+String(tablero[y][x].color)
                    }
                    
                    txt += ","
                }
            }
            if (y == Selecion[Selecion.length-1][0].y) {
                txt += "false"; 
            }
            
        }
    }
    paste.value = txt;
}

function importar() {
    Rot = 0;
    seleccionado = false
    c_n = 0;
    importador = paste.value;
    list = [];
    color = [];
    if (importador[importador.length-2] != "s") {
        if (importador != "") {
            for(let x=0;x<importador.length;x++){
                if (importador[x] != "," && importador[x] != "-" && importador[x] != ":" && importador[x] != "#") {
                    if (importador[x-1] == "-") {
                        list.push(parseInt((importador[x-1] + importador[x])))
                        color.push("#ffffff")
                        
                    }
                    if (importador[x+1] != "," && importador[x-1] == "," && importador[x+1] != undefined && importador[x+2] != ":") {
                        list.push(parseInt((importador[x] + importador[x+1])))
                        color.push("#ffffff")
                    }
                    if (importador[x-1] == "," && importador[x+1] == ",") {
                        list.push(parseInt(importador[x]))
                        color.push("#ffffff")
                    }
                    if (importador[x-1] == "," && importador[x+2] == ":") {
                        list.push(parseInt(importador[x]+importador[x+1]))
                        color.push(importador[x+3]+importador[x+4]+importador[x+5]+importador[x+6]+importador[x+7]+importador[x+8]+importador[x+9])
                    }
                }
            }
            var y = 0;
            var x = 0;
            for (let k=0;k<columnas*filas;k++){
                if (x >= columnas) {
                    x = 0;
                    y++;
                }
                if (y >= filas) {
                    y = 0;
                }
                tablero[y][x].proxEstado = list[k];
                tablero[y][x].estado = list[k];
                tablero[y][x].proxTemp = elementos[list[k]+1][3];
                tablero[y][x].temperatura = elementos[list[k]+1][3];
                tablero[y][x].color = color[k]
                if (list[k] == 17) {
                    tablero[y][x].Red = parseInt(color[k][1] + color[k][2],16)
                    tablero[y][x].Green = parseInt(color[k][3] + color[k][4],16)
                    tablero[y][x].Blue = parseInt(color[k][5] + color[k][6],16)
                }
                x++
                
        
            }
        }
    }
    else{
        if (importador[2] != ",") {
            height2 = parseInt(importador[1]+importador[2])
        }
        else{
            height2 = parseInt(importador[1])
        }
        if (importador[3] == ",") {
            if (importador[5] != ")") {
                width2 = parseInt(importador[4]+importador[5])
            }
            else{
                width2 = parseInt(importador[4])
            }
        }
        else{
            if (importador[4] != ")") {
                width2 = parseInt(importador[3]+importador[4])
            }
            else{
                width2 = parseInt(importador[3])
            }
        
        }
        if (importador != "") {
            for(let x=0;x<importador.length;x++){
                if (importador[x] != "f" && importador[x] != "a" && importador[x] != "l" && importador[x] != "s" && importador[x] != "e" && importador[x] != "t" && importador[x] != "r" && importador[x] != "u") {
                    if (importador[x] != "," && importador[x-2] != "(" && importador[x] != "-" && importador[x] != ":" && importador[x] != "#" && importador[x+1] != ")" && importador[x+2] != ")") {
                        if (importador[x-1] == "-") {
                            list.push(parseInt((importador[x-1] + importador[x])))
                            color.push("#ffffff")
                            
                        }
                        if (importador[x+1] != "," && importador[x-1] == "," && importador[x+1] != undefined && importador[x+2] != ":") {
                            list.push(parseInt((importador[x] + importador[x+1])))
                            color.push("#ffffff")
                        }
                        if ((importador[x-1] == "," || importador[x-1] == ")") && importador[x+1] == ",") {
                            list.push(parseInt(importador[x]))
                            color.push("#ffffff")
                        }
                        if (importador[x-1] == "," && importador[x+2] == ":") {
                            list.push(parseInt(importador[x]+importador[x+1]))
                            color.push(importador[x+3]+importador[x+4]+importador[x+5]+importador[x+6]+importador[x+7]+importador[x+8]+importador[x+9])
                        }
                    }
                }
            }
            /*for (let k=0;k<list.length;k++){
                if (x >= width2) {
                    x = 0;
                    y++;
                }
                if (y >= height2) {
                    y = height2;
                }
                    tablero[y+Math.floor(filas/2)][x+Math.floor(columnas/2)].proxEstado = list[k];
                    tablero[y+Math.floor(filas/2)][x+Math.floor(columnas/2)].estado = list[k];
                    tablero[y+Math.floor(filas/2)][x+Math.floor(columnas/2)].proxTemp = elementos[list[k]+1][3];
                    tablero[y+Math.floor(filas/2)][x+Math.floor(columnas/2)].temperatura = elementos[list[k]+1][3];
                    tablero[y+Math.floor(filas/2)][x+Math.floor(columnas/2)].color = color[k]
                    x++
                
        
            }*/
            flower = [];
            var k = 0
            for (let y = 0; y < height2; y++) {
                flower.push(new Array(width2))
                for (let x = 0; x < width2; x++) {
                    flower[y][x] = list[k];
                    k++;
                    
                }            
            }
        }
        BrochaPer = flower;
        Copia = true

    }
    
}