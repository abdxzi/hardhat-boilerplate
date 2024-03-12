const hre = require("hardhat");

async function main() {
    const MyContract = await ethers.getContractFactory("WinnerCaller");
    const contract = MyContract.attach(
      "0x5FbDB2315678afecb367f032d93F642f64180aa3"
    );
    
    // Now you can call functions of the contract
    console.log(await contract.callAttempt());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
}); 