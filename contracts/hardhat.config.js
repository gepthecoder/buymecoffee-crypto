require("dotenv").config();
require("@nomiclabs/hardhat-waffle");


task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  paths: {
    artifacts: "../frontend_coffee/src/artifacts",
  },
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    mumbai: {
      url: process.env.MUMBAI_API_URI,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
