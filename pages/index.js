import React, { Component } from 'react';
import * as types from '../redux/types';

import '../styles.scss';

class LandingPage extends Component {
    static async getInitialProps({ req, store }) {
        store.dispatch({
            type: types.CHANGE_PAGE,
            payload: '~'
        });

        const links = [];
        await req.firebaseServer
            .database()
            .ref('recipients')
            .once('value')
            .then(datasnapshot => {
                datasnapshot.forEach(child => {
                    links.push(child.key);
                });
            });

        store.dispatch({
            type: types.GET_RECIPIENTS,
            payload: links
        });
    }

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
