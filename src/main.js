// Ensure BootScene and MainMenuScene are loaded before this file
// (or using modules, import them)

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
    LoseScene,
    AdvancedNetworkScene,
    NonceFinderScene,
    ProofPuzzleScene,
    HowToPlayScene 
  ],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    },
  },
};

const game = new Phaser.Game(config);