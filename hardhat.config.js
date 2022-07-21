require("dotenv").config();

require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("solidity-coverage");
require("@nomiclabs/hardhat-vyper");
require("hardhat-deploy");

let secret;

try {
  secret = require("./secret.json");
} catch {
  secret = "";
}

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    compilers: [
			{
				version: "0.8.0",
				settings: {
					optimizer: {
						enabled: true,
						runs: 100000
					}
				  }
			},
			{
				version: "0.6.11",
				settings: {
					optimizer: {
						enabled: true,
						runs: 100000
					}
				  }
			},
			{
				version: "0.7.6",
				settings: {
					optimizer: {
						enabled: true,
						runs: 100000
					}
				  }
			},
			{
				version: "0.8.4",
				settings: {
					optimizer: {
						enabled: true,
						runs: 100000
					}
				  }
			},
			{
				version: "0.8.10",
				settings: {
					optimizer: {
						enabled: true,
						runs: 100000
					}
				  }
			}
		],
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },

  },
  networks: {
    hardhat: {
      forking: {
        url: "http://erigon.dappnode:8545"
      },
      accounts: [{
        privateKey: secret,
        balance: 100e18.toString()
      }]
    },
    mainnet: {
      url: "http://erigon.dappnode:8545",
      chainId: 1,
      accounts: [secret]
    },
    rinkeby: {
      url:
        "https://eth-rinkeby.alchemyapi.io/v2/2LxgvUYd5FzgiXVoAWlq-KyM4v-E7KJ4",
      chainId: 4,
      accounts: [secret]
    },
    polygon: {
      url: "https://polygon-rpc.com",
      chainId: 137,
      accounts: [secret]
    },
    avalanche: {
      url: "https://api.avax.network/ext/bc/C/rpc",
      chainId: 43114,
      accounts: [secret]
    },
    fantom: {
      url: "https://rpc.ftm.tools",
      chainId: 250,
      accounts: [secret]
    }
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  vyper: {
    version: "0.2.12"
  }
};
