class NetworkSimulatorScene extends Phaser.Scene {
    constructor() {
      super('NetworkSimulatorScene');
    }
  
    preload() {
      // Example assets
      this.load.image('networkBg', 'assets/images/networkBg.png');    // background
      this.load.image('nodeSprite', 'assets/images/node.png');        // node graphic
      this.load.image('checkBtn', 'assets/images/checkBtn.png');      // check positions
    }
  
    create() {
      const { width, height } = this.cameras.main;
  
      // --- Background ---
      const bg = this.add.image(width / 2, height / 2, 'networkBg');
      bg.setDisplaySize(width, height);
  
      // --- Title ---
      this.add.text(width / 2, 50, 'Network Simulator', {
        fontSize: '32px',
        color: '#ffffff',
      }).setOrigin(0.5);
  
      // Define correct positions for each node (3 node example)
      // You could expand this to more nodes if you like
      this.correctPositions = [
        { x: width / 2 - 200, y: height / 2 },   // left
        { x: width / 2,       y: height / 2 - 100 }, // top
        { x: width / 2 + 200, y: height / 2 },   // right
      ];
  
      // Create nodes in random positions
      this.nodes = [];
      for (let i = 0; i < this.correctPositions.length; i++) {
        const randX = Phaser.Math.Between(50, width - 50);
        const randY = Phaser.Math.Between(100, height - 100);
  
        const node = this.add.image(randX, randY, 'nodeSprite')
          .setInteractive({ draggable: true })
          .setOrigin(0.5);
  
        // Store an index so we know which node is which
        node.nodeIndex = i;
        this.nodes.push(node);
      }
  
      // Enable dragging
      this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
        gameObject.x = dragX;
        gameObject.y = dragY;
      });
  
      // --- Check Button ---
      this.checkButton = this.add.image(width / 2, height - 100, 'checkBtn')
        .setOrigin(0.5)
        .setInteractive();
  
      this.checkButton.on('pointerdown', () => {
        this.checkNetworkPositions();
      });
  
      // --- Result Text ---
      this.resultText = this.add.text(width / 2, height - 50, '', {
        fontSize: '22px',
        color: '#ffffff',
      }).setOrigin(0.5);
  
      // --- Back to Menu (optionally, if you want a separate button) ---
      // Or you can use the same check button to return if success
      const backText = this.add.text(100, 50, 'Back to Menu', {
        fontSize: '18px',
        color: '#ffffff',
        backgroundColor: '#000000',
        padding: { x: 8, y: 4 },
      })
      .setOrigin(0.5)
      .setInteractive();
  
      backText.on('pointerdown', () => {
        this.scene.start('MainMenuScene');
      });
    }
  
    checkNetworkPositions() {
      // This function checks if each node is near its correct position
      let allCorrect = true;
      const threshold = 50; // how close in pixels
  
      for (let i = 0; i < this.nodes.length; i++) {
        const node = this.nodes[i];
        const correctPos = this.correctPositions[node.nodeIndex];
  
        // Calculate distance
        const dist = Phaser.Math.Distance.Between(node.x, node.y, correctPos.x, correctPos.y);
        if (dist > threshold) {
          allCorrect = false;
          break;
        }
      }
  
      if (allCorrect) {
        this.resultText.setText('Network Validated! You Win!');
        // Optionally disable further dragging or show next steps
      } else {
        this.resultText.setText('Network incorrect. Keep adjusting!');
      }
    }
  }
  
  window.NetworkSimulatorScene = NetworkSimulatorScene;
  