import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, Video, Transformation } from 'cloudinary-react';
import * as types from '../redux/types';
import NextSeo from 'next-seo';
import Person from '../components/Person';

class Project extends Component {
    static async getInitialProps({ req, query, store }) {
        let project = {};

        const projects = [];
        req.firebaseServer
            .database()
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
                });
            });

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
        selectedImage: ''
    };

    renderGroup() {
        let group = null;
        if (this.props.project.group) {
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
                        {this.props.project.group.map(person => {
                            return (
                                <Person key={person} name={person} src={this.props.group[person]} />
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
                        publicId={this.props.project.src + ''}
                        height="100%"
                    >
                        <Transformation width="300" height="400" crop="scale" />
                    </Image>
                    <div style={{ marginLeft: '10%' }}>{this.props.project.text}</div>
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
        group: state.group
    };
};

export default connect(
    mapStateToProps,
    null
)(Project);
