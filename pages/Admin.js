import React, { Component } from 'react';
import { sha256 } from 'js-sha256';
import firebase from 'firebase/app';
import 'firebase/database';
import { Image } from 'cloudinary-react';
import { connect } from 'react-redux';

import PasswordInput from 'grommet/components/PasswordInput';
import Button from 'grommet/components/Button';
import Tabs from 'grommet/components/Tabs';
import Tab from 'grommet/components/Tab';
import FormField from 'grommet/components/FormField';
import RadioButton from 'grommet/components/RadioButton';
import CloseIcon from 'grommet/components/icons/base/Close';
import LinkUpIcon from 'grommet/components/icons/base/LinkUp';
import LinkDownIcon from 'grommet/components/icons/base/LinkDown';

import * as types from '../redux/types';
import CloudinaryInput from '../components/CloudinaryInput';
import ConfirmModal from '../components/ConfirmModal';
import { loginUser, logoutUser } from '../redux/actions';

class AdminPage extends Component {
    static async getInitialProps({ req, store }) {
        store.dispatch({
            type: types.CHANGE_PAGE,
            payload: '~'
        });

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

        store.dispatch({
            type: types.GET_RECIPIENTS,
            payload: { links, archive }
        });

        store.dispatch({
            type: types.GET_PROJECTS,
            payload: project
        });
    }

    state = {
        loggedIn: false,
        email: 'admin@sageprosthetics.org',
        password: '',
        logInError: false,

        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
        changePasswordState: '',

        uploadImageState: '',

        name: '',
        description: '',
        student: false,
        profilepicture: '',
        groupmessage: '',

        facultyList: {},
        facultyError: '',
        archiveList: {},
        currentList: {},
        showModal: '',

        hands: {},
        handname: '',
        handhref: '',
        handsid: '',
        handbullets: '',
        order: '',
        handmessage: '',

        projectname: '',
        projectid: '',
        projectgroup: [],
        projectDescription: '',
        projectmessage: '',
        projectgallery: [],

        recipients: {},
        recipientname: '',
        recipientid: '',
        recipientgroup: [],
        recipientDescription: '',
        recipientmessage: '',
        recipientgallery: [],
        recipientquote: ''
    };

    database;

    addRecipient = async () => {
        console.log('Adding Recipient');
        if (!this.state.recipientname) {
            return this.setState({ recipientmessage: 'Error: Please enter a name' });
        } else if (!this.state.recipientid) {
            return this.setState({ recipientmessage: 'Error: Please upload a title image' });
        } else if (!this.state.recipientDescription) {
            return this.setState({ recipientmessage: 'Error: Please add a description' });
        }

        this.setState({ recipientmessage: 'Updating Database...' });
        try {
            const newrecipient = {
                src: this.state.recipientid,
                text: this.state.recipientDescription,
                group: this.state.recipientgroup,
                pictures: this.state.recipientgallery,
                quote: this.state.recipientquote,
                archive: false
            };

            console.log(newrecipient);

            await this.database.ref(`/recipients/${this.state.recipientname}`).set(newrecipient);

            this.setState({ recipientmessage: 'Success' });
        } catch (e) {
            this.setState({ recipientmessage: `Error: ${e.message}` });
        }
    };

    async switchRecipient(name) {
        const archive = !this.state.recipients[name].archive;
        await this.database.ref(`/recipients/${name}/archive`).set(archive);
        this.componentDidMount();
    }

    renderRecipients() {
        const current = [];
        const archive = [];

        Object.keys(this.state.recipients).map((key, index) => {
            if (this.state.recipients[key].archive) {
                archive.push(
                    <React.Fragment>
                        <Button
                            label={key}
                            onClick={() => this.setState({ showModal: key })}
                            key={index}
                            icon={<LinkUpIcon />}
                            style={{ width: '300px', margin: '10px' }}
                        />
                        <ConfirmModal
                            onToggleModal={() => this.setState({ showModal: '' })}
                            show={this.state.showModal === key}
                            onConfirm={() => this.switchRecipient(key)}
                            message={`You are about to unarchive ${key}. Are you sure?`}
                        />
                    </React.Fragment>
                );
            } else {
                current.push(
                    <React.Fragment>
                        <Button
                            label={key}
                            onClick={() => this.setState({ showModal: key })}
                            key={index}
                            icon={<LinkDownIcon />}
                            style={{ width: '300px', margin: '10px' }}
                        />
                        <ConfirmModal
                            onToggleModal={() => this.setState({ showModal: '' })}
                            show={this.state.showModal === key}
                            onConfirm={() => this.switchRecipient(key)}
                            message={`You are about to archive ${key}. Are you sure?`}
                        />
                    </React.Fragment>
                );
            }
        });

        return (
            <Tab title="Recipients">
                <div
                    style={{
                        width: '70vw',
                        margin: '0 15vw 0 15vw',
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                        padding: '10px'
                    }}
                >
                    <h3>Edit Current Recipients</h3>
                    <h4 style={{ marginTop: '20px' }}> Recipients (Not Archived) </h4>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            flexWrap: 'wrap',
                            width: '100%'
                        }}
                    >
                        {current}
                    </div>
                    <h4 style={{ marginTop: '20px' }}> Archived Recipients </h4>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            flexWrap: 'wrap',
                            width: '100%'
                        }}
                    >
                        {archive}
                    </div>
                    <h3> Add New Recipient </h3>
                    <FormField label="Name" size="medium" help="Required">
                        <input
                            style={{
                                fontWeight: 'lighter',
                                border: 'none'
                            }}
                            type="text"
                            onChange={event => this.setState({ recipientname: event.target.value })}
                        />
                    </FormField>

                    <FormField label="Description" size="large" help="Required">
                        <textarea
                            style={{
                                fontWeight: 'lighter',
                                height: '60%',
                                resize: 'none',
                                border: 'none'
                            }}
                            type="text"
                            name="message"
                            rows={10}
                            onChange={event =>
                                this.setState({ recipientDescription: event.target.value })
                            }
                        />
                    </FormField>

                    <FormField
                        label="Team Members"
                        size="medium"
                        help="Write every group member on their own line"
                    >
                        <textarea
                            style={{
                                fontWeight: 'lighter',
                                height: '30%',
                                resize: 'none',
                                border: 'none'
                            }}
                            type="text"
                            name="message"
                            rows={5}
                            onChange={event =>
                                this.setState({ recipientgroup: event.target.value.split('\n') })
                            }
                        />
                    </FormField>

                    <FormField label="Quote" size="medium" help="A quote from the recipient">
                        <textarea
                            style={{
                                fontWeight: 'lighter',
                                height: '10%',
                                resize: 'none',
                                border: 'none'
                            }}
                            type="text"
                            name="message"
                            rows={5}
                            onChange={event =>
                                this.setState({ recipientquote: event.target.value })
                            }
                        />
                    </FormField>

                    <div
                        style={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-around'
                        }}
                    >
                        <CloudinaryInput
                            onUploadSuccess={({ public_id }) => {
                                console.log(public_id);
                                this.setState({ recipientid: public_id });
                            }}
                            label="Upload Recipient Picture"
                            style={{ margin: '20px' }}
                        />

                        <CloudinaryInput
                            onUploadSuccess={({ public_id }) => {
                                console.log(public_id);
                                this.setState({
                                    recipientgallery: [...this.state.recipientgallery, public_id]
                                });
                            }}
                            label="Upload Recipient Gallery Pictures"
                            style={{ margin: '20px' }}
                        />
                    </div>
                    {this.state.recipientgallery.length !== 0 ? (
                        this.state.recipientgallery.map(key => {
                            console.log(this.state.recipientgallery);
                            return (
                                <div
                                    style={{ margin: '1%' }}
                                    onClick={() =>
                                        this.setState({
                                            recipientgallery: this.state.recipientgallery.filter(
                                                index => index !== key
                                            )
                                        })
                                    }
                                >
                                    <Image
                                        cloudName="sageprosthetics"
                                        publicId={key}
                                        height="190"
                                    />
                                </div>
                            );
                        })
                    ) : (
                        <h6> No gallery images currently uploaded </h6>
                    )}
                    {this.state.recipientmessage ? <h6> {this.state.recipientmessage} </h6> : null}

                    <Button
                        label="Add Recipient"
                        onClick={() => this.setState({ showModal: 'r' })}
                        primary={true}
                        style={{ margin: '20px' }}
                    />
                    <ConfirmModal
                        onToggleModal={() => this.setState({ showModal: '' })}
                        show={this.state.showModal === 'r'}
                        onConfirm={this.addRecipient}
                        message="You are about to add a new recipient to the Sage Prosthetics website. Are you sure?"
                    />
                </div>
            </Tab>
        );
    }

    async componentDidMount() {
        this.database = firebase.database();
        this.database
            .ref('/group')
            .once('value')
            .then(snapshot => this.setState({ currentList: snapshot.val() }));

        this.database
            .ref('/faculty')
            .once('value')
            .then(snapshot => this.setState({ facultyList: snapshot.val() }));

        this.database
            .ref('/group-archive')
            .once('value')
            .then(snapshot => this.setState({ archiveList: snapshot.val() }));

        this.database
            .ref('/hands')
            .once('value')
            .then(snapshot => this.setState({ hands: snapshot.val() }));

        this.database
            .ref('/recipients')
            .once('value')
            .then(snapshot => this.setState({ recipients: snapshot.val() }));
    }

    addProject = async () => {
        console.log('Adding Project');
        if (!this.state.projectname) {
            return this.setState({ projectmessage: 'Error: Please enter a name' });
        } else if (!this.state.projectid) {
            return this.setState({ projectmessage: 'Error: Please upload a title image' });
        } else if (!this.state.projectDescription) {
            return this.setState({ projectmessage: 'Error: Please add a description' });
        }

        this.setState({ projectmessage: 'Updating Database...' });
        try {
            const newproject = {
                src: this.state.projectid,
                text: this.state.projectDescription,
                group: this.state.projectgroup,
                pictures: this.state.projectgallery
            };

            console.log(newproject);

            await this.database.ref(`/projects/${this.state.projectname}`).set(newproject);

            this.setState({ projectmessage: 'Success' });
        } catch (e) {
            this.setState({ projectmessage: `Error: ${e.message}` });
        }
    };

    changePassword = async () => {
        this.setState({ changePasswordState: 'Processing...' });
        const correct = await this.database
            .ref('/password')
            .once('value')
            .then(snapshot => snapshot.val());

        const password = sha256(this.state.oldPassword);
        if (correct === password && this.state.newPassword === this.state.confirmNewPassword) {
            this.database
                .ref('/password')
                .set(sha256(this.state.newPassword))
                .then(() => this.setState({ changePasswordState: 'Success!' }))
                .catch(e => this.setState({ changePasswordState: 'Error: ' + e.message }));
        } else {
            this.setState({ changePasswordState: 'Incorrect Passwords' });
        }

        this.setState({ oldPassword: '', newPassword: '', confirmNewPassword: '' });
    };

    uploadImageSuccess = async ({ public_id }) => {
        this.setState({ uploadImageState: 'Processing...' });
        let key = await this.database
            .ref()
            .child('gallery')
            .once('value')
            .then(snapshot => snapshot.val().length);
        console.log(key);
        console.log(public_id);
        this.database
            .ref(`/gallery/${key}`)
            .set(public_id)
            .then(() =>
                this.setState({
                    uploadImageState: 'Successfully Updated Database'
                })
            )
            .catch(e => this.setState({ uploadImageState: `Error: ${e.message}` }));
    };

    addPerson = async () => {
        console.log('Adding Person');
        console.log(this.state.profilepicture);
        if (!this.state.name) {
            return this.setState({ groupmessage: 'Error: Please enter a name' });
        } else if (!this.state.profilepicture) {
            return this.setState({ groupmessage: 'Error: Please upload an image ' });
        }

        this.setState({ groupmessage: 'Updating Database...' });
        try {
            if (this.state.student) {
                await this.database.ref(`/group/${this.state.name}`).set(this.state.profilepicture);
            } else {
                await this.database
                    .ref(`/faculty/${this.state.name}`)
                    .set({ image: this.state.profilepicture, bio: this.state.description });
            }
            this.setState({ groupmessage: 'Success' });
            this.componentDidMount();
        } catch (e) {
            this.setState({ groupmessage: `Error: ${e.message}` });
        }
    };

    remove = async (name, type) => {
        console.log('Removing ', name);
        try {
            if (type === 'f') {
                await this.database.ref(`/faculty/${name}`).remove();
            } else if (type === 'h') {
                await this.database.ref(`/hands/${name}`).remove();
            }
            this.componentDidMount();
        } catch (e) {
            this.setState({ facultyError: e.message });
        }
    };

    switchPerson = async (name, archive) => {
        let person = {};
        if (archive) {
            person = await this.database
                .ref(`/group/${name}`)
                .once('value')
                .then(snapshot => snapshot.val());

            await Promise.all([
                this.database.ref(`/group/${name}`).remove(),
                this.database.ref(`/group-archive/${name}`).set(person)
            ]);
            this.componentDidMount();
        } else {
            person = await this.database
                .ref(`/group-archive/${name}`)
                .once('value')
                .then(snapshot => snapshot.val());

            await Promise.all([
                this.database.ref(`/group-archive/${name}`).remove(),
                this.database.ref(`/group/${name}`).set(person)
            ]);
            this.componentDidMount();
        }
    };
    renderAdminConsole() {
        return (
            <div>
                <Tabs style={{ width: '70vw', margin: '0px 15vw 0px 15vw' }}>
                    {this.renderRecipients()}
                    {this.renderProjects()}
                    <Tab title="Log Out" style={{ color: 'red' }} onClick={this.props.logoutUser} />
                </Tabs>
            </div>
        );
    }

    renderLogin() {
        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginTop: '10%'
                }}
            >
                <h3>Access Denied. Please log in.</h3>
            </div>
        );
    }

    renderProjects() {
        return (
            <Tab title="Projects">
                <div
                    style={{
                        width: '70vw',
                        margin: '0 15vw 0 15vw',
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                        padding: '10px'
                    }}
                >
                    <h3> Add New Project </h3>
                    <FormField label="Name" size="medium" help="Required">
                        <input
                            style={{
                                fontWeight: 'lighter',
                                border: 'none'
                            }}
                            type="text"
                            onChange={event => this.setState({ projectname: event.target.value })}
                        />
                    </FormField>

                    <FormField label="Description" size="large" help="Required">
                        <textarea
                            style={{
                                fontWeight: 'lighter',
                                height: '60%',
                                resize: 'none',
                                border: 'none'
                            }}
                            type="text"
                            name="message"
                            rows={10}
                            onChange={event =>
                                this.setState({ projectDescription: event.target.value })
                            }
                        />
                    </FormField>

                    <FormField
                        label="Team Members"
                        size="large"
                        help="Write every group member on their own line"
                    >
                        <textarea
                            style={{
                                fontWeight: 'lighter',
                                height: '60%',
                                resize: 'none',
                                border: 'none'
                            }}
                            type="text"
                            name="message"
                            rows={5}
                            onChange={event =>
                                this.setState({ projectgroup: event.target.value.split('\n') })
                            }
                        />
                    </FormField>

                    <div
                        style={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-around'
                        }}
                    >
                        <CloudinaryInput
                            onUploadSuccess={({ public_id }) => {
                                console.log(public_id);
                                this.setState({ projectid: public_id });
                            }}
                            label="Upload Project Picture"
                            style={{ margin: '20px' }}
                        />

                        <CloudinaryInput
                            onUploadSuccess={({ public_id }) => {
                                console.log(public_id);
                                this.setState({
                                    projectgallery: [...this.state.projectgallery, public_id]
                                });
                            }}
                            label="Upload Project Gallery Pictures"
                            style={{ margin: '20px' }}
                        />
                    </div>
                    {this.state.projectgallery.length !== 0 ? (
                        this.state.projectgallery.map(key => {
                            return (
                                <div
                                    style={{ margin: '1%' }}
                                    onClick={() =>
                                        this.setState({
                                            projectgallery: this.state.projectgallery.filter(
                                                index => index !== key
                                            )
                                        })
                                    }
                                >
                                    <Image
                                        cloudName="sageprosthetics"
                                        publicId={key}
                                        height="190"
                                    />
                                </div>
                            );
                        })
                    ) : (
                        <h6> No gallery images currently uploaded </h6>
                    )}
                    {this.state.projectmessage ? <h6> {this.state.projectmessage} </h6> : null}

                    <Button
                        label="Add Project"
                        onClick={() => this.setState({ showModal: 'p' })}
                        primary={true}
                        style={{ margin: '20px' }}
                    />
                    <ConfirmModal
                        onToggleModal={() => this.setState({ showModal: '' })}
                        show={this.state.showModal === 'p'}
                        onConfirm={this.addProject}
                        message="You are about to add a new project to the Sage Prosthetics website. Are you sure?"
                    />
                </div>
            </Tab>
        );
    }

    render() {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h2> Welcome to the Sage Prosthetics Admin Console</h2>
                {this.props.isAuthenticated ? this.renderAdminConsole() : this.renderLogin()}
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { error, loading, user, isAuthenticated } = state;
    return { error, loading, user, isAuthenticated };
};

export default connect(mapStateToProps, { loginUser, logoutUser })(AdminPage);
