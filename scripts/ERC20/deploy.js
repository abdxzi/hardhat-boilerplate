const hre = require("hardhat");

async function main() {
    const tokenName = "Token 2";
    const tokenSymbol = "TKN2";
    const contract = await hre.ethers.deployContract("CustomERC20", [tokenName, tokenSymbol, 18], {});

    await contract.waitForDeployment();

    console.log(`${tokenName} (${tokenSymbol}) deployed to:`, contract.target);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});