// SPDX-License-Identifier: MIT

pragma solidity 0.8.15;

// Replace this file with CTF challenge contracts

contract Setup {

    bool _solved;
    
    constructor() {
        _solved = true;
    }
    
    function isSolved() external view returns (bool) {
        return _solved;
    }
}
