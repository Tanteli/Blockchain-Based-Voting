// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Voting is Ownable {

    mapping(address => bool) public whiteList;

    function registerVoter (address _voterAddress) public onlyOwner returns (bool) {
        whiteList[_voterAddress] = true;
        return true;
    }

    function isVoter (address _address) public view returns (bool) {
        return whiteList[_address];
    }
  
}
