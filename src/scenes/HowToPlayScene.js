class HowToPlayScene extends Phaser.Scene {
  constructor() {
    super('HowToPlayScene');
  }

  create() {
    const { width, height } = this.cameras.main;

    // Set a dark background color so white text is visible:
    this.cameras.main.setBackgroundColor('#000000');

    // Title text
    const title = this.add.text(width / 2, 50, 'How to Play', {
      fontSize: '32px',
      color: '#ffffff'
    }).setOrigin(0.5);

    // Multi-line instructions
    const instructions = `
Welcome to "Validate, or Die" – a set of mini-games themed around blockchain and validation!

1) Nonce Finder (Easy):
   - Click the button to generate a random nonce.
   - If it’s below the target threshold, you win!
   - Keep clicking until you succeed.

2) Proof Puzzle (Medium):
   - A simple math puzzle. You see 'What is A + B?'
   - Use the up/down arrows to select your guess,
     then press check.
   - Get it correct to win!

3) Network Simulator (Hard):
   - You have 5 labeled nodes (A, B, C, D, and E) placed randomly.
     - Each node can only have 2 edges (links).
     - Your goal is to connect the nodes in a ring, in alphabetical order (A → B → C → D → E → A).
     - Click one node, then another, to form a link between them. 
    - Press "Check" to validate your network. If the cycle is correct, you win! Otherwise, keep adjusting.
    - You have a time limit; if it runs out, you lose.
  

4) Packet Dodger (Easy):
   - Move your player (or “validator”) left and right at
     the bottom of the screen.
   - Avoid the malicious packets falling from above.
   - Survive long enough to achieve your target score or time.
   - Colliding with a packet ends the game!

5) Bit Flipper (Medium):
   - You start with a grid of 0/1 tiles.
   - Click tiles to flip them (0 ↔ 1) and match a target 
     binary pattern.
   - Complete the puzzle within a set number of moves 
     or time limit.
   - Match the pattern exactly to win!

6) Hacker Attack (Hard):
   - Control a defender that can fire projectiles upward.
   - Waves of malware “hackers” descend from above.
   - Shoot them down before they reach you; if they collide,
     you lose.
   - Score points for every hacker destroyed — defeat 
     them all to claim victory!

Good luck, and have fun!
`;

    // Create the instruction text in the scene
    const instructionsText = this.add.text(width / 2, 120, instructions, {
      fontSize: '18px',
      color: '#ffffff',
      align: 'left',
      wordWrap: { width: width - 100 }
    }).setOrigin(0.5, 0);

    // Calculate how tall the instructions are
    const textHeight = instructionsText.getBounds().height;

    // If the instructions exceed the screen height, enable camera scrolling
    if (textHeight > height - 180) {
      // Extend the camera's vertical bounds
      this.cameras.main.setBounds(0, 0, width, textHeight + 200);

      // Scroll with the mouse wheel
      this.input.on('wheel', (pointer, over, deltaX, deltaY, deltaZ) => {
        this.cameras.main.scrollY += deltaY * 0.5;
      });
    }

    // Place the "Back" button below the instructions
    const backButtonY = Math.max(height - 50, textHeight + 140);
    const backButton = this.add.text(width / 2, backButtonY, 'Back to Mini Games Menu', {
      fontSize: '20px',
      color: '#ffffff',
      backgroundColor: '#333333',
      padding: { x: 10, y: 5 }
    }).setOrigin(0.5).setInteractive();

    backButton.on('pointerdown', () => {
      this.scene.start('MiniGamesMenuScene');
    });
  }
}

window.HowToPlayScene = HowToPlayScene;
