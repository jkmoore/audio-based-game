var canvas = document.getElementById("canvas"),
  ctx = canvas.getContext("2d"),
  width = 900,
  height = 500;
  obstacle = {
    x: width + 25,
    width: 25,
    height: 25,
  };

function update()
{
  //Move position of obstacle o y units to the left
  //If obstacle o is within z units of the player and is not destructible, set it to be destructible
  //If obstacle o is destructible and we receive input in an adequate frequency/volume range for o, remove o
  //If obstacle o overlaps with the player, end the game
}

canvas.width = width;
canvas.height = height;
update();
