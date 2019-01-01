import React from 'react';
import { Image, Transformation } from 'cloudinary-react';
import anime from 'animejs';
import Transition from 'react-transition-group/Transition';

import Person from './Person';

const BioModal = props => {
    if (props.show) {
        return (
            <React.Fragment>
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        position: 'absolute',
                        backgroundColor: '#999999',
                        opacity: '0.75',

                        zIndex: 200,
                        left: '0',
                        top: '0'
                    }}
                    onClick={props.onToggleModal}
                />

                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        height: '100%',
                        width: '100%',
                        position: 'absolute',
                        left: '0',
                        top: '0'
                    }}
                    //onClick={props.onToggleModal}
                >
                    <Transition onEnter={modalEnter} timeout={0} in={props.show} onExit={modalExit}>
                        <div
                            style={{
                                height: '60vh',
                                width: '60vw',
                                marginTop: 150 + window.scrollY + 'px',
                                backgroundColor: 'white',
                                borderRadius: '20px',
                                boxShadow: 'true',
                                padding: '5%',
                                display: 'flex',
                                alignItems: 'center',
                                flexDirection: 'column',
                                zIndex: 300
                            }}
                            onClick={event => event.preventDefault()}
                            className="biomodal"
                        >
                            <Person
                                src={props.person.src}
                                name={props.person.name}
                                faculty
                                horizontal
                            />
                            <h6 style={{ marginTop: '6vh' }}> {props.person.bio} </h6>
                        </div>
                    </Transition>
                </div>
            </React.Fragment>
        );
    }

    return null;
};

const modalEnter = biomodal => {
    console.log('in');
    return anime({
        // targets: biomodal,
        // opacity: {
        //     value: [0, 1]
        // },
        // easing: 'easeOutQuint',
        // duration: 1000
    });
};

const modalExit = biomodal => {
    console.log('out');
    return anime({
        // targets: biomodal,
        // opacity: {
        //     value: [1, 0]
        // },
        // easing: 'easeOutQuint',
        // duration: 1000
    });
};

export default BioModal;
