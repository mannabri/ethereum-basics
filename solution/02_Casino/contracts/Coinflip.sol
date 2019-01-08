pragma solidity ^0.4.2;

/*
    Now, that we know how to generate a random number it's time for an easy
    coinflip game. Anyone can make a bet by sending ether to the contract.
    Anyone can accept the bet by sending the same stake of ether to the
    contract. When resolving the bet a random number between 0 and 1 determines
    a winner and transfers the contract balance to the its account.

    To make the random number more robust the block number is already saved
    when the bet is accepted. This way, it's harder to influence the outcome
    of the random number.
*/

contract Coinflip {

    address public player1;
    address public player2;

    uint public stake;

    uint public seedBlockNumber;
    uint public blockHash;
    uint public FACTOR = (2 ** 256) / 2;

    function makeBet() public payable {
        require(msg.value > 0);
        stake = msg.value;
        player1 = msg.sender;
    }

    function acceptBet() public payable {
        require(msg.value == stake);
        player2 = msg.sender;
        seedBlockNumber = block.number;
    }

    function resolveBet() public payable {
        stake = 0;
        blockHash = uint(blockhash(seedBlockNumber));
        uint _result = blockHash / FACTOR;
        if (_result == 0) {
            player1.transfer(address(this).balance);
        }
        else {
            player2.transfer(address(this).balance);
        }
        player1 = address(0);
        player2 = address(0);
    }
}
