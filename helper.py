from web3 import Web3
import json
  
def gen_leaf(index, account, amount):
    return Web3.solidityKeccak(
        ["uint256", "address", "uint96"], [index, account, amount]
    )
  
# Opening JSON file
f = open('tree.json')
  
# returns JSON object as 
# a dictionary
data = json.load(f)
merkle_root = data["merkleRoot"]
merkle_root_bytes = bytes.fromhex(str(merkle_root[2:]))

print(merkle_root)

for address, v in data["claims"].items():
    for i in range(1000000000):
        if gen_leaf(i, address, int(v["amount"], base=16)) == merkle_root_bytes:
            print(f"{i} {address} {v['amount']}")
            break
    print(f"no collision found for {address} {v['amount']}")