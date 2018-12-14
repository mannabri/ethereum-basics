pragma solidity ^0.4.2;

/*
    todo
    // random number: https://www.youtube.com/watch?v=dq-gBPvDgrc&list=PLV1JDFUtrXpFh85G-Ddyy2kLSafaB9biQ&index=10
*/

contract Coinflip {

    address public player1;
    address public player2;

    uint public amount;
    uint public seedBlockNumber;
    uint256 public blockHash;
    uint256 public FACTOR = 57896044618658097711785492504343953926634992332820282019728792003956564819968;
    uint256 public result;

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
        blockHash = uint256(block.blockhash(seedBlockNumber));
        result = blockHash / FACTOR;
        if (result == 0) {
            player1.transfer(address(this).balance);
        }
        else {
            player2.transfer(address(this).balance);
        }
    }
}
