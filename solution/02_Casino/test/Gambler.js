var Gambler = artifacts.require('Gambler.sol');
var account1 = web3.eth.accounts[0];

contract('Gambler', async (accounts) => {

    it('deploys the Gambler contract', async () => {
        let gambler = await Gambler.deployed();
        let value = await gambler.value();
        assert.equal(value.toNumber(), 0, 'initial value is 0');
    });

    it('sets the value', async () => {
        let gambler = await Gambler.deployed();
        await gambler.setValue(3, { from: account1 });
        let value = await gambler.value();
        assert.equal(value.toNumber(), 3, 'value is set to 3');
    });
});
