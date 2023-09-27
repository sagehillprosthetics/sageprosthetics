import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import { connect } from 'react-redux';
import anime from 'animejs';
import Transition from 'react-transition-group/Transition';
import { NextSeo } from 'next-seo';
import Router from 'next/router';
import Button from 'grommet/components/Button';
import FormField from 'grommet/components/FormField';
import RadioButton from 'grommet/components/RadioButton';
import LinkUpIcon from 'grommet/components/icons/base/LinkUp';
import LinkDownIcon from 'grommet/components/icons/base/LinkDown';
import CloseIcon from 'grommet/components/icons/base/Close';

import CloudinaryInput from '../components/CloudinaryInput';
import * as types from '../redux/types.js';
import Person from '../components/Person';
import BioModal from '../components/BioModal';
import ConfirmModal from '../components/ConfirmModal';

class Group extends Component {
    static async getInitialProps({ req, query, store }) {
        store.dispatch({
            type: types.CHANGE_PAGE,
            payload: 't',
        });

        let db = firebase;

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

        const project = [];
        db.database()
            .ref('projects')
            .once('value')
            .then((datasnapshot) => {
                datasnapshot.forEach((child) => {
                    project.push(child.key);
                });
            });

        const faculty = [];
        db.database()
            .ref('faculty')
            .once('value')
            .then((datasnapshot) => {
                datasnapshot.forEach((child) => {
                    faculty.push({
                        name: child.key,
                        src: child.val().image,
                        bio: child.val().bio,
                    });
                });
            });

        const reformat = [];
        db.database()
            .ref('group')
            .once('value')
            .then((datasnapshot) => {
                datasnapshot.forEach((child) => {
                    reformat.push({
                        id: child.key,
                        name: child.key,
                        src: child.val(),
                    });
                });
            });

        const groupArchive = [];
        await db
            .database()
            .ref('group-archive')
            .once('value')
            .then((datasnapshot) => {
                datasnapshot.forEach((child) => {
                    groupArchive.push({
                        id: child.key,
                        name: child.key,
                        src: child.val(),
                    });
                });
            });

        store.dispatch({
            type: types.GET_GROUP_ARCHIVE,
            payload: groupArchive,
        });

        store.dispatch({
            type: types.GET_GROUP,
            payload: reformat,
        });

        store.dispatch({
            type: types.GET_RECIPIENTS,
            payload: { links, archive },
        });

        store.dispatch({
            type: types.GET_PROJECTS,
            payload: project,
        });

        store.dispatch({
            type: types.GET_FACULTY,
            payload: faculty,
        });
    }

    state = {
        uploadState: '',
        name: '',
        student: true,
        bio: '',
        image: '',
        showModal: '',
        profile: '',
    };

    componentDidMount() {
        this.database = firebase.database();
    }

    switchPerson = async (name, archive) => {
        let person = {};
        if (archive) {
            person = await this.database
                .ref(`/group/${name}`)
                .once('value')
                .then((snapshot) => snapshot.val());

            await Promise.all([
                this.database.ref(`/group/${name}`).remove(),
                this.database.ref(`/group-archive/${name}`).set(person),
            ]);
            this.componentDidMount();
        } else {
            person = await this.database
                .ref(`/group-archive/${name}`)
                .once('value')
                .then((snapshot) => snapshot.val());

            await Promise.all([
                this.database.ref(`/group-archive/${name}`).remove(),
                this.database.ref(`/group/${name}`).set(person),
            ]);
            this.componentDidMount();
        }
        Router.replace(`/group`);
    };

    addPerson = () => {
        if (this.state.student) this.updateFirebase(`group/${this.state.name}`, this.state.image);
        else {
            this.updateFirebase(`faculty/${this.state.name}`, {
                image: this.state.image,
                bio: this.state.bio,
            });
        }
    };

    updateFirebase = (item, value) => {
        this.setState({ uploadImageState: 'Processing...' });
        this.database
            .ref(item)
            .set(value)
            .then(() => {
                this.setState({
                    uploadState: 'Successfully Updated Database',
                });
                Router.replace(`/group`);
            })
            .catch((e) => this.setState({ uploadState: `Error: ${e.message}` }));
    };

    renderFaculty = () => {
        if (!this.props.faculty) {
            return <h4> Loading ... </h4>;
        }

        try {
            const teachers = this.props.faculty.map((teacher) => {
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Person
                            key={teacher.name}
                            src={teacher.src}
                            name={teacher.name}
                            faculty
                            onClick={() => this.setState({ profile: teacher })}
                        />
                        {this.props.isAuthenticated ? (
                            <>
                                <Button
                                    label="Delete"
                                    onClick={() => this.setState({ showModal: teacher.name })}
                                    icon={<CloseIcon />}
                                    style={{ margin: '0px 0px 0px 0px' }}
                                    plain={true}
                                />
                                <ConfirmModal
                                    onToggleModal={() => this.setState({ showModal: '' })}
                                    show={this.state.showModal === teacher.name}
                                    onConfirm={() =>
                                        this.updateFirebase(`faculty/${teacher.name}`, null)
                                    }
                                    message={`You are about to delete ${teacher.name}. Are you sure?`}
                                />
                            </>
                        ) : null}
                    </div>
                );
            });

            return teachers.reverse();
        } catch {
            return <h4> Loading ... </h4>;
        }
    };

    renderStudent = () => {
        if (!this.props.group) {
            return <h4> Loading ... </h4>;
        }

        try {
            const students = this.props.group.map((student) => {
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Person src={student.src} name={student.name} key={student.name} />
                        {this.props.isAuthenticated ? (
                            <>
                                <Button
                                    label="Archive"
                                    onClick={() => this.setState({ showModal: student.name })}
                                    icon={<LinkDownIcon />}
                                    style={{ margin: '-20px 0px 30px 0px' }}
                                    plain={true}
                                />
                                <ConfirmModal
                                    onToggleModal={() => this.setState({ showModal: '' })}
                                    show={this.state.showModal === student.name}
                                    onConfirm={() => this.switchPerson(student.name, true)}
                                    message={`You are about to archive ${student.name}. Are you sure?`}
                                />
                            </>
                        ) : null}
                    </div>
                );
            });

            return students;
        } catch {
            return <h4> Loading... </h4>;
        }
    };

    renderArchivedStudent = () => {
        if (!this.props.groupArchive) {
            return <h4> Loading ... </h4>;
        }

        try {
            const students = this.props.groupArchive.map((student) => {
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Person src={student.src} name={student.name} key={student.name} />
                        {this.props.isAuthenticated ? (
                            <>
                                <Button
                                    label="Unrchive"
                                    onClick={() => this.setState({ showModal: student.name })}
                                    icon={<LinkUpIcon />}
                                    style={{ margin: '-20px 0px 30px 0px' }}
                                    plain={true}
                                />
                                <ConfirmModal
                                    onToggleModal={() => this.setState({ showModal: '' })}
                                    show={this.state.showModal === student.name}
                                    onConfirm={() => this.switchPerson(student.name, false)}
                                    message={`You are about to unarchive ${student.name}. Are you sure?`}
                                />
                            </>
                        ) : null}
                    </div>
                );
            });

            return students;
        } catch {
            return <h4> Loading... </h4>;
        }
    };

    render() {
        return (
            <div style={{ margin: '0% 15% 0% 15%' }}>
                <NextSeo
                    {...{
                        title: 'Our Group | Sage Prosthetics',
                        twitter: { title: 'Our Group | Sage Prosthetics' },
                        openGraph: {
                            title: 'Our Group | Sage Prosthetics',
                        },
                    }}
                />
                <h2 style={{ textAlign: 'center' }}> Meet our Service Group </h2>

                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    {this.renderFaculty()}
                </div>

                <div
                    style={{
                        height: '1.5px',
                        backgroundColor: '#cccccc',
                        borderRadius: '1px',
                        margin: '10px 0 40px 0',
                    }}
                />

                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    {this.renderWebdev()}
                </div>

                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        flexWrap: 'wrap',
                    }}
                >
                    {this.renderStudent()}
                </div>

                {this.props.isAuthenticated ? (
                    <>
                        <h3>Archived Students</h3>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-around',
                                flexWrap: 'wrap',
                            }}
                        >
                            {this.renderArchivedStudent()}
                        </div>{' '}
                    </>
                ) : null}
                {this.props.isAuthenticated ? (
                    <div
                        style={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <h3 style={{ marginTop: '20px' }}> Add New Group Member </h3>

                        <FormField label="Name" size="medium" help="Required">
                            <input
                                style={{
                                    fontWeight: 'lighter',
                                    border: 'none',
                                }}
                                type="text"
                                onChange={(event) => this.setState({ name: event.target.value })}
                            />
                        </FormField>
                        <FormField>
                            <RadioButton
                                id="choice1-1"
                                name="choice1-1"
                                label="Student"
                                checked={this.state.student}
                                onChange={() => this.setState({ student: true })}
                            />
                            <RadioButton
                                id="choice1-1"
                                name="choice1-1"
                                label="Webdev"
                                checked={this.state.student}
                                onChange={() => this.setState({ student: false })}
                            />
                            <RadioButton
                                id="choice1-2"
                                name="choice1-2"
                                label="Faculty Advisor"
                                checked={!this.state.student}
                                onChange={() => this.setState({ student: false })}
                            />
                        </FormField>

                        <FormField label="Biography" size="large" help="For Faculty Only">
                            <textarea
                                style={{
                                    fontWeight: 'lighter',
                                    height: '60%',
                                    resize: 'none',
                                    border: 'none',
                                }}
                                type="text"
                                name="message"
                                rows={10}
                                onChange={(event) => this.setState({ bio: event.target.value })}
                            />
                        </FormField>
                        <CloudinaryInput
                            onUploadSuccess={({ public_id }) => {
                                console.log(public_id);
                                this.setState({ image: public_id });
                            }}
                            label="Upload Profile Picture"
                            style={{ margin: '20px' }}
                        />
                        {this.state.uploadState ? <h6> {this.state.uploadState} </h6> : null}
                        <Button
                            label="Add Person"
                            onClick={
                                this.state.name && this.state.image
                                    ? () => this.setState({ showModal: 'g' })
                                    : null
                            }
                            primary={true}
                            style={{ margin: '20px' }}
                        />
                        <ConfirmModal
                            onToggleModal={() => this.setState({ showModal: '' })}
                            show={this.state.showModal === 'g'}
                            onConfirm={this.addPerson}
                            message="You are about to add a person to the Sage Prosthetics roster. Are you sure?"
                        />
                    </div>
                ) : null}

                <Transition
                    onEnter={modalEnter}
                    timeout={0}
                    in={this.state.profile !== ''}
                    onExit={modalExit}
                >
                    <div className="biomodal">
                        <BioModal
                            desktop={this.props.desktop}
                            show={this.state.profile !== ''}
                            onToggleModal={() => this.setState({ profile: '' })}
                            person={this.state.profile}
                        />
                    </div>
                </Transition>
            </div>
        );
    }
}

const modalEnter = (biomodal) => {
    return anime({
        // targets: biomodal,
        // opacity: {
        //     value: [0, 1]
        // },
        // easing: 'easeOutQuint',
        // duration: 1000
    });
};

const modalExit = (biomodal) => {
    return anime({
        // targets: biomodal,
        // opacity: {
        //     value: [1, 0]
        // },
        // easing: 'easeOutQuint',
        // duration: 1000
    });
};

const mapStateToProps = (state) => {
    const { group, faculty, isAuthenticated, groupArchive } = state;
    return { group, faculty, isAuthenticated, groupArchive };
};

export default connect(mapStateToProps, null)(Group);
