var Coinflip = artifacts.require('./Coinflip.sol');
var operator = web3.eth.accounts[0];
var account1 = web3.eth.accounts[1];
var account2 = web3.eth.accounts[2];
// Define rounds for generating random numbers serveral times
var rounds = 3;


contract('Coinflip', async () => {
    it('should make a bet', async () => {
        let coinflip = await Coinflip.deployed();
        await coinflip.makeBet({ from: account1, value: web3.toWei(5, 'ether') });
        let player1 = await coinflip.player1();
        assert.equal(player1, account1, 'player1 is not account1');
        let stake = await coinflip.stake();
        assert.equal(web3.fromWei(stake, 'ether'), 5, 'stake is not 50');
        let balance = await web3.eth.getBalance(coinflip.address);
        assert.equal(web3.fromWei(balance, 'ether'), 5, 'contract balance is not 50');
    });

    it('should accept the bet', async () => {
        let coinflip = await Coinflip.deployed();
        await coinflip.acceptBet({ from: account2, value: web3.toWei(5, 'ether') });
        let player2 = await coinflip.player2();
        assert.equal(player2, account2, 'player2 is not account2');
        let balance = await web3.eth.getBalance(coinflip.address);
        assert.equal(web3.fromWei(balance, 'ether'), 10, 'contract balance is not 100');
    });

    it('should resolve the bet', async () => {
        let coinflip = await Coinflip.deployed();
        let balance1Before = web3.eth.getBalance(account1);
        let balance2Before = web3.eth.getBalance(account2);
        await coinflip.resolveBet({ from: operator });
        let balance1After = web3.eth.getBalance(account1);
        let balance2After = web3.eth.getBalance(account2);
        assert(
            balance1After == balance1Before.toNumber() + parseInt(web3.toWei(10, 'ether')) ||
            balance2After == balance2Before.toNumber() + parseInt(web3.toWei(10, 'ether')),
            'winning stake not transfered correctly'
        );
        // Reset all data for next round
        let balance = await web3.eth.getBalance(coinflip.address);
        assert.equal(balance, 0, 'contract balance is not 0');
        let stake = await coinflip.stake();
        assert.equal(stake, 0, 'stake is not 0');
        let player1 = await coinflip.player1();
        assert.equal(
            player1, '0x0000000000000000000000000000000000000000',
            'player1 address is not 0'
        );
        let player2 = await coinflip.player2();
        assert.equal(
            player2,
            '0x0000000000000000000000000000000000000000',
            'player2 address is not 0'
        );
    });

    it('should throw an error for making a bet without ether', async () => {
        let coinflip = await Coinflip.deployed();
        try {
            var receipt = await coinflip.makeBet({ from: account1, value: 0 });
        } catch(error) {
            assert(
                error.message.search('revert') >= 0,
                'the transaction does not fail and revert'
            );
            return true;
        }
        assert.isUndefined(receipt, 'the receipt is not undefined');
    });

    it('should throw an error for accepting the bet with the incorrect stake',
        async () => {
        let coinflip = await Coinflip.deployed();
        await coinflip.makeBet({ from: account1, value: 200 });
        try {
            var receipt = await coinflip.acceptBet({ from: account1, value: 99 });
        } catch(error) {
            assert(
                error.message.search('revert') >= 0,
                'the transaction does not fail and revert'
            );
            return true;
        }
        assert.isUndefined(receipt, 'the receipt is not undefined');
    });
});
