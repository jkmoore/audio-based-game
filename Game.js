const SIZE = 180; //player and obstacle height/width
const PX = SIZE + 20; //player position, must not draw over this position with obstacle image or canvas background
const SCR_X = 80; //x-coordinate of score display
const SCR_Y = 200; //y-coordinate of score display
const TIME = 15; //milliseconds in between calls of the update() function
const SPD_UP = 0.1;
const SPD_MAX = 12.0;

//Obstacle properties (min/max frequencies and volumes to destroy each unique obstacle)
const TON_MINF = 2, TON_MAXF = 6, TON_MINV = 180; //lo freq, lo vol
const TIG_MINF = 12, TIG_MAXF = 100, TIG_MINV = 180; //hi freq, lo vol
const CHE_MINF = 17, CHE_MAXF = 100, CHE_MINV = 220; //super hi freq, hi vol
const GAR_MINF = 7, GAR_MAXF = 11, GAR_MINV = 220; //lo freq, hi vol
const MAX_HP = 100;

navigator.mediaDevices.getUserMedia({audio:true});
var mic, fft;
var vol, index; //measures vol/freq of user input

//setup() and draw() as well as all functions called inside are from the p5 complete library (p5.js, p5.sound.js)
function setup()
{
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);
}
function draw() //called repeatedly throughout the program, gets values measuring frequency/volume
{
  var spectrum = fft.analyze();

  //1024 bins in the spectrum
  //Each bin is evenly spaced from 0 Hz to 22050 Hz (Nyquist frequency)
  //Bin 1 is 0-21.5 Hz, Bin 2 is 21.5-43 Hz, etc.

  //Volumes range from 0 to 255; with a regular laptop mic and distance from the user, regular speaking voice is ~130-170

  vol = 0;   //volume at dominant frequency
  index = 0; //bin containing dominant frequency (issue: this is not always the same as actual pitch)
  for (i = 0; i<spectrum.length; i++)
  {
    if (spectrum[i] > vol)
    {
      vol = spectrum[i];
      index = i;
    }
  }

  //Test (run next to a real tuner and compare frequencies)
  //if (vol > 150)
  //  console.log("Index/Index Hz Low/Index Hz High/Vol: ", index, index*21.53, index*21.53+21.53, vol);
}

//Canvas-related variables
var canvas = document.getElementById("canvas"),
  ctx = canvas.getContext("2d"),
  cvwidth = 900,
  cvheight = 500;

var guideImg = document.getElementById("guideImg");
var stopUpdate = false; //set to true when game ends, update function then does nothing

//Called repeatedly to update visuals and check for input or the game ending
function update()
{
  if (stopUpdate == false)
  {
    //console.log("Vol/Index/Hz Low/Hz Hi: ", vol, index, index*21.53, index*21.53+21.53); //test

    //Determine whether the obstacle will take damage based on its target frequency/volume values
    hit = false;
    if (obsN == 0) //Tony
    {
      if (vol > TON_MINV && index >= TON_MINF && index <= TON_MAXF)
        hit = true;
      else if (index <= TON_MINF) //if the frequency is too low
        guideImg.src = "./Images/GoHigh.jpg";
      else if (index >= TON_MAXF) //if the frequency is too high
        guideImg.src = "./Images/GoLow.jpg";
    }
    else if (obsN == 1) //Tigger
    {
      if (vol > TIG_MINV && index >= TIG_MINF && index <= TIG_MAXF)
        hit = true;
      else if (index <= TIG_MINF) //if the frequency is too low
        guideImg.src = "./Images/GoHigh.jpg";
      else if (index >= TIG_MAXF) //if the frequency is too high
        guideImg.src = "./Images/GoLow.jpg";
    }
    else if (obsN == 2) //Chester
    {
      if (vol > CHE_MINV && index >= CHE_MINF && index <= CHE_MAXF)
        hit = true;
      else if (index <= CHE_MINF) //if the frequency is too low
        guideImg.src = "./Images/GoHigh.jpg";
      else if (index >= CHE_MAXF) //if the frequency is too high
        guideImg.src = "./Images/GoLow.jpg";
    }
    else //Garfield
    {
      if (vol > GAR_MINV && index >= GAR_MINF && index <= GAR_MAXF)
        hit = true;
      else if (index <= GAR_MINF) //if the frequency is too low
        guideImg.src = "./Images/GoHigh.jpg";
      else if (index >= GAR_MAXF) //if the frequency is too high
        guideImg.src = "./Images/GoLow.jpg";
    }

    if (hit)
    {
      obsHP = obsHP - 1;
      guideImg.src = "./Images/Good.jpg";
    }

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
      ctx.fillStyle = "skyblue";
      ctx.fillRect(PX,0,cvwidth-PX,cvheight);
      //Continue to redraw the currently approaching obstacle and end the game if the obstacle has reached the player 
      if (obsx > PX)
      {
        ctx.drawImage(obs,obsx-obsMove,obsy,SIZE,SIZE);
        obsx = obsx - obsMove;
      }
      else
      {
        alert("GAME OVER");
        stopUpdate = true;
        location.reload();
      }
    }
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
  const button = document.getElementById("button");
  button.disabled = true;
  setInterval(update, TIME);
}

