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
    }
  }
};
