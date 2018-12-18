pragma solidity ^0.4.2;

/*
    TODO: add description
    // random number: https://www.youtube.com/watch?v=dq-gBPvDgrc&list=PLV1JDFUtrXpFh85G-Ddyy2kLSafaB9biQ&index=10
*/

contract Coinflip {

    address public player1;
    address public player2;

    uint public amount;
    
    uint public seedBlockNumber;
    uint public blockHash;
    uint public FACTOR = (2 ** 256) / 2;

    function makeBet() public payable {
        require(msg.value >= 0);
        amount += msg.value;
        player1 = msg.sender;
    }

    function acceptBet() public payable {
        require(msg.value == amount);
        player2 = msg.sender;
        seedBlockNumber = block.number;
    }

    function resolveBet() public payable {
        amount = 0;
        blockHash = uint(blockhash(seedBlockNumber));
        uint _result = blockHash / FACTOR;
        if (_result == 0) {
            player1.transfer(address(this).balance);
        }
        else {
            player2.transfer(address(this).balance);
        }
    }
}
