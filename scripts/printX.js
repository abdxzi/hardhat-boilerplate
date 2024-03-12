const hre = require("hardhat");

async function main() {
    const MyContract = await ethers.getContractFactory("Contract");
    const contract = MyContract.attach(
      "0x2503f5E6aa8005Dc7D2BC888C0124c92EE1A1C03"
    );
    
    // Now you can call functions of the contract
    console.log(await contract.x());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
}); 