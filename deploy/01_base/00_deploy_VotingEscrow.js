const config = require("../../configs/config.json");

module.exports = async ({ deployments, getNamedAccounts }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const deployResult = await deploy("VotingEscrow", {
    from: deployer,
    log: true,
    args: [
      config.escrowToken,
      config.votingEscrow.name,
      config.votingEscrow.symbol,
      config.owner,
    ],
  });
};

module.exports.tags = ["VotingEscrow"];
module.exports.dependencies = [];
