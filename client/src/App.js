import React, { useState, useEffect } from "react";
import getWeb3 from "./getWeb3";
import Vote from "./contracts/Vote.json";

import "./App.css";

const App = () => {
  const [balance, setBalance] = useState(0);
  const [ethToSend, setEthToSend] = useState("");
  const [storageValue, setStorageValue] = useState(0);
  const [web3S, setWeb3S] = useState(null);
  const [accountsS, setAccountsS] = useState(null);
  const [contractS, setContractS] = useState(null);

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
      setWeb3S(web3);
      setAccountsS(accounts);
      setContractS(instance);
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

  if (!web3S) {
    return <div>Loading Web3, accounts, and contract...</div>;
  }
  return (
    <div className="App">
      <main className="app-main">
        <div>
          <h1>Hello</h1>
          <p>Your address is {accountsS}</p>
        </div>
      </main>
    </div>
  );
};

export default App;
