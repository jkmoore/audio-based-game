const SIZE = 180; //player and obstacle height/width
const PX = SIZE + 20; //player position, must not draw over this position with obstacle image or canvas background
const TIME = 15; //milliseconds in between calls of the update() function

//Obstacle properties (min/max frequencies and volumes to destroy each unique obstacle)
//TODO figure out appropriate values for all these (something challenging but reasonable for a human voice)
const TON_MINF = 0, TON_MAXF = 100000, TON_MINV = 0, TON_MAXV = 100000;
const TIG_MINF = 0, TIG_MAXF = 100000, TIG_MINV = 0, TIG_MAXV = 100000;
const CHE_MINF = 0, CHE_MAXF = 100000, CHE_MINV = 0, CHE_MAXV = 100000;
const GAR_MINF = 0, GAR_MAXF = 100000, GAR_MINV = 0, GAR_MAXV = 100000;

//Canvas-related variables
var canvas = document.getElementById("canvas"),
  ctx = canvas.getContext("2d"),
  width = 900,
  height = 500;


//Called repeatedly to update visuals and check for input or the game ending
function update()
{
  //TODO If we receive audio in the adequate frequency/volume range, remove and redraw a random obstacle, reset variables as appropriate
  //you can use obj.src = "./picName.extension" to change the image for the obstacle, and the other variables should be easy

  //Otherwise we continue to redraw the currently approaching obstacle and end the game if the obstacle has reached the player 
  ctx.fillStyle = "skyblue";
  ctx.fillRect(PX,0,canvas.width-PX,canvas.height);
  if (obsx > PX)
  {
    ctx.drawImage(obs,obsx-obsMove,obsy,SIZE,SIZE);
    obsx = obsx - obsMove;
  }
  else
    alert("GAME OVER");
}


//Set the canvas height and width
canvas.width = width;
canvas.height = height;

//Create the obstacle image, set its properties
var obs = new Image();
obs.onload = function()
{
  ctx.drawImage(obs,width-PX,height-PX,SIZE,SIZE);   
  obsx = width;
  obsy = height-PX;
  obsMove = 1; //number of units the obstacle moves per update() call; should be higher with each new obstacle
};
obsN = Math.floor(Math.random() * 4); //random integer from 0 to 3 that determines the obstacle
if (obsN == 0)
{
  obs.src = "./tony.jpg";
  obsMinF = TON_MINF;
  obsMaxF = TON_MAXF;
  obsMinV = TON_MINV;
  obsMaxV = TON_MAXV;
}
else if (obsN == 1)
{
  obs.src = "./tigger.jpg";
  obsMinFreq = TIG_MINF;
  obsMaxFreq = TIG_MAXF;
  obsMinVol = TIG_MINV;
  obsMaxVol = TIG_MAXV;
}
else if (obsN == 2)
{
  obs.src = "./chester.png";
  obsMinFreq = CHE_MINF;
  obsMaxFreq = CHE_MAXF;
  obsMinVol = CHE_MINV;
  obsMaxVol = CHE_MAXV;
}
else
{
  obs.src = "./garfield.jpg";
  obsMinFreq = GAR_MINF;
  obsMaxFreq = GAR_MAXF;
  obsMinVol = GAR_MINV;
  obsMaxVol = GAR_MAXV;
}


//Create the player image, set its properties
var playerImg = new Image();
playerImg.onload = function()
{
  ctx.drawImage(playerImg,PX-SIZE,canvas.height-PX,SIZE,SIZE);
}
playerImg.src = "./player.jpeg";


//Call the update function on a loop
setInterval(update, TIME);

