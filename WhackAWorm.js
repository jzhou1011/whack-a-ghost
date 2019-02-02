var canvas; 
var stage;
var titleBg;
var titleBgImg = new Image(); 
var titleBg; 
/* Title View */
var playBtnImg = new Image(); 
var playBtn; 
// var creditsBtnImg = new Image(); 
// var creditsBtn; 
var titleView = new createjs.Container();
// /* Credits */
// var creditsViewImg = new Image(); 
// var creditsView;
/* Game Bg */
var gameBgImg = new Image(); 
var gameBg;
/* Alert */
var alertBgImg = new Image(); 
var alertBg;
/* Score */
var score=0;
/* ghosts */
var ghostImgArr = new Array(18); 
var i;
for(i=0;i<18;i++){
    ghostImgArr[i] = new Image();
}
ghostImgName = ['image/ghost1.png','image/ghost2.png','image/ghost3.png',
'image/ghost4.png','image/ghost5.png','image/ghost6.png','image/ghost7.png',
'image/ghost8.png','image/ghost9.png','image/ghost10.png','image/ghost11.png',
'image/ghost12.png','image/ghost13.png','image/ghost14.png','image/ghost15.png',
'image/ghost16.png','image/ghost17.png','image/ghost18.png']
var ghost; 
var lastGhost;
var randomPos;
var randomGhostPos;
/*end*/
var restartBtn;
var restartBtnImg = new Image();
var end;
var endBgImg = new Image();

var ghostsX = [280, 620, 430, 675, 260, 530, 800]; 
var ghostsY = [170, 150, 260, 315, 385, 450, 480];
//                  0   1   2   3   4   5   6   7   8  9   10  11  12   13  14  15  16  17
var ghostCoorX = [[ 35, 20, 20, 33, 65, 34, 32, 40, 48, 30, 55, 26,117, 27, 15, 60, 30, 40],
                  [ 35, 20, 20, 33, 65, 34, 33, 40, 47, 30, 53, 28,115, 25, 15, 60, 30, 40],
                  [ 35, 20, 20, 33, 65, 34, 33, 40, 47, 30, 53, 28,115, 25, 15, 60, 30, 40],
                  [ 35, 17, 20, 27, 61, 30, 28, 35, 45, 27, 50, 28,115, 25, 15, 60, 30, 40],
                  [ 35, 20, 20, 34, 65, 32, 30, 40, 47, 30, 50, 23,115, 25, 15, 60, 30, 40],
                  [ 35, 20, 20, 33, 65, 32, 30, 40, 47, 27, 50, 23,115, 25, 15, 60, 30, 40],
                  [ 35, 20, 20, 30, 65, 35, 33, 40, 47, 30, 53, 27,115, 25, 15, 60, 30, 40]];
var ghostCoorY = [[150, 35, 85, 84, 82, 90, 81, 63,100, 95,113, 75,147, 75,110, 90,335, 205],
                  [150, 33, 85, 81, 80, 87, 79, 62, 95, 93,110, 75,145, 73,110, 90,335, 205],
                  [150, 33, 85, 81, 80, 87, 79, 62, 95, 93,110, 75,145, 73,110, 90,335, 205],
                  [150, 33, 85, 81, 79, 87, 79, 62, 95, 92,110, 75,145, 73,110, 90,335, 205],
                  [150, 35, 85, 82, 81, 88, 80, 64, 97, 94,110, 75,145, 73,110, 90,335, 205],
                  [150, 35, 85, 82, 81, 88, 80, 63, 95, 94,110, 75,145, 73,110, 90,335, 205],
                  [150, 33, 85, 81, 79, 87, 79, 62, 95, 93,110, 75,145, 73,110, 90,335, 205]];

var centerX = 500; 
var centerY = 230; 
var gfxLoaded = 0; //used as a preloader 
  
var timerSource; 
var currentGhosts = 0; //ghosts already shown 
var ghostsHit = 0; 
var totalGhosts = 10; //total of ghosts to display

var curTween;

function Main() 
{ 
    //link canvas
    canvas = document.getElementById('WhackAGhost'); 
    stage = new createjs.Stage(canvas);
    stage.mouseEventsEnabled = true;
    /* Load GFX */
    titleBgImg.src = 'image/titleBg.png'; 
    titleBgImg.name = 'titleBg'; 
    titleBgImg.onload = loadGfx; 

    gameBgImg.src = 'image/gameBg.png'; 
    gameBgImg.name = 'gameBg'; 
    gameBgImg.onload = loadGfx; 

    playBtnImg.src = 'image/ghost1.png'; 
    playBtnImg.name = 'playBtn'; 
    playBtnImg.onload = loadGfx;
    
    restartBtnImg.src = 'image/restartBtn.png'; 
    restartBtnImg.name = 'restartBtn'; 
    restartBtnImg.onload = loadGfx;

    // creditsViewImg.src = 'creditsView.png'; 
    // creditsViewImg.name = 'credits'; 
    // creditsViewImg.onload = loadGfx; 

    endBgImg.src = 'image/end.png'; 
    endBgImg.name = 'end'; 
    endBgImg.onload = loadGfx; 

    for(i=0;i<18;i++){
        ghostImgArr[i].src = ghostImgName[i];
        ghostImgArr[i].name = i;
        ghostImgArr[i].onload = loadGfx;
    }
    // ghostImg.src = 'image/ghost.png'; 
    // ghostImg.name = 'ghost'; 
    // ghostImg.onload = loadGfx;

    
    /* Ticker */
    createjs.Ticker.framerate = 30; 
    createjs.Ticker.on("tick", stage);

    // score = new createjs.Text('0' + '/' + totalGhosts, 'bold 30px Arial', "black"); 
    // score.maxWidth = 1000;    //fix for Chrome 17 
    // score.x = 58; 
    // score.y = 21; 
    // stage.addChild(score);

}


function loadGfx(e) 
{ 
    if(e.target.name = 'titleBg'){titleBg = new createjs.Bitmap(titleBgImg);} 
    if(e.target.name = 'gameBg'){gameBg = new createjs.Bitmap(gameBgImg);} 
    if(e.target.name = 'playBtn'){playBtn = new createjs.Bitmap(playBtnImg);} 
    if(e.target.name = 'restartBtn'){restartBtn = new createjs.Bitmap(restartBtnImg);}
    if(e.target.name = 'end'){end = new createjs.Bitmap(endBgImg);}
    for(i=0;i<18;i++){
        if(e.target.name = i){ghostBg = new createjs.Bitmap(ghostImgArr[i]);} 
    }
      
    gfxLoaded++; 
    if(gfxLoaded == 23) 
    { 
        console.log("gfxloaded.");
        addTitleView(); 
    } 
}

function addTitleView() 
{    
    /* Add GameView BG */
    stage.addChild(gameBg);
    /* Title Screen */
    playBtn.x = centerX - 35; 
    playBtn.y = centerY - 100; 
                
    titleView.addChild(titleBg, playBtn);
    
    stage.addChild(titleView); 
    startButtonListeners('add');
    console.log(titleView.getChildAt(1));
    
    stage.update(); 
}
function startButtonListeners(action) 
{ 
    if(action == 'add') 
    { 
        titleView.getChildAt(1).addEventListener("click",showGameView);
    } 
    else
    { 
        titleView.getChildAt(1).removeEventListener("click", showGameView);
    } 
}

function showGameView() 
{ 
    console.log("pressed.")
    createjs.Tween.get(titleView).to({x: -480}, 200).call( 
        function(){ 
            startButtonListeners('rmv');  
            stage.removeChild(titleView);  
            titleView = null;  
            showGhost(); 
        } 
    ); 
}

function showGhost() 
{ 
    if(currentGhosts == totalGhosts) 
    { 
        showAlert(); 
    }
    else
    {   
        if(lastGhost != null) 
        { 
            lastGhost.removeEventListener("click", ghostHit); 
            stage.removeChild(lastGhost); 
            stage.update(); 
            lastGhost = null; 
        }
        randomPos = Math.floor(Math.random() * 7);
        randomGhostPos = Math.floor(Math.random() * 18);
        if(randomPos<2){
            if (randomGhostPos>15 ){
                randomGhostPos = Math.floor(Math.random() * 16);
            }
        }
        if(randomPos==0){
            while(randomGhostPos==8){
                randomGhostPos = Math.floor(Math.random() * 16);
            }
        }
        var ghost = new createjs.Bitmap(ghostImgArr[randomGhostPos]); 
        
        ghost.x = ghostsX[randomPos]-ghostCoorX[randomPos][randomGhostPos]; 
        ghost.y = ghostsY[randomPos]-ghostCoorY[randomPos][randomGhostPos]; 
        stage.addChild(ghost); 
        ghost.addEventListener("click",ghostHit); 
        console.log(ghost.x);
        console.log(ghost.y);

        lastGhost = ghost;
        lastGhost.scaleY = 0.3; 
        lastGhost.y += 42; 
        stage.update();
        
        createjs.Tween.get(lastGhost, {override:true}).to({scaleY: 1, y: ghostsY[randomPos]-ghostCoorY[randomPos][randomGhostPos]}, 50).wait(1500).call(function(){currentGhosts++; showGhost()});
    }
}

function ghostHit() 
{ 
    ghostsHit++; 
    score.text = ghostsHit + '/' + totalGhosts; 

    lastGhost.removeEventListener("click", ghostHit);
    stage.removeChild(lastGhost);
    lastGhost = null; 
    stage.update(); 
}

function showAlert() 
{ 
    createjs.Ticker.removeAllEventListeners(); 
    stage.addChild(end); 
    stage.addChild(restartBtn);
    restartBtn.x = centerX-50;
    restartBtn.y = centerY - 120;
    restartBtn.addEventListener("click",refreshPage);
      
    var score = new createjs.Text(ghostsHit + '/' + totalGhosts, '40px sans-serif', 'white'); 
    score.maxWidth = 1000;    //fix for Chrome 17 
    score.x = centerX-35; 
    score.y = centerY+20; 
    stage.addChild(score); 
    stage.update(); 
    // createjs.Tween.get(restartBtn,{override:true}).to({y:centerY - 120,x:centerX-50}, 200).call(function() 
    // { 
        
    // }); 
}

function refreshPage(){
    window.location.reload();
} 