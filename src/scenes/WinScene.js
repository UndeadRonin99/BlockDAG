class WinScene extends Phaser.Scene {
    constructor() {
      super('WinScene');
    }
  
    create() {
      const { width, height } = this.cameras.main;
      const finalScore = this.registry.get('score');
      const finalTime = this.registry.get('time');
  
      this.add.text(width / 2, height / 2 - 50, 'YOU WIN!', {
        fontSize: '32px',
        color: '#00ff00'
      }).setOrigin(0.5);
  
      this.add.text(width / 2, height / 2, `Score: ${finalScore}\nTime: ${finalTime}`, {
        fontSize: '24px',
        color: '#ffffff',
        align: 'center'
      }).setOrigin(0.5);
  
      this.add.text(width / 2, height / 2 + 100, 'Click to return to Menu', {
        fontSize: '18px',
        color: '#ffff00'
      }).setOrigin(0.5);
  
      this.input.once('pointerdown', () => {
        this.scene.start('MiniGamesMenuScene');
      });
    }
  }

  async function awardBdagTokens(amount) {
    // Ensure we have a signer from previous connectWallet step
    const { signer } = globalWalletData; // your stored reference
    
    // Contract address & ABI
    const contractAddress = "0xYourContractAddress";
    const contractABI = [ /* ... the JSON ABI of your token contract ... */ ];
  
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    
    // Call your awarding function
    const tx = await contract.awardBDAG(await signer.getAddress(), amount);
    console.log("Transaction sent:", tx.hash);
    
    // Optionally wait for confirmation
    const receipt = await tx.wait();
    console.log("Transaction confirmed:", receipt);
    
    // If successful, the player's MetaMask wallet now has the minted tokens
  }
  
  // Example usage in a scene:
  this.time.delayedCall(500, () => {
    awardBdagTokens(10); // Award 10 BDAG for winning
  });
  
  
  window.WinScene = WinScene;