import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getGroup } from '../redux/actions';
import { Image, Video, Transformation } from 'cloudinary-react';
import * as types from '../redux/types.js';
import Card from 'grommet/components/Card';
import Anchor from 'grommet/components/Anchor';
import Quote from 'grommet/components/Quote';
import Paragraph from 'grommet/components/Paragraph';

class Recipient extends Component {
    static async getInitialProps({ req, query, store }) {
        let recipient = {};
        const links = [];

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

        const reformat = {};
        req.firebaseServer
            .database()
            .ref('group')
            .once('value')
            .then(datasnapshot => {
                datasnapshot.forEach(child => {
                    reformat[child.key] = child.val();
                });
            });

        const archivereformat = {};
        req.firebaseServer
            .database()
            .ref('group-archive')
            .once('value')
            .then(datasnapshot => {
                datasnapshot.forEach(child => {
                    archivereformat[child.key] = child.val();
                });
            });

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
            type: types.GET_PROJECTS,
            payload: project
        });

        store.dispatch({
            type: types.GET_SELECTED_RECIPIENT,
            payload: recipient
        });
        store.dispatch({ type: types.CHANGE_PAGE, payload: recipient.name });
        store.dispatch({
            type: types.GET_GROUP,
            payload: { ...reformat, ...archivereformat }
        });
    }

    state = {
        selectedImage: ''
    };

    renderGroup() {
        let group = null;
        if (this.props.recipient.group) {
            group = (
                <div style={{ margin: '40px 10% 10px 10% ' }}>
                    <h3> Group Members </h3>
                    <hr style={{ marginTop: '-10px' }} />
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap'
                        }}
                    >
                        {this.props.recipient.group.map(person => {
                            return (
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        margin: '1%'
                                    }}
                                >
                                    <Image
                                        cloudName="sageprosthetics"
                                        publicId={this.props.group[person]}
                                        width="120"
                                        //crop="scale"
                                    >
                                        <Transformation
                                            width="1000"
                                            height="1000"
                                            gravity="face"
                                            radius="500"
                                            crop="thumb"
                                        />
                                    </Image>
                                    <h4
                                        style={{
                                            fontWeight: '600',
                                            textAlign: 'center',
                                            margin: '20px',
                                            width: '150px'
                                        }}
                                    >
                                        {person}
                                    </h4>
                                </div>
                            );
                        })}
                    </div>
                </div>
            );
        }

        return group;
    }

    renderImage() {
        const { pictures, videos } = this.props.recipient;
        let media = null;

        if (pictures || videos) {
            media = (
                <div style={{ margin: '40px 10% 10px 10% ' }}>
                    <h3> Images & Videos </h3>
                    <hr style={{ marginTop: '-10px' }} />
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            //justifyContent: 'space-between',
                            flexWrap: 'wrap'
                        }}
                    >
                        {pictures
                            ? pictures.map(key => {
                                  return (
                                      <div style={{ margin: '1%' }}>
                                          <Image
                                              cloudName="sageprosthetics"
                                              publicId={key}
                                              height="190"
                                              //crop="scale"
                                          />
                                      </div>
                                  );
                              })
                            : null}

                        {videos
                            ? videos.map(key => {
                                  return (
                                      <div style={{ margin: '1%' }}>
                                          <Video
                                              cloudName="sageprosthetics"
                                              publicId={key}
                                              resourceType="video"
                                              controls
                                              height="190"
                                              //crop="scale"
                                          />
                                      </div>
                                  );
                              })
                            : videos}
                    </div>
                </div>
            );
        }

        return media;
    }

    render() {
        return (
            <div style={{ margin: '0% 5% 0% 5%' }}>
                <title> {this.props.recipient.name} | Sage Prosthetics </title>
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
                {this.renderImage()}
                {this.renderGroup()}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        recipient: state.selectedRecipient,
        group: state.group
    };
};

export default connect(
    mapStateToProps,
    null
)(Recipient);
