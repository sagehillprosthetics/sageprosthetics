import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getGroup } from '../redux/actions';
import { Image, Transformation } from 'cloudinary-react';
import * as types from '../redux/types.js';
import Card from 'grommet/components/Card';
import Anchor from 'grommet/components/Anchor';

class Recipient extends Component {
    static async getInitialProps({ req, query, store }) {
        let recipient = {};
        const links = [];

        await req.firebaseServer
            .database()
            .ref('recipients')
            .once('value')
            .then(datasnapshot => {
                datasnapshot.forEach(child => {
                    links.push(child.key);
                    if (child.key === query.id) {
                        recipient = { ...child.val(), name: child.key };
                    }
                });
            });

        store.dispatch({
            type: types.GET_RECIPIENTS,
            payload: links
        });

        store.dispatch({
            type: types.GET_SELECTED_RECIPIENT,
            payload: recipient
        });
    }

    state = {
        selectedImage: ''
    };

    render() {
        return (
            <div style={{ margin: '0% 5% 0% 5%' }}>
                <h2 style={{ textAlign: 'center' }}>
                    {this.props.recipient.name}
                </h2>
                <div
                    style={{
                        display: 'flex',
                        //flexWrap: 'wrap',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        margin: '0 15% 0 15%'
                    }}
                >
                    <Image
                        cloudName="sageprosthetics"
                        publicId={this.props.recipient.src + ''}
                        crop="scale"
                        width="200"
                    />
                    <div style={{ margin: '10%' }}>
                        {this.props.recipient.text}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        recipient: state.selectedRecipient
    };
};

export default connect(
    mapStateToProps,
    null
)(Recipient);
