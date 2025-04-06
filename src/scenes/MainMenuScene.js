class MainMenuScene extends Phaser.Scene {
    constructor() {
      super('MainMenuScene');
    }
  
    create() {
      const { width, height } = this.cameras.main;
      this.add.text(width / 2, height / 2, 'Main Menu', {
        fontSize: '28px',
        color: '#00ff00'
      }).setOrigin(0.5);
  
      // Example: start GameScene after a click
      this.input.once('pointerdown', () => {
        this.scene.start('GameScene');
      });
    }
  }
  
  window.MainMenuScene = MainMenuScene;
  