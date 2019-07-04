import firebase from 'firebase/app';
import 'firebase/database';
import * as types from './types';

export const getGroup = () => async dispatch => {
    const db = firebase.firestore();
    db.collection('group')
        .get()
        .then(snapshot => {
            const reformat = [];
            snapshot.forEach(doc => {
                reformat.push({ ...doc.data(), id: doc.id });
            });
            dispatch({
                type: types.GET_GROUP,
                payload: reformat
            });
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });

    db.collection('faculty')
        .get()
        .then(snapshot => {
            const reformat = [];
            snapshot.forEach(doc => {
                reformat.push({ ...doc.data(), id: doc.id });
            });
            dispatch({
                type: types.GET_FACULTY,
                payload: reformat
            });
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });
};
