pragma solidity ^0.4.2;

contract Bank {

    // (!) make the function payable so that it can receive ether
    function deposit() public /* ... */ {}

    function withdraw(/* amount */) public {
        // (!) require that enough ether are available for transfering
        // (!) transfer the amount to the sender of the transaction
        /* ... */
    }
}
