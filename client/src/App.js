import React, { useState, useEffect } from "react";
import getWeb3 from "./getWeb3";
import Vote from "./contracts/Vote.json";

import "./App.css";
import HomePage from "./components/HomePage";

const App = (props) => {
  const [balance, setBalance] = useState(0);
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [contract, setContract] = useState(null);
  const [owner, setOwner] = useState("");

  async function init() {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Vote.networks[networkId];
      const instance = new web3.eth.Contract(
        Vote.abi,
        deployedNetwork && deployedNetwork.address

        
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      setWeb3(web3);
      setAccounts(accounts);
      setContract(instance);
      setOwner(await instance.methods.owner().call());
            

    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  }

  useEffect(() => {
    init();
  }, []);

  if (!web3) {
    return <div>Loading Web3, accounts, and contract...</div>;
  }
  return (
    <div className="App">
      <p>Owner = {owner}</p>
      <HomePage address={accounts}/>     
    </div>
  );
};

export default App;
