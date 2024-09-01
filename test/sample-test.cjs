
// We import Chai to use its asserting functions here.
const { expect } = require("chai");

const { ethers } = require("hardhat");

// We use `loadFixture` to share common setups (or fixtures) between tests.
// Using this simplifies your tests and makes them run faster, by taking
// advantage of Hardhat Network's snapshot functionality.
const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");

// `describe` is a Mocha function that allows you to organize your tests.
// Having your tests organized makes debugging them easier. All Mocha
// functions are available in the global scope.
//
// `describe` receives the name of a section of your test suite, and a
// callback. The callback must define the tests of that section. This callback
// can't be an async function.
describe("NFTMarketplace contract", function () {
  // We define a fixture to reuse the same setup in every test. We use
  // loadFixture to run this setup once, snapshot that state, and reset Hardhat
  // Network to that snapshot in every test.
  async function deployMarketplaceFixture() {
    // Get the Signers here.
    const [owner, addr1, addr2] = await ethers.getSigners();

    // To deploy our contract, we just have to call ethers.deployContract and await
    // its waitForDeployment() method, which happens once its transaction has been
    // mined.
    const marketplace = await ethers.deployContract("NFTMarketplace");

    await marketplace.waitForDeployment();

    console.log("marketplace:", marketplace);

    console.log("Marketplace deployed to:", marketplace.address);

    // Fixtures can return anything you consider useful for your tests
    return { marketplace, owner, addr1, addr2 };
  }

  it("Should set the right owner", async function () {
    
    
    // We use loadFixture to setup our environment, and then assert that
    // things went well
    const { marketplace, owner } = await loadFixture(deployMarketplaceFixture);

    console.log("marketplace:", marketplace);

    // `expect` receives a value and wraps it in an assertion object. These
    // objects have a lot of utility methods to assert values.

    // This test expects the owner variable stored in the contract to be
    // equal to our Signer's owner.
    expect(await marketplace.owner()).to.equal(owner.address);
  });

  it("Should update the listing price", async function () {
    const newListingPrice = ethers.parseEther("0.05");
    await marketplace.updateListingPrice(newListingPrice);
    expect(await marketplace.getListingPrice()).to.equal(newListingPrice);
  }); 

});