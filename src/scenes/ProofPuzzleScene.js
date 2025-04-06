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
  
      // 1) Initialize registry
      this.registry.set('score', 0);   // track guess attempts
      this.registry.set('time', 30);   // 30-second limit
  
      // 2) Background
      const bg = this.add.image(width / 2, height / 2, 'puzzleBg');
      bg.setDisplaySize(width, height);
  
      // 3) Title
      this.add.text(width / 2, 30, 'Proof Puzzle', {
        fontSize: '28px',
        color: '#ffffff',
      }).setOrigin(0.5);
  
      // 4) Generate puzzle
      this.numA = Phaser.Math.Between(1, 15);
      this.numB = Phaser.Math.Between(1, 15);
      this.solution = this.numA + this.numB; // keep it simple: addition
  
      // 5) Display puzzle text
      this.add.text(width / 2, 80, `What is ${this.numA} + ${this.numB}?`, {
        fontSize: '24px',
        color: '#00ff00',
      }).setOrigin(0.5);
  
      // 6) Player guess
      this.playerGuess = 0;
      this.guessText = this.add.text(width / 2, height / 2, `Guess: 0`, {
        fontSize: '28px',
        color: '#ffffff',
      }).setOrigin(0.5);
  
      // Up Arrow
      this.upArrow = this.add.image(width / 2 + 100, height / 2, 'arrowUp')
        .setOrigin(0.5)
        .setInteractive()
        .on('pointerdown', () => {
          this.updateScore(1);  // +1 guess attempt each arrow press?
          this.playerGuess++;
          if (this.playerGuess > 99) this.playerGuess = 99;
          this.updateGuessText();
        });
  
      // Down Arrow
      this.downArrow = this.add.image(width / 2 - 100, height / 2, 'arrowDown')
        .setOrigin(0.5)
        .setInteractive()
        .on('pointerdown', () => {
          this.updateScore(1);
          this.playerGuess--;
          if (this.playerGuess < 0) this.playerGuess = 0;
          this.updateGuessText();
        });
  
      // Check Button
      this.checkButton = this.add.image(width / 2, height / 2 + 80, 'checkBtn')
        .setOrigin(0.5)
        .setInteractive()
        .on('pointerdown', () => {
          this.updateScore(1);  // +1 attempt for each check?
          this.checkAnswer();
        });
  
      // 7) Result text
      this.resultText = this.add.text(width / 2, height / 2 + 140, '', {
        fontSize: '22px',
        color: '#ffffff',
      }).setOrigin(0.5);
  
      // 8) Back to Menu
      this.backText = this.add.text(width / 2, height - 30, 'Back to Menu', {
        fontSize: '20px',
        color: '#ffffff',
        backgroundColor: '#000000',
        padding: { x: 8, y: 4 },
      })
      .setOrigin(0.5)
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.start('MiniGamesMenuScene');
      });
  
      // 9) Score and Time display
      this.flipsText = this.add.text(10, 10, 'Attempts: 0', {
        fontSize: '18px',
        color: '#ffffff'
      });
      this.timerText = this.add.text(10, 30, 'Time: 30', {
        fontSize: '18px',
        color: '#ffffff'
      });
  
      this.gameWon = false;
    }
  
    updateGuessText() {
      this.guessText.setText(`Guess: ${this.playerGuess}`);
    }
  
    updateScore(amount) {
      // Increase attempt count
      let score = this.registry.get('score');
      score += amount;
      this.registry.set('score', score);
      this.flipsText.setText('Attempts: ' + score);
    }
  
    checkAnswer() {
      if (this.gameWon) return;
  
      if (this.playerGuess === this.solution) {
        this.resultText.setText('Correct! You Win!');
        this.gameWon = true;
        this.time.delayedCall(500, () => {
          this.scene.start('WinScene');
        });
      } else {
        this.resultText.setText('Wrong! Try again!');
      }
    }
  
    update(_, delta) {
      if (this.gameWon) return;
  
      // Decrement time
      let currentTime = this.registry.get('time');
      currentTime -= (delta / 1000);
      this.registry.set('time', currentTime);
      this.timerText.setText('Time: ' + currentTime.toFixed(1));
  
      if (currentTime <= 0) {
        this.scene.start('LoseScene');
      }
    }
  }
  
  window.ProofPuzzleScene = ProofPuzzleScene;
  