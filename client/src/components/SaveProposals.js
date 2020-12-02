import React, { useState } from 'react'
import { FormControl, FormGroup } from 'react-bootstrap';
import Table from "react-bootstrap/Table";

function SaveProposals() {

    const [proposal, setProposal] = useState("");
    const [address, setAddress] = useState("");

    const proposals = [
        { description: "Build a new road in town" },
        { description: "Repair the bridge" },
        { description: "Add more lights on the streets" }
    ]

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(address);
        setAddress("");

        // Interaction avec le smart contract pour ajouter un compte
        //await contract.methods.whitelist(address).send({ from: accounts[0] });
        // Récupérer la liste des comptes autorisés
        //this.runInit();
    }

    return (
        <div style={{paddingLeft: "20px"}}>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Voter Address</th>
                </tr>
            </thead>
            <tbody>
                {proposals !== null && proposals.map((proposal, i) => (
                        <tr key={i}>
                            <td>{i} - {proposal.description}</td>
                        </tr>
                    ))}
            </tbody>
        </Table>
        <form onSubmit={handleSubmit}>
            <h3>Add a proposal</h3>
            <div class="form-group row">
                <label for="inputEmail3" class="col-sm-2 col-form-label">Proposal Description</label>
                <div class="col-sm-10">
                    <input
                        type="text"
                        value={address}
                        placeholder="0x123456"
                        class="form-control"
                        id="inputAddress"
                        onChange={(e) => setAddress(e.target.value)} />
                </div>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
    )
}

export default SaveProposals
