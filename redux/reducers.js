import * as types from './types.js';

const INITIAL_STATE = {
    page: '~',
    group: {},
    faculty: {},
    gallery: [],
    designs: {},
    recipients: ['Internal Server Error!'],
    selectedRecipient: {}
};

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.GET_GROUP:
            console.log(action.payload);
            return { ...state, group: action.payload };
        case types.GET_FACULTY:
            console.log(action.payload);
            return { ...state, faculty: action.payload };
        case types.GET_GALLERY:
            return { ...state, gallery: action.payload };
        case types.GET_DESIGNS:
            return { ...state, designs: action.payload };
        case types.GET_RECIPIENTS:
            return { ...state, recipients: action.payload };
        case types.GET_SELECTED_RECIPIENT:
            return { ...state, selectedRecipient: action.payload };
        default:
            return state;
    }
}
