import * as types from './types.js';

const INITIAL_STATE = {
    page: '~',
    group: {},
    faculty: {},
    gallery: [],
    designs: {},
    recipients: ['Internal Server Error!'],
    selectedRecipient: {},
    projects: ['Internal Server Error!'],
    selectedProject: {},
    user: {},
    isAuthenticated: false,
    loading: false,
    error: ''
};

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.GET_GROUP:
            return { ...state, group: action.payload };
        case types.GET_FACULTY:
            return { ...state, faculty: action.payload };
        case types.GET_GALLERY:
            return { ...state, gallery: action.payload };
        case types.GET_DESIGNS:
            return { ...state, designs: action.payload };
        case types.GET_RECIPIENTS:
            return { ...state, recipients: action.payload };
        case types.GET_SELECTED_RECIPIENT:
            return { ...state, selectedRecipient: action.payload };
        case types.CHANGE_PAGE:
            return { ...state, page: action.payload };
        case types.GET_PROJECTS:
            return { ...state, projects: action.payload };
        case types.GET_SELECTED_PROJECT:
            return { ...state, selectedProject: action.payload };
        case types.LOGIN_USER:
            return { ...state, loading: true, error: '' };
        case types.LOGIN_USER_SUCCESS:
            return {
                ...state,
                user: action.payload,
                error: '',
                loading: false,
                isAuthenticated: true
            };
        case types.LOGIN_USER_ERROR:
            return { ...state, error: action.payload, loading: false };
        case types.LOGOUT_USER_SUCCESS:
            return {
                ...state,
                user: {},
                error: '',
                loading: false,
                isAuthenticated: false
            };
        default:
            return state;
    }
}
