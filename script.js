const contractAddress = "0xd9145CCE52D386f254917e481eB44e9943F39138";

const contractABI = [
    {
        "inputs": [],
        "name": "getTrendPrediction",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "trendPrediction",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

// Wallet Connection Function
async function connectWallet() {
    if (window.ethereum) {
        try {
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            document.getElementById("walletAddress").textContent = `Connected: ${accounts[0]}`;
            document.getElementById("connectWalletBtn").textContent = "✅ Wallet Connected";
            document.getElementById("connectWalletBtn").disabled = true;
        } catch (error) {
            console.error("Wallet Connection Error:", error);
            document.getElementById("walletAddress").textContent = "❌ Connection Failed";
        }
    } else {
        document.getElementById("walletAddress").textContent = "⚠️ MetaMask not detected!";
    }
}

// Load Web3
async function loadWeb3() {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
    } else {
        alert("Please install MetaMask to use this feature.");
    }
}

// Load Smart Contract
async function loadContract() {
    const web3 = new Web3(window.ethereum);
    return new web3.eth.Contract(contractABI, contractAddress);
}

// Fetch Trend Data
document.getElementById("fetchTrend").addEventListener("click", async function () {
    await loadWeb3();
    const contract = await loadContract();
    try {
        const trend = await contract.methods.getTrendPrediction().call();
        document.getElementById("trendResult").innerHTML = `Trend: ${trend == 1 ? "📈 Uptrend" : "📉 Downtrend"}`;
    } catch (error) {
        console.error(error);
        document.getElementById("trendResult").innerHTML = "❌ Error fetching trend";
    }
});

// Add Wallet Connection Button Event Listener
document.getElementById("connectWalletBtn").addEventListener("click", connectWallet);
