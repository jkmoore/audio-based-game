const SIZE = 180; //player and obstacle height/width
const PX = SIZE + 20; //player position, must not draw over this position with obstacle image or canvas background
const SCR_X = 80; //x-coordinate of score display
const SCR_Y = 200; //y-coordinate of score display
const TIME = 15; //milliseconds in between calls of the update() function
const SPD_UP = 0.1;
const SPD_MAX = 12.0;

//Obstacle properties (min/max frequencies and volumes to destroy each unique obstacle)
const TON_MINF = 2, TON_MAXF = 3, TON_MINV = 130; //lo freq, lo vol
const TIG_MINF = 15, TIG_MAXF = 25, TIG_MINV = 130; //hi freq, lo vol
const CHE_MINF = 20, CHE_MAXF = 30, CHE_MINV = 180; //super hi freq, hi vol
const GAR_MINF = 3, GAR_MAXF = 4, GAR_MINV = 180; //lo freq, hi vol
const MAX_HP = 100;

navigator.mediaDevices.getUserMedia({audio:true});
var mic, fft;
var maxVol, index;
function setup()
{
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);
}
function draw() //called repeatedly throughout the program, gets values measuring frequency/volume
{
  var vol = mic.getLevel();
  var spectrum = fft.analyze();

  //1024 bins in the spectrum
  //Each bin is evenly spaced from 0 Hz to 22050 Hz (Nyquist frequency)
  //Bin 1 is 0-21.5 Hz, Bin 2 is 21.5-43 Hz, etc.

  //Volumes range from 0 to 255; with a regular laptop mic and distance from the user, regular speaking voice is ~130-170

  maxVol = 0;
  index = 0;
  for (i = 0; i<spectrum.length; i++)
  {
    if (spectrum[i] > maxVol)
    {
      maxVol = spectrum[i];
      index = i;
    }
  }
  if (maxVol > 150)
    console.log(index, maxVol); //logs frequency and volume (but not in Hz and not from 0 to 1, will look at these scales later)
}

//Canvas-related variables
var canvas = document.getElementById("canvas"),
  ctx = canvas.getContext("2d"),
  cvwidth = 900,
  cvheight = 500;

//Called repeatedly to update visuals and check for input or the game ending
function update()
{
  console.log("Max and index: ", maxVol, index); //test
  hit = false;

  //TODO look at obsN to determine the correct set of constants and then check for a hit
  //TODO issue: we're not getting good readings with human voice (you can compare with a good online tuner)
     //the FUNDAMENTAL frequency (lowest peak) is what we want, not the dominant frequency (highest amplitude)
     //refer to this later: https://github.com/processing/p5.js/issues/1360
          //clarifies what fundamental frequency is and shows how to find it using p5

  if (maxVol > 100 && index > 30 && index < 50) //just random test values right now, change this later
    hit = true;
  if (hit)
    obsHP = obsHP - 1;

  ctx.drawImage(playerImg,PX-SIZE,cvheight-PX,SIZE,SIZE);

  //If obstacle HP has reached zero, redraw it as another randomly selected obstacle with values reset and speed increased
  if (obsHP <= 0)
  {
    totalScore = totalScore + 1;
    ctx.fillStyle = "skyblue";
    ctx.fillRect(PX,0,cvwidth-PX,cvheight);
    ctx.fillRect(0,120,PX,100);
    ctx.fillStyle = "black";
    ctx.fillText(totalScore,SCR_X,SCR_Y);
    obsx = cvwidth; //obstacle is moved back to the starting position
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
    ctx.fillRect(PX,0,cvwidth-PX,cvheight);
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
canvas.width = cvwidth;
canvas.height = cvheight;

totalScore = 0;
ctx.font = "60px Comic Sans MS";
ctx.fillText(totalScore,SCR_X,SCR_Y);

//Create the obstacle image, set its properties
var obs = new Image();
obsMove = 1.0; //number of units the obstacle moves per update() call, increases with each new obstacle
obs.onload = function() //called each time the obstacle changes (when a new image is loaded for it)
{
  ctx.drawImage(obs,cvwidth,cvheight-PX,SIZE,SIZE);   
  obsx = cvwidth;
  obsy = cvheight-PX;
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
  }
  else if (obsN == 1)
  {
    obs.src = "./Images/tigger.jpg";
    obsMinF = TIG_MINF;
    obsMaxF = TIG_MAXF;
    obsMinV = TIG_MINV;
  }
  else if (obsN == 2)
  {
    obs.src = "./Images/chester.png";
    obsMinF = CHE_MINF;
    obsMaxF = CHE_MAXF;
    obsMinV = CHE_MINV;
  }
  else
  {
    obs.src = "./Images/garfield.jpg";
    obsMinF = GAR_MINF;
    obsMaxF = GAR_MAXF;
    obsMinV = GAR_MINV;
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

//Call the update function on a loop
function begin()
{
  setInterval(update, TIME);
}

