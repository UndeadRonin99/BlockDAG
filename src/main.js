// main.js

// 1. Create a game config object
const config = {
    type: Phaser.AUTO,                  // Phaser will decide WebGL or Canvas
    width: 800,
    height: 600,
    parent: 'game-container',           // matches the <div> in index.html
    backgroundColor: '#222222',
    scene: {
      preload: preload,
      create: create,
      update: update,
    },
    physics: {
      default: 'arcade',
      arcade: {
        debug: false
      }
    }
  };
  
  // 2. Initialize the Phaser game
  let game = new Phaser.Game(config);
  
  // 3. Scene functions
  function preload() {
    // Load assets here
    // Example:
    // this.load.image('player', 'assets/images/player.png');
  }
  
  function create() {
    // Setup sprites, text, collisions, etc.
    // this.add.image(400, 300, 'player');
  }
  
  function update(time, delta) {
    // Game loop logic goes here
  }
  