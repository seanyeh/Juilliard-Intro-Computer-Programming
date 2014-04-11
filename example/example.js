// Ideas:
// 1. Play with variables:
//  characterX, characterY, characterYVelocity, ouchText
// 2. Finish increaseScore function
// 3. Create jump function
//  a. alert function
//  b. make the character jump


var characterX = 70;
var characterY = 400;
var characterYVelocity = 0;
var score = 0;
var ouchText = "OUCH!";

var msLast = getMilliseconds();
var msSinceLast = 0;

var wallpng = "https://cdn0.iconfinder.com/data/icons/super-mono-reflection/red/wall_red.png";
var wallX = null;
var $canvas;
var showOuch = false;

var requestAnimationFrame = 
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame;


// Main drawing function. Called every frame.
function draw(){
    drawBackground();

    drawCharacter();

    drawScore();

    drawWall();

    increaseScore();

    updateCoordinates();

    // This is to redraw the next frame
    requestAnimationFrame(draw);
}

// We need a jump function to let our character jump!


function increaseScore(){
    // What to do here?
}

function drawBackground(){
    $canvas.clearCanvas();
}

function drawCharacter(){
    var feetY = characterY - 10;
    var hipY = characterY - 60;
    var armY = characterY - 90;
    var neckY = characterY - 120;

    // Draw head
    $canvas.drawImage({
        source: 'http://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Smiley.svg/800px-Smiley.svg.png',
        x: characterX, y: neckY - 35,
        width: 50, height: 50
    });

    // Draw legs
    drawLine(characterX - 20, feetY, characterX, hipY);
    drawLine(characterX + 20, feetY, characterX, hipY);

    // Draw torso
    drawLine(characterX, hipY, characterX, neckY);

    // Draw arms
    drawLine(characterX - 20, armY, characterX + 20, armY);

    // Draw ouch?
    if (showOuch){
        $canvas.drawText({
            strokeStyle: '#25a',
            x: characterX + 40, y: characterY - 150,
            fontSize: 25,
            text: ouchText,
            fromCenter: false
        });

        window.setTimeout(function(){ showOuch = false; }, 500);
    }
}

function drawWall(){
    if (wallX !== null){
        $canvas.drawImage({
            source: wallpng,
            x: wallX, y: 380,
            fromCenter: true
        });

        // Update wall coordinates
        if (wallX <= 0){
            wallX = null;
        } else{
            wallX = wallX - 2;
        }

        if (wallX == characterX && characterY > 350){
            // Character hit the wall :(
            // Reset!
            showOuch = true;
            score = 0;
            wallX = null;
        }
    } else{
        if (Math.floor(Math.random() * 200) === 0){
            wallX = 400;
        }
    }
}

function drawScore(){
    $canvas.drawText({
        fillStyle: 'blue',
        x: 30, y: 10,
        fontSize: 12,
        text: 'Score: ' + score,
        fromCenter: false
    });
}

function drawLine(x1, y1, x2, y2){
    $canvas.drawLine({
        strokeStyle: "black",
        strokeWidth: 2,
        x1: x1, y1: y1, x2: x2, y2: y2
    });
}

function updateCoordinates(){
    var msNow = getMilliseconds();
    msSinceLast = msNow - msLast;
    msLast = msNow;

    // Apply gravity
    characterYVelocity = characterYVelocity - msSinceLast/100;

    // Subtract the velocity so positive velocity means going up
    characterY = characterY - characterYVelocity;
    if (characterY > 400){
        characterYVelocity = 0;
        characterY = 400;
    }
}

function getMilliseconds(){
    var ms = (new Date()).getTime();
    return ms;
}

$(document).ready(function(){
    $canvas = $("canvas");

    $("#button-jump").click(function(){
        // jump button was clicked!
        try{
            jump();
        } catch(e){}
    });

    requestAnimationFrame(draw);
});
