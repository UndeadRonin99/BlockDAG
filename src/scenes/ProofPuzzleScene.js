class ProofPuzzleScene extends Phaser.Scene {
    constructor() {
      super('ProofPuzzleScene');
    }
  
    preload() {
      // Example assets
      this.load.image('puzzleBg', 'assets/images/puzzleBg.png');  // background
      this.load.image('arrowUp', 'assets/images/arrowUp.png');    // increment guess
      this.load.image('arrowDown', 'assets/images/arrowDown.png');// decrement guess
      this.load.image('checkBtn', 'assets/images/checkBtn.png');  // check answer
    }
  
    create() {
      const { width, height } = this.cameras.main;
  
      // --- Background ---
      const bg = this.add.image(width / 2, height / 2, 'puzzleBg');
      bg.setDisplaySize(width, height);
  
      // --- Title / Instructions ---
      this.add.text(width / 2, 50, 'Proof Puzzle', {
        fontSize: '32px',
        color: '#ffffff',
      }).setOrigin(0.5);
  
      // Generate random puzzle
      this.numA = Phaser.Math.Between(1, 15);
      this.numB = Phaser.Math.Between(1, 15);
      this.solution = this.numA + this.numB; // keep it simple: addition
  
      // Display puzzle text
      this.add.text(width / 2, 120, `What is ${this.numA} + ${this.numB}?`, {
        fontSize: '24px',
        color: '#00ff00',
      }).setOrigin(0.5);
  
      // We'll hold the player's guess in a variable
      this.playerGuess = 0;
  
      // Show the guess on screen
      this.guessText = this.add.text(width / 2, height / 2, `Guess: 0`, {
        fontSize: '28px',
        color: '#ffffff',
      }).setOrigin(0.5);
  
      // --- Up Arrow (increase guess) ---
      this.upArrow = this.add.image(width / 2 + 100, height / 2, 'arrowUp')
        .setOrigin(0.5)
        .setInteractive();
  
      this.upArrow.on('pointerdown', () => {
        this.playerGuess++;
        if (this.playerGuess > 99) this.playerGuess = 99; // some cap
        this.updateGuessText();
      });
  
      // --- Down Arrow (decrease guess) ---
      this.downArrow = this.add.image(width / 2 - 100, height / 2, 'arrowDown')
        .setOrigin(0.5)
        .setInteractive();
  
      this.downArrow.on('pointerdown', () => {
        this.playerGuess--;
        if (this.playerGuess < 0) this.playerGuess = 0; // don’t go negative
        this.updateGuessText();
      });
  
      // --- Check Button ---
      this.checkButton = this.add.image(width / 2, height / 2 + 100, 'checkBtn')
        .setOrigin(0.5)
        .setInteractive();
  
      this.checkButton.on('pointerdown', () => {
        this.checkAnswer();
      });
  
      // --- Result Text ---
      this.resultText = this.add.text(width / 2, height / 2 + 180, '', {
        fontSize: '22px',
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
    }
  
    updateGuessText() {
      this.guessText.setText(`Guess: ${this.playerGuess}`);
    }
  
    checkAnswer() {
      if (this.playerGuess === this.solution) {
        this.resultText.setText('Correct! You Win!');
        // Optionally disable buttons or show a "Go Next" button
      } else {
        this.resultText.setText(`Wrong! Try again.`);
      }
    }
  }
  
  window.ProofPuzzleScene = ProofPuzzleScene;
  