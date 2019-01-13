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
/* Worms */
var wormImg = new Image(); 
var worm; 
var lastWorm;
var randomPos;

var wormsX = [280, 620, 430, 680, 250, 530, 800]; 
var wormsY = [160, 140, 240, 300, 360, 410, 470];

var centerX = 500; 
var centerY = 230; 
var gfxLoaded = 0; //used as a preloader 
  
var timerSource; 
var currentWorms = 0; //worms already shown 
var wormsHit = 0; 
var totalWorms = 10; //total of worms to display

var curTween;

function Main() 
{ 
    //link canvas
    canvas = document.getElementById('WhackAWorm'); 
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

    wormImg.src = 'ghost.png'; 
    wormImg.name = 'worm'; 
    wormImg.onload = loadGfx;

    /* Ticker */
    createjs.Ticker.framerate = 30; 
    createjs.Ticker.on("tick", stage);

    score = new createjs.Text('0' + '/' + totalWorms, 'bold 30px Arial', "black"); 
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
    if(e.target.name = 'worm'){alertBg = new createjs.Bitmap(wormImg);} 
      
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
            showWorm(); 
        } 
    ); 
}

function showWorm() 
{ 
    if(currentWorms == totalWorms) 
    { 
        showAlert(); 
    }
    else
    {   
        if(lastWorm != null) 
        { 
            lastWorm.removeEventListener("click", wormHit); 
            stage.removeChild(lastWorm); 
            stage.update(); 
            lastWorm = null; 
        }
        randomPos = Math.floor(Math.random() * 7);
        var worm = new createjs.Bitmap(wormImg); 
        
        worm.x = wormsX[randomPos]-35; 
        worm.y = wormsY[randomPos]-130; 
        stage.addChild(worm); 
        worm.addEventListener("click",wormHit); 
        
        lastWorm = worm;
        lastWorm.scaleY = 0.3; 
        lastWorm.y += 42; 
        stage.update();
        console.log(currentWorms);
        console.log(lastWorm.y);
        
        createjs.Tween.get(lastWorm, {override:true}).to({scaleY: 1, y: wormsY[randomPos]-130}, 100).wait(1000).call(function(){currentWorms++; showWorm()});
    }
}

function wormHit() 
{ 
    wormsHit++; 
    score.text = wormsHit + '/' + totalWorms; 

    lastWorm.removeEventListener("click", wormHit);
    stage.removeChild(lastWorm);
    lastWorm = null; 
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
        var score = new createjs.Text(wormsHit + '/' + totalWorms, 'bold 20px Arial', '#EEE'); 
        score.maxWidth = 1000;    //fix for Chrome 17 
        score.x = 220; 
        score.y = 205; 
        stage.addChild(score); 
        stage.update(); 
    }); 
}