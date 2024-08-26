const { expect } = require("chai");
const { ethers } = require("hardhat");

const getAddress = (addr) => ethers.getAddress(addr);
const randomWallet = () => ethers.Wallet.createRandom(ethers.provider);

const impersonate = async (addr) => {
    await hre.network.provider.request({
        method: "hardhat_impersonateAccount",
        params: [addr],
    });

    const signer = await ethers.getSigner(addr);
    return signer;
}

const sendETH = async (senderWallet, to, amount) => {
    const tx = await senderWallet.sendTransaction({
        to: to,
        value: ethers.parseEther(amount.toString())
    });
    await tx.wait();
}

const contractAsSigner = async (contract, signer) => {
    return contract.connect(signer);
}


describe("Contract Test", () => {

    let acc1, acc2, contract;

    before(async () => {
        [acc1, acc2] = await ethers.getSigners();

        const Contract = await ethers.getContractFactory("ContractName");
        contract = await Contract.deploy(arg1, arg2);
    });

    it('Test 1', async () => {
        const owner = await contract.owner();
        expect(owner).to.be.eq(acc1.address);
    });
})