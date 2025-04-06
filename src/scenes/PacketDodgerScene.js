class PacketDodgerScene extends Phaser.Scene {
    constructor() {
      super('PacketDodgerScene');
    }
  
    preload() {
      this.load.image('player', 'assets/player.png'); 
      this.load.image('packet', 'assets/packet.png'); 
    }
  
    create() {
      const { width, height } = this.cameras.main;
      
      // Keep track of score in registry
      this.registry.set('score', 0);  
      
      // Track survival time in registry
      this.registry.set('time', 0);
  
      // Player
      this.player = this.physics.add.sprite(width / 2, height - 50, 'player').setCollideWorldBounds(true);
  
      // Packets group
      this.packets = this.physics.add.group();
  
      // Spawn packets on a timer
      this.packetTimer = this.time.addEvent({
        delay: 800,
        callback: this.spawnPacket,
        callbackScope: this,
        loop: true
      });
  
      // Input
      this.cursors = this.input.keyboard.createCursorKeys();
  
      // Overlap -> Lose
      this.physics.add.overlap(this.player, this.packets, this.handleLose, null, this);
  
      // UI Text
      this.scoreText = this.add.text(10, 10, 'Score: 0', {
        fontSize: '18px',
        color: '#ffffff'
      });
      this.timerText = this.add.text(10, 30, 'Time: 0', {
        fontSize: '18px',
        color: '#ffffff'
      });
  
      // Example: Win after 20 seconds
      this.winConditionTime = 20; // seconds
    }
  
    spawnPacket() {
      const x = Phaser.Math.Between(0, this.scale.width);
      const packet = this.packets.create(x, 0, 'packet');
      packet.setVelocityY(200);
      packet.setCollideWorldBounds(false);
  
      // Optional: If you want a "score" every time a new packet spawns
      let currentScore = this.registry.get('score');
      currentScore++;
      this.registry.set('score', currentScore);
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
  
      // Update timer (in seconds)
      // delta is in ms, convert to seconds
      let currentTime = this.registry.get('time');
      currentTime += (delta / 1000);
      this.registry.set('time', currentTime);
  
      // Update text
      this.scoreText.setText('Score: ' + this.registry.get('score'));
      this.timerText.setText('Time: ' + currentTime.toFixed(1));
  
      // Check win condition: survived "winConditionTime" seconds
      if (currentTime >= this.winConditionTime) {
        this.scene.start('WinScene');
      }
    }
  
    handleLose() {
      // On collision => go to Lose Scene
      this.scene.start('LoseScene');
    }
  }
  
  window.PacketDodgerScene = PacketDodgerScene;