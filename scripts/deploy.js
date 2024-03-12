const hre = require("hardhat");

async function main() {
const contract = await hre.ethers.deployContract("WinnerCaller", ["0xcF469d3BEB3Fc24cEe979eFf83BE33ed50988502"], {});

await contract.waitForDeployment();

console.log("Contract deployed to:", contract.target);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
console.error(error);
process.exitCode = 1;
});