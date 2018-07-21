var g = $('.game-field');
var canvas = document.querySelector('canvas');
var mouse ={};
var opponents = []
function Player(image,color,username) {
  this.username = username;
  this.color = color;
  this.health=10;
  this.mover = {x:0,y:0,currx:0,curry:0,first:true}
  this.start = function(){
    var a = Math.floor(Math.random()*window.innerWidth)
    var b =Math.floor(Math.random()*window.innerHeight)
    this.mover.currx =  a;
    this.mover.curry = b;
    this.mover.first = false;
    drawImageRot(image, this.mover.currx,this.mover.curry, image.width, image.height);
  },
  this.update = function(){
    this.mover.currx = this.mover.currx+ this.mover.x;
    this.mover.curry = this.mover.curry+ this.mover.y;
    drawImageRot(image, this.mover.currx,this.mover.curry, image.width, image.height);
  }
}
var c = canvas.getContext('2d');
var bullets = []
var image = new Image(50, 50);
image.src = './images/character.gif';
var z = new Player(image,'blue','Amit');

$(document).ready(function(){
  var a = window.innerWidth;
  var b = window.innerHeight;
  z.start();
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
  if(event.key == 'w'&&z.mover.y>-1){
    z.mover.y--;
  }if(event.key == 'a'&&z.mover.x>-1){
    z.mover.x--
  }if(event.key == 'd'&&z.mover.x<1){
    z.mover.x++;
  }if(event.key == 's'&&z.mover.y<1){
    z.mover.y++;
  }
})

function Bullet(Player,x,y,mousex,mousey,opp){
  this.x = x;
  this.y = y;
  this.xDiff = mousex-x;
  this.yDiff = mousey-y;
  this.velocity  = 30;
  this.multiplier = this.velocity/Math.sqrt((this.xDiff*this.xDiff)+(this.yDiff*this.yDiff));
  this.dx = this.xDiff*this.multiplier;
  this.dy = this.yDiff*this.multiplier;
  this.radius = 3
  this.start = function(){
    c.beginPath();
    c.arc(this.x,this.y,this.radius,0,Math.PI*2,false)
    c.strokeStyle = z.color
    c.stroke()
  };
  this.update = function(){
    this.x+=this.dx;
    this.y+=this.dy;
    c.beginPath();
    c.arc(this.x,this.y,this.radius,0,Math.PI*2,false)
    c.strokeStyle = z.color
    c.stroke()
    for (var alpha = 0; alpha< opp.length;alpha++){
      var current = opp[alpha];
      if(this.x+this.radius>current.mover.currx&&this.x-this.radius<current.mover.currx+45&&this.y+this.radius>current.mover.curry&&this.y-this.radius<current.mover.curry+45){
        $.ajax({
          method:'POST',
          url:'http://owen-hackandslash.builtwithdark.com/damage',
          data:{
            username:z.username
          }
          ,success:function(successObj){
            if(successObj.Player.health === 0){
              alert(successObj.Player.username+" lost")
            }
          },error:function(err){
            console.log(err);
          }
        })
      }
    }

  };
};
window.addEventListener('keyup',function(event){
  if(event.key == 'w'){
    z.mover.y++;
  }if(event.key == 'a'){
    z.mover.x++
  }if(event.key == 'd'){
    z.mover.x--;
  }if(event.key == 's'){
    z.mover.y--;
  }
})
window.addEventListener('click',function(event){
  var a = new Bullet(z,z.mover.currx+50,z.mover.curry+37,mouse.x,mouse.y,opponents)
  a.start();
  bullets.push(a);
})


window.addEventListener('contextmenu',function(event){
  event.preventDefault()
  var a = new Bullet(z,z.mover.currx+50,z.mover.curry+37,mouse.x,mouse.y,opponents)
  a.start();
  bullets.push(a);
})
window.addEventListener('resize',function(){
  var a = window.innerWidth;
  var b = window.innerHeight;
  canvas.width = (a);
  canvas.height = (b);
})
z.start()
function animate(){
  c.clearRect(0,0,window.innerWidth,window.innerHeight)
  z.update();
  $.ajax({
    method:'POST',
    url:'http://owen-hackandslash.builtwithdark.com/self',
    data:{
      mover:z.mover,
      username:z.username
    },success:function(){
      $.ajax({
        method:'GET',
        url:'http://owen-hackandslash.builtwithdark.com/players?username='+z.username
        ,success:function(successObj){
          opponents = successObj.everyoneButMe
          $.ajax({
            method:'GET',
            url:'http://owen-hackandslash.builtwithdark.com/health?username='+z.username
            ,success:function(successObj){
              opponents = successObj.health
              $.ajax({
                method:'GET',
                url:'http://owen-hackandslash.builtwithdark.com/bullets'
                ,success:function(successObj){
                  opponents = successObj.bullets

                },error:function(err){
                  console.log(err);
                }
              })
            },error:function(err){
              console.log(err);
            }
          })
        },error:function(err){
          console.log(err);
        }
      })
    },error:function(err){
      console.log(err);
    }
  })
  for(var n = 0; n<bullets.length;n++){
    bullets[n].update()

  }
     // using optional size for image// draw when image has loaded

  // load an image of intrinsic size 300x227 in CSS pixels

  z.update()

  requestAnimationFrame(animate);
}
animate();
