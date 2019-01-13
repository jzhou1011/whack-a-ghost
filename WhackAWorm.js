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
var score;
/* ghosts */
var ghostImg = new Image(); 
var ghost; 
var lastghost;
var randomPos;

var ghostsX = [280, 620, 430, 680, 250, 530, 800]; 
var ghostsY = [160, 140, 240, 300, 360, 410, 470];

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
    titleBgImg.src = 'titleBg.png'; 
    titleBgImg.name = 'titleBg'; 
    titleBgImg.onload = loadGfx; 

    gameBgImg.src = 'gameBg.png'; 
    gameBgImg.name = 'gameBg'; 
    gameBgImg.onload = loadGfx; 

    playBtnImg.src = 'ghost.png'; 
    playBtnImg.name = 'playBtn'; 
    playBtnImg.onload = loadGfx; 

    // creditsViewImg.src = 'creditsView.png'; 
    // creditsViewImg.name = 'credits'; 
    // creditsViewImg.onload = loadGfx; 

    alertBgImg.src = 'alertBg.png'; 
    alertBgImg.name = 'alertBg'; 
    alertBgImg.onload = loadGfx; 

    ghostImg.src = 'ghost.png'; 
    ghostImg.name = 'ghost'; 
    ghostImg.onload = loadGfx;

    /* Ticker */
    createjs.Ticker.framerate = 30; 
    createjs.Ticker.on("tick", stage);

    score = new createjs.Text('0' + '/' + totalGhosts, 'bold 30px Arial', "black"); 
    score.maxWidth = 1000;    //fix for Chrome 17 
    score.x = 58; 
    score.y = 21; 
    stage.addChild(score);

}


function loadGfx(e) 
{ 
    if(e.target.name = 'titleBg'){titleBg = new createjs.Bitmap(titleBgImg);} 
    if(e.target.name = 'gameBg'){gameBg = new createjs.Bitmap(gameBgImg);} 
    if(e.target.name = 'playBtn'){playBtn = new createjs.Bitmap(playBtnImg);} 
    if(e.target.name = 'alertBg'){alertBg = new createjs.Bitmap(alertBgImg);} 
    if(e.target.name = 'ghost'){alertBg = new createjs.Bitmap(ghostImg);} 
      
    gfxLoaded++; 
    if(gfxLoaded == 5) 
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
            showghost(); 
        } 
    ); 
}

function showghost() 
{ 
    if(currentGhosts == totalGhosts) 
    { 
        showAlert(); 
    }
    else
    {   
        if(lastghost != null) 
        { 
            lastghost.removeEventListener("click", ghostHit); 
            stage.removeChild(lastghost); 
            stage.update(); 
            lastghost = null; 
        }
        randomPos = Math.floor(Math.random() * 7);
        var ghost = new createjs.Bitmap(ghostImg); 
        
        ghost.x = ghostsX[randomPos]-35; 
        ghost.y = ghostsY[randomPos]-130; 
        stage.addChild(ghost); 
        ghost.addEventListener("click",ghostHit); 
        
        lastghost = ghost;
        lastghost.scaleY = 0.3; 
        lastghost.y += 42; 
        stage.update();
        console.log(currentGhosts);
        console.log(lastghost.y);
        
        createjs.Tween.get(lastghost, {override:true}).to({scaleY: 1, y: ghostsY[randomPos]-130}, 100).wait(1000).call(function(){currentGhosts++; showghost()});
    }
}

function ghostHit() 
{ 
    ghostsHit++; 
    score.text = ghostsHit + '/' + totalGhosts; 

    lastghost.removeEventListener("click", ghostHit);
    stage.removeChild(lastghost);
    lastghost = null; 
    stage.update(); 
}

function showAlert() 
{ 
    alertBg.x = centerX - 120; 
    alertBg.y = -80; 
    stage.addChild(alertBg); 
      
    createjs.Tween.get(alertBg,).to({y:centerY - 80}, 200).call(function() 
    { 
        createjs.Ticker.removeAllEventListeners(); 
        var score = new createjs.Text(ghostsHit + '/' + totalGhosts, 'bold 20px Arial', '#EEE'); 
        score.maxWidth = 1000;    //fix for Chrome 17 
        score.x = 220; 
        score.y = 205; 
        stage.addChild(score); 
        stage.update(); 
    }); 
}