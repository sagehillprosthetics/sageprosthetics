import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

//Custom index.HTML document to add the custom stylesheet --> DO NOT RENAME
export default class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link rel="stylesheet" href="/_next/static/style.css" />
                    <link rel="shortcut icon" type="image/png" href="/static/favicon.png" />

                    <link
                        href="https://fonts.googleapis.com/css?family=Titillium+Web:300,400,700"
                        rel="stylesheet"
                    />
                    <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" />
                    <script src="//widget.cloudinary.com/global/all.js" type="text/javascript" />

                    {/* <meta
                        name="google-site-verification"
                        content="ezst5eCOpUnm7J4ltiOHnEnjC797eCw7t1hC1NZSOLg"
                    /> */}
                </Head>
                <style jsx global>{`
                    body {
                    }
                `}</style>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
