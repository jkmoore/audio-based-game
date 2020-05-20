const SIZE = 180; //player and obstacle height/width
const PX = SIZE + 20; //player position, must not draw over with obstacle image or canvas background

var canvas = document.getElementById("canvas"),
  ctx = canvas.getContext("2d"),
  width = 900,
  height = 500;

function update()
{
  //If we receive audio in the adequte frequency/volume range, remove and redraw a random obstacle, reset variables as appropriate
  //TODO


  //Otherwise we continue to redraw the currently approaching obstacle and check if the player lost the game

  ctx.fillStyle = "skyblue";
  ctx.fillRect(PX,0,canvas.width-PX,canvas.height);
  if (imgx > PX)
  {
    ctx.drawImage(img,imgx-1,imgy,SIZE,SIZE);
    imgx = imgx - 1;
  }
  else
    alert("GAME OVER");
}

canvas.width = width;
canvas.height = height;
var img = new Image();

img.onload = function()
{
  ctx.drawImage(img,width-PX,height-PX,SIZE,SIZE);   
  imgx = width;
  imgy = height-PX;
};
img.src = "./tony.jpg";

ctx.fillStyle = "red";
ctx.fillRect(PX-SIZE,canvas.height-PX,SIZE,SIZE);

setInterval(update, 15); //TODO make this speed gradually increase, possibly with another setInterval call and another function

