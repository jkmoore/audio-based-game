# CS410-CSM-Project

Just gonna throw design ideas in here for now


Obstacles have the following data:
  Position on a single horizontal axis (just the left edge matters because if it reaches the player the game ends)
  Highest frequency allowed to destroy it
  Lowest frequency allowed to destroy it
  Highest volume allowed to destroy it
  Lowest volume allowed to destroy it

The obstacle might not need to be a class, we can just have variables for the currently approaching obstacle and change
them as an obstacle is destroyed and a new one approaches


Player does not need to be a class because it's essentially a stationary point on an axis. No properties/function


The program calls an "update" function on a loop until the game ends. Looks something like this...
Every x seconds, do the following:
  If we receive input in an adequate frequency/volume range for o, remove o and make a new obstacle
  Else,
    Move position of obstacle o y units to the left
    If obstacle o overlaps with the player, end the game




