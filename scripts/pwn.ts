import { ethers } from "hardhat"
import { solidity } from "ethereum-waffle"
import { Challenge, Deployer, Deployer__factory, Helper, MerkleDistributor, Setup, Token } from "../build/typechain"
import { ensureEnvVar } from "../test/utils"
import { BigNumber, BigNumberish } from "ethers"
import chai from "chai"
import dotenv from "dotenv"

dotenv.config()

const { expect } = chai
chai.use(solidity)

async function main() {
  const account = (await ethers.getSigners())[0]
  console.log(`account: ${account.address}`)

  // const setup: Setup = await ethers.getContractAt("Setup", ensureEnvVar("CONTRACT_ADDRESS"))
  const setup: Setup =  await (await ethers.getContractFactory("Setup")).deploy()
  const challenge: Challenge = await ethers.getContractAt("Challenge", await setup.challenge())

  // playground
  const bytecode = "0x6020600061003960206000f30000000000000000000000000000000000000000"
  // const trimmedBytecode = "0x6020600060003960206000f3"

  // const deployerFactory: Deployer__factory = await ethers.getContractFactory("Deployer")
  // const helper: Helper = await (await ethers.getContractFactory("Helper")).deploy()

  // const deployer: Deployer = await deployerFactory.deploy(bytecode)
  // const deployedCode = await ethers.provider.getCode(deployer.address)
  // const deployedCodeHash = await ethers.utils.keccak256(bytecode)
  // const deployedTrimmedCodeHash = await ethers.utils.keccak256(trimmedBytecode)
  // console.log(deployedCode.toString())

  // console.log(deployedCodeHash.toString())
  // console.log(deployedTrimmedCodeHash.toString())

  // const helpOutput = await helper.help(deployer.address)
  // console.log(helpOutput.toString())

  await challenge.solve(bytecode)
  console.log(await challenge.solved())

  // const bytecodeArr = ethers.utils.hexDataSlice(bytecodes, 0, 2)
}



// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
