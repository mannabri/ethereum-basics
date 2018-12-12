pragma solidity ^0.4.2;

/*
    As soon as you deploy a smart contract to the network you loose control
    over it. Well, there are options to prevent that. In this example we build
    a bank where customer have to registered by the bank owner before they can
    deposit and withdraw ether.
*/

contract PrivateBank {

    // Store the address of the bank owner
    address public owner;

    // Mapping that stores the address and balance of a customer
    mapping(address => uint) customers;

    // (!) Create a second mapping that stores the address and true/false
    // values for registration
    mapping(/* ... */) public registered;

    /*
        (!) Create a constructor that sets the address of the bank owner. In
        other words the address of the one who deploys the contract.
    */
    /* ... */

    function registerNewCustomer(address _customer) public {
        // (!) require that only the owner can register a new customer
        // (!) require that the customer is not registered yet
        // (!) store the new customer in the registered mapping

        /* ... */
    }

    function deposit() public payable {
        // (!) Require that the sender is registered as a customer

        /* ... */

        customers[msg.sender] += msg.value;
    }

    function getAccountBalance() public view returns(uint _balance) {
        // (!) require that the sender is registered as a customer

        /* ... */

        return customers[msg.sender];
    }

    function withdraw(uint _amount) public {
        // (!) require that the sender is registered as a customer

        /* ... */

        require(
            customers[msg.sender] >= _amount,
            'not enough ether in account'
        );
        customers[msg.sender] -= _amount;
        msg.sender.transfer(_amount);
    }
}
