const { ethers } = require("hardhat");
require("dotenv").config();


async function main() {

    // ERC20 address
    const contractAddress = process.env.WETH;
    const contract = await ethers.getContractAt("CustomWETH", contractAddress);

    const accountAddress = process.env.ACC2;

    const t = await contract.balanceOf(accountAddress);

    console.log(`Balance of ${accountAddress} is  ${ethers.formatUnits(t, 18)} WETH.`);


}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });