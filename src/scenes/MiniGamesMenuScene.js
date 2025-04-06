class MiniGamesMenuScene extends Phaser.Scene {
    constructor() {
      super('MiniGamesMenuScene');
    }
  
    create() {
      const { width, height } = this.cameras.main;
      this.add.text(width / 2, height / 4, 'Select a Mini Game:', {
        fontSize: '32px',
        color: '#ffffff'
      }).setOrigin(0.5);
  
      // 1) Packet Dodger
      const packetDodgerText = this.add.text(width / 2, height / 2 - 50, 'Packet Dodger', {
        fontSize: '24px',
        color: '#00ff00'
      }).setOrigin(0.5).setInteractive();
  
      packetDodgerText.on('pointerdown', () => {
        // Reset score/time if needed
        this.registry.set('score', 0);
        this.registry.set('time', 0);
        this.scene.start('PacketDodgerScene');
      });
  
      // 2) Bit Flipper
      const bitFlipperText = this.add.text(width / 2, height / 2, 'Bit Flipper', {
        fontSize: '24px',
        color: '#00ff00'
      }).setOrigin(0.5).setInteractive();
  
      bitFlipperText.on('pointerdown', () => {
        this.registry.set('score', 0);
        this.registry.set('time', 0);
        this.scene.start('BitFlipperScene');
      });
  
      // 3) Hacker Attack
      const hackerAttackText = this.add.text(width / 2, height / 2 + 50, 'Hacker Attack', {
        fontSize: '24px',
        color: '#00ff00'
      }).setOrigin(0.5).setInteractive();
  
      hackerAttackText.on('pointerdown', () => {
        this.registry.set('score', 0);
        this.registry.set('time', 0);
        this.scene.start('HackerAttackScene');
      });
    }
  }
  
  window.MiniGamesMenuScene = MiniGamesMenuScene;