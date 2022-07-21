const config = require("../../configs/config.json");

module.exports = async ({ deployments, getNamedAccounts, getChainId }) => {
    const { deploy, log } = deployments;
    const { deployer, owner } = await getNamedAccounts();

    const chainId = await getChainId();

    const veMPH = await deployments.get("veMPH");

    const deployResult = await deploy("veMPHYieldDistributorV4", {
        from: deployer,
        log: true,
        args: [config.owner, config.mphToken, config.timelock, veMPH.address],
    });

    if (deployResult.newlyDeployed) {
        log(
            `veMPHYieldDistributorV4 deployed at ${deployResult.address} using ${deployResult.receipt.gasUsed} gas on chain --${chainId}`
        );
    }
};

module.exports.tags = ["veMPHYieldDistributorV4"];
module.exports.dependencies = ["veMPH"];
