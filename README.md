# CS410-CSM-Project

Kai Moore jkm9@pdx.edu
Ashlyn Okamoto okamoto@pdx.edu

Yelling Game

A simple 2D game that requires use of the player's voice for an engaging and entertaining experience.
The player, on the left side of the screen, is approached by enemies, each with a target frequency
and base volume level the player must meet to destroy them. Enemies gradually increase in speed, and
the game ends when the player fails to destroy an enemy before it reaches them. Colored text on the
right side of the screen shows whether the player needs to raise, lower, or keep steady the pitch of
their voice to destroy the incoming enemy.

To run the game, first gather all HTML, CSS, and JavaScript files as well as the "Images" folder in
one directory. If using Safari, ensure "Allow Media Capture on Insecure Sites" is checked under
Develop > WebRTC, then open "Game.html" in Safari, allow microphone access, and click the "Start the
game" button to begin. If using Google Chrome, download and launch the "Web Server for Chrome"
extension, choose the directory containing all the game files, open the provided link, click on
"Game.html", and then allow microphone access and click the button to begin.

We have tested the game with console messages in the draw() and update() functions, which are called
rapidly and continually throughout the game. These console messages, commented out in "Game.js",
display various metrics of incoming audio: volume, position in the frequency spectrum, and estimated
frequency range in Hertz. We compared this console output with the values known to be able to destroy
each in-game enemy as well as a live tuner that can accurately measure pitch in Hertz.

One issue with the game is it uses the dominant frequency of incoming audio instead of the fundamental
frequency, or the pitch, to determine whether an enemy can be destroyed. Dominant frequency is not
always equal to fundamental frequency, and a player might raise or lower the pitch of their voice
while the game computes a frequency change in the opposite direction. However, this does not have a
significant effect on gameplay from our playtesting experience (a high voice will still clear enemies
that are destroyed by high-pitched sounds, and a low voice will still clear enemies destroyed by low-
pitched sounds), so while it would be a fine improvement to implement a pitch detection algorithm and
ensure frequency computations are perfect, we are still satisfied with this project as is.
