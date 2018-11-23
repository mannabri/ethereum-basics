var Gambler = artifacts.require("./Gambler.sol");

module.exports = function(deployer) {
  deployer.deploy(Gambler);
};
