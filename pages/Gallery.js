import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import { connect } from 'react-redux';
import { Image, Transformation } from 'cloudinary-react';
import { NextSeo } from 'next-seo';

import Router from 'next/router';
import * as types from '../redux/types.js';
import ImageModal from '../components/ImageModal';
import CloudinaryInput from '../components/CloudinaryInput';
import ConfirmModal from '../components/ConfirmModal';

import Anchor from 'grommet/components/Anchor';
import Button from 'grommet/components/Button';
import Heading from 'grommet/components/Heading';
import CloseIcon from 'grommet/components/icons/base/Close';
import CaretBackIcon from 'grommet/components/icons/base/CaretBack';
import CaretNextIcon from 'grommet/components/icons/base/CaretNext';

class Gallery extends Component {
    static async getInitialProps({ req, query, store, isServer }) {
        store.dispatch({
            type: types.CHANGE_PAGE,
            payload: 'g',
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

        const links = [];
        const archive = [];
        db.database()
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

        const pictures = [];
        await db
            .database()
            .ref('gallery')
            .once('value')
            .then((datasnapshot) => {
                datasnapshot.forEach((child) => {
                    pictures.push(child.val());
                });
            });

        store.dispatch({
            type: types.GET_GALLERY,
            payload: pictures.reverse(),
        });

        store.dispatch({
            type: types.GET_RECIPIENTS,
            payload: { links, archive },
        });

        store.dispatch({
            type: types.GET_PROJECTS,
            payload: project,
        });
    }

    state = {
        selectedImage: '',
        page: 1,
        uploadImageState: '',
    };

    componentDidMount() {
        this.database = firebase.database();
    }

    uploadImageSuccess = async ({ public_id }) => {
        this.setState({ uploadImageState: 'Processing...' });
        let key = await this.database
            .ref()
            .child('gallery')
            .once('value')
            .then((snapshot) => snapshot.val().length);
        console.log(key);
        console.log(public_id);
        this.database
            .ref(`/gallery/${key}`)
            .set(public_id)
            .then(() => {
                this.setState({
                    uploadImageState: 'Successfully Updated Database',
                });
                Router.replace('/gallery');
            })
            .catch((e) => this.setState({ uploadImageState: `Error: ${e.message}` }));
    };

    removeImage = async (src) => {
        let newGallery = {};
        let count = 0;
        this.props.gallery.reverse().forEach((image) => {
            if (image !== src) {
                newGallery[count] = image;
                count++;
            }
        });
        this.props.gallery.reverse();

        this.database
            .ref(`/gallery`)
            .set(newGallery)
            .then(() => {
                this.setState({
                    uploadImageState: 'Successfully Updated Database',
                });
                Router.replace('/gallery');
            })
            .catch((e) => this.setState({ uploadImageState: `Error: ${e.message}` }));
    };

    renderImages = () => {
        //const width = window.innerWidth() / 5;

        let count = -1;

        const images = this.props.gallery.map((src) => {
            count++;
            if (count >= (this.state.page - 1) * 20 && count < this.state.page * 20) {
                return (
                    <div
                        key={src}
                        style={{
                            margin: '1vw',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Image
                            cloudName="sageprosthetics"
                            publicId={src}
                            width="248"
                            height="186"
                            onClick={() => this.setState({ selectedImage: src })}
                        />
                        {this.props.isAuthenticated ? (
                            <>
                                <Button
                                    icon={<CloseIcon />}
                                    onClick={() => this.setState({ showModal: src })}
                                    label="Remove Image"
                                    plain={true}
                                />
                                <ConfirmModal
                                    onToggleModal={() => this.setState({ showModal: '' })}
                                    show={this.state.showModal === src}
                                    onConfirm={() => this.removeImage(src)}
                                    message={`You are about to remove an image from the Sage Prosthetics gallery. Are you sure?`}
                                />{' '}
                            </>
                        ) : null}
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
                <NextSeo
                    {...{
                        title: 'Gallery | Sage Prosthetics',
                        twitter: { title: 'Gallery | Sage Prosthetics' },
                        openGraph: {
                            title: 'Gallery | Sage Prosthetics',
                        },
                    }}
                />
                <h2 style={{ textAlign: 'center' }}>Photo Gallery</h2>

                <div
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        flexDirection: 'row',
                        justifyContent: 'center',
                    }}
                >
                    {this.props.isAuthenticated ? (
                        <div
                            style={{
                                width: '248px',
                                height: '186px',
                                margin: '1vw',
                                //backgroundColor: '#7ed4c6'
                            }}
                        >
                            <CloudinaryInput
                                onUploadSuccess={this.uploadImageSuccess}
                                label="Upload New Image"
                                style={{ margin: '20px' }}
                            />
                            {this.state.uploadImageState}
                        </div>
                    ) : null}
                    {this.renderImages()}
                </div>

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
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

const mapStateToProps = (state) => {
    const { gallery, isAuthenticated } = state;
    return {
        gallery,
        isAuthenticated,
    };
};

export default connect(mapStateToProps, null)(Gallery);
