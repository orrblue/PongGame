//canvas
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var pause = false;
ctx.fillStyle = "white";
ctx.strokeStyle = "black";

//both bars
var barWidth = 10;
var barHeight = 60;
var barIncreaseInY = 4;

//left bar
var leftReachedTop = false; 
var leftReachedBottom = false;
var leftBarXPos = 10;
var leftBarYPos = 130;
var leftMoveVal = 0;

//right bar
var rightReachedTop = false; 
var rightReachedBottom = false;
var rightBarXPos = 460;
var rightBarYPos = 130;
var rightMoveVal = 0;

//ball
var ballXPos = 240;
var ballYPos = 160;
var ballRadius = 10;
var ballUpBound = ballYPos - ballRadius;
var ballLowBound = ballYPos + ballRadius;
var ballLeftBound = ballXPos - ballRadius;
var ballRightBound = ballXPos + ballRadius;
var ballCollision = false;

//ball position increments
var ballIncreaseInX = -2;
var ballIncreaseInY = 3;

//width: 480, height: 320
ctx.fillRect(leftBarXPos, leftBarYPos, barWidth, barHeight); //left bar
ctx.fillRect(rightBarXPos, rightBarYPos, barWidth, barHeight); //right bar
ctx.arc(ballXPos,ballYPos,ballRadius,0,2*Math.PI); //ball
ctx.fill(); //fill inside
ctx.stroke(); //color the border


//bars movement
document.addEventListener('keydown', function(e) {
    // 'e' short for 'event'
    switch(e.keyCode) {
        case 32:
            pause = !pause;
            break;
        case 38: //up
            rightMoveVal = 1;
            break;
        case 87: //w
            leftMoveVal = 1;
            break;
        case 40: //down
            rightMoveVal = -1;
            break;
        case 83: //s
            leftMoveVal = -1;
            break;

        default:
            leftMoveVal = 0;
            break;
    }
    
}, false);


//bars stop movement
document.addEventListener('keyup', function(e) {
    // 'e' short for 'event'
    switch(e.keyCode) {
        case 38: //up
            rightMoveVal = 0;
            break;
        case 87: //w
            leftMoveVal = 0;
            break;
        case 40: //down
            rightMoveVal = 0;
            break;
        case 83: //s
            leftMoveVal = 0;
            break;

        default:
            leftMoveVal = 0;
            break;
    }
    
}, false);



setInterval(function(){
    
    if(pause) 
    {
        ctx.fillStyle = "white";
        ctx.strokeStyle = "yellow";
        drawPauseText();
        return;
    }
    
    else //TODO: Fix erasing of pause text
    {
        ctx.fillStyle = "black";
        ctx.strokeStyle = "yelow";
        drawPauseText();
    }
    
    //update ball bounds
    ballLowBound = ballYPos + ballRadius;
    ballUpBound = ballYPos - ballRadius;
    ballLeftBound = ballXPos - ballRadius;
    ballRightBound = ballXPos + ballRadius;
    
    //left bar move UP
    if(!leftReachedTop && leftMoveVal == 1)
    {
        moveLeftBarUp();
    }
    
    //left bar move DOWN
    else if(!leftReachedBottom && leftMoveVal == -1)
    {
        moveLeftBarDown();
    }
    
    //right bar move UP
    if(!rightReachedTop && rightMoveVal == 1)
    {
        moveRightBarUp();
    }
    
    //right bar move DOWN
    else if(!rightReachedBottom && rightMoveVal == -1)
    {
        moveRightBarDown();
    }
    
    //move ball
    if(!ballCollision)
    {
        moveBall();
    }
    
    //collision TOP/BOTOOM
    if(ballUpBound <= 0 || ballLowBound >= canvas.height) //TODO: Cases for which part of the ball collides so it applies to all sides.
    {        
        drawBlackBall();
        
        ballIncreaseInY = -ballIncreaseInY;
        
        if(ballUpBound <= 0)
            ballYPos = 0 + ballRadius + 1;
        else if(ballLowBound >= 320)
            ballYPos = canvas.height - ballRadius - 1; 
        
        //Redraw white ball so there isnt a super short dark out
        drawWhiteBall();
    }
    
    //left bar collision
    if(ballLeftBound <= leftBarXPos + barWidth && ballUpBound >= leftBarYPos && ballLowBound <= leftBarYPos + barHeight)
    {
        if(ballRightBound > 0)
        {
            drawBlackBall();
            ctx.fillStyle = "white";
            ctx.strokeStyle = "white";
            drawLeftBar();
            
            ballIncreaseInX = -ballIncreaseInX * 1.04;
            
            ballXPos = leftBarXPos + barWidth + ballRadius + 1;
            drawWhiteBall();    
        }
        else
        {
            ballIncreaseInX = 0;
            ballIncreaseInY = 0;
        }
    }
    
    //right bar collision
    if(ballRightBound >= rightBarXPos && ballUpBound >= rightBarYPos && ballLowBound <= rightBarYPos + barHeight)
    {
        if(ballLeftBound < canvas.width)
        {
            drawBlackBall();
            ctx.fillStyle = "white";
            ctx.strokeStyle = "white";
            drawRightBar();
            
            ballIncreaseInX = -ballIncreaseInX * 1.04;
            
            ballXPos = rightBarXPos - ballRadius - 1;
            drawWhiteBall();    
        }
        else
        {
            ballIncreaseInX = 0;
            ballIncreaseInY = 0;
        }
    }
    
    
    
    //debug info
    ballLowerBound.innerHTML = "Ball Low Bound: " + ballLowBound;
    ballUpperBound.innerHTML = "Ball Upper Bound: " + ballUpBound;
    ballLBound.innerHTML = "Ball LEFT Bound: " + ballLeftBound;
    ballRBound.innerHTML = "Ball RIGHT bound " + ballRightBound;
    
    
    
}, 30);






function moveLeftBarUp() //TODO: Fix lines remaining after movement of bars
{
    leftReachedBottom = false;
    ctx.fillStyle = "black";
    ctx.strokeStyle = "black";
    drawLeftBar();
    //ctx.stroke();
    
    leftBarYPos -= barIncreaseInY;
    
    ctx.fillStyle = "white";
    drawLeftBar();
    //ctx.stroke();
    if(leftBarYPos < 0)
    {
        leftReachedTop = true;
    }
}






function moveLeftBarDown()
{
    leftReachedTop = false;
    ctx.fillStyle = "black";
    ctx.strokeStyle = "black";
    drawLeftBar();
    //ctx.stroke();
    
    leftBarYPos += barIncreaseInY;
    
    ctx.strokeStyle = "black";
    ctx.fillStyle = "white";
    drawLeftBar();
    //ctx.stroke();
    if(leftBarYPos > canvas.height - barHeight)
    {
        leftReachedBottom = true;
    }
}






function moveRightBarUp()
{
    rightReachedBottom = false;
    
    //ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.strokeStyle = "black";
    drawRightBar();
    //ctx.stroke();
    //ctx.closePath();
        
    rightBarYPos -= barIncreaseInY;
    
    ctx.fillStyle = "white";
    drawRightBar();
    //ctx.stroke();
    if(rightBarYPos < 0)
    {
        rightReachedTop = true;
    }
}






function moveRightBarDown()
{
    rightReachedTop = false;
    
    //ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.strokeStyle = "black";
    drawRightBar();
    //ctx.stroke();
    //ctx.closePath();
        
    rightBarYPos += barIncreaseInY;
    
    ctx.fillStyle = "white";
    drawRightBar();
    //sctx.stroke();
    if(rightBarYPos > canvas.height - barHeight)
    {
        rightReachedBottom = true;
    }  
}






function moveBall()
{
    drawBlackBall();

    ballXPos += ballIncreaseInX;
    ballYPos += ballIncreaseInY;
    
    drawWhiteBall();
}






function drawBlackBall()
{
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.strokeStyle = "black";
    ctx.arc(ballXPos, ballYPos, ballRadius, 0, 2*Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();  
}
  





function drawWhiteBall()
{
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.arc(ballXPos, ballYPos, ballRadius, 0, 2*Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();    
}





function drawLeftBar()
{
    ctx.fillRect(leftBarXPos, leftBarYPos, barWidth, barHeight);
}






function drawRightBar()
{
    ctx.fillRect(rightBarXPos, rightBarYPos, barWidth, barHeight);
}

//TODO: Add "Pause" text to game

function drawPauseText()
{
    ctx.font = "30px Arial";
    ctx.fillText("Pause",canvas.width/2 - 45 ,canvas.height/2 - 20);
}












