class PacketDodgerScene extends Phaser.Scene {
  constructor() {
    super('PacketDodgerScene');
  }

  preload() {
    this.load.image('PDBackground', 'assets/images/PDBackground.jpg');
    this.load.image('PDCharacter',  'assets/images/PDCharacter.jpg');
    this.load.image('PDEnemy',      'assets/images/PDEnemy.jpg');
  }

  create() {
    const { width, height } = this.cameras.main;

    // 1) Add background (loaded from BootScene)
    this.add.image(width / 2, height / 2, 'PDBackground')
      .setDisplaySize(width, height);

    // 2) Init score/time
    this.registry.set('score', 0);
    this.registry.set('time', 0);

    // 3) Player
    this.player = this.physics.add.sprite(width / 2, height - 50, 'PDCharacter')
      .setCollideWorldBounds(true);

    // 4) Group for falling enemies
    this.packets = this.physics.add.group();

    // 5) Timer that spawns a new enemy every 800ms
    this.packetTimer = this.time.addEvent({
      delay: 800,
      callback: this.spawnPacket,
      callbackScope: this,
      loop: true
    });

    // 6) Movement input
    this.cursors = this.input.keyboard.createCursorKeys();

    // 7) Overlap => lose
    this.physics.add.overlap(this.player, this.packets, this.handleLose, null, this);

    // 8) UI
    this.scoreText = this.add.text(10, 10, 'Score: 0', {
      fontSize: '18px', color: '#ffffff'
    });
    this.timerText = this.add.text(10, 30, 'Time: 0', {
      fontSize: '18px', color: '#ffffff'
    });

    // Survive 20s to win
    this.winConditionTime = 20;
  }

  spawnPacket() {
    const x = Phaser.Math.Between(0, this.scale.width);
    const packet = this.packets.create(x, 0, 'PDEnemy');
    packet.setVelocityY(200);
    packet.setCollideWorldBounds(false);

    // Increase score each time a new packet spawns
    let currentScore = this.registry.get('score');
    this.registry.set('score', currentScore + 1);
  }

  update(_, delta) {
    // Movement
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-200);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(200);
    } else {
      this.player.setVelocityX(0);
    }

    // Timer
    let currentTime = this.registry.get('time');
    currentTime += (delta / 1000);
    this.registry.set('time', currentTime);

    // Update UI
    this.scoreText.setText('Score: ' + this.registry.get('score'));
    this.timerText.setText('Time: ' + currentTime.toFixed(1));

    // Win if we survive 20s
    if (currentTime >= this.winConditionTime) {
      this.scene.start('WinScene');
    }
  }

  handleLose() {
    this.scene.start('LoseScene');
  }
}

window.PacketDodgerScene = PacketDodgerScene;
