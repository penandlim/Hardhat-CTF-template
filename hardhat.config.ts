import "@nomiclabs/hardhat-ethers"
import "@typechain/hardhat"

import { HardhatUserConfig, task } from "hardhat/config"
import dotenv from "dotenv"

dotenv.config()

let config: HardhatUserConfig = {
  defaultNetwork: "ctf",
  networks: {
    hardhat: {
    },
    ctf: {
      url: "http://34.123.187.206:8545/6d792c11-ade1-4894-a50d-727d392a8ecc",
      accounts: [
        "0x12bbba1f500d79270e1725c824b6c0ee38e203cb66bf3642c04295a94416c12c",
      ],
    },
  },
  paths: {
    sources: "./contracts",
    artifacts: "./build/artifacts",
    cache: "./build/cache",
  },
  solidity: {
    compilers: [
      {
        version: "0.8.16",
        settings: {
          optimizer: {
            enabled: true,
            runs: 10000,
          },
        },
      },
    ],
  },
  typechain: {
    outDir: "./build/typechain/",
    target: "ethers-v5",
  },
}

export default config
