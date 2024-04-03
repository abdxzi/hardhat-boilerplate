const { ethers } = require("hardhat");
require("dotenv").config();


async function main() {

    // ERC20 address
    const contractAddress = process.env.TOKEN2;
    const mintToAddress = process.env.ACC1;

    const contract = await ethers.getContractAt("CustomERC20", contractAddress);

    const amount = ethers.parseUnits("500", 18);
    const tx = await contract.mint(mintToAddress, amount);
    await tx.wait();

    console.log(`Minted ${ethers.formatUnits(amount, 18)} tokens to ${mintToAddress}`);


}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });