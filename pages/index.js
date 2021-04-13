import React, { Component } from 'react';
import posed from 'react-pose';
import { ParallaxProvider, ParallaxBanner } from 'react-scroll-parallax';
import anime from 'animejs';
import { connect } from 'react-redux';
import Transition from 'react-transition-group/Transition';
import Particles from 'react-particles-js';
import firebase from 'firebase/app';
import 'firebase/database';
import Router from 'next/router';

import Accordion from 'grommet/components/Accordion';
import AccordionPanel from 'grommet/components/AccordionPanel';
import Carousel from 'grommet/components/Carousel';
import Button from 'grommet/components/Button';
import FormField from 'grommet/components/FormField';
import CloseIcon from 'grommet/components/icons/base/Close';

import * as types from '../redux/types';
import { isNullOrUndefined } from 'util';

class LandingPage extends Component {
    static async getInitialProps({ req, store }) {
        store.dispatch({
            type: types.CHANGE_PAGE,
            payload: '~',
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

        const quotes = [];
        db.database()
            .ref('quotes')
            .once('value')
            .then((datasnapshot) => {
                datasnapshot.forEach((child) => {
                    quotes.push(child.val());
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

        store.dispatch({ type: types.GET_QUOTES, payload: quotes });
    }

    state = {
        isVisible: false,
        expanded: false,
        desktop: true,
        quote: '',
        src: '',
        uploadState: '',
    };

    componentDidMount() {
        this.setState({ isVisible: true });
        this.database = firebase.database();
    }

    updateFirebase = (item, value) => {
        this.setState({ uploadImageState: 'Processing...' });
        this.database
            .ref(item)
            .set(value)
            .then(() => {
                this.setState({
                    uploadState: 'Successfully Updated Database',
                });
                Router.replace(`/`);
            })
            .catch((e) => this.setState({ uploadState: `Error: ${e.message}` }));
    };

    removeQuote = (key) => {
        this.props.quotes.splice(key, 1);
        this.updateFirebase('/quotes', this.props.quotes);
    };

    renderParticles = () => {
        return (
            <Transition onEnter={animateParticles} timeout={4000} in={this.state.isVisible}>
                <Particles
                    className="particles"
                    style={{ height: '40vh', position: 'absolute', top: '80px' }}
                    params={{
                        particles: {
                            number: {
                                value: 100,
                            },
                            size: {
                                value: 4,
                                random: true,
                            },
                            color: {
                                value: '#2cc99d',
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
                                    rotateY: 0,
                                },
                            },
                            line_linked: {
                                distance: 120,
                                color: '#2cc99d',
                                opacity: 0.9,
                                width: 1.3,
                            },
                        },
                        interactivity: {
                            events: {
                                onhover: {
                                    enable: true,
                                    mode: 'repulse',
                                },
                            },
                            modes: {
                                repulse: {
                                    distance: 100,
                                    duration: 1,
                                },
                            },
                        },
                        retina_detect: true,
                    }}
                />
            </Transition>
        );
    };

    renderAccordion = () => {
        console.log(this.props.desktop);
        return (
            <Accordion
                style={{
                    fontWeight: '400',
                    margin: this.props.desktop
                        ? this.state.expanded
                            ? '0 20% 0 20%'
                            : '0 20% 0 20%'
                        : this.state.expanded
                        ? '10vh 0px 0px 0px'
                        : '-16vh 0px 0px 0px',
                    borderWidth: '0px',
                    width: '60%',
                    overflow: 'visible',
                }}
                onActive={(event) => {
                    console.log(event);
                    this.setState({ expanded: !isNullOrUndefined(event) });
                }}
            >
                <AccordionPanel
                    heading="Our Process"
                    style={{
                        borderWidth: '0px',
                        width: '100%',
                        backgroundColor: 'green',
                    }}
                >
                    <div style={styles.dropdown}>
                        Using pictures of both our recipients’ intact and affected arms and hands,
                        for measurement purposes. We learn about the functionality (mainly the
                        wrist/elbow flexion and extension as well as the ability to use any residual
                        fingers) of their affected limb to choose the best design to maximize their
                        goals as well as the hand’s effectiveness and comfort. Recipients tell us
                        their back story and color/design preferences so we can accommodate a wide
                        variety of desires from flashy superhero themed hands for kids to cosmetic
                        hands for adults. We then print each hand in many parts in a range of
                        materials – typically PLA, Pet-G, and flexible TPU. After that we carefully
                        assemble them, including padding and moleskin for comfort on the inside and
                        Gel-Tippee grips for the fingertips, and either ship them to our recipients
                        or do the final custom fitting in person for local recipients able to come
                        to campus. We keep in touch with our recipients and are happy to make
                        updated hands in the future as the recipient outgrows the hand or desires
                        new colors or tweaks to make the design work for them. We can also
                        incorporate custom parts for activities like holding a pencil, a bow, bike
                        handlebars, and more!
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
                        in Southern California who are trying to make a difference. Our work is
                        part of a service learning project connected to a school course on 3D 
                        Printing, Fabrication, and Design. You can learn more about our team
                        <a href="/group"> here</a>. We are a chapter of the non-profit e-NABLE. 
                        There are different students each year, but the program has been at 
                        Sage Hill School since 2016, and our Teacher, Tanya Lerch, started one
                        of the first e-NABLE school chapters in 2013 at her previous school in 
                        New York City.
                    </div>
                </AccordionPanel>
                <AccordionPanel heading="Can I buy one?">
                    <div style={styles.dropdown}>
                        Nope, the hands are free of charge! We are a non-profit and have generous
                        funding from our school and community donations. We typically make hands
                        for recipients who are either unable to afford or access traditional
                        prosthesis. On a case by case basis, we will work with recipients who would
                        like a hand under other circumstances, in particular, those who are within
                        our geographic region and are open to helping test new designs and better
                        existing ones.
                    </div>
                </AccordionPanel>
                <AccordionPanel heading="How can I become a recipient?">
                    <div style={styles.dropdown}>
                        <a href="/contact">Reach out to us!</a> Tell us your story, and we would be
                        glad to add you as a recipient. We work during the school year (Mid-August
                        to Mid-May) and hands typically take around 2 months for completion.
                    </div>
                </AccordionPanel>
                <AccordionPanel heading="How can Sage Hill students get involved?">
                    <div class="iframe-container">
                        <iframe
                            width="560"
                            height="315"
                            src="https://www.youtube.com/embed/snxWWnHtCR4"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen
                        ></iframe>
                    </div>
                </AccordionPanel>

                <AccordionPanel heading="I have a 3D Printer and want to make hands like this, how do I start?">
                    <div style={styles.dropdown}>
                        <a href="https://hub.e-nable.org/s/e-nable-forum/wiki/page/view?title=How+to+Get+Started+as+an+e-NABLE+Volunteer">
                            https://hub.e-nable.org/s/e-nable-forum/wiki/page/view?title=How+to+Get+Started+as+an+e-NABLE+Volunteer
                        </a>
                        <br />
                        <br />
                        This page of the e-NABLE Hub has step-by-step instructions under “How to Get Started as a Volunteer”.
                        Please read and follow these steps thoroughly. It is a lengthy process involving printing and assembling
                        test-devices and getting digital badges approving you to make them for others.
                        <br />
                        <br />
                        The e-NABLE Hub has all the information about all devices, forums, and more. You might also consider getting 
                        involved in the e-NABLE Facebook groups. Once you have started printing and assembling, the answer to just about
                        every question you can think of is posted on the e-NABLE hub.
                        <br />
                        <br />
                    </div>
                </AccordionPanel>
                <AccordionPanel heading="I am an educator/student and want to start a chapter like this. How do I begin?">
                    <div style={styles.dropdown}>Same answer as above!</div>
                </AccordionPanel>
                <AccordionPanel heading="Here's a great video to learn more about e-NABLE!">
                    <div class="iframe-container">
                        <iframe
                            width="560"
                            height="315"
                            src="https://www.youtube.com/embed/UetR48IBXVk"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen
                        ></iframe>
                    </div>
                </AccordionPanel>
                <AccordionPanel heading="Disclaimer">
                    <div style={styles.dropdown}>
                        We are not medical professionals. These devices are not intended to replace
                        a medical prosthetic. Please view them as an assistive device to help with
                        certain tasks, and inspire confidence in particular with our youngest
                        recipients. The devices have their limitations which we explain in depth,
                        along with the care of the device, when we deliver them.
                    </div>
                </AccordionPanel>
            </Accordion>
        );
    };

    renderQuotes() {
        return (
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    width: '100vw',
                    textAlign: 'center',
                    margin: this.props.desktop ? '15% 0px 10px 0px' : '20vw 0 0 0',
                }}
            >
                <div
                    style={{
                        lineHeight: '85%',
                        background:
                            '-webkit-linear-gradient(right, #9357cc 30%,#2989d8 50%,#2cc99d 70%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontSize: this.props.desktop ? '6vh' : '11vw',
                        letterSpacing: '0.1em',
                        fontWeight: '700',
                        marginBottom: '3vh',
                        marginTop: this.props.desktop ? '0px' : '40vw',
                    }}
                    className="subheading"
                >
                    SAGE PROSTHETICS IN THE NEWS
                </div>
                <Carousel
                    style={{ width: this.props.desktop ? '70vw' : '100vw' }}
                    autoplay={true}
                    autoplaySpeed={5000}
                >
                    {this.props.quotes.map((section, index) => (
                        <div
                            style={{
                                width: this.props.desktop ? '60vw' : '90vw',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-around',
                            }}
                            key={index}
                        >
                            <h1
                                style={{
                                    textAlign: 'center',
                                    fontWeight: '500',
                                }}
                            >
                                "{section.text}"
                            </h1>
                            {this.props.isAuthenticated ? (
                                <Button
                                    icon={<CloseIcon />}
                                    label="Remove Quote"
                                    plain={true}
                                    onClick={() => this.removeQuote(index)}
                                />
                            ) : null}
                            <div>
                                <img
                                    src={section.src}
                                    style={{
                                        height: '30px',
                                        width: 'auto',
                                        marginBottom: '100px',
                                    }}
                                    alt="source"
                                ></img>
                            </div>
                        </div>
                    ))}
                </Carousel>

                {this.props.isAuthenticated ? (
                    <div
                        style={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            padding: '10%',
                            textAlign: 'left',
                        }}
                    >
                        <h3 style={{ marginTop: '20px' }}> Add New Quote </h3>
                        <FormField label="Quote" size="medium" help="Required">
                            <textarea
                                style={{
                                    fontWeight: 'lighter',
                                    height: '60%',
                                    resize: 'none',
                                    border: 'none',
                                }}
                                type="text"
                                name="message"
                                rows={10}
                                onChange={(event) => this.setState({ quote: event.target.value })}
                            />
                        </FormField>
                        <FormField label="Image URL" size="medium" help="Required">
                            <input
                                style={{
                                    fontWeight: 'lighter',
                                    border: 'none',
                                }}
                                type="text"
                                onChange={(event) => this.setState({ src: event.target.value })}
                            />
                        </FormField>

                        {this.state.uploadState ? <h6> {this.state.uploadState} </h6> : null}
                        <Button
                            label="Add Quote"
                            onClick={
                                this.state.quote && this.state.src
                                    ? () =>
                                          this.updateFirebase(
                                              `quotes/${this.props.quotes.length}`,
                                              {
                                                  text: this.state.quote,
                                                  src: this.state.src,
                                              }
                                          )
                                    : null
                            }
                            primary={true}
                            style={{ margin: '20px' }}
                        />
                    </div>
                ) : null}
            </div>
        );
    }

    render() {
        console.log(this.props.desktop);
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
                                            'linear-gradient(160deg, #ffffff, #ffffff, #1d698b)',
                                    }}
                                />
                            ),
                            amount: 0.1,
                            slowerScrollRate: false,
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
                                            opacity: 0,
                                        }}
                                        className="printer"
                                    >
                                        <img
                                            src="/static/1-21-squashed.png"
                                            style={{
                                                margin: this.props.desktop
                                                    ? '10.5% 0 17% 0'
                                                    : '70% 0 30% 0',
                                                width: this.props.desktop ? '50%' : '90%',
                                                height: this.props.desktop ? '50%' : '90%',
                                            }}
                                            alt="gradient"
                                        />
                                    </div>
                                </Transition>
                            ),
                            amount: 0.1,
                            slowerScrollRate: true,
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
                                            margin: this.props.desktop
                                                ? '14% 0 0 10px'
                                                : '30vw 0 0 10px',
                                            opacity: 0,
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
                                                letterSpacing: '-0.05em',
                                            }}
                                        >
                                            WE MAKE <br /> HANDS
                                        </div>
                                    </div>
                                </Transition>
                            ),
                            amount: 0.1,
                            slowerScrollRate: false,
                        },
                    ]}
                    style={{
                        height: this.props.desktop ? '75vh' : '90vh',
                    }}
                />

                <ParallaxBanner
                    layers={[
                        {
                            children: (
                                <div
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                    }}
                                />
                            ),
                            amount: 0.1,
                            slowerScrollRate: false,
                        },
                        {
                            children: (
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        width: '100vw',
                                    }}
                                >
                                    <div
                                        style={{
                                            width: '100vw',
                                            padding: '0px',
                                            marginTop: this.props.desktop ? '0px' : '20vh',
                                        }}
                                    >
                                        <div
                                            style={{
                                                position: 'absolute',
                                                width: '100vw',
                                                height: '40vh',
                                            }}
                                        >
                                            {this.renderParticles()}
                                        </div>
                                        <div
                                            style={{
                                                fontWeight: '700',
                                                textAlign: 'center',
                                                margin: this.props.desktop
                                                    ? '13% 0px 10% 10px'
                                                    : '40% 0px 20% 10px',
                                                zIndex: 30,
                                                pointerEvents: 'none',
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
                                                        fontSize: this.props.desktop
                                                            ? '6vh'
                                                            : '350%',
                                                        letterSpacing: '0.1em',
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
                                                        fontSize: this.props.desktop
                                                            ? '10vh'
                                                            : '300%',
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
                                            width: this.props.desktop ? '100%' : '130%',
                                            height: this.props.desktop ? '70vh' : '100vh',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            overflow: 'visible',
                                        }}
                                    >
                                        {this.renderAccordion()}
                                    </div>
                                </div>
                            ),
                            amount: 0.1,
                            slowerScrollRate: false,
                        },
                    ]}
                    style={{
                        height: this.props.desktop
                            ? '75em'
                            : this.state.expanded
                            ? '180vh'
                            : '150vh',
                    }}
                />
                <ParallaxBanner
                    layers={[
                        {
                            children: (
                                <div
                                    style={{
                                        background: '#000000',
                                        height: this.props.desktop ? '100%' : '70vw',
                                        width: '100vw',
                                    }}
                                >
                                    <img
                                        src="/static/video.jpg"
                                        style={{
                                            width: '100vw',
                                            opacity: '0.7',
                                            marginTop: this.props.desktop ? '0px' : '14vw',
                                        }}
                                        alt="video"
                                    />
                                    {this.props.desktop ? (
                                        <div
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                zIndex: '2',
                                                background: '#000000',
                                                opacity: '0.7',
                                            }}
                                        />
                                    ) : null}
                                </div>
                            ),
                            amount: 0.1,
                            slowerScrollRate: true,
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
                                        margin: this.props.desktop
                                            ? '15% 0 0 10px'
                                            : '30vw 0 0 10px',
                                    }}
                                >
                                    <div
                                        style={{
                                            fontSize: this.props.desktop ? '9vh' : '11vw',
                                            fontWeight: '700',
                                            lineHeight: '100%',
                                            letterSpacing: '-0.05em',
                                        }}
                                    >
                                        e-NABLE
                                    </div>
                                    <div
                                        style={{
                                            fontSize: this.props.desktop ? '2.5vh' : '3.5vw',
                                            fontWeight: '500',
                                            lineHeight: '110%',
                                            letterSpacing: '0.2em',
                                        }}
                                    >
                                        Connecting people who make hands <br /> with people who need
                                        them.
                                    </div>
                                    <Box
                                        style={{
                                            margin: '40px',
                                            padding: '15px',
                                            borderWeight: '2px',
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
                            slowerScrollRate: false,
                        },
                    ]}
                    style={{
                        height: this.props.desktop ? '600px' : '70vw',
                    }}
                />
                <ParallaxBanner
                    layers={[
                        {
                            children: (
                                <div
                                    style={{
                                        background: '#ffffff',
                                        height: '100%',
                                        width: '100vw',
                                    }}
                                />
                            ),
                            amount: 0.1,
                            slowerScrollRate: true,
                        },
                        {
                            children: this.renderQuotes(),
                            amount: 0.1,
                            slowerScrollRate: false,
                        },
                    ]}
                    style={{
                        height: this.props.desktop
                            ? this.props.isAuthenticated
                                ? '1500px'
                                : '800px'
                            : '180vw',
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
        margin: '10px 10px 0 20px',
        paddingRight: '20px',
    },
};

const Box = posed.button({
    hoverable: true,
    init: {
        borderColor: '#FFFFFF',
        color: '#ffffff',
        backgroundColor: 'rgb(0,0,0,0)',
    },
    hover: {
        color: '#000000',
        backgroundColor: '#ffffff',
    },
});

const animateParticles = (particles) => {
    return anime({
        targets: particles,
        delay: 500,
        opacity: {
            value: [0, 1],
        },
        easing: 'easeOutQuint',
        duration: 3000,
    });
};

const animateMainheadingIn = (mainheading) => {
    return anime({
        targets: mainheading,
        opacity: {
            value: [0, 1],
        },
        filter: ['blur(7px)', 'blur(0px)'],
        translateY: [500, 0],
        rotate: {
            value: [90, 0],
        },
        easing: 'easeOutQuint',
        duration: 1000,
    });
};

const animateSubheadingIn = (subheading) => {
    return anime({
        targets: subheading,
        opacity: {
            value: [0, 1],
        },
        filter: ['blur(7px)', 'blur(0px)'],
        scale: {
            value: [10, 1],
        },
        easing: 'easeOutQuint',
        duration: 800,
    });
};

const animatePrinterIn = (printer) => {
    console.log('animating');
    return anime({
        targets: printer,
        opacity: {
            value: [0, 1],
        },
        filter: ['blur(7px)', 'blur(0px)'],
        scale: {
            value: 1.3,
        },
        easing: 'easeOutQuint',
        duration: 1800,
    });
};

const animateHeadingIn = (heading) => {
    return anime({
        targets: heading,
        opacity: {
            value: [0, 1],
        },
        filter: ['blur(7px)', 'blur(0px)'],
        scale: {
            value: 1.4,
            duration: 1800,
        },
        translateY: -15,
        easing: 'easeOutQuart',
        duration: 1900,
    });
};

const mapStateToProps = (state) => {
    const { quotes, isAuthenticated } = state;
    return { quotes, isAuthenticated };
};

export default connect(mapStateToProps, null)(LandingPage);
