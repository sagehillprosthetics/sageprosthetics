import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, Transformation } from 'cloudinary-react';
import firebase from 'firebase/app';
import 'firebase/database';
import Card from 'grommet/components/Card';
import Anchor from 'grommet/components/Anchor';
import NextSeo from 'next-seo';
import { isBrowser } from 'react-device-detect';

import { getGroup } from '../redux/actions';
import * as types from '../redux/types.js';

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

        const pictures = [];
        db.database()
            .ref('hands')
            .once('value')
            .then(datasnapshot => {
                datasnapshot.forEach(child => {
                    pictures.push({ name: child.key, ...child.val() });
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
        selectedImage: '',
        desktop: ''
    };

    componentDidMount() {
        this.setState({ isVisible: true, desktop: isBrowser });
    }

    renderHands = () => {
        const images = this.props.designs
            .sort((a, b) => b.order - a.order)
            .map(design => {
                const bulletpoints = Object.keys(design).map(key => {
                    if (!isNaN(parseInt(key))) {
                        return <li key={key}> {design[key]} </li>;
                    }
                });

                return (
                    <div
                        style={{
                            margin: '1vw',
                            //height: '60vh',
                            border: '3px solid #416989',
                            borderRadius: '10px',
                            width: this.state.desktop ? '25vw' : '80vw'
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
                    </div>
                );
            });

        return images.reverse();
    };

    render() {
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
                <h2 style={{ textAlign: 'center' }}>Hand Designs</h2>
                <div
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        flexDirection: 'row',
                        justifyContent: 'center'
                    }}
                >
                    {this.renderHands()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        designs: state.designs
    };
};

export default connect(
    mapStateToProps,
    { getGroup }
)(Hand);
