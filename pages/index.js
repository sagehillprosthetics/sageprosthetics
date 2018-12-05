import React, { Component } from 'react';
import * as types from '../redux/types';
import posed from 'react-pose';
//import { Parallax, Background } from 'react-parallax';
import { Parallax, ParallaxProvider, ParallaxBanner } from 'react-scroll-parallax';
// import Accordion from 'grommet/components/Accordion';
// import AccordionPanel from 'grommet/components/AccordionPanel';
import { Button } from 'grommet';
import anime from 'animejs';
import Transition from 'react-transition-group/Transition';
import Particles from 'react-particles-js';
import { Router } from '../routes';

//import '../styles.scss';

class LandingPage extends Component {
    state = {
        isVisible: false
    };

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

    componentDidMount() {
        console.log('componentdidmount');
        this.setState({ isVisible: true });
    }

    renderParticles = () => {
        return (
            <Particles
                style={{ height: '40vh' }}
                params={{
                    particles: {
                        number: {
                            value: 70
                        },
                        size: {
                            value: 3
                        },
                        color: {
                            value: '#2cc99d'
                        },
                        move: {
                            enable: true,
                            direction: 'right',
                            out_mode: 'out',
                            bounce: false,
                            speed: 3,
                            attract: {
                                enable: false,
                                rotateX: 0,
                                rotateY: 0
                            }
                        },
                        line_linked: {
                            distance: 140,
                            color: '#2cc99d'
                        }
                    },
                    interactivity: {
                        events: {
                            onhover: {
                                enable: true,
                                mode: 'repulse'
                            }
                        }
                    }
                }}
            >
                HELLO
            </Particles>
        );
    };

    renderAccordian = () => {
        // return (
        //     <Accordion
        //         style={{
        //             fontWeight: '400',
        //             margin: '0 20% 0 20%',
        //             borderWidth: '0px',
        //             width: '60%'
        //         }}
        //     >
        //         <AccordionPanel
        //             heading="Our Process"
        //             style={{
        //                 borderWidth: '0px',
        //                 width: '100%',
        //                 backgroundColor: 'green'
        //             }}
        //         >
        //             <div style={styles.dropdown}>
        //                 We receive pictures and measurements of our recipients’ arms, and we use that information to
        //                 model them a custom hand to maximize the hand’s effectiveness and comfort. We can also
        //                 accommodate for color and design requests. We then print each hand in many parts. After that we
        //                 carefully assemble them and ship them to our recipients.
        //             </div>
        //         </AccordionPanel>
        //         <AccordionPanel heading="Who's making the hands?">
        //             <div style={styles.dropdown}>
        //                 We are a dedicated group of students from{' '}
        //                 <a href="https://www.sagehillschool.org" target="_blank" rel="noopener noreferrer">
        //                     Sage Hill School
        //                 </a>{' '}
        //                 in Southern California who trying to make a difference. You can learn more about our team{' '}
        //                 <a href="/contact">here</a>.
        //             </div>
        //         </AccordionPanel>
        //         <AccordionPanel heading="Can I buy one?">
        //             <div style={styles.dropdown}>
        //                 Nope. Sorry, we typically make hands for recipients who are either unable to afford or access
        //                 traditional prosthesis. On a case by case basis, we will work with recipients who would like a
        //                 hand under other circumstances, in particular, those who are within our geographic region.
        //             </div>
        //         </AccordionPanel>
        //         <AccordionPanel heading="How can I become a recipient?">
        //             <div style={styles.dropdown}>
        //                 <a href="/contact">Reach out to us!</a> Tell us your story, and we would be glad to add you as a
        //                 recipient. We typically make hands for recipients who are either unable to afford or access
        //                 traditional prosthesis. On a case by case basis, we will work with recipients who would like a
        //                 hand under other circumstances, in particular, those who are within our geographic region.
        //             </div>
        //         </AccordionPanel>
        //     </Accordion>
        // );

        return null;
    };

    render() {
        const Animation = posed.div({
            visible: { opacity: 1 },
            hidden: { opacity: 0 }
        });

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
                                <Transition onEnter={animatePrinterIn} timeout={1000} in={this.state.isVisible}>
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            width: '100vw',
                                            opacity: 0
                                        }}
                                        className="printer"
                                    >
                                        <img
                                            src="/static/1-21-squashed.png"
                                            style={{ margin: '150px 0 100px 0', width: '50%', height: '50%' }}
                                            alt="gradient"
                                        />
                                    </div>
                                </Transition>
                            ),
                            amount: 0.1,
                            slowerScrollRate: true
                        },
                        {
                            children: (
                                <Transition onEnter={animateHeadingIn} timeout={0} in={this.state.isVisible}>
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            width: '100vw',
                                            fontWeight: '900',
                                            textAlign: 'center',
                                            fontSize: '367%',
                                            margin: '14% 0 0 10px',
                                            opacity: 0
                                        }}
                                        className="heading"
                                    >
                                        <div
                                            style={{
                                                color: '#7ed4c6',
                                                lineHeight: '100%',
                                                background:
                                                    '-webkit-linear-gradient(left, #9357cc 0%,#2989d8 50%,#2cc99d 100%)',
                                                WebkitBackgroundClip: 'text',
                                                WebkitTextFillColor: 'transparent'
                                            }}
                                        >
                                            WE MAKE <br /> HANDS
                                        </div>
                                    </div>
                                </Transition>
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
                                        justifyContent: 'center',
                                        width: '100vw'
                                    }}
                                >
                                    <div style={{ width: '100vw', padding: '0px', margin: '0px' }}>
                                        <div
                                            style={{
                                                position: 'absolute',
                                                width: '100vw',
                                                height: '40vh'
                                            }}
                                        >
                                            {this.renderParticles()}
                                        </div>
                                        <div
                                            style={{
                                                fontWeight: '700',
                                                textAlign: 'center',
                                                margin: '15% 0 10% 10px',
                                                zIndex: 30
                                            }}
                                        >
                                            <Transition
                                                onEnter={animateSubheadingIn}
                                                timeout={0}
                                                in={this.state.isVisible}
                                            >
                                                <div
                                                    style={{
                                                        lineHeight: '70%',
                                                        background:
                                                            '-webkit-linear-gradient(left, #9357cc 30%,#2989d8 50%,#2cc99d 70%)',
                                                        WebkitBackgroundClip: 'text',
                                                        WebkitTextFillColor: 'transparent',
                                                        fontSize: '300%'
                                                    }}
                                                    className="subheading"
                                                >
                                                    WE USE 3D PRINTING TO{' '}
                                                </div>
                                            </Transition>
                                            <Transition
                                                onEnter={animateMainheadingIn}
                                                timeout={0}
                                                in={this.state.isVisible}
                                            >
                                                <div
                                                    style={{
                                                        fontSize: '500%',
                                                        lineHeight: '100%'
                                                    }}
                                                    className="mainheading"
                                                >
                                                    {' '}
                                                    MAKE PROSTHETICS{' '}
                                                </div>
                                            </Transition>
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            backgroundColor: 'white',
                                            zIndex: '30',
                                            width: '100%',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        {this.renderAccordian()}
                                    </div>
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
                                    <Box
                                        style={{ margin: '40px', padding: '15px', borderWeight: '2px' }}
                                        href="http://enablingthefuture.org/"
                                        onClick={() => (window.location.href = 'http://enablingthefuture.org/')}
                                    >
                                        Learn more about e-NABLE
                                        {/* <Button
                                            label="Learn more about e-NABLE"
                                            critical={true}
                                            style={{ color: '#ffffff' }}
                                        /> */}
                                    </Box>
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

const Box = posed.button({
    hoverable: true,
    init: {
        borderColor: '#FFFFFF',
        color: '#ffffff',
        backgroundColor: 'rgb(0,0,0,0)'
    },
    hover: {
        //borderColor: '#000000',
        color: '#000000',
        backgroundColor: '#ffffff'
    }
});

const animateMainheadingIn = mainheading => {
    return anime({
        targets: mainheading,
        opacity: {
            value: [0, 1]
        },
        filter: ['blur(7px)', 'blur(0px)'],
        translateY: [500, 0],
        rotate: {
            value: [90, 0]
        },
        easing: 'easeOutQuint',
        duration: 1000
    });
};

const animateSubheadingIn = subheading => {
    return anime({
        targets: subheading,
        opacity: {
            value: [0, 1]
        },
        filter: ['blur(7px)', 'blur(0px)'],
        scale: {
            value: [10, 1]
        },
        easing: 'easeOutQuint',
        duration: 800
    });
};

const animatePrinterIn = printer => {
    console.log('something happened');
    return anime({
        targets: printer,
        opacity: {
            value: [0, 1]
        },
        filter: ['blur(7px)', 'blur(0px)'],
        scale: {
            value: 1.3
        },
        easing: 'easeOutQuint',
        duration: 1800
    });
};

const animateHeadingIn = heading => {
    console.log('something happened');
    return anime({
        targets: heading,
        opacity: {
            value: [0, 1]
        },
        filter: ['blur(7px)', 'blur(0px)'],
        scale: {
            value: 1.4,
            duration: 1800
        },
        translateY: -15,
        easing: 'easeOutQuart',
        duration: 1900
    });
};

const styles = {
    dropdown: {
        width: '100%',
        textAlign: 'left',
        margin: '10px 10px 0 20px'
    }
};
export default LandingPage;
