class GameScene extends Phaser.Scene {
    constructor() {
      super('GameScene');
    }
  
    create() {
      const { width, height } = this.cameras.main;
      this.add.text(width / 2, height / 2, 'Game Scene', {
        fontSize: '28px',
        color: '#ff0000'
      }).setOrigin(0.5);
    }
  }
  
  window.GameScene = GameScene;
  