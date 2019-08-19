import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, Video, Transformation } from 'cloudinary-react';
import * as types from '../../redux/types.js';
import NextSeo from 'next-seo';
import firebase from 'firebase/app';
import 'firebase/database';

import ReactPlayer from 'react-player';
import Quote from 'grommet/components/Quote';
import Paragraph from 'grommet/components/Paragraph';

import Person from '../../components/Person';

class Recipient extends Component {
    static async getInitialProps({ req, query, store }) {
        let recipient = {};

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

        const reformat = {};
        db.database()
            .ref('group')
            .once('value')
            .then(datasnapshot => {
                datasnapshot.forEach(child => {
                    reformat[child.key] = child.val();
                });
            });

        const archivereformat = {};
        db.database()
            .ref('group-archive')
            .once('value')
            .then(datasnapshot => {
                datasnapshot.forEach(child => {
                    archivereformat[child.key] = child.val();
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
                            return (
                                <Person key={person} src={this.props.group[person]} name={person} />
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
                                      <div style={{ margin: '1%' }} key={key}>
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
                                      <div style={{ margin: '1%' }} key={key}>
                                          <ReactPlayer
                                              width="338px"
                                              height="190px"
                                              controls
                                              url={key}
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
                        flexDirection: this.props.desktop ? 'row' : 'column',
                        justifyContent: 'center',
                        margin: this.props.desktop ? '0 15% 0 15%' : '10px'
                    }}
                >
                    <Image
                        cloudName="sageprosthetics"
                        publicId={this.props.recipient.src + ''}
                        height="100%"
                    >
                        <Transformation width="300" height="400" crop="scale" />
                    </Image>
                    <div
                        style={{ marginLeft: '10%', marginTop: this.props.desktop ? '0px' : '2vw' }}
                    >
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
