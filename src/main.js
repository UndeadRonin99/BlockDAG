// main.js

// Use the classes we attached to window in our config
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'game-container',
  backgroundColor: '#222222',
  scene: [BootScene, MainMenuScene, GameScene], 
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  }
};

// Initialize Phaser
const game = new Phaser.Game(config);
