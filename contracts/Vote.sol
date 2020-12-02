// SPDX-License-Identifier: MIT
pragma solidity 0.6.11;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Vote is Ownable {

    enum WorkflowStatus {
        RegisteringVoters,
        ProposalsRegistrationStarted,
        ProposalsRegistrationEnded,
        VotingSessionStarted,
        VotingSessionEnded,
        VotesTallied
    }

    struct Voter {
        bool isRegistered;
        bool hasVoted;
        uint votedProposalId;
    }
    
    struct Proposal {
        string description;
        uint voteCount;
    }

    WorkflowStatus public status;
      
    mapping(address => Voter) public whiteList;
    
    Proposal[] public proposals;
    
    uint winningProposalId;      
    
    WorkflowStatus previousStatus;    
    
    event VoterRegistered(address voterAddress);
    event ProposalsRegistrationStarted();
    event ProposalsRegistrationEnded();
    event ProposalRegistered(uint proposalId);
    event VotingSessionStarted();
    event VotingSessionEnded();
    event Voted (address voter, uint proposalId);
    event VotesTallied();
    event WorkflowStatusChange(WorkflowStatus previousStatus, WorkflowStatus
    newStatus);

    constructor() public {
        status = WorkflowStatus.RegisteringVoters;
    }

    function registration(address _address) external onlyOwner {
        require(status == WorkflowStatus.RegisteringVoters, "Registering period over");
        require(whiteList[_address].isRegistered == false, "Already registred");
        Voter memory newVoter = Voter(true, false, 0);
        whiteList[_address] = newVoter;    
        
        emit VoterRegistered(_address);
    }

    function isVoter(address _address) public view onlyOwner returns(bool) {
            return whiteList[_address].isRegistered;
        }

    function openProposalRegistration() external onlyOwner  {
        require(status == WorkflowStatus.RegisteringVoters, "A session is already in progress");
        status = WorkflowStatus.ProposalsRegistrationStarted;
        previousStatus = WorkflowStatus.ProposalsRegistrationStarted;
        
        emit ProposalsRegistrationStarted();
        emit WorkflowStatusChange(previousStatus, status);        
    }

    function saveProposal(string memory _proposalDescription) external {
        require(status == WorkflowStatus.ProposalsRegistrationStarted, "Registration session has ended or not started yet");
        require(whiteList[msg.sender].isRegistered == true, "You should be registred to save a proposal");
        Proposal memory proposal = Proposal(_proposalDescription, 0);
        proposals.push(proposal);
        status = WorkflowStatus.ProposalsRegistrationStarted;
        previousStatus = WorkflowStatus.ProposalsRegistrationStarted;
        
        emit ProposalRegistered(proposals.length);
        emit WorkflowStatusChange(previousStatus, status);    
    }

    function closeProposalRegistration() external onlyOwner {
        require(status == WorkflowStatus.ProposalsRegistrationStarted, "No session to end");
        status = WorkflowStatus.ProposalsRegistrationEnded;
        previousStatus = WorkflowStatus.ProposalsRegistrationEnded;
        
        emit ProposalsRegistrationEnded();
        emit WorkflowStatusChange(previousStatus, status);   
    }

    function openVoteSession() external onlyOwner {
        require(status == WorkflowStatus.ProposalsRegistrationEnded, "A voting or proposal session is already in progress");
        status = WorkflowStatus.VotingSessionStarted;
        previousStatus = WorkflowStatus.VotingSessionStarted;
        
        emit VotingSessionStarted();
        emit WorkflowStatusChange(previousStatus, status);    
    }

    function addVote(uint8 _proposalId) external {
        require(status == WorkflowStatus.VotingSessionStarted, "Registration session has ended or not started yet");
        require(whiteList[msg.sender].hasVoted == false, "You have already voted");
        whiteList[msg.sender].hasVoted = true;    
        proposals[_proposalId].voteCount++;

        emit Voted (msg.sender,_proposalId);    
    }

    function endVoteSession() external onlyOwner {
        require(status == WorkflowStatus.VotingSessionStarted, "No session to end");
        status = WorkflowStatus.VotingSessionEnded;
        
        emit VotingSessionEnded();
    }

    function getWinningPorposal() external onlyOwner returns (uint) {
        require(status == WorkflowStatus.VotingSessionEnded, "Voting session not closet yet");
        uint winningVoteCount;
        for (uint i = 0; i < proposals.length; i++) {
            if (proposals[i].voteCount > winningVoteCount) {
                winningVoteCount = proposals[i].voteCount;
                winningProposalId = i;
            }
        }

        emit VotesTallied(); 

    }
    
}