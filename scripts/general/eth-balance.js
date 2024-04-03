const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {

    // ERC20 address
    const address = process.env.WETH;
    const balance = await ethers.provider.getBalance(address);
    console.log(`Balance of ${address} is  ${ethers.formatUnits(balance, 18)} ETH.`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });