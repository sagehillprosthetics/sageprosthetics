import * as types from './types.js';

const INITIAL_STATE = {
    page: '~',
    group: {},
    faculty: {}
};

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.GET_GROUP:
            return { ...state, group: action.payload };
        case types.GET_FACULTY:
            return { ...state, faculty: action.payload };
        default:
            return state;
    }
}
