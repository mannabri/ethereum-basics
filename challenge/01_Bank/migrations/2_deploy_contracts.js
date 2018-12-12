var SimpleBank = artifacts.require('./SimpleBank.sol');
var OpenBank = artifacts.require('./OpenBank.sol');
var PrivateBank = artifacts.require('./PrivateBank.sol');

module.exports = function(deployer) {
  deployer.deploy(SimpleBank);
  deployer.deploy(OpenBank);
  deployer.deploy(PrivateBank);
};
