class MainMenuScene extends Phaser.Scene {
    constructor() {
      super('MainMenuScene');
    }
  
    preload() {
      // 1) Load the music and images
      this.load.audio('menuMusic', 'assets/audio/road-runner-77-tonebox-main-version-37011-05-00.mp3');
      this.load.image('logoBox', 'assets/images/StartLogo.jpg');  // your logo image
      this.load.image('startButton', 'assets/images/StartButton.png');
    }
  
    create() {
      const { width, height } = this.cameras.main;
  
      // 2) Optional: resume audio context and play music
      this.sound.context.resume().then(() => {
        this.menuMusic = this.sound.add('menuMusic', { loop: true, volume: 0.8 });
        this.menuMusic.play();
      });
  
      // 3) Title text (positioned near the top)
      this.add.text(width / 2, height / 2 - 150, 'Main Menu', {
        fontSize: '28px',
        color: '#00ff00',
      }).setOrigin(0.5);
  
      // 4) Add your "box" logo at the center (or wherever you want)
      //    You can optionally scale it if it’s too large or too small:
      const logo = this.add.image(width / 2, height / 2 - 20, 'logoBox')
        .setOrigin(0.5);
      // logo.setDisplaySize(200, 200); // Uncomment if you want a fixed size
      // OR logo.setScale(0.5);        // If you prefer scaling by percentage
  
      // 5) Add a sprite-based Start button below the logo
      const startButtonSprite = this.add.image(width / 2, height / 2 + 150, 'startButton')
      .setOrigin(0.5)
      .setInteractive();

      this.input.once('pointerdown', () => {
        this.scene.start('MiniGamesMenuScene');
      });
  
  
      // 6) On click/tap, stop music (if desired) and switch scenes
      startButtonSprite.on('pointerdown', () => {
        if (this.menuMusic) {
          this.menuMusic.stop();
        }
        this.scene.start('GameScene');
      });
    }
  }
  
  window.MainMenuScene = MainMenuScene;
  