import React from 'react';
import { Provider } from 'react-redux';
import App, { Container } from 'next/app';
import withRedux from 'next-redux-wrapper';
import { initStore } from '../redux/store';
import Layout from '../components/Layout';

// import * as firebase from 'firebase';
// import * as types from '../redux/types';
//import { initGA, logPageView } from '../components/general/analytics';

//Custom app.js to add Redux and a universal toolbar --> DO NOT RENAME
export default withRedux(initStore)(
    class MyApp extends App {
        static async getInitialProps({ Component, ctx }) {
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
                        <>
                            <Layout>
                                <Component {...pageProps} />
                            </Layout>
                        </>
                    </Provider>
                </Container>
            );
        }
    }
);
