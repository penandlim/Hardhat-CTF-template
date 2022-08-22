import chai from "chai"
import dotenv from "dotenv"
import { solidity } from "ethereum-waffle"
import { ethers, network } from "hardhat"
import { Challenge, Lockbox2, Lockbox2__factory, Setup } from "../build/typechain"
import { ensureEnvVar } from "../test/utils"

dotenv.config()

const { expect } = chai
chai.use(solidity)

async function main() {
  const account = (await ethers.getSigners())[0]
  console.log(`account: ${account.address}`)

  let setup: Setup;

  // Load the contract from an address if we are running against CTF network
  // If not, deploy it for testing locally (hardhat network)
  if (network.name == "ctf") {
    setup = await ethers.getContractAt("Setup", ensureEnvVar("CONTRACT_ADDRESS"))
  } else {
    setup = await (await ethers.getContractFactory("Setup")).deploy()
  }

  // Do stuff here
  // console.log(await setup.lockbox2())
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
