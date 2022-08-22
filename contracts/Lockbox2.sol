// SPDX-License-Identifier: UNLICENSED

pragma solidity 0.8.15;

import "hardhat/console.sol";

contract Lockbox2 {

    bool public locked = true;

    function solve() external {
        bool[] memory successes = new bool[](5);
        console.logBytes(msg.data[4:]);
        (successes[0],) = address(this).delegatecall(abi.encodePacked(this.stage1.selector, msg.data[4:]));
        (successes[1],) = address(this).delegatecall(abi.encodePacked(this.stage2.selector, msg.data[4:]));
        (successes[2],) = address(this).delegatecall(abi.encodePacked(this.stage3.selector, msg.data[4:]));
        (successes[3],) = address(this).delegatecall(abi.encodePacked(this.stage4.selector, msg.data[4:]));
        (successes[4],) = address(this).delegatecall(abi.encodePacked(this.stage5.selector, msg.data[4:]));
        for (uint256 i = 0; i < 5; ++i) {
            console.log("solve: stage %d, %d", i + 1, successes[i] ? 1 : 0);
        }
        for (uint256 i = 0; i < 5; ++i) {
            require(successes[i]);
        }
        locked = false;
    }

    function stage1() external {
        require(msg.data.length < 500);
    }

    // Needs to be prime number 
    function stage2(uint256[4] calldata arr) external {
        for (uint256 i = 0; i < arr.length; ++i) {
            console.log("  stage 2: i=%d, value=%d", i, arr[i]);
            require(arr[i] >= 1);
            for (uint256 j = 2; j < arr[i]; ++j) {
                console.log("  stage 2: j=%d, modvalue=%d", j, arr[i] % j);
                require(arr[i] % j != 0);
            }
        }
    }

    function stage3(uint256 a, uint256 b, uint256 c) external {
        assembly { mstore(a, b) }
        (bool success, bytes memory data) = address(uint160(a + b)).staticcall("");
        console.log("  stage 3: a=%d b=%d c=%d", a, b, c);
        console.log("  stage 3: %d, %d", success ? 1 : 0, data.length);
        require(success && data.length == c);
    }

    function stage4(bytes memory a, bytes memory b) external {
        address addr;
        assembly { addr := create(0, add(a, 0x20), mload(a)) }
        (bool success, ) = addr.staticcall(b);
        console.log("  stage 4: staticcall %d", success);
        console.log("  stage 4: %d %d", tx.origin, address(uint160(uint256(addr.codehash))));
        require(tx.origin == address(uint160(uint256(addr.codehash))) && success);
    }

    function stage5() external {
        if (msg.sender != address(this)) {
            (bool success,) = address(this).call(abi.encodePacked(this.solve.selector, msg.data[4:]));
            require(!success);
        }
    }
}
