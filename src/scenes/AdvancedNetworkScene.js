class AdvancedNetworkScene extends Phaser.Scene {
    constructor() {
      super('AdvancedNetworkScene'); // rename from NetworkSimulatorScene
    }
  
    preload() {
      // Example assets
      this.load.image('networkBg', 'assets/images/networkBg.png');    
      this.load.image('nodeSprite', 'assets/images/node.png');        
      this.load.image('checkBtn', 'assets/images/checkBtn.png');      
    }
  
    create() {
      const { width, height } = this.cameras.main;
  
      // 1) Initialize registry: time & score
      this.registry.set('time', 10); // 10 seconds
      this.registry.set('score', 0);
  
      // 2) Background
      const bg = this.add.image(width / 2, height / 2, 'networkBg');
      bg.setDisplaySize(width, height);
  
      // 3) Title
      this.add.text(width / 2, 20, 'Network Overload (Hard)', {
        fontSize: '28px',
        color: '#ffffff',
      }).setOrigin(0.5);
  
      // Instruction text
      // "Form a ring in alphabetical order: A->B->C->D->E->A"
      this.add.text(width / 2, 60, 'Connect nodes A->B->C->D->E->A.\nEach node can only have 2 edges!', {
        fontSize: '18px',
        color: '#00ff00',
        align: 'center'
      }).setOrigin(0.5);
  
      // 4) Create labeled nodes
      // We'll define 5 node labels in alphabetical order
      this.nodeLabels = ['A', 'B', 'C', 'D', 'E'];
      this.nodes = [];
  
      // Spread them out randomly with enough spacing
      for (let i = 0; i < this.nodeLabels.length; i++) {
        const label = this.nodeLabels[i];
        const randX = Phaser.Math.Between(100, width - 100);
        const randY = Phaser.Math.Between(100, height - 150);
  
        // Create node container or sprite
        const nodeSprite = this.add.container(randX, randY);
        // We'll add the node image
        const nodeImage = this.add.image(0, 0, 'nodeSprite').setDisplaySize(64, 64);
        // We'll add a text label
        const nodeText = this.add.text(0, 0, label, {
          fontSize: '20px',
          color: '#ffffff'
        }).setOrigin(0.5);
  
        nodeSprite.add([nodeImage, nodeText]);
        // Interactive area (for clicking to select)
        nodeSprite.setSize(64, 64);
        nodeSprite.setInteractive();
  
        nodeSprite.label = label;
        nodeSprite.connections = []; // track which other nodes are connected
  
        this.nodes.push(nodeSprite);
      }
  
      // 5) Connection data structure
      // We'll store pairs of {nodeA, nodeB} in an array
      this.edges = [];
  
      // 6) Handling node clicks (two-click logic for connecting)
      this.selectedNode = null;
  
      this.input.on('gameobjectdown', (pointer, gameObject) => {
        // gameObject is the container (nodeSprite)
        if (!this.selectedNode) {
          // first click
          this.selectedNode = gameObject;
          // highlight, e.g. make the node text color change
          this.highlightNode(this.selectedNode, true);
        } else {
          // second click => attempt to connect selectedNode & gameObject
          if (gameObject !== this.selectedNode) {
            this.attemptConnection(this.selectedNode, gameObject);
          }
          // un-highlight
          this.highlightNode(this.selectedNode, false);
          this.selectedNode = null;
        }
      });
  
      // 7) Validate / Check button
      this.checkButton = this.add.image(width / 2, height - 50, 'checkBtn')
        .setOrigin(0.5)
        .setInteractive()
        .on('pointerdown', () => {
          this.increaseScore(1); // each time we check
          this.validateNetwork();
        });
  
      // 8) UI for Score & Timer
      this.movesText = this.add.text(10, 10, 'Moves: 0', {
        fontSize: '16px',
        color: '#ffffff'
      });
      this.timerText = this.add.text(10, 10, 'Time: 10', {
        fontSize: '16px',
        color: '#ffffff'
      });
  
      // 9) Back to Menu
      const backText = this.add.text(100, 70, 'Back to Menu', {
        fontSize: '16px',
        color: '#ffffff',
        backgroundColor: '#000000',
        padding: { x: 8, y: 4 },
      })
      .setOrigin(0.5)
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.start('MiniGamesMenuScene');
      });
  
      this.gameWon = false;
  
      // 10) Graphics for drawing lines
      this.graphics = this.add.graphics();
    }
  
    highlightNode(node, on) {
      // If we want to highlight the label text or node sprite
      // We can, e.g., change the color of the text or scale the container
      const text = node.list[1]; // second item in container is our text
      if (on) {
        text.setColor('#ff0000');
        node.setScale(1.1);
      } else {
        text.setColor('#ffffff');
        node.setScale(1.0);
      }
    }
  
    attemptConnection(nodeA, nodeB) {
      // 1) Check if already connected
      if (this.isConnected(nodeA, nodeB)) {
        // Possibly allow removing an existing connection if you want
        // For now, let's do nothing if they're already connected
        return;
      }
  
      // 2) Check if nodeA or nodeB already has 2 connections
      if (nodeA.connections.length >= 2 || nodeB.connections.length >= 2) {
        // can't connect => node full
        return;
      }
  
      // 3) If we can connect, push into edges
      this.edges.push({ a: nodeA, b: nodeB });
      nodeA.connections.push(nodeB);
      nodeB.connections.push(nodeA);
  
      // increment "score" => each new line
      this.increaseScore(1);
  
      // 4) Redraw lines
      this.drawEdges();
    }
  
    isConnected(nodeA, nodeB) {
      // check if there's an existing edge
      return this.edges.some(edge => {
        return (edge.a === nodeA && edge.b === nodeB) || (edge.a === nodeB && edge.b === nodeA);
      });
    }
  
    drawEdges() {
      // Clear old lines
      this.graphics.clear();
      this.graphics.lineStyle(4, 0x00ff00, 1);
      // Draw each edge
      this.edges.forEach(edge => {
        this.graphics.beginPath();
        this.graphics.moveTo(edge.a.x, edge.a.y);
        this.graphics.lineTo(edge.b.x, edge.b.y);
        this.graphics.strokePath();
      });
    }
  
    increaseScore(amount) {
      let currentScore = this.registry.get('score');
      currentScore += amount;
      this.registry.set('score', currentScore);
      this.movesText.setText('Moves: ' + currentScore);
    }
  
    validateNetwork() {
      // Check if we have exactly 5 edges
      if (this.edges.length !== 5) {
        // Not a single ring => fail
        return;
      }
  
      // We want them in alphabetical ring order: A->B->C->D->E->A
      // We'll build a map of adjacency
      const adjacency = {};
      for (let node of this.nodes) {
        adjacency[node.label] = node.connections.map(n => n.label);
      }
      // adjacency example: { A: ['B'], B: ['A','C'], ... }
  
      // Check that each node has exactly 2 neighbors
      for (let label of this.nodeLabels) {
        if (!adjacency[label] || adjacency[label].length !== 2) {
          return; // fail
        }
      }
  
      // Now let's see if there's exactly one cycle of length 5 in alphabetical order
      // A quick approach: start from 'A', follow neighbors in alphabetical order,
      // see if we can loop A->B->C->D->E->A exactly
      let next = 'A';
      const visited = [];
      for (let i = 0; i < 5; i++) {
        visited.push(next);
        // neighbors
        let neigh = adjacency[next];
        // pick the neighbor that is not the one we came from, or the one that continues alphabetical
        // But we need it strictly A->B->C->D->E->A
        // So let's see if adjacency is what we expect
        let required = this.nodeLabels[(this.nodeLabels.indexOf(next) + 1) % 5];
        if (!neigh.includes(required)) {
          return; // fail
        }
        next = required;
      }
  
      // If we ended back at 'A', visited length is 5
      if (next !== 'A') {
        return; // fail
      }
  
      // If everything is correct => Win!
      this.gameWon = true;
      this.time.delayedCall(500, () => {
        this.scene.start('WinScene');
      });
    }
  
    update(_, delta) {
      if (this.gameWon) return;
  
      // decrement time
      let currentTime = this.registry.get('time');
      currentTime -= delta / 1000;
      this.registry.set('time', currentTime);
      this.timerText.setText('Time: ' + currentTime.toFixed(1));
  
      if (currentTime <= 0) {
        this.scene.start('LoseScene');
      }
    }
  }
  
  window.AdvancedNetworkScene = AdvancedNetworkScene;
  