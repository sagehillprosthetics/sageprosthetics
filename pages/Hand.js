import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getGroup } from '../redux/actions';
import { Image, Transformation } from 'cloudinary-react';
import * as types from '../redux/types.js';
import Card from 'grommet/components/Card';
import Anchor from 'grommet/components/Anchor';

class Gallery extends Component {
    static async getInitialProps({ req, query, store }) {
        const pictures = [];
        await req.firebaseServer
            .database()
            .ref('hands')
            .once('value')
            .then(datasnapshot => {
                datasnapshot.forEach(child => {
                    pictures.push({ name: child.key, ...child.val() });
                });
            });

        store.dispatch({
            type: types.GET_DESIGNS,
            payload: pictures
        });
    }

    state = {
        selectedImage: ''
    };

    renderHands = () => {
        const images = this.props.designs
            .sort((a, b) => b.order - a.order)
            .map(design => {
                const bulletpoints = Object.keys(design).map(key => {
                    if (
                        key == 1 ||
                        key == 2 ||
                        key == 3 ||
                        key == 4 ||
                        key == 0
                    ) {
                        return <li> {design[key]} </li>;
                    }
                });

                console.log(design.src);

                return (
                    <div style={{ margin: '1vw' }}>
                        <Card
                            heading={design.name}
                            description={<ul> {bulletpoints} </ul>}
                            link={
                                <Anchor
                                    href={design.link}
                                    label="View on ThingiVerse"
                                />
                            }
                        >
                            <Image
                                cloudName="sageprosthetics"
                                publicId={design.src + ''}
                                width="248"
                                height="186"
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
)(Gallery);
