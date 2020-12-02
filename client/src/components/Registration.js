import React, { useState } from 'react'
import { FormControl, FormGroup } from 'react-bootstrap';
import Table from "react-bootstrap/Table";

function Registration(props) {

    const [address, setAddress] = useState([]);
    const [isRegistered, setIsRegistered] = useState(false);
    const [hasVoted, setHasVoted] = useState(false);
    const [voteProposalId, setVoteProposalId] = useState(0);

    const addresses = [
        { address: "0x0ff765a6E" },
        { address: "1x76876875D" },
        { address: "0x9979f7cD5" }
    ]

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(address);
        setAddress(address);

        // Interaction avec le smart contract pour ajouter un compte
        //await contract.methods.whitelist(address).send({ from: accounts[0] });
        // Récupérer la liste des comptes autorisés
        //this.runInit();
    }

    return (

        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Voter Address</th>
                    </tr>
                </thead>
                <tbody>
                    {addresses !== null && addresses.map((add, i) => (
                            <tr key={i}>
                                <td>{i} - {add.address}</td>
                            </tr>
                        ))}
                </tbody>
            </Table>
            <form onSubmit={handleSubmit}>
                <h3>Insert A New Voter</h3>
                <p>{address}</p>
                <div class="form-group row">
                    <label htmlFor="inputEmail3" class="col-sm-2 col-form-label">Address</label>
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

export default Registration
