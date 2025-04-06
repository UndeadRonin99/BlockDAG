class MainMenuScene extends Phaser.Scene {
    constructor() {
      super('MainMenuScene');
    }
  
    preload() {
      // Load music or any assets needed for the main menu
      this.load.audio('menuMusic', 'assets/audio/road-runner-77-tonebox-main-version-37011-05-00.mp3');
      this.load.image('menuBackground', 'assets/images/StartLogo.jpg'); // Example background image
      this.load.image('startButton', 'assets/images/start-button.png'); // Example button image
    }
  
    create() {
      const { width, height } = this.cameras.main;
  
      // Play music (with user gesture handling)
      // If you want to let it start immediately when the user enters the scene,
      // you likely still need a click event to resume audio context.
      this.sound.context.resume().then(() => {
        this.menuMusic = this.sound.add('menuMusic', { loop: true, volume: 0.8 });
        this.menuMusic.play();
      });
  
      // 1) Main menu text
      const menuText = this.add.text(width / 2, height / 2, 'Main Menu', {
        fontSize: '28px',
        color: '#00ff00',
      }).setOrigin(0.5);
  
      // 2) Start Game Button (Text-based)
      const StartButton = this.add.text(width / 2, height / 2 + 100, 'Start Game', {
        fontSize: '24px',
        color: '#ffffff',
        backgroundColor: '#000000', // optional for better visibility
        padding: { x: 10, y: 5 },
      }).setOrigin(0.5);
  
      // Make the text object interactive (so it can detect clicks/taps)
      startButton.setInteractive();
  
      // Handle pointerdown (click/tap) to start the game
      startButton.on('pointerdown', () => {
        // Stop or fade out the menu music if you prefer
        if (this.menuMusic) {
          this.menuMusic.stop();
        }
        // Transition to the GameScene
        this.scene.start('GameScene');
      });
    }
  }
  
  window.MainMenuScene = MainMenuScene;
  