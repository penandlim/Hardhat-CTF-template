# Sample Hardhat Project

### Installation
```shell
npm run install
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
