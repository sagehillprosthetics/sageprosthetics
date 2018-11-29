import React, { Component } from 'react';
import * as types from '../redux/types';
//import { Parallax, Background } from 'react-parallax';
import { Parallax, ParallaxProvider, ParallaxBanner } from 'react-scroll-parallax';
import Accordion from 'grommet/components/Accordion';
import AccordionPanel from 'grommet/components/AccordionPanel';
import Button from 'grommet/components/Button';

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

    renderAccordian = () => {
        return (
            <Accordion
                style={{
                    fontWeight: '400',
                    marginTop: '40px',
                    borderWidth: '0px',
                    width: '60%'
                }}
            >
                <AccordionPanel
                    heading="Our Process"
                    style={{
                        borderWidth: '0px',
                        width: '100%',
                        backgroundColor: 'green'
                    }}
                >
                    <div style={styles.dropdown}>
                        We receive pictures and measurements of our recipients’ arms, and we use that information to
                        model them a custom hand to maximize the hand’s effectiveness and comfort. We can also
                        accommodate for color and design requests. We then print each hand in many parts. After that we
                        carefully assemble them and ship them to our recipients.
                    </div>
                </AccordionPanel>
                <AccordionPanel heading="Who's making the hands?">
                    <div style={styles.dropdown}>
                        We are a dedicated group of students from{' '}
                        <a href="https://www.sagehillschool.org" target="_blank" rel="noopener noreferrer">
                            Sage Hill School
                        </a>{' '}
                        in Southern California who trying to make a difference. You can learn more about our team{' '}
                        <a href="/contact">here</a>.
                    </div>
                </AccordionPanel>
                <AccordionPanel heading="Can I buy one?">
                    <div style={styles.dropdown}>
                        Nope. Sorry, we typically make hands for recipients who are either unable to afford or access
                        traditional prosthesis. On a case by case basis, we will work with recipients who would like a
                        hand under other circumstances, in particular, those who are within our geographic region.
                    </div>
                </AccordionPanel>
                <AccordionPanel heading="How can I become a recipient?">
                    <div style={styles.dropdown}>
                        <a href="/contact">Reach out to us!</a> Tell us your story, and we would be glad to add you as a
                        recipient. We typically make hands for recipients who are either unable to afford or access
                        traditional prosthesis. On a case by case basis, we will work with recipients who would like a
                        hand under other circumstances, in particular, those who are within our geographic region.
                    </div>
                </AccordionPanel>
            </Accordion>
        );
    };

    render() {
        const copy = 'Parallax'.split('');
        return (
            <ParallaxProvider>
                <title> Sage Prosthetics </title>
                <ParallaxBanner
                    layers={[
                        {
                            children: (
                                <div
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        background: 'linear-gradient(160deg, #ffffff, #ffffff, #1d698b)'
                                    }}
                                />
                            ),
                            amount: 0.1,
                            slowerScrollRate: false
                        },
                        {
                            children: (
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        width: '100vw'
                                    }}
                                >
                                    <img
                                        src="/static/printer.png"
                                        style={{ margin: '100px 0 100px 0' }}
                                        alt="gradient"
                                    />
                                </div>
                            ),
                            amount: 0.1,
                            slowerScrollRate: true
                        },
                        {
                            children: (
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        width: '100vw',
                                        fontWeight: '700',
                                        textAlign: 'center',
                                        fontSize: '550%',
                                        margin: '15% 0 0 10px'
                                    }}
                                >
                                    <div
                                        style={{
                                            color: '#7ed4c6',
                                            lineHeight: '100%',
                                            background: '-webkit-linear-gradient(-45deg, #7f5ac5, #558ad2, #75c4a0)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent'
                                        }}
                                    >
                                        WE MAKE <br /> HANDS
                                    </div>
                                </div>
                            ),
                            amount: 0.1,
                            slowerScrollRate: false
                        }
                    ]}
                    style={{
                        height: '700px'
                    }}
                />

                <ParallaxBanner
                    layers={[
                        {
                            children: (
                                <div
                                    style={{
                                        width: '100%',
                                        height: '100%'
                                    }}
                                />
                            ),
                            amount: 0.1,
                            slowerScrollRate: false
                        },
                        {
                            children: (
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        flexDirection: 'column',
                                        width: '100vw',
                                        fontWeight: '700',
                                        textAlign: 'center',
                                        margin: '15% 0 0 10px'
                                    }}
                                >
                                    <div
                                        style={{
                                            lineHeight: '70%',
                                            background: '-webkit-linear-gradient(-45deg, #7f5ac5, #558ad2, #75c4a0)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            fontSize: '300%'
                                        }}
                                    >
                                        WE USE 3D PRINTING TO{' '}
                                    </div>
                                    <div
                                        style={{
                                            fontSize: '500%',
                                            lineHeight: '100%'
                                        }}
                                    >
                                        {' '}
                                        MAKE PROSTHETICS{' '}
                                    </div>
                                    {this.renderAccordian()}
                                </div>
                            ),
                            amount: 0.1,
                            slowerScrollRate: false
                        }
                    ]}
                    style={{
                        height: '820px'
                    }}
                />
                <ParallaxBanner
                    layers={[
                        {
                            children: (
                                <div
                                    style={{
                                        // backgroundImage: url(
                                        //     '/static/backgroundtile.png'
                                        // ),
                                        background: '#000000',
                                        height: '100%',
                                        width: '100vw'
                                        //opacity: '0.7'
                                    }}
                                >
                                    <img
                                        src="/static/video.jpg"
                                        style={{
                                            width: '100vw',
                                            opacity: '0.7'
                                        }}
                                        alt="video"
                                    />
                                    <div
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            zIndex: '2',
                                            background: '#000000',
                                            opacity: '0.7'
                                        }}
                                    />
                                </div>
                            ),
                            amount: 0.1,
                            slowerScrollRate: true
                        },
                        {
                            children: (
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        flexDirection: 'column',
                                        width: '100vw',
                                        color: '#ffffff',
                                        textAlign: 'center',
                                        margin: '15% 0 0 10px'
                                        //backgroundColor: '#000000'
                                    }}
                                >
                                    <div
                                        style={{
                                            fontSize: '12vh',
                                            fontWeight: '600',
                                            lineHeight: '100%'
                                        }}
                                    >
                                        e-NABLE
                                    </div>
                                    <div
                                        style={{
                                            fontSize: '3vh',
                                            fontWeight: '500',
                                            lineHeight: '110%'
                                        }}
                                    >
                                        Connecting people who make hands <br /> with people who need them.
                                    </div>
                                    <Button
                                        label="Learn more about e-NABLE"
                                        href="http://enablingthefuture.org/"
                                        critical={true}
                                        style={{
                                            color: 'white',
                                            margin: '20px'
                                        }}
                                    />
                                </div>
                            ),
                            amount: 0.1,
                            slowerScrollRate: false
                        }
                    ]}
                    style={{
                        height: '600px'
                    }}
                />
            </ParallaxProvider>
        );
    }
}

const styles = {
    dropdown: {
        width: '100%',
        textAlign: 'left',
        margin: '10px 10px 0 20px'
    }
};
export default LandingPage;
