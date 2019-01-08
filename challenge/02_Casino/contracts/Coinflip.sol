pragma solidity ^0.4.2;

/*
    Now, that we know how to generate a random number it's time for an easy
    coinflip game. Anyone can make a bet by sending ether to the contract.
    Anyone can accept the bet by sending the same stake of ether to the
    contract. When resolving the bet a random number between 0 and 1 determines
    a winner and transfers the contract balance to the its account.
    For 0 1st player wins, for 1 2nd player wins.

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
    uint public FACTOR = /* ... */;

    /*
     * (!) Write a public and payable function makeBet(). When called it should
     * require that the value of the message is greater than 0, otherwise there
     * would be no stake in the bet. Next, assign the message value and address
     * to appropriate variables.
     */
    function {}

    function acceptBet() public payable {
        // (!) Make sure that the second player accepts the bet with an equal stake
        /* ... */
        player2 = msg.sender;
        // (!) Assign the current block number to the seed block number
        seedBlockNumber = /* ... */;
    }

    function resolveBet() public payable {
        // (!) Get the blockhas of the seed block number
        blockHash = /* ... */;
        // (!) Calculate the the result (0 or 1) based on blockhash and factor
        uint _result = /* ... */;
        // (!) Determine the winner and transfer all of the ether to its address
        /* ... */
        // (!) Reset all variables
        /* ... */
    }
}
