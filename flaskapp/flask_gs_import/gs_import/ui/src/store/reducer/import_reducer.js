import * as action_types from '../action_types/import_action_types'

export default (state = {
    last_posted: '',

    processing_post: false,
    done_post: false,
    error_post: null

}, action) => {

    switch (action.type) {

        case action_types.POST_FILE:
            return Object.assign({}, state, {processing_post: true, error_post: null});

        case action_types.POST_FILE_FULFILLED:
            return Object.assign({}, state, {
                processing_post: false,
                done_post: true,
                error_post: null,
                last_posted: action.payload
            });

        case action_types.POST_FILE_REJECTED:
            return Object.assign({}, state, {
                processing_post: false,
                error_post: action.payload
            });

        default:
            return state;
    }
}