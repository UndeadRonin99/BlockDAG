///////////////////////////////////////////////////////////////
// 1. GLOBAL WALLET OBJECT + CONNECT WALLET FUNCTION
///////////////////////////////////////////////////////////////

window.globalWalletData = {
  provider: null,
  signer: null,
  userAddress: null
};

/**
 * Connects this web page (Phaser app) to the user's MetaMask wallet.
 * - Requests user's permission
 * - Creates an ethers provider + signer
 * - Stores them in window.globalWalletData
 */
async function connectWallet() {
  if (!window.ethereum) {
    alert("Please install MetaMask!");
    return;
  }
  try {
    // Request account access
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const userAddress = await signer.getAddress();

    // Save to our global object
    window.globalWalletData = { provider, signer, userAddress };
    console.log("Connected to MetaMask with address:", userAddress);
  } catch (err) {
    console.error("Failed to connect wallet:", err);
  }
}




class WinScene extends Phaser.Scene {
  constructor() {
    super('WinScene');
  }

  create() {
    const { width, height } = this.cameras.main;
    const finalScore = this.registry.get('score');
    const finalTime = this.registry.get('time');

    // Display Win UI
    this.add.text(width / 2, height / 2 - 100, '🎉 YOU WIN! 🎉', {
      fontSize: '40px',
      color: '#00ff00',
    }).setOrigin(0.5);

    this.add.text(width / 2, height / 2 - 40, `Score: ${finalScore}\nTime: ${finalTime}`, {
      fontSize: '24px',
      color: '#ffffff',
      align: 'center',
    }).setOrigin(0.5);

    this.add.text(width / 2, height / 2 + 60, 'Sending your BDAG reward...', {
      fontSize: '20px',
      color: '#ffff00',
    }).setOrigin(0.5);

    this.add.text(width / 2, height / 2 + 120, 'Click to return to Menu', {
      fontSize: '18px',
      color: '#aaaaff',
    }).setOrigin(0.5);

    // On click, go back to menu
    this.input.once('pointerdown', () => {
      this.scene.start('MiniGamesMenuScene');
    });

    // Trigger payout after short delay
    this.time.delayedCall(1500, async () => {
      const recipientAddress = window.globalWalletData?.userAddress;
      const bdagAmount = 10;

      if (!recipientAddress) {
        console.warn("No player wallet address available.");
        return;
      }

      await sendBdagFromHouse(recipientAddress, bdagAmount);
    });
  }
}

// Send BDAG using house private key
async function sendBdagFromHouse(recipientAddress, amount) {
  const BDAG_RPC_URL = 'https://rpc.primordial.bdagscan.com';
  const HOUSE_PRIVATE_KEY = '0x06c849b764969d2c9b011bb5fd7198ecb3e0e95c2edcfd08326ded87a2c7f68c';

  try {
    const provider = new ethers.providers.JsonRpcProvider(BDAG_RPC_URL);
    const wallet = new ethers.Wallet(HOUSE_PRIVATE_KEY, provider);

    const tx = {
      to: recipientAddress,
      value: ethers.utils.parseEther(amount.toString()),
    };

    const txResponse = await wallet.sendTransaction(tx);
    console.log(`Transaction sent: ${txResponse.hash}`);

    const receipt = await txResponse.wait();
    console.log(`✅ ${amount} BDAG sent to ${recipientAddress} in block ${receipt.blockNumber}`);
    alert(`✅ ${amount} BDAG sent to ${recipientAddress}`);
  } catch (err) {
    console.error('❌ BDAG transfer failed:', err);
    alert(`❌ BDAG transfer failed: ${err.message}`);
  }
}

window.WinScene = WinScene;
