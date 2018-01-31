var myGamePiece;
var myObstacles1 = [];
var myObstacles2 = [];
var myObstacles3 = [];
var myScore;
var myPlane;
var myAccelerate;
var mouse=false;
var inter1=1,inter2=50,inter3=100;
var col1,cl2,col3;
var in1=0,in2=0,in3=0;
var mouse=false;
console.log("JS");

function startGame() {
    myGamePiece = new component(30, 30, "red", 10, 120);
    myGamePiece.gravity = 0.05;
    myScore = new component("30px", "Consolas", "black", 280, 40, "text");
    myAttakerPlane = new component(10,280,"green",470,0);
    myPlane = new component(10,280,"red",0,0);
    myAccelerate = new component(100,50,"grey",200,220);
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 280;
        this.context = this.canvas.getContext("2d");
        document.getElementById("container").appendChild(this.canvas);
        this.canvas.style.border="1px solid #000000";
        this.score=0;
        this.interval = setInterval(updateGameArea, 20);
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y, type) {
    this.type = type;
    this.score = 0;
    this.width = width;
    this.height = height;
    this.color = color;
    this.speedX = 0;
    this.speedY = 0;
    this.gravity = 0.05;
    this.gravitySpeed =0;    
    this.x = x;
    this.y = y;
    this.update = function() {
        ctx = myGameArea.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.gravitySpeed+=this.gravity;
        this.y += this.gravitySpeed;
        this.hitBottom();
        this.hitTop();
    }
    this.hitBottom = function() {
        var rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
        }
    }
    this.hitTop = function(){
        if(this.y<0){
            this.y=0;
            this.gravity=0.05;
        }
    }
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
    this.clicked = function() {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var clicked = true;
        if ((mybottom < myGameArea.y) || (mytop > myGameArea.y)
         || (myright < myGameArea.x) || (myleft > myGameArea.x)) {
            clicked = false;
        }
        return clicked;
    }
}

function updateGameArea() {
    for (i = 0; i < myObstacles1.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles1[i])&&myObstacles1[i].color=="green") {
            return;
        }
        else if(myGamePiece.crashWith(myObstacles1[i])&&myObstacles1[i].color=="yellow"){
            myGameArea.score+=20;
            myObstacles1.splice(i, 1);
        }

    }
    for (i = 0; i < myObstacles2.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles2[i])&&myObstacles2[i].color=="green") {
            return; 
        }
        else if(myGamePiece.crashWith(myObstacles2[i])&&myObstacles2[i].color=="yellow"){
            myGameArea.score+=100;
            myObstacles2.splice(i, 1);
        } 
    }
    for (i = 0; i < myObstacles3.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles3[i])&&myObstacles3[i].color=="green") {
            return;
        }
        else if(myGamePiece.crashWith(myObstacles3[i])&&myObstacles3[i].color=="yellow"){
            myGameArea.score+=100;
            myObstacles3.splice(i, 1);
        } 
    }
    myGameArea.clear();
    in1+=1;
    in2+=1;
    in3+=1;
    myGameArea.score +=1;
    if(everyinterval(1)){
        col1=Math.floor(Math.random() * 3);
    }
    if(everyinterval(2)){
        col2=Math.floor(Math.random() * 3);
    }
    if(everyinterval(3)){
        col3=Math.floor(Math.random() * 3);
    }

    if (everyinterval(1)) {
        if(col1){
            myObstacles1.push(new component(50,50,"green",420,20));
        }
        else{
            myObstacles1.push(new component(50,50,"yellow",420,20));
        }
    }
    if (everyinterval(2)) {
        if(col2){
            myObstacles2.push(new component(50,50,"green",420,120));
        }
        else{
            myObstacles2.push(new component(50,50,"yellow",420,120));
        }
    }
    if (everyinterval(3)) {
        if(col3){
            myObstacles3.push(new component(50,50,"green",420,220));
        }
        else{
            myObstacles3.push(new component(50,50,"yellow",420,220));
        }
    }
    if(everyinterval(1)){
        inter1=Math.floor(Math.random() * 50) + 140;
        in1=0;
    }
    if(everyinterval(2)){
        inter2=Math.floor(Math.random() * 50) + 180;
        in2=0;
    }
    if(everyinterval(3)){
        inter3=Math.floor(Math.random() * 50) + 220;
        in3=0;
    }
    
    for (i = 0; i < myObstacles1.length; i += 1) {
        myObstacles1[i].x += -1;
        myObstacles1[i].update();
    }
    for (i = 0; i < myObstacles2.length; i += 1) {
        myObstacles2[i].x += -1;
        myObstacles2[i].update();
    }
    for (i = 0; i < myObstacles3.length; i += 1) {
        myObstacles3[i].x += -1;
        myObstacles3[i].update();
    }
    myScore.text="SCORE: " + myGameArea.score;
    myScore.update();
    myAttakerPlane.update();
    if(myGameArea.key&&myGameArea.key==32){
        myGamePiece.gravity=-0.1;
    }
    else if(!mouse){
        myGamePiece.gravity=0.05;
    }
    myAttakerPlane.update();
    myGamePiece.newPos();
    myGamePiece.update();
    myPlane.update();
}

function everyinterval(n) {
    if(n==1&&inter1==in1){return true;}
    if(n==2&&inter2==in2){return true;}
    if(n==3&&inter3==in3){return true;}
    return false;
}

function accelerate(n) {
    myGamePiece.gravity=n;
    if(n==-0.1){
        mouse=true;
    }
    else{
        mouse=false;
    }
}
window.addEventListener('keydown', function (e) {
            if (e.keyCode==32) {
                accelerate(-0.1);
            }
})
window.addEventListener('keyup', function (e) {
            if (e.keyCode==32) {
                accelerate(0.05);
            }
})
document.getElementsByTagName("button")[0].addEventListener('touchstart',function(e){
    accelerate(-0.1);
})
document.getElementsByTagName("button")[0].addEventListener('touchstart',function(e){
    accelerate(-0.05);
})
