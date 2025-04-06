class MiniGamesMenuScene extends Phaser.Scene {
    constructor() {
      super('MiniGamesMenuScene');
    }
  
    create() {
      

      const { width, height } = this.cameras.main;
      this.add.text(width / 2, height / 4, 'Select a Mini Game:', {
        fontSize: '32px',
        color: '#ffffff'
      }).setOrigin(0.5);

      // ADD: "How To Play" text
    const howToPlayText = this.add.text(width / 2, height / 2 - 100, 'How to Play', {
      fontSize: '24px',
      color: '#ffff00'
    }).setOrigin(0.5).setInteractive();

    howToPlayText.on('pointerdown', () => {
      this.scene.start('HowToPlayScene');
    });
  
      // 1) Packet Dodger
      const packetDodgerText = this.add.text(width / 2, height / 2 - 50, 'Packet Dodger', {
        fontSize: '24px',
        color: '#00ff00'
      }).setOrigin(0.5).setInteractive();
  
      packetDodgerText.on('pointerdown', () => {
        // Reset score/time if needed
        this.registry.set('score', 0);
        this.registry.set('time', 0);
        this.scene.start('PacketDodgerScene');
      });
  
      // 2) Bit Flipper
      const bitFlipperText = this.add.text(width / 2, height / 2, 'Bit Flipper', {
        fontSize: '24px',
        color: '#00ff00'
      }).setOrigin(0.5).setInteractive();
  
      bitFlipperText.on('pointerdown', () => {
        this.registry.set('score', 0);
        this.registry.set('time', 0);
        this.scene.start('BitFlipperScene');
      });
  
      // 3) Hacker Attack
      const hackerAttackText = this.add.text(width / 2, height / 2 + 50, 'Hacker Attack', {
        fontSize: '24px',
        color: '#00ff00'
      }).setOrigin(0.5).setInteractive();
  
      hackerAttackText.on('pointerdown', () => {
        this.registry.set('score', 0);
        this.registry.set('time', 0);
        this.scene.start('HackerAttackScene');
      });

      // 4) Hacker Attack
      const NonceFinderText = this.add.text(width / 2, height / 2 + 100, 'Nonce Finder', {
        fontSize: '24px',
        color: '#00ff00'
      }).setOrigin(0.5).setInteractive();
  
      NonceFinderText.on('pointerdown', () => {
        this.registry.set('score', 0);
        this.registry.set('time', 0);
        this.scene.start('NonceFinderScene');
      });

      // 5) proof puzzle
      const ProofPuzzleText = this.add.text(width / 2, height / 2 + 150, 'Proof Puzzle', {
        fontSize: '24px',
        color: '#00ff00'
      }).setOrigin(0.5).setInteractive();
  
      ProofPuzzleText.on('pointerdown', () => {
        this.registry.set('score', 0);
        this.registry.set('time', 0);
        this.scene.start('ProofPuzzleScene');
      });

      // 6) Network Simulator
      const NetworkSimulatorText = this.add.text(width / 2, height / 2 + 200, 'Network Simulator', {
        fontSize: '24px',
        color: '#00ff00'
      }).setOrigin(0.5).setInteractive();
  
      NetworkSimulatorText.on('pointerdown', () => {
        this.registry.set('score', 0);
        this.registry.set('time', 0);
        this.scene.start('AdvancedNetworkScene');
      });
    }
  }

  // Pseudocode
async function connectWallet() {
  if (window.ethereum) {
    try {
      // Request accounts from MetaMask
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      // Initialize Ethers
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const userAddress = await signer.getAddress();
      console.log("Connected with address:", userAddress);
      
      return { provider, signer, userAddress };
    } catch (err) {
      console.error(err);
    }
  } else {
    alert("Please install MetaMask!");
  }
}

  
  window.MiniGamesMenuScene = MiniGamesMenuScene;