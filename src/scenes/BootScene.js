class BootScene extends Phaser.Scene {
    constructor() {
      super('BootScene');
    }
  
    preload() {

    }
  
    create() {
      // You can do your boot screen setup or loading bar here
      const { width, height } = this.cameras.main;
      this.add.text(width / 2, height / 2, 'Boot Scene', {
        fontSize: '28px',
        color: '#ffffff',
      }).setOrigin(0.5);
  
      // Once your boot/loading logic is done, transition to the main menu
      this.scene.start('MainMenuScene');
    }
  }
  
  window.BootScene = BootScene; // If you're using script tags and global scope
  