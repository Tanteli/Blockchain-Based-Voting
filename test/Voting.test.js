const Voting = artifacts.require("Voting");
const { expect } = require('chai');
const { assert } = require('console');
const { BN } = require('@openzeppelin/test-helpers');

contract("Voting", (accounts) => {
    const admin = accounts[0];
    const voter1 = accounts[1];
    const voter2 = accounts[2];
    const voter3 = accounts[3];

    let VotingInstance;
    
    beforeEach(async function () {
        VotingInstance = await Voting.new({from: admin});
      });

    it("Adminstrator should add a Voter to whitelist", async () => {
        

        const isVoterBefore = await VotingInstance.isVoter(voter1, {from: admin});
        expect(isVoterBefore).to.equal(false);

        await VotingInstance.registerVoter(voter1, {from: admin});

        const isVoterAfter = await VotingInstance.isVoter(voter1, {from: admin});
        expect(isVoterAfter).to.equal(true);
    });

    it("Should start proposal registration session", async () => {
        // Given
        let statusBeforeStart = await VotingInstance.status();

        // When
        await VotingInstance.startProposalSession({from: admin});
        let statusAfterStart = await VotingInstance.status();

        // Then
        expect(statusBeforeStart).to.be.bignumber.equal(new BN(0));
        expect(statusBeforeStart).to.be.bignumber.equal(new BN(1));


        
        

        
    })
});