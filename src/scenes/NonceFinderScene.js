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
  
      // 1) Initialize registry values
      // Let's say we give 20 seconds, and track "clicks" as 'score'
      this.registry.set('score', 0);
      this.registry.set('time', 20);
  
      // 2) Background
      const bg = this.add.image(width / 2, height / 2, 'nonceBg');
      bg.setDisplaySize(width, height); // stretch to fill screen (optional)
  
      // 3) Title
      this.add.text(width / 2, 30, 'Nonce Finder', {
        fontSize: '28px',
        color: '#ffffff',
      }).setOrigin(0.5);
  
      // 4) Instructions
      this.instructionText = this.add.text(width / 2, 80, 'Click to find a valid nonce!', {
        fontSize: '20px',
        color: '#00ff00',
      }).setOrigin(0.5);
  
      // 5) Button to click for nonce
      this.clickButton = this.add.image(width / 2, height / 2, 'nonceBtn')
        .setOrigin(0.5)
        .setInteractive();
  
      this.clickButton.on('pointerdown', () => {
        this.flipNonce();
      });
  
      // 6) Show "result" text if user gets it right
      this.resultText = this.add.text(width / 2, height / 2 + 70, '', {
        fontSize: '20px',
        color: '#ffffff',
      }).setOrigin(0.5);
  
      // 7) Back to Menu
      this.backText = this.add.text(width / 2, height - 30, 'Back to Menu', {
        fontSize: '20px',
        color: '#ffffff',
        backgroundColor: '#000000',
        padding: { x: 8, y: 4 },
      })
      .setOrigin(0.5)
      .setInteractive();
  
      this.backText.on('pointerdown', () => {
        this.scene.start('MiniGamesMenuScene');
      });
  
      // 8) Display "score" and "time" texts
      this.scoreText = this.add.text(10, 10, 'Clicks: 0', {
        fontSize: '18px',
        color: '#ffffff'
      });
      this.timerText = this.add.text(10, 30, 'Time: 20', {
        fontSize: '18px',
        color: '#ffffff'
      });
  
      // Probability threshold: ~1 in 5 chance each click
      this.threshold = 2000; // e.g. any nonce < 2000 out of 10000 => win
      this.gameWon = false;  // track if user already won
    }
  
    flipNonce() {
      if (this.gameWon) return; // if they've won, ignore further clicks
  
      // Increment "score" (click count)
      let currentScore = this.registry.get('score');
      currentScore++;
      this.registry.set('score', currentScore);
      this.scoreText.setText('Clicks: ' + currentScore);
  
      // Generate a random nonce
      const nonce = Phaser.Math.Between(0, 10000);
      if (nonce < this.threshold) {
        this.resultText.setText(`Valid nonce found (${nonce})!`);
        this.gameWon = true;
  
        // Delay a bit so player can see the message, then go to WinScene
        this.time.delayedCall(500, () => {
          this.scene.start('WinScene');
        });
      } else {
        this.resultText.setText(`Invalid nonce: ${nonce}\nTry again!`);
      }
    }
  
    update(time, delta) {
      if (this.gameWon) return; // don't check time if they already won
  
      // Decrement time
      let currentTime = this.registry.get('time');
      currentTime -= (delta / 1000);
      this.registry.set('time', currentTime);
      this.timerText.setText('Time: ' + currentTime.toFixed(1));
  
      // If time runs out => lose
      if (currentTime <= 0) {
        this.scene.start('LoseScene');
      }
    }
  }
  
  window.NonceFinderScene = NonceFinderScene;
  