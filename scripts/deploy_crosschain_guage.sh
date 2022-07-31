#!/bin/bash
if [$1 == 'mainnet']; then
    echo "Cannot deploy CrossChainRewarder to Mainnet"
else 
    node scripts/generate_new_wallet.js

    npx hardhat deploy --tags MiddlemanGauge --network mainnet
    npx hardhat deploy --tags CrossChainRewarder --network $1
fi
