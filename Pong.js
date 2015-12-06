var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
//var leftBarXPos = 10;
var leftBarYPos = 130;
//var rightBarXPos = 460;
var rightBarYPos = 130;
ctx.fillStyle = "white";

var reachedTop = false; 
var reachedBottom = false;
var leftMoveVal = 0;

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
        case 87: //w
            leftMoveVal = 1;
            break;
        case 40: //down
        case 83: //s
            leftMoveVal = -1;
            break;
//        case 37:
//        case 65:
//            leftMoveVal = 2;
//            break;
//        case 39:
//        case 68:
//            leftMoveVal = 4;
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
        case 87: //w
            leftMoveVal = 0;
            break;
        case 40: //down
        case 83: //s
            leftMoveVal = 0;
            break;
//        case 37:
//        case 65:
//            leftMoveVal = 2;
//            break;
//        case 39:
//        case 68:
//            leftMoveVal = 4;
        default:
            leftMoveVal = 0;
            break;
    }
}, false);







setInterval(function(){
    
    //left bar
    if(!reachedTop && leftMoveVal == 1)
    {
        reachedBottom = false;
        ctx.fillStyle = "black";
        ctx.fillRect(10, leftBarYPos, 10, 60);
        leftBarYPos -= 4;
        ctx.fillStyle = "white";
        ctx.fillRect(10, leftBarYPos, 10, 60);
        if(leftBarYPos < 0)
        {
            reachedTop = true;
            //reachedBottom = false;
        }
    }
    
    else if(!reachedBottom && leftMoveVal == -1)
    {
        reachedTop = false;
        ctx.fillStyle = "black";
        ctx.fillRect(10, leftBarYPos, 10, 60);
        leftBarYPos += 4;
        ctx.fillStyle = "white";
        ctx.fillRect(10, leftBarYPos, 10, 60);
        if(leftBarYPos > canvas.height - 60)
        {
            reachedBottom = true;
            //reachedTop = false;
        }
    }
    
    
}, 30);
   