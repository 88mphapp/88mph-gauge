const config = require("../../configs/config.json");

module.exports = async ({ deployments, getNamedAccounts, getChainId }) => {
    const { deploy, log, execute } = deployments;
    const { deployer } = await getNamedAccounts();

    const chainId = await getChainId();

    const votingEscrow = await deployments.get("veMPH");

    const deployResult = await deploy("MPHGaugeController", {
        from: deployer,
        log: true,
        args: [config.mphToken, votingEscrow.address],
    });

    if (deployResult.newlyDeployed) {
        log(
            `MPH Gauge Controller deployed at ${deployResult.address} using ${deployResult.receipt.gasUsed} gas on chain --${chainId}`
        );

        // transfer MPHGaugeController admin rights
        await execute(
            "MPHGaugeController",
            { from: deployer },
            "commit_transfer_ownership",
            config.owner
        );
        log("Commit transfer ownership of MPHGaugeController");
        await execute(
            "MPHGaugeController",
            { from: deployer },
            "apply_transfer_ownership"
        );
        log("Apply transfer ownership of MPHGaugeController");
    }
};
module.exports.tags = ["MPHGaugeController"];
module.exports.dependencies = ["veMPH"];
