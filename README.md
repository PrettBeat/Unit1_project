# Pokémon Plagiarism
## by Brett Peat

### Technologies used:
Bootstrap, jquery, google fonts, html, css, and javascript.

### Process/Approach:
Began by deciding to split js functionality among different files, using the techniques Syed taught us. From there I wired up everything about the home page and the main.js that I needed for my first game to work. Then I got to work on building the logic for the first game, lugia's mansion. I made the user character's functionality my first concern. I added keydown listeners, and then googled how to use multiple keys at once. Then I designed the enemy creation function. After that was enemy movement. Finally, I designed the collision detection. After that I styled everything, and provided a work in progress page for the other game, since I wouldn't have time to finish it. Finally, I refactored the code to adjust the difficulty via a score tracker, and readjusted the logic for collision to insure that errors weren't thrown to the console when an enemy interacted with an inactive attack.

### Future Features:
Pika boo will be an I Spy rip off, and Dial-galaga will be a galaga rip off. I would also like to take a second look at the enemy movement. There is a bug where enemies close the distance by going through the viewport barrier  and coming out the other side, rather than closing the distance on screen. This effects the player's ability to kill the ghosts. I would also like to implement a pause button, and a reset button. The final thing would be setting controls.

### Bugs:
Enemy collision can get wonky at time due to the images being larger than what's actually displayed. Also, the aforementioned movement issue where ghosts warp across the screen.

### Wins and Challenges
Biggest win was getting collision detection to work, and be more responsive. That took a while, and several rounds of adjustment. Biggest challenge was getting the distances for collision detection to be relatively true to the displayed picture size. There is a lot of extra space in the images, and that made it much harder.

### Game:
the game I chose to use characters from was Pokémon. The gameplay is derivative of Luigi's mansion.

### Rules:
Kill the ghosts, and don't get killed yourself. The level increases every ten ghosts.

### How to Web-ify Luigi's Mansion
Take out the exploration element of luigi's mansion, and focus on the ghost hunting. The main issue was filtering the gameplay elements into a simpler medium. Other than that, it was just a lot of trial and error to get the best possible results.

### Trello Link:
https://trello.com/b/bRrBtQPE/pok%C3%A9mon-plagiarism
