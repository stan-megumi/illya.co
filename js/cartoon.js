var label=document.getElementById('Label');

var canvas0=document.getElementById('layer0');
var ctx0=canvas0.getContext("2d");

var canvas1=document.getElementById('layer1');
var ctx1=canvas1.getContext("2d");

var canvas2=document.getElementById('element');
var ctx2=canvas2.getContext("2d");

var imgData;


var img=new Image();
var imgData;
var head1;
img.src='img/ayaya_bg.png';


function fetchCharacter(){
    // fetch character imageData from ayaya_bg
    var data=imgData.data;
    var len=data.length/4;
    var result=imgData;




    return result;
}

img.onload=function(){
    ctx2.drawImage(img,0,0,canvas2.width,canvas2.height)
    imgData=ctx2.getImageData(0,0,canvas2.width,canvas2.height);

    var character=fetchCharacter();
    ctx1.putImageData(character,0,0);    
}

var meta={
    head: {
	0: {imgData: [], pos: [0,0,140,130]},
	1: {imgData: [], pos: [140,0,280,135]},
	count: 2,
	pos: [0,0],
	scale: 1
    },
    eye: {
	0: {imgData: [], pos: [15,300,100,328]},
	1: {imgData: [], pos: [0,310,102,347]},
	count: 2,
	pos: [0,0],
	scale: 1,
    },
}




//log(head1)
function fetchPixels( x,  y,  w,  h ){
    var imgData=ctx2.getImageData(x,y,w-x,h-y);
    var data=imgData.data;
    var len=data.length/4;
    var i=len;

    while(i--){
	if (data[4*i]==0 && data[4*i+1]==0 && data[4*i+2]==0 && data[4*i+3]==255) {
	    data[4*i+3]=0;
	}
    }
    return imgData;
}


function onClearOneTurn(){
//    ctx2.clearRect(200,200,200,100);
//    ctx2.putImageData(imgData,0,0)
}

function onSoftRefresh(){
    ctx2.clearRect(0,0,140,130);
    ctx2.putImageData(head1,200,200)
}

function log(str){
    // console log wrapper
    console.log(str);
    label.innerHTML = str;
}

function pick(event) {
  var x = event.layerX;
  var y = event.layerY;
  var pixel = ctx2.getImageData(x, y, 1, 1);
  var data = pixel.data;
  var rgba = 'rgba(' + data[0] + ', ' + data[1] +
             ', ' + data[2] + ', ' + (data[3] / 255) + ')';
    log( x + " , " + y + " "+rgba);
}


canvas2.addEventListener('mousemove', pick);
canvas1.addEventListener('mousemove', pick);
