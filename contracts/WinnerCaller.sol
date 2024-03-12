//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.24;

interface IWinnerContract {
    function attempt() external;
}

contract WinnerCaller {
    IWinnerContract private winner;

    constructor(address _contractAddress) {
        winner = IWinnerContract(_contractAddress);
    }

    function callAttempt() external {
        winner.attempt();
    }
}

// Winner: 0x5FbDB2315678afecb367f032d93F642f64180aa3
// Caller: 0x5FbDB2315678afecb367f032d93F642f64180aa3
