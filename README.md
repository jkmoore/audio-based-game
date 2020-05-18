# CS410-CSM-Project

Just gonna throw design ideas in here for now


Obstacles have the following data:
  Position on a single horizontal axis (just the left edge matters because if it reaches the player the game ends)
  Destructible or not
  Highest frequency allowed to destroy it
  Lowest frequency allowed to destroy it
  Highest volume allowed to destroy it
  Lowest volume allowed to destroy it


Player does not need to be an object because it's essentially a stationary point on an axis. No properties/function


The program calls an "update" function on a loop until the game ends. Looks something like this...
Every x seconds, do the following:
  Move position of obstacle o y units to the left
  If obstacle o is within z units of the player and is not destructible, set it to be destructible
  If obstacle o is destructible and we receive input in an adequate frequency/volume range for o, remove o
  If obstacle o overlaps with the player, end the game




