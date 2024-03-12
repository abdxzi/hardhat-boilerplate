// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;


contract Contract {
    uint public x;

    function changeX(uint _x) external {
        x = _x;
    }
}
