var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
//var leftBarXPos = 10;
var leftBarYPos = 130;
//var rightBarXPos = 460;
var rightBarYPos = 130;
ctx.fillStyle = "white";

var reachedTop = false; 
var reachedBottom = false;

//width: 480, height: 320
ctx.fillRect(10, leftBarYPos, 10, 60);
ctx.fillRect(460, rightBarYPos, 10, 60);


//document.addEventListener('keydown', function(e) {
//    // 'e' short for 'event'
//    switch(e.keyCode) {
//        case 32:
//            pause = !pause;
//            break;
//        case 38:
//        case 87:
//            tempDirec = -1;
//            break;
//        case 40:
//        case 83:
//            tempDirec = 1;
//            break;
//        case 37:
//        case 65:
//            tempDirec = 2;
//            break;
//        case 39:
//        case 68:
//            tempDirec = 4;
//    }
//    if (direcS < 2 && tempDirec > 1 || direcS > 1 && tempDirec < 2) {
//        direcS = tempDirec;
//    }
//}, false);


setInterval(function(){
    
    //left bar
    if(!reachedTop)
    {
        ctx.fillStyle = "black";
        ctx.fillRect(10, leftBarYPos--, 10, 60);
        ctx.fillStyle = "white";
        ctx.fillRect(10, leftBarYPos, 10, 60);
        if(leftBarYPos == 0)
        {
            reachedTop = true;
            reachedBottom = false;
        }
    }
    
    else if(!reachedBottom)
    {
        ctx.fillStyle = "black";
        ctx.fillRect(10, leftBarYPos++, 10, 60);
        ctx.fillStyle = "white";
        ctx.fillRect(10, leftBarYPos, 10, 60);
        if(leftBarYPos == canvas.height - 60)
        {
            reachedBottom = true;
            reachedTop = false;
        }
    }
    
    
    
   
    
}, 10);
   