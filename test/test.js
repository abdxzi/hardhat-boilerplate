const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CrowdFund", ()=>{
    let contract, owner;

    before(async () => {
        [owner] = await ethers.getSigners();
        const CrowdFund = await ethers.getContractFactory("CrowdFund");
        contract = await CrowdFund.deploy();
    });

    it('createCampaign()', async ()=>{
        await contract.createCampaign("jgfutfuy")
    });

    it('getCampaignCID()', async ()=> {
        const address = owner.getAddress()
        const a = await contract.getCampaignCID(address, 0);

        expect(a).to.be.eq("jgfutfuy")
    })

})