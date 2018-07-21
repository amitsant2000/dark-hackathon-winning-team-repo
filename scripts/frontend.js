var g = $('.game-field');
var canvas = document.querySelector('canvas');
var mouse ={};
var c = canvas.getContext('2d');
var bullets = []
var image = new Image(50, 50);
image.src = './images/character.gif';

var mover = {x:0,y:0,currx:0,curry:0,first:true}

$(document).ready(function(){
  var a = window.innerWidth;
  var b = window.innerHeight;

  canvas.width = (a);
  canvas.height = (b);
})
window.addEventListener('mousemove',function(event){
  mouse.x = event.x;
  mouse.y= event.y;
})
function drawImageRot(img,x,y,width,height){
    var offsetY = -(y - mouse.y) ;
    var offsetX = (x - mouse.x) ;

    var degrees = Math.atan2(offsetY,-offsetX);
    //Convert degrees to radian
    var rad = degrees;

    //Set the origin to the center of the image
    c.translate(x + width / 2, y + height / 2);
    //Rotate the canvas around the origin
    c.rotate(rad);

    //draw the image
    c.drawImage(img,width / 2 * (-1),height / 2 * (-1),width,height);

    // //reset the canvas
    c.rotate(rad * ( -1 ) );
    c.translate((x + width / 2) * (-1), (y + height / 2) * (-1));
}
window.addEventListener('keydown',function(event){
  if(event.key == 'w'&&mover.y>-1){
    mover.y--;
  }if(event.key == 'a'&&mover.x>-1){
    mover.x--
  }if(event.key == 'd'&&mover.x<1){
    mover.x++;
  }if(event.key == 's'&&mover.y<1){
    mover.y++;
  }
})

function Bullet(x,y,mousex,mousey){
  this.x = x;
  this.y = y;
  this.xDiff = mousex-x;
  this.yDiff = mousey-y;
  this.velocity  = 30;
  this.multiplier = this.velocity/Math.sqrt((this.xDiff*this.xDiff)+(this.yDiff*this.yDiff));
  this.dx = this.xDiff*this.multiplier;
  this.dy = this.yDiff*this.multiplier;
  this.start = function(){
    c.beginPath();
    c.arc(this.x,this.y,3,0,Math.PI*2,false)
    c.strokeStyle = 'yellow'
    c.stroke()
  };
  this.update = function(){
    this.x+=this.dx;
    this.y+=this.dy;
    c.beginPath();
    c.arc(this.x,this.y,3,0,Math.PI*2,false)
    c.strokeStyle = 'yellow'
    c.stroke()
  };
};
window.addEventListener('keyup',function(event){
  if(event.key == 'w'){
    mover.y++;
  }if(event.key == 'a'){
    mover.x++
  }if(event.key == 'd'){
    mover.x--;
  }if(event.key == 's'){
    mover.y--;
  }
})
window.addEventListener('click',function(event){
  var a = new Bullet(mover.currx+50,mover.curry+37,mouse.x,mouse.y)
  a.start();
  bullets.push(a);
})

function drawImageActualSize(image) {
  // use the intrinsic size of image in CSS pixels for the canvas element

  // will draw the image as 300x227 ignoring the custom size of 60x45
  // given in the constructor
  // To use the custom size we'll have to specify the scale parameters
  // using the element's width and height properties - lets draw one
  // on top in the corner:
  if (mover.first){
    var a = Math.floor(Math.random()*window.innerWidth)
    var b =Math.floor(Math.random()*window.innerHeight)
    mover.currx =  a;
    mover.curry = b;
    mover.first = false;
  }else{
    mover.currx = mover.currx+ mover.x;
    mover.curry = mover.curry+ mover.y;
  }
  drawImageRot(image, mover.currx,mover.curry, image.width, image.height);
}
window.addEventListener('resize',function(){
  var a = window.innerWidth;
  var b = window.innerHeight;
  canvas.width = (a);
  canvas.height = (b);
})

function animate(){
  c.clearRect(0,0,window.innerWidth,window.innerHeight)
  for(var n = 0; n<bullets.length;n++){
    bullets[n].update()
  }
     // using optional size for image// draw when image has loaded

  // load an image of intrinsic size 300x227 in CSS pixels

  drawImageActualSize(image)

  requestAnimationFrame(animate);
}
animate();
