import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getGroup } from '../redux/actions';
import { Image, Transformation } from 'cloudinary-react';
import * as types from '../redux/types.js';
import Card from 'grommet/components/Card';
import Anchor from 'grommet/components/Anchor';
import Quote from 'grommet/components/Quote';
import Paragraph from 'grommet/components/Paragraph';

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
        store.dispatch({ type: types.CHANGE_PAGE, payload: recipient.name });
    }

    state = {
        selectedImage: ''
    };

    render() {
        console.log(this.props.recipient.src);
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
                        height="100%"
                    >
                        <Transformation width="300" height="400" crop="scale" />
                    </Image>
                    <div style={{ marginLeft: '10%' }}>
                        {this.props.recipient.text}
                        {this.props.recipient.quote ? (
                            <Quote
                                borderColorIndex="accent-1"
                                style={{ marginTop: '2vw' }}
                                size="full"
                            >
                                <Paragraph>
                                    "{this.props.recipient.quote}"
                                </Paragraph>
                            </Quote>
                        ) : null}
                    </div>
                </div>
                <hr />
                team members people images stuff
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
