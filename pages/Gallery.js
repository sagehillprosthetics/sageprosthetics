import React, { Component } from 'react';
import * as firebase from 'firebase';
//import * as admin from 'firebase-admin';
import { connect } from 'react-redux';
import { getGroup } from '../redux/actions';
import { Image, Transformation } from 'cloudinary-react';
import serviceAccount from '../firebasekeys.json';
import * as types from '../redux/types.js';
import ImageModal from '../components/ImageModal';

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

        const links = [];
        db.database()
            .ref('recipients')
            .once('value')
            .then(datasnapshot => {
                datasnapshot.forEach(child => {
                    links.push(child.key);
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
            payload: links
        });
    }

    state = {
        selectedImage: ''
    };

    renderImages = () => {
        //const width = window.innerWidth() / 5;

        const images = this.props.gallery.map(src => {
            return (
                <div
                    onClick={() => this.setState({ selectedImage: src })}
                    style={{ margin: '1vw' }}
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
        });

        return images.reverse();
    };

    render() {
        return (
            <div style={{ margin: '0% 5% 0% 5%' }}>
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

                <ImageModal
                    show={this.state.selectedImage !== ''}
                    src={this.state.selectedImage}
                    onToggleModal={() => this.setState({ selectedImage: '' })}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        gallery: state.gallery
    };
};

export default connect(
    mapStateToProps,
    { getGroup }
)(Gallery);
