var SimpleBank = artifacts.require('./SimpleBank.sol');
var account1 = web3.eth.accounts[0];
var account2 = web3.eth.accounts[1];

/**
 * All tests are written using the async/await style. However, there is an
 * alternative style using then(). You can find an example at the end.
 **/

contract('SimpleBank', async (accounts) => {

    it('should deposit 2 ether into the bank', async () => {
        let bank = await SimpleBank.deployed();
        await bank.deposit({ from: account1, value: web3.toWei(2, 'ether')})
        let balance = await web3.eth.getBalance(bank.address);
        assert.equal(
            balance.toNumber(),
            web3.toWei(2, 'ether'),
            'bank balance is not 2 ether'
        );
    });

    it('should withdraw 1.5 ether from the bank', async () => {
        let bank = await SimpleBank.deployed();
        await bank.withdraw(web3.toWei(1.5, 'ether'), { from: account2 });
        let balance = await web3.eth.getBalance(bank.address);
        assert.equal(
            balance.toNumber(),
            web3.toWei(0.5, 'ether'),
            'bank balance is not 0.5 ether'
        );
    });

    // ---------------------------- ERRORS ------------------------------------

    it('should throw an error for withdrawing too much ether', async () => {
        let bank = await SimpleBank.deployed();
        try {
            var receipt = await bank.withdraw(
                web3.toWei(99, 'ether'),
                { from: account1 }
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
