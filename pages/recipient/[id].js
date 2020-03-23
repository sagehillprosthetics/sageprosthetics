import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, Video, Transformation } from 'cloudinary-react';
import NextSeo from 'next-seo';
import firebase from 'firebase/app';
import 'firebase/database';
import Router from 'next/router';
import ReactPlayer from 'react-player';

import Quote from 'grommet/components/Quote';
import Paragraph from 'grommet/components/Paragraph';
import CloseIcon from 'grommet/components/icons/base/Close';
import Button from 'grommet/components/Button';
import FormField from 'grommet/components/FormField';
import Select from 'grommet/components/Select';

import * as types from '../../redux/types.js';
import Person from '../../components/Person';
import CloudinaryInput from '../../components/CloudinaryInput';
import ConfirmModal from '../../components/ConfirmModal';

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

    state = {
        uploadImageState: '',
        textEdit: false,
        text: '',
        selectedMember: '',
        searchTerm: ''
    };

    componentDidMount() {
        this.database = firebase.database();
    }

    removeFile = (key, video) => {
        this.setState({ uploadImageState: 'Processing...' });

        let array = this.props.recipient[video ? 'videos' : 'pictures'];
        let newArray = {};
        let count = 0;
        array.forEach(file => {
            if (file !== key) {
                newArray[count] = file;
                count++;
            }
        });

        this.updateFirebase(video ? 'videos' : 'pictures', newArray);
    };

    updateFirebase = (item, value) => {
        this.setState({ uploadImageState: 'Processing...' });
        this.database
            .ref(`/recipients/${this.props.recipient.name}/${item}`)
            .set(value)
            .then(() => {
                this.setState({
                    uploadImageState: 'Successfully Updated Database'
                });
                Router.replace(`/recipient/${this.props.recipient.name}`);
            })
            .catch(e => this.setState({ uploadImageState: `Error: ${e.message}` }));
    };

    renderGroup() {
        let dropdown;
        if (this.props.recipient && this.props.group) {
            dropdown = Object.keys(this.props.group).filter(
                name =>
                    (!this.props.recipient.group || !this.props.recipient.group.includes(name)) &&
                    (this.state.searchTerm == '' ||
                        name.toLowerCase().includes(this.state.searchTerm))
            );
        }

        let group = null;
        if (this.props.recipient.group) {
            group = (
                <div style={{ margin: '40px 10% 10px 10% ' }}>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'left',
                            alignItems: 'center'
                        }}
                    >
                        <h3> Group Members </h3>
                        {this.props.isAuthenticated ? (
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'left',
                                    alignItems: 'center',
                                    margin: '0px 0px 20px 20px'
                                }}
                            >
                                <Select
                                    placeHolder="Select Person to Add"
                                    options={dropdown}
                                    value={this.state.selectedMember}
                                    onChange={({ value }) =>
                                        this.setState({ selectedMember: value })
                                    }
                                    onSearch={event =>
                                        this.setState({ searchTerm: event.target.value })
                                    }
                                />
                                <Button
                                    label="Add Person"
                                    style={{ marginLeft: '20px' }}
                                    onClick={() =>
                                        this.updateFirebase(
                                            `group/${this.props.recipient.group.length}`,
                                            this.state.selectedMember
                                        )
                                    }
                                />
                            </div>
                        ) : null}
                    </div>

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
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center'
                                    }}
                                >
                                    <Person
                                        key={person}
                                        src={this.props.group[person]}
                                        name={person}
                                    />
                                    {this.props.isAuthenticated ? (
                                        <Button
                                            label="Remove Person"
                                            icon={<CloseIcon />}
                                            plain={true}
                                            style={{ margin: '-25px 0px 25px 0px' }}
                                            onClick={() =>
                                                this.updateFirebase(
                                                    '/group',
                                                    this.props.recipient.group.filter(
                                                        name => name !== person
                                                    )
                                                )
                                            }
                                        />
                                    ) : null}
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
        console.log(this.props.recipient);
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
                                      <div
                                          style={{
                                              margin: '1%',
                                              display: 'flex',
                                              flexDirection: 'column',
                                              alignItems: 'center'
                                          }}
                                          key={key}
                                      >
                                          <Image
                                              cloudName="sageprosthetics"
                                              publicId={key}
                                              height="190"
                                              //crop="scale"
                                          />
                                          {this.props.isAuthenticated ? (
                                              <>
                                                  <Button
                                                      icon={<CloseIcon />}
                                                      onClick={() =>
                                                          this.setState({ showModal: key })
                                                      }
                                                      label="Remove Image"
                                                      plain={true}
                                                  />
                                                  <ConfirmModal
                                                      onToggleModal={() =>
                                                          this.setState({ showModal: '' })
                                                      }
                                                      show={this.state.showModal === key}
                                                      onConfirm={() => this.removeFile(key, false)}
                                                      message={`You are about to remove an image from this recipient's gallery. Are you sure?`}
                                                  />{' '}
                                              </>
                                          ) : null}
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
                                          {this.props.isAuthenticated ? (
                                              <>
                                                  <Button
                                                      icon={<CloseIcon />}
                                                      onClick={() =>
                                                          this.setState({ showModal: key })
                                                      }
                                                      label="Remove Image"
                                                      plain={true}
                                                  />
                                                  <ConfirmModal
                                                      onToggleModal={() =>
                                                          this.setState({ showModal: '' })
                                                      }
                                                      show={this.state.showModal === key}
                                                      onConfirm={() => this.removeFile(key, true)}
                                                      message={`You are about to remove a video from this recipient's gallery. Are you sure?`}
                                                  />{' '}
                                              </>
                                          ) : null}
                                      </div>
                                  );
                              })
                            : videos}
                        {this.props.isAuthenticated ? (
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: '190px',
                                    justifyContent: 'space-around'
                                }}
                            >
                                <CloudinaryInput
                                    onUploadSuccess={({ public_id }) =>
                                        this.updateFirebase(
                                            `pictures/${this.props.recipient.pictures.length}`,
                                            public_id
                                        )
                                    }
                                    label="Upload New Image"
                                    style={{ margin: '20px' }}
                                />
                                <CloudinaryInput
                                    onUploadSuccess={({ public_id }) =>
                                        this.updateFirebase(
                                            `videos/${this.props.recipient.videos.length}`,
                                            public_id
                                        )
                                    }
                                    label="Upload New Video"
                                    style={{ margin: '20px' }}
                                />
                                {this.state.uploadImageState}
                            </div>
                        ) : null}
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
                        style={{
                            marginLeft: '10%',
                            marginTop: this.props.desktop ? '0px' : '2vw',
                            width: '100%'
                        }}
                    >
                        {this.state.textEdit ? (
                            <FormField size="large" style={{ width: '100%' }}>
                                <textarea
                                    style={{
                                        fontWeight: 'lighter',
                                        border: 'none'
                                    }}
                                    type="text"
                                    value={this.state.text}
                                    rows={10}
                                    onChange={event => this.setState({ text: event.target.value })}
                                />
                            </FormField>
                        ) : (
                            this.props.recipient.text
                        )}

                        {this.props.recipient.quote ? (
                            <Quote
                                borderColorIndex="accent-1"
                                style={{ marginTop: '2vw' }}
                                size="full"
                            >
                                <Paragraph>"{this.props.recipient.quote}"</Paragraph>
                            </Quote>
                        ) : null}
                        {this.props.isAuthenticated ? (
                            <>
                                <br />
                                <Button
                                    label={this.state.textEdit ? 'Cancel' : 'Edit Text'}
                                    onClick={() =>
                                        this.setState({
                                            textEdit: !this.state.textEdit,
                                            text: this.props.recipient.text
                                        })
                                    }
                                    style={{ margin: '20px' }}
                                />
                                {this.state.textEdit ? (
                                    <Button
                                        label="Submit"
                                        onClick={() => this.updateFirebase('text', this.state.text)}
                                    />
                                ) : null}

                                <CloudinaryInput
                                    onUploadSuccess={({ public_id }) =>
                                        this.updateFirebase('src', public_id)
                                    }
                                    label="Change Key Image"
                                    style={{ margin: '20px' }}
                                />
                            </>
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
    const { selectedRecipient, group, isAuthenticated } = state;
    return {
        recipient: selectedRecipient,
        group,
        isAuthenticated
    };
};

export default connect(mapStateToProps, null)(Recipient);
