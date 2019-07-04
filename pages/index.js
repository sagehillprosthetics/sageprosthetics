import React, { Component } from 'react';
import posed from 'react-pose';
import { ParallaxProvider, ParallaxBanner } from 'react-scroll-parallax';
import Accordion from 'grommet/components/Accordion';
import AccordionPanel from 'grommet/components/AccordionPanel';
import anime from 'animejs';
import Transition from 'react-transition-group/Transition';
import Particles from 'react-particles-js';
import firebase from 'firebase/app';
import 'firebase/database';
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
import ReactPlayer from 'react-player';

import '../styles.scss';
import * as types from '../redux/types';

class LandingPage extends Component {
    state = {
        isVisible: false,
        expanded: false,
        desktop: true
    };

    static async getInitialProps({ req, store }) {
        store.dispatch({
            type: types.CHANGE_PAGE,
            payload: '~'
        });

        let db = firebase;

        const project = [];
        db.database()
            .ref('projects')
            .once('value')
            .then(datasnapshot => {
                datasnapshot.forEach(child => {
                    project.push(child.key);
                });
            });

        const links = [];
        const archive = [];
        await db
            .database()
            .ref('recipients')
            .once('value')
            .then(datasnapshot => {
                datasnapshot.forEach(child => {
                    if (child.val().archive == true) {
                        archive.push(child.key);
                    } else {
                        links.push(child.key);
                    }
                });
            });

        store.dispatch({
            type: types.GET_RECIPIENTS,
            payload: { links, archive }
        });

        store.dispatch({
            type: types.GET_PROJECTS,
            payload: project
        });
    }

    componentDidMount() {
        this.setState({ isVisible: true, desktop: isBrowser });
    }

    renderParticles = () => {
        return (
            <Transition onEnter={animateParticles} timeout={4000} in={this.state.isVisible}>
                <Particles
                    className="particles"
                    style={{ height: '40vh', position: 'absolute', top: '80px' }}
                    params={{
                        particles: {
                            number: {
                                value: 100
                            },
                            size: {
                                value: 4,
                                random: true
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
                                random: false,
                                attract: {
                                    enable: false,
                                    rotateX: 0,
                                    rotateY: 0
                                }
                            },
                            line_linked: {
                                distance: 120,
                                color: '#2cc99d',
                                opacity: 0.9,
                                width: 1.3
                            }
                        },
                        interactivity: {
                            events: {
                                onhover: {
                                    enable: true,
                                    mode: 'repulse'
                                }
                            },
                            modes: {
                                repulse: {
                                    distance: 100,
                                    duration: 1
                                }
                            }
                        },
                        retina_detect: true
                    }}
                />
            </Transition>
        );
    };

    renderAccordion = () => {
        return (
            <Accordion
                style={{
                    fontWeight: '400',
                    margin: '0 20% 0 20%',
                    borderWidth: '0px',
                    width: '60%'
                }}
                onActive={() => this.setState({ expanded: !this.state.expanded })}
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
                        We receive pictures and measurements of our recipients’ arms, and we use
                        that information to model them a custom hand to maximize the hand’s
                        effectiveness and comfort. We can also accommodate for color and design
                        requests. We then print each hand in many parts. After that we carefully
                        assemble them and ship them to our recipients.
                    </div>
                </AccordionPanel>
                <AccordionPanel heading="Who's making the hands?">
                    <div style={styles.dropdown}>
                        We are a dedicated group of students from{' '}
                        <a
                            href="https://www.sagehillschool.org"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Sage Hill School
                        </a>{' '}
                        in Southern California who trying to make a difference. You can learn more
                        about our team <a href="/group">here</a>.
                    </div>
                </AccordionPanel>
                <AccordionPanel heading="Can I buy one?">
                    <div style={styles.dropdown}>
                        Nope. Sorry, we typically make hands for recipients who are either unable to
                        afford or access traditional prosthesis. On a case by case basis, we will
                        work with recipients who would like a hand under other circumstances, in
                        particular, those who are within our geographic region.
                    </div>
                </AccordionPanel>
                <AccordionPanel heading="How can I become a recipient?">
                    <div style={styles.dropdown}>
                        <a href="/contact">Reach out to us!</a> Tell us your story, and we would be
                        glad to add you as a recipient. We typically make hands for recipients who
                        are either unable to afford or access traditional prosthesis. On a case by
                        case basis, we will work with recipients who would like a hand under other
                        circumstances, in particular, those who are within our geographic region.
                    </div>
                </AccordionPanel>
                <AccordionPanel heading="I have a 3D Printer and want to make hands like this, how do I start?">
                    <div style={styles.dropdown}>
                        <a href="http://enablealliance.org/education/">
                            http://enablealliance.org/education/
                        </a>
                        <br />
                        <br />
                        This website is under construction and will be filled with valuable
                        resources and information for those that are interested in learning more
                        about getting e-NABLE projects into STEM based learning environments!
                        <br />
                        <br />
                        For now, go to{' '}
                        <a href="http://enablingthefuture.org">EnablingTheFuture.org</a> or{' '}
                        <a href="http://e-nable.org">e-NABLE.org</a> or{' '}
                        <a href="https://wikifactory.com/+e-NABLE">wikifactory.org/+e-NABLE</a>, get
                        a badge for making the Phoenix, and you can eventually use{' '}
                        <a href="https://www.enablewebcentral.com/">EnableWebCentral.com</a> to seek
                        a recipient to work with.
                        <br />
                        <br />
                        You should also get involved with the e-NABLE Facebook groups as those
                        provide valuable information and discussion
                    </div>
                </AccordionPanel>
                <AccordionPanel heading="I am an educator/student and want to start a chapter like this. How do I begin?">
                    <div style={styles.dropdown}>Same answer as above!</div>
                </AccordionPanel>
            </Accordion>
        );
    };

    render() {
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
                                        background:
                                            'linear-gradient(160deg, #ffffff, #ffffff, #1d698b)'
                                    }}
                                />
                            ),
                            amount: 0.1,
                            slowerScrollRate: false
                        },
                        {
                            children: (
                                <Transition
                                    onEnter={animatePrinterIn}
                                    timeout={1000}
                                    in={this.state.isVisible}
                                >
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
                                            style={{
                                                margin: this.state.desktop
                                                    ? '10.5% 0 17% 0'
                                                    : '70% 0 30% 0',
                                                width: this.state.desktop ? '50%' : '90%',
                                                height: this.state.desktop ? '50%' : '90%'
                                            }}
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
                                <Transition
                                    onEnter={animateHeadingIn}
                                    timeout={0}
                                    in={this.state.isVisible}
                                >
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            width: '100vw',
                                            fontWeight: '900',
                                            textAlign: 'center',
                                            fontSize: '7vh',
                                            margin: this.state.desktop
                                                ? '14% 0 0 10px'
                                                : '30vw 0 0 10px',
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
                                                WebkitTextFillColor: 'transparent',
                                                letterSpacing: '-0.05em'
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
                        height: this.state.desktop ? '75vh' : '90vh'
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
                                                margin: this.state.desktop
                                                    ? '13% 0px 10% 10px'
                                                    : '40% 0px 20% 10px',
                                                zIndex: 30,
                                                pointerEvents: 'none'
                                            }}
                                        >
                                            <Transition
                                                onEnter={animateSubheadingIn}
                                                timeout={0}
                                                in={this.state.isVisible}
                                            >
                                                <div
                                                    style={{
                                                        lineHeight: '85%',
                                                        background:
                                                            '-webkit-linear-gradient(left, #9357cc 30%,#2989d8 50%,#2cc99d 70%)',
                                                        WebkitBackgroundClip: 'text',
                                                        WebkitTextFillColor: 'transparent',
                                                        fontSize: this.state.desktop
                                                            ? '6vh'
                                                            : '350%',
                                                        letterSpacing: '0.1em'
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
                                                        lineHeight: '100%',
                                                        letterSpacing: '0.05em',
                                                        fontSize: this.state.desktop
                                                            ? '10vh'
                                                            : '500%'
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
                                            height: this.state.desktop ? '70vh' : '40vh',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            display: 'flex',
                                            flexDirection: 'row'
                                        }}
                                    >
                                        {this.renderAccordion()}
                                    </div>
                                </div>
                            ),
                            amount: 0.1,
                            slowerScrollRate: false
                        }
                    ]}
                    style={{
                        height: this.state.desktop ? '113vh' : '84vh'
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
                                        height: this.state.desktop ? '100%' : '78%',
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
                                    {this.state.desktop ? (
                                        <div
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                zIndex: '2',
                                                background: '#000000',
                                                opacity: '0.7'
                                            }}
                                        />
                                    ) : null}
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
                                        color: '#FFFFFF',
                                        textAlign: 'center',
                                        margin: '15% 0 0 10px'
                                    }}
                                >
                                    <div
                                        style={{
                                            fontSize: this.state.desktop ? '9vh' : '11vw',
                                            fontWeight: '700',
                                            lineHeight: '100%',
                                            letterSpacing: '-0.05em'
                                        }}
                                    >
                                        e-NABLE
                                    </div>
                                    <div
                                        style={{
                                            fontSize: this.state.desktop ? '2.5vh' : '3.5vw',
                                            fontWeight: '500',
                                            lineHeight: '110%',
                                            letterSpacing: '0.2em'
                                        }}
                                    >
                                        Connecting people who make hands <br /> with people who need
                                        them.
                                    </div>
                                    <Box
                                        style={{
                                            margin: '40px',
                                            padding: '15px',
                                            borderWeight: '2px'
                                        }}
                                        href="http://enablingthefuture.org/"
                                        onClick={() =>
                                            (window.location.href = 'http://enablingthefuture.org/')
                                        }
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
                <ParallaxBanner
                    layers={[
                        {
                            children: (
                                <div
                                    style={{
                                        // backgroundImage: url(
                                        //     '/static/backgroundtile.png'
                                        // ),
                                        background: '#ffffff',
                                        height: '100%',
                                        width: '100vw'
                                        //opacity: '0.7'
                                    }}
                                />
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
                                        textAlign: 'center',
                                        margin: this.state.desktop
                                            ? '15% 0 0 10px'
                                            : '20vw 0 0 10px'
                                        //backgroundColor: '#000000'
                                    }}
                                >
                                    <div
                                        style={{
                                            lineHeight: '85%',
                                            background:
                                                '-webkit-linear-gradient(right, #9357cc 30%,#2989d8 50%,#2cc99d 70%)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            fontSize: this.state.desktop ? '6vh' : '11vw',
                                            letterSpacing: '0.1em',
                                            fontWeight: '700',
                                            marginBottom: '3vh'
                                        }}
                                        className="subheading"
                                    >
                                        SAGE PROSTHETICS IN THE NEWS
                                    </div>

                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-around',
                                            width: '80vw',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <ReactPlayer
                                            width="35vw"
                                            height="35vh"
                                            controls
                                            url="https://ns8-ns-twc-com.akamaized.net/news/CA/2019/02/PKG%20_2019021_3634813_20190219%20ZT%20HIGH%20SCHOOL%20PROSTHETICS%20DIRTY_2182019%208-40-18%20PM.mp4"
                                        />

                                        <div style={{ width: '35vw', textAlign: 'left' }}>
                                            <div>
                                                LOS ANGELES, CA – A teen is lending a helping hand
                                                by creating prosthetics for those in need.
                                            </div>
                                            <br />
                                            <div>
                                                The hand looks bionic and in many ways, it is. The
                                                bone structure is a durable, but lightweight plastic
                                                and sinews braided fishing line. The prosthetic hand
                                                was built by 17-year-old Karishma Raghuram.
                                            </div>
                                            <br />
                                            <div>
                                                The intricate design means getting the fit just
                                                right.
                                            </div>
                                            <br />
                                            <div>
                                                “We can do so many things with such little
                                                resources, and it’s amazing to see that at such a
                                                young age where we’re able to contribute in such a
                                                major way,” says Raghuram.
                                            </div>
                                            <br />
                                            <div>
                                                Raghuram is a senior at Sage Hill School in Newport
                                                Beach, and she is a part the school’s award-winning
                                                prosthetics program. The school’s 3-D printer is
                                                capable of a rainbow of colors, but these appendages
                                                aren’t just for show.
                                            </div>
                                            <br />

                                            <a
                                                href="https://spectrumnews1.com/ca/orange-county/news/2019/02/19/hand-in-hand"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {' '}
                                                Read Full Article Here{' '}
                                            </a>
                                        </div>
                                    </div>

                                    <div
                                        style={{
                                            width: '80vw',
                                            height: '1px',
                                            borderRadius: '3px',
                                            backgroundColor: '#212121',
                                            margin: '50px 0 45px 0'
                                        }}
                                    />

                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-around',
                                            width: '80vw',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <ReactPlayer
                                            width="35vw"
                                            height="35vh"
                                            controls
                                            url="https://res.cloudinary.com/sageprosthetics/video/upload/v1558071592/something.mov"
                                        />

                                        <div style={{ width: '35vw', textAlign: 'left' }}>
                                            <div>
                                                NEWPORT BEACH, Calif. (KABC) -- Karishma Raghuram,
                                                17, is a senior at Sage Hill School in Newport Beach
                                                and a member of the schools' prosthetic club.
                                            </div>
                                            <br />
                                            <div>
                                                She researches, troubleshoots and builds prosthetics
                                                for people in need.
                                            </div>
                                            <br />
                                            <div>
                                                "The intersection of science and technology with
                                                also community service and helping others is just
                                                what makes this project unbelievably amazing for
                                                everyone involved," Raghuram said.
                                            </div>
                                            <br />
                                            <div>
                                                {' '}
                                                Since last year, she's already made and sent out
                                                three 3-D printed prosthetic limbs to people all
                                                over the world. This year, she's building a very
                                                special pink and blue arm for a local girl...{' '}
                                            </div>
                                            <br />

                                            <a
                                                href="https://abc7.com/science/cool-kid-karishma-raghuram-builds-prosthetic-limbs/5110086/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {' '}
                                                Read Full Article Here{' '}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ),
                            amount: 0.1,
                            slowerScrollRate: false
                        }
                    ]}
                    style={{
                        height: this.state.desktop ? '1200px' : '200vw'
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
        color: '#000000',
        backgroundColor: '#ffffff'
    }
});

const animateParticles = particles => {
    return anime({
        targets: particles,
        delay: 500,
        opacity: {
            value: [0, 1]
        },
        easing: 'easeOutQuint',
        duration: 3000
    });
};

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
