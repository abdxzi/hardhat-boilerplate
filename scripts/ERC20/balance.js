const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {

    // ERC20 address
    const contractAddress = process.env.TOKEN1;
    const accountAddress = process.env.ACC1;

    const contract = await ethers.getContractAt("CustomERC20", contractAddress);


    const t = await contract.balanceOf(accountAddress);

    console.log(`Balance of ${accountAddress} is  ${ethers.formatUnits(t, 18)} tokens.`);


}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });