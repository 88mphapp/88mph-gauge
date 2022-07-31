const config = require("../../configs/config.json");
const middlemanGaugeConfig = require("../../configs/middleman_gauge_config.json");

module.exports = async ({ deployments, getNamedAccounts, getChainId }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  const chainId = await getChainId();
  const gaugeConfig = middlemanGaugeConfig.chainId;

  const rewardsDistributor = await deployments.get("GaugeRewardsDistributor");

  const deployResult = await deploy(gaugeConfig.name, {
    from: deployer,
    contract: "MiddlemanGauge",
    log: true,
    args: [
      gaugeConfig.owner,
      config.rewardToken,
      config.timelock,
      rewardsDistributor.address,
      gaugeConfig.bridgeAddress,
      gaugeConfig.bridgeType,
      gaugeConfig.destinationAddress,
      gaugeConfig.nonEVMDestination,
      gaugeConfig.name,
    ],
  });

  if (deployResult.newlyDeployed) {
    log(
      `MiddlemanGauge deployed at ${deployResult.address} using ${deployResult.receipt.gasUsed} gas on chain ${chainId}`
    );
  }
};

module.exports.tags = ["MiddlemanGauge"];
module.exports.dependencies = ["GaugeRewardsDistributor"];
