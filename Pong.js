var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
//var leftBarXPos = 10;
var leftBarYPos = 130;
//var rightBarXPos = 460;
var rightBarYPos = 130;
ctx.fillStyle = "white";

var leftReachedTop = false; 
var leftReachedBottom = false;
var leftMoveVal = 0;

var rightReachedTop = false; 
var rightReachedBottom = false;
var rightMoveVal = 0;

//width: 480, height: 320
ctx.fillRect(10, leftBarYPos, 10, 60);
ctx.fillRect(460, rightBarYPos, 10, 60);


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
//    if (direcS < 2 && tempDirec > 1 || direcS > 1 && tempDirec < 2) {
//        direcS = tempDirec;
//  }
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
    
    //left bar
    if(!leftReachedTop && leftMoveVal == 1)
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
    
    
    
    //right bar
    if(!rightReachedTop && rightMoveVal == 1)
    {
        rightReachedBottom = false;
        ctx.fillStyle = "black";
        ctx.fillRect(460, rightBarYPos, 10, 60);
        rightBarYPos -= 4;
        ctx.fillStyle = "white";
        ctx.fillRect(460, rightBarYPos, 10, 60);
        if(rightBarYPos < 0)
        {
            rightReachedTop = true;
        }
    }
    
    else if(!rightReachedBottom && rightMoveVal == -1)
    {
        rightReachedTop = false;
        ctx.fillStyle = "black";
        ctx.fillRect(460, rightBarYPos, 10, 60);
        rightBarYPos += 4;
        ctx.fillStyle = "white";
        ctx.fillRect(460, rightBarYPos, 10, 60);
        if(rightBarYPos > canvas.height - 60)
        {
            rightReachedBottom = true;
        }
    }
    
    
}, 30);
   