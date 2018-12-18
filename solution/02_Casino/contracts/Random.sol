pragma solidity ^0.4.2;

/*
    For every computer generated casino game we probably need some randomness.
    Bad news: there is no out of the box random function. However, there are a
    variety of approaches to generate randomness.

    The following approach uses the block hash. This 64-bit string is randomly
    calculated based on block information including the transactions that
    are mined.

    We can parse this hash into an unsigned integer with 256 bits and there
    it is: the random block value between 0 and (2^256 - 1). But what if I only
    want randomness between 0 and 1? Well, divide the random block value by
    half of the maximum possible block value ((2^256 - 1) / 2) and parse it to
    uint. The result will be 0 for all block values that are below half, and 1
    for all block values that are above half.

    You can apply this for any distribution, e.g. divide by 17 for random
    numbers between 0 and 16.

    BE CAREFUL TO USE THIS IN PRODUCTION. MINERS MIGHT BE ABLE TO EXPLOIT THIS!
*/

contract Random {

    uint public randomNumber;

    function generateRandomNumberWithSeed(uint _seed, uint _distribution) public {
        // (!) Get the block hash of a given block number and parse it to uint
        uint _blockValue = uint(blockhash(_seed));
        // (!) Calculate the factor
        uint _factor = (2 ** 256 - 1) / _distribution;
        randomNumber = uint(_blockValue / _factor);
    }

    function generateRandomNumber(uint _distribution) public {
        // (!) Get the block number of the latest mined block
        uint _blockNumber = block.number - 1;
        // (!) Get the block hash of a given block number and parse it to uint
        uint _blockValue = uint(blockhash(_blockNumber));
        // (!) Calculate the factor
        uint _factor = (2 ** 256 - 1) / _distribution;
        randomNumber = uint(_blockValue / _factor);
    }

}
