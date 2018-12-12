pragma solidity ^0.4.2;

/*
    To begin with we implement a simple bank that is open to everyone. If offers
    one balance where everyone is able to deposit or withdraw ether. As you
    can imagine this is not a very reliable bank, someone could steal all of
    the ether. Anyway, we can improve that later ...
*/

contract SimpleBank {

    // (!) make the function payable so that it can receive ether
    function deposit() public /* ... */ {}

    function withdraw(/* ... */) public {
        // (!) require that enough ether are available for transfering
        // (!) transfer the amount to the sender of the transaction
        /* ... */
    }
}
