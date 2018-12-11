var SimpleBank = artifacts.require('./SimpleBank.sol');
var OpenBank = artifacts.require('./OpenBank.sol');

module.exports = function(deployer) {
  deployer.deploy(SimpleBank);
  deployer.deploy(OpenBank);
};
