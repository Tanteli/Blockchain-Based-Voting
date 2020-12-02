import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
    return (
        <div>
            {/* <Link to='/' className="heading">HOME</Link>
            <Link to='/SaveProposals' className="heading">SAVE PROPOSALS</Link>
            <Link to='/Vote' className="heading">VOTE</Link>
            <Link to='/Results' className="heading">RESULTS</Link>            
            */}

            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <a class="navbar-brand" href="/">Home</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item active">
                            <a class="nav-link" href="/SaveProposals">SAVE PROPOSALS <span class="sr-only"></span></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/Vote">VOTE</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/Results">RESULTS</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>


    )
}

export default Navigation
