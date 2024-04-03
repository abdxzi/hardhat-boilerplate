const hre = require("hardhat");

async function main() {
    const contract = await hre.ethers.deployContract("CustomWETH", [], {});

    await contract.waitForDeployment();

    console.log("WETH Contract deployed to:", contract.target);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});