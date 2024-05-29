require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    hardhat: {},
    sepolia: {
      url: process.env.TESTNET_RPC_URL_SEPOLIA,
      accounts: [process.env.TESTNET_PRIVATE_KEY],
    },
    goerli: {
      url: process.env.TESTNET_RPC_URL_GOERLI,
      accounts: [process.env.TESTNET_PRIVATE_KEY],
    },
    hardhat_node: {
      url: "http://127.0.0.1:8545/",
      accounts: ["0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"]
    }
  }
};
