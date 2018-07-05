var label=document.getElementById('Label');
var canvas0=document.getElementById('layer0');
var ctx0=canvas0.getContext("2d");
var canvas1=document.getElementById('layer1');
var ctx1=canvas1.getContext("2d");
var canvas2=document.getElementById('layer2');
var ctx2=canvas2.getContext("2d");

var img=new Image();
img.src='img/umbrella.png';
img.onload=function(){
    ctx0.drawImage(img,0,0,canvas0.width,canvas0.height)
}
    tCtx.putImageData(tImgData, xCord, yCord);
ctx1.fillStyle='rgb(255,51,0)';
ctx1.fillRect(0,0,150,37.5);
ctx1.fillStyle='rgb(102,204,0)';
ctx1.fillRect(0,37.5,150,37.5);

for (var i=0;i<10;i++){
    ctx1.fillStyle='rgba(255,255,255, '+ (i+1)/10+')';
    for (var j=0;j<2;j++){
	ctx1.fillRect(5+i*14, 5+j*37.5,14,27.5);
    }
}


var imgData=ctx1.getImageData(0,0,200,100);

function onClearOneTurn(){
    ctx1.clearRect(200,200,200,100);
    ctx1.putImageData(imgData,0,0)
}

function onSoftRefresh(){
    ctx1.clearRect(0,0,200,100);
    ctx1.putImageData(imgData,200,200)
}

function log(str){
    // console log wrapper
    console.log(str);
    label.innerHTML = str;
}

// god tells him: position, death/alive, skill/turn, status, last dmg, health

// character:
// on the zero layer:
// background  
// success, next round
// information


// on the first layer:   player layer
// imgdata, imgdata position index (showed but not changed so much)
// life bar         (showed)
// status buff bar  (showed)
// last round dmg   (showed)
// acting signal   (showed)


//// on the second layer   info layer  (one side is the acting, one side is information)
// desc information (hidden)
// action information

// animation: position slide 



