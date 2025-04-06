// Ensure BootScene and MainMenuScene are loaded before this file
// (or using modules, import them)

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  scale: {
    mode: Phaser.Scale.FIT,         
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
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
    NetworkSimulatorScene,
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