const hre = require("hardhat");

async function main() {

  const BuyMeCoffee = await hre.ethers.getContractFactory("BuyMeCoffee");
  const buyMeCoffee  = await BuyMeCoffee.deploy();

  await buyMeCoffee.deployed();

  console.log("BuyMeCoffee deployed to:", buyMeCoffee.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
