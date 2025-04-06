class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene'); // This name is used when starting or switching scenes
  }

  preload() {
    // Grab the dimensions of the game viewport
    const { width, height } = this.cameras.main;

    // 1) Create a background rectangle for the progress bar
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(width / 4 - 10, height / 2 - 20, width / 2 + 20, 50);

    // 2) Create the progress bar graphic
    const progressBar = this.add.graphics();

    // 3) Loading text
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    });
    loadingText.setOrigin(0.5, 0.5);

    // 4) Update the progress bar as files load
    this.load.on('progress', (value) => {
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(width / 4, height / 2 - 10, (width / 2) * value, 30);
    });

    // 5) Cleanup once complete
    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
    });

    // 6) Load your actual assets here
    // Example assets:
    //this.load.image('logo', 'assets/logo.png');
    this.load.audio('bgMusic', 'assets\audio\road-runner-77-tonebox-main-version-37011-05-00.mp3');
    //this.load.spritesheet('player', 'assets/player.png', { frameWidth: 32, frameHeight: 48 });

    // Add more loads as needed (images, atlases, sounds, JSON, etc.)
  }

  create() {
    // Move on to the next scene (e.g., main menu) once loading is done
    this.scene.start('MainMenuScene');
  }
}
