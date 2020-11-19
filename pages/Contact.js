import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import * as types from '../redux/types.js';
import { NextSeo } from 'next-seo';

import FormField from 'grommet/components/FormField';
import Button from 'grommet/components/Button';

class Contact extends Component {
    static async getInitialProps({ store }) {
        store.dispatch({
            type: types.CHANGE_PAGE,
            payload: 'c',
        });

        let db = firebase;

        const project = [];
        db.database()
            .ref('projects')
            .once('value')
            .then((datasnapshot) => {
                datasnapshot.forEach((child) => {
                    project.push(child.key);
                });
            });

        const links = [];
        const archive = [];
        await db
            .database()
            .ref('recipients')
            .once('value')
            .then((datasnapshot) => {
                datasnapshot.forEach((child) => {
                    if (child.val().archive == true) {
                        archive.push(child.key);
                    } else {
                        links.push(child.key);
                    }
                });
            });

        store.dispatch({
            type: types.GET_RECIPIENTS,
            payload: { links, archive },
        });

        store.dispatch({
            type: types.GET_PROJECTS,
            payload: project,
        });
    }

    state = {
        name: '',
        email: '',
        message: '',
    };

    renderButtons() {
        if (this.state.name && this.state.email && this.state.message) {
            return (
                <Button
                    label="Submit"
                    type="submit"
                    form="form1"
                    value="Send"
                    accent
                    style={{ margin: '20px 45% 0% 45%', width: '10%' }}
                />
            );
        }

        return <Button label="Submit" accent style={{ margin: '20px 45% 0% 45%', width: '10%' }} />;
    }

    render() {
        return (
            <div style={{ margin: this.props.desktop ? '0% 15% 0% 15%' : '0 0px 0 0px' }}>
                <NextSeo
                    {...{
                        title: 'Contact | Sage Prosthetics',
                        twitter: { title: 'Contact | Sage Prosthetics' },
                        openGraph: {
                            title: 'Contact | Sage Prosthetics',
                        },
                    }}
                />
                <h2 style={{ textAlign: 'center' }}>Contact Us</h2>
                <form
                    action="https://formspree.io/f/xpzolndg"
                    method="POST"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                    }}
                    id="form1"
                >
                    <FormField label="Name" size="medium" help="Required">
                        <input
                            style={{
                                fontWeight: 'lighter',
                                border: 'none',
                            }}
                            type="text"
                            name="name"
                            onChange={(event) => this.setState({ name: event.target.value })}
                        />
                    </FormField>
                    <FormField label="Email Address" size="medium" help="Required">
                        <input
                            style={{
                                fontWeight: 'lighter',
                                border: 'none',
                            }}
                            type="email"
                            name="email"
                            onChange={(event) => this.setState({ email: event.target.value })}
                        />
                    </FormField>

                    <FormField label="Message" size="large" help="Required">
                        <textarea
                            style={{
                                fontWeight: 'lighter',
                                height: '60%',
                                resize: 'none',
                                border: 'none',
                            }}
                            type="text"
                            placeholder="Message"
                            name="message"
                            rows={10}
                            onChange={(event) => this.setState({ message: event.target.value })}
                        />
                    </FormField>

                    {/* <input
                        style={
                            {
                                backgroundColor: '#2B1B76',
                                color: '#ffffff',
                                border: 'none',
                                borderRadius: 4,
                                cursor: 'pointer' ,
                                fontWeight: 'lighter',
                                fontSize: 20,
                                padding: '10px 20px',
                                marginTop: 20
                            } //Should have been avenir-book
                        }
                        type="submit"
                        value="Send"
                    /> */}
                </form>
                {this.renderButtons()}
                {/* <Player
                    playsInline
                    poster="/static/video.jpg"
                    src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                    width={50}
                    fluid={false}
                    preload="auto"
                    muted={true}
                    autoPlay={true}
                    ref="player"
                /> */}
                {/* <ReactPlayer
                    url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
                    playing
                    controls={false}
                    muted
                    config={{
                        youtube: {
                            playerVars: { showinfo: 0, controls: 0 }
                        }
                    }}
                /> */}
            </div>
        );
    }
}

export default Contact;
