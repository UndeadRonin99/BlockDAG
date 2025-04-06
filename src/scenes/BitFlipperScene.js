class BitFlipperScene extends Phaser.Scene {
    constructor() {
      super('BitFlipperScene');
    }
  
    create() {
      // We'll store a time and a "moves" or "flips" count as the "score"
      this.registry.set('score', 0);
      this.registry.set('time', 30);  // 30-second limit
  
      this.gridSize = 5;
      this.tileSize = 64;
      this.grid = [];
      this.targetPattern = [
        [1, 0, 1, 0, 1],
        [0, 1, 0, 1, 0],
        [1, 0, 1, 0, 1],
        [0, 1, 0, 1, 0],
        [1, 0, 1, 0, 1],
      ];
  
      const offsetX = this.scale.width / 2 - (this.gridSize * this.tileSize) / 2;
      const offsetY = this.scale.height / 2 - (this.gridSize * this.tileSize) / 2;
  
      this.tiles = this.add.group();
  
      for (let y = 0; y < this.gridSize; y++) {
        this.grid[y] = [];
        for (let x = 0; x < this.gridSize; x++) {
          const value = Phaser.Math.Between(0, 1);
  
          const tile = this.add.text(
            offsetX + x * this.tileSize + this.tileSize / 2, 
            offsetY + y * this.tileSize + this.tileSize / 2,
            value,
            {
              fontSize: '48px',
              backgroundColor: '#222',
              color: '#fff',
              padding: 10,
            }
          ).setOrigin(0.5).setInteractive();
  
          tile.value = value;
          tile.gridX = x;
          tile.gridY = y;
  
          tile.on('pointerdown', () => this.flipTile(tile));
  
          this.tiles.add(tile);
          this.grid[y][x] = tile;
        }
      }
  
      this.add.text(10, 10, 'Bit Flipper (Match 1/0 Pattern)', { 
        fontSize: '18px', 
        color: '#ffffff' 
      });
  
      this.checkWinText = this.add.text(10, 40, '', { 
        fontSize: '18px', 
        color: '#00ff00' 
      });
  
      // Display time & flips
      this.timerText = this.add.text(10, 60, 'Time Left: 30', { 
        fontSize: '18px', 
        color: '#ffffff'
      });
      this.flipsText = this.add.text(10, 80, 'Flips: 0', {
        fontSize: '18px',
        color: '#ffffff'
      });
    }
  
    flipTile(tile) {
      let flips = this.registry.get('score');
      flips++;
      this.registry.set('score', flips);
      this.flipsText.setText('Flips: ' + flips);
  
      tile.value = 1 - tile.value;
      tile.setText(tile.value);
  
      // Check if matched pattern
      this.checkWin();
    }
  
    checkWin() {
      let won = true;
      for (let y = 0; y < this.gridSize; y++) {
        for (let x = 0; x < this.gridSize; x++) {
          if (this.grid[y][x].value !== this.targetPattern[y][x]) {
            won = false;
            break;
          }
        }
        if (!won) break;
      }
      if (won) {
        this.scene.start('WinScene');
      }
    }
  
    update(time, delta) {
      // Decrement time
      let currentTime = this.registry.get('time');
      currentTime -= (delta / 1000);
      this.registry.set('time', currentTime);
  
      // Update text
      this.timerText.setText('Time Left: ' + currentTime.toFixed(1));
  
      // If time runs out => Lose
      if (currentTime <= 0) {
        this.scene.start('LoseScene');
      }
    }
  }
  
  window.BitFlipperScene = BitFlipperScene;