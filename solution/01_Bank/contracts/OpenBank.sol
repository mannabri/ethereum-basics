pragma solidity ^0.4.2;

/*
    This bank is open for everyone to deposit funds. Unlike the SimpleBank,
    a customer can only withdraw as much as he/she put into the bank beforehand.
*/

contract OpenBank {

    // Create a mapping that stores the address and the account balance for
    // each customer
    mapping(address => uint) public customers;

    function deposit() public payable {
        // (!) Increase the account balance of the sender in the customers mapping
        customers[msg.sender] += msg.value;
    }

    // (!) return the account balance of the sender from the customers mapping
    function getAccountBalance() public view returns(uint _balance) {
        return customers[msg.sender];
    }

    function withdraw(uint _amount) public {
        /*
        (!) Prevent someone from withdrawing more than he/she previoulsy
            deposited in the bank. Check the customers mapping whether enough
            ether are available and revert the transaction if not.
        (!) Decrease the account balance of the sender in the customers mapping
        */
        require(
            customers[msg.sender] >= _amount,
            "not enough ether stored in account"
        );
        customers[msg.sender] -= _amount;
        // Finally, transfer the amount of ether to the sender's address
        msg.sender.transfer(_amount);
    }
}
