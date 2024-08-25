const { expect } = require("chai");
const { ethers } = require("hardhat");

const usdt_addr = ethers.getAddress("0xaA8E23Fb1079EA71e0a56F48a2aA51851D8433D0"); // usdt
const company_wallet_addr = ethers.getAddress(""); // main

const bnb_wallet = ethers.Wallet.createRandom();
const bnb_wallet_address = bnb_wallet.address;

const erc20_abi = [
    "function approve(address spender, uint256 amount) external returns (bool)",
    "function allowance(address owner, address spender) external view returns (uint256)",
    "function transferFrom(address from, address to, uint256 amount) external returns (bool)",
    "function balanceOf(address account) external view returns (uint256)"
];

describe("USDTVault", () => {
    let contract, dummyWallet, company_wallet, tx;

    before(async () => {
        [dummyWallet] = await ethers.getSigners();

        await hre.network.provider.request({
            method: "hardhat_impersonateAccount",
            params: [company_wallet_addr],
        });

        company_wallet = await ethers.getSigner(company_wallet_addr);

        const USDTVault = await ethers.getContractFactory("USDTVault");
        contract = await USDTVault.deploy(usdt_addr, company_wallet_addr, bnb_wallet_address);
    });

    it('Initial Values Check', async () => {

        const owner = await contract.owner();
        const usdt = await contract.usdt();
        const company = await contract.company_wallet();
        const bnb = await contract.bnb_wallet();

        expect(owner).to.be.eq(dummyWallet.address);
        expect(usdt).to.be.eq(usdt_addr);
        expect(company).to.be.eq(company_wallet_addr);
        expect(bnb).to.be.eq(bnb_wallet_address);

        console.log("owner: ", owner);
        console.log("usdt: ", usdt);
        console.log("company: ", company);
        console.log("bnb: ", bnb);
        console.log("contract", contract.target);
    });

    it('Balance Checks', async () => {
        const usdt_contract = new ethers.Contract(usdt_addr, erc20_abi, dummyWallet);
        const balance = await usdt_contract.balanceOf(company_wallet_addr);
        console.log("Initial Company USDT:", balance);

        const eth = await ethers.provider.getBalance(bnb_wallet_address);
        console.log("Initial BNB Wallet:", eth);

    });

    it("Real test", async () => {
        // Send some gas to company wallet for approval
        tx = await dummyWallet.sendTransaction({
            to: company_wallet_addr,
            value: ethers.parseEther("10")
        });
        tx.wait();


        // approve smart contract
        const amount = ethers.parseUnits("10000", 6);
        const usdt_contract = new ethers.Contract(usdt_addr, erc20_abi, company_wallet);
        tx = await usdt_contract.approve(contract.target, amount);
        tx.wait();

        // Ensure allowance
        const allowance = await usdt_contract.allowance(company_wallet_addr, contract.target);
        expect(allowance).to.be.eq(amount);

        // update bnb wallet for balace 50 USDT
        await contract.updateBalance(bnb_wallet_address, ethers.parseUnits("65", 6));
        const balance = await contract.balanceOf(bnb_wallet_address);
        expect(balance).to.be.eq(ethers.parseUnits("65", 6));

        // send some gas to bnbwallet
        tx = await dummyWallet.sendTransaction({
            to: bnb_wallet_address,
            value: ethers.parseEther("10")
        });
        tx.wait();

        const bnbSigner = bnb_wallet.connect(ethers.provider);
        const contractAsBNBWallet = contract.connect(bnbSigner);
        tx = await contractAsBNBWallet.withdraw(ethers.parseUnits("8", 6), { value: ethers.parseUnits("0.51", "ether") });
        tx.wait();

        const balanceNow = await usdt_contract.balanceOf(company_wallet_addr);
        console.log("Final Company USDT:", balanceNow);

        const eth = await ethers.provider.getBalance(bnb_wallet_address);
        console.log("Final BNB Wallet:", eth);

        const usdtNow = await usdt_contract.balanceOf(bnb_wallet_address);
        console.log("Final BNB USDT:", usdtNow);
    })
})