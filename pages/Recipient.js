import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getGroup } from '../redux/actions';
import { Image, Video, Transformation } from 'cloudinary-react';
import * as types from '../redux/types.js';
import NextSeo from 'next-seo';

import Card from 'grommet/components/Card';
import Anchor from 'grommet/components/Anchor';
import Quote from 'grommet/components/Quote';
import Paragraph from 'grommet/components/Paragraph';

import Person from '../components/Person';

class Recipient extends Component {
    static async getInitialProps({ req, query, store }) {
        let recipient = {};

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

        const links = [];
        const archive = [];
        await req.firebaseServer
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

                    if (child.key === query.id) {
                        recipient = { ...child.val(), name: child.key };
                    }
                });
            });

        store.dispatch({
            type: types.GET_RECIPIENTS,
            payload: { links, archive }
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
                            justifyContent: 'space-around',
                            flexWrap: 'wrap'
                        }}
                    >
                        {this.props.recipient.group.map(person => {
                            return <Person src={this.props.group[person]} name={person} />;
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
                <NextSeo
                    config={{
                        title: this.props.recipient.name + ` | Sage Prosthetics`,
                        twitter: { title: this.props.recipient.name + ' | Sage Prosthetics' },
                        openGraph: {
                            title: this.props.recipient.name + ' | Sage Prosthetics'
                        }
                    }}
                />
                <h2 style={{ textAlign: 'center' }}>{this.props.recipient.name}</h2>
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
                                <Paragraph>"{this.props.recipient.quote}"</Paragraph>
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
