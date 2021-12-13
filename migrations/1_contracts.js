const RegService = artifacts.require("RegulatorService");
const TMY = artifacts.require("TMY");
const Project = artifacts.require("Project");

const name = "TMYProjectContract_Nordvest";
const symbol = "TMYPCNV";
const tokenPrice = "1038205000000000000";
const totalSupply = "450000";

module.exports = function (deployer) {
  deployer.deploy(RegService).then(function () {
    return deployer.deploy(TMY, RegService.address).then(function () {
      return deployer.deploy(
        Project,
        name,
        symbol,
        tokenPrice,
        totalSupply,
        RegService.address,
        TMY.address
      );
    });
  });
};
