const config = require("../../configs/config.json");

module.exports = async ({ deployments, getNamedAccounts, getChainId }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  const chainId = await getChainId();

  const votingEscrow = await deployments.get("VotingEscrow");

  const deployResult = await deploy("GaugeController", {
    from: deployer,
    log: true,
    args: [votingEscrow.address, config.owner],
  });
};
module.exports.tags = ["GaugeController"];
module.exports.dependencies = ["VotingEscrow"];
