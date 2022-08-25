# Sample Hardhat Project

### Installation
```shell
npm run install
```

### Build challenge images
First download the challenge files from paradigm.xyz or from unofficial archive repo.
Then add these two env variables to the challenge Dockerfile.

```
ENV ENV=dev
ENV ETH_RPC_URL=https://eth-mainnet.alchemyapi.io/v2/apikey
```

Then you can successfully build and run the image with approrpiate ports published.
```bash
docker build -t challenge .
docker run -p 31337:31337 -p 8545:8545 challenge
nc localhost 31337
```
You can use any value for team id.

Once you update your .env file with the information you got from above,
try running pwn.ts file with hardhat.
```
npx hardhat run scripts/pwn.ts --network ctf
```


### Solidity Compilation
```shell
npx hardhat compile
```
Using forge:
```shell
forge build
```

### Using python
My preferred installation of python is to use pyenv. Then use mkvenv script to set your venv in your folder.

### Run against CTF RPC
First, make sure your `.env` file is created and is filled with relevant info. Refer to `.env.template`.
```shell
npx hardhat run scripts/pwn.ts --network ctf
```
### Run against local network
You could set up a docker but I found deploying the setup contracts myself to be easiest.
```shell
npx hardhat run scripts/pwn.ts --network hardhat
```

Have fun hacking!
