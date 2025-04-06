class HackerAttackScene extends Phaser.Scene {
    constructor() {
      super('HackerAttackScene');
    }
  
    preload() {
      this.load.image('player', 'assets/player.png');
      this.load.image('bullet', 'assets/bullet.png');
      this.load.image('malware', 'assets/packet.png'); 
    }
  
    create() {
      const { width, height } = this.cameras.main;
  
      this.registry.set('score', 0);
      this.registry.set('lives', 3);
      this.registry.set('time', 0); // Could track how long you survive or how quickly you reach the target
  
      // Player
      this.player = this.physics.add.sprite(width / 2, height - 50, 'player').setCollideWorldBounds(true);
  
      // Groups
      this.bullets = this.physics.add.group();
      this.malware = this.physics.add.group();
  
      // Controls
      this.cursors = this.input.keyboard.createCursorKeys();
      this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  
      // Timed malware spawn
      this.time.addEvent({
        delay: 800,
        callback: this.spawnMalware,
        callbackScope: this,
        loop: true
      });
  
      // Overlaps
      this.physics.add.overlap(this.bullets, this.malware, this.destroyMalware, null, this);
      this.physics.add.overlap(this.player, this.malware, this.playerHit, null, this);
  
      // UI
      this.scoreText = this.add.text(10, 10, 'Score: 0', {
        fontSize: '18px',
        color: '#ffffff'
      });
      this.livesText = this.add.text(10, 30, 'Lives: 3', {
        fontSize: '18px',
        color: '#ffffff'
      });
      this.timerText = this.add.text(10, 50, 'Time: 0', {
        fontSize: '18px',
        color: '#ffffff'
      });
  
      // Example win condition: Score 10
      this.winScore = 10;
    }
  
    spawnMalware() {
      const x = Phaser.Math.Between(50, this.scale.width - 50);
      const enemy = this.malware.create(x, 0, 'malware');
      enemy.setVelocityY(120);
    }
  
    update(time, delta) {
      // Movement
      if (this.cursors.left.isDown) {
        this.player.setVelocityX(-200);
      } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(200);
      } else {
        this.player.setVelocityX(0);
      }
  
      // Shoot
      if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
        const bullet = this.bullets.create(this.player.x, this.player.y - 20, 'bullet');
        bullet.setVelocityY(-300);
      }
  
      // Update time
      let currentTime = this.registry.get('time');
      currentTime += delta / 1000;
      this.registry.set('time', currentTime);
      this.timerText.setText('Time: ' + currentTime.toFixed(1));
  
      // Check for win condition
      const currentScore = this.registry.get('score');
      if (currentScore >= this.winScore) {
        this.scene.start('WinScene');
      }
    }
  
    destroyMalware(bullet, malware) {
      bullet.destroy();
      malware.destroy();
  
      let currentScore = this.registry.get('score');
      currentScore++;
      this.registry.set('score', currentScore);
  
      this.scoreText.setText('Score: ' + currentScore);
    }
  
    playerHit(player, malware) {
      // Remove malware
      malware.destroy();
  
      // Decrement lives
      let lives = this.registry.get('lives');
      lives--;
      this.registry.set('lives', lives);
      this.livesText.setText('Lives: ' + lives);
  
      if (lives <= 0) {
        this.scene.start('LoseScene');
      }
    }
  }
  
  window.HackerAttackScene = HackerAttackScene;