var Coinflip = artifacts.require('./Coinflip.sol');
var Random = artifacts.require('./Random.sol');

module.exports = function(deployer) {
  deployer.deploy(Coinflip);
  deployer.deploy(Random);
};
