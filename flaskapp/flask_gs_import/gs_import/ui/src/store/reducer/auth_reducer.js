import * as action_types from '../action_types/auth_action_types'

export default (state = {
    is_authenticated: false,
    processing_post: false,
    done_post: false,
    error_post: null

}, action) => {

    switch (action.type) {

        case action_types.AUTH:
            return Object.assign({}, state, {processing_post: true, error_post: null});

        case action_types.AUTH_FULFILLED:
            return Object.assign({}, state, {
                processing_post: false,
                done_post: true,
                error_post: null,
                is_authenticated: true
            });

        case action_types.AUTH_REJECTED:
            return Object.assign({}, state, {
                processing_post: false,
                error_post: action.payload,
                is_authenticated: false
            });

        case action_types.LOG_OUT:
            return Object.assign({}, state, {
                is_authenticated: false
            });

        default:
            return state;
    }
}