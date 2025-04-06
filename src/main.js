// main.js

// Use the classes we attached to window in our config
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'game-container',
  backgroundColor: '#222222',
  scene: [
    BootScene,
    MainMenuScene,
    MiniGamesMenuScene,
    PacketDodgerScene,
    BitFlipperScene,
    HackerAttackScene,
    WinScene,
    LoseScene
  ],
  physics: {
    default: 'arcade',
    arcade: { debug: false }
  }
};

const game = new Phaser.Game(config);