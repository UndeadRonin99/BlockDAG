class HowToPlayScene extends Phaser.Scene {
    constructor() {
      super('HowToPlayScene');
    }
  
    create() {
      const { width, height } = this.cameras.main;
  
      // Title
      this.add.text(width / 2, 50, 'How to Play', {
        fontSize: '32px',
        color: '#ffffff',
      }).setOrigin(0.5);
  
      // Instructions text:
      // This can be as long/short as you like. Scroll if needed.
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
  
  Additional Games (listed in the Mini Game Menu):
     - Packet Dodger, Bit Flipper, Hacker Attack, etc. 
       *Your instructions here*
  
  Good luck, and have fun!
  `;
  
      // Make a multi-line text object
      const instructionsText = this.add.text(width / 2, height / 2, instructions, {
        fontSize: '18px',
        color: '#ffffff',
        wordWrap: { width: width - 100 }
      }).setOrigin(0.5);
  
      // "Back" button to go back to the mini-game menu
      const backButton = this.add.text(width / 2, height - 50, 'Back to Mini Games Menu', {
        fontSize: '20px',
        color: '#ffffff',
        backgroundColor: '#000000',
        padding: { x: 10, y: 5 }
      }).setOrigin(0.5).setInteractive();
  
      backButton.on('pointerdown', () => {
        this.scene.start('MiniGamesMenuScene');
      });
    }
  }
  
  window.HowToPlayScene = HowToPlayScene;
  