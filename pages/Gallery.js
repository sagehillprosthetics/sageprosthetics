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
    static async getInitialProps({ req, query, store }) {
        const pictures = [];
        await req.firebaseServer
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
    }

    state = {
        selectedImage: ''
    };

    renderImages = () => {
        const images = this.props.gallery.map(src => {
            return (
                <div onClick={() => this.setState({ selectedImage: src })}>
                    <Image
                        cloudName="sageprosthetics"
                        publicId={src}
                        width="300"
                        height="225"
                        style={{ margin: '20px' }}
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
                        flexDirection: 'row'
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
