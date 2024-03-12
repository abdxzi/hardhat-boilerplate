// https://goerli.etherscan.io/address/0xcF469d3BEB3Fc24cEe979eFf83BE33ed50988502#code

const { ethers } = require("hardhat");

async function main() {

    const contractAddress = "0xcF469d3BEB3Fc24cEe979eFf83BE33ed50988502";
    const contractABI = [{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"","type":"address"}],"name":"Winner","type":"event"},{"inputs":[],"name":"attempt","outputs":[],"stateMutability":"nonpayable","type":"function"}];

    const [deployer] = await ethers.getSigners();
    const contract = new ethers.Contract(contractAddress, contractABI, deployer);

    const result = await contract.attempt();

    console.log("Result:", result);

    // Listen for events
    contract.on("Winner", (arg1) => {
        console.log("Event emitted:", arg1);
    });
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
