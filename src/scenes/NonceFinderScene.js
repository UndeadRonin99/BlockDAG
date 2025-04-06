class NonceFinderScene extends Phaser.Scene {
  constructor() {
    super('NonceFinderScene');
  }

  preload() {
    // Example assets (change names/paths as needed)
    this.load.image('nonceBg',  'assets/images/nonceBg.png');  // background
    this.load.image('nonceBtn', 'assets/images/Check.jpg');    // click button
  }

  create() {
    const { width, height } = this.cameras.main;

    // Optional: set a background color behind the background image
    // this.cameras.main.setBackgroundColor('#000000');

    // 1) Initialize registry values
    this.registry.set('score', 0); // We'll count "clicks" as 'score'
    this.registry.set('time', 20); // 20-second time limit

    // 2) Background image (stretched to fill the screen)
    const bg = this.add.image(width / 2, height / 2, 'nonceBg')
      .setDisplaySize(width, height);

    // 3) Title at top
    this.add.text(width / 2, 40, 'Nonce Finder', {
      fontSize: '28px',
      color: '#ffffff',
    }).setOrigin(0.5);

    // 4) Instructions a bit below the title
    this.instructionText = this.add.text(width / 2, 80, 'Click to find a valid nonce!', {
      fontSize: '20px',
      color: '#00ff00',
    }).setOrigin(0.5);

    // 5) Button to click for nonce (center of screen)
    this.clickButton = this.add.image(width / 2, height / 2, 'nonceBtn')
      .setOrigin(0.5)
      .setInteractive();

    this.clickButton.on('pointerdown', () => {
      this.flipNonce();
    });

    // 6) Result text: shows after each click attempt
    this.resultText = this.add.text(width / 2, height / 2 + 70, '', {
      fontSize: '20px',
      color: '#ffffff',
    }).setOrigin(0.5);

    // 7) "Back to Menu" button at bottom
    this.backText = this.add.text(width / 2, height - 40, 'Back to Menu', {
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

    // 8) Display "score" (clicks) and "time" at the top-left
    this.scoreText = this.add.text(10, 10, 'Clicks: 0', {
      fontSize: '18px',
      color: '#ffffff'
    });
    this.timerText = this.add.text(10, 30, 'Time: 20', {
      fontSize: '18px',
      color: '#ffffff'
    });

    // Probability threshold for success:
    // e.g. any nonce < 2000 out of 10000 => win ( ~1 in 5 chance )
    this.threshold = 2000;
    this.gameWon = false; // track if user already won
  }

  flipNonce() {
    // If already won, ignore further clicks
    if (this.gameWon) return;

    // Increment "score" (click count)
    let currentScore = this.registry.get('score');
    currentScore++;
    this.registry.set('score', currentScore);
    this.scoreText.setText('Clicks: ' + currentScore);

    // Generate a random nonce
    const nonce = Phaser.Math.Between(0, 10000);

    if (nonce < this.threshold) {
      // We found a valid nonce
      this.resultText.setText(`Valid nonce found (${nonce})!`);
      this.gameWon = true;

      // Delay so the player can see the message, then go to WinScene
      this.time.delayedCall(500, () => {
        this.scene.start('WinScene');
      });
    } else {
      // Invalid nonce => try again
      this.resultText.setText(`Invalid nonce: ${nonce}\nTry again!`);
    }
  }

  update(time, delta) {
    // If already won, do nothing else
    if (this.gameWon) return;

    // Decrement timer
    let currentTime = this.registry.get('time');
    currentTime -= (delta / 1000);
    this.registry.set('time', currentTime);

    // Update timer text
    this.timerText.setText('Time: ' + currentTime.toFixed(1));

    // If time runs out => lose
    if (currentTime <= 0) {
      this.scene.start('LoseScene');
    }
  }
}

window.NonceFinderScene = NonceFinderScene;
