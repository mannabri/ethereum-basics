var OpenBank = artifacts.require('./OpenBank.sol');
var account1 = web3.eth.accounts[0];
var account2 = web3.eth.accounts[1];

contract('OpenBank', async (accounts) => {

    it('should deposit 2 ether into the bank', async () => {
        let bank = await OpenBank.deployed();
        await bank.deposit({ from: account1, value: web3.toWei(2, 'ether')})
        let accountBalance = await bank.getAccountBalance({ from: account1 });
        assert.equal(
            accountBalance,
            web3.toWei(2, 'ether'),
            'account balance is not 2 ether'
        );
    });

    it('should withdraw 1.5 ether from the bank', async () => {
        let bank = await OpenBank.deployed();
        await bank.withdraw(web3.toWei(1.5, 'ether'), { from: account1 });
        let accountBalance = await bank.getAccountBalance({ from: account1 });
        assert.equal(
            accountBalance,
            web3.toWei(0.5, 'ether'),
            'account balance is not 0.5 ether'
        );
    });

    it('should throw an error for withdrawing too much ether', async () => {
        let bank = await OpenBank.deployed();
        try {
            var receipt = await bank.withdraw(
                web3.toWei(99, 'ether'),
                { from: account2 }
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
