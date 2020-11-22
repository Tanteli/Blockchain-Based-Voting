pragma solidity 0.6.11;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Voting is Ownable {
      
    mapping(address => Voter) public whiteList;
    
    Proposal[] public proposals;
    
    uint winningProposalId;
    
    enum WorkflowStatus {
        RegisteringVoters,
        ProposalsRegistrationStarted,
        ProposalsRegistrationEnded,
        VotingSessionStarted,
        VotingSessionEnded,
        VotesTallied
    }
    
    WorkflowStatus public status;
    
    WorkflowStatus previousStatus;
    
    struct Voter {
        bool isRegistered;
        bool hasVoted;
        uint votedProposalId;
    }
    
    struct Proposal {
        string description;
        uint voteCount;
    }
    
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

function registration(address _address) external onlyOwner {
    require(whiteList[_address].isRegistered == false, "Already registred");
    Voter memory newVoter = Voter(true, false, 0);
    whiteList[_address] = newVoter;
    status = WorkflowStatus.RegisteringVoters;
    
    emit VoterRegistered(_address);
}

function openProposalRegistration() external onlyOwner  {
    require(status == WorkflowStatus.RegisteringVoters);
    status = WorkflowStatus.ProposalsRegistrationStarted;
    
    emit ProposalsRegistrationStarted();
    emit WorkflowStatusChange(previousStatus, status);
    
    previousStatus = WorkflowStatus.ProposalsRegistrationStarted;
}

function saveProposal(string memory _proposalDescription) external {
    require(status == WorkflowStatus.ProposalsRegistrationStarted, "Registration session has not started yet");
    require(status != WorkflowStatus.ProposalsRegistrationEnded);
    require(whiteList[msg.sender].isRegistered == true, "You should be registred to save a proposal");
    require(whiteList[msg.sender].hasVoted = false, "You have already voted");
    Proposal memory proposal = Proposal(_proposalDescription, 0);
    proposals.push(proposal);
    status = WorkflowStatus.ProposalsRegistrationStarted;
    
    emit ProposalRegistered(proposals.length);
    emit WorkflowStatusChange(previousStatus, status);
    
    previousStatus = WorkflowStatus.ProposalsRegistrationStarted;
    
}

function closeProposalRegistration() external onlyOwner {
    require(status == WorkflowStatus.ProposalsRegistrationStarted);
    status = WorkflowStatus.ProposalsRegistrationEnded;
    
    emit ProposalsRegistrationEnded();
    emit WorkflowStatusChange(previousStatus, status);
    
    previousStatus = WorkflowStatus.ProposalsRegistrationEnded;
}

function openVoteSession() external onlyOwner {
    require(status == WorkflowStatus.ProposalsRegistrationEnded);
    status = WorkflowStatus.VotingSessionStarted;
    
    emit VotingSessionStarted();
    emit WorkflowStatusChange(previousStatus, status);
    
    previousStatus = WorkflowStatus.VotingSessionStarted;
}
function vote(uint _proposalId) external {
    require(status == WorkflowStatus.VotingSessionStarted);
    require(whiteList[msg.sender].hasVoted == false);
    
    proposals[_proposalId].voteCount++;
    emit Voted (msg.sender,_proposalId);
    whiteList[msg.sender].hasVoted = true;
    
}

function endVoteSession() external onlyOwner {
    require(status == WorkflowStatus.VotingSessionStarted);
    status = WorkflowStatus.VotingSessionEnded;
    
    emit VotingSessionEnded();
}

function countVotes() external onlyOwner returns (uint)  {
    require(status == WorkflowStatus.VotingSessionEnded);
    emit VotesTallied();
    
    return proposals.length;
}
    
}