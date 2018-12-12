var PrivateBank = artifacts.require('./PrivateBank.sol');
var owner = web3.eth.accounts[0];
var customer1 = web3.eth.accounts[1];
var customer2 = web3.eth.accounts[2];

contract('PrivateBank', async (accounts) => {

    it('should set the correct owner of the contract', async () => {
        let bank = await PrivateBank.deployed();
        let contractOwner = await bank.owner();
        assert.equal(contractOwner, owner, 'incorrect owner');
    });

    it('should register a new customer', async () => {
        let bank = await PrivateBank.deployed();
        await bank.registerNewCustomer(customer1, { from: owner });
        let registered = await bank.registered(customer1, { from: owner });
        assert.equal(registered, true, 'customer is not registered');
    })

    it('should deposit 2 ether into the bank', async () => {
        let bank = await PrivateBank.deployed();
        await bank.deposit({ from: customer1, value: web3.toWei(2, 'ether')})
        let accountBalance = await bank.getAccountBalance({ from: customer1 });
        assert.equal(
            accountBalance,
            web3.toWei(2, 'ether'),
            'account balance is not 2 ether'
        );
    });

    it('should withdraw 1.5 ether from the bank', async () => {
        let bank = await PrivateBank.deployed();
        await bank.withdraw(web3.toWei(1.5, 'ether'), { from: customer1 });
        let accountBalance = await bank.getAccountBalance({ from: customer1 });
        assert.equal(
            accountBalance,
            web3.toWei(0.5, 'ether'),
            'account balance is not 0.5 ether'
        );
    });

    // ---------------------------- ERRORS ------------------------------------

    it('should throw an error for registering a new customer from an ' +
       'address that is not the bank owner', async () => {
        let bank = await PrivateBank.deployed();
        try {
            var receipt = await bank.registerNewCustomer(
                customer2,
                { from: customer1 }
            );
        } catch(error) {
            assert(
                error.message.search('revert') >= 0,
                'the transaction should fail and revert'
            );
            return true;
        }
        assert.isUndefined(receipt, 'the receipt should be undefined');
    });

    it('should throw an error for depositing ether if customer is not ' +
       'registered', async () => {
        let bank = await PrivateBank.deployed();
        try {
            var receipt = await bank.deposit({ from: customer2, value: 222 });
        } catch(error) {
            assert(
                error.message.search('revert') >= 0,
                'the transaction should fail and revert'
            );
            return true;
        }
        assert.isUndefined(receipt, 'the receipt should be undefined');
    });

    it('should throw an error if unregistered customer asks for account ' +
       'balance', async () => {
        let bank = await PrivateBank.deployed();
        try {
            var receipt = await bank.getAccountBalance({ from: customer2 });
        } catch(error) {
            assert(
                error.message.search('revert') >= 0,
                'the transaction should fail and revert'
            );
            return true;
        }
        assert.isUndefined(receipt, 'the receipt should be undefined');
    });

    it('should throw an error if unregistered customer asks for account ' +
       'balance', async () => {
        let bank = await PrivateBank.deployed();
        try {
            var receipt = await bank.getAccountBalance({ from: customer2 });
        } catch(error) {
            assert(
                error.message.search('revert') >= 0,
                'the transaction should fail and revert'
            );
            return true;
        }
        assert.isUndefined(receipt, 'the receipt should be undefined');
    });

    it('should throw an error for withdrawing if the customer is ' +
       'not registered', async () => {
        let bank = await PrivateBank.deployed();
        try {
            var receipt = await bank.withdraw(
                web3.toWei(2, 'ether'),
                { from: customer2 }
            );
        } catch(error) {
            assert(
                error.message.search('revert') >= 0,
                'the transaction should fail and revert'
            );
            return true;
        }
        assert.isUndefined(receipt, 'the receipt should be undefined');
    });

    it('should throw an error for withdrawing too much ether', async () => {
        let bank = await PrivateBank.deployed();
        try {
            var receipt = await bank.withdraw(
                web3.toWei(99, 'ether'),
                { from: customer1 }
            );
        } catch(error) {
            assert(
                error.message.search('revert') >= 0,
                'the transaction should fail and revert'
            );
            return true;
        }
        assert.isUndefined(receipt, 'the receipt should be undefined');
    });
});
