import React, { Component } from 'react';
import Head from 'next/head';
import Button from 'grommet/components/Button';

import '../styles.scss';

class LandingPage extends Component {
    render() {
        return (
            <div>
                <h1> Sage Prosthetics </h1>
                <h3> Built using Grommet v1 </h3>
            </div>
        );
    }
}

export default LandingPage;
