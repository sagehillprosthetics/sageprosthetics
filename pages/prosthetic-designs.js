import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image } from 'cloudinary-react';
import firebase from 'firebase/app';
import 'firebase/database';
import Router from 'next/router';
import NextSeo from 'next-seo';

import Card from 'grommet/components/Card';
import Anchor from 'grommet/components/Anchor';
import CloseIcon from 'grommet/components/icons/base/Close';
import Button from 'grommet/components/Button';
import FormField from 'grommet/components/FormField';
import Select from 'grommet/components/Select';

import * as types from '../redux/types.js';
import CloudinaryInput from '../components/CloudinaryInput';
import ConfirmModal from '../components/ConfirmModal';

class Hand extends Component {
    static async getInitialProps({ req, query, store }) {
        store.dispatch({
            type: types.CHANGE_PAGE,
            payload: 'h'
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

        const pictures = {};
        db.database()
            .ref('prosthetic-designs')
            .once('value')
            .then(datasnapshot => {
                datasnapshot.forEach(child => {
                    pictures[child.key] = child.val();
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
            type: types.GET_DESIGNS,
            payload: pictures
        });

        store.dispatch({
            type: types.GET_PROJECTS,
            payload: project
        });
    }

    state = {
        name: '',
        href: '',
        text: '',
        src: '',
        uploadState: '',
        showModal: '',
        activeCategory: '',
        bannersrc: '',
        bannername: ''
    };

    componentDidMount() {
        this.database = firebase.database();
        console.log(this.props.designs);

        const hands = {
            'Wrist Powered Hand Designs': {
                src: 'hand',
                order: 0,
                0: {
                    '0': 'Wrist powered',
                    '1': 'Looks ‘robotic/bionic’',
                    '2': 'Can be customized in multiple colors etc.',
                    '3': 'Most popular design for functionality',
                    link: 'https://www.thingiverse.com/thing:1674320',
                    src: 'e19cb5872ea315325192c6ff3a2e3784_preview_featured',
                    name: 'Phoenix Unlimbited'
                },
                1: {
                    '0': 'Printed with flexible filament hinges',
                    '1': 'Looks the most realistic (can do skin tone such as brown, tan, etc.)',
                    '2': 'Not as easy to use as the phoenix – not as good grip strength',
                    '3': 'Wrist powered',
                    link: 'https://www.thingiverse.com/thing:380665',
                    src: 'IMG_20140822_161840_preview_featured',
                    name: 'Flexy – Hand 2'
                },
                2: {
                    '0': 'A ‘remix’ of the flexy hand',
                    '1': 'Supposedly has better grip strength',
                    '2': 'Still somewhat experimental in design',
                    '3': 'Wrist powered',
                    link: 'https://www.thingiverse.com/thing:2715218',
                    src: 845,
                    name: 'Promimetic Hand'
                },
                3: {
                    '0': 'An older model, good functionality (similar to Phoenix)',
                    '1': 'Wrist powered',
                    link: 'https://www.thingiverse.com/thing:910465',
                    src: 8322,
                    name: 'Osprey Hand'
                },
                4: {
                    '0': 'An older model with good functionality, predecessor of Phoenix',
                    '1': 'Wrist powered',
                    link: 'https://www.thingiverse.com/thing:596966',
                    src: 390,
                    name: 'Raptor Reloaded'
                }
            },
            'Arm Powered Hand Designs': {
                order: 1,
                src: 'arm',
                0: {
                    '0': 'Similar to phoenix hand, but elbow powered',
                    link: 'https://www.thingiverse.com/thing:1672381',
                    src: 831,
                    name: 'Unlimbitied Arm'
                },
                1: {
                    '0': 'connects to arm above the elbow',
                    '1': 'grip comes from bending the elbow',
                    '2': 'still in the testing process',
                    link: 'https://www.thingiverse.com/thing:2112768',
                    src: 'Screen-Shot-2018-03-21-at-1.04.48-PM',
                    name: 'ArmPO V2'
                },
                2: {
                    '0': 'Elbow powered',
                    '1': 'Realistic looking',
                    '2': 'Not as good grip strength',
                    link: 'https://www.thingiverse.com/thing:2841296',
                    src: 'llnchrulplonwhah7hvv',
                    name: 'Kwawu Arm 2'
                }
            },
            'Shoulder Powered Hand Designs': {
                order: 2,
                src: 'shoulder',
                0: {
                    '0': 'Very experimental design',
                    '1': 'For recipients without an elbow joint',
                    '2': 'Attaches to the body with straps, to create a harness',
                    '3': 'Then attaches to a terminal device such as the Kwawu hand ',
                    src: 'octqrvia1bypscyhuqpw',
                    name: 'XO Shoulder by Nate Munro'
                }
            },
            'Other Designs': {
                order: 3,
                0: {
                    '0': 'For people who have a hand, but can’t move it',
                    '1': 'Stroke victims, hemispherectomy patients',
                    link: 'https://www.thingiverse.com/thing:2894781',
                    name: 'Frog Hand',
                    src: 'tfjsoudesvjj81tzxpv5'
                },
                1: {
                    '0': 'For people who are just missing a finger',
                    link: 'https://www.thingiverse.com/thing:1340624',
                    src: 'eqmga4rmxalxcl16ufvs',
                    name: 'Knick Finger'
                },
                2: {
                    '0': 'Similar to the Knick Finger',
                    link: 'https://www.thingiverse.com/thing:1737001',
                    src: 'xpzlvw0j5nelxirlbadz',
                    name: 'Kinetic Finger'
                },
                3: {
                    '0': 'Passive, but great grip strength',
                    '1': 'Must be attached to custom socket',
                    link: 'https://www.thingiverse.com/thing:1908866',
                    src: 'xmi9im6lw08fjjgdhfz0',
                    name: 'Gripper Thumb'
                }
            }
        };
        //this.updateFirebase('', hands);
    }

    addHand = () => {
        const text = this.state.text
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length >= 1);

        let newOrder = 0;
        Object.keys(this.props.designs[this.state.activeCategory]).forEach(key => {
            if (parseInt(key) > newOrder) {
                newOrder = parseInt(key);
            }
        });
        newOrder++;

        const newHand = {
            ...text,
            link: this.state.href,
            name: this.state.name,
            order: newOrder,
            src: this.state.src
        };

        console.log(newHand);
        console.log(`/${this.state.activeCategory}/${newOrder}`);
        this.updateFirebase(`/${this.state.activeCategory}/${newOrder}`, newHand);
    };

    updateFirebase = (item, value) => {
        this.setState({ uploadImageState: 'Processing...' });
        this.database
            .ref(`/prosthetic-designs${item}`)
            .set(value)
            .then(() => {
                this.setState({
                    uploadState: 'Successfully Updated Database'
                });
                Router.replace(`/prosthetic-designs`);
            })
            .catch(e => this.setState({ uploadState: `Error: ${e.message}` }));
    };

    renderHands = (hands, key) => {
        const cards = Object.keys(hands)
            .reverse()
            .filter(key => key !== 'src' && key !== 'order')
            .map(hand => {
                const design = hands[hand];
                const bulletpoints = Object.keys(design).map(key => {
                    if (!isNaN(parseInt(key))) {
                        return <li key={key}> {design[key]} </li>;
                    }
                });

                return (
                    <div
                        style={{
                            margin: '1vw 1vw 3vw 1vw',
                            //height: '60vh',
                            border: '3px solid #416989',
                            borderRadius: '10px',
                            width: this.props.desktop ? '25vw' : '80vw'
                        }}
                        key={design.name}
                    >
                        <Card
                            heading={design.name}
                            description={<ul> {bulletpoints} </ul>}
                            link={<Anchor href={design.link} label="View on ThingiVerse" />}
                            style={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-around'
                            }}
                        >
                            <Image
                                cloudName="sageprosthetics"
                                publicId={design.src + ''}
                                width="248"
                                crop="scale"
                            />
                        </Card>
                        {this.props.isAuthenticated ? (
                            <>
                                <Button
                                    label="Remove Design"
                                    icon={<CloseIcon />}
                                    onClick={() => this.setState({ showModal: design.name })}
                                    plain={true}
                                />
                                <ConfirmModal
                                    onToggleModal={() => this.setState({ showModal: '' })}
                                    show={this.state.showModal === design.name}
                                    onConfirm={() => this.updateFirebase(`/${key}/${hand}`, null)}
                                    message="You are about to remove a hand design from the Sage Prosthetics website. Are you sure?"
                                />
                            </>
                        ) : null}
                    </div>
                );
            });

        return cards;
    };

    render() {
        console.log(this.state.showModal);
        return (
            <div style={{ margin: '0% 5% 0% 5%' }}>
                <NextSeo
                    config={{
                        title: 'Hand Designs | Sage Prosthetics',
                        twitter: { title: 'Hand Designs | Sage Prosthetics' },
                        openGraph: {
                            title: 'Hand Designs | Sage Prosthetics'
                        }
                    }}
                />

                {Object.keys(this.props.designs)
                    .sort((a, b) => this.props.designs[a].order - this.props.designs[b].order)
                    .map(key => (
                        <div>
                            <h2 style={{ textAlign: 'center', marginTop: '60px' }}> {key} </h2>
                            <Image
                                cloudName="sageprosthetics"
                                publicId={this.props.designs[key].src}
                                height="100%"
                            />
                            <div
                                style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    marginBottom: '30px'
                                }}
                            >
                                {this.renderHands(this.props.designs[key], key)}
                            </div>
                        </div>
                    ))}

                {this.props.isAuthenticated ? (
                    <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                        <div
                            style={{
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                margin: '10px'
                            }}
                        >
                            <h3 style={{ marginTop: '20px' }}> Add New Hand Design </h3>
                            <FormField label="Name" size="medium" help="Required">
                                <input
                                    style={{
                                        fontWeight: 'lighter',
                                        border: 'none'
                                    }}
                                    type="text"
                                    onChange={event => this.setState({ name: event.target.value })}
                                />
                            </FormField>
                            <FormField label="Thingiverse URL" size="medium">
                                <input
                                    style={{
                                        fontWeight: 'lighter',
                                        border: 'none'
                                    }}
                                    type="text"
                                    onChange={event => this.setState({ href: event.target.value })}
                                />
                            </FormField>
                            <FormField
                                label="Description"
                                size="large"
                                help="Please write every bullet point on a new line"
                            >
                                <textarea
                                    style={{
                                        fontWeight: 'lighter',
                                        height: '60%',
                                        resize: 'none',
                                        border: 'none'
                                    }}
                                    type="text"
                                    name="message"
                                    rows={10}
                                    onChange={event => this.setState({ text: event.target.value })}
                                />
                            </FormField>
                            <FormField label="Category" size="large" help="Required">
                                <Select
                                    placeHolder="Select a Category"
                                    style={{ display: 'flex', flexDirection: 'row' }}
                                    options={Object.keys(this.props.designs)}
                                    value={this.state.activeCategory}
                                    onChange={({ option }) => {
                                        console.log(option);
                                        this.setState({ activeCategory: option });
                                    }}
                                />
                            </FormField>

                            <CloudinaryInput
                                onUploadSuccess={({ public_id }) => {
                                    console.log(public_id);
                                    this.setState({ src: public_id });
                                }}
                                label="Upload Hand Design Picture"
                                style={{ margin: '20px' }}
                            />
                            {this.state.uploadState ? <h6> {this.state.uploadState} </h6> : null}
                            <Button
                                label="Add Hand Design"
                                onClick={
                                    this.state.name && this.state.activeCategory
                                        ? () => this.setState({ showModal: 'h' })
                                        : null
                                }
                                primary={true}
                                style={{ margin: '20px' }}
                            />
                            <ConfirmModal
                                onToggleModal={() => this.setState({ showModal: '' })}
                                show={this.state.showModal === 'h'}
                                onConfirm={this.addHand}
                                message="You are about to add a hand design to the Sage Prosthetics website. Are you sure?"
                            />
                        </div>
                        <div
                            style={{
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                margin: '10px'
                            }}
                        >
                            <h3 style={{ marginTop: '20px' }}> Add New Category </h3>
                            <FormField label="Name" size="medium" help="Required">
                                <input
                                    style={{
                                        fontWeight: 'lighter',
                                        border: 'none'
                                    }}
                                    type="text"
                                    onChange={event =>
                                        this.setState({ bannername: event.target.value })
                                    }
                                />
                            </FormField>

                            <CloudinaryInput
                                onUploadSuccess={({ public_id }) => {
                                    console.log(public_id);
                                    this.setState({ bannersrc: public_id });
                                }}
                                label="Upload Category Banner Picture"
                                style={{ margin: '20px' }}
                            />
                            {this.state.uploadState ? <h6> {this.state.uploadState} </h6> : null}
                            <Button
                                label="Add Hand Design Category"
                                onClick={
                                    this.state.bannername
                                        ? () => this.setState({ showModal: 'c' })
                                        : null
                                }
                                primary={true}
                                style={{ margin: '20px' }}
                            />
                            <ConfirmModal
                                onToggleModal={() => this.setState({ showModal: '' })}
                                show={this.state.showModal === 'c'}
                                onConfirm={() =>
                                    this.updateFirebase(`/${this.state.bannername}`, {
                                        src: this.state.bannersrc,
                                        order: Object.keys(this.props.designs).length
                                    })
                                }
                                message="You are about to add a hand design category to the Sage Prosthetics website. Are you sure?"
                            />
                        </div>
                    </div>
                ) : null}
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { designs, isAuthenticated } = state;
    return { designs, isAuthenticated };
};

export default connect(mapStateToProps, null)(Hand);
