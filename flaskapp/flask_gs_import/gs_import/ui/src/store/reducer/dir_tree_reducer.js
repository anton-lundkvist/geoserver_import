import * as action_types from '../action_types/dir_tree_action_types'

export default (state = {
    dir_tree: {},
    filterText: '',

    processing_get: false,
    done_get: false,
    error_get: null

}, action) => {

    switch (action.type) {

        case action_types.SET_FILTER_TEXT:
            return Object.assign({}, state, {filterText: action.payload});


        case action_types.GET_DIR_TREE:
            return Object.assign({}, state, {processing_get: true, error_get: null});

        case action_types.GET_DIR_TREE_FULFILLED:
            return Object.assign({}, state, {
                processing_get: false,
                done_get: true,
                error_get: null,
                dir_tree: action.payload
            });

        case action_types.GET_DIR_TREE_REJECTED:
            return Object.assign({}, state, {
                processing_get: false,
                error_get: action.payload
            });

        default:
            return state
    }

}