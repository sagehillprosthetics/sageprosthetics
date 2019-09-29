import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import * as types from './types';

export const loginUser = (email, password) => {
    return dispatch => {
        dispatch({ type: types.LOGIN_USER });
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(data => {
                console.log('success');
                const { user } = data;
                dispatch({
                    type: types.LOGIN_USER_SUCCESS,
                    payload: user
                });
            })
            .catch(e => dispatch({ type: types.LOGIN_USER_ERROR, payload: e.message }));
    };
};

export const logoutUser = () => {
    return dispatch => {
        dispatch({ type: types.LOGIN_USER });
        firebase
            .auth()
            .signOut()
            .then(() => {
                dispatch({
                    type: types.LOGOUT_USER_SUCCESS,
                    payload: null
                });
            })
            .catch(e => dispatch({ type: types.LOGIN_USER_ERROR, payload: e.message }));
    };
};
