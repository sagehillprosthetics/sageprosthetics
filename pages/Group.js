import React, { Component } from 'react';
import * as firebase from 'firebase';
//import * as admin from 'firebase-admin';
import { connect } from 'react-redux';
import { getGroup } from '../redux/actions';
import { Image, Transformation } from 'cloudinary-react';
import serviceAccount from '../firebasekeys.json';
import * as types from '../redux/types.js';

class Group extends Component {
    static async getInitialProps({ store }) {
        // admin.initializeApp({
        //     credential: admin.credential.cert(serviceAccount),
        //     databaseURL: 'https://sage-prosthetics.firebaseio.com'
        // });
        // const db = admin.database();
        // const ref = db.ref('sage-prosthetics/group');
        // ref.once('group', function(data) {
        //     console.log(data);
        // });
        // db.collection('group')
        //     .get()
        //     .then(snapshot => {
        //         const reformat = [];
        //         snapshot.forEach(doc => {
        //             reformat.push({ ...doc.data(), id: doc.id });
        //         });
        //         store.dispatch({
        //             type: types.GET_GROUP,
        //             payload: reformat
        //         });
        //     })
        //     .catch(err => {
        //         console.log('Error getting documents', err);
        //     });
        // db.collection('faculty')
        //     .get()
        //     .then(snapshot => {
        //         const reformat = [];
        //         snapshot.forEach(doc => {
        //             reformat.push({ ...doc.data(), id: doc.id });
        //         });
        //         store.dispatch({
        //             type: types.GET_FACULTY,
        //             payload: reformat
        //         });
        //     })
        //     .catch(err => {
        //         console.log('Error getting documents', err);
        //     });
    }

    componentDidMount() {
        this.props.getGroup();
    }

    renderFaculty = () => {
        if (!this.props.faculty) {
            return <h4> Loading ... </h4>;
        }

        try {
            const teachers = this.props.faculty.map(teacher => {
                console.log(teacher);
                return (
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                    >
                        <Image
                            cloudName="sageprosthetics"
                            publicId={teacher.src}
                            width="150"
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
                        <h3
                            style={{
                                fontWeight: '600',
                                textAlign: 'center',
                                margin: '20px'
                            }}
                        >
                            {teacher.name}
                        </h3>
                        <h5> Faculty Advisor </h5>
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
            const students = this.props.group.map(student => {
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
                            publicId={student.src}
                            width="150"
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
                            {student.name}
                        </h4>
                    </div>
                );
            });

            return students;
        } catch {
            return <h4> Loading... </h4>;
        }
    };

    render() {
        console.log(this.props.faculty);
        return (
            <div style={{ margin: '0% 15% 0% 15%' }}>
                <h2 style={{ textAlign: 'center' }}>
                    {' '}
                    Meet our Service Group{' '}
                </h2>

                <div
                    style={{ display: 'flex', justifyContent: 'space-around' }}
                >
                    {this.renderFaculty()}
                </div>

                <div
                    style={{
                        height: '1.5px',
                        backgroundColor: '#cccccc',
                        borderRadius: '1px',
                        margin: '10px 0 40px 0'
                    }}
                />

                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        flexWrap: 'wrap'
                    }}
                >
                    {this.renderStudent()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = store => {
    return {
        group: store.group,
        faculty: store.faculty
    };
};

export default connect(
    mapStateToProps,
    { getGroup }
)(Group);
