import React, { Component } from 'react';
import * as firebase from 'firebase';
//import * as admin from 'firebase-admin';
import { connect } from 'react-redux';
import { getGroup } from '../redux/actions';
import { Image, Transformation } from 'cloudinary-react';
import serviceAccount from '../firebasekeys.json';
import * as types from '../redux/types.js';
import ImageModal from '../components/ImageModal';
import Anchor from 'grommet/components/Anchor';
import Heading from 'grommet/components/Heading';
import CaretBackIcon from 'grommet/components/icons/base/CaretBack';
import CaretNextIcon from 'grommet/components/icons/base/CaretNext';

class Gallery extends Component {
    static async getInitialProps({ req, query, store, isServer }) {
        store.dispatch({
            type: types.CHANGE_PAGE,
            payload: 'g'
        });

        let db = null;
        if (isServer) {
            db = req.firebaseServer;
        } else {
            db = firebase;
        }

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
        const archive = [];
        req.firebaseServer
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

        const pictures = [];
        await db
            .database()
            .ref('gallery')
            .once('value')
            .then(datasnapshot => {
                datasnapshot.forEach(child => {
                    pictures.push(child.val());
                });
            });

        store.dispatch({
            type: types.GET_GALLERY,
            payload: pictures
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

    state = {
        selectedImage: '',
        page: 1
    };

    renderImages = () => {
        //const width = window.innerWidth() / 5;

        let count = -1;
        const images = this.props.gallery.map(src => {
            count++;
            if (count >= (this.state.page - 1) * 20 && count < this.state.page * 20) {
                return (
                    <div
                        onClick={() => this.setState({ selectedImage: src })}
                        style={{ margin: '1vw' }}
                        onMouseOver={() => console.log('mouse over')}
                        onMouseOut={() => console.log('mouse down')}
                    >
                        <Image
                            cloudName="sageprosthetics"
                            publicId={src}
                            width="248"
                            height="186"
                            //crop="scale"
                        />
                    </div>
                );
            }
        });

        return images;
    };

    renderAnchorTags = () => {
        let anchors = [];
        anchors.push(
            <Anchor
                icon={<CaretBackIcon />}
                label=""
                onClick={() => this.setState({ page: this.state.page - 1 })}
                disabled={this.state.page === 1}
                key="<"
            />
        );
        for (let a = 1; a <= Math.ceil(this.props.gallery.length / 20); a++) {
            anchors.push(
                <Anchor
                    onClick={() => this.setState({ page: a })}
                    key={a}
                    style={{ margin: '15px 10px 0px 10px' }}
                    className={a === this.state.page ? 'text active' : 'text'}
                >
                    {' '}
                    <Heading tag="h3">{a}</Heading>{' '}
                </Anchor>
            );
        }
        anchors.push(
            <Anchor
                icon={<CaretNextIcon />}
                label=""
                onClick={() => this.setState({ page: this.state.page + 1 })}
                disabled={
                    !this.props.gallery ||
                    this.state.page == Math.ceil(this.props.gallery.length / 20)
                }
                key=">"
            />
        );
        return anchors;
    };

    render() {
        return (
            <div style={{ margin: '0% 5% 0% 5%' }}>
                <title> Gallery | Sage Prosthetics </title>
                <h2 style={{ textAlign: 'center' }}>Photo Gallery</h2>

                <div
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        flexDirection: 'row',
                        justifyContent: 'center'
                    }}
                >
                    {this.renderImages()}
                </div>

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    {this.renderAnchorTags()}
                </div>

                <ImageModal
                    show={this.state.selectedImage !== ''}
                    src={this.state.selectedImage}
                    onToggleModal={() => this.setState({ selectedImage: '' })}
                />
                <style jsx>{`
                    .text {
                        color: #416989;
                        font-weight: 500;
                    }
                    .text:hover {
                        color: #7ed4c6;
                        text-decoration: none;
                        text-decoration-color: #7ed4c6;
                    }
                    .active {
                        color: #7ed4c6;
                        text-decoration: none;
                    }
                `}</style>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        gallery: state.gallery.reverse()
    };
};

export default connect(
    mapStateToProps,
    { getGroup }
)(Gallery);
