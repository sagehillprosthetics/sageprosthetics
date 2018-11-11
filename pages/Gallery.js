import React, { Component } from 'react';
import * as firebase from 'firebase';
//import * as admin from 'firebase-admin';
import { connect } from 'react-redux';
import { getGroup } from '../redux/actions';
import { Image, Transformation } from 'cloudinary-react';
import serviceAccount from '../firebasekeys.json';
import * as types from '../redux/types.js';

class Gallery extends Component {
    static async getInitialProps({ req, query, store }) {
        //console.log(req.firebaseServer);
        // const faculty = [];
        // req.firebaseServer
        //     .database()
        //     .ref('faculty')
        //     .once('value')
        //     .then(datasnapshot => {
        //         datasnapshot.forEach(child => {
        //             faculty.push({
        //                 id: child.key,
        //                 name: child.key,
        //                 src: child.val()
        //             });
        //         });
        //     });
        // const reformat = [];
        // await req.firebaseServer
        //     .database()
        //     .ref('group')
        //     .once('value')
        //     .then(datasnapshot => {
        //         datasnapshot.forEach(child => {
        //             reformat.push({
        //                 id: child.key,
        //                 name: child.key,
        //                 src: child.val()
        //             });
        //         });
        //     });
        // store.dispatch({
        //     type: types.GET_GROUP,
        //     payload: reformat
        // });
        // store.dispatch({
        //     type: types.GET_FACULTY,
        //     payload: faculty
        // });
    }

    render() {
        console.log(this.props.group);
        return (
            <div style={{ margin: '0% 15% 0% 15%' }}>
                <h2 style={{ textAlign: 'center' }}>Photo Gallery</h2>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        gallery: state.gallery
    };
};

export default connect(
    mapStateToProps,
    { getGroup }
)(Gallery);
