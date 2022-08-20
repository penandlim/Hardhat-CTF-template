import { ethers } from "hardhat";
import { MerkleDistributor, Setup } from "../build/typechain";

import dotenv from "dotenv"
import { ensureEnvVar } from "../test/utils";

dotenv.config()


async function main() {
  const setup: Setup = await ethers.getContractAt("Setup", ensureEnvVar("CONTRACT_ADDRESS"))
  const merkleDistributor: MerkleDistributor = await ethers.getContractAt("MerkleDistributor", await setup.merkleDistributor())
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
