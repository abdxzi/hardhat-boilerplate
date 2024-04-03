const { ethers } = require("hardhat");
require("dotenv").config();

async function sendETH() {
    const privateKey = "0x5f0ba2022153e1926d7a5c58a9242ffaf50334284333ef9905bba9356df144c1";
   //  const privateKey = process.env.TESTNET_PRIVATE_KEY_GANACHE;
    const recipientAddress = process.env.WETH;
   //  const recipientAddress = process.env.ACC3;

    const wallet = new ethers.Wallet(privateKey);
    const signer = wallet.connect(ethers.provider);
   
    const amountInEther = '60.0'; 
    const amountInWei = ethers.parseEther(amountInEther);
   
    const transaction = await signer.sendTransaction({
       to: recipientAddress,
       value: amountInWei,
    });
    
   
    console.log(`Sent ${amountInEther} ETH, from: ${wallet.address} to: ${recipientAddress}`);
    console.log(`Transaction hash: ${transaction.hash}`);
   }
   
   sendETH();