pragma solidity ^0.4.2;

/*
    For every computer generated casino game we probably need some randomness.
    Bad news: there is no out of the box random function. However, there are a
    variety of approaches to generate randomness.

    The following approach uses the block hash. This 64-bit string is randomly
    calculated based on block information including the transactions that
    are mined.

    We can use this hash and parse it into an unsigned integer with 256 bits
    (uint256 == uint). Tada, now we have a random number between 0 and (2^256-1).
    And even more: if we devide this number by half of the largest possible number
    (= 2^256 / 2) we will get an equal distribution between 0 and 1.

    BE CAREFUL TO USE IT IN PRODUCTION. MINERS MIGHT BE ABLE TO EXPLOIT THIS.
*/

contract Random {

    // Random number between 0 and 1
    uint public random2;
    // Random number between 0 and 3
    uint public random4;
    // Random number between 0 and 255
    uint public random256;

    function rand2(uint _blockNumber) public {
        // (!) Get the block hash of a given block number and parse it to uint
        uint _blockValue = uint(blockhash(_blockNumber)); // parse blockhash string into uint256
        uint _factor = (2 ** 256) / 2;
        random2 = uint(_blockValue / _factor);
    }

    function rand4(uint _blockNumber) public {
        uint _blockValue = uint(blockhash(_blockNumber)); // parse blockhash string into uint256
        uint _factor = (2 ** 256) / 4;
        random4 = uint(_blockValue / _factor);
    }

    // The same applies to 8, 16, 32, 64, 128

    function rand256(uint _blockNumber) public {
        uint _blockValue = uint(blockhash(_blockNumber)); // parse blockhash string into uint256
        uint _factor = (2 ** 256) / 256;
        random256 = uint(_blockValue / _factor);
    }
}
