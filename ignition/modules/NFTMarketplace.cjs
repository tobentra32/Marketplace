const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const NFTMarketplaceModule = buildModule("NFTMarketplaceModule", (m) => {
  const nft_marketplace = m.contract("NFTMarketplace");

  return { nft_marketplace };
});

module.exports = NFTMarketplaceModule;




