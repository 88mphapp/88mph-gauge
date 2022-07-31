const config = require("../../configs/config.json");

module.exports = async ({ deployments, getNamedAccounts, getChainId }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  const chainId = await getChainId();
  const isMainnet = chainId == "1";

  let deployResult;

  if (!isMainnet) {
    deployResult = await deploy("CrossChainRewarder", {
      from: deployer,
      log: true,
      args: [config.owner, config.curator, config.rewardToken],
    });
  }
  if (deployResult.newlyDeployed) {
    log(
      `CrosschainRewarder deployed at ${deployResult.address} using ${deployResult.receipt.gasUsed} gas on chain ${chainId}`
    );
  }
};

module.exports.tags = ["CrossChainRewarder"];
module.exports.dependencies = [];
