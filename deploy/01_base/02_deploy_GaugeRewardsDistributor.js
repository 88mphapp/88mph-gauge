const config = require("../../configs/config.json");

module.exports = async ({ deployments, getNamedAccounts }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const gaugeController = await deployments.get("GaugeController");

  const deployResult = await deploy("GaugeRewardsDistributor", {
    from: deployer,
    log: true,
    args: [
      config.owner,
      config.timelock,
      config.curator,
      config.rewardToken,
      gaugeController.address,
    ],
  });
};

module.exports.tags = ["GaugeRewardsDistributor"];
module.exports.dependencies = ["GaugeController"];
