import React, { Component } from 'react';
import * as types from '../redux/types';
import { Parallax, Background } from 'react-parallax';

import '../styles.scss';

class LandingPage extends Component {
    static async getInitialProps({ req, store }) {
        store.dispatch({
            type: types.CHANGE_PAGE,
            payload: '~'
        });

        const project = [];
        req.firebaseServer
            .database()
            .ref('projects')
            .once('value')
            .then(datasnapshot => {
                datasnapshot.forEach(child => {
                    project.push(child.key);
                });
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

        store.dispatch({
            type: types.GET_PROJECTS,
            payload: project
        });
    }
    /*
linear-gradient(160deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 46%, rgb(29, 105, 139) 100%, rgb(29, 105, 139) 100%);
*/
    render() {
        return (
            <div style={{ marginTop: '0%' }}>
                <Parallax blur={0} strength={400}>
                    <Background
                        className="custom-bg"
                        bgStyle={{
                            backgroundColor: 'yellow',
                            width: '100vw',
                            height: '70vh',
                            borderWidth: '20px',
                            borderColor: 'blue'
                        }}
                    >
                        {/* <img
                            style={{
                                marginTop: '200px',
                                backgroundColor: 'yellow',
                                width: '100%'
                            }}
                            src="/static/printer.png"
                            alt="printer"
                        /> */}
                        <div
                            style={{
                                backgroundColor: '',
                                width: '100vw',
                                height: '70vh'
                            }}
                        />
                    </Background>
                    <div
                        style={{
                            height: '700px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <h1
                            style={{
                                fontWeight: 'bold',
                                color: '#7ed4c6',
                                textAlign: 'center',
                                width: '100%',
                                fontSize: '100px'
                            }}
                        >
                            <div>WE MAKE</div>
                            <div>HANDS</div>
                        </h1>
                    </div>
                </Parallax>
                <hr />
                <Parallax
                    blur={0}
                    bgImage={'/static/printer.png'}
                    bgImageAlt="the cat"
                    strength={200}
                >
                    Put some text content here - even an empty div with fixed
                    dimensions to have a height for the parallax.
                    <div style={{ height: '600px' }} />
                </Parallax>
            </div>
        );
    }
}

const styles = {
    title: {}
};

export default LandingPage;
