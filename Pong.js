var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.fillStyle = "white";
ctx.strokeStyle = "black";

//var leftBarXPos = 10;
var leftBarYPos = 130;
//var rightBarXPos = 460;
var rightBarYPos = 130;

var leftReachedTop = false; 
var leftReachedBottom = false;
var leftMoveVal = 0;

var rightReachedTop = false; 
var rightReachedBottom = false;
var rightMoveVal = 0;

var ballXPos = 240;
var ballYPos = 160;
var ballRadius = 10;
var ballUpBound = ballYPos - ballRadius;
var ballLowBound = ballYPos + ballRadius;
var ballLeftBound = ballXPos - ballRadius;
var ballRightBound = ballXPos + ballRadius;
var ballCollision = false;

var increaseInX = .5;
var increaseInY = 5;

//width: 480, height: 320
ctx.fillRect(10, leftBarYPos, 10, 60);
ctx.fillRect(460, rightBarYPos, 10, 60);
ctx.arc(ballXPos,ballYPos,ballRadius,0,2*Math.PI);
ctx.fill();
ctx.stroke();


document.addEventListener('keydown', function(e) {
    // 'e' short for 'event'
    switch(e.keyCode) {
//        case 32:
//            pause = !pause;
//            break;
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


document.addEventListener('keyup', function(e) {
    // 'e' short for 'event'
    switch(e.keyCode) {
//        case 32:
//            pause = !pause;
//            break;
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
    
    ballLowBound = ballYPos + ballRadius;
    ballUpBound = ballYPos - ballRadius;
    
    //left bar move UP
    if(!leftReachedTop && leftMoveVal == 1) //TODO: Fix white strokes
    {
        leftReachedBottom = false;
        ctx.fillStyle = "black";
        ctx.fillRect(10, leftBarYPos, 10, 60);
        leftBarYPos -= 4;
        ctx.fillStyle = "white";
        ctx.fillRect(10, leftBarYPos, 10, 60);
        if(leftBarYPos < 0)
        {
            leftReachedTop = true;
        }
    }
    
    //left bar move DOWN
    else if(!leftReachedBottom && leftMoveVal == -1)
    {
        leftReachedTop = false;
        ctx.fillStyle = "black";
        ctx.fillRect(10, leftBarYPos, 10, 60);
        leftBarYPos += 4;
        ctx.fillStyle = "white";
        ctx.fillRect(10, leftBarYPos, 10, 60);
        if(leftBarYPos > canvas.height - 60)
        {
            leftReachedBottom = true;
        }
    }
    
    
    
    //right bar move UP
    if(!rightReachedTop && rightMoveVal == 1) //TODO: Fix white strokes
    {
        rightReachedBottom = false;
        ctx.fillStyle = "black";
        ctx.strokeStyle = "black";
        ctx.fillRect(460, rightBarYPos, 10, 60);
        ctx.stroke();
        
        rightBarYPos -= 4;
        ctx.fillStyle = "white";
        ctx.fillRect(460, rightBarYPos, 10, 60);
        ctx.stroke();
        if(rightBarYPos < 0)
        {
            rightReachedTop = true;
        }
    }
    
    //right bar move DOWN
    else if(!rightReachedBottom && rightMoveVal == -1) 
    {
        rightReachedTop = false;
        ctx.fillStyle = "black";
        ctx.strokeStyle = "black";
        ctx.fillRect(460, rightBarYPos, 10, 60);
        ctx.stroke();
        
        rightBarYPos += 4;
        ctx.fillStyle = "white";
        ctx.fillRect(460, rightBarYPos, 10, 60);
        ctx.stroke();
        if(rightBarYPos > canvas.height - 60)
        {
            rightReachedBottom = true;
        }
    }
    
    //move ball
    if(!ballCollision){
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.strokeStyle = "black";
        ctx.arc(ballXPos, ballYPos, ballRadius, 0, 2*Math.PI);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
        

        ctx.beginPath();
        ballXPos += increaseInX;
        ballYPos += increaseInY;
        ctx.fillStyle = "white";
        ctx.strokeStyle = "black";
        ctx.arc(ballXPos, ballYPos, ballRadius, 0, 2*Math.PI);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }
    
    //collision TOP/BOTOOM
    if(ballUpBound <= 0 || ballLowBound >= canvas.height)
    {
        //ballCollision = true;
        
        //window.alert("Yo");
        
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.strokeStyle = "black";
        ctx.arc(ballXPos, ballYPos, ballRadius, 0, 2*Math.PI);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
        
        increaseInY = -increaseInY;
        if(ballUpBound <= 0)
            ballYPos = 0 + ballRadius + 1;
        else if(ballLowBound >= 320)
            ballYPos = canvas.height - ballRadius - 1; 
        
        //Redraw white ball in here so there isnt a super short dark out
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.strokeStyle = "black";
        ctx.arc(ballXPos, ballYPos, ballRadius, 0, 2*Math.PI);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
        
    }
    
    //var htmlLow = document.getElementById("ballLowerBound");
    ballLowerBound.innerHTML = "Ball Low Bound: " + ballLowBound;
    ballUpperBound.innerHTML = "Ball Upper Bound: " + ballUpBound;
    
    //if(ballRightBound > 460  || touched left bar)
    
    
}, 30);
   











