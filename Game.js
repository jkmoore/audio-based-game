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
  if (obsx > PX)
  {
    ctx.drawImage(obs,obsx-1,obsy,SIZE,SIZE);
    obsx = obsx - 1;
  }
  else
    alert("GAME OVER");
}

canvas.width = width;
canvas.height = height;

var obs = new Image();
obs.onload = function()
{
  ctx.drawImage(obs,width-PX,height-PX,SIZE,SIZE);   
  obsx = width;
  obsy = height-PX;
};
obs.src = "./tony.jpg";

var playerImg = new Image();
playerImg.onload = function()
{
  ctx.drawImage(playerImg,PX-SIZE,canvas.height-PX,SIZE,SIZE);
}
playerImg.src = "./player.jpeg";

setInterval(update, 15); //TODO make this speed gradually increase, possibly with another setInterval call and another function

