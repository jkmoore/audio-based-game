# CS410-CSM-Project: Yelling Game
### Kai Moore, Ashlyn Okamoto

#### Introduction

A simple 2D game that requires use of the player's voice for an engaging and entertaining experience.
The player, on the left side of the screen, is approached by enemies, each with a target frequency
and base volume level the player must meet to destroy them. Enemies gradually increase in speed, and
the game ends when the player fails to destroy an enemy before it reaches them. Colored text on the
right side of the screen shows whether the player needs to raise, lower, or keep steady the pitch of
their voice to destroy the incoming enemy.

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

We used the p5 complete library (p5.js and p5.sound.js) to obtain and process audio input in JavaScript.
Functions from p5 are responsible for starting audio recording, running a fast Fourier Transform on
incoming audio, and creating a frequency spectrum from the transform in this program. The setup() and
draw() functions, also part of p5, help the flow of the program by preparing audio recording at the
very beginning and continually checking for audio input while other code is running.


#### How to Play
To run the game, download the zip file for this repository and unzip. Then, identify your browser...
* If using Safari, allow Safari to use the microphone. If still unsuccessful, ensure "Allow Media Capture on Insecure Sites" is checked under Develop > WebRTC, then open "Game.html" in Safari.  
* If using Google Chrome, download and launch the ["Web Server for Chrome"](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb/related?hl=en) extension.

   * After launching the app, choose the directory containing all files included in the unzipped repository.
   * Click the link under "Web Server URL(s)"
   * Open "Game.html", and then allow microphone access.
   
Finally, click the "Start the game" button to begin. Depending on your machine, you may need to allow microphone access after each game ends.

Again, the right side visuals will tell you whether you need to make your voice a higher pitch or a lower pitch in order to destroy the enemy. The "oh yeah," indicates that you are at the right pitch!

Good luck and happy yelling!
