const { ethers } = require("hardhat");

const erc20_abi = [
    "function approve(address spender, uint256 amount) external returns (bool)",
    "function allowance(address owner, address spender) external view returns (uint256)",
    "function transferFrom(address from, address to, uint256 amount) external returns (bool)",
    "function balanceOf(address account) external view returns (uint256)"
];

class ERC20 {
    constructor(symbol, token_addr, decimals, signer = ethers.provider) {
        this.symbol = symbol;
        this.token_addr = token_addr;
        this.decimals = decimals;
        this.signer = signer;

        this.contract = this.contract();
    }

    contract() {
        return new ethers.Contract(this.token_addr, erc20_abi, this.signer);
    }

    async balaceOf(address) {
        const balance = await this.contract.balaceOf(address);
        return ethers.formatUnits(balance, this.decimals);
    }

    async allowance(owner, spender) {
        const allowance = await this.contract.allowance(owner, spender);
        return ethers.formatUnits(allowance, this.decimals);
    }

    async approve(spender, amount) {
        const allowance = await this.contract.approve(spender, ethers.parseUnits(amount.toString(), this.decimals));
        return allowance;
    }

    async transferFrom(from, to, amount) {
        const allowance = await this.contract.transferFrom(from, to, ethers.parseUnits(amount.toString(), this.decimals));
        return allowance;
    }
}