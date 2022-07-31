const config = require("../../configs/config.json");

module.exports = async ({ deployments, getNamedAccounts }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const votingEscrow = await deployments.get("VotingEscrow");

  const deployResult = await deploy("FeeDistributor", {
    from: deployer,
    log: true,
    args: [votingEscrow.address, config.startTime],
  });
};

module.exports.tags = ["FeeDistributor"];
module.exports.dependencies = ["VotingEscrow"];
