import React from 'react';
import { Provider } from 'react-redux';
import App, { Container } from 'next/app';
import withRedux from 'next-redux-wrapper';
import * as firebase from 'firebase';

import '../styles.scss';
import { initStore } from '../redux/store';
import Layout from './Layout';
import * as types from '../redux/types';

if (!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: 'AIzaSyBn97XtxibfzEfqvY9-xUdJ26xHT7wSIg0',
        authDomain: 'sage-prosthetics.firebaseapp.com',
        databaseURL: 'https://sage-prosthetics.firebaseio.com',
        projectId: 'sage-prosthetics',
        storageBucket: 'sage-prosthetics.appspot.com',
        messagingSenderId: '62889057271'
    });
}

// import * as types from '../redux/types';
//import { initGA, logPageView } from '../components/general/analytics';

//Custom app.js to add Redux and a universal toolbar --> DO NOT RENAME
export default withRedux(initStore)(
    class MyApp extends App {
        static async getInitialProps({ Component, ctx, req, query, store }) {
            // store.dispatch({ type: types.GET_RECIPIENTS, payload: 'help' });

            return {
                pageProps: Component.getInitialProps
                    ? await Component.getInitialProps(ctx)
                    : {}
            };
        }

        // componentDidMount() {
        //     initGA();
        //     logPageView();
        // }

        render() {
            const { Component, pageProps, store } = this.props;

            return (
                <Container>
                    <Provider store={store}>
                        <Layout>
                            <Component {...pageProps} />
                        </Layout>
                    </Provider>
                </Container>
            );
        }
    }
);
