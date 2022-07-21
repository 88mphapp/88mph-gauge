const config = require("../../configs/config.json");

module.exports = async ({ deployments, getNamedAccounts, getChainId }) => {
    const { deploy, log, execute } = deployments;
    const { deployer } = await getNamedAccounts();
    const chainId = await getChainId();

    const deployResult = await deploy("veMPH", {
        from: deployer,
        log: true,
        args: [
            config.mphBPT,
            config.veMPH.name,
            config.veMPH.symbol,
            config.veMPH.version,
        ],
    });

    if (deployResult.newlyDeployed) {
        log(
            `Voting Escrow deployed at ${deployResult.address} using ${deployResult.receipt.gasUsed} gas on chain ${chainId}`
        );

        // transfer veMPH admin rights
        await execute(
            "veMPH",
            { from: deployer },
            "commit_transfer_ownership",
            config.owner
        );
        log("Commit transfer ownership of veMPH");
        await execute("veMPH", { from: deployer }, "apply_transfer_ownership");
        log("Apply transfer ownership of veMPH");
    }
};

module.exports.tags = ["veMPH"];
module.exports.dependencies = [];
