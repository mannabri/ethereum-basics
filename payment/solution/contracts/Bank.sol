pragma solidity ^0.4.2;

contract Bank {

    // (!) make the function payable so that it can receive ether
    function deposit() public payable {}

    function withdraw (uint _amount) public {
        // (!) require that enough ether are available for transfering
        // (!) transfer the amount to the sender of the transaction
        require(_amount <= address(this).balance, "not enough funds in bank");
        msg.sender.transfer(_amount);
    }
}
