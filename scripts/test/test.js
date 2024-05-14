const hre = require("hardhat");
const {
    deploy_contract,
    ETH_balanceof,
    ETH_transfer,
    estimate_deployment_cost
} = require("./helpers");

const main = async () => {
    const provider = ethers.provider;

    const [signer] = await ethers.getSigners();
    const signerAddress = await signer.getAddress();

    console.log("SIGNER:", signerAddress);

    // await ETH_transfer(signer, "0x70997970C51812dc3A010C7d01b50e0d17dc79C8", "100");
    // await ETH_balanceof(provider, "0x70997970C51812dc3A010C7d01b50e0d17dc79C8");

    await deploy_contract("CrowdFund");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
