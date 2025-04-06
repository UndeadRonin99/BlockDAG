class NonceFinderScene extends Phaser.Scene {
    constructor() {
      super('NonceFinderScene');
    }
  
    preload() {
      // Example assets (change names/paths as needed)
      this.load.image('nonceBg', 'assets/images/nonceBg.png');       // background
      this.load.image('nonceBtn', 'assets/images/nonceButton.png'); // click button
    }
  
    create() {
      const { width, height } = this.cameras.main;
  
      // --- Background ---
      const bg = this.add.image(width / 2, height / 2, 'nonceBg');
      bg.setDisplaySize(width, height); // stretch to fill screen (optional)
  
      // --- Title / Instructions ---
      this.titleText = this.add.text(width / 2, 50, 'Nonce Finder', {
        fontSize: '32px',
        color: '#ffffff',
      }).setOrigin(0.5);
  
      this.instructionText = this.add.text(width / 2, 120, 'Click to find a valid nonce!', {
        fontSize: '24px',
        color: '#00ff00',
      }).setOrigin(0.5);
  
      // --- Button to click for nonce ---
      // Position it near center. You could also use a text button instead.
      this.clickButton = this.add.image(width / 2, height / 2, 'nonceBtn')
        .setOrigin(0.5)
        .setInteractive();
  
      this.clickButton.on('pointerdown', () => {
        this.checkNonce();
      });
  
      // --- Result text (will show success/fail messages) ---
      this.resultText = this.add.text(width / 2, height / 2 + 80, '', {
        fontSize: '20px',
        color: '#ffffff',
      }).setOrigin(0.5);
  
      // --- Back to Menu ---
      this.backText = this.add.text(width / 2, height - 50, 'Back to Menu', {
        fontSize: '22px',
        color: '#ffffff',
        backgroundColor: '#000000',
        padding: { x: 10, y: 5 },
      })
      .setOrigin(0.5)
      .setInteractive();
  
      this.backText.on('pointerdown', () => {
        this.scene.start('MainMenuScene');
      });
  
      // Threshold can define how easy it is to win
      this.threshold = 2000; // e.g. any nonce < 2000 out of 10000 is a win (~20% chance)
      // Tweak to make it easier/harder
    }
  
    checkNonce() {
      const nonce = Phaser.Math.Between(0, 10000);
      if (nonce < this.threshold) {
        this.resultText.setText(`Valid nonce found! (${nonce})\nYou Win!`);
        // Optional: you could disable the button or award coins here
      } else {
        this.resultText.setText(`Invalid nonce: ${nonce}\nTry again!`);
      }
    }
  }
  
  window.NonceFinderScene = NonceFinderScene;
  