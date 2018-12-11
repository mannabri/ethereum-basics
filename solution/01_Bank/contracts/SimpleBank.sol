pragma solidity ^0.4.2;

/*
    This is a very simple bank. Everyone is allowed to deposit ether into
    the bank. Everyone is allowed to withdraw available ether from the bank.
*/

contract SimpleBank {

    // (!) make the function payable so that it can receive ether
    function deposit() public payable {}

    function withdraw(uint _amount) public {
        // (!) transfer the amount to the sender of the transaction
        msg.sender.transfer(_amount);
    }
}
