import React from 'react';
import { Provider } from 'react-redux';
import App from 'next/app';
import withRedux from 'next-redux-wrapper';
import firebase from 'firebase/app';
import 'firebase/database';
import { DefaultSeo } from 'next-seo';

import { initStore } from '../redux/store';
import Layout from './Layout';
import '../styles.scss';
var parser = require('ua-parser-js');

const dotenv = require('dotenv')
dotenv.config()

if (!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: 'AIzaSyDNWlq6ySNKkgBVuTSPT3BHJ3s6gPzMjSc',
        authDomain: 'sagehill-prosthetics',
        databaseURL: 'https://sagehill-prosthetics-default-rtdb.firebaseio.com/',
        projectId: 'sagehill-prosthetics.firebaseapp.com',
        storageBucket: 'sagehill-prosthetics.appspot.com',
        messagingSenderId: 588474158817
    });
}

const DEFAULT_SEO = {
    title: 'Sage Prosthetics - 3D Printed Custom Prosthetics',
    description:
        'A student-run service group that uses 3D printing to make custom prosthetics for those in need. All of the prosthetics are made by hand using open-source designs in collaboration with E-Nable.',
    openGraph: {
        type: 'website',
        locale: 'en_IE',
        url: 'https://www.sageprosthetics.org/',
        title: 'Sage Prosthetics - 3D Printed Custom Prosthetics',
        description:
            'A student-run service group that uses 3D printing to make custom prosthetics for those in need. All of the prosthetics are made by hand using open-source designs in collaboration with E-Nable.',
        image: '/static/favicon.png',
        site_name: 'Sage Prosthetics',
        imageWidth: 1200,
        imageHeight: 1200,
    },
    twitter: {
        title: 'Sage Prosthetics - 3D Printed Custom Prosthetics',
        cardType: 'summary_large_image',
        description:
            'A student-run service group that uses 3D printing to make custom prosthetics for those in need. All of the prosthetics are made by hand using open-source designs in collaboration with E-Nable.',
    },
};

//Custom app.js to add Redux and a universal toolbar --> DO NOT RENAME
export default withRedux(initStore)(
    class MyApp extends App {
        static async getInitialProps({ Component, ctx, req, query, store }) {
            const ua = parser(ctx.req ? ctx.req.headers['user-agent'] : navigator.userAgent);
            return {
                pageProps: {
                    ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
                    desktop: ua.device.type != 'mobile',
                },
            };
        }

        render() {
            const { Component, pageProps, store } = this.props;
            return (
                <>
                    <DefaultSeo {...DEFAULT_SEO} />
                    <Provider store={store}>
                        <Layout desktop={pageProps.desktop}>
                            <Component {...pageProps} />
                        </Layout>
                    </Provider>
                </>
            );
        }
    }
);
