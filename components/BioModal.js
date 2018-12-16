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
                            <h6 style={{ marginTop: '6vh' }}> {teacherBio[props.person.name]} </h6>
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

const teacherBio = {
    'Tanya Lerch': `Tanya joined Sage Hill in 2016 from Convent of the Sacred Heart in NYC where she taught AP Statistics, Geometry, and Algebra 2. She serves as an AP reader in Statistics each year and is currently teaching AP Statistics and Applied Statistics and serves as the 12th grade Dean at Sage Hill. Tanya first started collaborating with e-NABLE in 2014 and was the first primary school to incorporate the creation of 3D printed prosthetics in the classroom. Tanya is the faculty advisor to a group of 26 upperclassman students who work on prosthetics as a community service project: "Sage Prosthetics". Tanya has also coached Varsity Cross Country and Track, and has run 8 marathons with a personal record of 3:08. Mrs. Lerch earned her bachelor’s degree in psychology and a bachelor’s degree in dance from Hamilton College. She also holds a master’s degree in psychology from New York University (where she first started teaching statistics) and a master’s degree in mathematics education from Columbia University Teacher’s College.`,
    'Anie Robinson': `Anie Robinson joined Sage Hill in 2016 from Campbell Hall Episcopal School in Los Angeles, where she taught honors chemistry and biology. Prior to that, Anie taught multiple science subjects at Rose and Alex Pilibos Armenian School in Los Angeles and served as the Science Bowl coach. She graduated with college honors and cum laude distinction from UCLA with a major in chemistry. During her undergraduate years, she also conducted research at the Medical Genetics Institute at Cedars-Sinai Medical Center and co-authored three publications on protein signaling. She enjoys playing piano and volleyball during her spare time, and has recently taken an interest in 3D printing and fabrication after joining the prosthetics group as a faculty advisor in 2017.`
};

export default BioModal;
