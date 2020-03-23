import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, Video, Transformation } from 'cloudinary-react';
import Router from 'next/router';
import firebase from 'firebase/app';
import 'firebase/database';
import NextSeo from 'next-seo';

import CloseIcon from 'grommet/components/icons/base/Close';
import Button from 'grommet/components/Button';
import FormField from 'grommet/components/FormField';
import Select from 'grommet/components/Select';

import * as types from '../../redux/types';
import CloudinaryInput from '../../components/CloudinaryInput';
import ConfirmModal from '../../components/ConfirmModal';
import Person from '../../components/Person';

class Project extends Component {
    static async getInitialProps({ req, query, store }) {
        let project = {};

        let db = firebase;

        const projects = [];
        db.database()
            .ref('projects')
            .once('value')
            .then(datasnapshot => {
                datasnapshot.forEach(child => {
                    projects.push(child.key);
                    if (child.key === query.id) {
                        project = { ...child.val(), name: child.key };
                    }
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
                });
            });

        console.log(projects);

        store.dispatch({
            type: types.GET_RECIPIENTS,
            payload: { links, archive }
        });

        store.dispatch({
            type: types.GET_PROJECTS,
            payload: projects
        });

        store.dispatch({
            type: types.GET_SELECTED_PROJECT,
            payload: project
        });
        store.dispatch({ type: types.CHANGE_PAGE, payload: project.name });
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

        let array = this.props.project[video ? 'videos' : 'pictures'];
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
            .ref(`/projects/${this.props.project.name}/${item}`)
            .set(value)
            .then(() => {
                this.setState({
                    uploadImageState: 'Successfully Updated Database'
                });
                Router.replace(`/project/${this.props.project.name}`);
            })
            .catch(e => this.setState({ uploadImageState: `Error: ${e.message}` }));
    };

    renderGroup() {
        let dropdown;
        if (this.props.project && this.props.group) {
            dropdown = Object.keys(this.props.group).filter(
                name =>
                    (!this.props.project.group || !this.props.project.group.includes(name)) &&
                    (this.state.searchTerm == '' ||
                        name.toLowerCase().includes(this.state.searchTerm))
            );
        }

        let group = null;
        if (this.props.project.group) {
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
                                            `group/${this.props.project.group.length}`,
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
                        {this.props.project.group.map(person => {
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
                                                    this.props.project.group.filter(
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
        const { pictures, videos } = this.props.project;
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
                                                      message={`You are about to remove an image from this project's gallery. Are you sure?`}
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
                                          <Video
                                              cloudName="sageprosthetics"
                                              publicId={key}
                                              resourceType="video"
                                              controls
                                              height="300"
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
                                                      onConfirm={() => this.removeFile(key, true)}
                                                      message={`You are about to remove a video from this project's gallery. Are you sure?`}
                                                  />{' '}
                                              </>
                                          ) : null}
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
                        title: this.props.project.name + ` | Sage Prosthetics`,
                        twitter: { title: this.props.project.name + ' | Sage Prosthetics' },
                        openGraph: {
                            title: this.props.project.name + ' | Sage Prosthetics'
                        }
                    }}
                />
                <h2 style={{ textAlign: 'center' }}>{this.props.project.name}</h2>
                {this.props.uploadImageState ? <h4>{this.props.uploadImageState}</h4> : null}
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
                        publicId={this.props.project.src + ''}
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
                            this.props.project.text
                        )}
                        {this.props.isAuthenticated ? (
                            <>
                                <br />
                                <Button
                                    label={this.state.textEdit ? 'Cancel' : 'Edit Text'}
                                    onClick={() =>
                                        this.setState({
                                            textEdit: !this.state.textEdit,
                                            text: this.props.project.text
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
    return {
        project: state.selectedProject,
        group: state.group,
        isAuthenticated: state.isAuthenticated
    };
};

export default connect(mapStateToProps, null)(Project);
