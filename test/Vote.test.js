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

    const enums = {
        RegisteringVoters: 0,
        ProposalsRegistrationStarted: 1,
        ProposalsRegistrationEnded: 2,
        VotingSessionStarted: 3,
        VotingSessionEnded: 4,
        VotesTallied: 5
}               
        
    beforeEach(async function () {
        VotingInstance = await Voting.new({from: admin});
      });

    it("Adminstrator should add a Voter to whitelist", async () => {
        // Given
        const isVoterBefore = await VotingInstance.isVoter(voter1, {from: admin});
        expect(isVoterBefore).to.equal(false);

        // When
        await VotingInstance.registerVoter(voter1, {from: admin});
        const isVoterAfter = await VotingInstance.isVoter(voter1, {from: admin});

        // Then
        expect(isVoterAfter).to.equal(true);
    });

    it("Administrator should start proposal registration session", async () => {
        // Given
        let statusBeforeStart = await VotingInstance.workflowStatus();

        // When
        await VotingInstance.startProposalSession({from: admin});
        let statusAfterStart = await VotingInstance.workflowStatus();
        console.debug("/////VOTE STATUS///////", statusAfterStart);

        // Then
        expect(statusBeforeStart).to.be.bignumber.equal(new BN(0));
        expect(statusAfterStart).to.be.bignumber.equal(new BN(1));            
    })

    it("Voter should register a proposal", async () => {
        // Given
        await VotingInstance.registerProposal("Clean the road");

        // When        
        
        let proposals = await VotingInstance.proposals(0);
        console.debug("/////PROPOSALS///////", proposals);

        // Then    
        expect(proposals.description).to.equal("Clean the road");  
    })

    it("Administrator should end proposal", async () => {
        // Given
        let statusBeforeProposalEnd = enums.ProposalsRegistrationStarted;
        console.debug("/////STATUS BEFORE END///////", statusBeforeProposalEnd);
       
        // When
        await VotingInstance.closeProposalRegistration();
        let statusAfterProposalEnd = enums.ProposalsRegistrationEnded;

        // Then     
        expect(statusBeforeProposalEnd).to.equal(1);
        expect(statusAfterProposalEnd).to.equal(2);

    })


});