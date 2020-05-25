const SIZE = 180; //player and obstacle height/width
const PX = SIZE + 20; //player position, must not draw over this position with obstacle image or canvas background
const TIME = 15; //milliseconds in between calls of the update() function
const SPD_UP = 0.1;
const SPD_MAX = 12.0;

//Obstacle properties (min/max frequencies and volumes to destroy each unique obstacle)
const TON_MINF = 40, TON_MAXF = 80, TON_MINV = 0.3, TON_MAXV = 1.0; //lo freq, lo vol
const TIG_MINF = 400, TIG_MAXF = 2000, TIG_MINV = 0.3, TIG_MAXV = 1.0; //hi freq, lo vol
const CHE_MINF = 600, CHE_MAXF = 2000, CHE_MINV = 0.9, CHE_MAXV = 1.0; //hi freq, hi vol
const GAR_MINF = 40, GAR_MAXF = 80, GAR_MINV = 0.9, GAR_MAXV = 1.0; //lo freq, hi vol
const MAX_HP = 50;

//Canvas-related variables
var canvas = document.getElementById("canvas"),
  ctx = canvas.getContext("2d"),
  width = 900,
  height = 500;
//score elements 
var scoreElement = document.getElementById("scoreElement");
var scoreBoard = document.getElementById("scoreBoard");
var totalScore = 0;
function createScoreBoard()
{
  scoreElement.innerHTML = totalScore; 
}
//Called repeatedly to update visuals and check for input or the game ending
function update()
{
  createScoreBoard();
  //TODO read and check for correct audio input
    //(if the audio is good for the obstacle's freq/vol range, all you have to do is set hit to true and otherwise false.
    //all the rest of this function is set up properly already)
    //(note that obsN allows us to identify the current object and therefore the freq/vol ranges to consider)

    //Concern: can we get audio input from the user in a tiny fraction of a second so that the update() function can keep repeating?
      //if not we might have to make some small design changes
  hit = true;
  if (hit)
    obsHP = obsHP - 1;

  //If obstacle HP has reached zero, redraw it as another randomly selected obstacle with values reset and speed increased
  if (obsHP <= 0)
  {
    //TODO add a score display somewhere and increase the score with each obstacle destroyed
    ctx.fillStyle = "skyblue";
    ctx.fillRect(PX,0,canvas.width-PX,canvas.height);
    obsx = width; //obstacle is moved back to the starting position
    if (obsMove <= SPD_MAX && obsMove + SPD_UP <= SPD_MAX)
      obsMove = obsMove + SPD_UP; //obstacle speed increases if not yet at the max
    obsHP = MAX_HP;
    randObs(); 
    ctx.drawImage(obs,obsx,obsy,SIZE,SIZE);
  }
  else
  {
    //Continue to redraw the currently approaching obstacle and end the game if the obstacle has reached the player 
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
}

//Set the canvas height and width
canvas.width = width;
canvas.height = height;

//Create the obstacle image, set its properties
var obs = new Image();
obsMove = 1.0; //number of units the obstacle moves per update() call, increases with each new obstacle
obs.onload = function() //called each time the obstacle changes (when a new image is loaded for it)
{
  ctx.drawImage(obs,width,height-PX,SIZE,SIZE);   
  obsx = width;
  obsy = height-PX;
  obsHP = MAX_HP; //hit points remaining, decreases with correct audio input from the player
};

function randObs() //randomly chooses an obstacle, sets all obstacle-unique values (obsN, obs.src, freq/vol)
{
  obsN = Math.floor(Math.random() * 4); //random integer from 0 to 3 that determines the obstacle
  if (obsN == 0)
  {
    obs.src = "./Images/tony.jpg";
    obsMinF = TON_MINF;
    obsMaxF = TON_MAXF;
    obsMinV = TON_MINV;
    obsMaxV = TON_MAXV;
  }
  else if (obsN == 1)
  {
    obs.src = "./Images/tigger.jpg";
    obsMinF = TIG_MINF;
    obsMaxF = TIG_MAXF;
    obsMinV = TIG_MINV;
    obsMaxV = TIG_MAXV;
  }
  else if (obsN == 2)
  {
    obs.src = "./Images/chester.png";
    obsMinF = CHE_MINF;
    obsMaxF = CHE_MAXF;
    obsMinV = CHE_MINV;
    obsMaxV = CHE_MAXV;
  }
  else
  {
    obs.src = "./Images/garfield.jpg";
    obsMinF = GAR_MINF;
    obsMaxF = GAR_MAXF;
    obsMinV = GAR_MINV;
    obsMaxV = GAR_MAXV;
  }
}
randObs();

//Create the player image, set its properties
var playerImg = new Image();
playerImg.onload = function()
{
  ctx.drawImage(playerImg,PX-SIZE,canvas.height-PX,SIZE,SIZE);
}
playerImg.src = "./Images/player.jpeg";

//TODO get permission to use the mic
//TODO add a start button and let the game start only after that button is clicked 

//Call the update function on a loop
setInterval(update, TIME);

