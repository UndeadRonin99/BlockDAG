class LoseScene extends Phaser.Scene {
    constructor() {
      super('LoseScene');
    }
  
    create() {
      const { width, height } = this.cameras.main;
      const finalScore = this.registry.get('score');
      const finalTime = this.registry.get('time');
  
      this.add.text(width / 2, height / 2 - 50, 'YOU LOSE!', {
        fontSize: '32px',
        color: '#ff0000'
      }).setOrigin(0.5);
  
      this.add.text(width / 2, height / 2, `Score: ${finalScore}\nTime: ${finalTime}`, {
        fontSize: '24px',
        color: '#ffffff',
        align: 'center'
      }).setOrigin(0.5);
  
      this.add.text(width / 2, height / 2 + 100, 'Click to return to Menu', {
        fontSize: '18px',
        color: '#ffff00'
      }).setOrigin(0.5);
  
      this.input.once('pointerdown', () => {
        this.scene.start('MiniGamesMenuScene');
      });
    }
  }
  
  window.LoseScene = LoseScene;